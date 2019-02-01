---
layout: post
comments: true
title:   "VS Code创建自定义Python代码片段"
description: 在VS code中创建中文命名的Python3代码片段.
date:   2019-01-29 00:00:00 -0700
categories: 命名 vscode
---

续前文[\[日常\]Beyond的歌里最多是"唏嘘"吗? - Python分词+词频](https://zhuanlan.zhihu.com/p/55949416)最后的想法, 发现VS Code支持用户自定义代码片段: [Creating your own snippets in Visual Studio Code](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets)

尝试如下, 片段使用中文命名, 但前缀好像不能用中文(如果前缀设置为"文件", 在源码编辑时输入"文件"后没有自动补全弹窗), 应该与自动补全机制有关.

![2019-01-29-vscode代码模板]({{ "/assets/2019-01-29-vscode代码模板.gif" | absolute_url }})

片段定义:
```json
{
	"读文件": {
		"prefix": "file",
	 	"body": [
			"with open(${1:文件全路径}) as 文件:",
			"\t内容 = 文件.read()"
	 	],
	 	"description": "读取某文件"
	},
	"读所有文件": {
		"prefix": "file",
	 	"body": [
			"import os",
			"路径 = '.'",
			"for 文件名 in os.listdir(路径):",
			"\twith open(os.path.join(路径, 文件名)) as 文件:",
			"\t\t内容 = 文件.read()"
	 	],
	 	"description": "读取某目录下所有文件"
	}
}
```
下一步把这些片段打包成扩展: [Snippet Guide](https://code.visualstudio.com/api/language-extensions/snippet-guide)