---
layout: post
comments: true
title:  "[转载] 中文輸進去，程式出得來，開發者發大財 - LingaScript: 中文化TypeScript"
description: 如何修改TypeScript使之支持繁簡中文語法.
date:   2019-03-14 00:00:00 -0700
categories: 语言设计
---

***原文在原创者(也是周蟒作者)博客: [中文輸進去，程式出得來，開發者發大財](https://blog.gasolin.idv.tw/2019/03/08/introducing_lingascript/)***

前陣子過年，終於得以抽出的一些時間，可以來嘗試一些不同的東西。

花了幾天查看 Typescript 程式碼，改寫了個可用繁/簡中文語法寫JS的轉譯器 [LingaScript](https://github.com/gasolin/lingascript/tree/master/src/tw)

使用它做了個「中文輸進去，程式出得來，開發者發大財」的中文程式影片範例，歡迎大家開心試用。

![2019-03-14-LingaScript演示]({{ "/assets/2019-03-14-LingaScript演示.gif" | absolute_url }})

### 如何做到的

這個專案脫胎自過去開發[周蟒](https://github.com/gasolin/zhpy)(Python + 中文語法)的經驗，並參考了 [CTS](https://github.com/program-in-chinese/CTS/) (Typescript + 中文語法)原始碼。

微軟主導開發的 Typescript 提供了分析 Typescript 語法，並可輸出成 Javascript 的轉譯器(src/compiler)。更棒的是因為 Visual Studio的開發工具中整合了 Typescript，而微軟為了讓 Visual Studio 中的所有編譯結果都有本地化語言輸出，也在 Typescript 中支援了本地化語言的命令行工具和錯誤輸出。

因此， ‵LingaScript‵ 目前所做的，是讓支援的中文語法可分析為對應的 symbol，並預設將命令行工具設成對應的本地化語言。如此一來就可以得到較完整的使用本地化語言的開發體驗。

![2019-03-14-LingaScript原理]({{ "/assets/2019-03-14-LingaScript原理.png" | absolute_url }})

因為看到 CTS 改版不易的問題，我使用自己開發，基於Google 提供的 diff-match-patch 包裝的 [file-patch](https://www.npmjs.com/package/file-patch) 工具，來對修改後的程式碼和 Typescript 原始碼做 diff/patch。‵LingaScript‵ 專案中保存了修改後的 compiler 相關檔案和 diff 檔。透過 patch 的方式更容易相容版本升級時的改動。

具體可以查看相關用到的命令 [https://github.com/gasolin/lingascript/blob/master/package.json#L14](https://github.com/gasolin/lingascript/blob/master/package.json#L14)

### 其他想法

‵LingaScript‵ 目前的架構不僅止於能支援繁簡中文語法，只要加上對應的關鍵字檔案，也可以很快地支援其他語種，讓開發者或講師得以用熟悉的語言來介紹並執行Javascript 相容的程式。

如果有興趣的話，歡迎前往 [https://github.com/gasolin/lingascript](https://github.com/gasolin/lingascript) 討論或提出想法。