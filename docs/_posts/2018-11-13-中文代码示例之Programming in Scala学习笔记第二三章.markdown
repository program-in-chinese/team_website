---
layout: post
comments: true
title:  中文代码示例之Programming in Scala学习笔记第二三章
description: 对Programming in Scala书本中的二三章示例代码进行命名中文化. Translate identifiers in sample programs to Chinese.
date:   2018-11-13 00:00:00 -0700
categories: 命名 Scala
---

![2018-11-13-scala二三章]({{ "/assets/2018-11-13-scala二三章.png" | absolute_url }})

***由于拷贝后文档格式有变, 仅摘几段如下. 完整而且代码带语法高亮的源版在: [program-in-chinese/Programming_in_Scala_study_notes_zh](https://github.com/program-in-chinese/Programming_in_Scala_study_notes_zh)***


前言: 本书已有中文版, 此笔记并不是对原教程的翻译, 而是围绕示例进行选摘, 并顺便将所有示例改成中文命名(不拘泥于原本命名用词, 而是融入中文特色).

#### 本文代码在Scala 2.12.4, Java 1.8.0_45下测试通过
### 第一章 普适的语言

1.1
```scala
var 首都 = Map("中国" -> "北京", "俄罗斯" -> "莫斯科")
首都 += ("德国" -> "柏林")
println(首都("俄罗斯"))
```
(待续. 先从第二章开始)
### 第二章略
### 第三章

[略大部]

*第十步 使用集合(Set)和映射(Map)*

(这里开始仅包含例程与极简说明, 如有空再补详细说明) 不可变集合
```scala
var 客机厂商 = Set("空客", "波音")
客机厂商 += "商飞"
println(客机厂商.contains("大疆"))
```
可变集合
```scala
import scala.collection.mutable

val 电影 = mutable.Set("舌尖一", "舌尖二")
电影 += "舌尖三"
println(电影)
```
如需指定使用HashSet, 就`import scala.collection.immutable.HashSet`

可变映射
```scala
import scala.collection.mutable

val 寻宝指南 = mutable.Map[Int, String]()
寻宝指南 += (1 -> "上荒岛")
寻宝指南 += (2 -> "在地上找个那啥")
寻宝指南 += (3 -> "开挖")
println(寻宝指南(2))
```
不变映射
```scala
val 中文数字 = Map(1 -> "一", 2 -> "二", 3 -> "三", 4 -> "四", 5 -> "五")
println(中文数字(4))
```
*第十二步 从文件读行*

[部分略]

如想输出更漂亮, 下面是最终版:
```scala
import scala.io.Source

def 字符数宽度(文本: String) = 文本.length.toString.length

if (args.length > 0) {
  val 行 = Source.fromFile(args(0)).getLines().toList
  val 最长行 = 行.reduceLeft(
    (行1, 行2) => if (行1.length > 行2.length) 行1 else 行2
  )
  val 最大宽度 = 字符数宽度(最长行)
  for (某行 <- 行) {
    val 空格数 = 最大宽度 - 字符数宽度(某行)
    val 缩进 = " " * 空格数
    println(缩进 + 某行.length + " | " + 某行)
  }
}
else
  Console.err.println("请输入文件名")
```
运行`scala 统计字符2.scala 统计字符2.scala`输出如下:
```
22 | import scala.io.Source
 0 |
49 | def 字符数宽度(文本: String) = 文本.length.toString.length
 0 |
22 | if (args.length > 0) {
52 |   val 行 = Source.fromFile(args(0)).getLines().toList
25 |   val 最长行 = 行.reduceLeft(
53 |     (行1, 行2) => if (行1.length > 行2.length) 行1 else 行2
 3 |   )
23 |   val 最大宽度 = 字符数宽度(最长行)
17 |   for (某行 <- 行) {
30 |     val 空格数 = 最大宽度 - 字符数宽度(某行)
22 |     val 缩进 = " " * 空格数
40 |     println(缩进 + 某行.length + " | " + 某行)
 3 |   }
 1 | }
 4 | else
31 |   Console.err.println("请输入文件名")
```
(第三章完)


### 发现的中文相关问题

命令行交互环境中, 错误信息对中文字符的定位不准. 这很干扰排错. 比较如下两个同样出错信息:
```
scala> println(["2"])
<console>:1: error: illegal start of simple expression
       println(["2"])
               ^

scala> 打印参数(["2"])
<console>:1: error: illegal start of simple expression
       打印参数(["2"])
            ^
```