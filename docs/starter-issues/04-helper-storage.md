# Detect Storage Access in Helper Functions
Labels: analyzer-soroban, complexity:medium

**Justification**: Requires AST traversal adjustments in the Rust parser logic.

**Background**
Our `soroban-failure-helpers` fixture currently fails because the Soroban analyzer only looks for storage access (e.g., `env.storage().instance().set()`) directly inside the contract methods. If a contract method calls a helper function that performs the storage access, we miss it.

**Scope**
- `packages/analyzer-soroban/src/parser.ts` (or similar file handling AST traversal)
- `packages/analyzer-soroban/test/golden.test.ts`

**Acceptance Criteria**
- [ ] Update the AST parser to track calls to internal helper functions and bubble up their storage access.
- [ ] Fix the golden test for `soroban-failure-helpers` so that it passes instead of exhibiting failure.

**How to Test**
Run `pnpm test` in the `packages/analyzer-soroban` directory and ensure the `soroban-failure-helpers` test passes.
