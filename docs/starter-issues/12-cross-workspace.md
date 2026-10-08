# Cross-Workspace Contract Call Resolution
Labels: backend, parser, complexity:high

**Justification**: Requires multi-pass analysis and complex symbol resolution across isolated workspaces.

**Background**
In large ecosystems, a contract might call a client wrapper imported from a completely separate Cargo workspace published to a local registry or relative path. Currently, `analyzer-soroban` only resolves calls within the same workspace tree. 

**Scope**
- `packages/core/src/builder.ts`
- `packages/analyzer-soroban/src/call-resolver.ts`

**Acceptance Criteria**
- [ ] Implement a two-pass resolution strategy. First pass registers all globally known contract IDs or crate names.
- [ ] Second pass resolves client calls by looking up the crate name in the global registry, even if it resides in a parallel workspace directory.
- [ ] Update the edge logic to cleanly link across workspaces.

**How to Test**
Add a fixture with two sibling Cargo workspaces where workspace A depends on workspace B. Run the CLI and verify `resolved: true` for the cross-workspace call.
