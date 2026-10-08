#!/usr/bin/env bash

# Array of 25 hardest issues
# Format: "Title|Background"

issues=(
  "Implement Full WASM Bytecode Decompiler/Analyzer|Analyzing Rust source code is limited if the deployed contract diverges. We need a full WASM bytecode analyzer that decompiles deployed Soroban contracts and builds an architecture graph strictly from binaries."
  "Distributed Parallel Graph Generation for Mega-Monorepos|Currently, the AST parser runs on a single thread. For massive codebases, we need a distributed, MapReduce-style parallel parser that can farm out file processing across multiple machines or worker threads."
  "Build Custom WebGL-Based 3D Architecture Visualizer|2D graphs get cluttered. We need a bespoke WebGL-based 3D visualization engine (e.g., Three.js) that renders the architecture graph in a navigable 3D space with VR support."
  "Integrate LLM-Powered Automatic Refactoring Suggestions|Hook into an LLM provider to ingest heuristic failures and automatically generate, test, and propose complex architectural refactoring PRs without human intervention."
  "Symbolic Execution Engine for Soroban Contracts|Implement a symbolic execution engine to trace all possible execution paths within the AST, detecting deep reentrancy and arithmetic overflow vulnerabilities statically."
  "Formal Verification Integration via Bounded Model Checking|Integrate bounded model checking tools to mathematically prove the correctness of state transitions in the architecture graph, generating formal proofs for Soroban contracts."
  "Real-Time Collaborative Graph Editing and Annotations|Transform the web viewer into a multiplayer workspace (like Figma) using WebSockets and CRDTs, allowing multiple architects to annotate the graph simultaneously."
  "Multi-Tenant SaaS Backend with RBAC and Billing|Evolve CodeGraph from a CLI tool into a fully-fledged cloud platform. Requires implementing multi-tenancy, Role-Based Access Control, Stripe billing, and user management."
  "Automatic Generation of Integration Tests|Write an engine that traverses the graph's cross-contract call edges and automatically generates comprehensive Rust integration tests covering every possible interaction path."
  "Delta Analysis Engine (Architectural Drift)|Implement an engine that computes AST diffs between Git commits, tracking exactly how the architecture graph evolves over time and alerting on 'architectural drift'."
  "Cross-Language Taint Analysis|Implement cross-language data flow tracking. Trace user input from a TypeScript frontend component directly through the client wrappers and into the Rust contract's storage."
  "Soroban Gas Profiler Integration with Graph Overlay|Build a profiling engine that executes test suites, measures Soroban gas consumption per function, and heatmaps the architecture graph to show gas bottlenecks."
  "Standalone CodeGraph Desktop Application|Wrap the CLI and web viewer into a high-performance cross-platform Electron or Tauri desktop application with deep OS integration."
  "Cross-Chain Compatibility (Ethereum, Solana, Soroban)|Refactor the core engine to support analyzing Solidity, Solana Rust, and Soroban Rust simultaneously, mapping out cross-chain bridge architectures."
  "Custom Query Language (CodeQL-like) for the Graph|Design and implement a custom query language that allows security researchers to write complex queries against the architecture graph to hunt for zero-days."
  "Live Blockchain State Synchronization|Overlay the static architecture graph with live mainnet data. Show real-time transaction volumes along the cross-contract edges."
  "Machine Learning Model to Predict Tech Debt Hotspots|Train a custom ML model on historical Git data and architecture graphs to predict which contracts are most likely to develop critical tech debt or bugs."
  "Bidirectional IDE Syncing|Implement deep IDE integration where selecting a node in the web viewer instantly opens the corresponding file in VSCode, and moving the cursor in VSCode highlights the graph node."
  "Distributed Caching Layer for AST Parsing|Build a distributed caching system (like Bazel) for AST nodes, allowing CI runners to share parsed sub-graphs and reduce analysis time to zero for unchanged code."
  "Migrate to a Fully Type-Safe Graph Database Backend|Rip out the JSON-based graph storage and replace it with a native Graph Database (like Neo4j or Memgraph), implementing a custom ORM for graph traversal."
  "Implement Semantic Search Across the Entire Codebase Graph|Build a vector embedding pipeline that embeds all AST nodes, allowing users to perform natural language semantic searches across their architecture."
  "Automated Vulnerability Patching Engine|Create a closed-loop system that not only detects heuristic failures but automatically modifies the Rust AST, applies the fix, and auto-merges the PR if tests pass."
  "Integrate Full CI/CD Pipeline Blocking Policy Engine|Implement an Open Policy Agent (OPA) / Rego integration where organizations can write declarative policies (e.g., 'No unauthenticated state changes') that block CI deployments."
  "Decentralized Storage Backend for Graph Artifacts|Integrate IPFS and Filecoin to store generated architecture graphs on decentralized storage networks, completely removing centralized dependencies."
  "Dynamic AST Instrumentation and Runtime Telemetry|Inject telemetry instrumentation directly into the Rust AST before compilation, allowing CodeGraph to capture live runtime metrics that sync back to the graph."
)

for i in "${!issues[@]}"; do
  # Extract title and background using IFS
  IFS='|' read -r title background <<< "${issues[$i]}"
  
  issue_num=$((i+17))
  filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')
  filepath="docs/starter-issues/$issue_num-$filename.md"
  
  # Create the markdown file
  cat <<EOF > "$filepath"
# $title
Labels: feature, backend, complexity:hardest

**Justification**: This is an extremely complex and monumental task requiring advanced computer science, compiler theory, or distributed systems knowledge.

**Background**
$background

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
EOF

  echo "Creating issue: $title"
  # Use gh issue create to publish it
  gh issue create --title "$title" --label "feature,backend,complexity:hardest" --body "$(tail -n +3 "$filepath")"
  sleep 2
done

echo "All 25 hardest issues created successfully."
