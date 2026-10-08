import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';
import { walkSafe } from '../src/walker.js';

const TEST_DIR = path.join(__dirname, 'fixtures_tmp');

describe('walkSafe', () => {
  beforeEach(async () => {
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(TEST_DIR, { recursive: true, force: true });
  });

  it('should list files', async () => {
    await fs.writeFile(path.join(TEST_DIR, 'file1.ts'), 'content');
    await fs.writeFile(path.join(TEST_DIR, 'file2.js'), 'content');
    const { files } = await walkSafe(TEST_DIR);
    expect(files).toHaveLength(2);
  });

  it('should ignore node_modules', async () => {
    const nm = path.join(TEST_DIR, 'node_modules');
    await fs.mkdir(nm);
    await fs.writeFile(path.join(nm, 'index.js'), 'content');
    await fs.writeFile(path.join(TEST_DIR, 'file1.ts'), 'content');
    
    const { files } = await walkSafe(TEST_DIR);
    expect(files).toHaveLength(1);
    expect(files[0].endsWith('file1.ts')).toBe(true);
  });

  it('should enforce maxDepth', async () => {
    await fs.mkdir(path.join(TEST_DIR, 'a', 'b', 'c'), { recursive: true });
    await fs.writeFile(path.join(TEST_DIR, 'a', 'b', 'c', 'file.txt'), 'hi');
    const { files, skipped } = await walkSafe(TEST_DIR, { maxDepth: 2 });
    expect(files).toHaveLength(0); // depth 3 is skipped
    expect(skipped).toContainEqual(expect.objectContaining({ reason: expect.stringContaining('Max depth exceeded') }));
  });

  it('should enforce maxFileSize', async () => {
    await fs.writeFile(path.join(TEST_DIR, 'large.txt'), 'a'.repeat(100));
    const { files, skipped } = await walkSafe(TEST_DIR, { maxFileSize: 50 });
    expect(files).toHaveLength(0);
    expect(skipped).toContainEqual(expect.objectContaining({ reason: expect.stringContaining('too large') }));
  });

  it('should prevent symlink escape', async () => {
    const outside = path.join(__dirname, 'outside_tmp');
    await fs.mkdir(outside, { recursive: true });
    await fs.writeFile(path.join(outside, 'secret.txt'), 'secret');
    
    // Create symlink inside TEST_DIR pointing to outside
    try {
      await fs.symlink(outside, path.join(TEST_DIR, 'link'));
      const { files, skipped } = await walkSafe(TEST_DIR);
      expect(files).toHaveLength(0); // should not contain secret.txt
      expect(skipped).toContainEqual(expect.objectContaining({ reason: expect.stringContaining('Symlink escapes root') }));
    } finally {
      await fs.rm(outside, { recursive: true, force: true });
    }
  });

  it('should enforce maxFiles', async () => {
    await fs.writeFile(path.join(TEST_DIR, '1.txt'), '1');
    await fs.writeFile(path.join(TEST_DIR, '2.txt'), '2');
    
    const { files, skipped } = await walkSafe(TEST_DIR, { maxFiles: 1 });
    expect(files).toHaveLength(1);
    expect(skipped).toContainEqual(expect.objectContaining({ reason: expect.stringContaining('Max files limit reached') }));
  });
});
