---
layout: post
comments: true
title:  AppleScript类自然语言与非英语语法设计
description: 对AppleScript语言中的类自然语言设计, 和日语, 法语的语法设计进行回顾和讨论. Review Applescript, which has a grammar close to natural language, and the support for Japanese and French grammars.
date:   2018-02-04 00:00:00 -0700
categories: 语言设计
---

最早知晓是[之前C#中文版的github讨论](https://github.com/dotnet/csharplang/issues/993#issuecomment-336165002)里提到了AppleScript有多语言版. 昨天想起, 觉得它毕竟是为数不多(仅有的?)大公司开发的非英语语法的编程语言, 不禁好奇它的前世今生. 于是作了一点调研.

网上相关资料不多, 最早的一本AppleScript专著"AppleScript in a Nutshell"也是2001年出版, 已经到了Mac 9. [AppleScript Not Necessarily in English](https://www.macscripter.net/viewtopic.php?id=24589) 提到早先支持日语,法语, 还讨论过"a C dialect", 不知指哪个语言, 但在Mac 8.5版就放弃了(1998年左右)

接着有幸找到了[2006年的论文"AppleScript"](http://www.cs.utexas.edu/~wcook/Drafts/2006/ashopl.pdf), 更多介绍了多语言支持以及相关问题. 这篇论文其他内容也很有价值, 包括这个项目的起源, 相关项目, 以及这一语言系统从需求分析到实现的各阶段细节. 本文只关注非英语语法部分, 对项目本身有兴趣的不妨自行细阅.

下图是不同"语种"(英语, 日语, 法语, "专业")的示例代码:

![2018_02_04_AppleScript语法示例]({{ "/assets/2018_02_04_AppleScript语法示例.png" | absolute_url }})

文中总结的贴近自然语言语法的语言设计的问题:

> The experiment in designing a language that resembled natural languages (English and Japanese) was not successful. It was assume that scripts should be presented in “natural language” so that average people could read and write them. This lead to the invention of multi-token keywords and the ability to disambiguate tokens without spaces for Japanese Kanji. In the end the syntactic variations and flexibility did more to confuse programmers than to help them out. The main problem is that AppleScript only appears to be a natural language. In fact is an artificial language, like any other programming language. Recording was successful, but even small changes to the script may introduce subtle syntactic errors which baffle users. **It is easy to read AppleScript, but quite hard to write it.**

> When writing programs or scripts, users prefer a more conventional programming language structure. Later versions of AppleScript dropped support for dialects. In hindsight, we believe that AppleScript should have adopted the Professional Dialect that was developed but never shipped.

> Finally, readability was no substitute for an effect security mechanism. Most people just run scripts — they don’t read or write them.

大致是说, 类自然语言语法(包括英语和日语, 不知为何没提法语)的尝试失败了. 为了实现接近自然语言的语法, 引入了多token的关键词(猜测是类似于"在...中"这样的用法), 以及**日语的无空格语法**. 问题是, 这样"貌似"自然语言而实质仍然语法严格的后果之一是, 用户误认为小的改动, 其实会导致词法解析的大变化. 也就是**"易读而难写"**. 另一个结论是, "Professional Dialect", 即接近Java的语法被认为是最应该被保留的, 因为它最接近传统编程习惯.

最后一段的意思是, 即使代码可读性好, 也不能取代一套有效的安全机制. 因为大多数人在运行脚本之前, 并不会先读一遍, 确认它是否安全. 个人认为这个结论对语言设计的借鉴价值有限, 因为安全机制和可读性应该没有直接矛盾.

关于文中提到语法近自然语言导致的问题, 个人认为与目标用户群有关. 文中提到"The language was primarily aimed at casual programmers."以及"make it accessible to non-programmers", 可见它的设计初衷和推广目标都是非专业程序员, 而他们是最容易将自然语言和程序语言混淆的. 这个问题同样可以适用于今天, 虽然技术上程序语言语法可以引入更多自然语言元素. 这也许是多数最新的通用型英语编程语言(求反例)仍然与自然语言保持相当距离的一个原因.

话虽如此, 现今的人机交互已经越来越普及, 即使是一般用户, 对手机喊命令的时候也会清楚是对一个只懂得简单语法的机器说话. 随着大众适应的过程, 上面这个混淆的问题也许会不那么严重. 个人猜想, 编程语言的趋势还是逐渐向靠近自然语言的方向发展, 尤其是适用于大众编程的语言.

再回到开头的那个讨论, 提到AppleScript时将这一功能的失败归因于关键词/语法支持多语言导致脚本内容混乱:

> But it found limited adoption and where it was adopted scripts became a
mess of mixed languages and Apple eventually dropped support.

回头看是需要考证的, 因为看起来最大的问题在于当时类似自然语言的语法, 即使只使用单纯的英语语法.