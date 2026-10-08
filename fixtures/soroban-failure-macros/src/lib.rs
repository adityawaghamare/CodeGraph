#![no_std]
use soroban_sdk::{contract, contractimpl, Env};

macro_rules! define_contract {
    () => {
        #[contract]
        pub struct MacroContract;

        #[contractimpl]
        impl MacroContract {
            pub fn do_macro(env: Env) {
                env.storage().instance().has(&1);
            }
        }
    };
}

define_contract!();
