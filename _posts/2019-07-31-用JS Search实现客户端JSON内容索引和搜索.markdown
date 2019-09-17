---
layout: post
comments: true
title:  "用JS Search实现客户端JSON内容索引和搜索"
description: 
date:   2019-07-31 00:00:00 -0700
categories: 命名 API
---

为快速实现一个中文API搜索原型([中文API文档浏览器 · Issue #165 · program-in-chinese/overview](https://github.com/program-in-chinese/overview/issues/165)), 使用了[JS Search库](https://github.com/bvaughn/js-search), 参考[JS Search演示](http://bvaughn.github.io/js-search/)

演示地址: [API搜索演示](http://codeinchinese.com/API%E4%B8%AD%E6%96%87%E7%B4%A2%E5%BC%95/%E4%B8%BB%E9%A1%B5.html)

演示:

![2019-07-30_api搜索原型]({{ "/assets/2019-07-30_api搜索原型.gif" | absolute_url }})

源码库: [program-in-chinese/team_website](https://github.com/program-in-chinese/team_website/tree/master/docs/API%E4%B8%AD%E6%96%87%E7%B4%A2%E5%BC%95)

部分JavaScript代码:
```javascript
var 重建索引 = function() {
  搜索 = new JsSearch.Search('包');

  搜索.tokenizer = new JsSearch.StopWordsTokenizer(搜索.tokenizer);
  搜索.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
  
  搜索.addIndex('类');
  搜索.addIndex('名');

  搜索.addDocuments(所有数据);
};

...
var 进行搜索 = function() {
  var 原始输入 = 搜索框.value;
  var 关键字 = 原始输入;
  if (中英词典[原始输入]) {
    关键字 = 中英词典[原始输入]
  }
  搜索结果 = 搜索.search(关键字);
  更新显示();
};
```