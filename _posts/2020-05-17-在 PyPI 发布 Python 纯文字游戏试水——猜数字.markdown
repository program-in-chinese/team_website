
[PyPI 链接](https://pypi.org/project/demo-game-guess-number/)。运行`pip install demo-game-guess-number`安装后，在命令行下运行`猜数字`即进入交互游戏:
```
$ 猜数字
我想了个 100 之内的数，猜猜是几？
请猜吧:  40
太大了!
请猜吧: 20
太大了!
请猜吧: 5
太大了!
请猜吧: 1
中了!
```

主要代码蛮简单，就是个命令行，完整代码[在此](https://github.com/program-in-chinese/study/tree/master/1-%E5%9F%BA%E7%A1%80/%E5%B0%8F%E6%B8%B8%E6%88%8F)：
```python
class 猜数字(cmd.Cmd):
    intro = "我想了个 100 之内的数，猜猜是几？"
    想的 = random.randrange(100)
    prompt = '请猜吧: '

    def default(self, 行):
        数 = int(行)
        if 数 > self.想的:
            print("太大了!")
        elif 数 < self.想的:
            print("太小了!")
        else:
            print("中了!")
            self.do_quit(行)

    def do_quit(self, arg):
        sys.exit()
```

文字类游戏的发布渠道发现 ヾ(@^▽^@)ノ

## 备忘

打包与上传命令：
```
$ python3 setup.py sdist bdist_wheel
$ python3 -m twine upload --repository pypi dist/demo_game_guess_number-0.0.4*
```

`__init__.py`没有的话就不算个模块。