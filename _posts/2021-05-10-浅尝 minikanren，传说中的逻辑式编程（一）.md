本机安装了 Chez Scheme 9.5，上次用还是[大前年](https://zhuanlan.zhihu.com/p/32642243)，白驹过隙啊。下载了 [The Reasoned Schemer 第二版代码](https://github.com/TheReasonedSchemer2ndEd/CodeFromTheReasonedSchemer2ndEd)，按首页的例程尝试如下：
```
> (run* 啥 (== '面 啥))
(面)
```
啥和面一样呢？就是“面”
```
> (run* q (*o (build-num 3) (build-num 4) q))
((0 0 1 1))
```
看看 build-num 啥意思先：
```
> (build-num 3)
(1 1)
> (build-num 4)
(0 0 1)
```
应该就是二进制，高位在后，（0 0 1 1）就是 12，那么 *o 就是乘法

看来 minikanren（下称“小关”，因为根据 wiki：The name kanren comes from a Japanese word (関連) meaning "relation". ）环境搭成了，下面走一遍 [minikanren 官网](http://minikanren.org/) 上的 [交互式入门](http://io.livecode.ch/learn/webyrd/webmk)。

```
> (fresh (甲 乙 丙) (== 甲 丙) (== 3 乙))
#<procedure at trs2-impl.scm:2941>
```
这里声明了：甲和丙相等、乙和 3 相等两个关系，但并未指定求啥。

```
> (run 1 (啥) (fresh (甲 乙 丙) (== 甲 丙) (== 3 乙)))
((_0))
```
这里“啥”并未与上面两个关系扯上联系，因此可以是任何值，表示为 _0。暂时不知那个 1 何用。也不知为何比教程里多了一层括号。

下面这样仍然求不得，因为乙是 3 但甲不知是几：

```
> (run 1 (啥) (fresh (甲 乙) (== 甲 啥) (== 3 乙)))
((_0))
```
下面这样就有值了，不过甲和丙相等这层关系实际上没用。
```
> (run 1 (啥) (fresh (甲 丙) (== 甲 丙) (== 3 啥)))
((3))
```
下面的关系就都用上了：
```
> (run 1 (啥) (fresh (甲 丙) (== 甲 丙) (== 3 丙) (== 啥 甲)))
((3))
```
这样的话，里面那层的 fresh 就没用：
```
> (run 1 (啥)
    (fresh (甲 啥)
      (== 4 甲)
      (== 甲 啥))
    (== 3 啥))
((3))
```
如果关系有矛盾的话，返回空：
```
> (run 1 (啥) (== 4 3))
()
> (run 1 (啥) (== 5 啥) (== 6 啥))
()
```
conde 让多套关系之一满足即可:
```
> (run 2 (啥)
    (fresh (某 甲 乙)
      (conde
        ((== `(,甲 ,某 ,甲) 啥)
         (== 乙 某))
        ((== `(,某 ,甲 ,某) 啥)
         (== 乙 某)))))
(((_0 _1 _0)) ((_0 _1 _0)))
```
0 和 1 是按 甲/某 的顺序指派的. 2 是指最多两个答案. 如果用 run*, 就没有上限, 但容易死循环, 如下:
```
> (run* (啥)
    (let 循环 ()
      (conde
        ((== #f 啥))
        ((== #t 啥))
        ((循环)))))
```
暂不明白这个 let 啥用, 如果改用 run 加指定答案上限数，应该就不会死循环了:
```
> (run 9 (啥)
    (let 循环 ()
      (conde
        ((== #f 啥))
        ((== #t 啥))
        ((循环)))))
```

居然还是死循环!? 开了 issue: https://github.com/webyrd/webmk/issues/4

今天先到此吧.