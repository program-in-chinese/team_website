---
layout: post
comments: true
title:  手机编程环境初尝试-用AIDE开发Android应用
description: 尝试用AIDE在Android手机环境中开发最简单的Android应用. Develope a simple Android app using AIDE running on Android phone.
date:   2017-12-24 00:00:00 -0700
categories: 命名
---

前不久才接触到***纯粹用手机***进行编程的开发者, 当时颇有孤陋寡闻之感, 因为之前听说过手机编程还是一些在线编程学习网站开发的学习环境, 没有想过真的有用它做实际开发的. 此文用AIDE免费版在自己的手机上做一个最简单的应用, 参考的是AIDE官方的入门文档: [AIDE - Android IDE](http://www.android-ide.com/tutorial_androidapp.html).

安装AIDE 3.2.171025(免费版)后, 选择在下面路径新建项目/Create new project(这个路径是Git客户端工具SGIT 1.3.3.final的默认git clone导出路径):

![2017_12_24_AIDE1]({{ "/assets/2017_12_24_AIDE1.jpg" | absolute_url }})

弹出项目类型选择:

![2017_12_24_AIDE2]({{ "/assets/2017_12_24_AIDE2.jpg" | absolute_url }})

选择New Android App后:

![2017_12_24_AIDE3]({{ "/assets/2017_12_24_AIDE3.jpg" | absolute_url }})

找了一下@string/hello_world定义的位置, 发现在:

![2017_12_24_AIDE4]({{ "/assets/2017_12_24_AIDE4.jpg" | absolute_url }})

选择"运行"后, 结果正如预期:

![2017_12_24_AIDE5]({{ "/assets/2017_12_24_AIDE5.jpg" | absolute_url }})

为检验中文命名的支持度, 将字符串键值改为了"@string/问好", 并在strings.xml中相应修改. 编译运行无误, 但开始在main.xml中的<TextView下有个红线警告, 也许只是延迟. 再次打开后警告消失. Java的中文命名自然支持, 就没有尝试.

总的感觉开发过程比较流畅, 虽然每每有付费专业版的弹窗, 但也无可厚非.

AIDE的下载量有百万之多, 让我感到手机编程环境的日益普及. 确实随着屏幕变大变清晰, 系统性能的提升, 手机现今已经离开发用机越来越近. 在手机拥有率已经远超电脑(而且不会逆转)的时代, 相信这种"移动"开发的实践只会越来越多. 新的编程语言工具对此的支持也会越来越完善, 比如之前的[日语编程语言"抚子" - 第三版特色初探](https://zhuanlan.zhihu.com/p/30800689)"对移动设备和输入法的特别优化"一节.