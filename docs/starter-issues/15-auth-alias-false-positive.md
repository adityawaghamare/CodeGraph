# Fix False-Positive in `no-auth-state-change` for Auth Aliases
Labels: bug, backend, complexity:trivial

**Justification**: Simple regex or AST check addition for an edge case.

**Background**
The `no-auth-state-change` heuristic checks if a state-changing function calls `require_auth()`. However, if developers alias the auth call (e.g., `let auth = env.client(); auth.require_auth();`), the heuristic currently flags it as a false positive.

**Scope**
- `packages/core/src/heuristics/no-auth-state-change.ts`

**Acceptance Criteria**
- [ ] Update the heuristic logic to correctly identify `require_auth` even if called via a local variable alias.
- [ ] Ensure the heuristic does not flag these cases anymore.

**How to Test**
Add a small test case in `packages/core/test/heuristics.test.ts` mocking a node that uses an aliased auth call, and assert the heuristic ignores it.
