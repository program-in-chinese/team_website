---
layout: post
comments: true
title:  "JavaScript实现ZLOGO: 界面改进与速度可调"
description: 基于JavaScript和Antlr4实现简单的中文LOGO语法, 界面改进, 可调速度. Implement simple LOGO language using JavaScript and Antlr4.
date:   2019-01-20 00:00:00 -0700
categories: 语言设计
---

续前文[JavaScript实现ZLOGO: 前进方向和速度](https://zhuanlan.zhihu.com/p/52434775)

在线演示地址: http://codeinchinese.com/%E5%9C%883/%E5%9C%883.html

源码仍在: [program-in-chinese/quan3](https://github.com/program-in-chinese/quan3)

![2019-01-20-logo圆包络]({{ "/assets/2019-01-20-logo圆包络.gif" | absolute_url }})

主要功能改进是在界面可以选择速度. 其他界面布局改进有:

- 在ipad横屏下显示正常(1024x768)
- (前文问题1) 改正了有些浏览器"蚂蚁"对不准的问题(在火狐, Opera, Safari下测试)
- 加大字体和按钮


### 待解决问题

[蚂蚁走位有偏移, 速度越快越明显 · Issue #9 · program-in-chinese/quan3](https://github.com/program-in-chinese/quan3/issues/9) 上面视频可以看到最后蚂蚁没有回到原点. 经测试貌似与速度有关, 尚未确定原因.

[避免O(n^2)的绘制过程 · Issue #8 · program-in-chinese/quan3](https://github.com/program-in-chinese/quan3/issues/8) 上面视频可见越到后面行进越慢, 应该与每帧绘制线段数逐渐增加有关. 上面例子最后一帧绘制的总线段数有7200段.

[避免在绘制每帧时重置背景色 · Issue #10 · program-in-chinese/quan3](https://github.com/program-in-chinese/quan3/issues/10) 在ipad下测试感觉蚂蚁行进有卡顿感, 不确定是否由于当前每帧都重置背景色. 应该只需在重新运行时再清理整个画板.

[继续改进] [添加方向指示 · Issue #3 · program-in-chinese/quan3](https://github.com/program-in-chinese/quan3/issues/3#issuecomment-455919605) 还需:

- 更雅致点的图标
- 在初始状态(白板)时显示图标默认状态(方向/位置)
- 在界面提供选项, 以开/关图标显示


[部分p5js API继续汉化, 如line, background · Issue #11 · program-in-chinese/quan3](https://github.com/program-in-chinese/quan3/issues/11)