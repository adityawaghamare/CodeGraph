# CodeGraph Roadmap

This roadmap captures long-term product vision and ideas that extend beyond the current scoped tasks. These concepts represent the future of CodeGraph's capabilities for static analysis of Stellar and Soroban codebases.

## Architectural & Infrastructure Themes

- **Distributed Caching Layer for AST Parsing**: Speed up parsing for large monorepos by sharing AST caches across builds.
- **Delta Analysis Engine (Architectural Drift)**: Track structural changes over time and alert on architectural drift between commits.
- **Distributed Parallel Graph Generation**: Shard graph generation for mega-monorepos across multiple workers.
- **WASM Bytecode Analyzer**: Analyze compiled `.wasm` output for consistency with the source AST.

## Advanced Analysis

- **Cross-Language Taint Analysis**: Track data flow across frontend, backend, and smart contract boundaries.
- **Symbolic Execution Engine**: Bound checking and deeper logic verification beyond static AST patterns.
- **Formal Verification Integration**: Hook into bounded model checkers to formally verify constraints.
- **Machine Learning Tech Debt Model**: Suggest code quality improvements based on structural complexity.

## Tooling & Integration

- **Automated Vulnerability Patching**: Not just identifying but automatically creating PRs for common vulnerabilities.
- **CI/CD Pipeline Policy Engine**: A robust policy language to block merges if specific graph invariants are broken (e.g., unauthorized state changes).

*(Note: Ideas like SaaS billing, generic Language Servers, and live blockchain state syncing have been excluded as they contradict our strict static-analysis and open-source tooling ethos.)*
