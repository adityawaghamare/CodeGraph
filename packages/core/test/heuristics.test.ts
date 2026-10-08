import { describe, it, expect } from 'vitest';
import { runHeuristics } from '../src/heuristics.js';
import { Graph } from '@codegraph/shared';

describe('Heuristics Engine', () => {
  it('should detect unresolved cross-contract calls', () => {
    const graph: Graph = {
      schemaVersion: 1,
      nodes: [],
      edges: [
        {
          id: 'e1',
          from: 'fn1',
          to: null,
          type: 'calls',
          confidence: 'high',
          resolved: false
        },
        {
          id: 'e2',
          from: 'fn2',
          to: 'contractB',
          type: 'calls',
          confidence: 'high',
          resolved: true
        }
      ]
    };

    const results = runHeuristics(graph);
    const unresolved = results.find(r => r.id === 'unresolved-calls');
    expect(unresolved).toBeDefined();
    expect(unresolved?.count).toBe(1);
  });

  it('should detect state-changing functions without auth, respecting internal calls', () => {
    const graph: Graph = {
      schemaVersion: 1,
      nodes: [
        {
          id: 'fn_no_auth',
          type: 'function',
          name: 'do_something',
          file: 'test.rs',
          span: { startLine: 1, endLine: 5 },
          meta: { has_auth_check: false, internal_calls: [] }
        },
        {
          id: 'fn_has_auth',
          type: 'function',
          name: 'do_something_auth',
          file: 'test.rs',
          span: { startLine: 10, endLine: 15 },
          meta: { has_auth_check: true, internal_calls: [] }
        },
        {
          id: 'fn_delegated_auth',
          type: 'function',
          name: 'do_something_delegated',
          file: 'test.rs',
          span: { startLine: 20, endLine: 25 },
          meta: { has_auth_check: false, internal_calls: ['do_something_auth'] }
        }
      ],
      edges: [
        { id: 'e1', from: 'fn_no_auth', to: null, type: 'writes_storage', confidence: 'high', resolved: true },
        { id: 'e2', from: 'fn_has_auth', to: null, type: 'writes_storage', confidence: 'high', resolved: true },
        { id: 'e3', from: 'fn_delegated_auth', to: null, type: 'writes_storage', confidence: 'high', resolved: true }
      ]
    };

    const results = runHeuristics(graph);
    const noAuth = results.find(r => r.id === 'no-auth-state-change');
    expect(noAuth).toBeDefined();
    expect(noAuth?.count).toBe(1); // Only fn_no_auth should be flagged
    expect(noAuth?.evidence[0].detail).toContain('do_something');
    expect(noAuth?.evidence[0].detail).not.toContain('do_something_delegated');
  });
  it('should exempt __check_auth from state-changing without auth', () => {
    const graph: Graph = {
      schemaVersion: 1,
      nodes: [
        {
          id: 'fn_check_auth',
          type: 'function',
          name: '__check_auth',
          file: 'test.rs',
          span: { startLine: 1, endLine: 5 },
          meta: { has_auth_check: false, internal_calls: [] }
        }
      ],
      edges: [
        { id: 'e1', from: 'fn_check_auth', to: null, type: 'writes_storage', confidence: 'high', resolved: true }
      ]
    };
    const results = runHeuristics(graph);
    const noAuth = results.find(r => r.id === 'no-auth-state-change');
    expect(noAuth).toBeUndefined(); // Should be fully exempt
  });

  it('should not infinite loop on cyclic internal calls', () => {
    const graph: Graph = {
      schemaVersion: 1,
      nodes: [
        {
          id: 'fnA',
          type: 'function',
          name: 'funcA',
          file: 'test.rs',
          span: { startLine: 1, endLine: 5 },
          meta: { has_auth_check: false, internal_calls: ['funcB'] }
        },
        {
          id: 'fnB',
          type: 'function',
          name: 'funcB',
          file: 'test.rs',
          span: { startLine: 10, endLine: 15 },
          meta: { has_auth_check: false, internal_calls: ['funcA'] }
        }
      ],
      edges: [
        { id: 'e1', from: 'fnA', to: null, type: 'writes_storage', confidence: 'high', resolved: true }
      ]
    };
    const results = runHeuristics(graph);
    const noAuth = results.find(r => r.id === 'no-auth-state-change');
    expect(noAuth).toBeDefined();
    expect(noAuth?.count).toBe(1); // funcA has no auth, cycle broken
  });
  it('should detect intra-contract storage key collisions', () => {
    const graph: Graph = {
      schemaVersion: 1,
      nodes: [
        {
          id: 'c1',
          type: 'contract',
          name: 'ContractA',
          file: 'a.rs',
          span: { startLine: 1, endLine: 2 }
        },
        {
          id: 'fn1',
          type: 'function',
          name: 'write1',
          file: 'a.rs',
          span: { startLine: 3, endLine: 5 },
          meta: { parentContract: 'c1', storage_keys: [{ key: 'admin_key', durability: 'instance' }] }
        },
        {
          id: 'fn2',
          type: 'function',
          name: 'write2',
          file: 'a.rs',
          span: { startLine: 10, endLine: 15 },
          meta: { parentContract: 'c1', storage_keys: [{ key: 'admin_key', durability: 'persistent' }] }
        }
      ],
      edges: []
    };

    const results = runHeuristics(graph);
    const collisions = results.find(r => r.id === 'storage-key-collision');
    expect(collisions).toBeDefined();
    expect(collisions?.count).toBe(1);
    expect(collisions?.evidence[0].detail).toContain('admin_key');
    expect(collisions?.evidence[0].detail).toContain('instance, persistent');
  });
});
