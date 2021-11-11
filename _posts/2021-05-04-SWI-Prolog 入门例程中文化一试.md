逻辑编程没大玩过，折腾了一下。先试了 Mac，导入规则文件一直报错：
```
Thread 1 (main): foreign predicate system:win_set_preference/3 did not clear exception: 
	error(io_error(write,<stream>(0x6000003e9400)),context(system:win_set_preference/3,Encoding cannot represent character))
Thread 1 (main): foreign predicate system:ground/1 did not clear exception: 
	error(representation_error(encoding),context(system:file_base_name/2,Cannot represent char U793a using current locale encoding))
```
发现有在线编程环境：[SWISH -- SWI-Prolog for SHaring](https://swish.swi-prolog.org/?code=https://github.com/SWI-Prolog/swipl-devel/raw/master/demo/likes.pl&q=likes(sam,Food)).

参考 [入门教程](https://www.swi-prolog.org/pldoc/man?section=quickstart) 的 likes.pl 源码，尽量用中文命名标识符改写规则后（起名“F菜”是因为没大写首字母跑不了）：
```prolog
口味(小明,F菜) :-
    川(F菜),
    清淡(F菜).
口味(小明,F菜) :-
    中式(F菜).
口味(小明,F菜) :-
    西式(F菜).
口味(小明,大米).

川(尖椒牛肉).
川(开水白菜).

清淡(开水白菜).

中式(炒面).
中式(糖醋排骨).

西式(披萨).
```
查询小明爱吃啥：
```prolog
口味(小明,F菜).
```
输出结果：
```
F菜 = 开水白菜
F菜 = 炒面
F菜 = 糖醋排骨
F菜 = 披萨
F菜 = 大米
```
逻辑很简单，小明爱吃川菜并且清淡的——尖椒牛肉就被排除了，以及中式、西式的，还有大米。

Windows 下，需要 [开头加编码声明](https://www.swi-prolog.org/pldoc/man?section=intsrcfile) `:- encoding(utf8)`.否则报错:
```
    Syntax error: Operator expected
    ... Illegal multibyte Sequence
```
但开发环境中输入中文时有点错位，随手试试小代码也许还不如在线环境。。

就酱。

对了，它的平台支持除了三大桌面平台之外还有 Android 和 WASM。