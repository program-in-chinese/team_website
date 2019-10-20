---
layout: post
comments: true
title:  "[日常] Python缩小jpg图片尺寸"
description: 
date:   2019-10-13 00:00:00 -0700
categories: 命名 教程
---

上文[(多图)火热出炉的大疆机甲大师教育机器人开箱组装小记](https://zhuanlan.zhihu.com/p/86316396)中有35个图片(非常蛋疼地从iphone导入到Mac的"照片", 再手工一个个从HEIC格式通过"预览"程序导出为jpeg格式, 不知有没有更好的办法), 都是4032x3024的尺寸, 大小在3MB左右. 在同步文章到其他一些平台时, 上传图片的速度过于缓慢导致时常失败, 于是决定将长宽都缩小为1/4. 1/16的大小就很舒适, 在100多k左右.

首先有冲动想试试 [Gimp的批量处理脚本因为它貌似支持中文命名](https://www.zhihu.com/pin/1155389094656974848), 但在半夜看到scheme代码决定改用Python试试. 先看到了PIL库, 但只支持到Python2.7于是改用Pillow. 代码很简单(源码[在此](https://github.com/program-in-chinese/study/blob/master/1-%E5%9F%BA%E7%A1%80/%E5%9B%BE%E7%89%87%E5%A4%84%E7%90%86/%E7%BC%A9%E6%94%BE.py)):
```python
from PIL import Image
import os

# 参考: https://www.liaoxuefeng.com/wiki/1016959663602400/1017785454949568
原图片路径 = '/Users/xuanwu/work/机甲/2019-10-11 安装/'
目标路径 = '/Users/xuanwu/work/机甲/缩略/'
for 文件名 in os.listdir(原图片路径):
    if not 文件名.endswith('.jpg'):
        continue
    图片 = Image.open(os.path.join(原图片路径, 文件名))

    宽, 高 = 图片.size
    print('原图尺寸: %sx%s' % (宽, 高))
    
    图片.thumbnail((宽//4, 高//4))
    print('新尺寸: %sx%s' % (宽//4, 高//4))

    图片.save(目标路径 + 文件名, 'jpeg')
```
它对宽/高的识别比较有趣. 比如这个原始jpg是竖版的:

![2019-10-12_python缩略前]({{ "/assets/2019-10-12_python缩略前.jpg" | absolute_url }})
缩略后, 就成了横版:

![2019-10-11_robomaster安装8]({{ "/assets/2019-10-11_robomaster安装35.jpg" | absolute_url }})

看了一下有这种现象的都是通过另一种方式从HEIC转换的jpg(从cache文件夹拷贝出来的), 不明所以.