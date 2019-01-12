---
layout: post
comments: true
title:   Chrome插件实现GitHub代码离线翻译v0.0.4
description: 实现Chrome插件, 基于本地词典数据, 提供Github在线源码翻译功能. Implement a Chrome extension to translate English source code to Chinese on Github pages.
date:   2018-10-19 00:00:00 -0700
categories: 命名 翻译
---

续前文[Chrome插件实现GitHub代码翻译v0.0.3](https://zhuanlan.zhihu.com/p/47071729). 添加了对驼峰命名的支持. 由于调用[浏览器插件-离线英汉词典](https://zhuanlan.zhihu.com/p/46640311)进行词汇翻译, 因此也不依赖于任何在线翻译服务.

Chrome插件: [官网链接](https://chrome.google.com/webstore/detail/github代码翻译/inicknfojohdbgekdffgcdfiheflpnbh/)
### 支持所有编程语言

因为并不需要对源代码进行语法分析(之前Java源码英翻中进展-内测上线中使用了语法分析, 工作量大很多), 因此原则上已经支持所有编程语言的源代码. 但对一些编程语言效果更好, 见下面效果.

Java: [源码来源](https://github.com/shekhargulati/java8-the-missing-tutorial/blob/master/code/src/main/java/com/shekhargulati/java8_tutorial/ch01/BasicCalculator.java)

![2018-10-19-github源码翻译_Java_0.0.4]({{ "/assets/2018-10-19-github源码翻译_Java_0.0.4.png" | absolute_url }})

Python: [源码来源](https://github.com/swaroopch/byte-of-python/blob/master/programs/oop_subclass.py)

![2018-10-19-github源码翻译_Python_0.0.4]({{ "/assets/2018-10-19-github源码翻译_Python_0.0.4.png" | absolute_url }})

C: [源码来源](https://github.com/kion-dgl/DashGL-GTK-Astroids-Tutorial/blob/master/01_Open_a_Window/main.c) 接下去添加C的关键词翻译后, include/char就不会那么坑了.

![2018-10-19-github源码翻译_c_0.0.4]({{ "/assets/2018-10-19-github源码翻译_c_0.0.4.png" | absolute_url }})

### 阶段小结

翻译方面做下去会遇到和自然语言机器翻译类似的问题. 当然会比自然语言好一些, 因为命名往往使用的是最正式(非口语化)的词汇, 连接词的使用也较少, 而且基本没有完整语句. 即便如此, 也会存在词汇的歧义, 比如词性问题, 比如顶图例子中BasicCalculator, Basic在內建词典中有名词/形容词几种词义:
```
n. 基本原理, 要素, 基本规律
a. 基本的, 碱性的
(计算机)BASIC语言
```
现在的算法是直接用首个词义, 就是名词的"基本原理". 再比如"tell"在没有后接名词时应该是取vi释义:
```
vt. 告诉, 说, 吩咐, 断定, 知道
vi. 讲述, 泄密, 告发, 表明
```
改进就需要加入自然语言处理的方法.
### 源码

文本处理.js中驼峰命名拆分:
```javascript
function 拆分骆驼命名(命名) {
  // 参考: https://stackoverflow.com/a/7599674/1536803
  return 命名.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/);
}
```