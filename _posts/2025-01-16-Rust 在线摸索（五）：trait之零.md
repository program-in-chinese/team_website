
为了更明白某个广为流传的 Rust 反面例程，暂停错误处理部分学习，先看 [trait](https://doc.rust-lang.org/rust-by-example/trait.html)。仍用 [在线环境](https://play.rust-lang.org/) 运行。

trait 意为 特性，初看有点像接口（interface）。

本章节第一段代码输出：

```
Dolly pauses briefly... baaaaah!
Dolly gets a haircut!
Dolly pauses briefly... baaaaah?
```

开始中文化，有一处 `Animal` 未改，报错：

```
error[E0433]: failed to resolve: use of undeclared type `Animal`
  --> src/main.rs:62:28
   |
62 |     let mut dolly: Sheep = Animal::new("Dolly");
   |                            ^^^^^^ use of undeclared type `Animal`

For more information about this error, try `rustc --explain E0433`.
```

这里用的术语是 'type'，为何不用 ‘trait’呢？难道 trait 是 type 的一种，仅靠上下文无法确定吗？

继续中文化，不大明白为何要在实现 `绵羊` 之前先定义一个同名 struct。

一路顺利，直到在把 is_naked 改名后，八个错：

```
error: unknown start of token: \u{ff1f}
  --> src/main.rs:18:10
   |
18 |     fn 光着？(&self) -> bool {
   |            ^^
   |
help: Unicode character '？' (Fullwidth Question Mark) looks like '?' (Question Mark), but it is not
   |
18 |     fn 光着?(&self) -> bool {
   |            ~

error: unknown start of token: \u{ff1f}
  --> src/main.rs:23:19
【同上】  
  --> src/main.rs:46:19
   |
46 |         if self.光着？() {
   |                     ^^
   |
help: Unicode character '？' (Fullwidth Question Mark) looks like '?' (Question Mark), but it is not
   |
46 |         if self.光着?() {
   |                     ~

error: missing parameters for function definition
  --> src/main.rs:18:10
   |
18 |     fn 光着？(&self) -> bool {
   |            ^
   |
help: add a parameter list
   |
18 |     fn 光着()？(&self) -> bool {
   |            ++

error: expected one of `->`, `<`, `where`, or `{`, found `?`
  --> src/main.rs:18:10
   |
17 | impl 绵羊 {
   |           - while parsing this item list starting here
18 |     fn 光着？(&self) -> bool {
   |            ^^ expected one of `->`, `<`, `where`, or `{`
...
32 | }
   | - the item list ends here

error[E0277]: the `?` operator can only be applied to values that implement `Try`
  --> src/main.rs:46:12
   |
46 |         if self.光着？() {
   |            ^^^^^^^^^^^ the `?` operator cannot be applied to type `bool`
   |
   = help: the trait `Try` is not implemented for `bool`

error[E0277]: the `?` operator can only be used in a method that returns `Result` or `Option` (or another type that implements `FromResidual`)
  --> src/main.rs:46:19
   |
45 |     fn 嘶鸣(&self) -> &'static str {
   |     ------------------------------ this function should return `Result` or `Option` to accept `?`
46 |         if self.光着？() {
   |                     ^^ cannot use the `?` operator in a method that returns `&str`
   |
   = help: the trait `FromResidual<_>` is not implemented for `&str`

error[E0599]: no method named `剃毛` found for struct `绵羊` in the current scope
  --> src/main.rs:66:11
   |
1  | struct 绵羊 { 光着: bool, 名字: &'static str }
   | ----------- method `剃毛` not found for this struct
...
66 |     dolly.剃毛();
   |           ^^^^ method not found in `绵羊`

Some errors have detailed explanations: E0277, E0599.
For more information about an error, try `rustc --explain E0277`.
```

挺有意思，首先是把中文问号换成了英文的，然后根据上下文给不同建议。而且，因为`剃毛`函数因`光着？`无法编译，下面就报没有这个函数定义，感觉可以在报错时隐去此问题，以简约化报告。

最后效果：

```rust
struct 绵羊 { 光着: bool, 名字: &'static str }

trait 动物 {
    // Associated function signature; `Self` refers to the implementor type.
    fn new(名字: &'static str) -> Self;

    // Method signatures; these will return a string.
    fn 名字(&self) -> &'static str;
    fn 嘶鸣(&self) -> &'static str;

    // Traits can provide default method definitions.
    fn 发声(&self) {
        println!("{} says {}", self.名字(), self.嘶鸣());
    }
}

impl 绵羊 {
    fn 是否光着(&self) -> bool {
        self.光着
    }

    fn 剃毛(&mut self) {
        if self.是否光着() {
            // Implementor methods can use the implementor's trait methods.
            println!("{} is already naked...", self.名字());
        } else {
            println!("{} gets a haircut!", self.名字);

            self.光着 = true;
        }
    }
}

// Implement the `Animal` trait for `绵羊`.
impl 动物 for 绵羊 {
    // `Self` is the implementor type: `绵羊`.
    fn new(名字: &'static str) -> 绵羊 {
        绵羊 { 名字: 名字, 光着: false }
    }

    fn 名字(&self) -> &'static str {
        self.名字
    }

    fn 嘶鸣(&self) -> &'static str {
        if self.是否光着() {
            "baaaaah?"
        } else {
            "baaaaah!"
        }
    }
    
    // Default trait methods can be overridden.
    fn 发声(&self) {
        // For example, we can add some quiet contemplation.
        println!("{} pauses briefly... {}", self.名字, self.嘶鸣());
    }
}

fn main() {
    // Type annotation is necessary in this case.
    let mut 多利: 绵羊 = 动物::new("Dolly");
    // TODO ^ Try removing the type annotations.

    多利.发声();
    多利.剃毛();
    多利.发声();
}
```

输出与原代码相同。
