# Architecture Documentation

## Contracts

### ContractContext
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/auth.rs:167`

### CreateContractHostFnContext
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/auth.rs:177`

### CreateContractWithConstructorHostFnContext
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/auth.rs:188`

### SubContractInvocation
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/auth.rs:215`

### ContractExecutableRef
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/lib.rs:1295`

### TestContract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/address.rs:9`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_06_register_native_constructor.rs:14`
- **Functions**:
  - `__constructor` (Auth)

### Probe
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_06_register_native_constructor.rs:25`
- **Functions**:
  - `need_auth` (Auth)

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_10_one.rs:12`
- **Functions**:
  - `add` (Auth)

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_15_one_repeat.rs:15`
- **Functions**:
  - `add` (Auth)

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_17_no_consume_requirement.rs:21`
- **Functions**:
  - `add` (Auth)

### ContractA
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_20_deep_one_address.rs:10`
- **Functions**:
  - `fna`

### ContractB
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_20_deep_one_address.rs:21`
- **Functions**:
  - `fnb` (Auth)

### ContractA
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_30_deep_one_address_repeat.rs:10`
- **Functions**:
  - `fna`

### ContractB
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_30_deep_one_address_repeat.rs:21`
- **Functions**:
  - `fnb` (Auth)

### ContractA
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_35_deep_one_address_repeat_grouped.rs:10`
- **Functions**:
  - `fna`

### ContractB
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_35_deep_one_address_repeat_grouped.rs:21`
- **Functions**:
  - `fnb` (Auth)

### ContractA
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_40_multi_one_address.rs:10`
- **Functions**:
  - `fna` (Auth)

### ContractB
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_40_multi_one_address.rs:22`
- **Functions**:
  - `fnb` (Auth)

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_add_i32.rs:8`
- **Functions**:
  - `add`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_assert.rs:5`
- **Functions**:
  - `assert`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_custom_account_impl.rs:10`
- **Functions**:
  - `__check_auth`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_docs.rs:7`
- **Functions**:
  - `add`

### S
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_docs.rs:47`

### S
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_docs.rs:90`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_duration.rs:5`
- **Functions**:
  - `exec`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_error_references.rs:41`
- **Functions**:
  - `sdk`
  - `local`
  - `a`
  - `b`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:12`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:16`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:56`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:60`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:106`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:110`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:150`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:154`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:191`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:195`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:221`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:225`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:251`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:255`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:288`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:292`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:323`

### MyType1
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:327`

### MyType2
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:332`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:345`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:402`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:406`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:437`

### Deposit
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:442`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:477`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:481`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:527`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:531`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:575`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:579`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:624`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:634`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:674`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:678`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:709`

### Deposit
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:713`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:759`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:763`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:809`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:813`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:855`

### MyEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_event.rs:860`

### OwnerContract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_executable_ref.rs:29`
- **Functions**:
  - `set_executable`
  - `upgrade_to_own_ref`

### DeployerContract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_executable_ref.rs:51`
- **Functions**:
  - `deploy`
  - `upgrade_to_ref`
  - `deploy_with_args`
  - `deploy_for`

### RecordingAccount
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_executable_ref.rs:102`
- **Functions**:
  - `__check_auth`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_fn.rs:9`
- **Functions**:
  - `add`
  - `add_with_unused_arg`
  - `add_with_mut_arg`
  - `add_with_ref_arg`
  - `void_fn`
  - `tuple_single_fn`
  - `tuple_two_fn`

### Contract2
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_fn.rs:42`
- **Functions**:
  - `add`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_fn_macro_rules.rs:5`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_invoke.rs:5`
- **Functions**:
  - `panic`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_invoke_arg_count.rs:5`
- **Functions**:
  - `add_with`

### AddContract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_invoke_arg_count.rs:22`
- **Functions**:
  - `add`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_invoke_panics.rs:9`
- **Functions**:
  - `panic`
  - `need_auth` (Auth)

### State
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_overlapping_type_fn_names.rs:6`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_overlapping_type_fn_names.rs:11`
- **Functions**:
  - `state`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_snapshot.rs:5`
- **Functions**:
  - `store`
  - `get`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_store.rs:12`
- **Functions**:
  - `get_persistent`
  - `set_persistent`
  - `get_temporary`
  - `set_temporary`
  - `get_instance`
  - `set_instance`
  - `extend_ttl_persistent`
  - `extend_ttl_temporary`
  - `extend_ttl_instance`
  - `ext_ttl_persistent_lim`
  - `ext_ttl_instance_lim`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_timepoint.rs:5`
- **Functions**:
  - `exec`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_trait_empty.rs:10`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_type_aliases.rs:43`
- **Functions**:
  - `aliased`

### Udt2
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_enum.rs:20`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_enum.rs:25`
- **Functions**:
  - `add`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_enum_error.rs:5`
- **Functions**:
  - `f`

### Udt
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_option.rs:9`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_option.rs:15`
- **Functions**:
  - `add`

### UdtAllOptional
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_option.rs:65`

### UdtUnit
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_option.rs:82`

### r#Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_raw_identifier.rs:15`

### r#TestEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_raw_identifier.rs:24`

### r#TupleStruct
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_raw_identifier.rs:70`
- **Functions**:
  - `r#type`

### Udt
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_struct.rs:13`

### UdtWithLongName
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_struct.rs:20`

### UdtWithNonAlphabeticallyOrderedFields
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_struct.rs:26`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_struct.rs:34`
- **Functions**:
  - `add`
  - `add_udt_with_long_name`

### Inner
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_struct_aliased_import.rs:33`

### Outer
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_struct_aliased_import.rs:43`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_struct_aliased_import.rs:49`
- **Functions**:
  - `add`

### Udt
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_struct_tuple.rs:13`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_udt_struct_tuple.rs:16`
- **Functions**:
  - `add`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contractimpl_trait_call_resolution.rs:20`
- **Functions**:
  - `value`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contractimport.rs:18`
- **Functions**:
  - `sub`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contractimport.rs:28`
- **Functions**:
  - `add_with`
  - `sub_with`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contractimport_with_error.rs:10`
- **Functions**:
  - `hello_with`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contracttrait_crate_path.rs:25`
- **Functions**:
  - `overridden_method`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/crypto_bls12_381.rs:269`
- **Functions**:
  - `g1_mul_with`
  - `verify_with`

### ModularAccount
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/delegate_auth.rs:43`
- **Functions**:
  - `__constructor`
  - `__check_auth`

### DelegateAccount
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/delegate_auth.rs:94`
- **Functions**:
  - `__constructor`
  - `__check_auth`

### Protected
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/delegate_auth.rs:126`
- **Functions**:
  - `protected` (Auth)

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/env.rs:24`
- **Functions**:
  - `test`
  - `need_auth` (Auth)

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/env_test_state_in_contract.rs:20`
- **Functions**:
  - `gen_address`
  - `register`
  - `auth_count` (Auth)
  - `set_config`
  - `to_ledger_snapshot`
  - `to_snapshot`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/env_upload.rs:4`
- **Functions**:
  - `hello`

### OtherContract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/env_upload.rs:14`
- **Functions**:
  - `hello`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/extend_ttl_overflow.rs:11`
- **Functions**:
  - `set_persistent`
  - `extend_persistent`
  - `extend_instance`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/max_ttl.rs:5`

### Udt
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/muxed_address.rs:15`

### MuxedAddressContract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/muxed_address.rs:21`
- **Functions**:
  - `get_muxed_ids`
  - `echo_udt`

### TestPrngContract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/prng.rs:6`

### TestPrngRangeContract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/prng_range.rs:7`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/register_at_stellar_asset_contract.rs:5`
- **Functions**:
  - `hello`
  - `decimals`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/snapshot_source_native_wasm_hash.rs:10`
- **Functions**:
  - `hello`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/storage_testutils.rs:10`

### TestContract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/token_client.rs:23`
- **Functions**:
  - `init`
  - `get_token`
  - `approve`
  - `allowance`

### Foo
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/testutils/arbitrary.rs:2420`

### Foo
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/testutils/arbitrary.rs:2437`

### MockAuthContract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/src/testutils/mock_auth.rs:7`
- **Functions**:
  - `__check_auth`

### Address
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/contractevent_contracterror_name_errors.rs:7`

### Generic
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/contractevent_contracterror_name_errors.rs:21`

### Ev
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/contractevent_sparse_arg_errors.rs:6`

### Ev2
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/contractevent_sparse_arg_errors.rs:11`

### ExplicitTopic
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/contractevent_topic_length_errors.rs:4`

### AbCdEfGhIjKlMnOpQrStUvWx
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/contractevent_topic_length_errors.rs:11`

### Fits
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/contractevent_topic_length_errors.rs:16`

### C
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/contracttrait_cfg_errors.rs:30`
- **Functions**:
  - `hidden`

### D
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/contracttrait_cfg_errors.rs:45`
- **Functions**:
  - `hidden`

### C
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/contracttrait_without_trait.rs:4`
- **Functions**:
  - `f`

### S
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/contracttype_lib_removed.rs:6`

### Ev
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/contracttype_lib_removed.rs:18`

### S
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/export_arg_errors.rs:4`

### S2
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/export_arg_errors.rs:9`

### Ev
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/export_arg_errors.rs:20`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/hash_arg_errors.rs:7`
- **Functions**:
  - `f`

### TooLong
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/spec_name_length_errors.rs:10`

### TooLongEvent
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/spec_name_length_errors.rs:15`

### Refers
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/spec_name_length_errors.rs:22`

### HoldsHuge
- **File**: `/tmp/rs-soroban-sdk/soroban-sdk/tests/compile_fails/spec_type_def_bytesn_length_errors.rs:8`

### Approve
- **File**: `/tmp/rs-soroban-sdk/soroban-token-sdk/src/events.rs:4`

### TransferWithAmountOnly
- **File**: `/tmp/rs-soroban-sdk/soroban-token-sdk/src/events.rs:14`

### Transfer
- **File**: `/tmp/rs-soroban-sdk/soroban-token-sdk/src/events.rs:23`

### Burn
- **File**: `/tmp/rs-soroban-sdk/soroban-token-sdk/src/events.rs:33`

### MintWithAmountOnly
- **File**: `/tmp/rs-soroban-sdk/soroban-token-sdk/src/events.rs:40`

### Mint
- **File**: `/tmp/rs-soroban-sdk/soroban-token-sdk/src/events.rs:47`

### Clawback
- **File**: `/tmp/rs-soroban-sdk/soroban-token-sdk/src/events.rs:55`

### TokenMetadata
- **File**: `/tmp/rs-soroban-sdk/soroban-token-sdk/src/metadata.rs:7`

### Contract
- **File**: `/tmp/rs-soroban-sdk/soroban-token-sdk/src/tests/events.rs:17`

### Approve
- **File**: `/tmp/rs-soroban-sdk/stellar-asset-spec/src/lib.rs:15`

### TransferWithAmountOnly
- **File**: `/tmp/rs-soroban-sdk/stellar-asset-spec/src/lib.rs:27`

### Transfer
- **File**: `/tmp/rs-soroban-sdk/tests/events_ref/src/lib.rs:8`
- **Functions**:
  - `transfer`
  - `failed_transfer`

### TransferWithMuxedString
- **File**: `/tmp/rs-soroban-sdk/stellar-asset-spec/src/lib.rs:50`

### TransferWithMuxedBytes
- **File**: `/tmp/rs-soroban-sdk/stellar-asset-spec/src/lib.rs:62`

### Burn
- **File**: `/tmp/rs-soroban-sdk/stellar-asset-spec/src/lib.rs:74`

### MintWithAmountOnly
- **File**: `/tmp/rs-soroban-sdk/stellar-asset-spec/src/lib.rs:83`

### Mint
- **File**: `/tmp/rs-soroban-sdk/stellar-asset-spec/src/lib.rs:92`

### MintWithMuxedString
- **File**: `/tmp/rs-soroban-sdk/stellar-asset-spec/src/lib.rs:102`

### MintWithMuxedBytes
- **File**: `/tmp/rs-soroban-sdk/stellar-asset-spec/src/lib.rs:112`

### Clawback
- **File**: `/tmp/rs-soroban-sdk/stellar-asset-spec/src/lib.rs:122`

### SetAdmin
- **File**: `/tmp/rs-soroban-sdk/stellar-asset-spec/src/lib.rs:131`

### SetAuthorized
- **File**: `/tmp/rs-soroban-sdk/stellar-asset-spec/src/lib.rs:140`

### Contract
- **File**: `/tmp/rs-soroban-sdk/tests/workspace_contract/src/lib.rs:7`
- **Functions**:
  - `__check_auth`
  - `add`
  - `safe_add`
  - `safe_add_two`
  - `num_list`
  - `exec`
  - `set_val`
  - `get_val`
  - `both`
  - `wrapped`
  - `double_wrapped`
  - `valval`
  - `tuple`
  - `valref`
  - `exec2`
  - `always`
  - `cfg_included`
  - `cfg_excluded`
  - `publish`
  - `trait_override`
  - `trait_default`
  - `trait_default_stacked_cfg`
  - `trait_override_stacked_cfg`
  - `trait_override_negated_cfg`
  - `trait_override_dual_cfg`
  - `trait_override_dual_cfg`
  - `trait_default_dual_cfg`
  - `trait_default_dual_cfg`
  - `g1_mul`
  - `g2_mul`
  - `dummy_verify`
  - `fr_vec_get`
  - `verify_pairing`
  - `g1_add`
  - `__constructor` (Auth)
  - `get_data`
  - `put`
  - `get`
  - `del`
  - `test_u32`
  - `test_string`
  - `test_env_param`
  - `test_struct`
  - `empty`
  - `hello`
  - `persisted`
  - `run`
  - `add_with`
  - `safe_add_with`
  - `safe_add_with_two`
  - `zero`
  - `empty2`
  - `empty3`
  - `calc`
  - `fn_struct_a`
  - `fn_struct_tuple_a`
  - `fn_enum_a`
  - `fn_enum_int_a`
  - `fn_error_a`
  - `fn_event_a`
  - `fn_event_d`
  - `with_param`
  - `with_return`
  - `with_error`
  - `with_panic_error`
  - `with_assert_error`
  - `with_panic_raw_error`
  - `with_vec`
  - `with_vec_nested`
  - `with_map`
  - `with_option`
  - `with_result`
  - `with_recursion`
  - `with_auth_contexts`
  - `with_invoker_auth`
  - `with_executable`
  - `publish_simple` (Keys: transfer)
  - `publish_topic_type`
  - `publish_data_type` (Keys: coords)
  - `publish_nested_topic`
  - `publish_nested_data` (Keys: nested)
  - `with_lib_struct`
  - `with_wasm_imported`
  - `with_non_pub`
  - `with_non_pub_error`
  - `with_tuple`
  - `with_tuple_return`
  - `publish_ref_event`
  - `void_fn`
  - `tuple1`
  - `tuple2`
  - `recursive`
  - `recursive_enum`
  - `value`

### TestContract
- **File**: `/tmp/rs-soroban-sdk/tests/account/src/lib.rs:42`

### AttributeEvent
- **File**: `/tmp/rs-soroban-sdk/tests/attributes/src/lib.rs:12`

### ContractA
- **File**: `/tmp/rs-soroban-sdk/tests/auth/src/lib.rs:5`
- **Functions**:
  - `fn1` (Auth)

### Contract
- **File**: `/tmp/rs-soroban-sdk/tests/auth/src/lib.rs:198`
- **Functions**:
  - `__check_auth`

### ContractB
- **File**: `/tmp/rs-soroban-sdk/tests/auth/src/lib.rs:222`
- **Functions**:
  - `fn2` (Auth)

### Contract
- **File**: `/tmp/rs-soroban-sdk/tests/auth/src/lib.rs:451`
- **Functions**:
  - `__check_auth`

### Contract
- **File**: `/tmp/rs-soroban-sdk/tests/auth/src/lib.rs:464`
- **Functions**:
  - `__check_auth`

### DummyProof
- **File**: `/tmp/rs-soroban-sdk/tests/bls/src/lib.rs:10`

### MockProof
- **File**: `/tmp/rs-soroban-sdk/tests/bn254/src/lib.rs:10`

### ContractCratePath
- **File**: `/tmp/rs-soroban-sdk/tests/contracttrait_path_crate/src/lib.rs:22`

### ContractGlobalPath
- **File**: `/tmp/rs-soroban-sdk/tests/contracttrait_path_global/src/lib.rs:17`

### ContractRelativePath
- **File**: `/tmp/rs-soroban-sdk/tests/contracttrait_path_relative/src/lib.rs:22`

### ContractSelfPath
- **File**: `/tmp/rs-soroban-sdk/tests/contracttrait_path_self/src/lib.rs:18`

### ContractSuperPath
- **File**: `/tmp/rs-soroban-sdk/tests/contracttrait_path_super/src/lib.rs:21`

### SingleValue
- **File**: `/tmp/rs-soroban-sdk/tests/events/src/lib.rs:19`

### SingleValueVoid
- **File**: `/tmp/rs-soroban-sdk/tests/events/src/lib.rs:28`

### VecValues
- **File**: `/tmp/rs-soroban-sdk/tests/events/src/lib.rs:35`

### MapValues
- **File**: `/tmp/rs-soroban-sdk/tests/events/src/lib.rs:44`
- **Functions**:
  - `single_value`
  - `single_value_void`
  - `vec_values`
  - `map_values`
  - `transfer`
  - `failed_transfer`

### AddContract
- **File**: `/tmp/rs-soroban-sdk/tests/invoke_contract/src/lib.rs:20`
- **Functions**:
  - `add`

### _Contract
- **File**: `/tmp/rs-soroban-sdk/tests/zero/src/lib.rs:5`

## Health Checks & Heuristics

### Unresolved Cross-Contract Calls (7)
Found calls to other contracts that could not be statically resolved to a specific target contract.

**Evidence:**
- Call from function_ContractA__fna_auth_20_deep_one_addressrs unresolved (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_20_deep_one_address.rs:16`)
- Call from function_ContractA__fna_auth_30_deep_one_address_repeatrs unresolved (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_30_deep_one_address_repeat.rs:16`)
- Call from function_ContractA__fna_auth_35_deep_one_address_repeat_groupedrs unresolved (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_35_deep_one_address_repeat_grouped.rs:16`)
- Call from function_ContractA__fna_auth_40_multi_one_addressrs unresolved (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/auth/auth_40_multi_one_address.rs:17`)
- Call from function_Contract__add_with_contract_invoke_arg_countrs unresolved (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_invoke_arg_count.rs:17`)
- Call from function_ContractB__fn2_librs unresolved (in `/tmp/rs-soroban-sdk/tests/auth/src/lib.rs:229`)
- Call from function_Contract__add_with_librs unresolved (in `/tmp/rs-soroban-sdk/tests/invoke_contract/src/lib.rs:11`)

> **Note**: Dynamic dispatch (e.g. invoke_contract) or complex client wrappers often cannot be resolved statically.

### State-Changing Functions Without Auth (12)
Functions that write to storage but lack a direct `require_auth()` check.

**Evidence:**
- Function __check_auth writes to storage without auth (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_executable_ref.rs:115`)
- Function store writes to storage without auth (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_snapshot.rs:9`)
- Function set_persistent writes to storage without auth (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_store.rs:20`)
- Function set_temporary writes to storage without auth (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_store.rs:28`)
- Function set_instance writes to storage without auth (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/contract_store.rs:36`)
- Function __constructor writes to storage without auth (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/delegate_auth.rs:47`)
- Function __constructor writes to storage without auth (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/delegate_auth.rs:98`)
- Function set_persistent writes to storage without auth (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/extend_ttl_overflow.rs:15`)
- Function init writes to storage without auth (in `/tmp/rs-soroban-sdk/soroban-sdk/src/tests/token_client.rs:27`)
- Function set_val writes to storage without auth (in `/tmp/rs-soroban-sdk/tests/associated_type_chained/src/lib.rs:29`)
- Function put writes to storage without auth (in `/tmp/rs-soroban-sdk/tests/contract_data/src/lib.rs:9`)
- Function hello writes to storage without auth (in `/tmp/rs-soroban-sdk/tests/logging/src/lib.rs:9`)

> **Note**: Authorization might be handled by an upstream caller, a macro, or through trait implementations not tracked by the AST.

