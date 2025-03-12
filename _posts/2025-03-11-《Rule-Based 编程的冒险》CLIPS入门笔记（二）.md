接 [上文](https://zhuanlan.zhihu.com/p/29319669682)。

由于重新启动 CLIPS IDE，之前的规则、模版、个体全部失效。于是重新声明了模版和个体。

## 查看事实

重复定义事实时，反馈已存在的事实id

```
CLIPS> (facts)
f-1     (物 (id 冒险家) (种类 主角) (位置 地牢北面))
f-2     (命令 (行动 向上 爬))
For a total of 2 facts.
CLIPS> (assert (命令 (行动 向上 爬)))
<Fact-2>
CLIPS> (agenda)
CLIPS> 
```

## 监控事实与议程的变化

省得需要 (facts) 和 (agenda) 自行比较

```
CLIPS> (watch facts)
CLIPS> (watch activations)
```

## 删除事实

按照id删除现有事实，再添加，id递增。但由于关闭环境后规则尚未添加，因此无行动触发。

<== 表示删除，==> 相反。

```
CLIPS> (retract 2)
<== f-2     (命令 (行动 向上 爬))
CLIPS> (assert (命令 (行动 向上 爬)))
==> f-3     (命令 (行动 向上 爬))
<Fact-3>
CLIPS> (run)
```

## 补上符合条件的规则

```
CLIPS> (defrule 逃不出
   (物 (id 冒险家)
         (位置 地牢北面))
   (命令 (行动 向上 爬))
   =>
   (println "墙太滑了。"))
==> Activation 0      逃不出: f-1,f-3
CLIPS> (run)
墙太滑了。
```

## 定义规则时，在行动时删去事实

当前，f-3的命令仍有效。?c 指向符合模式的事实，在规则的行动（actions）中对其删除（retract）。

```
CLIPS> (facts)
f-1     (物 (id 冒险家) (种类 主角) (位置 地牢北面))
f-3     (命令 (行动 向上 爬))
For a total of 2 facts.
CLIPS> (defrule 逃不出
   (物 (id 冒险家)
         (位置 地牢北面))
   ?c <- (命令 (行动 向上 爬))
   =>
   (retract ?c)
   (println "墙太滑了。"))
==> Activation 0      逃不出: f-1,f-3
CLIPS> (run)
<== f-3     (命令 (行动 向上 爬))
墙太滑了。
```

## 修改事实

对1号事实（事实不能命名的话，只能用id引用，易用性局限很大）进行modify。等同于先删除再添加，但保留同一id，并且可省去重复其他未变属性。

```
CLIPS> (defrule 地牢南面
   (物 (id 冒险家)
         (位置 地牢南面))
   =>
   (println "你在地牢南角。")
   (println "一大堆瓦砾从")
   (println "墙壁上垮了下来。"))
CLIPS> (modify 1 (位置 地牢南面))
<== f-1     (物 ... (位置 地牢北面))
==> f-1     (物 ... (位置 地牢南面))
==> Activation 0      地牢南面: f-1
<Fact-1>
CLIPS> (watch rules)
CLIPS> (run)
FIRE    1 地牢南面: f-1
你在地牢南角。
一大堆瓦砾从
墙壁上垮了下来。
```

## 尝试向上爬，但不在北面，不匹配之前条件

```
CLIPS> (assert (命令 (行动 向上 爬)))
==> f-4     (命令 (行动 向上 爬))
<Fact-4>
CLIPS> (matches 逃不出)
Matches for Pattern 1
 None
Matches for Pattern 2
f-4
Partial matches for CEs 1 - 2
 None
Activations
 None
(1 0 0)
```

## 属性支持多值匹配

修改规则（为何规则可以直接重写即覆盖但事实不行？）位置在北或南都匹配，类似的，命令 `向上 爬` 或 `向上 蛄蛹` 等价。

```
CLIPS> (defrule 逃不出
   (物 (id 冒险家)
         (位置 地牢北面 | 地牢南面))
   ?c <- (命令 (行动 向上 爬 | 蛄蛹))
   =>
   (retract ?c)
   (println "墙太滑了。"))
==> Activation 0      逃不出: f-1,f-4
CLIPS> (run)
FIRE    1 逃不出: f-1,f-4
<== f-4     (命令 (行动 向上 爬))
墙太滑了。
```

这个 | 语法的规则是，根据连续单词分组。比如 `向上 | 往上 | 朝上 爬 | 蛄蛹`，可读性一般。

## 支持南北间移动

添加两个规则。?c 也可中文化。由于昨天的 `地牢北面` 规则忘了重新声明，未触发剧情旁白。

```
CLIPS> (defrule 由北往南
   ?位 <- (物 (id 冒险家)
         (位置 地牢北面))
   ?令 <- (命令 (行动 向南 走))
   =>
   (retract ?令)
   (modify ?位 (位置 地牢南面)))
CLIPS> (defrule 由南往北
   ?位 <- (物 (id 冒险家)
         (位置 地牢南面))
   ?令 <- (命令 (行动 向北 走))
   =>
   (retract ?令)
   (modify ?位 (位置 地牢北面)))
CLIPS> (assert (命令 (行动 向北 走)))
==> f-5     (命令 (行动 向北 走))
==> Activation 0      由南往北: f-1,f-5
<Fact-5>
CLIPS> (run)
FIRE    1 由南往北: f-1,f-5
<== f-5     (命令 (行动 向北 走))
<== f-1     (物 ... (位置 地牢南面))
==> f-1     (物 ... (位置 地牢北面))
```

## 取否、并且

如果已在北还继续向北，则不会触发任何规则。新添一条：如果在北，而行动不是向南亦非向上，则显示走不了。

之后得将向上的指令改为 ‘向上 走’。

```
CLIPS> (assert (命令 (行动 向北 走)))
==> f-6     (命令 (行动 向北 走))
<Fact-6>
CLIPS> (defrule 无法继续向北
   (物 (id 冒险家)
      (位置 地牢北面))
   ?令 <- (命令 (行动 ~向南&~向上 走))
   =>
   (retract ?令)
   (println "走不了。"))
==> Activation 0      无法继续向北: f-1,f-6
CLIPS> (run)
FIRE    1 无法继续向北: f-1,f-6
<== f-6     (命令 (行动 向北 走))
走不了。
```

## 匹配条件矛盾

某些矛盾比如位置无法同时在北和在南会提示。

```
CLIPS> (defrule 无效
   (物 (id 冒险家)
      (位置 地牢南面&地牢北面))
   =>)

[RULECSTR1] Pattern #1 slot '位置' has constraint conflicts which make the pattern unmatchable.

ERROR:
(defrule MAIN::无效
   (物 (id 冒险家) (位置 地牢南面&地牢北面))
   =>)
```

【第二章完】

感觉对中文命名的支持相当不错。编程风格方面，对规则由事实触发（activation）后运行一次即失活这点还在适应中。另外，像雷同代码如 由北往南 和 由南往北 不知是否有方法简化。

## 常见报错

### 未定义模版（template）物
```
CLIPS> (assert (物 (id 冒险家)
               (种类 主角)
               (位置 地牢北面)))

[EXPRNPSR3] Missing function declaration for 'id'.
```
