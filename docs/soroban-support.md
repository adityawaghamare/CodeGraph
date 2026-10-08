# Soroban Support

CodeGraph analyzes Soroban contracts using `web-tree-sitter`. It does not require a native Rust toolchain.

## What is Detected
* **Contracts**: Rust structs annotated with `#[contract]` are emitted as `contract` nodes.
* **Contract Functions**: Rust functions inside `#[contractimpl]` blocks are emitted as `function` nodes.
* **Storage Usage**: Static analysis looks for `env.storage().instance().set/get/has` and similar calls for `persistent()` and `temporary()`. Emits `reads_storage` and `writes_storage` edges.
* **Events**: Static analysis looks for `env.events().publish(...)` and emits `emits_event` edges.
* **Cross-Contract Calls**: Scans for `invoke_contract` calls or generated client calls (e.g. `client.do_something()`). 
* **Workspace Dependencies**: Parses `Cargo.toml` to find local dependencies and emits `depends_on` edges.

## What is NOT Detected (Known Limitations)
* **Dynamic Target Resolution**: If a cross-contract call is made dynamically via `invoke_contract` with an unresolved address variable, the emitted edge will be marked as `resolved: false`.
* **Deep Code Flow**: If storage keys are generated deeply in other non-contract modules, CodeGraph will emit the storage edge but may not be able to identify the precise key.
