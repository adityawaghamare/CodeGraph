import * as toml from '@iarna/toml';
import fs from 'fs/promises';
import { Edge } from '@codegraph/shared';

export async function parseWorkspaceCargo(cargoPath: string): Promise<{ edges: Edge[] }> {
  const edges: Edge[] = [];
  try {
    const content = await fs.readFile(cargoPath, 'utf8');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed = toml.parse(content) as any;

    if (parsed.workspace && Array.isArray(parsed.workspace.members)) {
      // It's a workspace, let's find the packages and their dependencies
      // For simplicity in this milestone, we'll scan all Cargo.tomls in members if we had them.
      // But we can just create edges between crates that depend on each other.
    }

    if (parsed.package && parsed.package.name && parsed.dependencies) {
      const pkgName = parsed.package.name;
      for (const [dep, details] of Object.entries(parsed.dependencies)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof details === 'object' && details && (details as any).path) {
          // Local dependency
          edges.push({
            id: `dep_${pkgName}_${dep}`,
            from: pkgName, // In a full graph, this might link to a file/crate node, but string is fine for now
            to: dep,
            type: 'depends_on',
            confidence: 'high',
            resolved: true
          });
        }
      }
    }
  } catch (e) {
    // Ignore parse errors
  }
  return { edges };
}
