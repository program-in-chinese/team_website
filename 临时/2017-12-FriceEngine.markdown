## FriceEngine的试用与API中文化

早先就听闻FriceEngine已有中文接口版本, 可惜没有机会尝试. 经原作者@大笨蛋千里冰封 建议, 在FriceEngine的[DSL封装](https://github.com/icela/FriceEngine-DSL)的接口基础上, 添加了对应的中文接口. 下面的代码利用了新添的中文接口, 实现了一个圆形向方块加速撞击后反弹下落的动画过程(开发环境: IntelliJ IDEA社区版, 更全的测试用例在[此](https://github.com/icela/FriceEngine-DSL/blob/master/test/%E4%B8%AD%E6%96%87%E6%8E%A5%E5%8F%A3%E6%B5%8B%E8%AF%95.kt), 是参考了[原代码中的测试用例](https://github.com/icela/FriceEngine-DSL/blob/master/test/Test.kt)编写的):

<img src="https://github.com/program-in-chinese/team_website/blob/master/%E4%B8%B4%E6%97%B6/FriceEngine_DSL_%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81.png">

#### 感想
IntelliJ刚开始用, 很多功能不熟, Gradle也是初学, 开发过程中遇到不少磕碰. 在此多谢原作者的各种协助与指点.

个人没有Kotlin经验, 感觉在使用时会有些语法上的困惑, 尤其是{}和()的使用. 比如代码中同时有`加速(0, 50)`和:
```
加速 {
	横向加速度_左负右正 = 20.0
}
```
个人觉得API在形式上的一致性对易用性比较重要.

强烈建议改进动画性能, 过高的CPU占用会让推广受限, 尤其是手机app上.

