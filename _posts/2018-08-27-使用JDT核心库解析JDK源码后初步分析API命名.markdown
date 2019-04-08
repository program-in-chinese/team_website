---
layout: post
comments: true
title:  使用JDT核心库解析JDK源码后初步分析API命名
description: 使用Eclipse的JDT核心库, 对JDK源码进行语法分析, 提取API包括类/方法/方法参数, 对其命名进行初步分析. Analyze JDK source code using JDT core library, get the naming of the classes and public methods including the arguments, and analyze the vocabulary.
date:   2018-08-27 00:00:00 -0700
categories: 命名 Java
---

源自[术语词典API项目 · Issue #85 · program-in-chinese/overview](https://github.com/program-in-chinese/overview/issues/85#issuecomment-416075270), 打算先用早先的代码提取JDK API中的类/方法/参数名, 看看有哪些词需要翻译.

源码在[program-in-chinese/programming_term_dictionary](https://github.com/program-in-chinese/programming_term_dictionary/tree/master/src/main/java/com/github/program_in_chinese/%E5%B7%A5%E5%85%B7)

类型名提取器.java 扩展了语法树遍历器, 对公开(public)的类型/方法/参数进行保存:

```java
public class 类型名提取器 extends ASTVisitor {

  private 类型名 名 = new 类型名();
  
  private String 当前类名 = "";

  @Override
  public boolean visit(MethodDeclaration 方法节点) {
    String 当前方法名 = 方法节点.getName().getFullyQualifiedName();
    if (为公开声明(方法节点)) {
      名.方法名.put(当前方法名, 当前类名);
    }

    for (Object 参数 : 方法节点.parameters()) {
      VariableDeclaration 变量声明 = (VariableDeclaration) 参数;
      String 参数名 = 变量声明.getName().getFullyQualifiedName();

      // 忽略所有单字母参数名. TODO: 是否需要研究单字母命名?
      if (参数名.length() > 1) {
        名.参数名.put(参数名, 当前类名 + "." + 当前方法名);
      }
    }
    return super.visit(方法节点);
  }

  @Override
  public boolean visit(TypeDeclaration 类型节点) {
    if (为公开声明(类型节点)) {

      // TODO: 取完整类名(包括包名)
      当前类名 = 类型节点.getName().getFullyQualifiedName();
      名.类名.put(类型节点.getName().getFullyQualifiedName(), 当前类名);
    }
    return super.visit(类型节点);
  }

  public 类型名 获取名() {
    return 名;
  }

  private boolean 为公开声明(BodyDeclaration 节点) {
    return (节点.getModifiers() & Modifier.PUBLIC) != 0;
  }

  public class 类型名 {
    public Map<String, String> 类名 = new HashMap<>();
    public Map<String, String> 方法名 = new HashMap<>();
    public Map<String, String> 参数名 = new HashMap<>();
  }
}
```
遍历JDK类型名.java 暂时只对util部分进行分析

```java
public class 遍历JDK类型名 {

  private static final ASTParser 语法解析器 = ASTParser.newParser(AST.JLS8);

  // JDK源码内路径
  private static final String 常量_源文件路径 = "java/util";
  private static final String 常量_输出文件路径 = "命名列表/";

  private static final 类型名提取器 提取器 = new 类型名提取器();

  /**
   * 
   * @param 参数 第一个参数为JDK路径。可由JDK目录下的src.zip解压。
   * @throws Exception
   */
  public static void main(String[] 参数) throws Exception {
    if (参数.length != 1) {
      System.out.println("需要JDK源码路径作为唯一参数");
      return;
    }

    文件功用.创建路径(常量_输出文件路径);
    处理Java文件(new File(参数[0] + 常量_源文件路径));

    类型名 名 = 提取器.获取名();

    // 从方法列表中删除所有构造方法
    for (String 类名 : 名.类名.keySet()) {
      名.方法名.remove(类名);
    }

    String 后缀 = "_" + 常量_源文件路径.replaceAll("/", "_");
    文件功用.写行入文件(名.类名, 常量_输出文件路径 + "类" + 后缀 + ".txt");
    文件功用.写行入文件(名.方法名, 常量_输出文件路径 + "方法" + 后缀 + ".txt");
    文件功用.写行入文件(名.参数名, 常量_输出文件路径 + "参数" + 后缀 + ".txt");
    System.out.println("提取完毕: " + 名.类名.size() + "类;" + 名.方法名.size() + "方法;" + 名.参数名.size() + "参数");
  }

  private static void 处理Java文件(File 路径) throws Exception {
    if (路径.isFile()) {
      if (路径.getName().endsWith(".java")) {
        解析Java文件(路径);
      }
    } else {
      File[] 文件 = 路径.listFiles();
      if (文件 != null) {
        for (File 某文件 : 文件) {
          处理Java文件(某文件);
        }
      }
    }
  }

  private static void 解析Java文件(File 文件) throws Exception {
    语法解析器.setSource(文件功用.取源文件文本(文件).toCharArray());
    语法解析器.createAST(null).accept(提取器);
  }
}
```
初步统计:

```
提取完毕: 332类;1172方法;449参数
```

按照骆驼命名对提取出的命名进行单词拆分后, 得到902个单词, 其中有不少同根词, 如:

```
sequence
sequential
split
splittable
token
tokenizer
word
words
write
writer
zone
zoned
```
还有不少不明所以的:

```
csn
em
fd
```
接下去将拆分出的单词与源API联系起来, 以便翻译时结合原API语义(已更新上面的源码). 比如csn来源于`java.util.Formatter.Formatter(String fileName, String csn, Locale l)`, javadoc中意为The name of a supported {@linkplain java.nio.charset.Charset charset}. 真猜不到.

顺便对所有java/下的源码进行统计:

```
1579类;5093方法;2022参数
2752个单词
```
5倍左右数量的API但单词数只有3倍, 看来复用率蛮高. 总单词表在[此](https://github.com/program-in-chinese/programming_term_dictionary/blob/master/%E5%91%BD%E5%90%8D%E5%88%97%E8%A1%A8/%E8%AF%8D%E6%B1%87.csv).