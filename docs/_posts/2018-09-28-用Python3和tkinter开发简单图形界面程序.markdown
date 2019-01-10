---
layout: post
comments: true
title:  用Python3和tkinter开发简单图形界面程序
description: 用Python3和tkinter开发五笔编码编辑器. Create a wubi encoding editor using Python with Chinese naming.
date:   2018-09-28 00:00:00 -0700
categories: 命名 教程
---

![2018-09-28-wubi编码编辑器]({{ "/assets/2018-09-28-wubi编码编辑器.png" | absolute_url }})

源码库: [program-in-chinese/wubi_code_editor](https://github.com/program-in-chinese/wubi_code_editor)

起因在[这里](https://www.v2ex.com/t/490269). 由于此项目和汉字相关, 个人也想尝试Python的图形界面开发, 于是开始尝试.

遇到的一个坑. 用户测试时, 发现png图片加载不了, 后发现是由于tkinter版本问题: [Tkinter.PhotoImage doesn't not support png image](https://stackoverflow.com/questions/27599311/tkinter-photoimage-doesnt-not-support-png-image/34995365#34995365)

现在还处于原型状态, 两百多行代码都在一个文件中. 几个主要问题:

- 界面需要分离, 与界面无关的部分需要添加测试用例
- 文件路径只支持Linux/Mac, 还需支持Windows, 参考: [Python 3 Quick Tip: The easy way to deal with file paths on Windows, Mac and Linux](https://medium.com/@ageitgey/python-3-quick-tip-the-easy-way-to-deal-with-file-paths-on-windows-mac-and-linux-11a072b58d5f)
- 完善功能: 支持对缺失数据的添加, 按编码范围导出到不同文件([出处](https://github.com/CNMan/UnicodeCJK-WuBi/pull/2#issuecomment-424330083)); 按字搜索; 笔顺数据; [Unicode 编码区](https://github.com/CNMan/UnicodeCJK-WuBi/pull/3#issuecomment-425362635)
- 在VS code下开发, 还没使用测试/调试相关功能. 参考: [Python in Visual Studio Code](https://code.visualstudio.com/docs/languages/python)

源码节选:

读入csv源数据:
```python
    def 读入源数据文件(self, 文件名):
        # 官方文档参考: https://docs.python.org/3/library/csv.html#module-contents
        with open(文件名, newline='') as 源数据文件:
            源数据读取器 = csv.reader(源数据文件, delimiter=',')
            for 行 in 源数据读取器:
                self.字符列表.append(行)
```
导出csv文件:
```python
    def 导出文件(self):
        with open(常量_修改后文件, 'w', newline='') as 目标文件:
            写文件 = csv.writer(目标文件, delimiter=',')
            for 字符 in self.字符列表:
                写文件.writerow(字符)
        print("修改保存到: " + 常量_修改后文件)
```
创建图片显示:
```python
    # 显示图片, 参考: https://stackoverflow.com/questions/35024118/how-to-load-an-image-into-a-python-3-4-tkinter-window
    def 创建图片显示(self, 区域, 字体名, 位置):
        字体区 = Frame(区域)
        字体区.pack(side = 位置)
        字体提示 = Label(字体区, text = 字体名)
        字体提示.pack()
        图片路径 = 常量_图片主目录 + 常量_图片路径[字体名] + self.图片子路径
        print(图片路径)
        try:
            图片 = PhotoImage(file=图片路径)
        except:
            print("找不到图片")
            图片 = PhotoImage()
        图片显示 = Label(字体区, image=图片)
        图片显示.image = 图片
        图片显示.pack()
        return 图片显示
```
----------- 10/1/2018 更新 ------------

功能和重构基本完成. 还剩下一个问题"文件路径只支持Linux/Mac, 还需支持Windows", 由于题主只在Linux下使用, 暂不打算实现.

经过添加测试, 发现了几个bug.

承蒙题主宣传: [感谢 xuanwu 制作五笔编码编校软件 Python 版 - V2EX](https://www.v2ex.com/t/493732)

---------- 12/24/2018 更新 ----------

上个月题主提交了好几个PR, 很高兴看到原本的纯用户成为了合作者. 最近的[在国内原创开源项目中使用中文命名的意义与方式](https://zhuanlan.zhihu.com/p/53050766)一文也受了这个实例的启发.