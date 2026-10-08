import * as fs from 'fs/promises';
import * as path from 'path';

export interface WalkerLimits {
  maxFiles: number;
  maxFileSize: number;
  maxDepth: number;
}

const DEFAULT_LIMITS: WalkerLimits = {
  maxFiles: 10000,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxDepth: 20,
};

const IGNORED_DIRS = new Set(['node_modules', 'target', '.git', 'dist', 'build']);

export interface WalkResult {
  files: string[];
  skipped: { file: string; reason: string }[];
}

/**
 * Safely walks a directory, enforcing limits on depth, file count, and file size to prevent abuse.
 * `maxFiles` limits the maximum number of files that will be analyzed to prevent memory exhaustion and DOS.
 */
export async function walkSafe(
  root: string,
  limits: Partial<WalkerLimits> = {}
): Promise<WalkResult> {
  const opts = { ...DEFAULT_LIMITS, ...limits };
  const result: WalkResult = { files: [], skipped: [] };
  const rootPath = path.resolve(root);

  let fileCount = 0;

  async function walk(currentPath: string, depth: number) {
    if (depth > opts.maxDepth) {
      result.skipped.push({ file: currentPath, reason: `Max depth exceeded (${opts.maxDepth})` });
      return;
    }
    
    // Ensure we haven't traversed outside the root via some trick
    if (!currentPath.startsWith(rootPath)) {
      result.skipped.push({ file: currentPath, reason: 'Escaped root path' });
      return;
    }

    if (fileCount >= opts.maxFiles) return;

    let entries;
    try {
      entries = await fs.readdir(currentPath, { withFileTypes: true });
    } catch (err) {
      return; // ignore unreadable dirs
    }

    for (const entry of entries) {
      if (IGNORED_DIRS.has(entry.name)) continue;

      const fullPath = path.join(currentPath, entry.name);
      
      let stats;
      try {
        stats = await fs.lstat(fullPath);
      } catch (err) {
        continue;
      }

      let targetPath = fullPath;
      let targetStats = stats;

      if (stats.isSymbolicLink()) {
        try {
          const realPath = await fs.realpath(fullPath);
          // Check for symlink escape
          if (!realPath.startsWith(rootPath)) {
            result.skipped.push({ file: fullPath, reason: 'Symlink escapes root' });
            continue;
          }
          targetPath = realPath;
          targetStats = await fs.stat(realPath);
        } catch (err) {
          continue;
        }
      }

      if (targetStats.isDirectory()) {
        await walk(targetPath, depth + 1);
      } else if (targetStats.isFile()) {
        if (targetStats.size > opts.maxFileSize) {
          result.skipped.push({ file: targetPath, reason: `File too large (${targetStats.size} > ${opts.maxFileSize})` });
          continue;
        }
        
        result.files.push(targetPath);
        fileCount++;
        if (fileCount >= opts.maxFiles) {
          result.skipped.push({ file: currentPath, reason: `Max files limit reached (${opts.maxFiles}). Stopping traversal.` });
          return;
        }
      }
    }
  }

  await walk(rootPath, 0);
  return result;
}
