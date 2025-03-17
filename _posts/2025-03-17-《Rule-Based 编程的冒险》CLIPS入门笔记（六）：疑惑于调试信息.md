
接[上文](https://zhuanlan.zhihu.com/p/30539558081)，继续第四章。另外，随着规则逐渐复杂，不知如何自动批量单元测试？

## 场景描述

类似对地点规则的事实化。

```
(deffacts 场景
   (物 (id 蘑菇)
          (位置 地牢北面)
          (种类 场景)
          (描述 "它已被压烂，我"
               "可别再摔一次。"))
   (物 (id 遗体)
          (位置 地牢北面)
          (种类 场景)
          (描述 "不用说，这些就是"
               "没被蘑菇接住的后果。"))
   (物 (id 废墟)
          (位置 地牢南面)
          (种类 场景)))
```

## 添加描述所见规则

模式匹配的部分很有点 sql 的感觉，类似 `select * from 物 where 物.位置 = 冒险家.位置 and 物.描述is not empty`。

```
(defrule 描述所见

   ;; 命令为 看 <物>

   ?令 <- (命令 (行动 看 ?id))

   ;; 获取冒险家所在位置

   (物 (id 冒险家)
       (位置 ?位置))

   ;; 【匹配条件三】该 id 对应物在冒险家所处位置 
   ;; 或者由冒险家拿着（这第二个条件之前没有）

   (物 (id ?id)
       (位置 ?位置 | 冒险家)
       (描述 $?文本))

   ;; 确认描述文本长度大于0

   (test (> (length$ ?文本) 0))

   =>

   ;; 照例删除已执行命令

   (retract ?令)

   ;; 逐行显示描述

   (foreach ?行 ?文本
      (println ?行)))
```

## 看无关紧要的物件

此规则与上面类似，【匹配条件三】改为描述为空：

```
   (物 (id ?id)
       (位置 ?位置 | 冒险家)
       (描述))
```

## 看不到

【匹配条件三】改为：
- 不存在该 id 或者 
- 该物不在冒险家所在位置 或者
- 该物不被冒险家拿着

```
(not (物 (id ?id)
         (位置 ?位置 | 冒险家)))
```

匹配条件的可读性随着复杂度增加而增加，尤其是特殊符号和Lisp风格的括号匹配很需要适应。

## 其他 predicate function

test 后除了 > 外还支持很多其他判断如：

```
CLIPS> (= 3 3.0)
TRUE
CLIPS> (<> 3 4)
TRUE
CLIPS> (eq 3 3.0)
FALSE
CLIPS> (floatp 3)
FALSE
```

## 设置断点

在触发对应规则前暂停：

```
CLIPS> (set-break 所见无关紧要)
CLIPS> (set-break 描述所见)
CLIPS> (set-break 看不到)
CLIPS> (show-breaks)
描述所见
所见无关紧要
看不到
CLIPS> (run)
被小妖抓住后，你被
丢进了巢穴的地牢里。

你在地牢北角。
有个巨型蘑菇。
地上横七竖八，
都是探险者的尸首。

> 看 蘑菇
Breaking on rule 描述所见.
```

## 规则匹配情况

```
CLIPS> (matches 描述所见)
Matches for Pattern 1
f-8
Matches for Pattern 2
f-2
Matches for Pattern 3
f-2
f-3
f-4
f-5
f-6
f-7
Partial matches for CEs 1 - 2
f-8,f-2
Partial matches for CEs 1 - 3
f-8,f-2,f-5
Activations
f-8,f-2,f-5
(8 2 1)
```

(8 2 1) 意思是，有 8 个匹配（1+1+6），2个部分匹配，一个触发。

这里有个疑问，为何第四个匹配条件 `(test (> (length$ ?文本) 0))` 没有列为 Pattern 4？按照如下事实：

```
CLIPS> (ppfact 2)
(物 
   (id 冒险家) 
   (种类 角色) 
   (位置 地牢北面) 
   (描述))
CLIPS> (ppfact 3)
(物 
   (id 地牢北面) 
   (种类 地点) 
   (位置 虚空) 
   (描述 "你在地牢北角。" "有个巨型蘑菇。" "地上横七竖八，" "都是探险者的尸首。"))
CLIPS> (ppfact 4)
(物 
   (id 地牢南面) 
   (种类 地点) 
   (位置 虚空) 
   (描述 "你在地牢南角。" "一大堆瓦砾从" "墙壁上垮了下来。"))
CLIPS> (ppfact 5)
(物 
   (id 蘑菇) 
   (种类 场景) 
   (位置 地牢北面) 
   (描述 "它已被压烂，我" "可别再摔一次。"))
CLIPS> (ppfact 6)
(物 
   (id 遗体) 
   (种类 场景) 
   (位置 地牢北面) 
   (描述 "不用说，这些就是" "没被蘑菇接住的后果。"))
CLIPS> (ppfact 7)
(物 
   (id 废墟) 
   (种类 场景) 
   (位置 地牢南面) 
   (描述))
```

照理说调试信息里还应有此项？

```
Matches for Pattern 4
f-3
f-4
f-5
f-6
```

## 相关事实检查

上面调试信息里用 f-x 指代各事实有点不方便调试，但如果展开估计又太过杂乱。

```
CLIPS> (ppfact 5)
(物 
   (id 蘑菇) 
   (种类 场景) 
   (位置 地牢北面) 
   (描述 "它已被压烂，我" "可别再摔一次。"))
CLIPS> (ppfact 8)
(命令 
   (行动 看 蘑菇))
CLIPS> (ppfact 2)
(物 
   (id 冒险家) 
   (种类 角色) 
   (位置 地牢北面) 
   (描述))
```

## 继续运行

```
CLIPS> (run)
它已被压烂，我
可别再摔一次。

```

## 看不到规则

```
> 看 精灵
Breaking on rule 看不到.
CLIPS> (matches 看不到)
Matches for Pattern 1
f-9
Matches for Pattern 2
f-2
Matches for Pattern 3
f-2
f-3
f-4
f-5
f-6
f-7
Partial matches for CEs 1 - 2
f-9,f-2
Partial matches for CEs 1 - 3
f-9,f-2,*
Activations
f-9,f-2,*
(8 2 1)
```

这里的第三个条件为何为*，书中解释：

> there are several facts matching the third pattern, but there isn't a thing fact with an id slot value of 精灵, so the 看不到 rule is activated by the absense of that fact. As is done for a rule with no conditions, the absence of a fact is shown in an activation using the * charactor

## 删除断点

```
CLIPS> (show-breaks)
描述所见
所见无关紧要
看不到
CLIPS> (remove-break 描述所见)
CLIPS> (show-breaks)
所见无关紧要
看不到
CLIPS> (remove-break)
CLIPS> (show-breaks)
CLIPS> 
```

## 常见报错

```
CLIPS> (floatq 3)

[EXPRNPSR3] Missing function declaration for 'floatq'.
```

【调试信息里的 test 对应 pattern，以及 not 条件的含义，还没想清楚，也许需回到第一章作些试验】
