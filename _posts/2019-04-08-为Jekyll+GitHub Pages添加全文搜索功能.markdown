---
layout: post
comments: true
title:  为Jekyll+GitHub Pages添加全文搜索功能
description: 为Jekyll+GitHub Pages添加全文搜索功能
date:   2019-04-08 00:00:00 -0700
categories: 命名
---

![2019-04-08_gh搜索演示]({{ "/assets/2019-04-08_gh搜索演示.png" | absolute_url }})

动态演示如下:

![2019-04-08_gh搜索]({{ "/assets/2019-04-08_gh搜索.gif" | absolute_url }})

源码库: [program-in-chinese/team_website](https://github.com/program-in-chinese/team_website)

找到此JS工具: [christian-fei/Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search), 按安装说明先完成了对题目/类别/日期的搜索, 本地运行不错. 再接再厉添加了对描述和全文(post.content)的搜索, 详见[全文索引.json](https://github.com/program-in-chinese/team_website/blob/master/%E5%85%A8%E6%96%87%E7%B4%A2%E5%BC%95.json)

发现生成的json文件中, 特殊字符如引号使得json语法出错:

![2019-04-08_invalidJSON]({{ "/assets/2019-04-08_invalidJSON.png" | absolute_url }})

发现前人对同样问题的解决方法["full-text search" donot work! · Issue #63 · christian-fei/Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search/issues/63), 另参考[christian-fei/Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search/wiki#if-search-isnt-working-due-to-invalid-json), 在`_plugins`下添加脚本`特殊字符过滤.rb`:
```ruby
module Jekyll
  module C字符过滤器
    def remove_chars_cn(输入)
      输入.gsub! '\\','&#92;'
      输入.gsub! /\t/, '    '
      输入.gsub! '@',''
      输入.gsub! '$',''
      输入.gsub! '%',''
      输入.gsub! '&',''
      输入.gsub! '"',''
      输入.gsub! '{',''
      输入.gsub! '}',''
      输入
    end
  end
end

Liquid::Template.register_filter(Jekyll::C字符过滤器)
```
module名称如果没有大写字母开头, 报语法错误如下, 猜测原因与[Scala疑似中文命名问题后续](https://zhuanlan.zhihu.com/p/52114604)类似, 不过Ruby好像将中文字符认作了非大写的:
```
特殊字符过滤.rb:2: class/module name must be CONSTANT (SyntaxError)
```
方法remove_chars_cn未能中文, 由于Jekyll的Liquid脚本语言貌似不支持Unicode标识符, 会报错:
```
Liquid Warning: Liquid syntax error (line 6): Unexpected character 删 in "{{ post.description | strip_html | strip_newlines | 删除特殊字符 }}" in 全文索引.json
```
在本地运行通过后, 将包括插件在内的修改提交到GitHub后, 发现网站加载json文件时报错"invalid JSON", 查看取json的请求响应内容后, 各种尝试后初步认定是插件未成功运行, 一通搜之后发现, GitHub Pages不支持任意插件的运行: [jekyll plugin not work on github](https://stackoverflow.com/questions/20369397/jekyll-plugin-not-work-on-github/20377640#20377640)

解决方法就是本地jekyll生成网站源码后, 将网站源码提交到repo里.

参考[Configuration Options](https://jekyllrb.com/docs/configuration/options/)在`_config.yml`中将输出目录改为`docs`:
```
destination: docs
```
再将原本的jekyll文件都移到repo根下, 运行生成后提交, 搞定.