# Add `codegraph --version` Command Option
Labels: good first issue, complexity:trivial

**Justification**: Very simple configuration of the `commander` library.

**Background**
Currently, running `codegraph --version` works because it's defined in the CLI builder, but there is no explicitly documented `-v` or `--version` option in the help menu, and the version string is hardcoded instead of being read from `package.json`.

**Scope**
- `apps/cli/src/index.ts`
- `apps/cli/package.json`

**Acceptance Criteria**
- [ ] Read the version dynamically from `package.json` in `index.ts`.
- [ ] Pass the dynamic version to `program.version()`.
- [ ] Ensure `-v` and `--version` output the correct semantic version.

**How to Test**
Run `node apps/cli/dist/index.js --version` and verify it matches the `package.json` version.
