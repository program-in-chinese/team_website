---
layout: post
comments: true
title:  "JavaScript实现ZLOGO: 用语法树实现多层循环"
description: 基于JavaScript和Antlr4, 通过语法树实现多层循环. Use AST based on JavaScript and Antlr4 to achieve multi-level loops.
date:   2018-01-02 00:00:00 -0700
categories: 语言设计
---

照例先上演示弱效果图. 演示地址[照旧](http://codeinchinese.com/%E5%9C%883/%E5%9C%883.html):

![2018_01_02_zlogo多层循环演示]({{ "/assets/2018_01_02_zlogo多层循环演示.png" | absolute_url }})

代码如下:
```
开始
  循环4次
    循环4次
      前进50
      左转90度
    到此为止
  右转90度
  到此为止
结束
```
如上文[JavaScript实现ZLOGO子集: 测试用例](https://zhuanlan.zhihu.com/p/31870155)末尾所言, 此文用Antlr进行代码分析生成语法树. 再通过语法树生成p5js绘制代码.

Antlr支持两种代码分析方法, Visitor(监听者)和Visitor(访问者). SO上的问答[Antlr4 Listeners and Visitors - which to implement?](https://stackoverflow.com/questions/20714492/antlr4-listeners-and-visitors-which-to-implement)大致说明了区别. 基于有限的实践, 用Visitor方法生成语法树似乎在实现上更加方便. 尤其相比[Creating a simple parser with ANTLR](http://ivanyu.me/blog/2014/09/13/creating-a-simple-parser-with-antlr/)一文中使用监听者+栈来构建语法树.

Antlr生成工具默认不生成Visitor, 添加-visitor参数后可以生成:
```
java -cp "antlr-4.7-complete.jar:$CLASSPATH" org.antlr.v4.Tool -Dlanguage=JavaScript -visitor 圈3.g4
```
下面是"定制访问器.js"中构建语法树的部分, 看起来比实现前想的简单. 默认生成的'圈3Visitor'中, visitXX方法实现都是"this.visitChildren(ctx)", 但那样会把所有的子节点返回值放进数组, 形成(至少这里是)多余的层次:
```javascript
定制访问器.prototype.visit程序 = function(上下文) {
  语法树 = {子节点: this.visit(上下文.声明())};
  return 语法树;
};

定制访问器.prototype.visit循环 = function(上下文) {
  return {
    类型: '循环',
    次数: parseInt(上下文.T数().getText()),
    子节点: this.visit(上下文.声明())};
};

定制访问器.prototype.visit声明 = function(上下文) {
  return this.visit(上下文.getChild(0));
};

定制访问器.prototype.visit转向 = function(上下文) {
  var 方向 = 上下文.T转向().getText();
  var 角度 = parseInt(上下文.T数().getText()) * (方向 === "左" ? 1 : -1);
  return {类型: '转向', 参数: 角度};
};

定制访问器.prototype.visit前进 = function(上下文) {
  return {类型: '前进', 参数: parseInt(上下文.T数().getText())};
};
```
上面的源码生成语法树大致如下所示. 实现上还有很多需要改进的, 比如'前进'和'转向'现在是两种'类型', 但应该是一种; 根节点类型不应为空; 等等:

![2018_01_02_zlogo多层循环语法树]({{ "/assets/2018_01_02_zlogo多层循环语法树.png" | absolute_url }})

下面是"编译.js"中基于语法树生成指令列表的方法, 之后就与之前一样根据指令列表生成p5js绘制函数(代码也不用修改).
```javascript
function 生成指令序列(节点) {
  var 指令序列 = [];
  // TODO: 根节点类型不应为空
  if (!节点.类型) {
    var 声明节点 = 节点.子节点;
    for (var i = 0; i < 声明节点.length; i++) {
      Array.prototype.push.apply(指令序列, 生成指令序列(声明节点[i]));
    }
  } else if (节点.类型 == "循环") {
    var 指令序列 = [];
    for (var i = 0; i < 节点.次数; i++) {
      Array.prototype.push.apply(指令序列, 生成指令序列({子节点: 节点.子节点}));
    }
  } // TODO: 修改类型统一为'指令'
  else if (节点.类型 == "前进" || 节点.类型 == "转向") {
    return [{名称: (节点.类型 == "前进" ? 常量_指令名_前进 : 常量_指令名_转向), 参数: 节点.参数}];
  }
  return 指令序列;
}
```
修改相应测试用例, 以及清理不再使用的监听器代码后. 代码已从visitor分支([program-in-chinese/quan3](https://github.com/program-in-chinese/quan3/tree/visitor))合并到master.