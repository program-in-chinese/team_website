接 [上文](https://zhuanlan.zhihu.com/p/30128666727)。

## 处理所有无法识别的命令

新添低优先级规则。

```
CLIPS> (watch facts)
CLIPS> (watch activations)
CLIPS> (assert (命令 (行动 向南 走)))
==> f-2     (命令 (行动 向南 走))
==> Activation 0      由北往南: f-1,f-2
<Fact-2>
CLIPS> (defrule 不明命令 
   (declare (salience -10))
   ?令 <- (命令)
   =>
   (println "不理解命令。")
   (retract ?令))
==> Activation -10    不明命令: f-2
CLIPS> (agenda)
0      由北往南: f-1,f-2
-10    不明命令: f-2
For a total of 2 activations.
```

## 运行可识别命令

f-2 删除时，`不明命令` 规则由于条件缺失而失活。

```
CLIPS> (watch rules)
CLIPS> (run)
FIRE    1 由北往南: f-1,f-2
<== f-2     (命令 (行动 向南 走))
<== Activation -10    不明命令: f-2
<== f-1     (物 ... (位置 地牢北面))
==> f-1     (物 ... (位置 地牢南面))
==> Activation 0      地牢南面: f-1
FIRE    2 地牢南面: f-1
你在地牢南角。
一大堆瓦砾从
墙壁上垮了下来。
```

## 运行不可识别命令

```
CLIPS> (assert (命令 (行动 攻击 小妖)))
==> f-3     (命令 (行动 攻击 小妖))
==> Activation -10    不明命令: f-3
<Fact-3>
CLIPS> (agenda)
-10    不明命令: f-3
For a total of 1 activation.
CLIPS> (run)
FIRE    1 不明命令: f-3
不理解命令。
<== f-3     (命令 (行动 攻击 小妖))
```

## 读取用户输入生成对应命令

通过读入一行指令、小写规整、字符串转为符号后，再将符号列表转换为命令事实。

```
CLIPS> (defrule 获取命令
   (declare (salience -10))
   (not (命令))
   =>
   (println)
   (print "> ")
   (bind ?用户输入 (explode$ (lowcase (readline))))
   (assert (命令 (行动 ?用户输入))))
==> Activation -10    获取命令: *
CLIPS> (agenda)
-10    获取命令: *
For a total of 1 activation.
CLIPS> (matches 获取命令)
Matches for Pattern 1
 None
Activations
*
(0 0 1)
```

## 测试该规则

指定最多执行一条规则。用户输入后可见新添命令事实 f-4，触发 `不明命令` 规则。

```
CLIPS> (run 1)
FIRE    1 获取命令: *

> 攻击 小妖
==> f-4     (命令 (行动 攻击 小妖))
==> Activation -10    不明命令: f-4
```

## 规则的匹配情况

两条条件相反的规则，在命令存在时，仅一条被触发。

```
CLIPS> (matches 不明命令)
Matches for Pattern 1
f-4
Activations
f-4
(1 0 1)
CLIPS> (matches 获取命令)
Matches for Pattern 1
f-4
Activations
 None
(1 0 0)
```

## 命令运行后继续获取

```
CLIPS> (run 1)
FIRE    1 不明命令: f-4
不理解命令。
<== f-4     (命令 (行动 攻击 小妖))
==> Activation -10    获取命令: *
CLIPS> (agenda)
-10    获取命令: *
For a total of 1 activation.
```

如果运行 run，则会进入无尽循环获取命令。

## 退出命令

在 CLIPS IDE 中，万一遇到规则无尽循环，还可用 Halt Rules 中止。于是新添此命令。

```
CLIPS> (defrule 退出
   ?c <- (命令 (行动 退出))
   =>
   (retract ?c)
   (halt))
```

## 运行退出

退出后，已触发的规则仍在议程中，可继续运行。

```
CLIPS> (run)
FIRE    1 获取命令: *

> 退出
==> f-5     (命令 (行动 退出))
==> Activation 0      退出: f-5
==> Activation -10    不明命令: f-5
FIRE    2 退出: f-5
<== f-5     (命令 (行动 退出))
<== Activation -10    不明命令: f-5
==> Activation -10    获取命令: *
[PRCCODE4] WARNING: Execution halted during the actions of defrule '退出'.
CLIPS> (agenda)
-10    获取命令: *
For a total of 1 activation.
```

## 完整运行效果

将新添的规则加入 kernel.clp 重新加载运行如下：

```
CLIPS> (batch* runq.bat)
被小妖抓住后，你被
丢进了巢穴的地牢里。

你在地牢北角。
有个巨型蘑菇。
地上横七竖八，
都是探险者的尸首。

> 向南 走
你在地牢南角。
一大堆瓦砾从
墙壁上垮了下来。

> 向上 走
墙太滑了。

> 退出
TRUE
```

## 看东西

新添规则：

```
CLIPS> (defrule 看蘑菇
   ?令 <- (命令 (行动 看 蘑菇))
   (物 (id 冒险家)
       (位置 地牢北面))
   =>
   (retract ?令)
   (println "它已被压烂，我")
   (println "可别再掉一次。"))  
CLIPS> (defrule 看遗体
   ?令 <- (命令 (行动 看 遗体))
   (物 (id 冒险家)
       (位置 地牢北面))
   =>
   (retract ?令)
   (println "不用说，这些就是")
   (println "没被它接住的后果。"))
```

## 运行效果

续前，继续运行。

```
CLIPS> (run)

> 向北 走
你在地牢北角。
有个巨型蘑菇。
地上横七竖八，
都是探险者的尸首。

> 看 蘑菇
它已被压烂，我
可别再掉一次。

> 看 遗体
不用说，这些就是
没被它接住的后果。

> 退出
```

## 看别处

暂时不识别别处：

```
CLIPS> (run)

> 看 墙
不理解命令。

> 退出
```

新添规则，匹配 `看 xxx` 格式的命令，优先级高于 `不明命令`。测试：

```
CLIPS> (defrule 看其他
   (declare (salience -5))
   ?令 <- (命令 (行动 看 ?))
   =>
   (retract ?令)
   (println "没什么特别的。"))
CLIPS> (run)

> 看 墙
没什么特别的。

> 退出
```

【第三章完】