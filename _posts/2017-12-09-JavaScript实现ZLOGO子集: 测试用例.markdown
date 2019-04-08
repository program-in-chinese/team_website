---
layout: post
comments: true
title:  "JavaScript实现ZLOGO子集: 测试用例"
description: 为ZLOGO子集JavaScript实现添加QUnit测试用例. Add test cases in QUnit for subset of ZLOGO in JavaScript
date:   2017-12-09 00:00:00 -0700
categories: 语言设计
---

续前文[JavaScript实现ZLOGO子集: 前进+转向](https://zhuanlan.zhihu.com/p/31748014). 在添加新功能之前, 先添加测试用例, 以应对日益复杂的代码.

选择使用[QUnit](http://qunitjs.com/)编写运行测试用例. 暂时对比较复杂和I/O无关的部分进行测试.

一是代码分析部分: Antlr通过生成的分析器和定制的监听器, 对原始代码进行分析和生成指令序列的部分. 下面是对循环进行测试的一个用例:
```javascript
QUnit.test( "分析_循环_前进1", function( assert ) {
  assert.deepEqual(
    分析("开始\n循环2次\n前进50\n到此为止\n结束\n").返回指令序列(),
    [{名称: 常量_指令名_前进, 参数: 50},
      {名称: 常量_指令名_前进, 参数: 50}],
    "循环2次通过!" );
});
```
"生成路径表"将指令序列转换成路点序列(经过的转折点), 其中一个测试用例如下:
```javascript
QUnit.test( "生成路径表_前进_左转_前进", function( assert ) {
  assert.deepEqual(
    生成路径表([{名称: 常量_指令名_前进, 参数: 50},
              {名称: 常量_指令名_转向, 参数: 90},
              {名称: 常量_指令名_前进, 参数: 50}], 初始前进角度),
    [{起点: 路点0, 终点: 路点1, 长度: 50},
    {起点: 路点1, 终点: 路点2, 长度: 50}],
    "通过!" );
});
```
添加测试的过程中, 再次感受代码封装的重要性. 在测试目标接口中, DOM操作都需避免(比如document, window).

虽然已经添加了多层循环的代码分析部分测试用例, 但在实现时, 感觉需要语法树以便于支持更复杂的语法. 另外在现在的代码里, 已经开始需要拆分模块("定制监听器"比较杂乱).

下面需要调研语法树相关的JS库, 比如: [ajaxorg/treehugger](https://github.com/ajaxorg/treehugger)

另外, 发现TypeScript也可以利用Antlr: [Creating ANTLR Applications in TypeScript - Dangl.Blog();](https://blog.dangl.me/archive/creating-antlr-applications-in-typescript/)