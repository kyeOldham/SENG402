use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use serde::de::DeserializeOwned;
use substrate_fixed::types::I64F64;
// use substrate_fixed::types::{I20F12,I64F64, I9F23};
use cosmwasm_std::{Api, HumanAddr, CanonicalAddr, Storage, StdResult, StdError, ReadonlyStorage};
use secret_toolkit::storage::{AppendStore, AppendStoreMut};
use std::any::type_name;
use std::str::FromStr;
use std::convert::TryInto;

pub static CONFIG_KEY: &[u8] = b"config";


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

// Append store storage

pub fn add_value<S: Storage>(
  storage: &mut S,
  value: I64F64,
) -> StdResult<u32> {

  //let vec_val = value.to_be_bytes().to_vec();
  let mut storage = AppendStoreMut::<String, _>::attach_or_create(storage)?;

  //storage.push(&vec_val)?;
  storage.push(&value.to_string())?;
  Ok(storage.len()-1)
}

pub fn get_values<S: ReadonlyStorage>(
  storage: &S,
) -> StdResult<(Vec<I64F64>, u32)> {
  // Try to access the storage of values (of type I32F32).
  // If it doesn't exist yet, return an empty list.
  let append_store = if let Some(result) = AppendStore::<String, _>::attach(storage) {
      result?
  } else {
      return Ok((vec![], 0));
  };

  let temp_values : Vec<I64F64> = append_store.iter().map(|v| I64F64::from_str(&v.ok().unwrap()).ok().unwrap()).collect();
  // let mut values: Vec<I64F64> = Vec::new();
  // values.push(I64F64::from_str("0.5").ok().unwrap());
  // values.push(I64F64::from_str("1.5").ok().unwrap());
  // values.push(I64F64::from_str("2.2").ok().unwrap());
  // values.push(I64F64::from_str("0.15").ok().unwrap());
  // values.push(I64F64::from_str("3.2").ok().unwrap());

  // let mut values: Vec<String> = Vec::new();
  // values.push(String::from("0.5"));
  // values.push(String::from("1.5"));
  // values.push(String::from("2.2"));
  // values.push(String::from("0.1"));
  // values.push(String::from("3.2"));

  // for i in 0..temp_values.len() {
  //   let value_bytes: [u8; 16] = match temp_values[i].as_slice().try_into() {
  //     Ok(value) => value,
  //     Err(err) => { return Err(StdError::generic_err(format!("{:?}", err))) }
  //   };
  //   values.push(I64F64::from_be_bytes(value_bytes));
  // }

  // let final_values: StdResult<Vec<I64F64>> = (values, append_store.len())
  //   .collect()  
  //   .iter();

    // let final_values: StdResult<Vec<I64F64>> = values
    // .iter();
    // .collect()  
    

    // .collect()

      // values.map(v| (v, append_store.len()))
      // Ok((values, append_store.len()))
      Ok((temp_values, append_store.len()))
  // Ok(values)
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