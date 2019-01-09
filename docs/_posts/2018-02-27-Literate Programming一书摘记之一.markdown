---
layout: post
comments: true
title:  '"Literate Programming"一书摘记之一'
description: 代码可读性相关部分.
date:   2018-02-27 00:00:00 -0700
categories: 笔记
---

书到后才发现是Knuth的论文集, 第一篇就在网上: Computer programming as an art (1974). 其中"Taste and Style"(品味和风格)一节说到"好"程序的一部分要素:

> ...when it works correctly. Secondly, if it is easy to change, when the time for adaptation arises. Both of these goals are achieved when the program is easily readable and understandable to a person who knows the appropriate language.

很高兴看到他早就指出可读性的重要性.

不远处就是那句经典的:

> Premature optimization is the root of all evil (or at least most of it) in programming.

时间有限, 就跳过了那些网上已有的论文. 如:

structured programming with goto statements (1974)

"a structured program to generate all topological sorting arrangements"

直接跳到"Literate Programming(1984)"一章. 先看最后一页(总共30+). 之后写到哪里算哪里吧.

这两句很有趣:

> My hope is that the ability to make explanations more natural will cause more programmers to discover the joys of literate programming, because I believe it's quite a pleasure to combine verbal and mathematical skills; but perhaps I'm hoping for too much. ...
Perhaps we will even one day find Pulitzer prizes awarded to computer programs.

遥远地握握手. 想让程序像文章一样是个好坑, 估计个人是爬不出来了.

倒数第二页提到:

> I don't believe every computer language should attempt to offer all things to all people.

WEB系统结合了TEX和Pascal, 是为当时的计算机科学家设计. 论文主体是介绍一个完整的例子(20页左右). 粗看一下WEB好像是一个类自然语言语法的语言, 编译可以生成TEX文档和Pascal源码.

待续.