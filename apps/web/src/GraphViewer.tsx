import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from 'reactflow';
import type { NodeProps } from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import type { Graph } from '@codegraph/shared';
import { clsx } from 'clsx';
import { ShieldAlert, ShieldCheck, Database, Code } from 'lucide-react';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLayoutedElements = (nodes: any[], edges: any[], direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    // We estimate sizes since we don't have exact DOM measurements before render
    // Expanded contracts are larger
    const width = node.type === 'contract' ? (node.data.expanded ? 400 : 200) : 150;
    const height = node.type === 'contract' ? (node.data.expanded ? 300 : 80) : 50;
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    // If it's a child node, dagre might position it globally, but React Flow expects local coords.
    // For simplicity, we can lay out contracts, and render children purely via CSS inside the custom contract node!
    // Yes! Expanding a contract can just show its functions as a list inside the custom node.
    return {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };
  });

  return { nodes: newNodes, edges };
};

// Custom Node for Contract
function ContractNode({ data, selected }: NodeProps) {
  return (
    <div className={clsx(
      "border-2 rounded-lg bg-card text-card-foreground shadow-sm transition-all overflow-hidden",
      selected ? "border-primary ring-2 ring-primary/20" : "border-border",
      data.isMatch && "border-yellow-500 shadow-yellow-500/50",
      data.expanded ? "w-[400px]" : "w-[200px]"
    )}>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <div 
        className="p-3 bg-muted/50 border-b flex justify-between items-center cursor-pointer hover:bg-muted"
        onClick={() => data.onToggle(data.id)}
      >
        <div className="font-semibold text-sm flex items-center gap-2">
          <Code className="w-4 h-4 text-primary" />
          {data.name}
        </div>
        <div className="text-[10px] text-muted-foreground bg-background px-2 py-0.5 rounded-full border">
          {data.childrenCount} items
        </div>
      </div>
      
      {data.expanded && (
        <div className="p-3 max-h-[300px] overflow-y-auto space-y-2 bg-background/50">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {data.functions.map((fn: any) => (
            <div key={fn.id} className={clsx(
              "text-xs p-2 rounded border bg-card flex justify-between items-center",
              fn.isMatch && "border-yellow-500 bg-yellow-500/10"
            )}>
              <span className="font-mono">{fn.name}</span>
              {fn.meta?.has_auth_check ? 
                <span title="Auth Check"><ShieldCheck className="w-3 h-3 text-green-500" /></span> : 
                <span title="No Auth"><ShieldAlert className="w-3 h-3 text-red-400" /></span>
              }
            </div>
          ))}
          {data.storage.length > 0 && (
            <div className="mt-4">
              <div className="text-[10px] font-semibold text-muted-foreground mb-1 uppercase">Storage Keys</div>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {data.storage.map((s: any, i: number) => (
                <div key={i} className="text-[10px] flex items-center gap-1 text-muted-foreground">
                  <Database className="w-3 h-3" />
                  <span className="font-mono">{s.key}</span>
                  <span className="opacity-50">({s.durability})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  );
}

// Custom Node for standalone functions (in function-level view)
function FunctionNode({ data, selected }: NodeProps) {
  return (
    <div className={clsx(
      "border-2 rounded-md bg-card text-card-foreground p-3 shadow-sm flex items-center gap-2",
      selected ? "border-primary ring-2 ring-primary/20" : "border-border",
      data.isMatch && "border-yellow-500 bg-yellow-500/10"
    )}>
      <Handle type="target" position={Position.Left} />
      <div className="flex-1">
        <div className="text-[10px] text-muted-foreground mb-0.5">{data.contractName}</div>
        <div className="text-sm font-mono font-semibold">{data.name}</div>
      </div>
      {data.hasAuth ? <ShieldCheck className="w-4 h-4 text-green-500" /> : <ShieldAlert className="w-4 h-4 text-red-400" />}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const nodeTypes = {
  contract: ContractNode,
  function: FunctionNode,
};

export function GraphViewer({ graph, selectedNodeId, onNodeSelect, searchQuery }: { 
  graph: Graph, 
  selectedNodeId: string | null,
  onNodeSelect: (id: string | null) => void,
  searchQuery: string 
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [viewMode, setViewMode] = useState<'contract' | 'function'>('contract');
  const [expandedContracts, setExpandedContracts] = useState<Set<string>>(new Set());

  const toggleContract = useCallback((id: string) => {
    setExpandedContracts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    // Build React Flow nodes/edges
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let rfNodes: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let rfEdges: any[] = [];

    const isMatch = (str: string) => searchQuery && str.toLowerCase().includes(searchQuery.toLowerCase());

    if (viewMode === 'contract') {
      const contracts = graph.nodes.filter(n => n.type === 'contract');
      rfNodes = contracts.map(c => {
        const functions = graph.nodes.filter(n => n.type === 'function' && n.meta?.parentContract === c.id);
        const storageKeys = functions.flatMap(f => f.meta?.storage_keys || []);
        
        return {
          id: c.id,
          type: 'contract',
          position: { x: 0, y: 0 },
          data: {
            id: c.id,
            name: c.name,
            expanded: expandedContracts.has(c.id),
            onToggle: toggleContract,
            functions: functions.map(f => ({ ...f, isMatch: isMatch(f.name) })),
            storage: storageKeys,
            childrenCount: functions.length + storageKeys.length,
            isMatch: isMatch(c.name)
          }
        };
      });

      // Collapse edges to contract-level
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const contractEdges = new Map<string, any>();
      graph.edges.forEach(e => {
        if (e.type !== 'calls') return;
        const fromFn = graph.nodes.find(n => n.id === e.from);
        const toContract = e.to; // In our analysis, cross-contract calls point to the contract directly!
        if (fromFn && fromFn.meta?.parentContract && toContract) {
          const fromC = fromFn.meta.parentContract;
          const toC = toContract;
          if (fromC !== toC) {
            const edgeId = `${fromC}-${toC}`;
            if (!contractEdges.has(edgeId)) {
              contractEdges.set(edgeId, {
                id: edgeId,
                source: fromC,
                target: toC,
                type: 'smoothstep',
                animated: !e.resolved,
                style: {
                  stroke: e.resolved ? '#64748b' : '#ef4444',
                  strokeWidth: 2,
                  strokeDasharray: e.resolved ? 'none' : '5,5'
                },
                markerEnd: { type: MarkerType.ArrowClosed, color: e.resolved ? '#64748b' : '#ef4444' },
                data: { originalEdges: [e] }
              });
            } else {
               contractEdges.get(edgeId).data.originalEdges.push(e);
            }
          }
        } else if (!e.resolved && fromFn?.meta?.parentContract) {
          // Unresolved edge to Nowhere
          const edgeId = `unresolved-${e.id}`;
          contractEdges.set(edgeId, {
            id: edgeId,
            source: fromFn.meta.parentContract,
            target: fromFn.meta.parentContract, // loop or dangling
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '5,5' },
          });
        }
      });
      rfEdges = Array.from(contractEdges.values());

    } else {
      // Function view
      const functions = graph.nodes.filter(n => n.type === 'function');
      rfNodes = functions.map(f => {
        const cNode = graph.nodes.find(n => n.id === f.meta?.parentContract);
        return {
          id: f.id,
          type: 'function',
          position: { x: 0, y: 0 },
          data: {
            name: f.name,
            contractName: cNode?.name || 'Unknown',
            hasAuth: f.meta?.has_auth_check,
            isMatch: isMatch(f.name)
          }
        };
      });

      rfEdges = graph.edges.filter(e => e.type === 'calls').map(e => {
        return {
          id: e.id,
          source: e.from,
          target: e.to || e.from, // if unresolved, just loop it for now or point nowhere
          type: 'smoothstep',
          animated: !e.resolved,
          style: {
             stroke: e.resolved ? '#64748b' : '#ef4444',
             strokeWidth: 2,
             strokeDasharray: e.resolved ? 'none' : '5,5'
          },
          markerEnd: { type: MarkerType.ArrowClosed, color: e.resolved ? '#64748b' : '#ef4444' }
        };
      });
    }

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(rfNodes, rfEdges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [graph, viewMode, expandedContracts, searchQuery, setNodes, setEdges]);

  // Re-apply selection state
  useEffect(() => {
    setNodes(nds => nds.map(n => ({ ...n, selected: n.id === selectedNodeId })));
  }, [selectedNodeId, setNodes]);

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 z-10 bg-card p-1 rounded-lg border shadow-sm flex gap-1">
        <button 
          className={clsx("px-3 py-1 text-xs rounded-md transition-colors", viewMode === 'contract' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted')}
          onClick={() => setViewMode('contract')}
        >
          Contract View
        </button>
        <button 
          className={clsx("px-3 py-1 text-xs rounded-md transition-colors", viewMode === 'function' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted')}
          onClick={() => setViewMode('function')}
        >
          Function View
        </button>
      </div>

      <div className="absolute bottom-6 left-4 z-10 bg-card/80 backdrop-blur text-xs p-3 rounded-lg border shadow-sm flex flex-col gap-2">
        <div className="font-semibold border-b pb-1 mb-1">Legend</div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-slate-500"></div>
          <span>Resolved Call</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-red-500 border-dashed border-b-2"></div>
          <span>Unresolved Call</span>
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => onNodeSelect(node.id)}
        onPaneClick={() => onNodeSelect(null)}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        <Background className="bg-muted/20" />
        <Controls className="bg-card border-border fill-foreground" />
      </ReactFlow>
    </div>
  );
}
