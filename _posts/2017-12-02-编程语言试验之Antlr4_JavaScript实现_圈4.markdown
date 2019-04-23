---
layout: post
comments: true
title:  编程语言试验之Antlr4+JavaScript实现"圈4"
description: 参考网文, 倚靠Antlr生成JavaScript实现的分析器, 实现一个简单的编程语言. Implement a pretotype programming language with Antlr4 and JavaScript, based on an online article.
date:   2017-12-02 00:00:00 -0700
categories: 语言设计
---

参考: [ANTLR4: Making a compiler with the JavaScript runtime](http://www.scriptol.com/programming/antlr4-javascript.php)

演示效果虽弱, 还是先上图吧:

![2017_12_02_圈4]({{ "/assets/2017_12_02_quan4.png" | absolute_url }})

在线演示: [地址](http://codeinchinese.com/圈4/圈4.html).

源码库: [program-in-chinese/quan4](https://github.com/program-in-chinese/quan4)

下载到本地后在浏览器中打开"圈4.html"就可以在本地试验.

以后设计实现好语言后可以直接用静态网页作在线编程的演示, 觉得还蛮有用.

注: JS代码中各种不良操作(比如全局函数定义). 请勿作为JS学习材料使用. 与前文一样, 此文的目标不是一个实用的编程语言.

语法非常简单(圈4.g4), 只为演示之用. 前文[编程语言试验之Antlr4+Java实现"圈2"](https://zhuanlan.zhihu.com/p/31429800)有更多格式的解释:
```
grammar 圈4;
程序   : 求约数;

求约数    : '求约数' T数 ;

T数 : [0-9]+ ;
T空白     : [ \n\t]+ -> skip;
```
下面命令生成词法语法分析器相关JavaScript文件(圈4.tokens, 圈4Lexer.js, 圈4Lexer.tokens, 圈4Listener.js, 圈4Parser.js):
```
$ java -cp "antlr-4.7-complete.jar:$CLASSPATH" org.antlr.v4.Tool -Dlanguage=JavaScript 圈4.g4
```
作为解释器的"定制监听器.js":
```javascript
var antlr4 = require('antlr4/index');
const 圈4Listener = require('./圈4Listener.js').圈4Listener

定制监听器 = function () {
  圈4Listener.call(this);
  return this;
}

定制监听器.prototype = Object.create(圈4Listener.prototype);
定制监听器.prototype.constructor = 定制监听器;
/*
无需接口定义: enter程序/exit程序/enter求约数
*/
定制监听器.prototype.exit求约数 = function(上下文) {
  var 原数 = parseInt(上下文.getChild(1).getText());
  document.getElementById("输出").innerHTML = 原数 + "的约数: " + 求约数(原数);
};

function 求约数(原数) {
  var 约数 = [];
  for (var i = 1; i < 原数 - 1; i++) {
    if (原数 % i == 0) {
      约数.push(i);
    }
  }
  return 约数;
}

exports.定制监听器 = 定制监听器;
```
读取文件输入, 调用附着了定制监听器的分析器"代码分析.js":
```javascript
const antlr4 = require("antlr4/index")
const 圈4Lexer = require("./圈4Lexer.js")
const 圈4Parser = require("./圈4Parser.js")
const 定制监听器 = require("./定制监听器.js").定制监听器

运行();

// TODO: 需改进-现为全局, 由于browserify
function 运行() {
  var 代码 = document.getElementById('输入代码').value;
  var 输入流 = new antlr4.InputStream(代码)
  var 词法分析器 = new 圈4Lexer.圈4Lexer(输入流)
  var 词 = new antlr4.CommonTokenStream(词法分析器)
  var 语法分析器 = new 圈4Parser.圈4Parser(词)
  语法分析器.buildParseTrees = true

  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new 定制监听器(), 语法分析器.程序())
}

window.运行 = 运行;
```
HTML界面"圈4.html":
```html
<html>
  <head>
    <!-- defer原因: https://stackoverflow.com/a/26077148/1536803 不然需要document.ready判断 -->
    <script src="圈4.js" defer></script>
  </head>
  <body>
    <textarea id="输入代码">求约数50
    </textarea>
    <button onclick="运行()">运行</button> 
    <span id="输出"></span>
  </body>
</html>
```
是的, 上面的"圈4.js"需要另行生成. 安装Browserify后运行:
```
$ browserify 代码分析.js > 圈4.js 
```