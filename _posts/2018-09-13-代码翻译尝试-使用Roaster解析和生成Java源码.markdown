---
layout: post
comments: true
title:  代码翻译尝试-使用Roaster解析和生成Java源码
description: 解析Java源码, 并将标识符翻译为中文. Parse Java source code and translate the identifiers to Chinese.
date:   2018-09-13 00:00:00 -0700
categories: 命名 翻译
---

此文是前文[使用现有在线翻译服务进行代码翻译的体验](https://zhuanlan.zhihu.com/p/44169542)的编程语言方面第二点的一个尝试. 参考[Which framework to generate source code ? - Cleancode and Refactoring](https://sylvainleroy.com/2018/06/01/which-framework-to-generate-source-code/), 选了一个综合代价看来最小的, [forge/roaster](https://github.com/forge/roaster), 因为它同时具备解析和生成两方面功能.

初步汉化后代码效果如下(尚未有语法高亮, 仅作演示用. 之后的在线翻译结果也是同样处理):
```java
package com.company.example;

import java.io.Serializable;

public class 人 implements Serializable {

	private static final long serialVersionUID = 1L;
	private final 整型 号;
	private 字符串 全名;

	public 整型 get号() {
		return 号;
	}

	public 字符串 get全名() {
		return 全名;
	}

	public void set全名(字符串 全名) {
		this.全名 = 全名;
	}

	public 人(java.lang.Integer id) {
		this.id = id;
	}
}
```
实现的源码在: https://github.com/program-in-chinese/java_code_translator/blob/8c038261bd797d9738de182f3e0f8ac111402704/src/main/java/com/codeinchinese/code_translator/%E7%BF%BB%E8%AF%91Java%E4%BB%A3%E7%A0%81.java

相关实现比较简单. 因为侧重代码解析生成, 翻译部分最简化(采用纯映射表):
```java
  static Map<String, String> 字典 = new HashMap<>();
  static {
    字典.put("id", "号");
    字典.put("fullName", "全名");
    字典.put("getId", "取号");

    字典.put("Integer", "整型");
    字典.put("String", "字符串");

    字典.put("Person", "人");
  }

  public static void main(String[] 参数) throws Exception {
    String 源码 = 文件功用.取源文件文本("测试.java");
    JavaClassSource 分析结果 = Roaster.parse(JavaClassSource.class, 源码);

    // 汉化类名
    分析结果.setName(查词(分析结果.getName()));

    // 汉化Bean属性名, 以及属性的类型名
    for (PropertySource<JavaClassSource> 某属性 : 分析结果.getProperties()) {
      String 属性名 = 某属性.getName();
      某属性.setName(查词(属性名));

      String 属性类型名 = 某属性.getType().getName();
      某属性.setType(查词(属性类型名));
    }

    System.out.println(分析结果);
  }

  private static String 查词(String 英文) {
    return 字典.containsKey(英文) ? 字典.get(英文) : 英文;
  }
```
Roaster一大缺陷是, 还不支持对方法内容的解析: [ROASTER-1: Java Statement Fluent Model by sotty · Pull Request #27 · forge/roaster](https://github.com/forge/roaster/pull/27) 貌似主创最近不很活跃, 很可能需要另辟蹊径.

顺便把源码用在线翻译服务翻译一下进行比较.

谷歌几乎没有翻译:
```
package com.company.example;

import java.io.Serializable;

public class Person实现Serializable {

     private static final long serialVersionUID = 1L;
     private final Integer id;
     private String fullName;

     public Integer getId（）{
         返回id;
    }

     public String getFullName（）{
         return fullName;
    }

     public void setFullName（String fullName）{
         this.fullName = fullName;
    }

     public Person（java.lang.Integer id）{
         this.id = id;
    }
}
```
百度改变源码太大:
```
包装公司。
导入JavaIO.SerialCalab化；
公共类人谓词可序列化{
私有静态最终的长序列化版本UID＝1L；
私有最终整数ID；
私有字符串全名；
公共整数gTiID（）
序列标识；
}
公共字符串GETFuleNAMEL（）
返回全名；
}
公共空隙设置FULL NULL（String FulnNeX）{
全名=全名；
}
公共人（java.郎.整数ID）{
这个ID＝ID；
}
}
```
个人感觉即使是这样初步的翻译, 也是有优势的. 至于编程语言关键词不翻译, 尚不是致命问题, 毕竟下面打算与[英汉词典API](https://zhuanlan.zhihu.com/p/43977821)结合一下试试([这里](https://github.com/program-in-chinese/java_code_translator/blob/8c038261bd797d9738de182f3e0f8ac111402704/src/main/java/com/codeinchinese/code_translator/%E7%BF%BB%E8%AF%91%E4%BB%A3%E7%A0%81.java)有一点初步尝试, 对释义的选取还需改进). 如效果还可以接受就上线做一下内测.