use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

// use cosmwasm_std::{CanonicalAddr, Storage};
use cosmwasm_std::{Api, HumanAddr, CanonicalAddr, Storage, StdResult, StdError, ReadonlyStorage};
use cosmwasm_storage::{singleton, singleton_read, ReadonlySingleton, Singleton};
use secret_toolkit::storage::{AppendStore, AppendStoreMut};

pub static CONFIG_KEY: &[u8] = b"config";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub count: i32,
    pub owner: CanonicalAddr,
}

pub fn config<S: Storage>(storage: &mut S) -> Singleton<S, State> {
    singleton(storage, CONFIG_KEY)
}

pub fn config_read<S: Storage>(storage: &S) -> ReadonlySingleton<S, State> {
    singleton_read(storage, CONFIG_KEY)
}


pub fn add_value<S: Storage>(
    storage: &mut S,
    value: i32,
) -> StdResult<u32> {
    let mut storage = AppendStoreMut::<i32, _>::attach_or_create(storage)?;
 
    storage.push(&value)?;
    Ok(storage.len()-1)
}
 
pub fn get_values<S: ReadonlyStorage>(
    storage: &S,
) -> StdResult<(Vec<i32>, u32)> {
    // Try to access the storage of values (of type I32F32).
    // If it doesn't exist yet, return an empty list.
    let append_store = if let Some(result) = AppendStore::<i32, _>::attach(storage) {
        result?
    } else {
        return Ok((vec![], 0));
    };
    let values: StdResult<Vec<i32>> = append_store
        .iter()
        .collect();
 
    values.map(|v| (v, append_store.len()))
}





