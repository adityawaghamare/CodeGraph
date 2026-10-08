# Contributing to CodeGraph

Thank you for your interest in contributing to CodeGraph! We appreciate your help in building better visual code intelligence tools for Stellar and Soroban.

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/CodeGraph.git
   cd CodeGraph
   ```
3. **Install dependencies** using `pnpm` (required):
   ```bash
   pnpm install
   ```

## Development Workflow

### Branch Naming
Please use descriptive branch names, prefixing them with the type of change:
- `feature/your-feature-name`
- `bugfix/issue-description`
- `docs/update-readme`

### Running Tests and Linting
Before submitting a pull request, ensure your code passes all checks:

```bash
# Run linting
pnpm lint

# Run formatting
pnpm format

# Run tests
pnpm test
```

### Commit Style
Write clear, concise commit messages. If your commit fixes an issue, reference it (e.g., `Fix #123: Correct Soroban client call resolution`).

## Adding an Analyzer Pack

If you are creating a new analyzer (e.g., for a different language or framework):
1. Create a new directory in `packages/analyzer-YOUR_TECH/`.
2. Ensure your package exports an implementation of the plugin interface that `core` expects.
3. Update `apps/cli/package.json` and `apps/cli/src/index.ts` to detect and utilize your new plugin.

## Adding a Fixture with a Golden Test

Fixtures are critical for ensuring parsing accuracy. To add a new one:
1. Create a new directory in `fixtures/` with a descriptive name (e.g., `fixtures/my-new-case/`).
2. Add the minimal source code needed to reproduce the parsing scenario.
3. In the relevant analyzer package tests (e.g., `packages/analyzer-soroban/test/golden.test.ts`), add a test case that runs your fixture and asserts against a known "golden" JSON output snapshot.

## Your First Contribution

Not sure where to start? Check our issue tracker for issues labeled `good first issue`. 
We recommend starting with a documentation update, a simple CLI ergonomics improvement, or a basic parser fix. 

## Pull Request Checklist

When submitting a PR, ensure you:
- [ ] Provide a clear description of the changes.
- [ ] Include test coverage for any new features or bug fixes.
- [ ] Add golden tests if modifying an AST parser.
- [ ] Verify that `pnpm test` and `pnpm lint` succeed locally.

## Issue Labels Explained

- `good first issue`: Accessible for newcomers.
- `help wanted`: Maintainers need community assistance.
- `bug`: Something isn't working properly.
- `feature`: A request for new functionality.
- `documentation`: Docs updates.
- `parser`: Core AST parsing engine issues.
- `analyzer-soroban` / `analyzer-ts`: Tech-specific analyzer issues.
- `frontend` / `backend`: UI and core node backend tasks.
- `complexity:trivial` (100 pts), `complexity:medium` (150 pts), `complexity:high` (200 pts): Indicate the expected effort required to complete the issue.

## Review Expectations

We aim to review and provide the first response to all issues and PRs within **48 hours**. We appreciate your patience and effort!
