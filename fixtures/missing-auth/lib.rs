#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol};

#[contract]
pub struct MissingAuthContract;

#[contractimpl]
impl MissingAuthContract {
    // This method changes state but misses require_auth
    pub fn update_state(env: Env, new_val: u32) {
        env.storage().instance().set(&Symbol::new(&env, "state"), &new_val);
    }
}
