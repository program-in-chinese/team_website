
在 [自己摸索](https://zhuanlan.zhihu.com/p/31196536807) 后，在 CLIPS 论坛提了问，通过以下例程得到确认，not conditional element 包含了 pattern conditional element。即模式不包括 not。而且没有输出规则的某个模式的调试命令：

```
CLIPS> (defrule 例规则
   (not (and (一)
             (二)
             (not (三))))
    =>)
CLIPS> (assert (一) (三))
<Fact-18>
CLIPS> (matches 例规则)
Matches for Pattern 1   <--- 对应 (一)
f-17
Matches for Pattern 2   <--- (二)
 None
Matches for Pattern 3   <---- (三)
f-18
Partial matches for CEs 1 - 2
 None
Partial matches for CEs 1 - 3
 None
Partial matches for CEs 1 (P1 - P3)
*
Activations
*
(2 1 1)
CLIPS> (facts)
f-17    (一)
f-18    (三)
For a total of 2 facts.
CLIPS> (ppdefrule 例规则)
(defrule MAIN::例规则
   (not (and (一)
             (二)
             (not (三))))
   =>)
```

## 事实化

继续重构路线部分，类似 [之前](https://zhuanlan.zhihu.com/p/30909201553) 将数据事实化：

```lisp
(deftemplate 路线
  (multislot 方向)
  (multislot 起点)
  (slot 终点 (default 虚空))
  (slot 受阻 (default FALSE))
  (slot 受阻反馈 (default "此路不通。")))

(deffacts 所有路线
   (路线 (方向 向南)
         (起点 地牢北面)
         (终点 地牢南面))
   (路线 (方向 向北)
         (起点 地牢南面)
         (终点 地牢北面))
   (路线 (方向 向上)
         (起点 地牢北面 地牢南面)
         (受阻 TRUE)
         (受阻反馈
            "墙太滑了。")))
```

## 对应规则

```lisp
(defrule 走得通

   ?令 <- (命令 (行动 ?方向 走))
   ?位 <- (物 (id 冒险家)
         (位置 ?位置))
   (路线 (方向 $? ?方向 $?)
         (起点 $? ?位置 $?)
         (终点 ?新位置)
         (受阻 FALSE))  <--- 未受阻

   =>
   (retract ?令)
   (modify ?位 (位置 ?新位置))
   (assert (命令 (行动 看))))

(defrule 走不通

   ?令 <- (命令 (行动 ?方向 走))
   ?位 <- (物 (id 冒险家)
                (位置 ?位置))

   (路线 (方向 $? ?方向 $?)
         (起点 $? ?位置 $?)
         (终点 ?新位置)
         (受阻 TRUE)   <-- 受阻，且有反馈
         (受阻反馈 ?文本))

   =>

   (retract ?令)
   (println ?文本))

(defrule 不是路

   ?令 <- (命令 (行动 ?方向 走))
   ?位 <- (物 (id 冒险家)
                (位置 ?位置))

   (not (路线 (方向 $? ?方向 $?)
             (起点 $? ?位置 $?)))

   =>

   (retract ?令)
   (println "没路。"))

(defrule 向上爬
   ?令 <- (命令 (行动 向上 爬))

   =>

   ;; 转换命令

   (modify ?令 (行动 向上 走)))
```

`$?` 含义暂未细看解释，实话是动力下降了。考虑直接跳到此书最后，看看森林先。

## 运行效果

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

> 向南 走
没路。

> 向上 爬
墙太滑了。

> 向上 走
墙太滑了。

> 退出
TRUE
```
