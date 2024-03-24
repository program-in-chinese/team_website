因为博客聚合工具在线演示有些进展，打算对三年前联系过的博主回访。试用 CRM 工具作为联系管理工具，第一个挑了 Monday，无需用银行卡就可在线尝试。

## 用例涉及业务术语

原英文术语	| 中文对应	|
| ------- | ------- |
contact | 联系
name | 名称
type | 类型
Partner | 合作伙伴
Vendor | 供应商
Customer | 客户
Qualified lead | ？

## 涉及界面功能术语

原英文术语	| 中文对应	|
| ------- | ------- |
board | 白板
column | 列
delete/remove | 删除
new/add | 新添
table | 表格
cell | 单元格
right | 右侧
text | 文本
numbers | 数值
date | 日期
Trash | 垃圾箱
empty | 空
export | 导出
import | 导入
rename | 重命名
options | 选项
successfully | 成功
link | 链接

## 使用到的用例描述

### 新加联系(contact)
main table > new contact > 输入名 ditou.org, type 为 Partner/Vendor/Customer/Qualified lead

> 反馈：table 中新添一项

### 删除联系
main table > 某列左侧 ... > delete 

> 反馈：如果有其他表格有关（不一定引用该项），会提示警告。

> 成功：“deleting > deleted successfully”

### 新添列

表格的第二列开始的每列右侧 ... > add column to the right > 选择类型 Text/Numbers/Date 等

> 所见即所得

### 删除列

选中列头... > remove

> 会提示在垃圾箱（Trash）留30天；所见即所得

### 修改某格内容

选中该格 > 点该格右侧× 或者 选中内容删除 > 会自动提示该列的可能值, 可以从中选择, 也可手动填入新内容 (如留空? )

> 如果选择 contact 名(第一格), 留空会报错 “name can't be empty”

### 重命名列名

选中列头文字 'Text' > 改为 `仓库地址` /类型等2；或右键 > rename

> 所见即所得

### 复制单元格内容(复制issue链接)

选中格右键 > copy contact link 并不是复制内容，而是复制了此项联系的链接。> copy cell 才是复制内容。

> 无反馈

### 变动列位置

鼠标点中列头, 拖动到目标位置

> 所见即所得


### 导出

...(options) > More actions > Export to excel

可从表格拷贝到另一个csv格式文件

### 导入

...(options) > More actions > Import from file

选中 csv 导入后 > 选择哪一列作名 > 选择其他列的映射关系，期间随时可取消

在导入csv文件时，发现中文内容显示为乱码。
在其论坛 [发问](https://community.monday.com/t/importing-contacts-from-csv-file-with-unicode-charactors-but-shows-e-a-a/81034/3) 后，得到其工程师成员回应，未解决后望私信发测试文件，后让我向技术支持反映。

暂不打算继续试用。

## 界面设计随感

可以看到术语有一些不一致的情况，比如 delete/remove、new/add。某些操作的反馈缺失，比如复制单元格。界面相关术语多于业务相关的，对于简单用例来说，上手过程中主要精力会用于熟悉各功能在界面的位置。

CRM 平台研发的技术门槛貌似不高，也有相当的免费工具供选择，正是如此界面设计对用户的影响就更大。

## 附录：描述用例所用到的部分术语包括特殊含义的符号

'>'
输入
选择/选中
反馈
左侧
有关
引用
项
提示
警告
成功
所见即所得
点
内容
可能值
报错
改为
右键
鼠标
列头
拖动
目标
位置
文件
存为
格式
