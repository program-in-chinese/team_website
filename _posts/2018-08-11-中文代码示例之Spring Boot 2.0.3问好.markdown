---
layout: post
comments: true
title:  中文代码示例之Spring Boot 2.0.3问好
description: 演示在Spring Boot 2.0.3入门示例中使用中文代码. Demostrate naming in Chinese in the basic tutorial of Spring Boot 2.0.3.
date:   2018-08-11 00:00:00 -0700
categories: 命名 Spring
---

上次试用Spring Boot还是两年前: [中文代码示例之Spring Boot 1.3.3演示](https://zhuanlan.zhihu.com/p/31417833). 打算用在一个讨论组内小项目上, 于是从官网[Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)入门开始.

源码库: [program-in-chinese/spring_boot_hello_zh](https://github.com/program-in-chinese/spring_boot_hello_zh)

汉化后的源码如下:

问好控制器:
```java
@RestController
public class 问好控制器 {

    @RequestMapping("/")
    public String 索引() {
        return "Spring Boot问好!";
    }

}
```
主入口:
```java
@SpringBootApplication
public class 应用 {

    public static void main(String[] 参数) {
        SpringApplication.run(应用.class, 参数);
    }

    @Bean
    public CommandLineRunner 命令行运行器(ApplicationContext 上下文) {
        return 参数 -> {

            System.out.println("检查一下Spring Boot提供的beans:");

            String[] bean名 = 上下文.getBeanDefinitionNames();
            Arrays.sort(bean名);
            for (String 某bean名 : bean名) {
                System.out.println(某bean名);
            }

        };
    }

}
```
控制器单元测试:
```java
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class 问好控制器Test {

    @Autowired
    private MockMvc mvc;

    @Test
    public void 取问好() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("Spring Boot问好!")));
    }
}
```
集成测试:

```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class 问好控制器集成测试 {

    @LocalServerPort
    private int 端口;

    private URL 基础网址;

    @Autowired
    private TestRestTemplate 模板;

    @Before
    public void 初始化() throws Exception {
        this.基础网址 = new URL("http://localhost:" + 端口 + "/");
    }

    @Test
    public void 取问好() throws Exception {
        ResponseEntity<String> 响应 = 模板.getForEntity(基础网址.toString(),
                String.class);
        assertThat(响应.getBody(), equalTo("Spring Boot问好!"));
    }
}
```
本地启动应用:
```
$ mvn package && java -jar target/spring-boot-hello-0.1.0.jar
```
访问本地端口响应如期:
```
$ curl localhost:8080
Spring Boot问好!
```