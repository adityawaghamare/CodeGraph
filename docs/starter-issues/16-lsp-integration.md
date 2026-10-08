# Build Full Language Server Protocol (LSP) Integration
Labels: feature, backend, complexity:hardest

**Justification**: This requires deep knowledge of the Language Server Protocol (LSP), extending the core AST engine into an incremental analysis server, and creating editor extensions (VSCode/JetBrains). This is a monumental effort.

**Background**
Currently, CodeGraph is a static CLI tool that runs once to produce a graph JSON. To become a true intelligence tool, developers need real-time feedback in their editors. If a user writes a cross-contract call that lacks authorization, they should see a red squiggly line *in their editor* immediately.

**Scope**
- `packages/lsp-server/` (new package)
- `apps/vscode-extension/` (new package)
- `packages/core/` (requires refactoring for incremental/daemon-based AST parsing instead of full single-pass)

**Acceptance Criteria**
- [ ] Implement a standalone Node.js LSP daemon using `vscode-languageserver`.
- [ ] Connect the daemon to `packages/core` to continuously re-analyze the workspace on file save.
- [ ] Provide real-time diagnostics (e.g., highlighting `require_auth` failures in editor).
- [ ] Implement hover providers showing cross-contract documentation inline.
- [ ] Create a VSCode extension that successfully bundles and starts the LSP server.

**How to Test**
Install the VSCode extension locally. Open the `soroban-examples` workspace, intentionally remove an authorization check, and verify the diagnostic squiggle appears in real-time.
