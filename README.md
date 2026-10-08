# CodeGraph

**Open-source visual code intelligence for Stellar/Soroban codebases.**

[![CI](https://github.com/codegraph-org/CodeGraph/actions/workflows/ci.yml/badge.svg)](https://github.com/codegraph-org/CodeGraph/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Problem

Understanding large, multi-contract Stellar/Soroban projects can be daunting. Tracking cross-contract calls, determining which functions change state without requiring authorization, and maintaining up-to-date architecture documentation take significant manual effort and are prone to errors as projects evolve.

## What it does

CodeGraph statically analyzes your Soroban smart contracts and builds an architecture graph. Verified features include:
- **Soroban Analyzer:** Parses Rust code to detect contracts, functions, authorization requirements (`require_auth`), and state mutations.
- **Graph Generation:** Emits a comprehensive architecture graph in JSON format.
- **Documentation Generation:** Automatically generates Markdown documentation (`ARCHITECTURE.md`) from the analyzed graph.
- **Export Capabilities:** Exports the graph into Mermaid or DOT format for easy integration into existing wikis or visualizers.
- **Health Checks:** Runs basic heuristic checks to identify potential security or design flaws (e.g., state-changing functions missing authorization).

## Quick start

Run the CLI using Node or pnpm:

```bash
# Clone and install
git clone https://github.com/codegraph-org/CodeGraph.git
cd CodeGraph
pnpm install
pnpm build

# Analyze a Soroban codebase and output graph.json
node apps/cli/dist/index.js analyze ./path/to/project -o graph.json

# Run heuristic health checks on the generated graph
node apps/cli/dist/index.js check graph.json

# Generate an ARCHITECTURE.md document
node apps/cli/dist/index.js docs graph.json -o ARCHITECTURE.md

# Export the graph to a Mermaid diagram
node apps/cli/dist/index.js export graph.json --format mermaid -o graph.mermaid
```

*(Note: Replace `node apps/cli/dist/index.js` with your preferred runner or binary once published.)*

## Example output

```text
--- Analysis Coverage ---
Unresolved Cross-Contract Calls: 0/1 (0.0%)

--- Health Checks ---
[WARNING] no-auth-state-change: Contract 'MissingAuthContract' method 'update_state' mutates state without calling require_auth.
```

## How it works

1. **Analyzer Packs:** Language-specific plugins (like `analyzer-soroban`) walk the directory tree and use AST parsers to identify contract nodes, function nodes, and call edges.
2. **Core Engine:** The `core` package takes the identified nodes and edges and assembles them into a unified graph data structure.
3. **Graph Schema:** The resulting JSON explicitly maps out relationships such as cross-contract calls, authorization checks, and storage access, enabling both visualization and automated heuristics.

## Limitations

- **Static Analysis Only:** CodeGraph relies purely on static analysis. Runtime-resolved or dynamic cross-contract calls cannot be tracked.
- **Cross-Contract Resolution:** The current cross-contract call resolution rate is limited (e.g. 18/18 unresolved on `soroban-examples`). See [#11](https://github.com/codegraph-org/CodeGraph/issues/11) to track progress.
- **Heuristic False Positives:** The health check heuristics are basic and may occasionally flag safe patterns as potential issues (false positives).

## Project structure

CodeGraph is a monorepo containing:
- `apps/cli/`: The command-line interface.
- `apps/web/`: Future interactive graph viewer.
- `packages/core/`: The graph builder and heuristics engine.
- `packages/analyzer-soroban/`: The Rust AST analyzer for Soroban codebases (Tested with Soroban SDK v20.0.0).
- `packages/analyzer-ts/`: TypeScript dApp analyzer (planned).
- `packages/shared/`: Shared types and interfaces.

## Roadmap

- [ ] SVG image export from graph data
- [ ] Improved CLI ergonomics and clearer error messages
- [ ] Interactive frontend viewer for exploring graphs
- [ ] TypeScript analyzer for full-stack dApp intelligence
- [ ] Improved cross-contract call resolution accuracy

## Milestone 4 Preview
![CodeGraph Screenshot Placeholder](https://via.placeholder.com/800x400.png?text=CodeGraph+Interactive+Viewer)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to set up the repository, add new fixtures, or write new analyzer packs.

## Security

Please report vulnerabilities privately. Note that the parsed code is strictly statically analyzed and never executed. Read our full [SECURITY.md](SECURITY.md) policy.

## License

CodeGraph is released under the MIT License. See [LICENSE](LICENSE) for details.
