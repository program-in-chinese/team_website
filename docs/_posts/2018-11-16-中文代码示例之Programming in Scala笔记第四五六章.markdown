---
layout: post
comments: true
title:  中文代码示例之Programming in Scala笔记第四五六章
description: 对Programming in Scala书本中的四五六章示例代码进行命名中文化. Translate identifiers in sample programs to Chinese.
date:   2018-11-16 00:00:00 -0700
categories: 命名 Scala
---

续前文: [中文代码示例之Programming in Scala学习笔记第二三章](https://zhuanlan.zhihu.com/p/49707717). 同样仅节选有意思的例程部分作演示之用. 源文档仍在: [program-in-chinese/Programming_in_Scala_study_notes_zh](https://github.com/program-in-chinese/Programming_in_Scala_study_notes_zh)
### 第六章 功能对象

此章的例子与之前的[初步尝试将传统学科的内容程序/数据化](https://zhuanlan.zhihu.com/p/47807062)有些共鸣, 以后的数学知识部分可以参考此实现.
```scala
class 有理数(分子: Int, 分母: Int) {
  require(分母 != 0)
  private val 公约数 = 最大公约数(分子.abs, 分母.abs)

  val 分子值: Int = 分子 / 公约数
  val 分母值: Int = 分母 / 公约数

  def this(数: Int) = this(数, 1)

  def + (数: 有理数): 有理数 =
    new 有理数(
      分子值 * 数.分母值 + 数.分子值 * 分母值,
      分母值 * 数.分母值
    )

  def + (数: Int): 有理数 =
    new 有理数(分子值 + 数 * 分母值, 分母值)

  def - (数: 有理数): 有理数 =
    new 有理数(
      分子值 * 数.分母值 - 数.分子值 * 分母值,
      分母值 * 数.分母值
    )

  def - (数: Int): 有理数 =
    new 有理数(分子值 - 数 * 分母值, 分母值)

  def * (数: 有理数): 有理数 =
    new 有理数(分子值 * 数.分子值, 分母值 * 数.分母值)

  def * (数: Int): 有理数 =
    new 有理数(分子值 * 数, 分母值)

  def / (数: 有理数): 有理数 =
    new 有理数(分子值 * 数.分母值, 分母值 * 数.分子值)

  def / (数: Int): 有理数 =
    new 有理数(分子值, 分母值 * 数)

  override def toString = 分子值 + "/" + 分母值
  
  private def 最大公约数(甲: Int, 乙: Int): Int =
    if (乙 == 0) 甲 else 最大公约数(乙, 甲 % 乙)
}
```
### 第四章 类和对象
```scala
// 在文件"校验累加器.scala"中
import scala.collection.mutable

object 校验累加器 {
  private val 缓存 = mutable.Map.empty[String, Int]

  def 计算(文本: String): Int =
    if (缓存.contains(文本))
      缓存(文本)
    else {
      val 累加器 = new 校验累加器
      for (字符 <- 文本)
        累加器.加(字符.toByte)
      val 校验码 = 累加器.校验()
      缓存 += (文本 -> 校验码)
      校验码
    }
}
```