---
layout: post
comments: true
title:  在PyPI测试平台发布Python包
description: 在PyPI测试平台发布Python包.
date:   2019-02-20 00:00:00 -0700
categories: 语言设计
---

参考[Packaging Python Projects](https://packaging.python.org/tutorials/packaging-projects/), 源码在[nobodxbodon/test-package-for-pypi](https://github.com/nobodxbodon/test-package-for-pypi)

`包名/__init__.py`:
```python
测试变量 = "值"
```
setup.py中
```python
import setuptools

with open("README.md", "r") as 自述文件:
    长描述 = 自述文件.read()

setuptools.setup(
    name="test-package-name",
    version="0.0.4",
    author="小名",
    author_email="author@example.com",
    description="描述",
    long_description=长描述,
    long_description_content_type="text/markdown",
    url="https://github.com/pypa/sampleproject",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
)
```
与编写Visual Studio Code插件初尝试类似, name只能用英文.

生成发布包
```
$ python3 -m pip install --user --upgrade setuptools wheel
$ python3 setup.py sdist bdist_wheel
```
上传到测试pypi平台
```
$ python3 -m pip install --user --upgrade twine
$ python3 -m twine upload --repository-url https://test.pypi.org/legacy/ dist/*
```
测试安装包. 今后最好用virtualenv
```
$ python3 -m pip install --index-url https://test.pypi.org/simple/ test-package-name
```
现在就可以导入包
```python
>>> import 包名
>>> 包名.测试变量
'值'
```
接下去需要将之前的扩展Python控制台同样打包并发布到(非测试)pypi平台, 但要先搞定开发模式(Packaging and distributing projects), 以及在命令行下调用控制台. 参考:

- 周蟒实现: [https://github.com/gasolin/zhpy/blob/master/zhpy2/setup.py#L44](https://github.com/gasolin/zhpy/blob/master/zhpy2/setup.py#L44)
- [How to package a command line Python script](https://stackoverflow.com/questions/1117041/how-to-package-a-command-line-python-script)