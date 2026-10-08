# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Core Engine**: `GraphBuilder` now tracks analysis coverage metadata (`filesAnalyzed`, `skippedFiles`).
- **Core Engine**: A powerful heuristics engine identifying "Unresolved Cross-Contract Calls", "State-Changing Functions Without Auth" (respecting internal reachability of auth checks), and "Intra-Contract Storage Key Durability Conflict" limits.
- **CLI**: `codegraph check <graph.json>` command to print coverage and health checks, with a `--fail-on` option to return non-zero exit codes for CI environments.
- **CLI**: `codegraph docs <graph.json>` command to generate an interactive Markdown architecture document of the parsed graph. Supports `--detail function` to print all function structures.
- **CLI**: `codegraph export <graph.json>` command to convert the raw graph into `mermaid` or `dot` (Graphviz) strings for rendering, mapping dependencies, reads, writes, and calls automatically. Unresolved calls are rendered with dashed edges.
- **CLI Integration**: Automatically prints a version string (via commander) using `-V` or `--version`.
- **Analyzer-Soroban**: Identifies `require_auth` and `require_auth_for_args` checks recursively inside AST bodies and tags functions that contain them.
- **Analyzer-Soroban**: Resolves intra-contract reachability (calls made inside the same contract) to safely mark an entrypoint as authorized if it delegates auth to an internal function.
- **Analyzer-Soroban**: Infers storage durability (`instance`, `persistent`, `temporary`) alongside storage key symbols directly from AST.

### Changed
- Refactored `analyzer-soroban` storage check heuristics to enforce intra-contract logic (e.g. flagging single contracts attempting to mutate the exact same key symbol using differing durabilities), discarding the previous cross-contract key matching logic.

### Known limitations
- **Cross-Contract Resolution Rate**: Statically resolving dynamic dispatches or cross-contract calls often yields a partial mapping. Many targets are passed at runtime (e.g. `Address` arguments), resulting in legitimately unresolved (`resolved: false`) edges in the AST.
