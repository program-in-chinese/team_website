---
layout: post
comments: true
title:  大疆机甲大师教育机器人Python开发：API中文化初尝试
description: 
date:   2019-10-15 00:00:00 -0700
categories: 机甲大师
---

选取了貌似最简单的新手程序, 先做个中文化前后对比. 原始英文例程(因为没弹匣, 去掉了最后一行发射子弹):
```python
def start():
    robot_ctrl.set_mode(rm_define.robot_mode_free)
    gimbal_ctrl.set_rotate_speed(260)
    armor_ctrl.cond_wait(rm_define.cond_armor_bottom_back_hit)
    gimbal_ctrl.yaw_ctrl(180)
```
中文化后的代码:
```python
def start():
    大师.设置模式(常量.自由模式)
    云台.设置旋转速度(60)
    装甲.等待时机(常量.装甲被袭_后底)
    云台.平转(20)
```
当然, 需要额外代码进行API封装(可以在每个程序中复用), 测试过完整可运行的代码[在此](https://github.com/program-in-chinese/robomaster-python-samples-zh/blob/master/%E8%BD%AC%E5%A4%B4.py​)

一些体会:

1. 开发环境的报错机制有待改进
2. 机甲官方的windows开发环境在中文输入时, 会有很大延迟, 影响开发体验. 因此采用在VSC下编写代码, 拷贝到机甲环境中运行. 开发环境的改进会有很大工作量, 希望大疆不要放弃Python环境(如果能有Mac环境就更好咯).
3. 预定义常量(`rm_define`)的设计很有改进空间, 现在是所有的常量都在一起, `rm_define`下有上百个值, 如果能分类会清晰很多
4. 中文化过程还比较顺利, 下面的几个关:
    1. 研究上文发现的输出(`print`)问题 - 测过, 已向官方反馈.
    2. 尝试搭建一个简易的测试框架
    3. 因为官方暂不支持`import`第三方库, 研究一下有没有变通方法