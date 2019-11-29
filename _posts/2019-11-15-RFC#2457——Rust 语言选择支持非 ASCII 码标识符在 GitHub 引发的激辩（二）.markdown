---
layout: post
comments: true
title:  RFC#2457——Rust 语言选择支持非 ASCII 码标识符在 GitHub 引发的激辩（二）
description: 
date:   2019-11-15 00:00:00 -0700
categories: 命名 Rust
---

> 难难难，道德玄，不对知音不可谈。对了知音谈几句，不对知音枉费舌尖！ 

书接[上文](https://zhuanlan.zhihu.com/p/91710113)，至 2018 年 6 月 5 日，RFC#2457刚创建三天，已看到了不少反对声。在非英语母语的参与者中，华人开发者群体尤为突出。形成对比的是其他非英语社区的积极反馈。包括韩语命名的经验之谈，葡萄牙语、德语命名的实例代码（Java，PHP，C++等）。

之前说到 [eggrobin](https://github.com/eggrobin) 受 Rust 开发组的 @Manishearth 邀请，来谈他使用非英文标识符的经验。开篇自称未写过 Rust，是 [Principia](https://github.com/mockingbirdnest/Principia/blob/2018051512-Darboux/numerics/%D1%87%D0%B5%D0%B1%D1%8B%D1%88%D1%91%D0%B2_series.hpp#L44-L45) 的合作者。【之后至少十余日他一直参与讨论，觉得值得多了解一点，下面的方括号内容都为本人旁白】

地道法国人，2002 年开始学 VB6， 2003 年开始学 VB .NET，2004 开始 Ada95。看着头像很年轻，果然！他 2004 年进入collège，时年 11 岁，开始学英语，到 2006 年可交流。

期间读法语编程书籍（[Amazon.fr - Programmer en Ada 95 - 2e édition - John Barnes, Hughes Fauconnier - Livres，不知是否也用了法语命名](https://www.amazon.fr/Programmer-en-Ada-95-2e-%C3%A9dition/dp/271178651X)），同时**用他能写能读的语言命名标识符——法语**（字母有音调）。2006 年开始，他转为用英文标识符，因为英文关键字+标准库 API 和法语标识符混搭看着乱。接下来十年间，编程，大学读纯数学，成为软件工程师。

下面他开始回应楼上。提到虽然 Ada95 IDE 存在非 ASCII 码的 bug（把非 ASCII 字符后的 ASCII 字符自动大写，形成像TrèS_ÉLéGant），但他那时捏着鼻子忍了【真能忍】。 在同一标识符中混合英文+非英文也有，因为计算机术语在非英文社区往往仍是用英文进行交流，而业务领域相关的概念就像之前 [@kimhyunkang](https://github.com/kimhyunkang) 提到的，适合用母语命名。【关于技术 NFKC 和 NFC 的一段略去】

接下来提到一个很喜欢用 unicode 命名的编程领域：数学。【因为是本行，应该挺有发言权】因为如果用英文缩写，经常会有不一致的情况：

> several decades of academic code show that what happens in the absence of Unicode is that they write wonderful tersest possible yet inconsistent abbreviations for the letters, such as om or `w` for `ω`, not `argument_of_periapsis`, gamma for `γ` followed by gsq for `γ²`, etc. (dig up your favourite pile of astronomical FORTRAN or FORTRAN-like C for entertaining examples).

更指出在语音学者中也有类似需求：[UTF-8 support for identifier names in GCC](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=67224#c22)【GCC，你也是个拖后腿的，不过GCC 10 搞定了】

接下来引用了[huangjj27](https://github.com/huangjj27)提到的中文输入法切换导致写码效率问题，但是，看他的回应似乎并未领会切换这个问题，而是理解成了非 ASCII 码标识符的阅读难度问题，回应与之前一位类似（用英化的日文命名仍然只有日本人看得懂）。【这倒是个不同文化间英文交流有误解的实例】

【台下各位，已经写了一个钟头了，今天且看看能不能看到华人声影吧】

哦哦，说什么来着。还是来自北京的 [3442853561](https://github.com/3442853561) ，指出导出 crates 会有问题。以及，（自称无偏见的信息）在中文和日语为母语的地区，这个（非 ASCII 标识符）功能极少使用。【还替日本社区发声了居然，大期待后面有日本开发者现身】

[whitequark](https://github.com/whitequark) 提到，OCaml 也在考虑从 ISO-8859-1 转到 UTF-8。

[mark-i-m](https://github.com/mark-i-m) 又来了，表示不乐意看到代码中出现`const π`，用起来痛苦、也并不特别容易读、也不能让代码的受众更广【有点耳熟的怨念呢】

有趣的是，他在三号打的第一枪，下面有 50 👍9踩；而今天的这楼，三赞三踩五困惑。看来喷的实在是捧不起来。

果然立马被数学小子[eggrobin](https://github.com/eggrobin)怼了，顺带更多NFKC相关内容【也许之后要多了解一下】

[clarfon](https://github.com/clarfon) 同意数学公式用非 ASCII 的数学字符能更可读。但建议除非目标用户是非英语社区，否则库的 API 用英文。【听起来有点多余，本身是否使用非 ASCII 码标识符就应该是作者自愿。刻意强调 API 部分的确反映了API 的特殊性】

由于 PR 的 review 和评论排列顺序，跳播一个 7 日的来自 JelteF 的PR review。荷兰人，指出小时候英语不流利时用母语命名标识符更加容易，**不用同时学编程和英语**。他自己就是实例。紧接着 PR 的创建者 pyfisch 也应声附和表示有类似经历。

下面 10 号来自坐标日本东京的 [CAFxX](https://github.com/CAFxX) （意大利人）对这两种老生常谈的谬论简直一针见血：

> The underlying argument is that one needs to write in English so other people can read it. ”要写英文其他人才能懂“

> 他的回应： Then the underlying argument is proved false by the existence and size of huge Chinese communities where English is definitely not the primary way of expressing yourself, nor it is required to look up information.
    “在庞大的中文社区，英文绝不是首选的表达和问讯途径”

> And even if you write code just for yourself you should write in English to learn it.
”即使只是写代码给自己，也该用英文，正好学习英语“

> 他的回应：I think this corollary is preposterous because it boils down to: "since somebody arbitrarily decided for convenience that everybody else should write code in English, you have to learn English even if you are the only person you will ever read the code you write". To see how tone deaf this argument is, replace "code" with any of "letter", "notes", "book" or "song" and then tell me if it makes sense...
    “这个论调简直荒谬。就像是说‘既然有某人裁断，为方便起见，所有人都必须用英文写代码，所以你必须学英文，哪怕你是自始至终唯一一个读代码的人’。还没get到这有多扯淡的话，可以试试把上句中的‘代码’换成‘信’，‘笔记’，‘书’或者‘歌’，再告诉我是不是扯。

回到 5 日时间线，mark-i-m 附和clarfon的建议 API 用英文。【别告诉我这被最后从技术上限制了！】

又见来自韩国的kimhyunkang， 回应之前有关键盘输入的质疑，听起来就是说韩国和朝鲜的键盘都是标准键盘，可以用韩文输入法。【情况和国内类似】

终于，坐标中国的 [liigo](https://github.com/liigo) 对之前提出 GBK 的那位回应，既然 rustc 只支持 UTF-8 编码，GBK 什么的应该不是问题。【难得的来自华人的中性声音】

5 日接下来的讨论都围绕 NFKC 和 NFC，略过。

【又是一小时，休息片刻继续，好不容易看完了一天的】

6 月 6 日，ssokolow 不知道如何输入π。Rust 组的 eddyb 回应他装了希腊输入法，可以输入λ，π等等【我中文输入法威武，通吃】

lambda 表示基本支持，结尾仍希望不建议 API 使用非 ASCII 字符，并开发相关 lint【编译器的代码检查？】补充说没怎么看到过包含非 ASCII 字符的 API，除了一些数学领域和 APL。

今天就以韩国的 kimhyunkang 的19高赞楼结束吧。

> ...one of the major reasons my Korean colleagues don't use Hangul in their code is tooling problems, the biggest of them being Windows' poor support of Unicode. Windows treated Unicode as a second-class citizen for decades. ... Some compilers, IDEs, and build tools have the same problem, too. They often fail to assume there can be non-ASCII characters in source code or resource files.

> ”我的韩国同事不用韩语命名的一个主要原因是工具，为首的是Windows对 Unicode 的烂支持。Windows 视 Unicode 低一等已有数十年。... 一些编译器、IDE 和构建工具也类似，并不顾及源码和资源文件中可能出现的非 ASCII 字符。”

> I'm fine with English being the lingua franca. But I find it absurd when some people go further and assert that non-English-speaking communities have to exclusively use English in their code. And I think that is the reason why software in general has poor Unicode support, despite Unicode being almost 30 years old.

> “我能接受英文作为国际交流用语。但有些人将之泛化号称非英语母语社区必须毫无例外地在代码中使用英文，简直荒唐。那恰恰是软件普遍对 Unicode 支持不佳的原因，尽管 Unicode 已有 30 年历史。“

> If you live in an English-speaking country and contribute to an English-speaking open source community, it seems OK to assume that all programmers speak English. But it isn't. All my Korean colleagues and friends use at least 1 or 2 open source software in their work, but less than 10% of them contribute back to the software, mainly because they are not confident enough in their English skills to have discussions in an English-only community. The reason you don't see many people with problems in English is not because people are OK with that, but because your community is English-only, and the software industry has a long tradition of treating non-English languages as second-class citizens.

> ”如果你在英语母语国家，参与一个英语开源社区，似乎很可以假定所有程序员都说英语。但绝非如此。我所有的韩国同事和朋友在工作中都用至少一两个开源工具，但只有不到一成参与项目，就是因为他们不自信英文水平能够参与英语社区的讨论。你们没看到很多英语不好的人不是因为大家英语都很好，而只是因为社区本身是纯英文的，软件行业俯视非英文语言由来久矣。

> I really love Rust, and I'd be sad if Rust as a community repeats this mistake.

点赞的号中，看到了三位法国人以及来自俄罗斯、德国、意大利、中国、日本、罗马尼亚、阿根廷的开发者。【法国，果然五常】

----------
【个人还比较期待的是来自日本开发者的现身说法，以及最后对于 API 的处理。如有其他特别想了解的方面请留言，否则接下来就走哪算哪了】

2019/11/16 粗搜了一下没发现日本开发者发声，动力下降不少。也看到了更加激烈的碰撞，但是更刺激的早就亲身在国内论坛参与过。虽然觉得看国外不同文化间的交锋相比内战更能使旁观者清，但，现在有点看够了的感觉。更主要的，对Rust本身的知识匮乏也使这个系列注定向说书方向发展，而离技术研讨越来越远。也许哪天有兴致（或者再被某些言论刺激到）再开书吧。下面是写前一篇时就完成了的结尾部分。
### Rust 语言初创一锤定音

RFC#2457 提出之后，Rust 语言的设计者 Graydon Hoare 一直保持沉默，没有参与讨论与修订。在两个多月后的 8 月17 日，他终于发声，这也是这场论战中他唯一的发言：

![2019-11-14_rust初创]({{ "/assets/2019-11-14_rust初创.png" | absolute_url }})

他指出，“很多年前，我们（Rust 主创们）就早已确认，将标识符限定于用英文命名是设计上的错误，我们应该改用 unicide 标识符”。并在最后恳请：“这（RFC）本不应再次开启一场围绕标识符命名限于 ASCII 码是否正确的辩论。这绝不正确。不要再纠结于此，拜托。”

最后一句：

***“从Python到C++都默认支持非 ASCII 码标识符。这是正确的作为。”***
### 后记

围绕在英文编程语言中添加对非 ASCII 码命名标识符的支持，类似的论战绝不会是最后一次。就正反双方对立的激烈程度而言，是否前无古人已不重要，只是但愿，再无来者。

因为，这一特性本该成为所有新编程语言的标配，而不需再经过这样的争辩。