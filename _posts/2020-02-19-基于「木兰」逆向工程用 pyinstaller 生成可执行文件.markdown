---
layout: post
comments: true
title:  基于「木兰」逆向工程用 pyinstaller 生成可执行文件
description: 
date:   2020-02-19 00:05:00 -0700
categories:  木兰
---

### 技术验证

对单个文件：
```
pyinstaller -F print.py
```
生成`dist\print.exe`，可以拷贝到其他路径，正确运行。参考[文档](https://pyinstaller.readthedocs.io/en/stable/usage.html#what-to-generate)。

对于`printo`模块（可运行`python -m printo`），运行：
```
pyinstaller -F printo\__main__.py
```
生成`__main__.exe`文件，也可单独运行

### 木兰

必须首先安装模块 rply 和 codegen。再运行：
```
> pyinstaller -F --hiddenimport rply --hiddenimport codegen ulang\__main__.py
【中略】
26365 INFO: Appending archive to EXE D:\study\mulan\mulan_reverse\dist\__main__.exe
26380 INFO: Building EXE from EXE-00.toc completed successfully.
```

但，运行[积累的测试用例](https://github.com/MulanRevive/bounty/blob/master/%E6%B5%8B%E8%AF%95%E4%BB%A3%E7%A0%81/%E6%B5%8B%E8%AF%95.py)未能完全通过：
```
TypeError: required field "lineno" missing from stmt
通过： func_no_params.mulan
TypeError: object of type 'int' has no len()
通过： func_params.mulan
通过： break.mulan
通过： continue.mulan
通过： using_mulan_module.mulan
通过： using_python_module.mulan
通过： if.mulan
通过： if_else.mulan
通过： stmt_if_true.mulan
通过： stmt_if_false.mulan
通过： while.mulan
通过： loop.mulan
===================
失败： type.mulan 期望：b'Mulan' 实际：b''
失败： range.mulan 期望：b'012123-113' 实际：b'012123'
失败： for_colon.mulan 期望：b'6' 实际：b'0'
失败： for_in.mulan 期望：b'10' 实际：b'1'
失败： stmt_for_in.mulan 期望：b'3' 实际：b'0'
失败： stmt_for_colon.mulan 期望：b'5' 实际：b'0'
失败： if_elif.mulan 期望：b'1' 实际：b''
失败： if_elif_else.mulan 期望：b'3' 实际：b''
```

先[用的](https://github.com/MulanRevive/mulan/tree/31705846e538576c6fbe2754a919a07a86227600)并非原始的逆向工程，再试了[我修改之前的版本](https://github.com/MulanRevive/mulan/commit/fe5fefd38806e1955c236889f0e3eaf46df8c2f7)，仍然同样结果。

待深究。

不过至少构建过程初步走通。

也许要自己逆向一下。

相关内容在：[MulanRevive/bounty](https://github.com/MulanRevive/bounty/tree/master/%E6%B5%8B%E8%AF%95%E4%BB%A3%E7%A0%81/%E6%8E%A2%E7%B4%A2/%E6%9E%84%E5%BB%BA)
