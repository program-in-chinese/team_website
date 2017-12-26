---
layout: post
comments: true
title:  "JavaScript实现ZLOGO子集: 前进+转向"
description: 用JavaScript实现ZLOGO的功能子集, 并在线演示. Implement subset of ZLOGO using JavaScript, and setup online demo
date:   2017-12-05 00:00:00 -0700
categories: 语言设计
---

在前文[中文编程语言之Z语言初尝试: ZLOGO 4](https://zhuanlan.zhihu.com/p/31505895)与相关讨论后, 萌生了用JavaScript编写类似语言以便在线编程的想法. 于是使用 @TKT2016 (知乎账号)的ZLOGO语法设计, 在[编程语言试验之Antlr4+JavaScript实现"圈4"](https://zhuanlan.zhihu.com/p/31644101)基础上, 通过p5js的绘图功能, 实现了基本的两个ZLOGO功能. 如图(动态效果看起来更爽一点, 当然要耐心等它画完, 请自行尝试):

![2017_12_05_五角星]({{ "/assets/2017_12_05_star.png" | absolute_url }})

源码库: [program-in-chinese/quan3](https://github.com/program-in-chinese/quan3), 导出代码到本地后, 在浏览器中打开"圈3.html"即可在本地实践编程.

在线演示: [地址](http://codeinchinese.com/%E5%9C%883/%E5%9C%883.html).

由于还不支持循环, 实现这个五角星的代码很重影:
```
开始
  前进200
  左转144度
  前进200
  左转144度
  前进200
  左转144度
  前进200
  左转144度
  前进200
结束
```
下面是[编程语言试验之Antlr4+JavaScript实现"圈4"](https://zhuanlan.zhihu.com/p/31644101)之后添加的主要部分:
语法文件(圈3.g4):
```
声明 : 前进 | 转向;

前进 : '前进' T数 ;

转向 :  T转向 '转' T数 '度' ;

T转向 : '左' | '右' ;
```
主要修改在"定制监听器.js":

命名还比较粗糙, 一些用语最好更加一致(比如"长度","距离","前进量"虽在不同上下文, 实际指的是一个东西), 需要改进. 当然算法肯定也可以改进, 暂时是实现功能优先.
```javascript
var 常量_指令名_前进 = "前进";
var 常量_指令名_转向 = "转向";

var 序号 = 0;

var 画布尺寸 = {x: 1000, y: 800};
var 原点 = {x: 画布尺寸.x/2, y: 画布尺寸.y/2};
var 前进角度 = 90; // 默认向上, 对应弧度: 90 * Math.PI / 180
// 指令格式: 名称 (转向, 前进, 笔色等等); 参数 (转向角度--右为负,左为正; 前进长度-像素数等等);
var 指令序列 = [];

定制监听器.prototype.enter程序 = function(ctx) {
  重置状态();
  // 只需调用一次
  // https://p5js.org/reference/#/p5/setup
  构图 = function() {
    新画布(画布尺寸.x, 画布尺寸.y);
  }
};

function 重置状态() {
  序号 = 0;
  原点 = {x: 画布尺寸.x/2, y: 画布尺寸.y/2};
  前进角度 = 90;
  指令序列 = [];
}

// 根据指令序列, 生成路径分段描述(段起止点坐标, 颜色等等)
// 如: 前进50, 左转90度, 前进50 应返回(假设起点为{x: 200, y: 200}):
// {起点: {x: 200, y: 200}, 终点: {x: 200, y: 150}, 长度: 50},
// {起点: {x: 200, y: 150}, 终点: {x: 150, y: 150}, 长度: 50}
function 生成路径表(指令序列) {
  // 段: {起点: {x, y}, 终点: {x, y}, 长度, 颜色}
  var 路径表 = [];
  var 起点 = 原点;
  for(var i = 0; i < 指令序列.length; i++ ){
    var 指令 = 指令序列[i];
    var 指令名 = 指令.名称;
    var 段 = {起点: 起点};
    if (指令名 === 常量_指令名_前进) {
      var 距离 = 指令.参数;
      var x增量 = Math.cos(前进角度 * Math.PI / 180);
      var y增量 = Math.sin(前进角度 * Math.PI / 180);
      段.终点 = {x: 起点.x + x增量 * 距离, y: 起点.y - y增量 * 距离};
      段.长度 = 距离;
      路径表.push(段);

      起点 = 段.终点;
    } else if (指令名 === 常量_指令名_转向) {
      前进角度 += 指令.参数;
    }
  }
  return 路径表;
}

定制监听器.prototype.exit程序 = function(ctx) {
  var 路径表 = 生成路径表(指令序列);
  绘制 = function() {
    var 当前序号 = 序号;
    background(255, 255, 255);

    for (var i = 0; i < 路径表.length; i++ ) {
      var 段 = 路径表[i];
      var 起点 = 段.起点;
      var 终点 = 段.终点;
      var 距离 = 段.长度;
      if (当前序号 < 距离) {
        line(起点.x, 起点.y, 起点.x + (终点.x - 起点.x) * 当前序号 / 距离, 起点.y + (终点.y - 起点.y) * 当前序号 / 距离);
        break;
      } else {
        line(起点.x, 起点.y, 终点.x, 终点.y);
        当前序号 = 当前序号 - 段.长度;
      }
    }
    
    序号 ++;
  }
};

定制监听器.prototype.exit前进 = function(上下文) {
  var 前进量 = 上下文.getChild(1).getText()
  指令序列.push({名称: 常量_指令名_前进, 参数: parseInt(前进量)});
};

定制监听器.prototype.exit转向 = function(上下文) {
  var 方向 = 上下文.getChild(0).getText();
  var 角度 = parseInt(上下文.getChild(2).getText());

  角度 = 角度 * (方向 === "左" ? 1 : -1);
  指令序列.push({名称: 常量_指令名_转向, 参数: 角度});
};
```
