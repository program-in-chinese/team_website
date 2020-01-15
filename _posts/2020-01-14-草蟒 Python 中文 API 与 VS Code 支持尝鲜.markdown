---
layout: post
comments: true
title:  草蟒 Python 中文 API 与 VS Code 支持尝鲜
description: 
date:   2020-01-14 00:00:00 -0700
categories: 命名 API
---

祝贺新中文 API 发布到 Python 库平台 pypi。它是一个Python3 汉化版——[草蟒](https://www.grasspy.cn/)（作者为 @buddy hello）的一部分，其中的第三方库对 Python3 英文版也适用。下面节选自[ pypi 简介](https://pypi.org/project/grasspy-modules/)：

> 英文版 python 用户能够充分体验中文编程的 模块有<海龟 (turtle)>、<随机数 (random)>和<图快 (tkinter)>。

下面就在英文 Python 3.8.1 下对这个第三方库试用一二。

### 海龟（turtle）

参考[官网入门文档](https://www.grasspy.cn/a/zhinan/2019/1229/771.html)中的画五角星演示，只将官网例程的中文关键字改为了英文的：
```python
from 海龟 import *

颜色('黄色', '红色')
开始填充()

for i in range(5):
    前进(200)
    右转(144)

结束填充()
完成()
```

使用中英 API 的代码对比如下：

![2020-01-14_grasspy海龟]({{ "/assets/2020-01-14_grasspy海龟.png" | absolute_url }})

代码可读性看官自断，不用多说。

视觉效果上，如[在代码中进行中文命名(类/变量/方法等)的优势](https://zhuanlan.zhihu.com/p/40098652)中所提，中文的更加齐整。

### 图快（tkinter）

参考[官网入门文档](https://www.grasspy.cn/a/keji/2020/0101/777.html)中的示例 16的英文关键字版：
```python
import 图快

窗口 = 图快.主窗口类()
窗口.标题('图形应用程序')
窗口.尺寸('500x300+600+300')

def 登录():
    登录窗口 = 图快.顶级窗口类(窗口)
    登录窗口.标题('请登录...')
    登录窗口.尺寸('200x200+750+350')

登录按钮 = 图快.按钮类(文本='登录', 命令=登录)
登录按钮.位置布局(相对x=0.5, 相对y=0.5)

窗口.主循环()
```

中英 API 代码对比：

![2020-01-14_grasspy图快]({{ "/assets/2020-01-14_grasspy图快.png" | absolute_url }})

API 的命名有些讲究。“类”后缀的思路与[前文](https://zhuanlan.zhihu.com/p/93924862)的“方法一”一致。参数命名也完成了汉化。

很值得一提的是，某些命名不拘泥于直译，而是从功能出发进行改进，比如`Toplevel`的[功能](https://www.tutorialspoint.com/python/tk_toplevel.htm):

> Toplevel widgets work as windows that are directly managed by the window manager. They do not necessarily have a parent widget on top of them.

既然功能就是窗口，命名为`顶级窗口类`更加一目了然。类似这样将功能本质和中文特性结合的命名风格探索对于中文 API 的发展会很有助益（另参考[前文](https://zhuanlan.zhihu.com/p/30905033)末尾）。

### VS Code 支持

使用微软的 Python 插件，在 Windows 下测试。可以看到中文文档：

![2020-01-14_grasspy模块]({{ "/assets/2020-01-14_grasspy模块.png" | absolute_url }})

输入中文 API 的第一个字有自动补全弹窗，包括对应说明：

![2020-01-14_grasspy补全]({{ "/assets/2020-01-14_grasspy补全.png" | absolute_url }})

### 草蟒

这些第三方库之外，草蟒还实现了 Python 关键字和几个核心库的汉化，并开发了允许中文标点符号等等功能的 VSC 插件，有兴趣的[不妨一试](https://www.grasspy.cn/a/zhinan/2019/1229/771.html)。

### 始于足下

这个中文 API 是[周蟒](https://github.com/gasolin/zhpy/)之后个人看到的，发布在英文编程语言的第三方库平台的最大规模的中文库项目。
对于內建中文文档、中文API命名、打包发布等等技术细节都进行了较全面验证。期待库的文档、测试等等早日跟上。

***拭目以待！***