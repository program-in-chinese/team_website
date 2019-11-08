---
layout: post
comments: true
title:  大疆机甲大师Python API之十：程序运行时间
description: 
date:   2019-10-31 00:00:00 -0700
categories: Python 机甲大师
---

### 视频演示

右转90度，左转90度，再右转180度，左转180度，最终朝向与起初相同。但开头和结尾相差了不小的位移，不确定是否因为某个（些）轮子的阻力不同。

(gif太大, 视频演示见原文)

### 例程主体

下面是主体部分，完整可运行源码[在此](https://github.com/program-in-chinese/robomaster-python-samples-zh/blob/master/Python%20API%E8%A7%86%E9%A2%91%E6%BC%94%E7%A4%BA%E4%B8%8E%E4%BE%8B%E7%A8%8B/%E7%B3%BB%E7%BB%9F/%E7%A8%8B%E5%BA%8F%E8%BF%90%E8%A1%8C%E6%97%B6%E9%97%B4.py)。
```python
def start():
    云台.设置旋转速度(20)
    大师.设置模式(常量.底盘跟随模式)
    云台.平转(90)

    运行时间 = 工具.程序运行时间()
    print("90 degree with 20 speed 1: " + str(运行时间))

    云台.平转(-90)
    print("90 degree with 20 speed 2: " + str(工具.程序运行时间() - 运行时间))
    
    运行时间 = 工具.程序运行时间()
    云台.平转(180)
    print("180 degree with 20 speed: " + str(工具.程序运行时间() - 运行时间))
    
    云台.设置旋转速度(40)
    运行时间 = 工具.程序运行时间()
    云台.平转(-180)
    print("180 degree with 40 speed: " + str(工具.程序运行时间() - 运行时间))
```
下面是开发环境控制台输出内容：

![2019-10-31_run程序计时]({{ "/assets/2019-10-31_run程序计时.png" | absolute_url }})

首先，可以看到，云台平转方法是阻塞型的。在转动90度的四秒多期间，也许只能被特定事件触发某些动作（待确认）。另外，从静止状态启动需要些微的额外时间（同样转动90度，1和2相差0.07秒），可以忽略不计。

又尝试了点亮枪LED：
```python
def start():
    LED灯.枪亮()
    运行时间 = 工具.程序运行时间()
    print("gun light on: " + str(运行时间))
```
输出耗时为0，看来它是非阻塞型的。

又查了官方API文档，发现平转方法并未注明为阻塞型，于是试了试在第一次平转 后添加打开LED灯操作，果然还是在第一次平转结束之后才打开了LED灯。也许官方API文档需要补充这一点？