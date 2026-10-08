import { Graph } from '@codegraph/shared';

export function generateMarkdownDocs(graph: Graph, detail: string = 'contract'): string {
  let md = '# Architecture Documentation\n\n';

  if (graph.coverage) {
    md += '## Analysis Coverage\n\n';
    md += `- **Files Analyzed**: ${graph.coverage.filesAnalyzed}\n`;
    md += `- **Files Skipped**: ${graph.coverage.skippedFiles.length}\n`;
    const totalCalls = graph.edges.filter(e => e.type === 'calls').length;
    const unresolvedCalls = graph.edges.filter(e => e.type === 'calls' && !e.resolved).length;
    if (totalCalls > 0) {
      md += `- **Unresolved Cross-Contract Calls**: ${unresolvedCalls}/${totalCalls} (${((unresolvedCalls / totalCalls) * 100).toFixed(1)}%)\n`;
    }
    md += '\n';
  }

  md += '## Contracts\n\n';
  const contracts = graph.nodes.filter(n => n.type === 'contract');
  if (contracts.length === 0) {
    md += 'No contracts found.\n\n';
  } else {
    for (const c of contracts) {
      md += `### ${c.name}\n`;
      md += `- **File**: \`${c.file}:${c.span.startLine}\`\n`;
      
      if (detail === 'function') {
        const funcs = graph.nodes.filter(n => n.type === 'function' && n.meta?.parentContract === c.id);
        if (funcs.length > 0) {
          md += `- **Functions**:\n`;
          for (const f of funcs) {
            const auth = f.meta?.has_auth_check ? ' (Auth)' : '';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const storageKeys = (f.meta?.storage_keys && f.meta.storage_keys.length > 0) ? ` (Keys: ${f.meta.storage_keys.map((k: any) => `${k.key} [${k.durability}]`).join(', ')})` : '';
            md += `  - \`${f.name}\`${auth}${storageKeys}\n`;
          }
        }
      }
      md += '\n';
    }
  }

  if (graph.heuristics && graph.heuristics.length > 0) {
    md += '## Health Checks & Heuristics\n\n';
    for (const h of graph.heuristics) {
      md += `### ${h.name} (${h.count})\n`;
      md += `${h.description}\n\n`;
      
      if (h.evidence.length > 0) {
        md += '**Evidence:**\n';
        for (const ev of h.evidence) {
          md += `- ${ev.detail} (in \`${ev.file}${ev.line ? ':' + ev.line : ''}\`)\n`;
        }
        md += '\n';
      }
      
      md += `> **Note**: ${h.falsePositiveNote}\n\n`;
    }
  }

  return md;
}

export function generateMermaid(graph: Graph): string {
  let mermaid = 'graph TD\n';
  
  // Add nodes
  for (const node of graph.nodes) {
    if (node.type === 'contract') {
      mermaid += `  ${node.id}["${node.name} (Contract)"]\n`;
    } else if (node.type === 'function') {
      // Grouping functions by contract is better, but a flat graph for simplicity
      mermaid += `  ${node.id}["${node.name}()"]\n`;
    }
  }

  // Add edges
  for (const edge of graph.edges) {
    if (edge.type === 'calls') {
      const arrow = edge.resolved ? '-->' : '-.->';
      mermaid += `  ${edge.from} ${arrow}|calls| ${edge.to || 'Unknown'}\n`;
    } else if (edge.type === 'writes_storage') {
      mermaid += `  ${edge.from} -.->|writes| ${edge.to || 'Storage'}\n`;
    } else if (edge.type === 'reads_storage') {
      mermaid += `  ${edge.from} -.->|reads| ${edge.to || 'Storage'}\n`;
    } else if (edge.type === 'emits_event') {
      mermaid += `  ${edge.from} -.->|emits| ${edge.to || 'Event'}\n`;
    } else if (edge.type === 'depends_on') {
      mermaid += `  ${edge.from} ==>|depends on| ${edge.to}\n`;
    }
  }

  return mermaid;
}

export function generateDot(graph: Graph): string {
  let dot = 'digraph G {\n';
  dot += '  node [shape=box];\n';
  
  for (const node of graph.nodes) {
    if (node.type === 'contract') {
      dot += `  "${node.id}" [label="${node.name} (Contract)"];\n`;
    } else if (node.type === 'function') {
      dot += `  "${node.id}" [label="${node.name}()"];\n`;
    }
  }

  for (const edge of graph.edges) {
    if (edge.type === 'calls') {
      const style = edge.resolved ? '' : ' [style=dashed]';
      dot += `  "${edge.from}" -> "${edge.to || 'Unknown'}"${style};\n`;
    } else if (edge.type === 'writes_storage') {
      dot += `  "${edge.from}" -> "Storage" [label="writes", style=dotted];\n`;
    } else if (edge.type === 'reads_storage') {
      dot += `  "${edge.from}" -> "Storage" [label="reads", style=dotted];\n`;
    } else if (edge.type === 'emits_event') {
      dot += `  "${edge.from}" -> "Event" [label="emits", style=dotted];\n`;
    }
  }

  dot += '}\n';
  return dot;
}
