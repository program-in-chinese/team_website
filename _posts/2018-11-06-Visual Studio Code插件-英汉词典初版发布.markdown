---
layout: post
comments: true
title:   Visual Studio Code插件-英汉词典初版发布
description: 实现VS code插件, 基于本地词典数据, 提供英汉翻译功能, 现仅支持单词和短语. Implement a vscode extension to translate English word or phrase to Chinese in source code.
date:   2018-11-06 00:00:00 -0700
categories: 命名 翻译
---

![2018-11-06-vscode插件发布]({{ "/assets/2018-11-06-vscode插件发布.png" | absolute_url }})

VS插件市场地址: [英汉词典 - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=CodeInChinese.EnglishChineseDictionary)

开源在: [program-in-chinese/vscode_english_chinese_dictionary](https://github.com/program-in-chinese/vscode_english_chinese_dictionary)

如题图, 在VS Code插件页中搜索"英汉词典", 即可安装. 之后如果继续开发相关插件, 也会以"中文编程"作者发布.

在编辑器中选中任何英文词/短语, 如果在词典中有匹配词条, 就在状态栏显示所有释义和词形. 为尽量确保状态条不会过长而被IDE自动隐藏, 当释义/词形过长时, 仅截取前半部分在状态栏显示, 点击状态可见所有信息(如简介中的演示). 如果原选中词查不到, 会查全小写, 若再查不到, 最后查全大写. 下面是查询短语:

![2018-11-06-vscode短语]({{ "/assets/2018-11-06-vscode短语.png" | absolute_url }})

作为在IDE中实现源码翻译的先行项目, 采用了浏览器插件-离线英汉词典 0.0.7类似方案. 参考了官网的状态栏例子, 开发过程比想象中的更短一些.

由于没有找到加载JSON文件的方法, 直接将浏览器插件中的JSON文件改为JS (40MB释义数据, 3MB词形变化数据), 仍在插件加载时载入所有数据, 本机也是几秒. 后续查词感觉没什么性能问题.

暂时想到的改进方向:

1. 由于源代码中的命名往往是驼峰或下划线格式, 而双击选中文本往往选中整个命名, 考虑翻译整个命名. 这与浏览器插件的此issue相关: [按照词性改进命名翻译 · Issue #9 · program-in-chinese/webextension_github_code_translator](https://github.com/program-in-chinese/webextension_github_code_translator/issues/9). (已实现: [VS Code英汉词典插件v0.0.4-驼峰下划线命名](https://zhuanlan.zhihu.com/p/49133480))
2. 在状态栏选取词义时, 选取代表性词义, 而不仅截取前部分(也已实现: . 比如"hide", 全部释义是`"n. 兽皮, 迹象, 躲藏处 vt. 藏, 隐瞒, 遮避, 剥...的皮, 隐藏 vi. 躲藏 [计] 隐藏"`. 状态栏现在显示:
```
n. 兽皮, 迹象, 躲藏处 vt. 藏, 隐瞒, 遮避,...
```
改成这样也许更合适:
```
n. 兽皮 vt. 藏 vi. 躲藏 [计] 隐藏 ...
```

最后照例贴段源码, 由于载入词典和查词部分与浏览器插件很接近, 只选取了IDE相关操作部分(监听选中文本事件, 根据文本进行查词). 代码还需加工.
```javascript
function activate(context) {
    const window = vscode.window;
    const StatusBarAlignment = vscode.StatusBarAlignment;
    const workspace = vscode.workspace;
    const commands = vscode.commands;

    const 状态框 = window.createStatusBarItem(StatusBarAlignment.Right, 100);
    状态框.command = 'extension.翻译选中文本';
    context.subscriptions.push(状态框);

    context.subscriptions.push(window.onDidChangeActiveTextEditor(e => 更新状态栏(状态框)));
    context.subscriptions.push(window.onDidChangeTextEditorSelection(e => 更新状态栏(状态框)));
    context.subscriptions.push(window.onDidChangeTextEditorViewColumn(e => 更新状态栏(状态框)));
    context.subscriptions.push(workspace.onDidOpenTextDocument(e => 更新状态栏(状态框)));
    context.subscriptions.push(workspace.onDidCloseTextDocument(e => 更新状态栏(状态框)));

    context.subscriptions.push(commands.registerCommand('extension.翻译选中文本', () => {
        // TODO: 避免重复查询(状态框查询一次即可?)
        let 文本 = 取选中文本();
        if (文本) {
            window.showInformationMessage(显示词条(查询词条(文本), 1000));
        }
    }));

    更新状态栏(状态框);
}

function 更新状态栏(状态框) {
    let 文本 = 取选中文本();
    if (文本) {
        状态框.text = '$(megaphone) ' + 显示词条(查询词条(文本), 30);
        状态框.show();
    } else {
        状态框.hide();
    }
}

function 取选中文本() {
    const 当前编辑器 = vscode.window.activeTextEditor;
    const 选中部分 = 当前编辑器.selection;
    return 当前编辑器.document.getText(选中部分);
}
```
欢迎尝鲜和反馈.

-----------------------

后续版本介绍:

[VS Code英汉词典v0.0.8: 批量翻译文件部分命名](https://zhuanlan.zhihu.com/p/53288297)

[VS Code英汉词典插件v0.0.7-尝试词性搭配](https://zhuanlan.zhihu.com/p/51525136)

[VS Code英汉词典插件v0.0.6-改为TS实现, 加测试](https://zhuanlan.zhihu.com/p/51243255)

[VS Code英汉词典插件v0.0.4-驼峰下划线命名](https://zhuanlan.zhihu.com/p/49133480)