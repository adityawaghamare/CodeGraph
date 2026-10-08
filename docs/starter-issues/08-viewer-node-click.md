# Add Node Click Handler in Frontend Viewer
Labels: frontend, complexity:medium

**Justification**: React frontend task involving event handling on a third-party graph library.

**Background**
In the `apps/web` frontend viewer, clicking a node (a contract or function) currently does nothing. We want a sidebar to open and display details about the node (e.g., lines of code, authorization requirements) when clicked.

**Scope**
- `apps/web/src/GraphViewer.tsx`
- `apps/web/src/Sidebar.tsx`

**Acceptance Criteria**
- [ ] Add an `onClick` event listener to the graph nodes.
- [ ] Wire the selected node's data to the `Sidebar` component state.
- [ ] Display the node's `name`, `type`, and `metadata` in the sidebar.

**How to Test**
Run `pnpm dev` in `apps/web`, click a node in the graph, and verify the sidebar opens with the correct information.
