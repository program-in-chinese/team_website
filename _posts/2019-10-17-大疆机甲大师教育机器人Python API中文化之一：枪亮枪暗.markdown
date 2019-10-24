---
layout: post
comments: true
title:  大疆机甲大师教育机器人Python API中文化之一：枪亮枪暗
description: 
date:   2019-10-17 00:00:00 -0700
categories: Python 机甲大师
---

之前开始[整理机甲的Python API](https://github.com/program-in-chinese/overview/wiki/%E5%A4%A7%E7%96%86Python-API%E5%88%97%E8%A1%A8)，但纸上得来终觉浅，而且发现有些API与即使官方qq群的教程文档也有少许出入，于是打算逐个测试。这一系列将附上真机运行视频，以便以后直观看到最终演示效果。

先从灯效部分API开始。此文的API测试如下(友情提示，有背景音请关音箱）：

[在线视频演示](https://my.tv.sohu.com/us/340644084/158280682.shtml)

Python完整例程如下：
```python
def start():
    次数 = 0
    while 次数 < 3:
        LED灯.枪亮()
        time.sleep(1)
        LED灯.枪暗()
        time.sleep(1)
        次数 += 1

# 以下为API中文化部分, 与程序逻辑无关. 请勿作修改.
LED灯 = led_ctrl
LED灯.枪亮 = LED灯.gun_led_on
LED灯.枪暗 = LED灯.gun_led_off
```
在之前[API中文化初尝试](https://zhuanlan.zhihu.com/p/86692696)已经验证过中文化的可行性，之后的[一系列例程](https://github.com/program-in-chinese/robomaster-python-samples-zh)也体现了相对于英文API的优势。因此这一系列也会将API逐个中文化。

测试该API时，意识到`枪亮`本身并不是阻塞型的（大多数未做特别说明的机甲API 应该都是），因此如果像[这个例子](https://github.com/program-in-chinese/robomaster-python-samples-zh/blob/master/Python%E5%85%A5%E9%97%A8/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B.markdown#1-%E9%97%AE%E4%B8%AA%E5%A5%BD%E5%90%A7)，在运行`枪亮`后程序自然结束，枪仍会亮几秒（应该是程序结束之前的延时）但不会更久。

命名上，一个简单省力的办法是采用与官方Scratch中文环境相同的名称，比如这里两个方法在Scratch的命名是"开启/关闭弹道灯“，但一方面Python的英文API是gun_led_on/off ，个人感觉更口语化，一方面没有看到类似使用“弹道“这一命名的其他Scratch API，并非重复使用的术语。

因此暂且不拘泥于与官方Scratch中文API一致的命名，而是以个人理解为主决定命名风格。比如这里比较口语化的”枪“，而且LED灯这一类别已经明确了这是灯效，因此在方法命名中不需突出”灯“。

另外，是”亮枪“还是”枪亮“，在这里因为”亮枪“有歧义，后者有些优势。另外，现在似乎没有针对自定义标识符的自动补全功能，待机甲IDE支持后，可能会先对第一个字进行匹配（虽然很多其他IDE的自动补全已经支持了中间字符串的匹配），因此暂时将重用的术语（这里是”枪“）置于前部。

当然命名用词大有推敲空间，欢迎意见建议。今后也会在API中文化过程中逐渐调整修正之前的命名。