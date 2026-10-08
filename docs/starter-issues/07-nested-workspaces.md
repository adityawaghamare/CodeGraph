# Fix Nested Workspace Traversal
Labels: parser, complexity:medium

**Justification**: Involves adjusting the directory walking and workspace parsing logic.

**Background**
The `soroban-failure-workspace` fixture highlights an issue where CodeGraph stops traversing when it hits a nested Cargo workspace, failing to locate all contracts within sub-crates.

**Scope**
- `packages/core/src/walker.ts`
- `packages/analyzer-soroban/src/plugin.ts`

**Acceptance Criteria**
- [ ] Ensure `walker.ts` properly traverses nested Cargo workspaces.
- [ ] Ensure the `Cargo.toml` parser understands `workspace.members` that point to other directories.
- [ ] Fix the corresponding failure test.

**How to Test**
Run `pnpm test` in the core package and ensure workspace traversal covers all nested directories.
