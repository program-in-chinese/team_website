
[早先](https://zhuanlan.zhihu.com/p/29862551017) 想到“雷同代码如 由北往南 和 由南往北 不知是否有方法简化”。第四章就开始对规则进行重构。

## 规则转变为事实

类似于数据化。

```
(deffacts 所有地点
   (物 (id 地牢北面)
          (种类 地点)
          (描述
             "你在地牢北角。"
             "有个巨型蘑菇。"
             "地上横七竖八，"
             "都是探险者的尸首。"))
   (物 (id 地牢南面)
          (种类 地点)
          (描述 
             "你在地牢南角。"
             "一大堆瓦砾从"
             "墙壁上垮了下来。")))
```

## 对应模版修改

```
(deftemplate  物
   (slot id)
   (slot 种类
      (allowed-values 地点 物品 角色 场景))
   (slot 位置
      (default 虚空))
   (multislot 描述))
```

## 显示地点详情

这里加了个条件，即需要 看 命令。


```
(defrule 显示地点

   ;; 需要命令 看 

   ?令 <- (命令 (行动 看))

   ;; 冒险家 位于某位置

   (物 (id 冒险家)
       (位置 ?位置))

   ;; 根据id获取位置

   (物 (id ?位置) 
      (种类 地点)
      (描述 $?文本))  ; $?开头的为多域（multifield）变量

   =>
   (retract ?令)

   ;; 显示命令结果
   
   (foreach ?行 ?文本
      (println ?行)))
```

## 初试效果

可见虽然到了地牢北面，但并未显示描述。

```
CLIPS> (batch* loadq.bat)
TRUE
CLIPS> (facts)
f-1     (物 (id 冒险家) (种类 角色) (位置 地牢北面) (描述))
f-2     (物 (id 地牢北面) (种类 地点) (位置 虚空) (描述 "你在地牢北角。" "有个巨型蘑菇。" "地上横七竖八，" "都是探险者的尸首。"))
f-3     (物 (id 地牢南面) (种类 地点) (位置 虚空) (描述 "你在地牢南角。" "一大堆瓦砾从" "墙壁上垮了下来。"))
For a total of 3 facts.
CLIPS> (agenda)
10     旁白: *
-10    获取命令: *
For a total of 2 activations.
CLIPS> (run)
被小妖抓住后，你被
丢进了巢穴的地牢里。


```

## 添加初始命令

```
(deffacts 初始状态
   (命令 (行动 看)))
```

重新加载：

```
CLIPS> (batch* loadq.bat)
TRUE
CLIPS> (facts)
f-1     (命令 (行动 看))
f-2     (物 (id 冒险家) (种类 角色) (位置 地牢北面) (描述))
f-3     (物 (id 地牢北面) (种类 地点) (位置 虚空) (描述 "你在地牢北角。" "有个巨型蘑菇。" "地上横七竖八，" "都是探险者的尸首。"))
f-4     (物 (id 地牢南面) (种类 地点) (位置 虚空) (描述 "你在地牢南角。" "一大堆瓦砾从" "墙壁上垮了下来。"))
For a total of 4 facts.
CLIPS> (agenda)
10     旁白: *
0      显示地点: f-1,f-2,f-3
-10    不明命令: f-1
For a total of 3 activations.
CLIPS> (matches 显示地点)
Matches for Pattern 1
f-1
Matches for Pattern 2
f-2
Matches for Pattern 3
f-3
f-4
Partial matches for CEs 1 - 2
f-1,f-2
Partial matches for CEs 1 - 3
f-1,f-2,f-3
Activations
f-1,f-2,f-3
(4 2 1)
```

## 遗留问题

虽然显示了地牢北面的描述：

```
CLIPS> (run)
被小妖抓住后，你被
丢进了巢穴的地牢里。

你在地牢北角。
有个巨型蘑菇。
地上横七竖八，
都是探险者的尸首。

> 向南 走

> 退出
```

但向南后的描述未见。估计还是因为缺失 看 命令。

【待续，之后要对一系列 `看 xxx` 进行重构，并解决此遗留问题】
