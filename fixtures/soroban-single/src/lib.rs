#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol};

#[contract]
pub struct SingleContract;

#[contractimpl]
impl SingleContract {
    pub fn do_something(env: Env) {
        env.storage().instance().set(&Symbol::new(&env, "key"), &1);
        env.events().publish((Symbol::new(&env, "Topic"),), 42);
    }
}
