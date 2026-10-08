#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol};

#[contract]
pub struct HelperContract;

fn helper_save_data(env: &Env, val: u32) {
    env.storage().instance().set(&Symbol::new(env, "key"), &val);
}

#[contractimpl]
impl HelperContract {
    pub fn do_something(env: Env) {
        helper_save_data(&env, 42);
    }
}
