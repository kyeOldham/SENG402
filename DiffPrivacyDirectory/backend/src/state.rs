use cosmwasm_std::{ReadonlyStorage, StdResult, Storage};
use secret_toolkit::storage::{AppendStore, AppendStoreMut};
use std::str::FromStr;
use substrate_fixed::types::I64F64;

// Append store storage

// Adds a new value to the end of the list
pub fn add_value<S: Storage>(storage: &mut S, value: I64F64) -> StdResult<u32> {
    let mut storage = AppendStoreMut::<String, _>::attach_or_create(storage)?;

    storage.push(&value.to_string())?;
    Ok(storage.len() - 1)
}

// Gets values from the list
// Gets size of the list
// Returns the values in the list
// Returns the size of the list
pub fn get_values<S: ReadonlyStorage>(storage: &S) -> StdResult<(Vec<I64F64>, u32)> {
    // Try to access the storage of values (of type I64F64).
    // If it doesn't exist yet, return an empty list.
    let append_store = if let Some(result) = AppendStore::<String, _>::attach(storage) {
        result?
    } else {
        return Ok((vec![], 0));
    };

    // Convert the list of strings to a list of I64F64.
    let temp_values: Vec<I64F64> = append_store
        .iter()
        .map(|v| I64F64::from_str(&v.ok().unwrap()).ok().unwrap())
        .collect();
    // Return the list of values and the length of the list.
    Ok((temp_values, append_store.len()))
}
