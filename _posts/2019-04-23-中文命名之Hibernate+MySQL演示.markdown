---
layout: post
comments: true
title:  中文命名之Hibernate+MySQL演示
description: 用一个简单例子演示Hibernate + MySQL基本功能中使用中文命名. Demostrate naming in Chinese in the basic features of Hibernate + MySQL.
date:   2019-04-23 00:00:00 -0700
categories: 命名 Hibernate
---

最近有个契机, 需要在一个给定开发环境中验证中文命名的可行性. 达成的例子源码在: [HibernateExampleZh](https://github.com/nobodxbodon/HibernateExampleZh)

当前用的是Hibernate 3.3.2.GA. 之后测试了更多版本, 彩蛋见最后一部分.

### 测试环境:
- Windows 7 Pro 64bit, JDK 1.7.0_80, MySQL 5.5.62, Eclipse Kepler SR2
- MacOS 10.13.6, JDK 1.8.0_45, MySQL 5.5.24, Eclipse 4.7.3a

### 功能验证:
运行`com.codeinchinese.App`, 在数据库表中插入一条记录并进行一次条件查询.

### 数据库
[源码](https://github.com/nobodxbodon/HibernateExampleZh/blob/master/数据库/客户.sql); 需修改`hibernate.cfg.xml`中的数据库用户/密码部分.
```mysql
DROP TABLE IF EXISTS `演示`.`客户`;
CREATE TABLE  `演示`.`客户` (
  `客户_ID` bigint(20) unsigned COLLATE utf8_unicode_ci NOT NULL AUTO_INCREMENT,
  `姓名` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `创建日期` datetime COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`客户_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

ALTER TABLE `演示`.`客户`
ADD INDEX `姓名_索引` (`姓名` ASC) ;
```

### Java
[模型类](https://github.com/nobodxbodon/HibernateExampleZh/blob/master/src/main/java/com/codeinchinese/客户/模型/客户类.java)
```java
public class 客户类 implements java.io.Serializable {

  private Long 客户_ID;
  private String 姓名;
  private Date 创建日期;

  public 客户类() {
  }

  public 客户类(String 姓名, Date 创建日期) {
      this.姓名 = 姓名;
      this.创建日期 = 创建日期;
  }

  public Long get客户Id() {
      return this.客户_ID;
  }

  public void set客户Id(Long 客户Id) {
      this.客户_ID = 客户Id;
  }

  public String get姓名() {
      return this.姓名;
  }

  public void set姓名(String 姓名) {
      this.姓名 = 姓名;
  }

  public Date get创建日期() {
      return this.创建日期;
  }

  public void set创建日期(Date 创建日期) {
      this.创建日期 = 创建日期;
  }

  @Override
  public String toString() {
    return 客户_ID + " " + 姓名 + " " + 创建日期;
  }

}
```

### Hibernate映射文件
[客户.hbm.xml](https://github.com/nobodxbodon/HibernateExampleZh/blob/master/src/main/resources/com/codeinchinese/%E5%AE%A2%E6%88%B7/hibernate/%E5%AE%A2%E6%88%B7.hbm.xml)
```xml
<hibernate-mapping>
    <class name="com.codeinchinese.客户.模型.客户类" table="客户">
        <id name="客户Id" type="java.lang.Long">
            <column name="客户_ID" />
            <generator class="identity" />
        </id>
        <property name="姓名" type="string">
            <column name="姓名" length="45" not-null="true" />
        </property>
        <property name="创建日期" type="timestamp">
            <column name="创建日期" length="19" not-null="true" />
        </property>
    </class>
</hibernate-mapping>
```

### 检查更多Hibernate版本

经测试, 到`4.2.21.Final`都正常运行, 但从`5.0.0.Final`开始到最近的`6.0.0.Alpha2`, 都不支持模型类名的中文命名. 具体报错如下:
```
Caused by: org.xml.sax.SAXParseException; lineNumber: 6; columnNumber: 58; cvc-pattern-valid: Value 'com.codeinchinese.客户.模型.客户类' is not facet-valid with respect to pattern '([a-zA-Z_$][a-zA-Z\d_$]*\.)*[a-zA-Z_$][a-zA-Z\d_$]*' for type 'ClassNameType'.
	at com.sun.org.apache.xerces.internal.util.ErrorHandlerWrapper.createSAXParseException(ErrorHandlerWrapper.java:203)
	at com.sun.org.apache.xerces.internal.util.ErrorHandlerWrapper.error(ErrorHandlerWrapper.java:134)
	at com.sun.org.apache.xerces.internal.impl.XMLErrorReporter.reportError(XMLErrorReporter.java:396)
	at com.sun.org.apache.xerces.internal.impl.XMLErrorReporter.reportError(XMLErrorReporter.java:327)
	at com.sun.org.apache.xerces.internal.impl.XMLErrorReporter.reportError(XMLErrorReporter.java:284)
	at com.sun.org.apache.xerces.internal.impl.xs.XMLSchemaValidator$XSIErrorReporter.reportError(XMLSchemaValidator.java:452)
	at com.sun.org.apache.xerces.internal.impl.xs.XMLSchemaValidator.reportSchemaError(XMLSchemaValidator.java:3230)
	at com.sun.org.apache.xerces.internal.impl.xs.XMLSchemaValidator.processOneAttribute(XMLSchemaValidator.java:2825)
	at com.sun.org.apache.xerces.internal.impl.xs.XMLSchemaValidator.processAttributes(XMLSchemaValidator.java:2762)
	at com.sun.org.apache.xerces.internal.impl.xs.XMLSchemaValidator.handleStartElement(XMLSchemaValidator.java:2050)
	at com.sun.org.apache.xerces.internal.impl.xs.XMLSchemaValidator.startElement(XMLSchemaValidator.java:740)
	at com.sun.org.apache.xerces.internal.jaxp.validation.ValidatorHandlerImpl.startElement(ValidatorHandlerImpl.java:570)
	at com.sun.xml.bind.v2.runtime.unmarshaller.ValidatingUnmarshaller.startElement(ValidatingUnmarshaller.java:101)
	at com.sun.xml.bind.v2.runtime.unmarshaller.InterningXmlVisitor.startElement(InterningXmlVisitor.java:75)
	at com.sun.xml.bind.v2.runtime.unmarshaller.StAXEventConnector.handleStartElement(StAXEventConnector.java:261)
	at com.sun.xml.bind.v2.runtime.unmarshaller.StAXEventConnector.bridge(StAXEventConnector.java:130)
	at com.sun.xml.bind.v2.runtime.unmarshaller.UnmarshallerImpl.unmarshal0(UnmarshallerImpl.java:460)
```
修改为英文类名`com.codeinchinese.customer.model.Customer`后, 保留MySQL中文命名和Hibernate相关映射, 仍能运行. 

考虑到这是从版本4到5的功能退化, 而且在6.0版本并无修复的意思, 应该提issue反馈一下.

### 参考

[Maven 3 + Hibernate 3.6 + Oracle 11g Example](https://www.mkyong.com/hibernate/maven-3-hibernate-3-6-oracle-11g-example-xml-mapping/)