---
layout: post
comments: true
title:  疑似bug_中文代码示例之Programming in Scala笔记第九十章
description: 对Programming in Scala书本中的九十章示例代码进行命名中文化, 发现一个问题. Translate identifiers in sample programs to Chinese, and found an issue.
date:   2018-12-09 00:00:00 -0700
categories: 命名 Scala
---

![2018-12-09-scala命名问题]({{ "/assets/2018-12-09-scala命名问题.png" | absolute_url }})

续前文: [中文代码示例之Programming in Scala笔记第七八章](https://zhuanlan.zhihu.com/p/50979126)

源文档库: [program-in-chinese/Programming_in_Scala_study_notes_zh](https://github.com/program-in-chinese/Programming_in_Scala_study_notes_zh)
### 疑似中文命名bug

[program-in-chinese/Programming_in_Scala_study_notes_zh](https://github.com/program-in-chinese/Programming_in_Scala_study_notes_zh#%E5%91%BD%E5%90%8D%E9%97%AE%E9%A2%98). 复现如下. 需要深究:
```
scala> for ((行1, 行2) <- Array(1,2) zip Array("a", "b"))
     | yield 行1 + 行2
<console>:12: error: not found: value 行1
       for ((行1, 行2) <- Array(1,2) zip Array("a", "b"))
             ^
<console>:12: error: not found: value 行2
       for ((行1, 行2) <- Array(1,2) zip Array("a", "b"))
                 ^
<console>:13: error: not found: value 行1
       yield 行1 + 行2
             ^
<console>:13: error: not found: value 行2
       yield 行1 + 行2
                  ^

scala> for ((l1, l2) <- Array(1,2) zip Array("a", "b"))
     | yield l1 + l2
res1: Array[String] = Array(1a, 2b)
```
### 第九章 控制抽象
```scala
  def 文件匹配(查询: String, 匹配器: (String, String) => Boolean) =
    for (文件 <- 此处文件; if 匹配器(文件.getName, 查询))
      yield 文件
  
  def 文件名结尾(查询: String) =
    文件匹配(查询, _.endsWith(_))
  
  def 文件名包括(查询: String) =
    文件匹配(查询, _.contains(_))
  
  def 文件名正则匹配(查询: String) =
    文件匹配(查询, _.matches(_))
```
第十章 组合和继承
```scala
import 元素类.元素

object 螺旋 {
  val 空格 = 元素(" ")
  val 角 = 元素("+")

  def 螺旋(边数: Int, 方向: Int): 元素类 = {
    if (边数 == 1)
      元素("+")
    else {
      val 旋 = 螺旋(边数 - 1, (方向 + 3) % 4)
      def 竖条 = 元素('|', 1, 旋.高度)
      def 横条 = 元素('-', 旋.宽度, 1)
      if (方向 == 0)
        (角 在旁 横条) 在上 (旋 在旁 空格)
      else if (方向 == 1)
        (旋 在上 空格) 在旁 (角 在上 竖条)
      else if (方向 == 2)
        (空格 在旁 旋) 在上 (横条 在旁 角)
      else
        (竖条 在上 角) 在旁 (空格 在上 旋)
    }
  }

  def main(参数: Array[String]) = {
    val 边数 = 参数(0).toInt
    println(螺旋(边数, 0))
  }
}
```
运行效果:
```
$ scala 螺旋 17
+----------------
|                
| +------------+ 
| |            | 
| | +--------+ | 
| | |        | | 
| | | +----+ | | 
| | | |    | | | 
| | | | ++ | | | 
| | | |  | | | | 
| | | +--+ | | | 
| | |      | | | 
| | +------+ | | 
| |          | | 
| +----------+ | 
|              | 
+--------------+ 
```
敬请期待后续!