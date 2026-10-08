import { Node, Edge } from '@codegraph/shared';

export interface AnalyzerPlugin {
  name: string;
  detect(rootPath: string): Promise<boolean>;
  analyze(files: string[]): Promise<{ nodes: Node[]; edges: Edge[] }>;
}
