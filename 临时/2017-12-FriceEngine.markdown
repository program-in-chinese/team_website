## FriceEngine的试用与API中文化

早先就听闻FriceEngine已有中文接口版本, 可惜没有机会尝试. 经原作者@大笨蛋千里冰封 建议, 在FriceEngine的[DSL封装](https://github.com/icela/FriceEngine-DSL)的接口基础上, 添加了对应的中文接口. 下面的代码利用了新添的中文接口, 实现了一个圆形向方块加速撞击后反弹下落的动画过程(开发环境: IntelliJ IDEA社区版, 更全的测试用例在[此](https://github.com/icela/FriceEngine-DSL/blob/master/test/%E4%B8%AD%E6%96%87%E6%8E%A5%E5%8F%A3%E6%B5%8B%E8%AF%95.kt), 是参考了[原代码中的测试用例](https://github.com/icela/FriceEngine-DSL/blob/master/test/Test.kt)编写的):

<img src="https://github.com/program-in-chinese/team_website/blob/master/%E4%B8%B4%E6%97%B6/FriceEngine_DSL_%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81.png">

### 中文接口命名

在命名接口与参数时, 遇到不少需要推敲的问题:
- 英文接口中, (x,y)在不同地方有不同含义, 比如在形状(方形/圆形)属性中, 是定位功能(左上角顶点的坐标, 都为正数). 而在`速度`等接口中, 表示的是横向和纵向的分量, 可以为负. 在中文命名后, 进行了区别: `左上角x/左上角y`和`横向速度_左负右正/纵向速度_上负下正`. 后者比较累赘, 而且也许应该在注释而不是命名中说明参数的正负意义, 但鉴于IntelliJ提供了独到的参数名提示功能, 就暂时把命名的含义最大化了.
- 

### 其他感想
- IntelliJ刚开始用, Kotlin和Gradle也是初学, 在使用和开发过程中遇到不少磕碰. 在此多谢原作者的各种协助与指点.

- 相比之前尝试的[p5js](https://zhuanlan.zhihu.com/p/29169276)的动画绘制, 感觉FriceEngine的语法更加灵活, 有不少高层接口让开发更加方便, 比如`每隔(毫秒数)`, 以及`当碰撞(某物体名)`, 在p5js中好像没有类似功能, 使用时需要根据帧数和帧率用算法自行实现. 而且类OO的设计(对形状可以取名)也是p5js不具备的.

- 个人觉得API在形式上的一致性对易用性比较重要. 作为Kotlin新手, 个人在使用时开始有些语法上的困惑, 尤其是{}和()的使用. 比如代码中同时有`加速(0, 50)`和:
```
加速 {
    横向加速度_左负右正 = 20.0
}
```

- 强烈建议改进动画性能, 过高的CPU占用会让推广受限, 尤其是手机app上.

