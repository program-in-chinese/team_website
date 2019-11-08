---
layout: post
comments: true
title:  【日常】Python读取解析xml文件，顺便转换为大疆机甲大师可以演奏的乐谱
description: 
date:   2019-10-31 00:00:00 -0700
categories: Python 机甲大师
---


最后生成的就是下面视频中的一坨数据，《彩云追月》的简谱，包括89个音符和间隔。

[在线视频演示](https://v.qq.com/x/page/t3018q530cj.html)

*注：上面S1的代码中仅为演示之用使用了time.sleep，如需配合云台/底盘运动等等，需要另外机制。参考此文：[#S1歌舞大赛#勃拉姆斯的摇篮曲-乐谱简易录入方法-产品-大疆社区](https://bbs.dji.com/thread-230633-1-1.html)*。

后补：已更新代码，配合整体运动的演奏完成。演示如下：

[在线视频演示](https://v.qq.com/x/page/p3018u35bky.html)

解析XML相关代码如下，用Python标准库的minidom，与HTML的DOM解析类似，也有getElementsByTagName方法。完整源码[在此](https://github.com/program-in-chinese/study/blob/master/1-%E5%9F%BA%E7%A1%80/xml/%E6%8F%90%E5%8F%96.py)。

**声明：（多谢评论指出）下面是在电脑上运行的Python代码，而非机甲上运行的。**
```python
...
def 取子元素(节点, tag名):
    return 节点.getElementsByTagName(tag名)[0].childNodes[0].nodeValue

# MusicXML文件是网上资源, 需另行下载
xmldoc = minidom.parse('彩云追月.xml')
原音符列表 = xmldoc.getElementsByTagName('note')
...
for 音符 in 原音符列表:
    音高 = 音符.getElementsByTagName('pitch')[0]
...
```
XML中的第一个note节点内容如下：
```xml
      <note default-x="79.59" default-y="-65.00">
        <pitch>
          <step>G</step>
          <octave>2</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot/>
        <stem>up</stem>
        <lyric number="2" default-x="6.58" default-y="-106.00" relative-y="-1.61">
          <syllabic>single</syllabic>
          <text>明</text>
          </lyric>
        <lyric number="3" default-x="6.58" default-y="-132.00">
          <syllabic>single</syllabic>
          <text>明</text>
          </lyric>
        </note>
```
对了，对MusicXML格式熟悉的请教一下：

1. 节拍的时间长度。现在是靠duration 总和和曲子长度推出每单位duration的时间长度。比如，上面的《彩云追月》的xml中，duration总和为160，mp3的长度为107秒，演奏了两遍，因此每个duration约为107/2/160（上面的演示中稍慢）。不知XML中有没有相关数据可以算出这个长度？
2. 分节。现在输出的是一坨连着的数据，没有任何分节。不知道XML中有没有各节标志可以提取？这样可以让输出的数据更便于组织和调试。

***停止无偿服务，详见后文及最后声明***[【巧妇难为无米之炊】为机甲大师从MusicXML提取乐谱之卡农](https://zhuanlan.zhihu.com/p/90142676)【如果有其他需要转换的乐曲，可以留言。我找得到相应MusicXML的话，乐于代劳转换。】