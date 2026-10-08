# Dynamic AST Instrumentation and Runtime Telemetry
Labels: feature, backend, complexity:hardest

**Justification**: This is an extremely complex and monumental task requiring advanced computer science, compiler theory, or distributed systems knowledge.

**Background**
Inject telemetry instrumentation directly into the Rust AST before compilation, allowing CodeGraph to capture live runtime metrics that sync back to the graph.

**Scope**
- Core architectural overhaul
- Multiple new sub-packages and heavy refactoring

**Acceptance Criteria**
- [ ] Research and design a technical specification.
- [ ] Implement the core engine features.
- [ ] Provide extensive unit and integration tests.
- [ ] Successfully run against a mega-monorepo without crashing.

**How to Test**
Extensive manual validation and robust automated test suites required.
