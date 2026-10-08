# Implement TypeScript dApp Analyzer
Labels: analyzer-ts, feature, complexity:high

**Justification**: Requires building a new AST parser plugin from scratch for a new language.

**Background**
Currently, CodeGraph only analyzes the Rust smart contracts (`analyzer-soroban`). A key roadmap feature is to analyze the frontend TypeScript dApp code to see exactly which UI components call which Soroban contracts.

**Scope**
- `packages/analyzer-ts/` (entire package needs implementation)
- `apps/cli/src/index.ts`

**Acceptance Criteria**
- [ ] Create a `TsAnalyzerPlugin` implementing the core plugin interface.
- [ ] Use `ts-morph` or `typescript` compiler API to parse `.ts` and `.tsx` files.
- [ ] Detect imports of the generated `soroban-client` bindings.
- [ ] Add nodes for the TS files/components and edges connecting them to the Soroban contract nodes.
- [ ] Register the plugin in the CLI.

**How to Test**
Run `pnpm test` against a new fixture containing a basic React/TypeScript dApp that calls a Soroban contract.
