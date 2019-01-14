---
layout: post
comments: true
title:  "JavaScript实现ZLOGO: 前进方向和速度"
description: 基于JavaScript和Antlr4实现简单的中文LOGO语法, 添加图标显示前进方向, 可修改速度. Implement simple LOGO language using JavaScript and Antlr4. Add icon to show direction, and support to change speed.
date:   2018-12-14 00:00:00 -0700
categories: 语言设计
---

### 系列前文:

- [JavaScript实现ZLOGO子集: 前进+转向](https://zhuanlan.zhihu.com/p/31748014)
- [JavaScript实现ZLOGO子集: 单层循环功能](https://zhuanlan.zhihu.com/p/31785790)
- [JavaScript实现ZLOGO子集: 测试用例](https://zhuanlan.zhihu.com/p/31870155)
- [JavaScript实现ZLOGO: 用语法树实现多层循环](https://zhuanlan.zhihu.com/p/32571516)

功能上, 添加了蚂蚁图标显示当前前进方向, 并可通过修改源码实现行进速度. 并未对语言本身进行改进. 另有一点界面改进. 源码仍在: [program-in-chinese/quan3](https://github.com/program-in-chinese/quan3)

在线演示仍在: [圈3](http://codeinchinese.com/%E5%9C%883/%E5%9C%883.html)
### 演示

默认2倍行进速度(相比之前)画田字格:

![2018-12-14-logo田字格]({{ "/assets/2019-01-13-logo田字格.gif" | absolute_url }})

8倍行进速度画"轮胎" (LOGO源码[链接](https://github.com/program-in-chinese/quan3/blob/master/%E4%BE%8B%E7%A8%8B/%E5%A4%8D%E6%9D%821.txt)):

![2018-12-14-logo轮胎]({{ "/assets/2019-01-13-logo轮胎.gif" | absolute_url }})

### 部分相关源码

下面是为添加蚂蚁和定制速度作的主要修改:
```scala
+  if (!指示方向图) {
+    指示方向图 = createImg("图标/蚂蚁头向上.png")
+    指示方向图.size(36, 34);
+  }
+
   // TODO: 提取到二阶函数
   绘制 = function() {
     var 当前序号 = 序号;
+    const 速度 = 2;
     background(255, 255, 255);
 
     for (var i = 0; i < 路径表.length; i++ ) {
@@ -33,16 +41,20 @@ const 生成指令序列 = require("./语法树处理").生成指令序列
       var 起点 = 段.起点;
       var 终点 = 段.终点;
       var 距离 = 段.长度;
-      if (当前序号 < 距离) {
-        line(起点.x, 起点.y, 起点.x + (终点.x - 起点.x) * 当前序号 / 距离, 起点.y + (终点.y - 起点.y) * 当前序号 / 距离);
+      if (当前序号 < 距离 / 速度) {
+        var 当前x = 起点.x + (终点.x - 起点.x) * 当前序号 * 速度 / 距离;
+        var 当前y = 起点.y + (终点.y - 起点.y) * 当前序号 * 速度 / 距离;
+        指示方向图.position(当前x + 238, 当前y - 8); // TODO: 需要对准线头
+        指示方向图.style("transform", "rotate(" + (90 - 段.前进角度) + "deg)")
+        line(起点.x, 起点.y, 当前x, 当前y);
         break;
       } else {
         line(起点.x, 起点.y, 终点.x, 终点.y);
-        当前序号 = 当前序号 - 段.长度;
+        当前序号 = 当前序号 - 段.长度 / 速度;
       }
     }
     
-    序号 ++;
+    序号 += 速度;
   }
```
### 可能改进

1. 蚂蚁图标在火狐下没有对准走线, 应该是上面TODO的问题
2. 改进蚂蚁图标, 需在开始时就显示
3. 可在界面直接修改行进速度, 隐藏蚂蚁
4. 部分p5js API继续汉化, 如line, background
