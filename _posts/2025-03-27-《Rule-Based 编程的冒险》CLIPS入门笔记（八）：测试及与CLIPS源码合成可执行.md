
如 [上文](https://zhuanlan.zhihu.com/p/1888591198966485493) 打算，直接跳到最后第八章，代码量从第四章的 340 到一千行左右。不细看实现，仅对开发流程作一笔记。

## 测试

批命令输出到文件后，对比期望输出确认相同。

```
CLIPS> (batch "northpit.bat")
TRUE
CLIPS> (run)
Captured by goblins, you've been
tossed in a pit at their lair.

You're at the pit's north end.
A giant mushroom is here. The
ground is littered with the
bodies of dead adventurers.

> look at mushroom
It's squished. I wouldn't
try landing on it again.

> look at bodies
Apparently this is what happens
when you miss the mushroom.

> go up
The walls are too slick.

> quit
CLIPS> (dribble-off)
TRUE
```

## 保存中间状态

交互退出时保存当前所有事实：`(bsave-facts "game.fct" visible)`；开始时 bload-facts。

这个 b 前缀不知何意，batch 缩写？

## 导出业务逻辑

将所有规则等导出到二进制文件，在可执行文件启动时加载。

```
(batch* loadq.bat)
(bsave escape.bin)
```

## 和c代码集成

Chapter8B 的 source 下是 CLIPS 的源码，在此基础上集成。这点挺独特的！

新添一个入口代码 adventure.c，其中加载二进制导出文件 `Bload(theEnv,"escape.bin")`。

将原本 CLIPS（为确认，用最新的 6.4.2 版本源码复现了一遍）的 makefile 添加几项相关。基本就是把编译 CLIPS 时的入口 main 改为了 adventure：

```
all: game

game : CC = gcc
game : CFLAGS = -std=c99 -O0 -g
game : LDLIBS = -lm
game : adventure

...
adventure : adventure.o libclips.a
	$(CC) -o escape adventure.o -L. -lclips $(LDLIBS)
	
adventure.o: adventure.c 【后同main.o部分】
```

make后，将 escape 拷贝到 escape.bin 所在目录。运行 ./escape。修改了部分源码包括中文化标识符以确认有效：

```
./escape
被小妖抓住后，你被
丢进了巢穴的地牢里。

You're at the pit's north end.
A giant mushroom is here. The
ground is littered with the
bodies of dead adventurers.

> go south
You're at the pit's south end.
A large pile of rubble has
collapsed from the wall above.
```

## 接下来

用 CLIPS 改写 [生态模拟](https://www.zhihu.com/question/324139125/answer/104602791942) 体会一下。
