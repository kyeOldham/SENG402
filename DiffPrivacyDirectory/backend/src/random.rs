use cosmwasm_std::{StdResult, ReadonlyStorage, Storage};
use cosmwasm_storage::{ReadonlySingleton, Singleton};

use rand::{RngCore, SeedableRng};
use rand_chacha::ChaChaRng;
use sha2::{Digest, Sha256};

// This is the key we use to store the random seed in the contract's storage.
static KEY_ENTROPY_POOL: &[u8] = b"entropy_pool";

// Gets the current random seed from the contract's storage.
fn get_current_entropy_pool<S: ReadonlyStorage>(storage: &S) -> [u8; 32] {
    ReadonlySingleton::new(storage, KEY_ENTROPY_POOL)
        .load()
        .or::<[u8; 32]>(Ok([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0,
        ]))
        .unwrap()
}

// Sets the current random seed in the contract's storage.
pub fn supply_more_entropy<S: Storage>(
    storage: &mut S,
    additional_entropy: &[u8],
) -> StdResult<()> {

    let current_entropy_pool = get_current_entropy_pool(storage);
    let mut new_entropy_source = Vec::from(current_entropy_pool);
    new_entropy_source.extend(additional_entropy);

    // Hash the entropy source to get a new seed.
    let new_entropy_pool: [u8; 32] = Sha256::digest(&new_entropy_source).into();

    // Store the new seed in the contract's storage.
    Singleton::new(storage, KEY_ENTROPY_POOL).save(&new_entropy_pool)
}

// Creates a random number generator using the current random seed.
pub fn get_random_number_generator<S: ReadonlyStorage>(storage: &S) -> ChaChaRng {
    let entropy_pool = get_current_entropy_pool(storage);
    ChaChaRng::from_seed(entropy_pool)
}

// Gets a random number from the current random seed.
pub fn get_random_number<S: ReadonlyStorage>(storage: &S) -> u64 {
    let entropy_pool = get_current_entropy_pool(storage);

    let mut rng = ChaChaRng::from_seed(entropy_pool);

    rng.next_u64()
}

// sha256 hashing function
pub fn sha_256(data: &[u8]) -> [u8; 32] {
    let mut hasher = Sha256::new();
    hasher.update(data);
    let hash = hasher.finalize();

    let mut result = [0u8; 32];
    result.copy_from_slice(hash.as_slice());
    result
}

