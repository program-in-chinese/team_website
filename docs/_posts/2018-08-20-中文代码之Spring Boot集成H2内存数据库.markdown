---
layout: post
comments: true
title:  中文代码之Spring Boot集成H2内存数据库
description: 演示用Spring Boot集成H2内存数据库, 使用中文代码. Demostrate naming in Chinese in integrating H2 in-memory database to a demo based on Spring Boot.
date:   2018-08-20 00:00:00 -0700
categories: 命名 Spring H2
---

续前文: [中文代码之Spring Boot添加基本日志](https://zhuanlan.zhihu.com/p/42247945), 源码库地址相同.

鉴于此项目中的数据总量不大(即使万条词条也在1MB之内), 当前选择轻量级而且配置简单易于部署的H2内存数据库比较合理. 此文仅演示实现H2的集成, 还未修改服务本身功能.

相关commit在: [集成H2数据库 · program-in-chinese/programming_term_dictionary@dc29be7](https://github.com/program-in-chinese/programming_term_dictionary/commit/dc29be78aaf388f6f2db5b3b1ca397e162e92565)

应用.java
```java
public class 应用 implements CommandLineRunner {

  private static final Logger 笔录 = LoggerFactory.getLogger(应用.class);

  private final 词库接口 词库;

  @Autowired
  public 应用(词库接口 词库) {
    this.词库 = 词库;
  }
...
  @Override
  public void run(String ...参数) throws Exception {
    词条 词条1 = new 词条(1L, "集合");
    词条 词条2 = new 词条(2L, "字典");
    
    笔录.info("添加H2数据");
    词库.save(词条1);
    词库.save(词条2);
    笔录.info("数据条数: {}", 词库.count());
  }
```
词条.java:
```java
@Entity
public class 词条 {

  @Id
  private long id;
  private String 中文术语;

  public 词条() {
  }
  ...
}
```
词库接口.java
```java
@Repository
public interface 词库接口 extends JpaRepository<词条, Long> {

}
```
application.yml
```yaml
# 打开H2控制台
spring:
  h2:
    console:
      enabled: true
  datasource:
    url: jdbc:h2:mem:testdb;MODE=Oracle;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
```
pom.xml添加依赖:
```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            	<scope>runtime</scope>
        </dependency>
```
启动服务后, 访问http://localhost:8080/h2-console并在JDBC URL中输入application.yml中配置的数据库路径(datasource:url):

![2018-08-20-h2_connect_spring_boot]({{ "/assets/2018-08-20-h2_connect_spring_boot.png" | absolute_url }})

可以看到启动时添加的两个词条数据已在数据库中:

![2018-08-20-h2_integration_with_spring_boot]({{ "/assets/2018-08-20-h2_integration_with_spring_boot.png" | absolute_url }})

下面需要修改数据库设计, 使其包括"英文"和"中文"两个列, 并实现H2数据库查询, 代替现在代码中的Map结构. 另外, 欠了的测试要还.

#### 参考:

[Using H2 In-memory Database with Spring Boot](http://www.appsdeveloperblog.com/h2-in-memory-database-spring-boot/)

[Setting up H2 with Spring Boot](https://david-kerwick.github.io/2017/02/23/setting-up-h2-with-spring-boot.html)