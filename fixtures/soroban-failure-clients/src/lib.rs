#![no_std]
use soroban_sdk::{contract, contractimpl, Env};

#[contract]
pub struct ClientContract;

#[contractimpl]
impl ClientContract {
    pub fn custom_client_call(env: Env, target: soroban_sdk::Address) {
        // Obscure pattern not matched by our simple rule
        let c = get_client(&env, target);
        c.do_b();
    }
}
