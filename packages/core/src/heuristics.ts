import { Graph, HeuristicResult } from '@codegraph/shared';

export function runHeuristics(graph: Graph): HeuristicResult[] {
  const results: HeuristicResult[] = [];
  
  // 1. Unresolved cross-contract calls
  const unresolvedCalls = graph.edges.filter(e => e.type === 'calls' && !e.resolved);
  if (unresolvedCalls.length > 0) {
    results.push({
      id: 'unresolved-calls',
      name: 'Unresolved Cross-Contract Calls',
      description: 'Found calls to other contracts that could not be statically resolved to a specific target contract.',
      count: unresolvedCalls.length,
      evidence: unresolvedCalls.map(e => ({
        file: e.evidence?.file || 'unknown',
        line: e.evidence?.line,
        detail: `Call from ${e.from} unresolved`
      })),
      falsePositiveNote: 'Dynamic dispatch (e.g. invoke_contract) or complex client wrappers often cannot be resolved statically.'
    });
  }

  // 2. State-changing functions with no visible authorization check
  const stateChangingNoAuth: import('@codegraph/shared').Node[] = [];
  
  // Helper to resolve auth transitively
  const hasAuth = (fnNode: import('@codegraph/shared').Node, visited = new Set<string>()): boolean => {
    if (fnNode.meta?.has_auth_check) return true;
    if (visited.has(fnNode.id)) return false;
    visited.add(fnNode.id);
    
    // Check if any internal call resolves to a function with auth
    if (fnNode.meta?.internal_calls) {
      for (const callName of fnNode.meta.internal_calls) {
        // Find internal function in the same contract/file
        const calledNode = graph.nodes.find(n => n.type === 'function' && n.name === callName && n.file === fnNode.file);
        if (calledNode && hasAuth(calledNode, visited)) {
          return true;
        }
      }
    }
    return false;
  };

  const stateWriters = new Set(graph.edges.filter(e => e.type === 'writes_storage').map(e => e.from));
  for (const fnId of stateWriters) {
    const fnNode = graph.nodes.find(n => n.id === fnId);
    if (fnNode && fnNode.name !== '__check_auth' && fnNode.name !== '__constructor' && !hasAuth(fnNode)) {
      stateChangingNoAuth.push(fnNode);
    }
  }

  if (stateChangingNoAuth.length > 0) {
    results.push({
      id: 'no-auth-state-change',
      name: 'State-Changing Functions Without Auth',
      description: 'Functions that write to storage but have no visible authorization check.',
      count: stateChangingNoAuth.length,
      evidence: stateChangingNoAuth.map(n => ({
        file: n.file,
        line: n.span.startLine,
        detail: `Function ${n.name} writes to storage without auth`
      })),
      falsePositiveNote: 'Authorization might be handled by an upstream caller, a macro, or through trait implementations not tracked by the AST.',
      severity: 'info'
    });
  }

  // 3. Intra-contract storage-key collisions (same key, different durabilities)
  const contractStorage = new Map<string, Map<string, Set<string>>>(); // Contract ID -> Key -> Set of durabilities

  for (const node of graph.nodes) {
    if (node.type === 'function' && node.meta?.storage_keys && node.meta.parentContract) {
      const cid = node.meta.parentContract;
      if (!contractStorage.has(cid)) contractStorage.set(cid, new Map());
      const keyMap = contractStorage.get(cid)!;

      for (const sk of node.meta.storage_keys) {
        // sk is { key: string, durability: string }
        if (!keyMap.has(sk.key)) keyMap.set(sk.key, new Set());
        if (sk.durability !== 'unknown') {
          keyMap.get(sk.key)!.add(sk.durability);
        }
      }
    }
  }

  const collisions = [];
  for (const [cid, keyMap] of contractStorage.entries()) {
    for (const [key, durabilities] of keyMap.entries()) {
      if (durabilities.size > 1) {
        collisions.push({ contractId: cid, key, durabilities: Array.from(durabilities) });
      }
    }
  }

  if (collisions.length > 0) {
    results.push({
      id: 'storage-key-collision',
      name: 'Intra-Contract Storage Key Durability Conflict',
      description: 'A contract uses the same storage key string with conflicting durabilities (e.g., instance vs persistent).',
      count: collisions.length,
      evidence: collisions.map(c => {
        const cNode = graph.nodes.find(n => n.id === c.contractId);
        return {
          file: cNode?.file || 'unknown',
          detail: `Contract ${cNode?.name || c.contractId} uses key "${c.key}" with durabilities: ${c.durabilities.join(', ')}`
        };
      }),
      falsePositiveNote: 'May be intentional if the developer is explicitly migrating data between storage types, though highly irregular.'
    });
  }

  return results;
}
