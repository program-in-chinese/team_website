---
layout: post
comments: true
title:  浅尝The Little Prover一书, 重逢Chez Scheme
description: The Little Prover一书第一章的读后感, 示例代码用中文命名. 另测试Chez Scheme对中文命名的支持. Notes after reading the first chapter of the book 'The Little Prover', with sample programs using Chinese naming. Together with some notes of revisiting Chez Scheme.
date:   2018-01-04 14:00:00 -0700
categories: 小结
---

书开篇之前说, 本书的目标的一个例子: 证明`(reverse (reverse x))`对于任何列表x, 结果总是x.

(安装Chez Scheme的200字请看最后)

书刚开始, 就用到一个scheme中没有的函数atom和equal, 用中文定义应是如下:

注: 多谢 [@张砸锅](https://www.zhihu.com/people/4ec4083d65b69a5e5c4694c1f852e0a3) 指正, 下面的"为空?"不正确, 名称应该是"不是非空列表?". 原文用atom一词, 就不直译了. 鉴于似乎不影响本文后面的例子, 恕我不一一纠正了.
```scheme
(define 为空?
  (lambda (列表)
    (if (atom? 列表)
        'nil
        't)))

(define 相等?
  (lambda (甲 乙)
    (if (equal? 甲 乙)
      't
      'nil)))
```
书的第一个例子是在甲乙的值未知时, 对下面表达式求值
```scheme
(相等? '那个啥 (为空? (cons 甲 乙))) 
```
(cons 甲 乙) 不论甲乙值为何, 都不会为空, 因此(为空? (cons 甲 乙))返回'nil. 而(相等? '那个啥 'nil)显然返回'nil, 因此这个表达式的值必定是'nil.

这里"(为空? (cons 甲 乙))肯定返回'nil"被认为是Axiom(公理). 由这个公理推导出表达式的值.

第八页列出了在Scheme"世界"里与cons相关的几个公理:
```scheme
(定义定律 cons不为空 (甲 乙)
  (相等? (为空? (cons 甲 乙)) 'nil)
(定义定律 car/cons (甲 乙)
  (相等? (car (cons 甲 乙)) 甲)
(定义定律 cdr/cons (甲 乙)
  (相等? (cdr (cons 甲 乙)) 乙)
```
之后就是equal相关的(交换律, 自身相等). 接下去是一系列基于这几个定律的推导演绎. 而推导演绎法则(?不知说法是否恰当)本身被定义为如下:

> 对定律 (定义定律 名称 (x1, x2, ...xn) 定律内容), "定律内容"中的x1~xn可以被任何表达式e1~en替换, 得出的新定律只要符合格式(相等? p q)或者(相等? q p), q就可以被置换为p.

举例如下:

之前的定律car/cons
```scheme
(定义定律 car/cons (甲 乙)
  (相等? (car (cons 甲 乙)) 甲)
```
可以作用于下面表达式:
```scheme
(为空? (car (cons (car a) (cdr b))))
```
只要把定律内容"(相等? (car (cons 甲 乙)) 甲)", 把"甲"替换为(car a), "乙"替换为(cdr b)之后就得出:
```scheme
(相等? (car (cons (car a) (cdr b))) (car a))
```
根据推导法, (car (cons (car a) (cdr b))) 等同于 (car a), 因此表达式等同于
```scheme
(为空? (car a))
```
看起来有些绕, 因此作者提供了辅助推导工具[the-little-prover/j-bob](https://github.com/the-little-prover/j-bob). 第一章完(共十章).

感觉上是把定理以及推导的方法用代码表达, 进而赋予了程序证明定理的能力.

-----------------------

为了运行书中的代码, 决定装Chez. 上次用好像还是在学校机房, 因为当时只有Petite Scheme是免费可以装在个人机器, 而Chez还是商业软件. 几年过去, Dybvig教授离职去了思科, 而Chez Scheme随后开源了([cisco/ChezScheme](https://github.com/cisco/ChezScheme)). 今天尝试了下载[9.5版](https://github.com/cisco/ChezScheme/archive/v9.5.zip), 在Mac上编译生成了Petite和Chez(中间碰到了[这个问题](https://stackoverflow.com/questions/11465258/xlib-h-not-found-when-building-graphviz-on-mac-os-x-10-8-mountain-lion/12089021#12089021)).

运行后的提示即眼熟又生疏. 个人的力量毕竟有限, 不知道他一开始(1985年)就把Chez开源会不会改变今天的IT格局呢? 哪位开发者穿越回去试试改变历史吧.
```
$ a6osx/bin/scheme
Chez Scheme Version 9.5
Copyright 1984-2017 Cisco Systems, Inc.
```
当然要尝试中文标识符, 蛮好:
```scheme
> (cons '火腿 '(鸡蛋))
(火腿 鸡蛋)
> (define 阶乘
    (lambda (x)
      (if (zero? x)
          1
          (* x (阶乘 (1- x))))))
> (阶乘 3)
6
```
发现一个小问题, 在控制台下, 在输入后括号时, 匹配前括号的光标定位有错位, 猜测是由于中文字符的宽度不同导致的. 在之后使用中, 发现对上一个命令进行编辑也有显示问题. 这使得在交互环境中使用中文命名有了不小障碍(想想在上个程序基础上任何一点修改都要重新输入整个程序). 试着在源文件中编写'阶乘'函数后导入, 发现中文文件名也不支持(多谢 [@Eternal Chaos](https://www.zhihu.com/people/aa04d28a718026081beb04c51ce93692) 指出, 已有问题报告[command-line-arguments can't read umlauts with utf-8 encoding · Issue #81 · cisco/ChezScheme](https://github.com/cisco/ChezScheme/issues/81)), 不过导入成功.

看了一点书之后发现...好像装了也不能直接用, 没有那个J-Bob好像基本上跑不了什么东西.