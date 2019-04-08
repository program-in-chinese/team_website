---
layout: post
comments: true
title:  Java实现英汉词典API初版发布在Maven
description: 基于ECDICT词典数据, 开发一个Java库实现词典接口, 发布到Maven主库. Publish Java library to provide English-to-Chinese dictionary API on Maven Central.
date:   2018-09-06 00:00:00 -0700
categories: 命名 API 英汉词典
---

在打算[批量代码汉化工具 · Issue #86 · program-in-chinese/overview](https://github.com/program-in-chinese/overview/issues/86)时, 发现没有现成的Java库实现英汉查询功能. 于是开此项目.

源码库: [program-in-chinese/english-chinese-dictionary](https://github.com/program-in-chinese/english-chinese-dictionary)

API使用中文命名. 源码也是.

![2018-09-06 at 11.03.30 PM_java_ecdict_api]({{ "/assets/2018-09-06 at 11.03.30 PM_java_ecdict_api.png" | absolute_url }})

使用时在Maven项目中添加依赖:
```xml
<dependency>
  <groupId>com.codeinchinese</groupId>
  <artifactId>english-chinese-dictionary</artifactId>
  <version>0.0.1</version>
</dependency>
```
词典数据来源于[skywind3000/ECDICT](https://github.com/skywind3000/ECDICT). 77万个词条, 除不到2千词之外绝大多数有中文释义. 将这个词典数据(csv文件)封装的后果是这个jar包有22MB, 首次调用'查词'接口需要一段时间加载数据(本机测试十秒左右), 之后的查词是哈希表查询, 速度还能接受.

下面是返回词条数据结构:
```java
public class 词条 {

  public String 英文;
  public String 音标;
  public List<String> 英文释义;
  public List<String> 中文释义;
  public String 词语位置;
  public int 柯林斯星级;
  public boolean 为牛津三千核心词;

  // zk/中考，gk/高考，cet4/四级等
  public String 标签;

  // 如果为0, 无词频数据, 否则为正数
  public int 英国国家语料库词频顺序;
  public int 当代语料库词频顺序;

  public List<词形变化> 变形;
  public String 详细;
  public String 在线读音音频;
...
}
```
词形的几种变化:
```java
public enum 词形变化类型 {
  过去式("p"), // past tense
  过去分词("d"),
  现在分词("i"), // -ing
  第三人称单数("3"),
  形容词比较级("r"), // -er
  形容词最高级("t"), // -est
  名词复数形式("s"),
  原型("0"),
  原型变换形式("1");
...
}
```
接口定义很简单, 调用:
```java
英汉词典.查词("apple")
```
返回值打印输出(toString生成类JSON样式, 下同):
```json
{
英文: apple
音标: 'æpl
英文释义: n. fruit with red or yellow or green skin and sweet to tart crisp whitish flesh
n. native Eurasian tree widely cultivated in many varieties for its firm rounded edible fruits

中文释义: n. 苹果, 家伙
[医] 苹果

词语位置: 
柯林斯星级: 3
为牛津三千核心词: true
标签: zk gk
英国国家语料库词频顺序: 2446
当代语料库词频顺序: 2695
变形: 名词复数形式:apples; 
详细: 
在线读音音频: 
}
```
可以查出原型:
```json
{
英文: shopping
音标: 'ʃɒpiŋ
英文释义: n. searching for or buying goods or services
n. the commodities purchased from stores

中文释义: n. 买东西, 购物
[经] 购物, 买东西

词语位置: 
柯林斯星级: 3
为牛津三千核心词: true
标签: gk cet4 cet6 ielts
英国国家语料库词频顺序: 2763
当代语料库词频顺序: 2713
变形: 原型:shop; 原型变换形式:i; 现在分词:shopping; 
详细: 
在线读音音频: 
}
```
也有很多常见短语:
```json
{
英文: beat around the bush
音标: 
英文释义: 
中文释义: 转弯抹角, 旁敲侧击, 拖延谈及正题

词语位置: 
柯林斯星级: 0
为牛津三千核心词: false
标签: 
英国国家语料库词频顺序: 0
当代语料库词频顺序: 0
变形: 
详细: 
在线读音音频: 
}
```
其中释义部分只根据源数据格式说明中按行分拆, 并未进行进一步提取. 打算以后在实际使用中进行改进. 也许"n. 苹果, 家伙"提取为:
```json
{
词性: 名词
释义: ["苹果", "家伙"]
}
```
欢迎尝鲜.