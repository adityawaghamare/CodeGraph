import { Node, Edge, Graph, GraphSchema } from '@codegraph/shared';
import { runHeuristics } from './heuristics.js';

export class GraphBuilder {
  private nodes: Map<string, Node> = new Map();
  private edges: Map<string, Edge> = new Map();
  private coverage: Graph['coverage'];

  setCoverage(filesAnalyzed: number, skippedFiles: { file: string; reason: string }[]) {
    this.coverage = { filesAnalyzed, skippedFiles };
  }

  addNodes(nodes: Node[]) {
    for (const node of nodes) {
      this.nodes.set(node.id, node);
    }
  }

  addEdges(edges: Edge[]) {
    for (const edge of edges) {
      this.edges.set(edge.id, edge);
    }
  }

  build(): Graph {
    const graph: Graph = {
      schemaVersion: 1,
      nodes: Array.from(this.nodes.values()),
      edges: Array.from(this.edges.values()),
      coverage: this.coverage
    };

    graph.heuristics = runHeuristics(graph);

    // Validate using Zod schema
    return GraphSchema.parse(graph);
  }
}
