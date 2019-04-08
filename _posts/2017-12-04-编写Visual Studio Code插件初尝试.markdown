---
layout: post
comments: true
title:  编写Visual Studio Code插件初尝试
description: 根据VS Code官方入门文档编写一个最简单的插件. Write a simple hello-world extension for Visual Studio Code.
date:   2017-12-04 00:00:00 -0700
categories: 开发环境
---

参考官方入门: [Your First Visual Studio Code Extension - Hello World](https://code.visualstudio.com/docs/extensions/example-hello-world)

源码在: [program-in-chinese/vscode_helloWorld](https://github.com/program-in-chinese/vscode_helloWorld)

创建插件过程中, 发现identifier和publisher name不允许中文命名(报错: invalid xxx):
```
? What type of extension do you want to create? New Extension (TypeScript)
? What's the name of your extension? 吃了么
? What's the identifier of your extension? hello
? What's the description of your extension? 吃了么
? What's your publisher name (more info: https://code.visualstudio.com/docs/tools/vscecli#_publishing-extensions)? nobody
```
运行一下Hello World命令, 没问题.

按入门教程替代extension.sayHello命令的内容, 实现显示选中文本长度的演示功能:
```javascript
        var 编辑器 = vscode.window.activeTextEditor;
        if (!编辑器) {
            return; // 无打开的编辑器
        }
        
        var 选中部分 = 编辑器.selection;
        var 文本 = 编辑器.document.getText(选中部分);
        
        // 显示信息框
        vscode.window.showInformationMessage('选中字符数: ' + 文本.length);
```
运行Hello World结果:

![2017_12_04_运行]({{ "/assets/2017_12_04_vscode_run_extension.png" | absolute_url }})

顺便感受一下调试功能:

![2017_12_04_调试]({{ "/assets/2017_12_04_vscode_debug.png" | absolute_url }})
