[CodeinChinese](http://codeinchinese.com/)网站源码. 欢迎提交PR

安装[Jekyll](https://jekyllrb.com/)后, 在目录下本地运行:
```
$ bundle exec jekyll serve
```

遇到问题`bundler: command not found: jekyll`解决方法:
```
$ rvm install ruby
```

如报错:
```
$ bundle exec jekyll serve


$ bundle exec jekyll serve
Could not find public_suffix-3.0.0 in any of the sources
Run `bundle install` to install missing gems.
```
解决方法:
```
$ gem install jekyll bundler
```