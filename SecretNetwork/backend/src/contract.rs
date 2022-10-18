use cosmwasm_std::{
  debug_print, to_binary, Api, Binary, Env, Extern, HandleResponse, InitResponse, Querier,
  StdError, StdResult, Storage,
};
use crate::msg::{CountResponse, ValueResponse, HandleMsg, HandleAnswer, InitMsg, QueryMsg};
use crate::state::{State, set_config, get_config, convert_state_from_stored, convert_state_to_stored, get_values, add_value};
use substrate_fixed::types::{I20F12,I64F64, I9F23};
use substrate_fixed::transcendental::{log2};
use std::str::FromStr;
use std::u64::MAX;
use rand::{RngCore, SeedableRng};
use crate::random::{get_random_number_generator, supply_more_entropy, sha_256};
use rand_chacha::ChaChaRng;
use core::ops::{AddAssign, BitOrAssign, ShlAssign};

pub fn init<S: Storage, A: Api, Q: Querier>(
  deps: &mut Extern<S, A, Q>,
  env: Env,
  msg: InitMsg,
) -> StdResult<InitResponse> {
  let value = I64F64::from_str(&msg.value).ok().unwrap();

  add_value(&mut deps.storage, value)?;

  Ok(InitResponse::default())
}

pub fn handle<S: Storage, A: Api, Q: Querier>(
  deps: &mut Extern<S, A, Q>,
  env: Env,
  msg: HandleMsg,
) -> StdResult<HandleResponse> {
  match msg {
      HandleMsg::AddValue { value } => try_add_value(deps, env, value),
      HandleMsg::DiffCount { } => try_diff_count(deps, env, msg),
      HandleMsg::DiffMean { } => try_diff_mean(deps, env, msg),
  }
}

pub fn try_diff_count<S: Storage, A: Api, Q: Querier>(
  deps: &mut Extern<S, A, Q>,
  _env: Env,
  msg: HandleMsg
) -> StdResult<HandleResponse> {
  let (values, size) = get_values(&deps.storage)?;

  let mut fresh_entropy = to_binary(&msg)?.0;
  fresh_entropy.extend(to_binary(&_env)?.0);
  supply_more_entropy(&mut deps.storage, fresh_entropy.as_slice())?;

  let mut rng = get_random_number_generator(&deps.storage);
  let (random1, random2) = get_random_values(&mut rng);

  let sensitivity = I64F64::from_num::<i64>(1);
  let epsilon = I64F64::from_str("0.5").ok().unwrap(); 

  let scale: I64F64 = sensitivity.checked_div(epsilon).unwrap();

  let laplace_num = laplace(scale, random1, random2);

  let diff_count = I64F64::from_num(size) + laplace_num;

  Ok(HandleResponse {
    messages: vec![],
    log: vec![],
    data: Some(to_binary(&HandleAnswer::DiffCount {
      count: diff_count.to_string(),
    })?),
})
}

pub fn try_diff_mean<S: Storage, A: Api, Q: Querier>(
deps: &mut Extern<S, A, Q>,
_env: Env,
msg: HandleMsg
) -> StdResult<HandleResponse> {
let (values, size) = get_values(&deps.storage)?;
debug_print("mean attained");
let mut fresh_entropy = to_binary(&msg)?.0;
fresh_entropy.extend(to_binary(&_env)?.0);
supply_more_entropy(&mut deps.storage, fresh_entropy.as_slice())?;
let mut rng = get_random_number_generator(&deps.storage);

//Add random 64bit number to count

//Divide fuzzy sum by fuzzy count

let mut sum: I64F64 = I64F64::from_str("0.0").ok().unwrap();
let mut max: I64F64 = sum;
let mut min: I64F64 = sum;

for value in values.iter() {
  if sum == I64F64::from_str("0.0").ok().unwrap() {
    min = *value;
    max = *value;
  } 
  if value > &max {
    max = *value;
  } 
  if value < &min {
    min = *value;
  }
  sum = sum + value;
}

let (random1, random2) = get_random_values(&mut rng);
let (random3, random4) = get_random_values(&mut rng);

//Sensitivity should be max minus min value
// let sensitivity = max - min;
let sensitivity = I64F64::from_str("0.1").ok().unwrap();
let epsilon = I64F64::from_str("0.9").ok().unwrap(); 

let scale: I64F64 = sensitivity.checked_div(epsilon).unwrap();

let laplace_num_count = laplace(scale, random1, random2);

let diff_count = I64F64::from_num(size) + laplace_num_count;

let laplace_num_sum = laplace(scale, random3, random4);

let diff_sum = sum + laplace_num_sum;

let diff_mean = diff_sum.checked_div(diff_count).unwrap();

Ok(HandleResponse {
  messages: vec![],
  log: vec![],
  data: Some(to_binary(&HandleAnswer::DiffMean {
    mean: diff_mean.to_string(),
  })?),
})
}

pub fn try_add_value<S: Storage, A: Api, Q: Querier>(
deps: &mut Extern<S, A, Q>,
env: Env,
value: String,
) -> StdResult<HandleResponse> {

add_value(&mut deps.storage, I64F64::from_str(&value).ok().unwrap());

let (values, size) = get_values(&deps.storage)?;

debug_print("Added value successfully");

Ok(HandleResponse {
  messages: vec![],
  log: vec![],
  data: Some(to_binary(&HandleAnswer::DiffMean {
    mean: size.to_string(),
  })?),
})

}

pub fn get_random_values(
 rng: &mut ChaChaRng,
) -> (I64F64, I64F64) {
let rand_num = rng.next_u32();
let rand_num2 = rng.next_u32();

let max_num = I64F64::from_num(u32::MAX);

let rand_i64 = I64F64::from_num(rand_num);
let rand_i64_2 = I64F64::from_num(rand_num2);

let random_zero_one  =  rand_i64.checked_div(max_num).unwrap();
let random_zero_one_2 = rand_i64_2.checked_div(max_num).unwrap();

(random_zero_one, random_zero_one_2)
}

pub fn exp_sample(
mean: I64F64,
rand_num: I64F64,
) -> I64F64 {
type S = I64F64;
type D = I64F64;

let result: D = log2::<S, D>(S::from_num(rand_num)).unwrap();

-mean * result
}

pub fn laplace(
scale: I64F64,
rand_num: I64F64,
rand_num_2: I64F64,
) -> I64F64 {
let e1 = exp_sample(scale, rand_num);
let e2 = exp_sample(scale, rand_num_2);
e1 - e2
}

// pub fn histogram () -> I64F64 {

// }

pub fn query<S: Storage, A: Api, Q: Querier>(
  deps: &Extern<S, A, Q>,
  msg: QueryMsg,
) -> StdResult<Binary> {
  match msg {
      QueryMsg::GetCount {} => to_binary(&query_count(deps)?),
      // QueryMsg::GetValues {} => to_binary(&query_values(deps)?),
  }
}

fn query_count<S: Storage, A: Api, Q: Querier>(deps: &Extern<S, A, Q>) -> StdResult<CountResponse> {
  let (values, size) = get_values(&deps.storage)?;
  Ok(CountResponse { count: size.to_string()})
}


#[cfg(test)]
mod tests {
  use super::*;
  use cosmwasm_std::testing::{mock_dependencies, mock_env};
  use cosmwasm_std::{coins, from_binary, StdError};


  #[test]
  fn proper_initialization() {
      let mut deps = mock_dependencies(20, &[]);

      let msg = InitMsg { value: String::from("5") };
      let env = mock_env("creator", &coins(1000, "earth"));

      // we can just call .unwrap() to assert this was a success
      let res = init(&mut deps, env, msg).unwrap();
      assert_eq!(0, res.messages.len());

      // it worked, let's query the state
      let res = query(&deps, QueryMsg::GetCount {}).unwrap();
      let value: CountResponse = from_binary(&res).unwrap();
      assert_eq!(String::from("1"), value.count);
  }

  #[test]
  fn add_value() {
      let mut deps = mock_dependencies(20, &coins(2, "token"));

      let msg = InitMsg { value: String::from("5") };
      let env = mock_env("creator", &coins(2, "token"));
      let _res = init(&mut deps, env, msg).unwrap();

      // anyone can add values
      let env = mock_env("anyone", &coins(2, "token"));
      let msg = HandleMsg::AddValue {value: String::from("5.4")};
      let _res = handle(&mut deps, env, msg).unwrap();

      let res = query(&deps, QueryMsg::GetCount {}).unwrap();
      let value: CountResponse = from_binary(&res).unwrap();
      assert_eq!(String::from("2"), value.count);
  }

  #[test]
  fn diff_count() {
      let mut deps = mock_dependencies(20, &coins(2, "token"));

      let msg = InitMsg { value: String::from("4.5") };
      let env = mock_env("creator", &coins(2, "token"));
      let _res = init(&mut deps, env, msg).unwrap();

      // anyone can add values
      let env = mock_env("anyone", &coins(2, "token"));
      let msg = HandleMsg::AddValue {value: String::from("5.2")};
      let _res = handle(&mut deps, env, msg).unwrap();

      // anyone can add values
      let env = mock_env("anyone", &coins(2, "token"));
      let msg = HandleMsg::AddValue {value: String::from("4.7")};
      let _res = handle(&mut deps, env, msg).unwrap();

      // anyone can add values
      let env = mock_env("anyone", &coins(2, "token"));
      let msg = HandleMsg::DiffCount {};
      let value : HandleResponse = handle(&mut deps, env, msg).ok().unwrap();
      let data: Binary = value.clone().data.unwrap();
      let answer: HandleAnswer = from_binary(&data).unwrap();
      //let number: String = from_binary(&data).unwrap();
      println!("{:?}", value);
      println!("{:?}", answer);
      //println!("{}", value.ok().unwrap());
      assert_ne!(String::from("4"), answer.count);
      
  }
}

