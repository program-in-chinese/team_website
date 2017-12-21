## FriceEngine的试用与API中文化

由于已有基于FriceEngine的[DSL封装](https://github.com/icela/FriceEngine-DSL), 经原作者@大笨蛋千里冰封 建议, 在DSL的接口基础上, 添加了对应的中文接口. 下面的代码实现了一个圆形向方块加速撞击后反弹下落的动画过程(开发环境: IntelliJ IDEA社区版, 更全的测试用例在[此](https://github.com/icela/FriceEngine-DSL/blob/master/test/%E4%B8%AD%E6%96%87%E6%8E%A5%E5%8F%A3%E6%B5%8B%E8%AF%95.kt)):

<img src="https://github.com/program-in-chinese/team_website/blob/master/%E4%B8%B4%E6%97%B6/FriceEngine_DSL_%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81.png">

IntelliJ刚开始用, 很多功能不熟, Gradle也是初学, 开发过程中遇到不少磕碰. 在此多谢原作者的各种协助与指点.
强烈建议改进动画性能, 过高的CPU占用会让推广受限, 尤其是手机app上.

