# Support Contracts Defined Inside Rust Macros
Labels: analyzer-soroban, complexity:medium

**Justification**: Intermediate AST parsing task to handle nested structures.

**Background**
The `soroban-failure-macros` fixture demonstrates a failure where a Soroban contract is generated inside a Rust macro. The current AST parser only looks for `impl` blocks at the top level or specific modules, missing those obfuscated by macros.

**Scope**
- `packages/analyzer-soroban/src/parser.ts`
- `packages/analyzer-soroban/test/golden.test.ts`

**Acceptance Criteria**
- [ ] Expand the AST traversal to scan inside macro expansions or recognize common macro patterns that define contracts.
- [ ] Ensure the contract inside `soroban-failure-macros` is correctly detected and added to the graph.
- [ ] Update the golden test to assert success.

**How to Test**
Run `pnpm test` in `packages/analyzer-soroban` and ensure `soroban-failure-macros` passes.
