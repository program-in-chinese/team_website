---
layout: post
comments: true
title:  中文代码示例之Programming in Scala笔记第七八章
description: 对Programming in Scala书本中的七八章示例代码进行命名中文化. Translate identifiers in sample programs to Chinese.
date:   2018-11-27 00:00:00 -0700
categories: 命名 Scala
---

![2018-11-27-scala七八章]({{ "/assets/2018-11-27-scala七八章.png" | absolute_url }})

续前文: 
- [中文代码示例之Programming in Scala学习笔记第二三章](https://zhuanlan.zhihu.com/p/49707717)
- [中文代码示例之Programming in Scala笔记第四五六章](https://zhuanlan.zhihu.com/p/50093833). 

同样仅节选有意思的例程部分作演示之用. 源文档仍在: [program-in-chinese/Programming_in_Scala_study_notes_zh](https://github.com/program-in-chinese/Programming_in_Scala_study_notes_zh)
### 第七章 内置控制结构

7.8中改为函数式风格的乘法表:
```scala
def 创建行序列(行: Int) =
  for (列 <- 1 to 10) yield {
    val 乘积 = (行 * 列).toString
    val 缩进 = " " * (4 - 乘积.length)
    缩进 + 乘积
  }

def 创建行(行: Int) = 创建行序列(行).mkString

def 乘法表() = {
  val 表序列 =
    for (行 <- 1 to 10)
    yield 创建行(行)

  表序列.mkString("\n")
}
```
### 第八章 函数和闭包

8.7 闭包

在运行时, 闭包牵涉的变量值可能改变, 关键在于该闭包创建的时刻变量值如何:
```scala
scala> def 创建累加器(增量: Int) = (数: Int) => 数 + 增量
创建累加器: (增量: Int)Int => Int

scala> val 累加器1 = 创建累加器(1)
累加器1: Int => Int = $$Lambda$1168/1847678962@36f59005

scala> val 累加器9999 = 创建累加器(9999)
累加器9999: Int => Int = $$Lambda$1168/1847678962@4a83d668

scala> 累加器1(10)
res25: Int = 11

scala> 累加器9999(10)
res26: Int = 10009
```
感觉书中例程还是偏IT, 本可以更接近日常, 比如这个:
```scala
val 首参数 = if (参数.length > 0) 参数[0] else ""

val 伙伴 =
  首参数 match {
    case "甜酱" => println("辣酱")
    case "羊肉" => println("泡馍")
    case "皮蛋" => println("豆腐")
    case _ => println("啥?")
  }
println(伙伴)
```