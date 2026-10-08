# Resolve Client Wrapper Calls Correctly
Labels: analyzer-soroban, complexity:medium

**Justification**: Requires analyzing the `Client` struct generation pattern in Soroban.

**Background**
When a contract calls another contract using the generated `Client` wrapper (e.g., `TokenClient::new(env, &id).transfer(...)`), the analyzer fails to map this to a cross-contract call edge, as seen in the `soroban-failure-clients` fixture.

**Scope**
- `packages/analyzer-soroban/src/call-resolver.ts` (or similar)
- `packages/analyzer-soroban/test/golden.test.ts`

**Acceptance Criteria**
- [ ] Detect instantiations of `*Client` structs.
- [ ] Map method calls on these client structs to their corresponding contract invocations.
- [ ] Fix the `soroban-failure-clients` golden test.

**How to Test**
Run `pnpm test` in `packages/analyzer-soroban`.
