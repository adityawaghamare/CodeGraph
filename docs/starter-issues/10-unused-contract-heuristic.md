# Add Heuristic: Detect Unused Contracts
Labels: backend, complexity:medium

**Justification**: Requires writing graph traversal logic using the existing graph builder API.

**Background**
A large workspace might contain old contracts that are no longer used or deployed. We can write a heuristic to flag contracts that have zero incoming edges and do not export a public `__constructor` or explicit initialization function that might hint they are entry points.

**Scope**
- `packages/core/src/heuristics/unused-contract.ts` (new file)
- `packages/core/src/heuristics/index.ts`

**Acceptance Criteria**
- [ ] Create a new heuristic `unused-contract`.
- [ ] Traverse the graph and find contract nodes with 0 incoming `calls` edges.
- [ ] Exclude contracts that have a known entry point or constructor if defined in the metadata.
- [ ] Ensure it runs during the `codegraph check` command.

**How to Test**
Run `pnpm test` in `packages/core` and add a small test verifying an isolated contract is flagged.
