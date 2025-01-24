
终于到了 [where从句](https://doc.rust-lang.org/rust-by-example/generics/where.html)。

看介绍似乎是 bound 的一种等价语法，这句貌似是额外功能，“arbitrary types”何意待查：

> Additionally, where clauses can apply bounds to arbitrary types, rather than just to type parameters.

中文化时，从这个报警看方法名的确建议下划线风格。

```
warning: trait method `输出Option` should have a snake case name
 --> src/main.rs:4:8
  |
4 |     fn 输出Option(self);
  |        ^^^^^^^^^^ help: convert the identifier to snake case: `输出_option`
  |
  = note: `#[warn(non_snake_case)]` on by default
```

修正后的中文化代码：

```rust
use std::fmt::Debug;

trait 输出Option类 {
    fn 输出_option(self);
}

// Because we would otherwise have to express this as `T: Debug` or 
// use another method of indirect approach, this requires a `where` clause:
impl<T> 输出Option类 for T where
    Option<T>: Debug {
    // We want `Option<T>: Debug` as our bound because that is what's
    // being printed. Doing otherwise would be using the wrong bound.
    fn 输出_option(self) {
        println!("{:?}", Some(self));
    }
}

fn main() {
    let 矢量 = vec![1, 2, 3];

    矢量.输出_option();
}
```

输出：`Some([1, 2, 3])`

根据注释，把 `Option<T>: Debug` 改成了 `T: Debug`，想看看有何不同。

结果输出相同，没有其他反馈。

然后去掉where用参数bound代替：`impl<T: Debug> 输出Option类 for T`，运行输出仍相同。

whatever。。。

## 反面代码

回看这段（源自 [此答](https://www.zhihu.com/question/603518666/answer/3285215417)）：

![截图]()

对于贴代码截图却不附上出处链接的，个人有本能警惕。用谷歌搜 `"servicefactory<Request<pin<box<dyn"` 终于找到 [出处](https://cseweb.ucsd.edu/classes/sp22/cse223B-a/tribbler/actix_web/dev/trait.ServiceFactory.html#impl-ServiceFactory%3C(T%2C%20Option%3CSocketAddr%3E)%3E-for-H1Service%3CT%2C%20S%2C%20B%2C%20X%2C%20U%3E)。

![页面]()

文字格式如下：

```rust
impl<T, S, B, X, U> ServiceFactory<(T, Option<SocketAddr>)> for H1Service<T, S, B, X, U> where
    T: 'static + AsyncRead + AsyncWrite + Unpin,
    S: ServiceFactory<Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>, Config = ()>,
    B: MessageBody,
    X: ServiceFactory<Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>, Config = (), Response = Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>>,
    U: ServiceFactory<(Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>, Framed<T, Codec>), Config = (), Response = ()>,
    <S as ServiceFactory<Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>>>::Future: 'static,
    <S as ServiceFactory<Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>>>::Error: Into<Response<BoxBody>>,
    <S as ServiceFactory<Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>>>::Response: Into<Response<B>>,
    <S as ServiceFactory<Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>>>::InitError: Debug,
    <X as ServiceFactory<Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>>>::Future: 'static,
    <X as ServiceFactory<Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>>>::Error: Into<Response<BoxBody>>,
    <X as ServiceFactory<Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>>>::InitError: Debug,
    <U as ServiceFactory<(Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>, Framed<T, Codec>)>>::Future: 'static,
    <U as ServiceFactory<(Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>, Framed<T, Codec>)>>::Error: Display,
    <U as ServiceFactory<(Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>, Framed<T, Codec>)>>::Error: Into<Response<BoxBody>>,
    <U as ServiceFactory<(Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>, Framed<T, Codec>)>>::InitError: Debug, 
```

[src 链接](https://cseweb.ucsd.edu/classes/sp22/cse223B-a/tribbler/src/actix_http/h1/service.rs.html#269-333）的这段内容与 github [此段代码](https://github.com/actix/actix-web/blob/b0fe67978485b43ea11ff817dc5afaac4a12559f/actix-http/src/h1/service.rs#L446) 相同：

```rust
impl<T, S, B, X, U> ServiceFactory<(T, Option<net::SocketAddr>)> for H1Service<T, S, B, X, U>
where
    T: AsyncRead + AsyncWrite + Unpin + 'static,

    S: ServiceFactory<Request, Config = ()>,
    S::Future: 'static,
    S::Error: Into<Response<BoxBody>>,
    S::Response: Into<Response<B>>,
    S::InitError: fmt::Debug,

    B: MessageBody,

    X: ServiceFactory<Request, Config = (), Response = Request>,
    X::Future: 'static,
    X::Error: Into<Response<BoxBody>>,
    X::InitError: fmt::Debug,

    U: ServiceFactory<(Request, Framed<T, Codec>), Config = (), Response = ()>,
    U::Future: 'static,
    U::Error: fmt::Display + Into<Response<BoxBody>>,
    U::InitError: fmt::Debug,
```

相较而言，下面这段的可读性好很多。尤其是 S 和 U 的类型展开之后，满屏重复代码的视觉效果很冲击。

以where从句第二项作对比：

```rust
S: ServiceFactory<Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>, Config = ()>,
<=>
S: ServiceFactory<Request, Config = ()>,
```

先找 Request 后面多出来的这段 `<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>`，在 [Request](https://cseweb.ucsd.edu/classes/sp22/cse223B-a/tribbler/actix_http/struct.Request.html) 里，找到个 [trait implementation](https://cseweb.ucsd.edu/classes/sp22/cse223B-a/tribbler/actix_http/struct.Request.html#impl-ServiceFactory%3CRequest%3CPin%3CBox%3Cdyn%20Stream%3CItem%20=%20Result%3CBytes%2C%20PayloadError%3E%3E%20+%20%27static%2C%20Global%3E%3E%3E%3E)：

```rust
impl ServiceFactory<Request<Pin<Box<dyn Stream<Item = Result<Bytes, PayloadError>> + 'static, Global>>>> for ExpectHandler
```

猜测，是文档将类型描述展开了。现在介意的是，这样展开后是否符合Rust语法。