---
layout: post
comments: true
title:  中文代码之Spring Boot实现简单REST服务
description: 演示用Spring Boot实现简单REST服务, 使用中文代码. Demostrate naming in Chinese in a demo of building RESTful service based on Spring Boot.
date:   2018-08-14 00:00:00 -0700
categories: 命名 Spring
---

最终目标详见: [参考MSDN，试搞.NET类库标识符的翻译版 · Issue #54 · program-in-chinese/overview](https://github.com/program-in-chinese/overview/issues/54#issuecomment-411551138)

此文仅为技术探索+原型搭建的第一小步.

源码库: [演示原型 · program-in-chinese/programming_term_dictionary@6bb00f3](https://github.com/program-in-chinese/programming_term_dictionary/commit/6bb00f38a361bf37eea080e43fac6bbea1c9e899)

主要部分源码如下:
应用.java

```java
@SpringBootApplication
public class 应用 {

  public static void main(String[] 参数) {
    SpringApplication.run(应用.class, 参数);
  }

}
```
词典控制器.java

```java
@RestController
public class 词典控制器 {

  private static final HashMap<String, String> 英中词典 = new HashMap<>();

  static {
    英中词典.put("List", "列表");
  }
  private final AtomicLong 计数器 = new AtomicLong();

  @GetMapping("/")
  @ResponseBody
  public 词条 取词条(@RequestParam(name = "term", required = false, defaultValue = "") String 英文术语) {
    if (英中词典.containsKey(英文术语)) {
      return new 词条(计数器.incrementAndGet(), 英中词典.get(英文术语));
    }
    return null;
  }
}
```
词条.java
```java
public class 词条 {
  // TODO: 仅为演示用
  private final long id;
  private final String 中文术语;

  public 词条(long id, String 中文术语) {
    this.id = id;
    this.中文术语 = 中文术语;
  }

  public long getId() {
    return id;
  }

  public String get中文术语() {
    return 中文术语;
  }
}
```
在演示服务器上构建并从jar包启动服务:
```
$ mvn package && java -jar target/programming-term-dictionary-0.1.0.jar --server.port=8090
```
在本地(客户端)访问:
```
$ curl 74.91.17.250:8090?term=List
{"id":3,"中文术语":"列表"}
```
参考文档: [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)