#![no_std]
use soroban_sdk::{contract, contractimpl, Env};

#[contract]
pub struct ContractB;

#[contractimpl]
impl ContractB {
    pub fn do_b(env: Env) {
        env.storage().persistent().get(&1);
    }
}
