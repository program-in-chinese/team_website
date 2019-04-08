---
layout: post
comments: true
title:  在Office的VBA代码里中文命名
description: 如题. Use Chinese naming in VBA code in office Excel software.
date:   2018-08-06 00:00:00 -0700
categories: 命名 VBA
---

在Excel处理数据时, 顺便试了一下VBA代码编辑器里输入中文, 结果显示为乱码. 查了一下发现VBA本身支持Unicode, 但需要设置系统配置使编辑器能够正常显示, 即设置简体中文为Current language for non-Unicode programs. 详见How to display foreign characters in Excel's Visual Basic Editor

在WPS 2016专业版(试用30天)中测试如下, 最简单的中文变量/方法名通过. 类似测试在Office Excel 2016也通过:

![2018_08_06_wpsOffice_unicode_ok]({{ "/assets/2018_08_06_wpsOffice_unicode_ok.png" | absolute_url }})

代码如下:
```basic
Sub 测试()
    Dim 问好 As String
    问好 = "吃了么?"
    Cells(1, 1) = 问好
End Sub
```

但似乎OpenOffice/LibreOffice并不支持Unicode命名, 运行时报错. 需在社区中求证:
![2018_08_06_openLibreOffice_unicode_vba_syntax_error]({{ "/assets/2018_08_06_openLibreOffice_unicode_vba_syntax_error.png" | absolute_url }})

它们还支持JavaScript/Python脚本, 但打开时总报JRE Required, 即使是新安装了jre8_u181之后. 未能继续深入.