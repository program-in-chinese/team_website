---
layout: post
comments: true
title:  中文代码示例之5分钟入门TypeScript
description: 中文编程知乎专栏的月度小结, 包括所有在下了解的中文编程相关项目进展. Monthly report of column "Programming in Chinese", together with other progresses in Github organization and other channels.
date:   2017-12-10 00:00:00 -0700
categories: 命名 教程
---

本文为[](https://zhuanlan.zhihu.com/p/31890243)的[CTS](https://github.com/program-in-chinese/CTS)版本. 它实现了关键词和标准库的所有命名汉化. 本文并未使用附带的vscode相关插件(包括CTS语言插件和拼音输入插件), 与原Typescript教程类似 只用了命令行进行编译.

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
类 学生 {
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
最后一个插曲:

html文件在Chrome中打开显示正确:

> 吃了么, 大黄
