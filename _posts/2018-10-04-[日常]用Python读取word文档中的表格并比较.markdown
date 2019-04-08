---
layout: post
comments: true
title:  "[日常]用Python读取word文档中的表格并比较"
description: 用Python3读取word文档中的表格并比较. Create a wubi encoding editor using Python with Chinese naming.
date:   2018-10-04 00:00:00 -0700
categories: 命名 教程
---

最近想对某些word文档(docx)的表格内容作比较, 于是找了一下相关工具. 参考[Automate the Boring Stuff with Python](http://automatetheboringstuff.com/chapter13/)中的word部分, 试用了[python-docx - python-docx 0.8.7 documentation](https://python-docx.readthedocs.io/en/latest/)

演示如下. 两个简单的word文档, 各有一个表格:

![2018-10-04-docx_单列表比较]({{ "/assets/2018-10-04-docx_单列表比较.png" | absolute_url }})

读取文档中的表格到列表(为演示只对单列表格操作):
```python
import docx

def 取表格(文件名):
  文件 = docx.Document(文件名)
  首个表 = 文件.tables[0]
  值 = []
  for 行 in 首个表.rows:
    for 格 in 行.cells:
      值.append(格.text)
  print(文件名 + " -> " + str(值))
  return 值
    
表1 = 取表格('表1.docx')
```
读取结果:
```
表1.docx -> ['值1', '值2', '值3']
```
接着找到这个做比较的python库[seperman/deepdiff](https://github.com/seperman/deepdiff), 来源: [Get difference between two lists](https://stackoverflow.com/questions/3462143/get-difference-between-two-lists/26079411#26079411)
```python
from deepdiff import DeepDiff

表1 = 取表格('表1.docx')
表2 = 取表格('表2.docx')

print(DeepDiff(表1, 表2))
```
输出结果(为更可读, 已手动格式化):
```
{
'values_changed': 
  {'root[1]': 
    {'new_value': '值2.5', 'old_value': '值2'}
  }, 
'iterable_item_added': 
  {'root[3]': '值4'}
}
```
显示了修改的值和添加的值, 还挺好用. 实际的表格是两列, 需要按照某个键值作对比. 于是用字典, 正好DeepDiff也提供两个字典间的比较. 双列表文件演示:

![2018-10-04-docx_双列表比较]({{ "/assets/2018-10-04-docx_双列表比较.png" | absolute_url }})

读取双列表到字典后, 进行比较:
```python
import docx
from deepdiff import DeepDiff
from pprint import pprint

def 取表格(文件名):
  文件 = docx.Document(文件名)
  首个表 = 文件.tables[0]
  值 = {}
  for 行 in 首个表.rows:
    格 = 行.cells
    值[格[0].text] = 格[1].text
  print(文件名 + " -> " + str(值))
  return 值

表1 = 取表格('双列表1.docx')
表2 = 取表格('双列表2.docx')

pprint(DeepDiff(表1, 表2), indent=2)
```
输出如下:
```
{ 'dictionary_item_added': {"root['键3']"},
  'values_changed': {"root['键2']": {'new_value': '值2.5', 'old_value': '值2'}}}
```
源码在: [program-in-chinese/house_of_10000_business](https://github.com/program-in-chinese/house_of_10000_business/tree/master/word%E6%96%87%E6%A1%A3%E7%9B%B8%E5%85%B3)