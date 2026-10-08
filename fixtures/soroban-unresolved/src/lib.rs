#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol, vec};

#[contract]
pub struct UnresolvedContract;

#[contractimpl]
impl UnresolvedContract {
    pub fn dynamic_call(env: Env, contract_id: soroban_sdk::Address) {
        env.invoke_contract(&contract_id, &Symbol::new(&env, "some_func"), vec![&env]);
    }
}
