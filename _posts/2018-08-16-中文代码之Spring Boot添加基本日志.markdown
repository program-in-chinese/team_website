---
layout: post
comments: true
title:  中文代码之Spring Boot添加基本日志
description: 演示用Spring Boot实现基本日志, 使用中文代码. Demostrate naming in Chinese in adding log to a demo based on Spring Boot.
date:   2018-08-16 00:00:00 -0700
categories: 命名 Spring
---

之前[中文代码之Spring Boot实现简单REST服务](https://zhuanlan.zhihu.com/p/42100391)的演示服务不知为何中止. 新开issue: [演示服务中止 · Issue #2 · program-in-chinese/programming_term_dictionary](https://github.com/program-in-chinese/programming_term_dictionary/issues/2).

毫无线索的情况下, 先添加日志: [program-in-chinese/programming_term_dictionary](https://github.com/program-in-chinese/programming_term_dictionary/tree/16d678d59e3ff0c046b81e1b311aeba0dcd40a5d)

application.yml:
```yaml
logging:
  file: 日志.log
```
词典控制器.java:
```java
@RestController
public class 词典控制器 {

  private static final Logger 笔录 = LoggerFactory.getLogger(词典控制器.class);
...
  @GetMapping("/")
  @ResponseBody
  public 词条 取词条(@RequestParam(name = "term", required = false, defaultValue = "") String 英文术语) {
    笔录.info("输入: " + 英文术语);
...
}
```
对服务中止问题, 如有思路/线索请多指教.


演示机器环境和配置:

Java 8,

Ubuntu 14.04,

FX-4100 Quad-Core, 16GB内存, 2T硬盘


补记: 多半是由于远程登录服务器退出时, 服务自动结束. 添加nohup后再看. 参考: [Run java jar file on a server as background process](https://stackoverflow.com/questions/12102270/run-java-jar-file-on-a-server-as-background-process/12108646#12108646)


参考:

[74. Properties and Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/howto-properties-and-configuration.html)

[Spring Boot Logging Example](https://www.concretepage.com/spring-boot/spring-boot-logging-example)