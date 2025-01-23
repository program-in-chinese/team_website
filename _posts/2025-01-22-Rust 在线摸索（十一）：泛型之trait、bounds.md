

## [泛型trait](https://doc.rust-lang.org/rust-by-example/generics/gen_trait.html)

中文化时第一次注意到原代码特意把等号对齐：

```rust
    let empty = Empty;
    let null  = Null;
```

中文化后：

```rust
// Non-copyable types.
struct 空类;
struct 虚类;

// A trait generic over `类`.
trait 双降类<类> {
    // Define a method on the caller type which takes an
    // additional single parameter `类` and does nothing with it.
    fn 双降(self, _: 类);
}

// Implement `双降类<类1>` for any generic parameter `类1` and
// caller `类2`.
impl<类1, 类2> 双降类<类1> for 类2 {
    // This method takes ownership of both passed arguments,
    // deallocating both.
    fn 双降(self, _: 类1) {}
}

fn main() {
    let 空 = 空类;
    let 虚 = 虚类;

    // Deallocate `空` and `虚`.
    空.双降(虚);

    //空;
    //虚;
    // ^ TODO: Try uncommenting these lines.
}
```

如果放开 `空;` 这句，报错如下：

```
error[E0382]: use of moved value: `空`
  --> src/main.rs:27:5
   |
21 |     let 空 = 空类;
   |         -- move occurs because `空` has type `空类`, which does not implement the `Copy` trait
...
25 |     空.双降(虚);
   |        -------- `空` moved due to this method call
26 |
27 |     空;
   |     ^^ value used here after move
   |
note: `双降类::双降` takes ownership of the receiver `self`, which moves `空`
  --> src/main.rs:9:11
   |
9  |     fn 双降(self, _: 类);
   |             ^^^^

For more information about this error, try `rustc --explain E0382`.
```

如果放开 `虚;` 这句，报错如下：

```
error[E0382]: use of moved value: `虚`
  --> src/main.rs:28:5
   |
22 |     let 虚 = 虚类;
   |         -- move occurs because `虚` has type `虚类`, which does not implement the `Copy` trait
...
25 |     空.双降(虚);
   |             -- value moved here
...
28 |     虚;
   |     ^^ value used here after move
   |
note: consider changing this parameter type in function `双降` to borrow instead if owning the value isn't necessary
  --> src/main.rs:9:20
   |
9  |     fn 双降(self, _: 类);
   |        ----          ^^ this parameter takes ownership of the value
   |        |
   |        in this function
note: if `虚类` implemented `Clone`, you could clone the value
  --> src/main.rs:3:1
   |
3  | struct 虚类;
   | ^^^^^^^^^^^ consider implementing `Clone` for this type
...
25 |     空.双降(虚);
   |             -- you could clone this value

For more information about this error, try `rustc --explain E0382`.
```

空类 和 双降类 没在代码里看到直接关联，居然可以 `空.双降` 这样调用。暂不补函数的课，继续快进到where再说。

## [bounds](https://doc.rust-lang.org/rust-by-example/generics/bounds.html)

### 例程 1

```rust
fn 打印机<T: 显示>(t: T) {
    println!("{}", t);
}
```

如直接运行会报错，毕竟还没定义 `显示`：

```
error[E0405]: cannot find trait `显示` in this scope
 --> src/lib.rs:1:11
  |
1 | fn 打印机<类: 显示>(t: 类) {
  |               ^^^^ not found in this scope

For more information about this error, try `rustc --explain E0405`.
```

### 例程 2

```rust
struct S<类: 显示>(类);

// Error! `Vec<T>` does not implement `Display`. This
// specialization will fail.
let s = S(vec![1]);
```

如期报错如下，好像这几篇头次看到报错信息里带文档链接，但这个反馈信息和泛型有关吗？

```
error: expected item, found keyword `let`
 --> src/lib.rs:5:1
  |
5 | let s = S(vec![1]);
  | ^^^
  | |
  | `let` cannot be used for global variables
  | help: consider using `static` or `const` instead of `let`
  |
  = note: for a full list of items that can appear in modules, see <https://doc.rust-lang.org/reference/items.html>
```

### 例程 3

又看到一处对齐：

```rust
    let rectangle = Rectangle { length: 3.0, height: 4.0 };
    let _triangle = Triangle  { length: 3.0, height: 4.0 };
```

这方面还是中文命名有优势些（[此文](https://zhuanlan.zhihu.com/p/40098652) 末条）：

```rust
// A trait which implements the print marker: `{:?}`.
use std::fmt::Debug;

trait 求面积 {
    fn 面积(&self) -> f64;
}

impl 求面积 for 长方形 {
    fn 面积(&self) -> f64 { self.底 * self.高 }
}

#[derive(Debug)]
struct 长方形 { 底: f64, 高: f64 }
#[allow(dead_code)]
struct 三角形 { 底: f64, 高: f64 }

// The generic `调试类` must implement `Debug`. Regardless
// of the type, this will work properly.
fn 调试输出<调试类: Debug>(t: &调试类) {
    println!("{:?}", t);
}

// `形状` must implement `求面积`. Any type which meets
// the bound can access `求面积`'s function `面积`.
fn 面积<形状: 求面积>(t: &形状) -> f64 { t.面积() }

fn main() {
    let 某长方 = 长方形 { 底: 3.0, 高: 4.0 };
    let _某三角 = 三角形 { 底: 3.0, 高: 4.0 };

    调试输出(&某长方);
    println!("Area: {}", 面积(&某长方));

    //调试输出(&_某三角);
    //println!("Area: {}", 面积(&_某三角));
    // ^ TODO: Try uncommenting these.
    // | Error: Does not implement either `Debug` or `求面积`. 
}
```

输出：

```
长方形 { 底: 3.0, 高: 4.0 }
Area: 12
```

如果放开 `调试输出(&_某三角);`，如期报错：

```
error[E0277]: `三角形` doesn't implement `Debug`
  --> src/main.rs:35:10
   |
35 |     调试输出(&_某三角);
   |     -------- ^^^^^^^^ `三角形` cannot be formatted using `{:?}`
   |     |
   |     required by a bound introduced by this call
   |
   = help: the trait `Debug` is not implemented for `三角形`
   = note: add `#[derive(Debug)]` to `三角形` or manually `impl Debug for 三角形`
note: required by a bound in `调试输出`
  --> src/main.rs:20:14
   |
20 | fn 调试输出<调试类: Debug>(t: &调试类) {
   |                     ^^^^^ required by this bound in `调试输出`
help: consider annotating `三角形` with `#[derive(Debug)]`
   |
16 + #[derive(Debug)]
17 | struct 三角形 { 底: f64, 高: f64 }
   |

For more information about this error, try `rustc --explain E0277`.
```

在 struct 前加一句：

```rust
#[derive(Debug)]
struct 三角形 { 底: f64, 高: f64 }
```

输出正确：

```
长方形 { 底: 3.0, 高: 4.0 }
Area: 12
三角形 { 底: 3.0, 高: 4.0 }
```

再放开末句 `println!("Area: {}", 面积(&_某三角));`，报错如下：

```
error[E0277]: the trait bound `三角形: 求面积` is not satisfied
  --> src/main.rs:36:29
   |
36 |     println!("Area: {}", 面积(&_某三角));
   |                          ---- ^^^^^^^^ the trait `求面积` is not implemented for `三角形`
   |                          |
   |                          required by a bound introduced by this call
   |
   = help: the trait `求面积` is implemented for `长方形`
note: required by a bound in `面积`
  --> src/main.rs:26:11
   |
26 | fn 面积<形状: 求面积>(t: &形状) -> f64 { t.面积() }
   |               ^^^^^^ required by this bound in `面积`

For more information about this error, try `rustc --explain E0277`.
```

按help提示，参考长方形实现所需trait：

```rust
impl 求面积 for 三角形 {
    fn 面积(&self) -> f64 { self.底 * self.高 / 2 }
}
```

报错：

```
error[E0277]: cannot divide `f64` by `{integer}`
  --> src/main.rs:13:43
   |
13 |     fn 面积(&self) -> f64 { self.底 * self.高 / 2 }
   |                                               ^ no implementation for `f64 / {integer}`
   |
   = help: the trait `Div<{integer}>` is not implemented for `f64`
   = help: the following other types implement trait `Div<Rhs>`:
             `&f64` implements `Div<f64>`
             `&f64` implements `Div`
             `f64` implements `Div<&f64>`
             `f64` implements `Div`
help: consider using a floating-point literal by writing it with `.0`
   |
13 |     fn 面积(&self) -> f64 { self.底 * self.高 / 2.0 }
   |                                                  ++

For more information about this error, try `rustc --explain E0277`.
```

按提示改为 / 2.0，输出正确：

```
长方形 { 底: 3.0, 高: 4.0 }
Area: 12
三角形 { 底: 3.0, 高: 4.0 }
Area: 6
```

### [多个bound](https://doc.rust-lang.org/rust-by-example/generics/multi_bounds.html)

发现 Display 也在标准库。

```rust
use std::fmt::{Debug, Display};

fn 比较输出<T: Debug + Display>(t: &T) {
    println!("Debug: `{:?}`", t);
    println!("Display: `{}`", t);
}

fn 比较类型<T: Debug, U: Debug>(t: &T, u: &U) {
    println!("t: `{:?}`", t);
    println!("u: `{:?}`", u);
}

fn main() {
    let 文字 = "words";
    let 数组 = [1, 2, 3];
    let 矢量 = vec![1, 2, 3];

    比较输出(&文字);
    //比较输出(&数组);
    // TODO ^ Try uncommenting this.

    比较类型(&数组, &矢量);
}
```

运行输出：

```
Debug: `"words"`
Display: `words`
t: `[1, 2, 3]`
u: `[1, 2, 3]`
```

放开 `比较输出(&数组);` 报错如下：

```
error[E0277]: `[{integer}; 3]` doesn't implement `std::fmt::Display`
  --> src/main.rs:19:10
   |
19 |     比较输出(&数组);
   |     -------- ^^^^^ `[{integer}; 3]` cannot be formatted with the default formatter
   |     |
   |     required by a bound introduced by this call
   |
   = help: the trait `std::fmt::Display` is not implemented for `[{integer}; 3]`
   = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead
note: required by a bound in `比较输出`
  --> src/main.rs:3:20
   |
3  | fn 比较输出<T: Debug + Display>(t: &T) {
   |                        ^^^^^^^ required by this bound in `比较输出`

For more information about this error, try `rustc --explain E0277`.
```

注意到反馈里用 `[{integer}; 3]` 表达长度为3的整数数组。

试了这么写 `let 数组: [{integer}; 3] = [1, 2, 3];` 报错如下：

```
error: expected type, found `{`
  --> src/main.rs:15:14
   |
15 |     let 数组: [{integer}; 3] = [1, 2, 3];
   |             -  ^ expected type
   |             |
   |             while parsing the type for `数组`
   |             help: use `=` if you meant to assign

error[E0425]: cannot find value `integer` in this scope
  --> src/main.rs:15:15
   |
15 |     let 数组: [{integer}; 3] = [1, 2, 3];
   |                 ^^^^^^^ not found in this scope

error[E0070]: invalid left-hand side of assignment
  --> src/main.rs:15:28
   |
15 |     let 数组: [{integer}; 3] = [1, 2, 3];
   |               -------------- ^
   |               |
   |               cannot assign to this expression

Some errors have detailed explanations: E0070, E0425.
For more information about an error, try `rustc --explain E0070`.
```

不知在代码中如何指定“长度为3的整数数组”这一类型。理想中反馈信息中使用的语法应尽可能与代码一致。
