
续 [前文](https://zhuanlan.zhihu.com/p/17837138618)，光看题目“[abort and unwind](https://doc.rust-lang.org/rust-by-example/error/abort_unwind.html)”，以为是 panic 类似的宏，毕竟都是动词。细看后似乎是 panic 后续，不知为何并列为另一节。标准库命名风格也待继续考察。

## 例一

猴子测试，把 panic 改成了‘恐慌’，报错如下：

```
warning: unexpected `cfg` condition name: `恐慌`
 --> src/main.rs:4:17
  |
4 |         if cfg!(恐慌 = "abort") {
  |                 ^^^^^^^^^^^^^^
  |
  = help: expected names are: `clippy`, `debug_assertions`, `doc`, `docsrs`, `doctest`, `feature`, `fmt_debug`, `miri`, `overflow_checks`, `panic`, `proc_macro`, `relocation_model`, `rustfmt`, `sanitize`, `sanitizer_cfi_generalize_pointers`, `sanitizer_cfi_normalize_integers`, `target_abi`, `target_arch`, `target_endian`, `target_env`, `target_family`, `target_feature`, `target_has_atomic`, `target_has_atomic_equal_alignment`, `target_has_atomic_load_store`, `target_os`, `target_pointer_width`, `target_thread_local`, `target_vendor`, `test`, `ub_checks`, `unix`, and `windows`
  = help: consider using a Cargo feature instead
  = help: or consider adding in `Cargo.toml` the `check-cfg` lint config for the lint:
           [lints.rust]
           unexpected_cfgs = { level = "warn", check-cfg = ['cfg(恐慌, values("abort"))'] }
  = help: or consider adding `println!("cargo::rustc-check-cfg=cfg(恐慌, values(\"abort\"))");` to the top of the `build.rs`
  = note: see <https://doc.rust-lang.org/nightly/rustc/check-cfg/cargo-specifics.html> for more information about checking conditional configuration
  = note: `#[warn(unexpected_cfgs)]` on by default
```

个人看来，随着编程工具反馈信息的逐渐丰富，篇幅也越来越长。至少在视觉效果上，中文化后应该会简约不少。

中文化后：

```rust
fn 喝(饮料: &str) {
    if 饮料 == "柠檬水" {
        if cfg!(panic = "abort") {
            println!("走错了，快跑！！");
        } else {
            println!("快吐！！");
        }
    } else {
        println!("望{}止渴.", 饮料);
    }
}

fn main() {
    喝("水");
    喝("柠檬水");
}
```

想看看 panic 值，加了句 println!，发现在线环境的编辑器里换行没有自动缩进。

照旧忘了句末分号：

```
error: expected `;`, found `println`
 --> src/main.rs:6:34
  |
6 |             println!("{}", panic)
  |                                  ^ help: add `;` here
7 |             println!("快吐！！");
  |             ------- unexpected token
```

上一篇有评论提醒 println 是宏，从“found `println`”看来的确命名中没有感叹号。另外，“------- unexpected token”这句有点噪声感觉。

结果报错：

```
error[E0423]: expected value, found macro `panic`
 --> src/main.rs:6:28
  |
6 |             println!("{}", panic);
  |                            ^^^^^ not a value
  |
help: consider importing this function instead
  |
1 + use core::panicking::panic;
  |

For more information about this error, try `rustc --explain E0423`.
```

因为这句 `panic = "abort"`，以为既然可以与字符串作比较，应可以打印出 panic 的值。对了，为啥不用 == 对 panic 进行检查？

试改之后，报错如下：

```
error: expected 1 cfg-pattern
 --> src/main.rs:3:12
  |
3 |         if cfg!(panic == "abort") {
  |            ^^^^^^^^^^^^^^^^^^^^^
```

为何不将 pattern 和普通的条件判断的形式一致化呢？

另外发觉，看rust里感叹号（cfg! 也是个宏？）需要和其他语言常用的 ! 的‘取否’语义区别开来，还需要习惯一下。

## 例二

发现 `#[cfg(not(panic = "unwind"))]` 这句，这下怀疑 cfg! 到底是 cfg(not()) 还是啥意思了。

```rust
#[cfg(panic = "unwind")]
fn 啊() {
    println!("快吐！！");
}

#[cfg(not(panic = "unwind"))]
fn 啊() {
    println!("走错了，快跑！！");
}

fn 喝(饮料: &str) {
    if 饮料 == "柠檬水" {
        ah();
    } else {
        println!("望{}止渴.", 饮料);
    }
}

fn main() {
    喝("水");
    喝("柠檬水");
}
```

漏了个方法名未中文化：

```
error[E0425]: cannot find function `ah` in this scope
  --> src/main.rs:13:9
   |
13 |         ah();
   |         ^^ not found in this scope

For more information about this error, try `rustc --explain E0425`.
```

在线环境没找到命令行运行 rustc，好像有些错误是由错误码索引，而另一些如 cfg-pattern 与分号缺失等错误不是。不知是否编译期和运行时的区别，但对一般开发者来说似乎不需了解。

改正之后，运行如期，与例一输出相同：

```
Standard Output

望水止渴.
快吐！！
```

光看这两个例子，猜度 panic 的默认值为 unwind。还得再研究 cfg 和 #[] 的含义。