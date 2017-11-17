---
layout: post
comments: true
title:  在Maven Central发布中文API的Java库
description: 开发一个简单的Java库, 通过sonatype发布到Maven主库. Publish Java library with APIs in Chinese on Maven Central, through Sonatype.
date:   2017-07-20 00:00:00 -0700
categories: 命名 API
---

[知乎原链](https://zhuanlan.zhihu.com/p/28024364)

相关问题: [哪些Java库有中文命名的API?](https://www.zhihu.com/question/62738566)

且记下随想.

之前没有发布过, 看了SO上的推荐:[Publish a library to maven repositories](https%3A//stackoverflow.com/questions/2588858/publish-a-library-to-maven-repositories) 决定在sonatype发布. sonatype发布开源软件库的[步骤](http%3A//central.sonatype.org/pages/producers.html)写的蛮详细, 不过一些细节比如命令行指令可能有段时间没更新了. 比如有个坑是发布gpg的公开秘钥, 指定server的时候如果有hkp://前缀的话就报错 no route to host, 不知是否因为我用的gpg2, 试了各种才发现去掉前缀就行了.

在命名上, API方法和参数以及类名都用了中文. 下面是Eclipse中的Javadoc弹窗:

![中文API的Java库]({{ "/assets/中文API的Java库.png" | absolute_url }})

根据[Guide to Naming Conventions](https%3A//maven.apache.org/guides/mini/guide-naming-conventions.html), groupid还是沿用了域名命名, artifactiId也还是用英文. 以后可能试试中文artifactId, 应该不算"strange symbols".

发布了几个小版本, 感觉有时需要一个多小时在pom里引用, 更新还算蛮快.

```
<dependency>
  <groupId>com.github.nobodxbodon</groupId>
  <artifactId>zhconverter</artifactId>
  <version>0.0.5</version>
</dependency>
```

项目源码: [program-in-chinese/zhconverter](https%3A//github.com/program-in-chinese/zhconverter)

希望找到前人, 结识来者.