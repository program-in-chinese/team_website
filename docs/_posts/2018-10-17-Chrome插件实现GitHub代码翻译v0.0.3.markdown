---
layout: post
comments: true
title:   Chrome插件实现GitHub代码翻译v0.0.3
description: 实现Chrome插件, 基于本地词典数据, 提供Github在线源码翻译功能. Show how to translate English source code to Chinese on Github pages.
date:   2018-10-17 00:00:00 -0700
categories: 命名 翻译
---

![2018-10-17-github源码翻译]({{ "/assets/2018-10-17-github源码翻译.png" | absolute_url }})

续前文[浏览器插件实现GitHub代码翻译原型演示](https://zhuanlan.zhihu.com/p/43304088), 通过调用[浏览器插件-离线英汉词典](https://zhuanlan.zhihu.com/p/46640311)的批量查词接口, 实现了源码的初步命名直译.

源码库仍在: [program-in-chinese/webextension_github_code_translator](https://github.com/program-in-chinese/webextension_github_code_translator)

还缺失的功能: [驼峰命名法拆分](https://github.com/program-in-chinese/webextension_github_code_translator/issues/2). 比如图中所示, BasicCalculator未翻译.

语言关键词词典.js. 內建词典包括常用关键词, 以及Java和Python的专用关键词:
```javascript
var 通用关键词 = {
  'assert': "断言",
  'import': "导入",
  "if": "如果",
  "else": "否则",
  "while": "每当",
  "for": "对于",
  "in": "在",
  "switch": "岔",
  "case": "分支",
  "break": "跳出",
  "continue": "继续",
  "return": "返回",
  "throw": "抛出",
  "finally": "善后",
  'class': "类别",
  'is': "为"
}

var 专用关键词 = {
  /*
  参考 http://zetcode.com/lang/python/keywords/
  import keyword
  print("Python keywords: ", keyword.kwlist)
  */
  "python": {
    'False': "假",
    'None': "空",
    'True': "真",
    'and': "且",
    'as': "as",
    'def': "定义",
    "del": "删除",
    'elif': "否则如果",
    'except': "except",
    'from': "从",
    'global': "全局",
    'lambda': "lambda",
    'nonlocal': "nonlocal",
    'not': "不",
    'or': "或",
    'pass': "轮空",
    'raise': "抛出",
    'with': "with",
    'yield': "产出"
  },
  // 参考 https://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html
  "java": {
...
  }
}
```
释义处理.js. 查词后, 选取一个"合适"的词义, 这里还很粗糙:
```javascript
function 首选(中文释义, 所有词性) {
  if (!中文释义) {
    return;
  }
  var 首选词义 = "";
  var 词性到释义 = 分词性(中文释义, 所有词性);
  //console.log(词性到释义);
  if (词性到释义[词性_计算机]) {
    首选词义 = 词性到释义[词性_计算机][0];
  } else {
    // 取第一个词性的第一释义
    for (var 词性 in 词性到释义) {
      首选词义 = 词性到释义[词性][0];
      break;
    }
  }
  return 首选词义;
}
```
主界面.js中进行翻译的主体部分:
```javascript
function 翻译() {
  var 原代码拷贝 = document.getElementsByTagName('table')[0];
  var 顶节点 = 原代码拷贝.parentElement;
  var 编程语言 = 取编程语言(顶节点);
  var span字段列表 = 原代码拷贝.getElementsByTagName('span');
  var 文本字段列表 = 取子文本节点(document);

  关键词词典 = 取所有关键词(编程语言);
  // 合并两个部分
  添加所有待查词(span字段列表);
  添加所有待查词(文本字段列表);

  chrome.runtime.sendMessage(
    "ndifefelacmidghjaehmhicbchbidhpe",
    命名词典,
    function(返回值) {
      命名词典 = 返回值.所有释义;
      for (var 词 in 命名词典) {
        命名词典[词] = 常用命名[词] ? 常用命名[词] : 首选(命名词典[词], 词性);
      }
      翻译字段列表(span字段列表);
      翻译字段列表(文本字段列表);

      顶节点.insertBefore(document.createTextNode("编程语言: " + 编程语言), 原代码拷贝);
    }
  );
}
```

