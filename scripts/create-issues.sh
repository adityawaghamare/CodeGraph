#!/usr/bin/env bash
set -e
echo "Starting issue setup for Wave..."

# 1. Create Labels
gh label create "complexity:trivial" --color "c2e0c6" --description "Trivial complexity (100 pts)" --force
gh label create "complexity:medium" --color "fef2c0" --description "Medium complexity (150 pts)" --force
gh label create "complexity:high" --color "d93f0b" --description "High complexity (200+ pts)" --force

gh label create "area:cli" --color "1d76db" --description "CLI related" --force
gh label create "area:core" --color "1d76db" --description "Core engine" --force
gh label create "area:analyzer-soroban" --color "1d76db" --description "Soroban analyzer" --force
gh label create "area:analyzer-ts" --color "1d76db" --description "TS analyzer" --force
gh label create "area:web" --color "1d76db" --description "Web frontend" --force
gh label create "area:docs" --color "1d76db" --description "Documentation" --force

gh label create "type:bug" --color "d73a4a" --description "Bug" --force
gh label create "type:feature" --color "a2eeef" --description "Feature" --force
gh label create "type:enhancement" --color "a2eeef" --description "Enhancement" --force
gh label create "type:documentation" --color "0075ca" --description "Documentation" --force
gh label create "type:test" --color "0075ca" --description "Test" --force
gh label create "good first issue" --color "7057ff" --description "Good for newcomers" --force

echo "Editing issues #1-#16..."

# ISSUE 14
cat << 'EOF' > /tmp/issue14.md
## Goal
Add a `--version` flag to the CLI to output the current tool version.
## Context
Users need a way to check which version of CodeGraph they have installed to debug issues and ensure they have the latest features.
## Files to touch
- `apps/cli/src/index.ts`
- `apps/cli/package.json`
## Steps / hints
- Read the version from `package.json` or inject it during the build process.
- Register a `-v, --version` flag using the CLI framework in `index.ts`.
- Print the version and exit successfully.
## Acceptance criteria
- [ ] Running `codegraph --version` outputs the version string (e.g., `1.0.0`).
- [ ] Running `codegraph -v` works identically.
- [ ] Update CLI docs in `README.md` if necessary.
## Out of scope
Adding update checks or fetching the latest version from npm.
## Complexity: trivial
EOF
gh issue edit 14 --title "Add \`codegraph --version\` Command Option" --body-file /tmp/issue14.md --add-label "complexity:trivial,area:cli,type:feature,good first issue"

# ISSUE 2
cat << 'EOF' > /tmp/issue2.md
## Goal
Improve formatting of CLI error messages for a better user experience.
## Context
Currently, when the CLI encounters an error (like an invalid path), it dumps a raw JavaScript stack trace. We need clean, formatted error messages.
## Files to touch
- `apps/cli/src/index.ts`
## Steps / hints
- Catch exceptions in the main CLI entry point.
- Use an existing library or ANSI codes to format errors in red.
- Hide the stack trace for expected application errors (like file not found).
## Acceptance criteria
- [ ] Run `pnpm codegraph analyze non-existent-path` and verify a clean red error is shown without a stack trace.
- [ ] Existing tests still pass.
## Out of scope
Refactoring the entire error handling system across the core packages.
## Complexity: trivial
EOF
gh issue edit 2 --title "Improve CLI Error Formatting" --body-file /tmp/issue2.md --add-label "complexity:trivial,area:cli,type:enhancement,good first issue"

# ISSUE 3
cat << 'EOF' > /tmp/issue3.md
## Goal
Create documentation explaining each heuristic run by the `codegraph check` command.
## Context
Users don't know what heuristics exist (like `no-auth-state-change`) or what to put in the `--fail-on` flag because they aren't documented.
## Files to touch
- `README.md`
- `docs/HEURISTICS.md`
## Steps / hints
- Create `docs/HEURISTICS.md` explaining all current heuristics found in `packages/core/src/heuristics`.
- Add a link to this new file in the "Health Checks" section of `README.md`.
## Acceptance criteria
- [ ] `docs/HEURISTICS.md` exists and lists all available heuristics with a short description.
- [ ] `README.md` correctly links to the new document.
## Out of scope
Adding new heuristics or changing how the `check` command works.
## Complexity: trivial
EOF
gh issue edit 3 --title "Add Documentation Explaining Heuristics" --body-file /tmp/issue3.md --add-label "complexity:trivial,area:docs,type:documentation,good first issue"

# ISSUE 13
cat << 'EOF' > /tmp/issue13.md
## Goal
Fix the missing CI badge links in the `README.md` Quick Start section.
## Context
The `README.md` has `<!-- TODO: Add CI badge URL -->` placeholders, making the project look incomplete.
## Files to touch
- `README.md`
## Steps / hints
- Replace the TODO placeholders with actual GitHub Actions badge markdown links for the `codegraph-org/CodeGraph` repository.
- Verify the markdown preview renders correctly.
## Acceptance criteria
- [ ] The CI badge in `README.md` correctly points to the repo's GitHub Actions workflow status.
- [ ] The TODO comments are removed.
## Out of scope
Creating new CI workflows or modifying existing actions.
## Complexity: trivial
EOF
gh issue edit 13 --title "Fix README Quick-Start CI Badge Links" --body-file /tmp/issue13.md --add-label "complexity:trivial,area:docs,type:documentation,good first issue"

# ISSUE 16
cat << 'EOF' > /tmp/issue16.md
## Goal
Add a new AST parsing fixture demonstrating a function missing `require_auth`.
## Context
We need a robust test suite for the `no-auth-state-change` heuristic. Currently, we lack a specific golden fixture that clearly isolates a missing authorization check.
## Files to touch
- `fixtures/missing-auth/lib.rs`
- `packages/analyzer-soroban/test/golden.test.ts`
## Steps / hints
- Create a minimal Soroban contract in the `fixtures` directory that modifies storage but omits `require_auth`.
- Update `golden.test.ts` to include this new fixture and generate the golden JSON snapshot.
- Look at existing fixtures for how to structure the Rust file.
## Acceptance criteria
- [ ] The new fixture is analyzed during tests and successfully produces a snapshot.
- [ ] The snapshot clearly shows the state change node without an authorization dependency.
## Out of scope
Updating the heuristic logic itself.
## Complexity: trivial
EOF
gh issue edit 16 --title "Add Fixture for Missing require_auth" --body-file /tmp/issue16.md --add-label "complexity:trivial,area:analyzer-soroban,type:test"

# ISSUE 10
cat << 'EOF' > /tmp/issue10.md
## Goal
Implement a heuristic to detect unused contracts in the graph.
## Context
Over time, users accumulate legacy contracts that are no longer called by any client or other contract. Detecting these helps clean up the workspace.
## Files to touch
- `packages/core/src/heuristics/unused-contract.ts` (new)
- `packages/core/src/index.ts`
## Steps / hints
- Create a new heuristic that scans all contract nodes in the graph.
- A contract is "unused" if there are zero incoming cross-contract call edges.
- Register the heuristic in the core engine.
## Acceptance criteria
- [ ] The heuristic correctly flags isolated contract nodes.
- [ ] Tests added in the core package verifying the detection logic.
## Out of scope
Removing the unused contracts from the source code.
## Complexity: medium
EOF
gh issue edit 10 --title "Add Heuristic: Detect Unused Contracts" --body-file /tmp/issue10.md --add-label "complexity:medium,area:core,type:feature"

# ISSUE 4
cat << 'EOF' > /tmp/issue4.md
## Goal
Update the AST parser to detect storage access inside internal helper functions.
## Context
Currently, if a contract method calls a helper function that performs storage access, the analyzer misses it. This causes failures in heuristics relying on accurate storage access graphs.
## Files to touch
- `packages/analyzer-soroban/src/parser.ts`
- `packages/analyzer-soroban/test/golden.test.ts`
## Steps / hints
- Update the visitor pattern to track internal function calls within the contract module.
- Bubble up the storage access metadata to the calling contract method.
- Update tests to ensure `soroban-failure-helpers` passes.
## Acceptance criteria
- [ ] Golden tests for helper function storage access pass correctly.
- [ ] AST output links the storage access to the parent contract method.
## Out of scope
Cross-contract helper function tracking.
## Complexity: medium
EOF
gh issue edit 4 --title "Detect Storage Access in Helper Functions" --body-file /tmp/issue4.md --add-label "complexity:medium,area:analyzer-soroban,type:bug"

# ISSUE 5
cat << 'EOF' > /tmp/issue5.md
## Goal
Support parsing Soroban contracts defined inside Rust macros.
## Context
The AST parser only looks for `impl` blocks at the top level. Contracts generated inside macros are missed entirely, reducing graph coverage.
## Files to touch
- `packages/analyzer-soroban/src/parser.ts`
- `packages/analyzer-soroban/test/golden.test.ts`
## Steps / hints
- Expand AST traversal to recognize common macro expansions or specific macro patterns defining contracts.
- Ensure the `soroban-failure-macros` fixture is correctly parsed.
## Acceptance criteria
- [ ] The parser successfully identifies contracts hidden behind macro definitions in the test fixtures.
- [ ] Golden test snapshots are updated and pass.
## Out of scope
Fully evaluating arbitrary, unknown Rust macros.
## Complexity: medium
EOF
gh issue edit 5 --title "Support Contracts Defined Inside Rust Macros" --body-file /tmp/issue5.md --add-label "complexity:medium,area:analyzer-soroban,type:bug"

# ISSUE 8
cat << 'EOF' > /tmp/issue8.md
## Goal
Add an interactive click handler for nodes in the web viewer.
## Context
The web viewer displays the graph, but users cannot interact with it to see detailed properties of a specific contract or function.
## Files to touch
- `apps/web/src/GraphViewer.tsx`
## Steps / hints
- Attach an `onClick` event listener to the rendered graph nodes.
- When clicked, display a side panel or modal with the node's JSON metadata.
## Acceptance criteria
- [ ] User-visible behavior: Clicking a node highlights it and displays its details.
- [ ] Data contract: Display all relevant metadata fields from `packages/shared`.
- [ ] UI provides a way to deselect the node.
- [ ] 1280px and 375px check: Ensure panel renders well on desktop and mobile.
- [ ] keyboard access: Ensure nodes can be selected via keyboard navigation.
- [ ] before/after screenshot in the PR.
## Out of scope
Editing the node metadata through the UI.
## Complexity: medium
EOF
gh issue edit 8 --title "Add Node Click Handler in Frontend Viewer" --body-file /tmp/issue8.md --add-label "complexity:medium,area:web,type:feature"

# ISSUE 15
cat << 'EOF' > /tmp/issue15.md
## Goal
Fix a false positive in the `no-auth-state-change` heuristic when authorization uses aliases.
## Context
The heuristic flags state-changing methods that don't call `require_auth()`. However, if the contract uses a wrapper or alias for auth, it incorrectly reports a failure.
## Files to touch
- `packages/core/src/heuristics.ts`
- `packages/core/test/heuristics.test.ts`
## Steps / hints
- Refine the heuristic logic to accept known auth aliases or check for a custom flag in the parsed metadata.
- Add a test case demonstrating the false positive is resolved.
## Acceptance criteria
- [ ] The heuristic accurately bypasses methods using authenticated wrappers.
- [ ] Tests verify both true positives and the corrected false positive.
## Out of scope
Changing how the Rust analyzer identifies auth aliases natively.
## Complexity: high
EOF
gh issue edit 15 --title "Fix no-auth-state-change False Positive for Auth Aliases" --body-file /tmp/issue15.md --add-label "complexity:high,area:core,type:bug"

# ISSUE 7
cat << 'EOF' > /tmp/issue7.md
## Goal
Fix parsing traversal for deeply nested workspaces.
## Context
When analyzing large monorepos, the analyzer sometimes stops at the first `Cargo.toml` it finds and misses deeply nested Soroban contracts.
## Files to touch
- `packages/analyzer-soroban/src/discovery.ts`
## Steps / hints
- Update the file traversal logic to recursively search for `Cargo.toml` files, bypassing standard depth limits for workspaces.
- Ensure workspaces defined via the `[workspace]` array are correctly parsed.
## Acceptance criteria
- [ ] Running the analyzer on a multi-tier nested workspace correctly identifies all contracts.
- [ ] Tests added for nested workspace discovery.
## Out of scope
Cross-workspace call resolution (handled in a separate issue).
## Complexity: high
EOF
gh issue edit 7 --title "Fix Nested Workspace Traversal" --body-file /tmp/issue7.md --add-label "complexity:high,area:analyzer-soroban,type:bug"

# ISSUE 6
cat << 'EOF' > /tmp/issue6.md
## Goal
Resolve cross-contract calls made using generated `Client` wrapper structs.
## Context
Soroban generates `Client` structs for contracts. The analyzer currently misses cross-contract calls made via `TokenClient::new(env, &id).transfer(...)`.
## Files to touch
- `packages/analyzer-soroban/src/call-resolver.ts`
- `packages/analyzer-soroban/test/golden.test.ts`
## Steps / hints
- Detect instantiations of `*Client` structs.
- Map method calls on these client structs to their corresponding contract invocations.
- Fix the `soroban-failure-clients` fixture.
## Acceptance criteria
- [ ] The AST accurately links `Client` wrapper invocations to the target contract graph node.
- [ ] Golden tests pass with the newly resolved edges.
## Out of scope
Resolving dynamic `env.invoke_contract` calls (handled elsewhere).
## Complexity: high
EOF
gh issue edit 6 --title "Resolve Client Wrapper Calls Correctly" --body-file /tmp/issue6.md --add-label "complexity:high,area:analyzer-soroban,type:enhancement"

# ISSUE 9
cat << 'EOF' > /tmp/issue9.md
## Goal
Render unresolved cross-contract calls with a dashed line in the frontend viewer.
## Context
Visually distinguishing between successfully resolved contract calls and unresolved ones helps users identify gaps in the graph.
## Files to touch
- `apps/web/src/GraphViewer.tsx`
## Steps / hints
- Read the edge type from the JSON graph data.
- If the edge is marked as `unresolved`, apply a dashed stroke to the SVG/Canvas edge.
## Acceptance criteria
- [ ] User-visible behavior: Unresolved call edges visually appear as dashed lines.
- [ ] Data contract: Reads the `unresolved` boolean from edge data.
- [ ] 1280px and 375px check: Ensures lines render properly at different zoom scales.
- [ ] keyboard access: N/A (purely visual rendering).
- [ ] before/after screenshot in the PR.
## Out of scope
Fixing the unresolved calls themselves.
## Complexity: medium
EOF
gh issue edit 9 --title "Render Unresolved Calls with a Dashed Line" --body-file /tmp/issue9.md --add-label "complexity:medium,area:web,type:enhancement"

# ISSUE 11
cat << 'EOF' > /tmp/issue11.md
## Goal
Implement cross-contract call resolution via `env.invoke_contract` and generated client types.
## Context
Our cross-contract resolution is low. The README notes 18/18 unresolved calls on the pinned `soroban-examples`. Resolving explicit `env.invoke_contract` usages will significantly improve this.
## Files to touch
- `packages/analyzer-soroban/src/call-resolver.ts`
- `packages/analyzer-soroban/test/golden.test.ts`
## Steps / hints
- Identify usages of `env.invoke_contract` in the AST.
- Attempt to statically trace the target contract ID argument to a known contract in the workspace.
- Generate resolution edges in the JSON output.
## Acceptance criteria
- [ ] Reduces the 18/18 unresolved calls in the `soroban-examples` test suite to at least 10/18 unresolved.
- [ ] Tests and fixtures added.
- [ ] Docs/README updated if behavior changes.
## Out of scope
Cross-workspace call resolution.
## Complexity: high (scope: large)
EOF
gh issue edit 11 --title "Cross-Contract Call Resolution via invoke_contract" --body-file /tmp/issue11.md --add-label "complexity:high,area:analyzer-soroban,type:feature"

# ISSUE 1
cat << 'EOF' > /tmp/issue1.md
## Goal
Implement an SVG export option for the architecture graph using a graphviz-based layout.
## Context
Users frequently request the ability to export the architecture directly to an SVG image for wikis without relying on Mermaid rendering.
## Files to touch
- `apps/cli/package.json`
- `apps/cli/src/index.ts`
## Steps / hints
- Add an `svg` option to the `--format` flag in the `export` command.
- Integrate a Graphviz or D3-based renderer to convert the graph JSON into a structured SVG string.
- Add integration tests verifying valid SVG output.
## Acceptance criteria
- [ ] Running `codegraph export graph.json --format svg -o graph.svg` generates a valid SVG file.
- [ ] Tests added/updated to verify SVG format logic.
## Out of scope
Interactive SVG exports (keep it static).
## Complexity: high (scope: large)
EOF
gh issue edit 1 --title "Implement SVG Export Option (Graphviz Layout)" --body-file /tmp/issue1.md --add-label "complexity:high,area:cli,type:feature"

# ISSUE 12
cat << 'EOF' > /tmp/issue12.md
## Goal
Build a cross-crate and cross-workspace call resolution engine.
## Context
Large Soroban projects span multiple crates and workspaces. The current analyzer fails to connect calls that cross crate boundaries, causing fragmented graphs.
## Files to touch
- `packages/analyzer-soroban/src/discovery.ts`
- `packages/analyzer-soroban/src/call-resolver.ts`
- `packages/core/src/index.ts`
## Steps / hints
- Implement an engine that maps exported functions in one crate to dependencies in another.
- Execute benchmarks on `soroban-examples` to verify improved resolution.
- Create a documented resolution-rate metric that the CLI outputs.
## Acceptance criteria
- [ ] Cross-crate calls successfully resolve to unified edges in the graph.
- [ ] Benchmarks provided for `soroban-examples`.
- [ ] CLI outputs a "Resolution Rate" metric during analysis.
- [ ] Tests added/updated.
## Out of scope
Resolving dynamic or completely external dependencies not available locally.
## Complexity: high (scope: large)
EOF
gh issue edit 12 --title "Cross-Crate Call Resolution Engine" --body-file /tmp/issue12.md --add-label "complexity:high,area:analyzer-soroban,type:feature"

# Clean up internal point labels
for i in {1..16}; do
  gh issue edit $i --remove-label "points:100,points:150,points:200,points:400,points:800,bug,feature,enhancement,documentation" || true
done

echo "Setup complete!"
