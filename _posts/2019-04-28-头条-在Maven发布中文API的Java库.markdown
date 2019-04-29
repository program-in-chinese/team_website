---
layout: post
comments: true
title:  谁说API必须用英文？中文API的Java库可以有！
description: 开发一个简单的Java库, 通过sonatype发布到Maven主库. Publish Java library with APIs in Chinese on Maven Central, through Sonatype.
date:   2019-04-28 12:00:00 -0700
categories: 命名 API

---

是不是看惯了文档里的英文接口（API），也在 IDE 里看惯了自动补全里的英文接口？

现今的绝大多数 API 的确是英文命名没错，但绝非不能或者不应该实现和发布中文 API 的库。

这里用一个简单的汉字简繁转换库为例。在命名上，API 的方法名、参数名以及类名都用了中文。下面是 Eclipse 中的 Javadoc 弹窗：

![中文API的Java库]({{ "/assets/2019-04-28_zhconverter演示.png" | absolute_url }})

中文 API 的 Java 库，实现汉字的简繁转换。演示在 Eclipse 中的 JavaDoc。

这个 Java 库已经发布到了 Maven 仓库，可以和其他英文 Java 库一样方便地调用。在 GitHub 上搜索"com.github.nobodxbodon"就可以看到不少 pom.xml 文件中依赖了这个库。

现在国内自研的 API 面向的主要用户群应该也是国内开发者。即便仍保留英文 API ，**如果能另外提供一套中文的，必然更易于学习和使用，也可以吸引更多使用者**。即使是额外维护一套中文 API，工作量也很有限，相比起为最终用户带来的益处，可说是相当值得的。

另外，这个库的实现代码中的标识符也都用了中文命名。原因很简单，这个库的使用者和潜在合作开发者应该都会中文。下面是其中的一段主要代码：

![简繁转换库源码]({{ "/assets/2019-04-28_zhconverter源码.png" | absolute_url }})

测试代码也都使用了中文命名。其中还引用了另一个中文 API 的库，而且那个库的功能非常通用，多半你的 Java 项目也用得到哦。

![简繁转换库测试源码]({{ "/assets/2019-04-28_zhconvert测试代码.png" | absolute_url }})

项目源码和库使用方法在：https://github.com/program-in-chinese/zhconverter

更多中文编程推广过程内情，请关注“**用中文编程**”微信公众号。
