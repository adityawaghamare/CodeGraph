#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Address};

pub mod token {
    soroban_sdk::contractimport!(file = "token.wasm");
}

#[contract]
pub struct ClientContract;

#[contractimpl]
impl ClientContract {
    pub fn do_transfer(env: Env, token_addr: Address) {
        let client = token::Client::new(&env, &token_addr);
        client.transfer();
    }
}
