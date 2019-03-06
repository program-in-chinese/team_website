---
layout: post
comments: true
title:  "JavaScript实现ZLOGO子集: 单层循环功能"
description: 用JavaScript实现ZLOGO的功能子集, 添加单层循环. Implement subset of ZLOGO using JavaScript, adding single-level loop
date:   2017-12-06 00:00:00 -0700
categories: 语言设计
---

前文[JavaScript实现ZLOGO子集: 前进+转向](https://zhuanlan.zhihu.com/p/31748014)的示例代码很累赘, 因此尝试实现基本的循环功能, 使得前面的11行代码缩减为7行:
```
开始
  循环4次
    前进200
    左转144度
  到此为止
  前进200
结束
```
源码和在线演示地址同前文.

修改的语法描述(圈3.g4)不多, 应该已经支持多层循环:
```
声明 : 前进 | 转向 | 循环;

循环 : '循环' T数 '次' 声明+ '到此为止' ;
```
但实现上, 暂时先做了单层. 就是将循环体内的指令存放起来, 在循环结束时, 把它们按循环次数重复添加到最终的指令序列中:
```javascript
// TODO: 支持多层循环
var 循环次数 = 0;
var 当前循环的指令序列 = [];
...
定制监听器.prototype.enter循环 = function(上下文) {
  循环次数 = parseInt(上下文.getChild(1).getText());
}

定制监听器.prototype.exit循环 = function(上下文) {
  for (var i = 0; i < 循环次数; i++) {
    for (var j = 0; j < 当前循环的指令序列.length; j++) {
      指令序列.push(当前循环的指令序列[j]);
    }
  }
  当前循环的指令序列 = [];
  循环次数 = 0;
}

定制监听器.prototype.exit前进 = function(上下文) {
  ...
  添加指令({名称: 常量_指令名_前进, 参数: parseInt(前进量)});
};

定制监听器.prototype.exit转向 = function(上下文) {
  ...
  添加指令({名称: 常量_指令名_转向, 参数: 角度});
};

function 添加指令(指令) {
  if (循环次数 > 0) {
    当前循环的指令序列.push(指令);
  } else {
    指令序列.push(指令);
  }
}
```
在实现多层循环之前, 打算先添加测试用例. 毕竟手动测试已经开始麻烦了.