# Improve CLI Error Formatting
Labels: good first issue, complexity:trivial

**Justification**: Straightforward text formatting changes to the console output.

**Background**
When the CLI encounters an error (like an invalid path or a malformed JSON), it simply dumps a JavaScript stack trace or a raw error message. This is poor UX. We need clean, colorful error messages that explain what went wrong.

**Scope**
- `apps/cli/src/index.ts`

**Acceptance Criteria**
- [ ] Catch errors across all commands (`analyze`, `docs`, `export`, `check`).
- [ ] Use a library like `chalk` or standard ANSI codes to format errors in red.
- [ ] Provide user-friendly error messages (e.g., "File not found: <path>") instead of stack traces.

**How to Test**
Run `pnpm codegraph analyze non-existent-path` and verify the output is formatted cleanly in red without a stack trace.
