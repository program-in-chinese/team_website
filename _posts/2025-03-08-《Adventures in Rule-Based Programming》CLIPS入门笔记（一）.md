该书在逐渐实现一个文本冒险游戏的过程中介绍 CLIPS 规则编程语言工具。本笔记将 [官网](https://clipsrules.net/airbp.html) 的例程源码中文化，在 mac 上安装 CLIPS 环境运行，也支持 Windows、Linux。此为第二章上部。

## 定义无条件规则

无条件显示旁白，规则直接排入议程。无需任何条件，运行即触发。规则运行后，议程为空。

```
         CLIPS (6.4 2/9/21)
CLIPS> (defrule 旁白
   =>
   (println "被小妖抓住后，你被")
   (println "丢进了巢穴的地牢里。"))
CLIPS> (agenda)
0      旁白: *
For a total of 1 activation.
CLIPS> (run)
被小妖抓住后，你被
丢进了巢穴的地牢里。
CLIPS> (agenda)
CLIPS> 
```

语法还是 LISP 风格如下，不知名字里的 LIPS 是否也有此含义。

```
CLIPS> (+ 3 19)
22
CLIPS> (< 3 (- 4 2))
FALSE
```

## 定义模版和事实

template 和 fact 类似于类型和个体，slot类似于属性。定义后可查询当前事实。不知语法设计时为何不用 deffact 而是 assert。

```
CLIPS> (deftemplate 物
   (slot id)
   (slot 种类)
   (slot 位置))
CLIPS> (assert (物 (id 冒险家)
               (种类 主角)
               (位置 地牢北面)))
<Fact-1>
CLIPS> (facts)
f-1     (物 (id 冒险家) (种类 主角) (位置 地牢北面))
For a total of 1 fact.
CLIPS> (ppfact 1)
(物 
   (id 冒险家) 
   (种类 主角) 
   (位置 地牢北面))
```

像 `<Fact-1>` 和 f-1，很有上世纪的反馈信息风味。


## 定义条件规则

规则的条件可包含多个 Conditional Elements (CE)。此为模式（pattern）条件元素，即匹配某些模版属性。如果冒险家在地牢北面，则输出。规则名与位置名可相同。

```
CLIPS> (defrule 地牢北面
   (物 (id 冒险家)
       (位置 地牢北面))
   =>
   (println "你在地牢北角。")
   (println "有个巨型蘑菇。")
   (println "地上横七竖八，")
   (println "都是探险者的尸首。"))
CLIPS> (agenda)
0      地牢北面: f-1
For a total of 1 activation.
CLIPS> (run)
你在地牢北角。
有个巨型蘑菇。
地上横七竖八，
都是探险者的尸首。
CLIPS> (agenda)
CLIPS> 
```

## 模版包含多词属性；多条件规则

`行动` 支持以空格分隔的多个词如‘向上 爬’。`逃不出` 需两个条件触发。当前条件未完全符合，未排入议程。

```
CLIPS> (deftemplate 命令
   (multislot 行动))
CLIPS> (defrule 逃不出
   (物 (id 冒险家)
         (位置 地牢北面))
   (命令 (行动 向上 爬))
   =>
   (println "墙太滑了。"))
CLIPS> (agenda)
CLIPS> 
```

## 检查规则匹配条件的情况

反馈信息可读性很值得改进。满足条件的 f-1 即 `地牢北面`。CE 即 Conditional Element。加选项可略去细节，否则条件复杂时输出庞杂。

```
CLIPS> (matches 逃不出)
Matches for Pattern 1
f-1
Matches for Pattern 2
 None
Partial matches for CEs 1 - 2
 None
Activations
 None
(1 0 0)
CLIPS> (matches 逃不出 succinct)
Pattern 1: 1
Pattern 2: 0
CEs 1 - 2: 0
Activations: 0
(1 0 0)
CLIPS> (matches 逃不出 terse)
(1 0 0)
```

## 添加事实后触发规则

```
CLIPS> (assert (命令 (行动 向上 爬)))
<Fact-2>
CLIPS> (matches 逃不出)
Matches for Pattern 1
f-1
Matches for Pattern 2
f-2
Partial matches for CEs 1 - 2
f-1,f-2
Activations
f-1,f-2
(2 1 1)
CLIPS> (agenda)
0      逃不出: f-1,f-2
For a total of 1 activation.
CLIPS> (run)
墙太滑了。
```

## 条件满足但规则已运行

议程为空。

```
CLIPS> (matches 逃不出)
Matches for Pattern 1
f-1
Matches for Pattern 2
f-2
Partial matches for CEs 1 - 2
f-1,f-2
Activations
 None
(2 1 0)
CLIPS> (agenda)
CLIPS> 
```

## 常见报错

### 不允许此命名

```
CLIPS> (deftemplate 123
   (slot id)
   (slot category)
   (slot location))

[CSTRCPSR2] Missing name for deftemplate construct.

ERROR:
(deftemplate 123
```

### 同名模版在使用中

```
CLIPS> (deftemplate 物
   (slot id)
   (slot 种类)
   (slot 位置))

[CSTRCPSR4] Cannot redefine deftemplate '物' while it is in use.

ERROR:
(deftemplate MAIN::物
```

### slot 仅支持单词，多词需用 multislot

```
CLIPS> (deftemplate 命令
   (slot 行动))
CLIPS> (defrule 逃不出
   (物 (id 冒险家)
         (位置 地牢北面))
   (命令 (行动 climb up))
   =>
   (println "The walls are too slick."))

[PRNTUTIL2] Syntax Error:  Check appropriate syntax for deftemplate patterns.

ERROR:
(defrule MAIN::逃不出
   (物 (id 冒险家) (位置 地牢北面))
   (命令 (行动 climb up
```
