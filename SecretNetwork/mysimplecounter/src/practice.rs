use substrate_fixed::types::I20F12;

// fn main() {
//     // 19/3 = 6 1/3
//     let six_and_third = I20F12::from_num(19) / 3;
//     // four decimal digits for 12 binary digits
//     assert_eq!(six_and_third.to_string(), "6.3333");
//     // find the ceil and convert to i32
//     assert_eq!(six_and_third.ceil().to_num::<i32>(), 7);
//     // we can also compare directly to integers
//     assert_eq!(six_and_third.ceil(), 7);
// }
