#![no_std]
use soroban_sdk::{contract, contractimpl, Env};
#[contract]
pub struct ContractA;
#[contractimpl]
impl ContractA {}
