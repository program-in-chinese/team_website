
在 trait 例程里老看到 struct，于是回来补这个 [数据类型定义方法](https://doc.rust-lang.org/rust-by-example/custom_types/structs.html)。

英文例程输出，熟悉的人和坐标：

```
Person { name: "Peter", age: 27 }
point coordinates: (5.2, 0.4)
second point: (10.3, 0.2)
pair contains 1 and 0.1
pair contains 1 and 0.1
```

vsc 里 Rust 高亮对中文标识符似乎无效。另外确定了 String 是字符串类型。

一路中文化直到这个 [第一篇](https://zhuanlan.zhihu.com/p/17478754925) 里就碰到的警告：

```
warning: unused variable: `某长方形`
  --> src/main.rs:57:9
   |
57 |     let 某长方形 = 长方形 {
   |         ^^^^^^^^ help: if this is intentional, prefix it with an underscore: `_某长方形`
   |
   = note: `#[warn(unused_variables)]` on by default

warning: unused variable: `某单元`
  --> src/main.rs:64:9
   |
64 |     let 某单元 = 单元;
   |         ^^^^^^ help: if this is intentional, prefix it with an underscore: `_某单元`

warning: `playground` (bin "playground") generated 2 warnings
```

看来是前缀下划线就表示该变量无引用，可是开头的这个宏难道不是为了隐藏这种警告吗？

```rust
// An attribute to hide warnings for unused code.
#![allow(dead_code)]
```

试着按提示加了 `#[warn(not(unused_variables))]`，报错：

```
error[E0452]: malformed lint attribute input
 --> src/main.rs:3:8
  |
3 | #[warn(not(unused_variables))]
  |        ^^^^^^^^^^^^^^^^^^^^^ bad attribute argument
```

难道画蛇添足了？去掉not后原样报警，像 `#![allow(dead_code)]` 那样加个 ! 如何？

```
warning: unused variable: `某长方形`
  --> src/main.rs:58:9
   |
58 |     let 某长方形 = 长方形 {
   |         ^^^^^^^^ help: if this is intentional, prefix it with an underscore: `_某长方形`
   |
note: the lint level is defined here
  --> src/main.rs:3:9
   |
3  | #![warn(unused_variables)]
   |         ^^^^^^^^^^^^^^^^
```

哦吼？看来这样是设置警告。那么把 warn 改为 allow？果然这样不报警了。

终于无警告输出：

```
人 { 名字: "Peter", 年龄: 27 }
某点 coordinates: (5.2, 0.4)
second 某点: (10.3, 0.2)
某对 contains 1 and 0.1
某对 contains 1 and 0.1
```

完整中文化代码：

```rust
// An attribute to hide warnings for unused code.
#![allow(dead_code)]
#![allow(unused_variables)]

#[derive(Debug)]
struct 人 {
    名字: String,
    年龄: u8,
}

// A unit struct
struct 单元;

// A tuple struct
struct 对(i32, f32);

// A struct with two fields
struct 点 {
    x: f32,
    y: f32,
}

// Structs can be reused as fields of another struct
struct 长方形 {
    // A rectangle can be specified by where the top left and bottom right
    // corners are in space.
    左上: 点,
    右下: 点,
}

fn main() {
    // Create struct with field init shorthand
    let 名字 = String::from("Peter");
    let 年龄 = 27;
    let 阿猫 = 人 { 名字, 年龄 };

    // Print debug struct
    println!("{:?}", 阿猫);

    // Instantiate a `点`
    let 某点: 点 = 点 { x: 5.2, y: 0.4 };
    let 另一点: 点 = 点 { x: 10.3, y: 0.2 };

    // Access the fields of the 某点
    println!("某点 coordinates: ({}, {})", 某点.x, 某点.y);

    // Make a new 某点 by using struct update syntax to use the fields of our
    // other one
    let 右下 = 点 { x: 10.3, ..另一点 };

    // `右下.y` will be the same as `另一点.y` because we used that field
    // from `另一点`
    println!("second 某点: ({}, {})", 右下.x, 右下.y);

    // Destructure the 某点 using a `let` binding
    let 点 { x: 左边, y: 上边 } = 某点;

    let 某长方形 = 长方形 {
        // struct instantiation is an expression too
        左上: 点 { x: 左边, y: 上边 },
        右下: 右下,
    };

    // Instantiate a unit struct
    let 某单元 = 单元;

    // Instantiate a tuple struct
    let 某对 = 对(1, 0.1);

    // Access the fields of a tuple struct
    println!("某对 contains {:?} and {:?}", 某对.0, 某对.1);

    // Destructure a tuple struct
    let 对(整数, 小数) = 某对;

    println!("某对 contains {:?} and {:?}", 整数, 小数);
}
```

`#[derive(Debug)]` 是啥？面向新手的例程里最好少些干扰，尤其是可有可无的内容。

## 第一次尝试练习

### Add a function rect_area which calculates the area of a Rectangle (try using nested destructuring).

前面好像没介绍函数，更不用提带参数的。摸着报错过河吧。先来个最短的：

```rust
fn rect_area() {
    return 0
}
```

报错：

```
error[E0308]: mismatched types
  --> src/main.rs:32:12
   |
31 | fn rect_area() {
   |               - help: try adding a return type: `-> i32`
32 |     return 0
   |            ^ expected `()`, found integer
```

要指定返回类型，考虑到面积最后返回小数，用了 f32，不报错了：

```rust
fn rect_area() -> f32 {
    return 0.0
}
```

加参数：

```rust
fn rect_area(某方形) -> f32 {
    return 0.0
}
```

[熟悉的报错](https://zhuanlan.zhihu.com/p/17837138618)：

```
error: expected one of `:`, `@`, or `|`, found `)`
  --> src/main.rs:31:17
   |
31 | fn rect_area(某方形) -> f32 {
   |                    ^ expected one of `:`, `@`, or `|`
   |
   = note: anonymous parameters are removed in the 2018 edition (see RFC 1685)
help: if this is a `self` type, give it a parameter name
   |
31 | fn rect_area(self: 某方形) -> f32 {
   |              +++++
help: if this is a parameter name, give it a type
   |
31 | fn rect_area(某方形: TypeName) -> f32 {
   |                    ++++++++++
help: if this is a type, explicitly ignore the parameter name
   |
31 | fn rect_area(_: 某方形) -> f32 {
   |              ++
```

要为函数参数指定类型：

```rust
fn rect_area(某方形: 长方形) -> f32 {
    return 0.0
}
```

开始照着 `let 点` 的样子解构，居然没警告 `左上点` unused？

```rust
fn rect_area(某方形: 长方形) -> f32 {
    let 长方形 { 左上: 左上点, 右下: 右下点 } = 某方形;
    return 0.0
}
```

继续解：

```rust
fn rect_area(某方形: 长方形) -> f32 {
    let 长方形 { 左上: 左上点, 右下: 右下点 } = 某方形;
    let 点 { x: 左边, y: 上边 } = 左上点;
    let 点 { x: 右边, y: 下边 } = 右下点;
    return 0.0
}
```

修正返回值：

```rust
fn rect_area(某方形: 长方形) -> f32 {
    let 长方形 { 左上: 左上点, 右下: 右下点 } = 某方形;
    let 点 { x: 左边, y: 上边 } = 左上点;
    let 点 { x: 右边, y: 下边 } = 右下点;
    return (右边-左边)*(上边-下边)
}
```

main 里加 `println!("长方面积：{}", rect_area(某长方形))`，输出多了：`长方面积：1.0200001`

小数计算还是有传统误差。看来完成了。

### Add a function square which takes a Point and a f32 as arguments, and returns a Rectangle with its top left corner on the point, and a width and height corresponding to the f32.

有空再做。
