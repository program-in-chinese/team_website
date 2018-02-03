---
layout: post
comments: true
title:  为新语言编写Visual Studio Code语法高亮插件
description: 为一个简单的实验编程语言编写Visual Studio Code插件, 实现语法高亮. Develop a plugin for Visual Studio Code, to achieve syntax highlight for a simple experimental programming language.
date:   2017-12-24 20:00:00 -0700
categories: IDE 插件
---

本文源码库: [program-in-chinese/quan4-highlighter](https://github.com/program-in-chinese/quan4-highlighter)

语法高亮是一个开发环境的基本功能. 此文尝试为之前的"圈4"语言(详见[编程语言试验之Antlr4+JavaScript实现&quot;圈4&quot;](https://zhuanlan.zhihu.com/p/31644101))编写一个高亮插件, 仅为演示之用. 参考的是Visual Studio Code官方文档: [Add Themes, Snippets and Colorizers to Visual Studio Code](https://code.visualstudio.com/docs/extensions/themes-snippets-colorizers#_adding-a-new-language-colorizer). 首先创建插件如下, 为".圈4"的源文件添加高亮:
```
$ yo code

     _-----_     ╭──────────────────────────╮
    |       |    │   Welcome to the Visual  │
    |--(o)--|    │   Studio Code Extension  │
   `---------´   │        generator!        │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

? What type of extension do you want to create? New Language Support
Enter the URL (http, https) or the file path of the tmLanguage grammar or press ENTER to start with a new grammar.
? URL or file to import, or none for new: 
? What's the name of your extension? 圈4高亮
? What's the identifier of your extension? quan4-highlighter
? What's the description of your extension? 圈4语言的VS Code插件
? What's your publisher name (more info: https://code.visualstudio.com/docs/tools/vscecli#_publishing-extensions)? nobody
Enter the id of the language. The id is an identifier and is single, lower-case name such as 'php', 'javascript'
? Language id: quan4
Enter the name of the language. The name will be shown in the VS Code editor mode selector.
? Language name: 圈4
Enter the file extensions of the language. Use commas to separate multiple entries (e.g. .ruby, .rb)
? File extensions: .圈4
Enter the root scope name of the grammar (e.g. source.ruby)
? Scope names: source.圈4
   create quan4-highlighter/syntaxes/quan4.tmLanguage.json
   create quan4-highlighter/.vscode/launch.json
   create quan4-highlighter/package.json
   create quan4-highlighter/README.md
   create quan4-highlighter/CHANGELOG.md
   create quan4-highlighter/vsc-extension-quickstart.md
   create quan4-highlighter/language-configuration.json
   create quan4-highlighter/.vscodeignore
   create quan4-highlighter/.gitignore

Your extension quan4-highlighter has been created!
```
默认语法文件syntaxes/quan4.tmLanguage.json中, 关键词的模式匹配为:
```
"match": "\\b(if|while|for|return)\\b"
```
直接改为:
```
"match": "求约数"
```
运行插件后(F5新运行, Command+R可以在插件修改后刷新)实现:

很明显它是最直接的正则表达式匹配. 还不确定是否能做到空格敏感, 以及语法检验.

这只是第一步, 之后还需对语法定义格式([TextMate Manual & Language Grammars](https://manual.macromates.com/en/language_grammars))进行深入学习.