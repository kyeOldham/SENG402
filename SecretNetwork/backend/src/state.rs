use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use serde::de::DeserializeOwned;
use substrate_fixed::types::I64F64;
use cosmwasm_std::{Api, HumanAddr, CanonicalAddr, Storage, StdResult, StdError, ReadonlyStorage, };
use std::any::type_name;
use secret_toolkit::storage::{AppendStore};
use std::convert::TryInto;

pub static CONFIG_KEY: &[u8] = b"config";

pub static COUNT_STORE: AppendStore<i32> = AppendStore::new(b"count");


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct StoredState {
    pub count: Vec<u8>,
    pub owner: CanonicalAddr,
}

#[derive(Clone, Debug, PartialEq)]
pub struct State {
    pub count: I64F64,
    pub owner: HumanAddr,
}

pub fn convert_state_from_stored<A: Api>(
    api: &A,
    stored_state: StoredState,
) -> StdResult<State> {
    let count_bytes: [u8; 16] = match stored_state.count.as_slice().try_into() {
        Ok(count) => count,
        Err(err) => { return Err(StdError::generic_err(format!("{:?}", err))) },
    };
    let count = I64F64::from_be_bytes(count_bytes);
    let state = State {
        count,
        owner: api.human_address(&stored_state.owner)?,
    };
    Ok(state)
}

pub fn convert_state_to_stored<A: Api>(
    api: &A,
    state: State,
) -> StdResult<StoredState> {
    let stored_state = StoredState {
        count: state.count.to_be_bytes().to_vec(),
        owner: api.canonical_address(&state.owner)?,
    };
    // let user_count_store = COUNT_STORE.add_suffix(&state.owner.to_string().as_bytes());
    Ok(stored_state)
}

pub fn set_config<S: Storage>(
    storage: &mut S,
    state: StoredState,
) -> StdResult<()> {
    set_bin_data(storage, CONFIG_KEY, &state)
}

pub fn get_config<S: ReadonlyStorage>(
    storage: &S,
) -> StdResult<StoredState> {
    get_bin_data(storage, CONFIG_KEY)
}

//
// Bin data storage setters and getters
//

pub fn set_bin_data<T: Serialize, S: Storage>(
    storage: &mut S,
    key: &[u8],
    data: &T,
) -> StdResult<()> {
    let bin_data =
        bincode2::serialize(&data).map_err(|e| StdError::serialize_err(type_name::<T>(), e))?;
    storage.set(key, &bin_data);
    Ok(())
}

pub fn get_bin_data<T: DeserializeOwned, S: ReadonlyStorage>(
    storage: &S,
    key: &[u8],
) -> StdResult<T> {
    let bin_data = storage.get(key);
    match bin_data {
        None => Err(StdError::not_found("Key not found in storage")),
        Some(bin_data) => Ok(bincode2::deserialize::<T>(&bin_data)
            .map_err(|e| StdError::serialize_err(type_name::<T>(), e))?),
    }
}