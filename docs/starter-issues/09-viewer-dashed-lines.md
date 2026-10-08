# Render Unresolved Calls with a Dashed Line
Labels: frontend, complexity:medium

**Justification**: CSS and graphing library configuration task to visually distinguish edge types.

**Background**
When a cross-contract call cannot be statically resolved to a specific contract in the workspace, it's marked as `resolved: false` in the graph JSON. The web viewer currently draws all edges identically. Unresolved calls should be visually distinct so developers know the call graph is incomplete.

**Scope**
- `apps/web/src/GraphViewer.tsx`
- `apps/web/src/styles/graph.css` (or similar styling file)

**Acceptance Criteria**
- [ ] Inspect the `resolved` boolean on edge data when rendering the graph.
- [ ] Apply a dashed line style or a specific CSS class to edges where `resolved` is `false`.

**How to Test**
Run `pnpm dev` and load a graph JSON containing unresolved calls. Verify those calls appear dashed.
