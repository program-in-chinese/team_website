---
layout: post
comments: true
title:  RFC#2457——Rust 语言支持非 ASCII 码标识符在 GitHub 引发的激辩（一）
description: 
date:   2019-11-14 00:00:00 -0700
categories: 命名 Rust
---

> Everything from Python to C++ supports non-ASCII idents by default.
> It's the correct behaviour. —— Graydon Hoare，Rust语言设计者
> 
> 译：“从Python到C++都默认支持非 ASCII 码标识符。这是正确的作为。”

2018年10月31日，Rust 语言历史上最受争议的 RFC 之一在经历了将近5个月的争辩和修订后，终于圆满完成。

![2019-11-14_rustRFC排名]({{ "/assets/2019-11-14_rustRFC排名.png" | absolute_url }})

684条评论，75人参与。虽未亲历，但前事不忘后事之师。此文就来回顾这个 RFC 以及那些激烈碰撞的声音。

### 非 ASCII 码标识符
ASCII 码问世于20世纪六十年代。标准 ASCII 码只有 128 个，仅包含了英文字符与其他少量标点、运算等特殊符号。多数现今常用的编程语言在上世纪被设计出来时，设计者和使用者也大多数在英文母语国家，因此早期并不支持使用英文之外的语言文字来命名代码中的标识符。

时至今日，有不少国内开发者还认为，在代码中必须用英文命名变量，因此代码中会出现 redEnvelope 甚至 hongbao 这样的命名。

但实际上大多数英文编程语言早已支持使用英文之外的字符命名变量、方法、类名等等。比如 Python3 中完全可以这样写：
```python
红包金额 = 888
红包数 = 5
开销 = 红包数 * 红包金额
```
苹果公司主导的 Swift 编程语言官网的手册中，也用了中文和其他符号进行命名演示：

![2019-11-14_swift入门命名]({{ "/assets/2019-11-14_swift入门命名.png" | absolute_url }})

此文的主角，RFC#2457 就是为了让 Rust 语言也具备这一特性。

### RFC#2457
2018 年六月三日 10 点 25 分（太平洋时间）， PR 2457 被 **pyfisch** 创建，开始了这个 RFC 的审议过程。

题目很直接：“Allow non-ASCII identifiers”——“允许非 ASCII 标识符”。在它的初稿中，在“动机”部分开篇，指出了“许多开发者的英文并不流利，使用母语命名标识符使得写和读代码更轻松。”

更引用了 Python 语言于 2007 年的 PEP 3131：

> Such developers often desire to define classes and functions with names in their native languages, rather than having to come up with an (often incorrect) English translation of the concept they want to name. By using identifiers in their native language, code clarity and maintainability of the code among speakers of that language improves.

>（并不熟悉英文语言的）开发者常希望用他们的母语定义类和函数，而不是被逼着用（往往是不正确的）英文翻译来命名一个概念。通过用母语命名标识符，对同一母语的开发者来说，代码清晰度和可维护性得以改进。

RFC 的更多篇幅包含相关的技术细节，有兴趣的可以深究。本文更关注的是 684 个评论中占大多数的对该 RFC 初衷的质疑（尤其是来自于华人开发者的）以及相应回应。

### 风波起
RFC 提交审议的当日下午4 点，一位 Rust 项目参与者 **mark-i-m** 提出了首个异议，表示（非 ASCII 码）字符难打以及有时会显示乱码。并在之后用教学经历阐释：有时学生从网上拷贝的代码段中有无法显示的 unicode 字符（其中误称 Java 不支持非 ASCII 码标识符）；有位教授喜欢用希腊字符在 Julia 代码中命名，而 ta 本人输入这样的字符非常麻烦。

接着，一位标示为中国广州的学生 **shingtaklam1324** 提出，中文字符会在不支持 unicode 的某些编辑器上变为乱码。**pyfisch** 回应：编译器支持 UTF-8 编码的源代码文件，修改编辑器设置即可。

四日 10 点，一位 Rust 组织成员 **joshtriplett** 提出个人立场：希望标识符命名仅限于 ASCII。他之后发布了一系列跟帖，在七月二十六的总结中，提到他由于源码中出现非 ASCII 码的字符导致各种调试的麻烦，但未给出具体例子。他在四日的一个帖中的发言很有代表性：

> It's a tradeoff between "should people be able to write identifiers in languages that can't be represented in ASCII" versus "should people be able to read arbitrary code". Both of those are important, and I don't want to discount either, but I'd favor the latter.

> 在“人们能用英文之外的语言写标识符”和“人们能读懂任何代码”之间权衡，虽然两者都很重要，但我更偏向后者。

这种“天下皆（应）会英文”的思维很常见，似乎英文标识符就能被世界上所有人读懂。要知道，世界上有八成多的人口并不会英文。

立刻，来自 Mozilla 的开发者 **SimonSapin** 回应：

> it is up to the author of a given piece of code to make that choice. It is not our place to dictate what language people should speak or write in contexts we can’t even think of.

> 这（用母语还是英文命名）应该是代码作者的选择。我们（语言设计者）并不该裁断开发者用什么语言读写代码，尤其是在我们料想不到的场景下。

5 日，**Ixrec** 提问：“真的会有人在实用项目代码中用非 ASCII 标识符吗？”他还提到，他是占全世界会日语的 58% 的美国男士之一，但他也想不到除了日语在写注释之外的用处。

来自 Mozilla 的 **Manishearth** 回应称，代码中看到过一些欧洲语言如葡萄牙文；暂没看到中文或俄语的，但看到过注释中使用。有些日语和葡萄牙语英文化后的代码，可见的确有使用非 ASCII 码命名的需求。另外，中国有个庞大的 Rust 社区，并未与英语 Rust 社区有太多交流。他在中文 Rust 的 QQ 群众征求过相关意见，有几方面收获：

- 限于工具，代码中不用中文
- 有时在新手教程中使用
- 大多数人不用中文命名

他的结论是，至少益处是使得音调可以使用，比如 método。

接下来是来自中国广州的 **huangjj27** 指出，输入法切换会降低写代码的效率。不过也提到更多人会因此学 Rust。希望将此特性作为选项，而非标配。

又一位坐标北京的 **crlf0710** 表示，大陆主流没有使用非 ASCII 码命名。偶尔用拼音的会被认为不专业。易语言有用户，但并未进入主流。新手教程有用，但也许需要改名关键字，使文字看起来更一致。也希望特性作为用户可选项，而非标配。

又是北京的 **ZhangHanDong** 干脆来一句“绝对不要！”

坐标加州的 **KiChjang** 表示，一些中国 Rust 用户担心生态被分裂。比如某个库用的语言是用户不知如何输入的。

**Manishearth** 对此回应：早已有大量库除了命名之外的所有文档都用非英文编写，比如腾讯的 wepy，他就不会用。用了中文命名之后，也不会更糟。如果一个库流行到有英文文档的程度，很可能那时也会用英文命名了。至于如果库用了不认识的语言，那就——不用。

**至此，华人开发者，成为一个批量发声反对此特性成为标配的群体。**

下面，**Manishearth** 获得一些葡萄牙 Rust 社区反馈，表示听到不同意见。也得到了一些使用葡萄牙语的代码例子，包括 C++，Java 和 PHP。

来自韩国的 **kimhyunkang** 回应 lxrec：之前在韩国公司工作时，看到一些 C++ 和 Java 开发者用英文化的韩语命名，原因是需求文档是韩文写的，而不少术语很难翻译成英文，因为韩语没有从拉丁文或者希腊文借用的词语，而英语没有从中文借用的词。如果要翻译成英文，命名更长也更不可读。

**est31** 提供了一些使用德文命名的 Java 和 PHP 代码。

来自北京的 **3442853561**：工作中不应用（中文命名），但不支持的话会显得 Rust 不合群（很多其他编程语言都支持），也对新手不友好。建议设置为对新手默认使能，老手可关闭。

接下来是来自瑞士的 **eggrobin** 以他的用非 ASCII 码和非英文标识符的亲身经历，包括在编写编程书籍的例程中使用法语等等。

欲知后事如何，且听下回分解！

----------------------------

【写到这里，已经三个多小时，远远超出了两小时写完的预计。而上面仅仅浏览了前三天内的 20 多个评论，已经有了很多收获。决定分为一个系列进行连载，如期待后文，敬请关注本号！】
