import type { Graph } from '@codegraph/shared';
import { Search, Info, ShieldAlert, HeartPulse, FileJson, ArrowRight } from 'lucide-react';

export function Sidebar({ graph, selectedNodeId, searchQuery, setSearchQuery }: {
  graph: Graph,
  selectedNodeId: string | null,
  searchQuery: string,
  setSearchQuery: (s: string) => void
}) {
  const selectedNode = selectedNodeId ? graph.nodes.find(n => n.id === selectedNodeId) : null;

  return (
    <div className="w-[350px] flex-shrink-0 h-full border-r bg-card flex flex-col">
      <div className="p-4 border-b space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileJson className="w-5 h-5 text-primary" />
          CodeGraph
        </h2>
        
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search contracts, functions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-background border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {selectedNode ? (
          <div className="p-4 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Node Details</span>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">
                  {selectedNode.type}
                </span>
              </div>
              <h3 className="text-lg font-mono font-bold break-all">{selectedNode.name}</h3>
              <div className="text-xs text-muted-foreground mt-1 break-all">
                {selectedNode.file}:{selectedNode.span.startLine}-{selectedNode.span.endLine}
              </div>
            </div>

            {selectedNode.type === 'function' && (
              <div className="space-y-2">
                <div className="text-sm font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> Auth Status
                </div>
                <div className="text-sm">
                  {selectedNode.meta?.has_auth_check ? (
                    <span className="text-green-500 font-medium">Visible Auth Check Found</span>
                  ) : (
                    <span className="text-red-400 font-medium">No Auth Check</span>
                  )}
                </div>
              </div>
            )}

            {selectedNode.type === 'contract' && (
              <div className="space-y-2">
                <div className="text-sm font-semibold">Contract Stats</div>
                <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
                  <div className="bg-muted p-2 rounded">
                    Functions: {graph.nodes.filter(n => n.type === 'function' && n.meta?.parentContract === selectedNode.id).length}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-sm font-semibold">Outgoing Calls</div>
              <div className="space-y-2">
                {graph.edges.filter(e => e.type === 'calls' && e.from === selectedNode.id).length === 0 ? (
                  <div className="text-sm text-muted-foreground">None</div>
                ) : (
                  graph.edges.filter(e => e.type === 'calls' && e.from === selectedNode.id).map(e => (
                    <div key={e.id} className="text-xs bg-muted p-2 rounded border flex flex-col gap-1">
                      <div className="flex items-center gap-1 font-mono">
                        <ArrowRight className="w-3 h-3" />
                        {e.to ? graph.nodes.find(n => n.id === e.to)?.name || e.to : 'Unresolved Target'}
                      </div>
                      <div className="flex justify-between items-center opacity-70">
                        <span>Confidence: {e.confidence}</span>
                        <span className={e.resolved ? "text-green-500" : "text-red-400"}>
                          {e.resolved ? 'Resolved' : 'Unresolved'}
                        </span>
                      </div>
                      {e.evidence && (
                        <div className="text-[10px] break-all border-t pt-1 mt-1 border-border/50">
                          {e.evidence.file}:{e.evidence.line}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 text-center border border-dashed">
              <Info className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Select a node in the graph to view details</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-primary" /> Health Checks
              </h3>
              
              {graph.coverage && (
                <div className="text-xs bg-muted p-3 rounded-md border space-y-1">
                  <div className="font-semibold text-foreground">Analysis Coverage</div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Files Analyzed:</span>
                    <span>{graph.coverage.filesAnalyzed}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Files Skipped:</span>
                    <span>{graph.coverage.skippedFiles.length}</span>
                  </div>
                </div>
              )}

              {!graph.heuristics || graph.heuristics.length === 0 ? (
                <div className="text-sm text-muted-foreground">No health issues found.</div>
              ) : (
                <div className="space-y-3">
                  {graph.heuristics.map(h => (
                    <div key={h.id} className="border rounded-md overflow-hidden">
                      <div className="bg-muted p-2 border-b">
                        <div className="font-semibold text-sm flex justify-between items-center">
                          {h.name}
                          <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full">
                            {h.count}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-card space-y-2">
                        <p className="text-xs text-muted-foreground">{h.description}</p>
                        {h.falsePositiveNote && (
                          <div className="bg-yellow-500/10 border-l-2 border-yellow-500 p-2 text-[10px] text-yellow-600 dark:text-yellow-400">
                            <strong>Note:</strong> {h.falsePositiveNote}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
