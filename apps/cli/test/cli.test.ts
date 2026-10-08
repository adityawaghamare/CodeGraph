import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs/promises';

describe('CLI Integration Tests', () => {
  const cliPath = path.resolve(__dirname, '../dist/index.js');
  const tmpFixture = path.resolve(__dirname, '../../../fixtures/cli-warnings');

  beforeAll(async () => {
    await fs.mkdir(tmpFixture, { recursive: true });
    // Create a very large file to exceed default maxFileSize (5MB) or we can mock limits.
    // Actually, creating a 6MB file is quick.
    await fs.writeFile(path.join(tmpFixture, 'large.txt'), Buffer.alloc(6 * 1024 * 1024));
  });

  afterAll(async () => {
    await fs.rm(tmpFixture, { recursive: true, force: true });
  });

  it('prints warning for skipped files and exits with code 0', () => {
    return new Promise<void>((resolve, reject) => {
      exec(`node ${cliPath} analyze ${tmpFixture}`, (error, stdout, stderr) => {
        try {
          // Should not crash (exit code 0)
          expect(error).toBeNull();
          
          // Should print warning in stderr
          expect(stderr).toContain('WARNING: Skipped 1 files:');
          expect(stderr).toContain('large.txt');
          expect(stderr).toContain('too large');
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });

  it('generates architecture docs', async () => {
    // Create a dummy graph.json
    const graphJson = path.join(tmpFixture, 'graph.json');
    await fs.writeFile(graphJson, JSON.stringify({
      schemaVersion: 1,
      nodes: [{ id: 'c1', type: 'contract', name: 'ContractA', file: 'a.rs', span: { startLine: 1, endLine: 5 } }],
      edges: [],
      heuristics: []
    }));

    await new Promise<void>((resolve, reject) => {
      exec(`node ${cliPath} docs ${graphJson} -o ${path.join(tmpFixture, 'ARCH.md')}`, async (error) => {
        try {
          expect(error).toBeNull();
          const md = await fs.readFile(path.join(tmpFixture, 'ARCH.md'), 'utf-8');
          expect(md).toContain('ContractA');
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });

  it('exports mermaid graph', async () => {
    const graphJson = path.join(tmpFixture, 'graph.json');
    await new Promise<void>((resolve, reject) => {
      exec(`node ${cliPath} export ${graphJson} --format mermaid -o ${path.join(tmpFixture, 'graph.mermaid')}`, async (error) => {
        try {
          expect(error).toBeNull();
          const mermaid = await fs.readFile(path.join(tmpFixture, 'graph.mermaid'), 'utf-8');
          expect(mermaid).toContain('graph TD');
          expect(mermaid).toContain('ContractA (Contract)');
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });
});
