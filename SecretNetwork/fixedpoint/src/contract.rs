use cosmwasm_std::{
    debug_print, to_binary, Api, Binary, Env, Extern, HandleResponse, InitResponse, Querier,
    StdError, StdResult, Storage,
};
use crate::msg::{CountResponse, HandleMsg, InitMsg, QueryMsg};
use crate::state::{State, set_config, get_config, convert_state_from_stored, convert_state_to_stored};
use substrate_fixed::types::{I20F12,I64F64, I9F23};
use substrate_fixed::transcendental::{log2};
use std::str::FromStr;
use std::u64::MAX;
use rand::{RngCore, SeedableRng};
use crate::random::{get_random_number_generator, supply_more_entropy, sha_256};
use rand_chacha::ChaChaRng;
use core::ops::{AddAssign, BitOrAssign, ShlAssign};
// use opendp::core::*;

// pub const LOG2_E: I9F23 = I9F23::from_bits((consts::LOG2_E.to_bits() >> 104) as i32);

pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: InitMsg,
) -> StdResult<InitResponse> {
    let state = State {
        count: I64F64::from_str(&msg.count).ok().unwrap(),
        owner: env.message.sender,
    };
    set_config(&mut deps.storage, convert_state_to_stored(&deps.api, state)?)?;

    Ok(InitResponse::default())
}

pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> StdResult<HandleResponse> {
    let mut fresh_entropy = to_binary(&msg)?.0;
    fresh_entropy.extend(to_binary(&env)?.0);
    supply_more_entropy(&mut deps.storage, fresh_entropy.as_slice())?;
    let mut rng = get_random_number_generator(&deps.storage);
    //let a_random_u64_number = rng.get_random_number(); 
    let a_random_u64_number = rng.next_u64();

    match msg {
        HandleMsg::Increment {} => try_increment(deps, env, a_random_u64_number),
        HandleMsg::Reset { count } => try_reset(deps, env, count),
    }
}

pub fn try_increment<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    _env: Env,
    rand_num: u64,
) -> StdResult<HandleResponse> {
    let stored_state = get_config(&deps.storage)?;
    let mut state = convert_state_from_stored(&deps.api, stored_state)?;
    // let max_num = I64F64::from_num(u64::MAX);
    let rand_i64 = I64F64::from_num(rand_num);
    // let random_zero_one =  rand_i64 / max_num;
    let sensitivity = 1;
    let epsilon = 0.1; 

    let scale = sensitivity as f64 / epsilon;

    let laplace_num = laplace(I64F64::from_num(scale), rand_i64);
    //Add random 64bit number to count
    // state.count = state.count + I64F64::from_num(a_random_u64_number);
    state.count = state.count + I64F64::from_num(rand_num);
    // state.count = rand_i64;
    set_config(&mut deps.storage, convert_state_to_stored(&deps.api, state)?)?;

    // Divide random number in 64bit form by the max 64 bit number
    

    debug_print("count incremented successfully");
    Ok(HandleResponse::default())
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
) -> I64F64 {
  let e1 = exp_sample(scale, rand_num);
  let e2 = exp_sample(scale, rand_num);
  e1 - e2
}

pub fn try_reset<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    count: String,
) -> StdResult<HandleResponse> {
    let sender_address_raw = deps.api.canonical_address(&env.message.sender)?;
    let stored_state = get_config(&deps.storage)?;
    if sender_address_raw != stored_state.owner {
        return Err(StdError::Unauthorized { backtrace: None });
    }
    set_config(&mut deps.storage, convert_state_to_stored(
        &deps.api, 
        State {
            // count: I20F12::from_num(0_u32),
            count: I64F64::from_str(&count).ok().unwrap(),
            // count: I20F12::from_str(&count).ok().unwrap(),
            owner: env.message.sender,
        }
    )?)?;

    debug_print("count reset successfully");
    Ok(HandleResponse::default())
}

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetCount {} => to_binary(&query_count(deps)?),
    }
}

fn query_count<S: Storage, A: Api, Q: Querier>(deps: &Extern<S, A, Q>) -> StdResult<CountResponse> {
    let stored_state = get_config(&deps.storage)?;
    let state = convert_state_from_stored(&deps.api, stored_state)?;
    Ok(CountResponse { count: state.count.to_string()})
}

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env};
    use cosmwasm_std::{coins, from_binary, StdError};
/*

    #[test]
    fn proper_initialization() {
        let mut deps = mock_dependencies(20, &[]);

        let msg = InitMsg { count: 17 };
        let env = mock_env("creator", &coins(1000, "earth"));

        // we can just call .unwrap() to assert this was a success
        let res = init(&mut deps, env, msg).unwrap();
        assert_eq!(0, res.messages.len());

        // it worked, let's query the state
        let res = query(&deps, QueryMsg::GetCount {}).unwrap();
        let value: CountResponse = from_binary(&res).unwrap();
        assert_eq!(17, value.count);
    }

    #[test]
    fn increment() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = InitMsg { count: 17 };
        let env = mock_env("creator", &coins(2, "token"));
        let _res = init(&mut deps, env, msg).unwrap();

        // anyone can increment
        let env = mock_env("anyone", &coins(2, "token"));
        let msg = HandleMsg::Increment {};
        let _res = handle(&mut deps, env, msg).unwrap();

        // should increase counter by 1
        let res = query(&deps, QueryMsg::GetCount {}).unwrap();
        let value: CountResponse = from_binary(&res).unwrap();
        assert_eq!(18, value.count);
    }

    #[test]
    fn reset() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = InitMsg { count: 17 };
        let env = mock_env("creator", &coins(2, "token"));
        let _res = init(&mut deps, env, msg).unwrap();

        // not anyone can reset
        let unauth_env = mock_env("anyone", &coins(2, "token"));
        let msg = HandleMsg::Reset { count: 5 };
        let res = handle(&mut deps, unauth_env, msg);
        match res {
            Err(StdError::Unauthorized { .. }) => {}
            _ => panic!("Must return unauthorized error"),
        }

        // only the original creator can reset the counter
        let auth_env = mock_env("creator", &coins(2, "token"));
        let msg = HandleMsg::Reset { count: 5 };
        let _res = handle(&mut deps, auth_env, msg).unwrap();

        // should now be 5
        let res = query(&deps, QueryMsg::GetCount {}).unwrap();
        let value: CountResponse = from_binary(&res).unwrap();
        assert_eq!(5, value.count);
    }
*/
}
