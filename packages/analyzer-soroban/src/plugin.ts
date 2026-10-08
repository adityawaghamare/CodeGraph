import { AnalyzerPlugin, walkSafe } from '@codegraph/core';
import { Node, Edge } from '@codegraph/shared';
import { analyzeRustFile } from './ast.js';
import { parseWorkspaceCargo } from './cargo.js';

export class SorobanAnalyzerPlugin implements AnalyzerPlugin {
  name = 'soroban';

  async detect(rootPath: string): Promise<boolean> {
    try {
      const { files } = await walkSafe(rootPath, { maxDepth: 2, maxFiles: 1000 });
      return files.some(f => f.endsWith('Cargo.toml') || f.endsWith('.rs'));
    } catch (e) {
      // If it exceeds limits during detect, just assume false or we could check if any Cargo.toml was found so far.
      // But 1000 files in depth 2 is huge.
      return false;
    }
  }

  async analyze(files: string[]): Promise<{ nodes: Node[]; edges: Edge[] }> {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const rsFiles = files.filter(f => f.endsWith('.rs'));
    for (const file of rsFiles) {
      const result = await analyzeRustFile(file);
      nodes.push(...result.nodes);
      edges.push(...result.edges);
    }

    const cargoFiles = files.filter(f => f.endsWith('Cargo.toml'));
    for (const file of cargoFiles) {
      const result = await parseWorkspaceCargo(file);
      edges.push(...result.edges);
    }

    return { nodes, edges };
  }
}
