---
layout: post
comments: true
title:  5分钟入门CTS-尝鲜中文版TypeScript
description: 基于TypeScript官方入门文档, 用中文版TypeScript CTS重写示例代码. Use CTS, TypeScript with Chinese keywords and APIs, to rewrite sample programs in the 5-minute tutorial from official TypeScript language website.
date:   2018-05-09 00:00:00 -0700
categories: 命名 教程
---

[知乎原链](http://zhuanlan.zhihu.com/p/36559989)

本文为[中文代码示例之5分钟入门TypeScript](https://zhuanlan.zhihu.com/p/31890243)的[CTS](https://github.com/program-in-chinese/CTS)版本. CTS作者是@htwx(github). 它实现了关键词和标准库的所有命名汉化. 本文并未使用附带的vscode相关插件(包括CTS语言插件和拼音输入插件), 与原Typescript教程类似, 只用了命令行进行编译.

过程仍旧基于Typescript官方文档: [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

源码在: [program-in-chinese/cts_in_5_min](https://github.com/program-in-chinese/cts_in_5_min)

第一个CTS程序
```typescript
函数 问好(那谁) {
  返回 "吃了么, " + 那谁;
}

变量 路人 = "打酱油的";

文档.体.内部HTML = 问好(路人);
```
运行
```
cts 问好.ts --useUnicodeKeywords
```
编译生成"问好.js"文件.
添加参数类型
```typescript
函数 问好(那谁: 文字) {
   返回 "吃了么, " + 那谁;
}
```
如果'那谁'的类型不符, 比如是数组类型[0,1,2], 编译时会报错, 挺好:
```
问好.ts(7,30): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```
添加接口
```typescript
接口 人 {
  姓: 文字;
  名: 文字;
}

函数 问好(那谁: 人) {
  返回 "吃了么, " + 那谁.姓 + 那谁.名;
}

变量 路人 = {姓: "大", 名: "黄"};
```
这里路人的"形状"符合"人", 类型就被判定为相符.

自己误写成了:
```typescript
函数 问好(那谁: 人) {
  返回 "吃了么, " + 人.姓 + 人.名;
}
```
编译提示'人'是个类型而不是值, 挺好:
```
问好.ts(7,20): error TS2693: '人' only refers to a type, but is being used as a value here.
```
添加类
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

变量 路人 = 新建 学生("大", "黄");
```

运行第一个网络应用

为了检验js文件, 添加HTML文件:
```html
<!DOCTYPE html>
<html>
    <head><title>TypeScript你好</title></head>
    <body>
        <script src="问好.js"></script>
    </body>
</html>
```

html文件在Chrome中打开显示正确:

> 吃了么, 大黄
