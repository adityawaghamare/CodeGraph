#![no_std]
use soroban_sdk::{contract, contractimpl, Env};
use contract_b::ContractBClient;

#[contract]
pub struct ContractA;

#[contractimpl]
impl ContractA {
    pub fn call_b(env: Env, b_id: soroban_sdk::Address) {
        let client = ContractBClient::new(&env, &b_id);
        client.do_b();
    }
}
