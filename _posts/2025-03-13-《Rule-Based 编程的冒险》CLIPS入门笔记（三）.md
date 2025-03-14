接 [上文](https://zhuanlan.zhihu.com/p/29862551017)。开始第三章，源码文件组织。

## 中文化后例程文件（utf8编码）

### definition.clp

```
(deftemplate 物
   (slot id)
   (slot 种类)
   (slot 位置))

(deftemplate 命令
   (multislot 行动))
```

### game.clp

```
;;; ***************
;;; Adventure Start
;;; ***************

(defrule 旁白
   =>
   (println "被小妖抓住后，你被")
   (println "丢进了巢穴的地牢里。"))

;;; **************
;;; Location Rules
;;; **************

(defrule 地牢北面
   (物 (id 冒险家)
       (位置 地牢北面))
   =>
   (println "你在地牢北角。")
   (println "有个巨型蘑菇。")
   (println "地上横七竖八，")
   (println "都是探险者的尸首。"))

(defrule 地牢南面
   (物 (id 冒险家)
         (位置 地牢南面))
   =>
   (println "你在地牢南角。")
   (println "一大堆瓦砾从")
   (println "墙壁上垮了下来。"))
   
;;; **************
;;; Movement Rules
;;; **************

(defrule 由北往南
   ?位 <- (物 (id 冒险家)
         (位置 地牢北面))
   ?令 <- (命令 (行动 向南 走))
   =>
   (retract ?令)
   (modify ?位 (位置 地牢南面)))

(defrule 由南往北
   ?位 <- (物 (id 冒险家)
         (位置 地牢南面))
   ?令 <- (命令 (行动 向北 走))
   =>
   (retract ?令)
   (modify ?位 (位置 地牢北面)))

(defrule 从北无法行进
   (物 (id 冒险家)
      (位置 地牢北面))
   ?令 <- (命令 (行动 ~向南&~向上 走))
   =>
   (retract ?令)
   (println "走不了。"))

(defrule 从南无法行进
   (物 (id 冒险家)
      (位置 地牢南面))
   ?令 <- (命令 (行动 ~向北&~向上 走))
   =>
   (retract ?令)
   (println "走不了。"))

(defrule 逃不出
   (物 (id 冒险家)
         (位置 地牢北面 | 地牢南面))
   ?c <- (命令 (行动 向上 走 | 爬))
   =>
   (retract ?c)
   (println "墙太滑了。"))
```

分号用来标明注释，这也与 Lisp 类似。而且作者还沿用了根据层次决定分号数量的风格。

## 加载源码文件

需在 CLIPS IDE 设置当前目录，或者 load 文件路径。另两个文件为空。

```
CLIPS> (unwatch all)
CLIPS> (clear)
CLIPS> (load definitions.clp)
%%
TRUE
CLIPS> (load data.clp)

TRUE
CLIPS> (load kernel.clp)

TRUE
CLIPS> (load game.clp)
********
TRUE
CLIPS> (run)
Captured by goblins, you've been
tossed in a pit at their lair.
CLIPS> (reset)
CLIPS> (run)
Captured by goblins, you've been
tossed in a pit at their lair.
```

reset 与 clear 的区别微妙，不如 unwatch all 那么易读。但 clear facts and rules with no condition 又太长。更重要的是，完全没有反馈信息，无法直接看到运行效果。另外，输出的 %% 和 ******** 不知从何而来。

## 指令写入批处理文件

将这些指令写到 loadq.bat （bat文件名大概就源自batch？）中，并且后面加 * 以隐藏输出。

```
(unwatch all)
(clear)
(load* definitions.clp)
(load* kernel.clp)
(load* data.clp)
(load* game.clp)
(reset)

```

留意最后一个空行，是为了 (reset) 后需要回车以执行，这点比较费神。

继续嵌套，`静默运行.bat`：
```
(batch* loadq.bat)
(run)

```

运行单指令即得输出：

```
CLIPS> (batch* 静默运行.bat)
被小妖抓住后，你被
丢进了巢穴的地牢里。
TRUE
```

## reset 后位置事实会清除

即便之前有 assert。

```
CLIPS> (reset)
CLIPS> (facts)
CLIPS> (agenda)
0      旁白: *
For a total of 1 activation.
```

## 定义由 reset 触发的事实声明

果然有 deffacts，命名用复数因为可跟几条事实。

```
CLIPS> (deffacts 玩家
   (物 (id 冒险家)
               (种类 主角)
               (位置 地牢北面)))
CLIPS> (watch facts)
CLIPS> (reset)
==> f-1     (物 (id 冒险家) (种类 主角) (位置 地牢北面))
CLIPS> (agenda)
0      地牢北面: f-1
0      旁白: *
For a total of 2 activations.
CLIPS> (run)
你在地牢北角。
有个巨型蘑菇。
地上横七竖八，
都是探险者的尸首。
被小妖抓住后，你被
丢进了巢穴的地牢里。
```

从议程输出和运行结果可见旁白顺序颠倒了。

## 规则执行优先级

salience 范围 -10000 到 10000。越高则越优先。默认为 0，如相同则由触发规则的事实先后决定，越后发生的优先。

```
CLIPS> (defrule 旁白
   (declare (salience 10))
   =>
   (println "被小妖抓住后，你被")
   (println "丢进了巢穴的地牢里。")
   (println))
```

## reset 重置触发

为何删除时 `<== Activation 10     旁白: *` 的优先级是 10？

```
CLIPS> (watch activations)
CLIPS> (reset)
<== Activation 10     旁白: *
<== f-1     (物 (id 冒险家) (种类 主角) (位置 地牢北面))
==> Activation 10     旁白: *
==> f-1     (物 (id 冒险家) (种类 主角) (位置 地牢北面))
==> Activation 0      地牢北面: f-1
```

尝试重新设置优先级后，看起来 defrule 后就改了：

```
CLIPS> (defrule 旁白
   (declare (salience 20))
   =>
   (println "被小妖抓住后，你被")
   (println "丢进了巢穴的地牢里。")
   (println))
==> Activation 20     旁白: *
```

## 议程里优先级高的在先

规则复杂了之后，调试是个挑战。

```
CLIPS> (agenda)
10     旁白: *
0      地牢北面: f-1
For a total of 2 activations.
CLIPS> (run)
被小妖抓住后，你被
丢进了巢穴的地牢里。

你在地牢北角。
有个巨型蘑菇。
地上横七竖八，
都是探险者的尸首。
```

## 常见报错

### 加载源码文件出错定位

比如：

```
CLIPS> (batch* runq.bat)

[PRNTUTIL2] game.clp, Line 6: Syntax Error:  Check appropriate syntax for defrule.

ERROR:
(defrule MAIN::旁白
   =
TRUE
```

【待续】