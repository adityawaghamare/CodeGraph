# Implement SVG Export Option in CLI
Labels: feature, complexity:trivial

**Justification**: Only requires wiring up an existing graph output to a basic SVG generator or existing library.

**Background**
Currently, the CLI supports exporting the architecture graph to Mermaid and DOT formats. Users frequently request the ability to export directly to SVG for easier inclusion in static documentation without relying on dynamic Mermaid rendering. 

**Scope**
- `apps/cli/package.json`
- `apps/cli/src/index.ts`
- `apps/cli/src/docs.ts`

**Acceptance Criteria**
- [ ] Add `svg` as a supported option to `--format` in the `export` command.
- [ ] Update the CLI logic to render the Mermaid string into an SVG (e.g., using a library like `mermaid-cli` or similar, or just converting the DOT output to SVG if easier).
- [ ] Ensure the generated SVG file is valid and can be opened in a web browser.

**How to Test**
Run `pnpm codegraph export graph.json --format svg -o graph.svg` and visually verify the generated `graph.svg`.
