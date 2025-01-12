
个人对语言工具的反馈如报错等特别关注，因此先看 [错误处理](https://doc.rust-lang.org/rust-by-example/error.html)

## [panic](https://doc.rust-lang.org/rust-by-example/error/panic.html)

运行教程中原始代码，如期报错：

```
Errors

Exited with status 101

Standard Error

   Compiling playground v0.0.1 (/playground)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.83s
     Running `target/debug/playground`
thread 'main' panicked at src/main.rs:3:33:
AAAaaaaa!!!!
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace

Standard Output

Some refreshing water is all I need.
```

这个 101 的状态码报告感觉有点多余。

照例中文化变量名：

```rust
fn drink(饮料: &str) {
    // You shouldn't drink too much sugary beverages.
    if 饮料 == "柠檬水" { panic!("AAAaaaaa!!!!"); }

    println!("Some refreshing {} is all I need.", beverage);
}

fn main() {
    drink("水");
    drink("柠檬水");
    drink("还是水");
}
```


注意到 panic! 和 println! 都以感叹号结尾，不知是否所有内置函数都遵循这一命名规范。另外，这个命名虽然更口语化，但不知在术语体系中是否融洽，待观察。

报错变量未定义，‘scope’正式介绍在此教程的 [变量部分](https://doc.rust-lang.org/rust-by-example/variable_bindings/scope.html)，似乎所有变量都在大括号包围 block 里 。

```
Standard Error

   Compiling playground v0.0.1 (/playground)
error[E0425]: cannot find value `beverage` in this scope
 --> src/main.rs:5:51
  |
5 |     println!("Some refreshing {} is all I need.", beverage);
  |                                                   ^^^^^^^^ not found in this scope

For more information about this error, try `rustc --explain E0425`.
error: could not compile `playground` (bin "playground") due to 1 previous error
```

想运行 `rustc --explain E0425` 看看效果，但在线环境里没找到终端可输入命令。

改正后：

```
Errors

Exited with status 101

Standard Error

   Compiling playground v0.0.1 (/playground)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.75s
     Running `target/debug/playground`
thread 'main' panicked at src/main.rs:3:27:
AAAaaaaa!!!!
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace

Standard Output

Some refreshing 水 is all I need.
```

想看看 3:27 的行列号位置是否定位准确，但在线环境里没找到当前光标位置信息。

继续中文化，发现耗时似乎在变少：
```
Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.57s
```

最后中文化效果：

```rust
fn 喝(饮料: &str) {
    if 饮料 == "柠檬水" { panic!("啊啊啊!!!!"); }

    println!("望{}止渴.", 饮料);
}

fn main() {
    喝("水");
    喝("柠檬水");
    喝("还是水");
}
```

多次运行后，感觉和原始英文代码在耗时上没大区别。

然后发现 “run with `RUST_BACKTRACE=1` environment variable to display a backtrace” 是个链接，点击后：

```
Standard Error

   Compiling playground v0.0.1 (/playground)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.48s
     Running `target/debug/playground`
thread 'main' panicked at src/main.rs:2:27:
啊啊啊!!!!
stack backtrace:
   0: rust_begin_unwind
             at /rustc/9fc6b43126469e3858e2fe86cafb4f0fd5068869/library/std/src/panicking.rs:665:5
   1: core::panicking::panic_fmt
             at /rustc/9fc6b43126469e3858e2fe86cafb4f0fd5068869/library/core/src/panicking.rs:76:14
   2: playground::喝
             at ./src/main.rs:2:32
   3: playground::main
             at ./src/main.rs:9:5
   4: core::ops::function::FnOnce::call_once
             at ./.rustup/toolchains/stable-x86_64-unknown-linux-gnu/lib/rustlib/src/rust/library/core/src/ops/function.rs:250:5
note: Some details are omitted, run with `RUST_BACKTRACE=full` for a verbose backtrace.

```

以后报错的外链内容估计会更丰富，希望早日看到像 [早先一站式IDE](https://zhuanlan.zhihu.com/p/260117393) 设想的和文档、例程等知识库内容结合。

### 后补

注意到 :&str 这个类型说明，看着多余。试了试去掉果然报错：

```
error: expected one of `:`, `@`, or `|`, found `)`
 --> src/main.rs:1:8
  |
1 | fn 喝(饮料) {
  |           ^ expected one of `:`, `@`, or `|`
  |
  = note: anonymous parameters are removed in the 2018 edition (see RFC 1685)
help: if this is a `self` type, give it a parameter name
  |
1 | fn 喝(self: 饮料) {
  |       +++++
help: if this is a parameter name, give it a type
  |
1 | fn 喝(饮料: TypeName) {
  |           ++++++++++
help: if this is a type, explicitly ignore the parameter name
  |
1 | fn 喝(_: 饮料) {
  |       ++
```

反馈够详细，不过感觉还有改进空间，毕竟从方法体里看得出是参数名。

另外，随着反馈信息越来越丰富，命令行工具应该也会在渲染上逐渐丰富起来。像 Python 3.13 支持的颜色高亮只是第一步。