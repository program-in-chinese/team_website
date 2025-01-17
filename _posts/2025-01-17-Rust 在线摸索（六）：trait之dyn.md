
仍用 [在线环境](https://play.rust-lang.org/) 运行。看 [dyn](https://doc.rust-lang.org/rust-by-example/trait/dyn.html) 的介绍，似乎是在指定函数返回类型时，额外说明“类型不一定”，估计是 dynamic 的缩写。强烈建议关键词尽量避免缩写！至少在官方文档里说清楚。

上来运行了七八遍，寻思怎么老是baaaah？不是随机后看 <0.5 么？再看一眼随机数如何生成。。。命名能不能不那么误导。直接把 random_number 改名为`某数`，感觉好点。

```rust
struct 羊 {}
struct 牛 {}

trait 动物 {
    // Instance method signature
    fn 嘶鸣(&self) -> &'static str;
}

// Implement the `动物` trait for `羊`.
impl 动物 for 羊 {
    fn 嘶鸣(&self) -> &'static str {
        "baaaaah!"
    }
}

// Implement the `动物` trait for `牛`.
impl 动物 for 牛 {
    fn 嘶鸣(&self) -> &'static str {
        "moooooo!"
    }
}

// Returns some struct that implements 动物, but we don't know which one at compile time.
fn 抽个动物(某数: f64) -> Box<dyn 动物> {
    if 某数 < 0.5 {
        Box::new(羊 {})
    } else {
        Box::new(牛 {})
    }
}

fn main() {
    let 某数 = 0.234;
    let 动物 = 抽个动物(某数);
    println!("You've randomly chosen an animal, and it says {}", 动物.嘶鸣());
}
```

如果去掉 Box<dyn>，报错如下，果然 type 和 trait 含义不同：

```
error[E0782]: expected a type, found a trait
  --> src/main.rs:24:21
   |
24 | fn 抽个动物(某数: f64) -> 动物 {
   |                           ^^^^
   |
help: use `impl 动物` to return an opaque type, as long as you return a single underlying type
   |
24 | fn 抽个动物(某数: f64) -> impl 动物 {
   |                           ++++
help: alternatively, you can return an owned trait object
   |
24 | fn 抽个动物(某数: f64) -> Box<dyn 动物> {
   |                           +++++++     +

For more information about this error, try `rustc --explain E0782`.
```

如果用第一个建议 `-> impl 动物`，则提示函数体不同分支的返回类型（type）不同：

```
error[E0308]: `if` and `else` have incompatible types
  --> src/main.rs:28:9
   |
25 | /     if 某数 < 0.5 {
26 | |         Box::new(羊 {})
   | |         --------------- expected because of this
27 | |     } else {
28 | |         Box::new(牛 {})
   | |         ^^^^^^^^^^^^^^^ expected `Box<羊>`, found `Box<牛>`
29 | |     }
   | |_____- `if` and `else` have incompatible types
   |
   = note: expected struct `Box<羊>`
              found struct `Box<牛>`

For more information about this error, try `rustc --explain E0308`.
```

有点意外的是，此次报错的建议里没有提到用 dyn。照理说可以分析出 羊 和 牛 实现了同样的 trait，就可以像上面那样提示用 dyn，不过“owned trait object”不知啥意思.

另外，`impl xx for xxx` 挺接近自然语法，不知自然语言里这么常用的 for 还用于其他语法不。

再说缩写，看 impl、fn 似乎是想将关键词长度控制在六个字母（如struct）以内，但 str 有必要么？随便点点其他章节，结果发现 [这里](https://doc.rust-lang.org/rust-by-example/trait/supertraits.html):

```rust
fn university(&self) -> String;
```

难道 str 不是 String 吗？!

回头再看一下代码，`-> &'static str` 重复了三次，挺扎眼。

于是把这里的一处 ->... 去掉试试：
```rust
impl 动物 for 羊 {
    fn 嘶鸣(&self) -> &'static str {
        "baaaaah!"
    }
}
```

报错如下：

```
error[E0053]: method `嘶鸣` has an incompatible type for trait
  --> src/main.rs:11:17
   |
11 |     fn 嘶鸣(&self) {
   |                   ^ expected `&'static str`, found `()`
   |
note: type in trait
  --> src/main.rs:6:21
   |
6  |     fn 嘶鸣(&self) -> &'static str;
   |                       ^^^^^^^^^^^^
   = note: expected signature `fn(&羊) -> &'static str`
              found signature `fn(&羊) -> ()`
help: change the output type to match the trait
   |
11 |     fn 嘶鸣(&self) -> &'static str {
   |                    +++++++++++++++

error[E0308]: mismatched types
  --> src/main.rs:12:9
   |
11 |     fn 嘶鸣(&self) {
   |                   - expected `()` because of default return type
12 |         "baaaaah!"
   |         ^^^^^^^^^^ expected `()`, found `&str`

Some errors have detailed explanations: E0053, E0308.
For more information about an error, try `rustc --explain E0053`.
```

如果 `impl 动物 for 羊` 时，里面实现的 `嘶鸣` 必须和 `动物` 的同名方法有相同签名的话，为啥不能省略掉呢？

从 “expected `()`, found `&str`” 看起来 "baaaaah!" 的返回类型是 `&str`，那么如果把 `-> &'static str` 都改成 `&str`，应该没问题吧。

运行的确如初。看来 'static 就是强调返回值为静态。

如果把 -> 全都去掉的话，除了上面的第二个，还有显示方法必须要匹配返回类型：

```
error[E0277]: `()` doesn't implement `std::fmt::Display`
  --> src/main.rs:35:66
   |
35 |     println!("You've randomly chosen an animal, and it says {}", 动物.嘶鸣());
   |                                                                  ^^^^^^^^^^^ `()` cannot be formatted with the default formatter
   |
   = help: the trait `std::fmt::Display` is not implemented for `()`
   = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead
   = note: this error originates in the macro `$crate::format_args_nl` which comes from the expansion of the macro `println` (in Nightly builds, run with -Z macro-backtrace for more info)

Some errors have detailed explanations: E0277, E0308.
For more information about an error, try `rustc --explain E0277`.
```

话说这个 `()` 算是个啥类型？术语体系里有个命名吗？

最后试了把 `-> Box<dyn 动物>` 去掉，报错如下：

```
error[E0308]: mismatched types
  --> src/main.rs:26:9
   |
26 |         Box::new(羊 {})
   |         ^^^^^^^^^^^^^^^ expected `()`, found `Box<羊>`
   |
   = note: expected unit type `()`
                 found struct `Box<羊>`
help: consider using a semicolon here
   |
26 |         Box::new(羊 {});
   |                        +
help: try adding a return type
   |
24 | fn 抽个动物(某数: f64) -> Box<羊> {
   |                        ++++++++++

error[E0308]: mismatched types
  --> src/main.rs:28:9
   |
28 |         Box::new(牛 {})
   |         ^^^^^^^^^^^^^^^ expected `()`, found `Box<牛>`
   |
   = note: expected unit type `()`
                 found struct `Box<牛>`
help: consider using a semicolon here
   |
28 |         Box::new(牛 {});
   |                        +
help: try adding a return type
   |
24 | fn 抽个动物(某数: f64) -> Box<牛> {
   |                        ++++++++++

error[E0599]: no method named `嘶鸣` found for unit type `()` in the current scope
  --> src/main.rs:35:69
   |
35 |     println!("You've randomly chosen an animal, and it says {}", 动物.嘶鸣());
   |                                                                       ^^^^ method not found in `()`
   |
   = help: items from traits can only be used if the trait is implemented and in scope
note: `动物` defines an item `嘶鸣`, perhaps you need to implement it
  --> src/main.rs:4:1
   |
4  | trait 动物 {
   | ^^^^^^^^^^

Some errors have detailed explanations: E0308, E0599.
For more information about an error, try `rustc --explain E0308`.
error: could not compile `playground` (bin "playground") due to 3 previous errors
```

整整五十行！！感觉这种报错反馈风格对于新手来说视觉和心理上冲击会比较大，尤其是非英文母语开发者。

不过发现了 `()` 的术语：unit type。

得记着 str 和 String 的疑问，先到这里。
