# Add Documentation Explaining Heuristics
Labels: documentation, complexity:trivial

**Justification**: Purely markdown documentation changes based on existing codebase knowledge.

**Background**
The `codegraph check` command runs heuristics to detect potential issues (e.g., `no-auth-state-change`). However, these heuristics and their IDs are not documented anywhere, making it hard for users to know what to put in the `--fail-on` option.

**Scope**
- `README.md`
- `docs/HEURISTICS.md` (new file)

**Acceptance Criteria**
- [ ] Create `docs/HEURISTICS.md` explaining all current heuristics (read the `packages/core/src/heuristics` folder for reference).
- [ ] Link to this new document from the `README.md` under the Health Checks section.

**How to Test**
Review the markdown file visually or using a markdown previewer to ensure formatting and links are correct.
