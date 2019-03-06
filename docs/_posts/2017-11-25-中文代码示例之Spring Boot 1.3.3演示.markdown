---
layout: post
comments: true
title:  中文代码示例之Spring Boot 1.3.3演示
description: 用一个简单的商品管理系统演示在Spring Boot最基本的功能中使用中文代码. Demostrate naming in Chinese in the basic features of Spring Boot 1.3.3, with a simple application for goods management.
date:   2017-11-25 00:00:00 -0700
categories: 命名 Spring
---

["中文编程"知乎专栏原文](https://zhuanlan.zhihu.com/p/31417833)

源码: [program-in-chinese/jinxiaocun](https://github.com/program-in-chinese/jinxiaocun)

由于这个演示项目成型于去年(详见[中文编程的尝试历程小记](https://zhuanlan.zhihu.com/p/27537616)), Spring Boot还是老版本. 尚未将其更新到最新版本, 先将其中的一些中文命名的部分小结在此.
### URL

如: /商品表 /单位表

实现方式见最后附上的"单位控制器"源码中的:
```java
@RequestMapping(value = "/单位表")
```
及
```java
protected static final String URL = "单位表";
```
### 类/方法/变量用中文命名

见后面附上的源码
### jsp文件名, 以及jsp中的变量名

如"单位表.jsp"中的"${单位.名称}".

这需要"单位"类中的属性命名为"名称". 由于命名约定, 需要将接口以get/set开头.
### 数据库的表/列命名

下面是mysqldump的结果("单位"部分)
```sql
DROP TABLE IF EXISTS `单位`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `单位` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `名称` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```
完整schema在[此](https://github.com/program-in-chinese/jinxiaocun/blob/master/MySQL%E6%95%B0%E6%8D%AE%E5%BA%93schema.sql)


### 编码相关注意点(现在想起的, 欢迎补遗)

需要在pom.xml中添加:
```xml
<properties>
	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>
```
2. 数据库(用的Mysql)指定编码:
```
spring.datasource.url= jdbc:mysql://localhost:3306/jinxiaocun?useUnicode=true&characterEncoding=utf8
spring.datasource.sqlScriptEncoding=UTF-8
```
3. jsp文件头指定编码:
```jsp
<%@ page pageEncoding="UTF-8" %>
```
4. 如上面的mysqldump中所见, 表和列都设置为了utf8


### *附上单位相关部分源码*

单位类:
```java
@Entity
public class 单位 {

  private long id;

  @NotEmpty(message = "单位名称不可为空")
  @Size(max = 20, message = "单位长度不可超过20")
  private String 名称;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String get名称() {
    return 名称;
  }

  public void set名称(String 名称) {
    this.名称 = 名称;
  }
}
```
单位控制类:
```java
@Controller
@RequestMapping(value = "/单位表")
public class 单位控制 {

  protected static final String URL = "单位表";
  protected static final String 表名 = "单位表";

  @Autowired
  private 单位库 单位库;

  @RequestMapping(method = RequestMethod.GET)
  public String 列表(Model 模型) {
    List<单位> 表 = 单位库.findAll();
    if (表 != null) {
      模型.addAttribute(表名, 表);
    }
    // 需要初始化被校验的对象
    模型.addAttribute("单位", new 单位());
    return URL;
  }

  @RequestMapping(method = RequestMethod.POST)
  public String 添加(@Valid 单位 单位, BindingResult 约束结果, Model 模型) {
    if (约束结果.hasErrors()) {
      return URL;
    }
    单位库.save(单位);
    return 列表(模型);
  }
}
```
单位表.jsp:
```jsp
<body>
	<jsp:include page="置顶.jsp" />
	<h2>单位列表</h2>
	<c:forEach var="单位" items="${单位表}">
		<div>
			<c:out value="${单位.名称}"/>
		</div>
	</c:forEach>
	
	<h3>添加单位</h3>
	<form:form method="POST" modelAttribute="单位">
		<form:errors path="*" cssClass="errorblock" element="div" />
		<label for="名称">名称:</label>
		<form:input type="text" path="名称" size="50" />
		<form:errors path="名称" cssClass="error"/>
		<br/>
		<input type="submit" value="提交"></input>
	</form:form>
</body>
```
### 注

演示本身非常幼稚, Spring Boot当时也是摸索学习中, 后也没有继续深入. 使用jsp而不是Thymeleaf的原因是, 后者当时不支持中文变量命名. 缘由详见[业余小项目, 学用Spring boot (如对中文写代码本能排斥, 求放过)](http://tieba.baidu.com/p/4433232983)22楼.