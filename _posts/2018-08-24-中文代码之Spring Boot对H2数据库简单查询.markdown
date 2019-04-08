---
layout: post
comments: true
title:  中文代码之Spring Boot对H2数据库简单查询
description: 演示用Spring Boot查询H2内存数据库, 使用中文代码. Demostrate naming in Chinese in query H2 in-memory database in a demo based on Spring Boot.
date:   2018-08-24 00:00:00 -0700
categories: 命名 Spring H2
---

续前文: [中文代码之Spring Boot集成H2内存数据库](http://zhuanlan.zhihu.com/p/42540265)

在词条中添加英文术语域:

```java
@Entity
public class 词条 {

  @Id
  private long id;
  private String 英文术语;
  private String 中文术语;

  public 词条() {
  }
  
  public 词条(long id, String 英文术语, String 中文术语) {
    this.id = id;
    this.英文术语 = 英文术语;
    this.中文术语 = 中文术语;
  }

  public long getId() {
    return id;
  }

  public String get中文术语() {
    return 中文术语;
  }

  public String get英文术语() {
    return 英文术语;
  }
}
```

声明查询方法(Spring支持特定命名格式的查询方法, 参考: [https://docs.spring.io/spring-data/jpa/docs/1.8.x/reference/html/#repositories.query-methods](https://docs.spring.io/spring-data/jpa/docs/1.8.x/reference/html/#repositories.query-methods))

```java
@Repository
public interface 词库接口 extends JpaRepository<词条, Long> {

  List<词条> findBy英文术语(String 英文术语);
}
```

在控制器中用数据库查询代替原本的內建Map查询:

```java
@RestController
public class 词典控制器 {

  private static final Logger 笔录 = LoggerFactory.getLogger(词典控制器.class);

  @Autowired
  private 词库接口 词库;

  @GetMapping("/")
  @ResponseBody
  public List<词条> 取词条(@RequestParam(name = "term", required = false, defaultValue = "") String 英文术语) {
    笔录.info("输入: " + 英文术语);
    return 词库.findBy英文术语(英文术语);
  }
}
```

访问在线演示地址: [http://74.91.17.250:8090/?term=List](http://74.91.17.250:8090/?term=List) 返回:

```json
[
  {
    id: 3,
    英文术语: "List",
    中文术语: "列表"
  }
]
```

继续欠测试.