---
layout: post
comments: true
title:  中文代码示例之5分钟入门TypeScript
description: 将TypeScript官方入门文档的示例代码进行中文命名. Use Chinese naming in the sample programs in the 5-minute tutorial from official TypeScript language website.
date:   2017-12-10 00:00:00 -0700
categories: 命名 教程
---

Typescript官方文档起的这个噱头名字: [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html), 虽然光看完文章就不止5分钟...走完整个文档流水账如下(代码编辑器用的是VS Code)

源码在: [program-in-chinese/typescript_in_5_min_zh](https://github.com/program-in-chinese/typescript_in_5_min_zh)
第一个TypeScript程序
```typescript
function 问好(那谁) {
  return "吃了么, " + 那谁;
}

let 路人 = "打酱油的";

document.body.innerHTML = 问好(路人);
```
运行
```
tsc 问好.ts
```
编译生成"问好.js"文件.
添加参数类型
```typescript
function 问好(那谁: string) {
   return "吃了么, " + 那谁;
}
```
如果'那谁'的类型不符, 比如是数组类型[0,1,2], 编译时会报错, 挺好:
```
问好.ts(7,30): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```
添加接口
```typescript
interface 人 {
  姓: string;
  名: string;
}

function 问好(那谁: 人) {
  return "吃了么, " + 那谁.姓 + 那谁.名;
}

let 路人 = {姓: "大", 名: "黄"};
```
这里路人的"形状"符合"人", 类型就被判定为相符.

自己误写成了:
```typescript
function 问好(那谁: 人) {
  return "吃了么, " + 人.姓 + 人.名;
}
```
编译提示'人'是个类型而不是值, 挺好:
```
问好.ts(7,20): error TS2693: '人' only refers to a type, but is being used as a value here.
```
添加类
```typescript
class 学生 {
  全名: string;
  constructor(public 姓: string, public 名: string) {
    this.全名 = 姓 + 名;
  }
}

interface 人 {
  姓: string;
  名: string;
}

function 问好(那谁: 人) {
  return "吃了么, " + 那谁.姓 + 那谁.名;
}

let 路人 = new 学生("大", "黄");
```
官方文档说添加class之后编译生成的js文件与没有class的相同, 这里不解, 实验结果是不同的.
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

但在火狐(Firefox)浏览器中打开时报错:
```
The character encoding of the HTML document was not declared. The document will render with garbled text in some browser configurations if the document contains characters from outside the US-ASCII range. The character encoding of the page must be declared in the document or in the transfer protocol.
%E9%97%AE%E5%A5%BD.html
```
将View->TextEncoding从Western改为Unicode后显示正确.

#### 后感:

tsc编译好慢!

TypeScript代码看起来更好理解一点, 编译期的反馈信息对于减少错误很有用.