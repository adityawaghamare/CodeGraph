import fs from 'fs/promises';
import { Node as GraphNode, Edge } from '@codegraph/shared';
import { getParser } from './parser.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SyntaxNode = any;

function hasAttribute(node: SyntaxNode, attrName: string): boolean {
  let sibling = node.previousSibling;
  while (sibling) {
    if (sibling.type === 'attribute_item' && sibling.text.includes(attrName)) {
      return true;
    }
    if (sibling.type === 'line_comment' || sibling.type === 'block_comment') {
      sibling = sibling.previousSibling;
      continue;
    }
    break;
  }
  return false;
}

export async function analyzeRustFile(filePath: string): Promise<{ nodes: GraphNode[], edges: Edge[] }> {
  if (filePath.endsWith('test.rs') || filePath.endsWith('tests.rs')) return { nodes: [], edges: [] };
  const nodes: GraphNode[] = [];
  const edges: Edge[] = [];
  
  try {
    const parser = await getParser();
    const content = await fs.readFile(filePath, 'utf8');
    const tree = parser.parse(content);

    let currentContractId: string | null = null;
    let currentFunctionId: string | null = null;
    let currentContractName: string | null = null;
    let currentFunctionName: string | null = null;
    const counts = new Map<string, number>();

    const generateId = (prefix: string, name: string, parentName: string | null = null) => {
      const sanitizedName = name.replace(/[^a-zA-Z0-9_]/g, '');
      const sanitizedParent = parentName ? parentName.replace(/[^a-zA-Z0-9_]/g, '') + '__' : '';
      const hashPart = filePath.split('/').pop()?.replace(/[^a-zA-Z0-9_]/g, '') || 'file';
      const baseId = `${prefix}_${sanitizedParent}${sanitizedName}_${hashPart}`;
      const count = counts.get(baseId) || 0;
      counts.set(baseId, count + 1);
      return count === 0 ? baseId : `${baseId}_${count}`;
    };

  const walk = (node: SyntaxNode) => {
    // Skip #[cfg(test)] mods
    if (node.type === 'mod_item' && hasAttribute(node, 'cfg')) {
      const cfgNodes = node.previousSibling?.text || '';
      if (cfgNodes.includes('test')) return;
    }

    // Detect #[contract] struct
    if (node.type === 'struct_item' && hasAttribute(node, 'contract')) {
      const nameNode = node.childForFieldName('name');
      if (nameNode) {
        currentContractName = nameNode.text;
        currentContractId = generateId('contract', nameNode.text);
        nodes.push({
          id: currentContractId,
          type: 'contract',
          name: nameNode.text,
          file: filePath,
          span: { startLine: node.startPosition.row + 1, endLine: node.endPosition.row + 1 }
        });
      }
    }

    // Detect #[contractimpl] impl block and functions inside
    if (node.type === 'impl_item' && hasAttribute(node, 'contractimpl')) {
      for (const child of node.children) {
        if (child.type === 'declaration_list') {
          for (const decl of child.children) {
            if (decl.type === 'function_item') {
              const fnNameNode = decl.childForFieldName('name');
              if (fnNameNode) {
                const fnName = fnNameNode.text;
                currentFunctionName = fnName;
                currentFunctionId = generateId('function', fnName, currentContractName);
                const fnNode = {
                  id: currentFunctionId,
                  type: 'function' as const,
                  name: fnName,
                  file: filePath,
                  span: { startLine: decl.startPosition.row + 1, endLine: decl.endPosition.row + 1 },
                  meta: { parentContract: currentContractId, has_auth_check: false, storage_keys: [] as {key: string, durability: string}[], internal_calls: [] as string[] }
                };
                nodes.push(fnNode);

                // Walk function body for storage, events, cross-contract calls
                walkBody(decl, currentFunctionId, currentFunctionName, fnNode);
                currentFunctionId = null;
                currentFunctionName = null;
              }
            }
          }
        }
      }
    }

    node.children.forEach(walk);
  }

  const walkBody = (node: SyntaxNode, parentFnId: string, parentFnName: string | null, fnNode: GraphNode) => {
    if (node.type === 'call_expression') {
      const funcNode = node.childForFieldName('function');
      if (funcNode) {
        const text = funcNode.text;
        let isAuth = false;
        if (funcNode.type === 'field_expression') {
          const field = funcNode.childForFieldName('field');
          if (field && (field.text === 'require_auth' || field.text === 'require_auth_for_args')) {
            isAuth = true;
          }
        } else if (funcNode.type === 'identifier') {
          if (funcNode.text === 'require_auth' || funcNode.text === 'require_auth_for_args') {
            isAuth = true;
          }
        } else if (funcNode.type === 'scoped_identifier') {
          const nameNode = funcNode.childForFieldName('name');
          const pathNode = funcNode.childForFieldName('path');
          if (nameNode && (nameNode.text === 'require_auth' || nameNode.text === 'require_auth_for_args') && pathNode && pathNode.text === 'Address') {
            isAuth = true;
          }
        }
        if (isAuth) {
          fnNode.meta!.has_auth_check = true;
        }

        // if it's a direct function call (no dots), record it as internal call
        if (!text.includes('.') && !text.includes('::')) {
          fnNode.meta!.internal_calls.push(text);
        }

        // extract storage keys from Symbol::new or Symbol::short
        let durability = 'unknown';
        if (text.includes('instance')) durability = 'instance';
        else if (text.includes('persistent')) durability = 'persistent';
        else if (text.includes('temporary')) durability = 'temporary';

        if (text.includes('Symbol::new') || text.includes('Symbol::short') || text.includes('symbol_short!')) {
          const args = node.childForFieldName('arguments');
          if (args) {
             for (const arg of args.children) {
               if (arg.type === 'string_literal') {
                 fnNode.meta!.storage_keys.push({ key: arg.text.replace(/"/g, ''), durability });
               }
             }
          }
        }
        
        // env.storage().instance().set/get
        if (text.includes('storage') && text.includes('set')) {
           edges.push({
             id: generateId('edge', 'write_storage', parentFnName),
             from: parentFnId,
             to: null, // we don't track specific keys for this simple milestone yet, or we can emit a node
             type: 'writes_storage',
             confidence: 'high',
             resolved: true,
             evidence: { file: filePath, line: node.startPosition.row + 1 }
           });
        }
        if (text.includes('storage') && (text.includes('get') || text.includes('has'))) {
           edges.push({
             id: generateId('edge', 'read_storage', parentFnName),
             from: parentFnId,
             to: null,
             type: 'reads_storage',
             confidence: 'high',
             resolved: true,
             evidence: { file: filePath, line: node.startPosition.row + 1 }
           });
        }

        // env.events().publish
        if (text.includes('events') && text.includes('publish')) {
           edges.push({
             id: generateId('edge', 'emit_event', parentFnName),
             from: parentFnId,
             to: null,
             type: 'emits_event',
             confidence: 'high',
             resolved: true,
             evidence: { file: filePath, line: node.startPosition.row + 1 }
           });
        }

        // Cross-contract call via generated client (e.g. client.foo())
        // For simplicity, we look for anything that looks like a method call on a client.
        // Or generic `invoke_contract`
        if (text.includes('invoke_contract')) {
           edges.push({
             id: generateId('edge', 'call_dynamic', parentFnName),
             from: parentFnId,
             to: null,
             type: 'calls',
             confidence: 'high',
             resolved: false, // Cannot statically resolve invoke_contract easily
             evidence: { file: filePath, line: node.startPosition.row + 1 }
           });
        } else if (text.endsWith('Client::new')) {
           let target = 'Unknown';
           if (funcNode.type === 'scoped_identifier') {
              const pathStr = funcNode.childForFieldName('path')?.text;
              if (pathStr && pathStr.endsWith('Client')) {
                 const parts = pathStr.split('::');
                 if (parts.length >= 2) target = parts[parts.length - 2];
              }
           }
           edges.push({
             id: generateId('edge', 'call_client', parentFnName),
             from: parentFnId,
             to: target === 'Unknown' ? null : `contract_${target}`,
             type: 'calls',
             confidence: 'medium',
             resolved: target !== 'Unknown',
             evidence: { file: filePath, line: node.startPosition.row + 1 },
             meta: { addressSource: 'runtime' }
           });
        } else if (node.type === 'call_expression' && funcNode.type === 'field_expression') {
           const objNode = funcNode.childForFieldName('value');
           if (objNode && objNode.text.includes('client')) {
             // client.some_func()
             edges.push({
               id: generateId('edge', 'call_client', parentFnName),
               from: parentFnId,
               to: null, // Resolving target is hard without type info, we'll leave it unresolved or guess if we track Client::new
               type: 'calls',
               confidence: 'medium',
               resolved: false,
               evidence: { file: filePath, line: node.startPosition.row + 1 }
             });
           }
        }
      }
    }

    node.children.forEach((c: SyntaxNode) => walkBody(c, parentFnId, parentFnName, fnNode));
  }

  walk(tree.rootNode);
  } catch (e) {
    console.error(`Error analyzing file ${filePath}:`, e);
  }
  return { nodes, edges };
}
