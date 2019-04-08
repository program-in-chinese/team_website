---
layout: post
comments: true
title:  5分钟入门LingaScript-尝鲜中文版TypeScript
description: 基于TypeScript官方入门文档, 用中文版TypeScript LingaScript重写示例代码.
date:   2019-03-15 00:00:00 -0700
categories: 命名 教程
---

续前文[转载: 中文輸進去，程式出得來，開發者發大財 -LingaScript:中文化TypeScript](https://zhuanlan.zhihu.com/p/59308226), 虽然其中例程使用了繁体中文语法, 但它同时也支持简体中文语法.

***注: 此文中VS Code的TypeScript环境设置为了中文, 因此错误信息也是中文. 方法见[VS Code 有哪些必不可少的设置项？](https://zhuanlan.zhihu.com/p/59308226) 这是VS Code提供的功能.***

按照前文[5分钟入门CTS-尝鲜中文版TypeScript](https://zhuanlan.zhihu.com/p/36559989)的过程, 对它的简体版[lingascript-cn](https://www.npmjs.com/package/lingascript-cn)进行实测.

源码库: [program-in-chinese/LingaScript_cn_in_5_min](https://github.com/program-in-chinese/LingaScript_cn_in_5_min)

采用本地安装, 第一个LingaScript程序, 关键字看上去与CTS相同:
```typescript
函数 问好(那谁) {
  返回 "吃了么, " + 那谁;
}

变量 路人 = "打酱油的";

document.body.innerHTML = 问好(路人);
```
由于仍使用.ts后缀, 在VS Code下被认作TypeScript源码, 因而有很多语法错误提示, 但不影响编译.

运行编译后正确生成`问好.js`. 与中文代码示例之5分钟入门TypeScript文末一样, 在火狐中打开测试HTML文件仍需将编码改为Unicode.

添加参数类型:
```typescript
函数 问好(那谁: 文字) {
  返回 "吃了么, " + 那谁;
}
```
如果'那谁'的类型不符, 比如是数组类型`[0,1,2]`, 编译时会报错:

> 问好.ts:7:30 - error TS2345: 类型“number[]”的参数不能赋给类型“string”的参数。

添加接口和类. 最终的[问好.ts](https://github.com/program-in-chinese/LingaScript_cn_in_5_min/blob/master/%E9%97%AE%E5%A5%BD.ts):
```typescript
类别 学生 {
  全名: 文字;
  构造(公开 姓: 文字, 公开 名: 文字) {
    本体.全名 = 姓 + 名;
  }
}

接口 人 {
  姓: 文字;
  名: 文字;
}

函数 问好(那谁: 人) {
  返回 "吃了么, " + 那谁.姓 + 那谁.名;
}

变量 路人 = 新建 学生("大", "林");

document.body.innerHTML = 问好(路人);
```
编译无误, 运行正常, 网页显示如下:

> 吃了么, 大林