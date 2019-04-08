---
layout: post
comments: true
title:  "JavaScript实现ZLOGO: 性能改进"
description: 基于JavaScript和Antlr4实现简单的中文LOGO语法, 性能改进. Implement simple LOGO language using JavaScript and Antlr4. Improve performance.
date:   2019-01-23 00:00:00 -0700
categories: 命名 算法
---

主攻前文[吴烜：JavaScript实现ZLOGO: 界面改进与速度可调](https://zhuanlan.zhihu.com/p/55359648)的几个性能问题

在线演示: [圈3](http://codeinchinese.com/%E5%9C%883/%E5%9C%883.html)

源码仍在: [program-in-chinese/quan3](https://github.com/program-in-chinese/quan3)

![2019-01-23-logo圆包络]({{ "/assets/2019-01-23-logo圆包络.gif" | absolute_url }})

之前是在绘制过程中计算每帧需要绘制的线段, 在尝试改进的过程中很快发现问题太多且不易测试. 接着在某早晨"醒悟"到应该而且可以在绘制前计算好每一帧的步进路径表. 不仅可以避免绘制卡顿问题, 还便于测试(因为是纯JS实现, 不需夹杂DOM操作). 于是通过如下递归代码实现了截取指定位置的路径表:
```javascript
// 返回{截取部分: 路径表, 剩余部分: 路径表}
// 如果 开始位置 >= 终止位置, 返回{[], 所有}
function 截取路径表(路径表, 开始位置, 终止位置) {
  if (开始位置 >= 终止位置) {
    return {截取部分: [], 剩余部分: 路径表};
  }
  if (路径表.length == 0) {
    return {截取部分: [], 剩余部分: []};
  } else if (路径表.length == 1) {
    return 截取路径(路径表[0], 开始位置, 终止位置);
  } else {
    var 段 = 路径表[0];
    var 长度 = 段.长度;
    if (开始位置 >= 长度) {
      路径表.shift();
      return 截取路径表(路径表, 开始位置 - 长度, 终止位置 - 长度);
    } else if (开始位置 < 长度 && 终止位置 < 长度) {
      var 前段 = 截取路径(路径表[0], 开始位置, 终止位置);
      路径表.shift();
      return {截取部分: 前段.截取部分, 剩余部分: 前段.剩余部分.concat(路径表)};
    } else {
      var 前段 = 截取路径(路径表[0], 开始位置, 长度);
      路径表.shift();
      var 后段 = 截取路径表(路径表, 0, 终止位置 - 长度);
      return {截取部分: 前段.截取部分.concat(后段.截取部分), 剩余部分: 后段.剩余部分};
    }
  }
}
```
原本为去掉路径表第一项, 使用了`slice()`, 测试时发现耗时接近O(n^3). 导致点击"运行"后的运算耗时在复杂时(比如>10000线段的图形)太长(停顿超过1秒)难以接受. 改为`shift()`后, 粗测不超过O(n^2), 暂未深入研究.

这里是获取每一帧的路径表(每帧前进的长度等于"速度"):
```javascript
function 按步进拆分路径表(路径表, 速度) {
  var 所有段 = [];
  while (路径表.length > 0) {
    var 拆分路径 = 截取路径表(路径表, 0, 速度);
    所有段.push(拆分路径.截取部分);
    路径表 = 拆分路径.剩余部分;
  }
  return 所有段;
}
```
感觉已经达到可以让用户玩玩的程度. 接下来视反馈决定改进方向.
