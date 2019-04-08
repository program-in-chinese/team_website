---
layout: post
comments: true
title:  FriceEngine试用与API中文化
description: 试用游戏引擎FriceEngine, 将常用API中文化. Try out game engine FriceEngine, and create corresponding Chinese APIs.
date:   2017-12-21 00:00:00 -0700
categories: 命名 API
---

早先就听闻FriceEngine已有中文接口版本, 可惜没有机会尝试. 经原作者 [@大笨蛋千里冰封](https://www.zhihu.com/people/67ebe1bd8e4a63f17a42572e40afaac7) (Github账号 @ice1000 )建议, 在FriceEngine的[DSL封装](https://github.com/icela/FriceEngine-DSL)的接口基础上, 添加了对应的中文接口.

下面的代码利用了新添的中文接口, 实现了一个圆形向方块加速撞击后反弹下落的动画过程(开发环境: IntelliJ IDEA社区版, 更全的测试用例在此, 是参考了[原代码中的测试用例](https://github.com/icela/FriceEngine-DSL/blob/master/test/Test.kt)编写的):

注: FriceEngine仍在活跃开发中, 本文的接口很可能在新版本中修改. 使用时请参考最新的测试代码.

![2017_12_21_FriceEngine中文示例]({{ "/assets/2017_12_21_FriceEngine中文示例.png" | absolute_url }})

#### 接口中文化过程

在命名接口与参数时, 遇到不少需要推敲的问题:

- 英文接口中, (x,y)在不同地方有不同含义, 比如在形状(方形/圆形)属性中, 是定位功能(左上角顶点的坐标, 都为正数). 而在`速度`等接口中, 表示的是横向和纵向的分量, 可以为负. 在中文命名后, 进行了区别: `左上角x/左上角y`和`横向速度_左负右正/纵向速度_上负下正`. 后者比较累赘, 而且也许应该在注释而不是命名中说明参数的正负意义, 但鉴于IntelliJ提供了独到的参数名提示功能, 就暂时把命名的含义最大化了.
- 之前对其他库中文化也碰到过. 对于重载接口, 暂时还是采用了赋值对应英文接口的方式, 但其实是可以用调用中文接口实现, 比如`FObject.加速(x: Int, y: Int)`调用`FObject.加速(x: Double, y: Double)`. 这决定了中文化的"深度". 但越"深", 越涉及到实现, 维护的工作量就越大. 个人暂时倾向于尽量"浅"地进行中文化.
- 暂时是将中文接口的实现放在了对应英文接口的下面, 这样的好处是关联性一目了然, 但也让它们分散在各处, 带来一些维护的难度.
另一种方式也许是至少将简单的对等接口抽取出来, 用一个数据结构描述(类似下面), 然后在编译之前自动生成这些接口的实现, 但这个脑洞比较大.
```
whenExit(block: () -> Unit) -> 当退出时(块: () -> Unit)
ImageObject.url(s: String) -> ImageObject.远程文件(网址: String)
...
```
#### 其他感想

- IntelliJ刚开始用, Kotlin和Gradle也是初学, 在使用和开发过程中遇到不少磕碰. 在此多谢原作者的各种协助与指点. Kotlin的语言特性也让添加中文接口的实现过程不那么费劲. 比较印象深刻的是[对属性的get/set](https://github.com/icela/FriceEngine-DSL/pull/6/commits/c9e1811d1a84a94ad6ca2af0883204c68c62eb70#diff-d8e8d30255b5384868eecdd6c2d6d79a)
- 相比之前尝试的[p5js的动画绘制](https://zhuanlan.zhihu.com/p/29169276), 感觉FriceEngine的语法更加灵活, 有不少高层接口让开发更加方便, 比如`每隔(毫秒数)`, 以及`当碰撞(某物体名)`, 在p5js中好像没有类似功能, 使用时需要根据帧数和帧率用算法自行实现. 而且类OO的设计(对形状可以取名)也是p5js不具备的.
- 个人觉得API在形式上的一致性对易用性比较重要. 作为Kotlin新手, 个人在使用时开始有些语法上的困惑, 尤其是{}和()的使用. 比如代码中同时有`加速(0, 50)`和:
```
加速 {
    横向加速度_左负右正 = 20.0
} 
```
- 强烈建议改进动画性能, 过高的CPU占用会让推广受限, 尤其是手机app上.