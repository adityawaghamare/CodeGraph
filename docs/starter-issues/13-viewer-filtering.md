# Implement Graph Filtering by Contract in Viewer
Labels: frontend, feature, complexity:high

**Justification**: Involves complex state management and graph pruning logic in the frontend.

**Background**
When analyzing a massive codebase like `soroban-examples`, the web viewer becomes cluttered. Users need the ability to select a specific contract and filter the graph to show ONLY that contract, its incoming callers, and its outgoing dependencies (a subgraph).

**Scope**
- `apps/web/src/GraphViewer.tsx`
- `apps/web/src/FilterBar.tsx` (new component)

**Acceptance Criteria**
- [ ] Add a dropdown or search bar to select a contract.
- [ ] When selected, compute the subgraph containing only adjacent nodes (incoming/outgoing calls).
- [ ] Render only the subgraph, hiding the rest of the nodes.
- [ ] Provide a "Clear Filter" button to restore the full graph.

**How to Test**
Load a large graph JSON in `apps/web`, select a contract from the new UI, and ensure non-related nodes disappear.
