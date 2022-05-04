// fn main() {
//   let answer = 42;
//   println!("Hello {}", answer);
// }

fn main() {
  for i in 0..5 {
      let even_odd = if i % 2 == 0 {"even"} else {"odd"};
      println!("{} {}", even_odd, i);
  }
}