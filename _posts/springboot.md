---
layout:     post
title:      "springboot"
subtitle:   ""
date:       2024-02-10 15:44:00
author:     "zangxin"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
---

# springboot

定义

springboot可以轻松创建独立的,生产级的基于spring的应用程序

springboot直接嵌入tomcat/jetty/undertow/, 可以直接运行springboot程序, 比如: java -jar myboot.jar

## quickstart

继承父工程 spring-boot-starter-parent:2.5.3

引入依赖:spring-boot-starter-web

创建启动类

```java
@SpringBootApplication
public class MainApp {
  public static void main(String[] args) {
    SpringApplication.run(MainApp.class, args);
  }
}
```



### controller

```java
@Controller
public class HelloController {
  @RequestMapping("/hello")
  @ResponseBody
  public String hello() {
    return "hello boot!";
  }
}
```

直接运行启动类的main方法, 就这么简洁

spring-boot-starter-web

- 引入了很多框架
包括spring,springmvc, json, tomcat等

boot与spring与mvc的关系

他们的关系大概是: Spring Boot > Spring > Spring MVC主题 1

Spring MVC 只是 Spring 处理 WEB 层请求的一个模块/组件, Spring MVC 的基石是 Servlet

Spring 的核心是 IOC 和 AOP, IOC 提供了依赖注入的容器 , AOP 解决了面向切面编程

Spring Boot 是为了简化开发, 推出的封神框架(约定优于配置[COC]，简化了 Spring 项目 的配置流程), SpringBoot包含很多组件/框架，Spring就是最核心的内容之一，也包含 Spring MVC

Spring 家族，有众多衍生框架和组件例如 boot、security、jpa 等, 他们的基础都是 Spring

## 约定优于配置

convention over configuration/coc,按约定编程

是一种转件设计规范, 本质上是对系统、类库或框架中一些东西假定一个大众化合理的默认值(缺省值)

例如在模型中存在一个名为 User 的类，那么对应到数据库会存在一个名为 user 的表， 只有在偏离这个约定时才需要做相关的配置 (例如你想将表名命名为t_user等非user时才 需要写关于这个名字的配置)

简单来说就是假如你所期待的配置与约定的配置一致，那么就可以不做任何配置，约 定不符合期待时, 才需要对约定进行替换配置

总结

- 约定其实就是一种规范，遵循了规范，那么就存在通用性，存在通用性，那么事情就会变
得相对简单，程序员之间的沟通成本会降低，工作效率会提升，合作也会变得更加简单

## 依赖管理和starter

1. spring-boot-starter-parent 还有父项目spring-boot-dependencies, 声明了开发中常用的依赖的版本号

2.自动版本仲裁: , 即如果没有指定某个依赖 jar 的版本，则以父项目指定的版本为准 

### starter场景启动器

-  开发中我们引入了相关场景的 starter，这个场景中所有的相关依赖都引入进来了，比如 我们做 web 开发引入了，该 starter 将导入与 web 开发相关的所有包

-  依赖树 : 可以看到 spring-boot-starter-web ，帮我们引入了 spring-webmvc，spring-web 开发模块，还引入了 spring-boot-starter-tomcat 场景，spring-boot-starter-json 场景，这些 场景下面又引入了一大堆相关的包，这些依赖项可以快速启动和运行一个项目，提高开发 效率.

- 所有场景启动器最基本的依赖就是 spring-boot-starter , 前面的依赖树分析可以看到,这个依赖也就是 SpringBoot 自动配置的核心依赖

### 官方提供starter

- 文档
https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems.starters

- 在开发中我们经常会用到 spring-boot-starter-xxx ，比如 spring-boot-starter-web，该场 景是用作 web 开发，也就是说 xxx 是某种开发场景。

- 我们只要引入 starter，这个场景的所有常规需要的依赖我们都自动引入

###  第三方 starter

-  SpringBoot 也支持第三方 starter

- 第三方 starter 不要从 spring-boot 开始，因为这是官方 spring-boot 保留的命名方式的。 第三方启动程序通常以项目名称开头。例如，名为 thirdpartyproject 的第三方启动程序项 目通常被命名为 thirdpartyproject-spring-boot-starter。

- 也就是说:xxx-spring-boot-starter 是第三方为我们提供的简化开发的场景启动器

## 自动配置

SSM 整合时，需要配置 Tomcat 、配置 SpringMVC、配置如 何扫描包、配置字符过滤器、配置视图解析器、文件上传等[如图]，非常麻烦。而在 SpringBoot 中，存在自动配置机制，提高开发效率

spring-boot-starter-web自动配置了 Tomcat,自动配置 SpringMVC

默 认 扫 描 包 结 构: 启动类同一目录下的所有子包

- 指定包扫描,也可以指定多个包
@SpringBootApplication(scanBasePackages = "com.xxx")

- 查看容器中有哪些bean代码

  ```java
  ConfigurableApplicationContext ctx = SpringApplication.run(MainApp.class, args);
  String[] definitionNames = ctx.getBeanDefinitionNames();
  Arrays.stream(definitionNames).forEach(System.out::println);
  ```

  

### resources\application.properties
- SpringBoot 项目最重要也是最核心的配置文件就是application.properties，所有的框架配
置都可以在这个配置文件中说明

- 配置大全地址https://blog.csdn.net/pbrlovejava/article/details/82659702

- 使用时直接在里面搜索即可

resources\application.properties 自定义配置

在 properties 文件中自定义配置，通过@Value("${}")获取对应属性值

- application.properties 文件 my.website=https://www.baidu.com
  //某个 Bean 

  ```java
  @Value("${my.website}") 
  private String bdUrl;
  ```

  

### springboot在哪里读取application.properties配置

- ConfigFileApplicationListener这个类指定配置文件的名字和位置

	- 文件路径

		- classpath:/,classpath:/config/,file:./,file:./config/*/,file:./config/

	- 文件名

		- application

###  自动配置 遵守按需加载原则

- 也就是说，引入了哪个场景 starter 就会加载该场景关联的 jar 包，没有引入的 starter 则不会加载其关联 jar

SpringBoot 所 有 的 自 动 配 置 功 能 都 在 spring-boot-autoconfigure 包 里 面

- 在 SpringBoot 的 自 动 配 置 包 , 一 般 是 XxxAutoConfiguration.java, 对 应
XxxxProperties.java,

## 容器功能

Spring注入组件的注解

- @Component、@Controller、 @Service、@Repository

- 这些在 Spring 中的传统注解仍然有效，通过这些注解可以给容器注入组件

@Configuration注解

- 替代xml配置文件的作用(boot中也可以使用beans.xml

  ```java
  ClassPathXmlApplicationContext xmlContext = new ClassPathXmlApplicationContext("beans.xml");
  Monster monster = xmlContext.getBean(Monster.class);
  ```

  

- 通过@Configuration 创建配置类来注入组件

  ```java
  @Configuration
  public class BeanConfig {
    // 把monsterBeanName作为id, Monster作为value放入到容器中
    // 默认把方法名作为id
    // 也可以指定id
    // 默认是单例的, 使用Scope注解可指定为多例
    @Bean(name = "monster01")
    @Scope("prototype")
    public Monster monsterBeanName() {
      return new Monster(1, "黑马喽", "立棍", 500);
    }
  }
  ```

  

- Configuration标注的配置类自身也会被放入到容器中(它是一个@Component)

- proxyBeanMethods属性

- proxyBeanMethods:代理 bean 的方法
* (1) Full(proxyBeanMethods = true)、【保证每个@Bean 方法被调用多少次返回的组件都是 单实例的, 是代理方式】
* (2) Lite(proxyBeanMethods = false)【每个@Bean 方法被调用多少次返回的组件都是新创 建的, 是非代理方式】
* (3) 特别说明: proxyBeanMethods 是在 调用@Bean 方法 才生效，因此，需要先获取 BeanConfig 组件，再调用方法
* 而不是直接通过 SpringBoot 主程序得到的容器来获取 bean, 注意观察直接通过 ioc.getBean() 获取 Bean, proxyBeanMethods 值并没有生效
* (4) 如何选择: 组件依赖必须使用 Full 模式默认(单例)。如果不需要组件依赖使用 Lite 模式
 * (5) Lite 模式 也称为轻量级模式，因为不检测依赖关系，运行速度快

  - 测试

```java
BeanConfig beanConfig = ctx.getBean(BeanConfig.class);
Monster monster = beanConfig.monsterBeanName();
Monster monster2 = beanConfig.monsterBeanName();
System.out.println(monster2 == monster);
```

- @Configuration(proxyBeanMethods = true)

	- true, 两个对象相等

- @Configuration(proxyBeanMethods = false)

	- false, 两个对象不等

- 配置类可以有多个 就和 Spring 可以有多个 ioc 配置文件是一个道理

- 可以在配置类上加@ComponentScan("org.xxx.myboot")注解, 指定扫描的包

### @Import注解

- 导入其他类到容器中

	- public class Cat {}
public class Dog {}

	- @Import({Dog.class, Cat.class})

- 注意@Import 方式注入的组件, 默认组件的名字id就是全类名
org.xxx.boot.bean.Dog
org.xxx.boot.bean.Cat

### @Conditional

- 1. 条件装配:满足 Conditional 指定的条件，则进行组件注入

- 2. @Conditional 是一个根注解，下面有很多扩展注解

  -  @ConditionalOnBean

  ```java
  @Bean
  // 表示只有当容器注入了id=monster01的bean时才进行注入
  @ConditionalOnBean(name = "monster01")
  public Dog dog01() {
    return new Dog();
  }
  ```

  也可以放在类名上
  则表示对该配置类中所有要注入的组件都进行条件约束

### @ImportResource

- 作用:原生配置文件引入, 也就是可以直接导入 Spring 传统的 beans.xml ，可以认 为是 SpringBoot 对 Spring 容器文件的兼容


```java
@ImportResource({"classpath:beans.xml"})
public class BeanConfig {}
```

### 配置绑定
@ConfigurationProperties(prefix = "zangxin.dog")

- 读取到 SpringBoot 核心配置文件 application.properties 的内容，并且把它作为 JavaBean的属性,必须作为一个组件, 提供gettter/setter

  - #自定义

    ```properties
    zangxin.dog.id=1
    zangxin.dog.name=狗昊
    zangxin.dog.color=white
    ```

    ```java
    @Data
    @ConfigurationProperties(prefix = "zangxin.dog")
    @Component
    public class Dog {
      private Integer id;
      private String name;
      private String color;
    }
    ```

  - bean的id是类名小写

- 注意加入依赖

```java
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-configuration-processor</artifactId>
  <optional>true</optional>
  </dependency>
```



### 配置绑定方式二
@EnableConfigurationProperties(Dog.class)

- 注释掉实体类上的@Component
  在配置类加上注解

  ```java
  @EnableConfigurationProperties(Dog.class)
  @Data
  @ConfigurationProperties(prefix = "zangxin.dog")
  // @Component
  public class Dog {
    private Integer id;
    private String name;
    private String color;
  }
  ```

  ```java
  @EnableConfigurationProperties({Dog.class})
  @Configuration(proxyBeanMethods = true)
  public class BeanConfig {}
  ```

  

  - bean的id变成了
  zangxin.dog-org.xxx.boot.bean.Dog

## [springboot底层机制]

Tomcat 启动分析 + Spring 容器初始化 +Tomcat 如何关联 Spring 容器

### 组件扫描原理:
@Configuration+@Bean注解底层还是IO/文件扫描+注解+反射+集合+映射

### SpringBoot 是怎么启动 Tomcat

- 启动入口：通过SpringApplication.run(Application.class, args)启动应用。

上下文初始化：创建AnnotationConfigServletWebServerApplicationContext（Spring Boot 2.x+的默认Web应用上下文）。

触发onRefresh()：在上下文刷新阶段，调用ServletWebServerApplicationContext.onRefresh()方法。

创建Web服务器：在onRefresh()中调用createWebServer()，通过ServletWebServerFactory（如TomcatServletWebServerFactory）创建并启动Tomcat。

启动Tomcat：最终调用Tomcat.start()启动嵌入式Tomcat。

### 自定义boot

```java
//MyConfig

@Configuration
@ComponentScan("org.xxx.myboot")
public class MyConfig {
  // 注入bean到容器中
  @Bean
  public Duck duck() {
    return new Duck();
  }
}
```



```java
//MyApp

public class MyApp {
  public static void main(String[] args) {
    MySpringApplication.run();
  }
}
```



```java
// MySpringApplication
public class MySpringApplication {
  // 创建tomcat对象, 并关联spring容器
  public static void run() {
    try {
      Tomcat tomcat = new Tomcat();
      tomcat.setPort(43999);
      // 1.让tomcat将请求转发到SpringWeb容器, 因此需要关联
      // 2. context path: /myboot
      // 3.项目的路径: tomcat在这个路径找到MyWebApplicationInitializer调用onStartup方法
      tomcat.addWebapp("/myboot", "/Users/qingsongcai/IdeaProjects/j2025/springboot_/boot_base");
      // 启动tomcat
      tomcat.start();
      // 等待请求
      tomcat.getServer().await();
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}
```



- - 

- MyWebApplicationInitializer

 * 初始化器
 * 1.创建spring容器
 * 2.加载spring容器的配置-按照注解的方式
 * 3.完成spring容器配置的bean的创建,依赖注入
 * 4.创建前端控制器 DispatcherServlet, 并让其持有Spring容器
 * 6.当DispatcherServlet持有容器, 就可以进行分发映射
 * 7.onStartup 是tomcat调用, 并把ServletContext对象传入
 
```java
    public class MyWebApplicationInitializer implements WebApplicationInitializer {
      @Override
      public void onStartup(ServletContext servletContext) throws ServletException {
        System.out.println("startup.....启动");
        // 创建容器
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        // 在容器中注册MyConfig类, 让容器知道在哪里扫包
        ctx.register(MyConfig.class);
    ctx.refresh();// 完成bean的创建和依赖注入
        // 创建dispatcherServlet, 并让其持有容器
        DispatcherServlet dispatcherServlet = new DispatcherServlet(ctx);
        ServletRegistration.Dynamic registration = servletContext.addServlet("app", dispatcherServlet);

        // 当tomcat启动时,加载dispatcherServlet
        registration.setLoadOnStartup(1);
        // tomcat拦截所有请求,并进行分发处理
        registration.addMapping("/*");
    ```
}
 }

### 依赖

```xml
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>2.5.3</version>
  <relativePath></relativePath>
</parent>
<groupId>org.xxx</groupId>
<artifactId>boot_base</artifactId>
<version>1.0-SNAPSHOT</version>

<properties>
  <maven.compiler.source>17</maven.compiler.source>
  <maven.compiler.target>17</maven.compiler.target>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
      <exclusion>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-tomcat</artifactId>
      </exclusion>
    </exclusions>
  </dependency>
  <dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-core</artifactId>
    <version>8.5.75</version>
  </dependency>
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
  </dependency>
  <dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-jasper</artifactId>
    <version>8.5.75</version>
  </dependency>
</dependencies>
```



## Spring Initailizr

Spring 官方提供的 Spring Initializr 来构建 Maven 项目，能完美支持 IDEA 和 Eclipse

yaml/yml

### 语法

- 1. 形式为 key: value;注意: 后面有空格

- 2. 区分大小写

- 3. 使用缩进表示层级关系

- 4. 缩进不允许使用 tab，只允许空格 [有些地方也识别 tab , 推荐使用空格]

- 5. 缩进的空格数不重要，只要相同层级的元素左对齐即可

- 6. 字符串无需加引号

- 7. yml 中, 注释使用 #

### 数据类型

- 1. 字面量:单个的、不可再分的值。date、boolean、string、number、null

- 2. 键值对形式为 key: value 

- 3. 对象:键值对的集合, 比如 map、hash、set、object

	- 行内写法: k: {k1:v1,k2:v2,k3:v3} monster: {id: 100,name: 牛魔王}

	- #或换行形式
k:
k1: v1
k2: v2
k3: v3 
monster: 
 id: 100
 name: 牛魔王

- 4.  数组:一组按次序排列的值, 比如 array、list、queue

	- k:
- v1 
- v2 
- v3

### 实例复杂对象的yml

```java
@Data
@ConfigurationProperties(prefix = "monster")
@Component
public class Monster {
  private Integer id;
  private String name;
  private String skill;
  private Integer age;
  private Boolean isMale;
  private Date birth;
  private Car car;
  private String[] skills;
  private List<String> hobby;
  private Map<String, Object> wife;
  private Set<Double> salaries;
  private Map<String, List<Car>> cars;
}
```



```yaml
monster:
id: 100
name: 小魔女
age: 400
isMale: true
birth: 2000/11/12
car:
  name: 宝马
  price: 200000
skill: 疯疯熊
skills:

  - 治疗
  - 藤蔓
  - 偏爱
  - 我的剧场1a
    hobby:
  - 逛街
  - 刷怪
    wife:
      f1: 一流灯光师
      f2: 扫把很卡哇伊
    salaries:
  - 10000
  - 30000
    cars:
      group1:
    - name: 宝马
      price: 1000000
    - name: 奔驰
      price: 2000000
      group2:
    - name: 宝马x
      price: 1000000
    - name: 奔驰g
      price: 2000000
```

注意: 

application.properties和application.yml同时配置时, application.properties的优先级高

字符串无需加引号

### idea中编辑yml提示

- 加入依赖

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-configuration-processor</artifactId>
  <optional>true</optional>
</dependency>
```

- 输入你在 Bean 配置的 prefix 名 字就会提示.

## WEB 开发-静态资源访问

1. 只要静态资源放在类路径下: /static 、 /public 、 /resources 、 /META-INF/resources

可以被直接访问- 

- 在中WebProperties类中定义了资源路径:CLASSPATH_RESOURCE_LOCATIONS = { "classpath:/META-INF/resources/",
				"classpath:/resources/", "classpath:/static/", "classpath:/public/" };

- 下面都是classes目录下的
META-INF/resources/1.webp
public/2.jpeg
static/3.jpeg
resources/5.png
上面都可以访问到
4.jpeg这个不能访问到

- 访问地址,已经自动映射好了

	- http://localhost/1.webp
http://localhost/2.jpeg
http://localhost/3.jpeg
http://localhost/5.png

### 2. 静态资源访问注意事项和细节

- 1.静态映射是 /**, 也就是对所有请求拦截，请求进来，先看 Controller
能不能处理，不能处理的请求交给静态资源处理器，如果静态资源找不到则响应 404 页面

- 2.如果静态资源uri和controller冲突怎么办
- META-INF/resources/1.webp
	
- @RequestMapping("/1.webp")
	public String hi() {
  return "hi";
  }

- 请求的http://localhost/1.webp结果是controller返回hi, 而不是图片
	
- 解决办法, 静态资源路径映射
	
	- #静态资源路径映射
	spring.mvc.static-path-pattern=/dog/**

	- 访问OK: http://localhost/dog/1.webp
	
- 3.如何自定义静态资源路径

	- 自定义的路径会覆盖掉默认的路径, 所以配置时要加上默认的路径


```properties
spring.web.resources.static-locations=classpath:/myimg/,classpath:/META-INF/resources/,classpath:/resources/, classpath:/static/, classpath:/public/
```



## Rest 风格请求处理

### 请求方法/数据库操作: get/查询, post/新增, put/修改, delete/删除

```java
@RestController
@RequestMapping("/rest")
public class RestStyleController {
  @GetMapping
  public String getById() {
    return "查询根据id";
  }

  @PostMapping
  public String insert() {
    return "新增操作";
  }

  @PutMapping
  public String update() {
    return "修改操作";
  }

  @DeleteMapping
  public String delete() {
    return "删除操作";
  }
}
```



- 用postman调用

### 注意

- postman可以直接发送put/delete/PATCH请求,可不设置 Filte

- 要 SpringBoot 支持 页面表单的 Rest 功能,则需要配置

  -  Rest 风格请求核心 Filter:HiddenHttpMethodFilter

  	- 表单请求会被 HiddenHttpMethodFilter 拦截 , 获取到表单 _method 的值， 再判断是 PUT/DELETE/PATCH

  - 配置:
  spring.mvc.hiddenmethod.filter.enabled=true

  - post表单请求时加上参数_method=put/delete

    ```xml
    <input type="hidden" name="_method" value="delete">
    ```

### 为什么返回的是字符串数据, 而不是跳转页面

- 因为使用@RestController

	- RestController=@Controller+@ResponseBody

- @ResponseBody

	- 指定数据放入到响应体中,而不是跳转页面

- 如果使用@Controller, 但是没有配置视图解析器, 则会寻找返回String作为url对应Controller, 没有找到对应的Controller就会报错

- 如果配置了视图解析器,就会跳转页面

  - 静态文件uri映射路径

    spring.mvc.static-path-pattern=/dog/**

视图解析器前缀和后缀

spring.mvc.view.prefix=/dog/
spring.mvc.view.suffix=.html

如果视图名和Controller的uri相同, 则还是以视图解析器为准



## 接收参数注解

### @PathVariable

- 使用

  ```java
  // /para/100/king
  @RequestMapping("/para/{id}/{name}")
  public String pathVariable(@PathVariable("id") Integer id,
                             @PathVariable("name") String name,
                             @PathVariable Map<String, String> map) {}
  ```

  - 使用map可以全部接收

###  @RequestHeader

```java
@GetMapping("/requestHeader")
public String requestHeader(@RequestHeader("HOST") String host,
                            @RequestHeader Map<String, String> header) {}
```



- 使用map可以全部接收

### @RequestParam 

```java
@GetMapping("/requestParam")
public String requestParam(@RequestParam("name") String name,
                           @RequestParam("version") List<String> versions,
                           @RequestParam Map<String, String> map) 
```



- list/数组用来接收,复选框的值

- map可以全部接收, 但是复选框只能接收一个, 因为,map的key是唯一的, 重复放入就是覆盖了

### @CookieValue

```java
@GetMapping("/cookieValue")
public String cookieValue(@CookieValue(value = "cookie_key") String cook_value,
                          @CookieValue(value = "username", required = false) Cookie cookie) {}
```

- 可以接收cookie的值也可以接收整个cookie键值对, required=false, 表示非强制要获取这个cookie, 但是注意这样cookie可能为null值 

### @RequestBody

```java
@PostMapping(value = "/requestBody")
// conten这样接收的是: name=xxx&age=22
public String requestBody(@RequestBody String content) {}
```

// 从请求体中取出数据

- todo: 以后再看(问题复现: 使用post请求, 返回视图, 不用@ResponseBody)注意post请求不能跳转页面(我了个草)

  请求方法保留：转发是服务器内部的行为，完全保留原始请求的HTTP方法(还是不行呐!!)

###  @ModelAttribute

- 从请求域中获取数据


```java
@GetMapping("/login")
public String login(HttpServletRequest request) {
  request.setAttribute("user", "zangxin");
  return "forward:/ok";
}
```



```java
@GetMapping("/ok")
@ResponseBody
public String loginOk(@RequestAttribute(value = "user", required = false) String user,
                      HttpServletRequest request) {
  // 这样的效果和@RequestAttribute一样
  Object user2 = request.getAttribute("user");
  log.info("user={},user2={}", user, user2);
  return "success";
}
```



### @SessionAttribute

- 获取Session域中数据


```java
@GetMapping("/ok")
@ResponseBody
public String loginOk(@RequestAttribute(value = "user", required = false) String user,
                      HttpServletRequest request) {
  // 这样的效果和@RequestAttribute一样
  Object user2 = request.getAttribute("user");
  log.info("user={},user2={}", user, user2);
  return "success";
}
```



### 复杂参数

- 介绍

	- 1. 在开发中，SpringBoot 在响应客户端请求时，也支持复杂参数

	- 2. Map、Model、Errors/BindingResult、RedirectAttributes、ServletResponse、SessionStatus、
UriComponentsBuilder、ServletUriComponentsBuilder、HttpSession

	- 3. Map、Model 数据会被放在 request 域， 底层 request.setAttribute()

	- 4. RedirectAttributes 重定向携带数据

- Map, model自动放入请求域中

```java
// 响应一个register请求
@GetMapping("/register")
public String register(Map<String, Object> map, Model model, HttpServletResponse response) {
  // map和model中数据会放入到请求域中
  map.put("user", "zangxin");
  map.put("age", 22);
  model.addAttribute("gender", "male");
  // 还可以设置cookie
  response.addCookie(new Cookie("hobby", "gal"));
  return "forward:/registerOk";
}
```

```java
@GetMapping("/registerOk")
@ResponseBody
public String registerOk(HttpServletRequest request) {
  // 从这里可以之前放入map和model中数据
  Object user = request.getAttribute("user");
  Object age = request.getAttribute("age");
  Object gender = request.getAttribute("gender");
  log.info("{},{},{},{}", user, age, gender, request.getCookies()[1].getName());
  return "" + user + age + gender;
}
```



### 自定义对象参数

- 封装pojo

```java
@Data
public class Monster {
  private Integer id;
  private String name;
  private Integer age;
  private Boolean isMarried;
  private Date birth;
  private Car car;
  @Data
  public static class Car {
    private String name;
    private Double price;
  }
}
```



- 表单


```html
<form action="/saveMonster" method="post">
  编号: <input name="id" value="100"><br/>
  姓名: <input name="name" value="牛魔王"/> <br/>
  年龄: <input name="age" value="120"/> <br/>
  婚否: <input name="isMarried" value="true"/> <br/>
  生日: <input name="birth" value="2000/11/11"/> <br/>
  坐骑: <input name="car.name" value="法拉利"/><br/>
  价格: <input name="car.price" value="99999.9"/>
  <input type="submit" value="保存"/>
</form>
```



- 获取级联对象的属性

  ```java
  // 接收pojo对象
  @PostMapping("/saveMonster")
  @ResponseBody
  public String saveMonster(Monster monster) {
    log.info("monster={}", monster);
    return "success";
  }
  ```

  

- 不需要写@RequestBody, 写了反而出错
这个是x-www-form-urlencoded表单, 写了解析不了, 如果是json数据则需要写@RequestBody

	- Resolved [org.springframework.web.HttpMediaTypeNotSupportedException: Content type 'application/x-www-form-urlencoded;charset=UTF-8' not supported]

### 参数转换器

- 定义

	- 1. SpringBoot 在响应客户端请求时，将提交的数据封装成对象时，使用了内置的转换器

	- SpringBoot 提供了 124 个内置转换器

		- String转Integer
String转Date等

	- 支持自定义转换器

	- 源码在: GenericConverter-ConvertiblePair

- 自定义转换器

  - 需求:将把String类型的:法拉利,99999.9 转换成Car对象

  - 写配置类自定义转换器

    ```html
    <input name="car" value="法拉利,99999.9"/>
    ```

    ```java
    private Car car;
    @Data
    public static class Car {
      private String name;
      private Double price;
    }
    ```

  ```java
  @Configuration(proxyBeanMethods = false)
  public class WebConfig {
    //  注入bean WebMvcConfigurer
    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
      return new WebMvcConfigurer() {
        @Override
        public void addFormatters(FormatterRegistry registry) {
          // 增加一个自定义的转换器
          // 把String类型的:法拉利,99999.9 转换成Car对象
          // 增加的自定义转换器会注册到converts容器中
          // converters 底层是ConcurrentHashMap内置有124个转换器
          registry.addConverter(new Converter<String, Monster.Car>() {
            @Override
            public Monster.Car convert(String source) {
              if (ObjectUtils.isEmpty(source)) return null;
              // 把String类型的:法拉利,99999.9 转换成Car对象
              String[] split = source.split(",");
              Monster.Car car = new Monster.Car();
              car.setName(split[0]);
              car.setPrice(Double.valueOf(split[1]));
              return car;
            }
          });
        }
      };
    }
  }
  ```

  注意点,两个一样类型转换器只会有一个生效, 一个会被覆盖掉,详细见converts的map-key设置:源类型->转换类型


	java.lang.String -> org.xxx.bootweb.bean.Monster=java.lang.String -> org.xxx.bootweb.bean.Monster : org.xxx.bootweb.config.WebConfig$1$3@32a2b30,java.lang.String -> org.xxx.bootweb.bean.Monster : org.xxx.bootweb.config.WebConfig$1$2@3811cadd

### 处理json数据

- 在引入spring-boot-starter-web后,就引入了jackson

- 返回Json

  - AbstractJackson2HttpMessageConverter#writeInternal 方法根据response的contentType来选择不同ObjectMapper(jackson)来我们的返回值(类型class,和对象)转换成html或者, json

```java
@Override
protected void writeInternal(Object object, @Nullable Type type, HttpOutputMessage outputMessage)
  throws IOException, HttpMessageNotWritableException {

  MediaType contentType = outputMessage.getHeaders().getContentType();
  JsonEncoding encoding = getJsonEncoding(contentType);

  Class<?> clazz = (object instanceof MappingJacksonValue ?
                    ((MappingJacksonValue) object).getValue().getClass() : object.getClass());
  ObjectMapper objectMapper = selectObjectMapper(clazz, contentType);
  Assert.state(objectMapper != null, "No ObjectMapper for " + clazz.getName());
```



### 内容协商

- 文档

	- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Content_negotiation

	- 在 HTTP 协议中，**内容协商**是一种机制，用于为同一 URI 提供资源不同的表示形式，以帮助用户代理指定最适合用户的表示形式（例如，哪种文档语言、哪种图片格式或者哪种内容编码）。

- 定义

  - 1.根据客户端的接收能力不同, SpringBoot返回不同媒体类型的数据

  - 2. 比如: 客户端 Http 请求 Accept: application/xml 则返回 xml 数据，客户端 Http 请求 Accept: application/json 则返回 json 数据

    - postman请求
      Accept:application/json

    - 返回: 

      ```json
      {"id":999,"name":"黑马喽","age":500,"isMarried":false,"birth":"2025-03-14T13:18:30.897+00:00","car":{"name":"精斗云","price":888888.0}}
      ```

    - postman请求
      Accept:application/xml

    - 返回: 

      ```xml
      <Monster>
        <id>999</id>
        <name>黑马喽</name>
        <age>500</age>
        <isMarried>false</isMarried>
        <birth>2025-03-14T13:19:42.148+00:00</birth>
        <car>
          <name>精斗云</name>
          <price>888888.0</price>
        </car>
      </Monster>
      ```

      

      - 返回xml要引入依赖

      ```xml
      <!--引入处理返回xml数据格式的-->
      <dependency>
        <groupId>com.fasterxml.jackson.dataformat</groupId>
        <artifactId>jackson-dataformat-xml</artifactId>
      </dependency>
      ```

      

- 原理

  ```java
  MediaType contentType = outputMessage.getHeaders().getContentType();
  ObjectMapper objectMapper = selectObjectMapper(clazz, contentType);
  JsonGenerator generator = objectMapper.getFactory().createGenerator(outputStream, encoding)
  ```

  - 一句话: 根据contentType来获取不同ObjectMapper的实现类,来把返回对象转换成不同xml和json

  	- ObjectMapper

  	- JsonMapper

  	- XmlMapper

- Accept请求头权重

	- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Accept

	- Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,\*/*;q=0.8,application/signed-exchange;v=b3;q=0.7

	- application/xhtml+xml和application/xml;q=0.9权重是0.9大于*/*;q=0.8, 所以应该优先返回xml, 如果不能返回xml, 就使用\*/*

	- \*/* 任何 MIME 类型

- ;q=（q 因子加权）
	使用的值根据一个称为权重的相对质量价值来排序，表达了优先级顺序。

- 指定参数要求的类型,更为灵活的方式

	- 1. Postman 可以通过修改 Accept 的值，来返回不同的数据格式

	- 2. 对于浏览器，我们无法修改其 Accept 的值，怎么办? 

		- 解决方案: 开启支持基于请求参数 的内容协商功能

		- 配置

		  - 开启基于请求参数的内容协商

  ```properties
		  spring.mvc.contentnegotiation.favor-parameter=true
  ```
		
  

		- 使用

	- 返回json
		http://localhost/returnJson?format=json

			- 返回xml
http://localhost/returnJson?format=xml
		
- 原理
		
	- org.springframework.boot.autoconfigure.web.servlet.WebMvcProperties.Contentnegotiation#favorParameter
		
	- Whether a request parameter ("format" by default) should be used to determine the requested media type.
		
		- 也可以改变参数的名字: format->改成其他的名字
		
			- spring.mvc.contentnegotiation.parameter-name=ggstar
		
		- 注意，参数 format 是规定好的 ， 在开启请求参数的内容协商功能后，SpringBoot 底层 ParameterContentNegotiationStrategy 会通过 format 来接收参数，然后返回对应的媒体类型/ 数据格式 , 当然 format=xx 这个 xx 媒体类型/数据格式 是 SpringBoot 可以处理的才行，不 能乱写.

@MatrixVariable

## 拦截器

原理, 详见SpringMvc拦截器

作用

- 需求: 使用拦截器防止用户非法登录, 使用拦截器就不需要在每个方法验证了

使用步骤

-  编写一个拦截器实现 HandlerInterceptor 接口

  ```java
  @Slf4j
  public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
      String requestURI = request.getRequestURI();
      log.info("uri:{}", requestURI);
      // 从Session中获取登录信息
      Object admin = request.getSession().getAttribute("admin");
      if (admin instanceof Admin a) {
        log.info("{}登录成功, ", a.getName());
        return true;// 放行
      } else { // 返回null时,说明未登录
        log.error("未登录!");
        request.setAttribute("msg", "请登录之后再访问");
        request.getRequestDispatcher("/login").forward(request, response);
        return false;
      }
    }
  ```

  

- 拦截器注册到配置类中(实现 WebMvcConfigurer 的 addInterceptors)

```java
@Configuration
public class Config implements WebMvcConfigurer {
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new LoginInterceptor())
      .addPathPatterns("/**")
      .excludePathPatterns("/", "/login", "/images/**","/favicon.ico");
  }
}
```



- 指定拦截规则

	- 拦截所有请求
 .addPathPatterns("/**")
- 指定放行规则

	- 放行的请求
  .excludePathPatterns("/", "/login", "/images/**","/favicon.ico");

### 注意 事项

- uri和URL的区别

	- URI = Universal Resource Identifier

	- URL = Universal Resource Locator

	- Identifier:标识符，Locator:定位器 从字面上来看, URI 可以唯一标识一个资源, URL 可以 提供找到该资源的路径

- 注册拦截器的方式二

  ```java
  @Configuration
  public class WebConfig {
    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
      return new WebMvcConfigurer() { @Override
        public void addInterceptors(InterceptorRegistry registry) {
          //加入我们的拦截器
          registry.addInterceptor(new LoginInterceptor())
            .addPathPatterns("/**")
            .excludePathPatterns("/", "/login", "/images/**","/favicon.ico");
        }
  ```

  

## 文件上传

### 后端

```java
@PostMapping("/upload")
@ResponseBody
public String upload(
  @RequestParam("name") String name,
  @RequestParam("email") String email,
  @RequestParam("age") String age,
  @RequestParam("job") String job,
  @RequestParam("header") MultipartFile header,
  @RequestParam("photos") MultipartFile[] photos
) throws Exception {
  log.info("入参:name={}, email = {}, age = {}, job = {}, header = {}, photos = {}", name, email, age, job, header, photos);
  // 如果信息都成功得到, 那么就保存文件
  File uploadDir = getUploadDir();
  // 单个上传文件
  if (header != null && !header.isEmpty()) {
    String originalFilename = header.getOriginalFilename();
    header.transferTo(new File(uploadDir, originalFilename));
  }
  // 处理多个上传文件
  if (photos != null && photos.length > 0) {
    for (MultipartFile photo : photos) {
      if (!photo.isEmpty()) {
        String originalFilename = photo.getOriginalFilename();
        photo.transferTo(new File(uploadDir, originalFilename));
      }
    }
  }
  return "注册/上传成功";
}

// 获取上传目录路径
// 上传目录在类路径/static/images/upload
private File getUploadDir() {
  try {
    File path = ResourceUtils.getFile("classpath:");
    // 路径也可以卸载配置文件中,用@Autowired注入
    File file = new File(path, "static/images/upload");
    if (!file.exists()) {
      file.mkdir();
    }
    log.info("upload dir={}", file.getAbsolutePath());
    return file;
  } catch (Exception e) {
    throw new RuntimeException(e);
  }
}
```



- 前端

```html
<form action="#" method="post" th:action="@{/upload}" enctype="multipart/form-data">
  用户名:<input type="text" style="width:150px" name="name"/><br/><br/>
  电 邮:<input type="text" style="width:150px" name="email"/><br/><br/>
  年 龄:<input type="text" style="width:150px" name="age"/><br/><br/>
  职 位:<input type="text" style="width:150px" name="job"/><br/><br/>
  头 像:<input type="file" style="width:150px" name="header"><br/><br/>
  <!--multiple可以上传多个文件-->
  宠 物:<input type="file" style="width:150px" name="photos" multiple><br/><br/>
  <input type="submit" value="注册"/>
  <input type="reset" value="重新填写"/>
</form>
```



### 注意事项

- 上传文件大小

  - 找过大小就报异常The field header exceeds its maximum permitted size of 1048576 bytes

  - 配置文件上传大小

  ```properties
  spring.servlet.multipart.max-file-size=100MB
  ```

  

- 创建目录的命令mkdir, 而不是createNewFile

- deepseek: 如果需要在打包后（jar/war）仍能正常工作，建议将上传目录设置为外部绝对路径（如：/var/uploads），而不是放在类路径中，因为jar包内的路径通常是只读的。

## 异常处理

注意登录拦截器的拦截所有/**, 先登录后再测试

默认异常/错误处理页面

- Spring Boot提供/error处理所有错误的映射, 也就是当出现错误时, SpringBoot底层会提供请求转发到/error这个映射上

	- 当你访问一个瞎写的url:http://localhost/xxx, 就会返回一个
Whitelabel Error Page

- 2. 对于机器客户端，它将生成 JSON 响应，其中包含错误，HTTP 状态和异常消息的详细信 息。对于浏览器客户端，响应一个"whitelabel"错误视图，以 HTML 格式呈现相同的数据

- 原理

  ```text
  DefaultErrorViewResolver类
  
  Default ErrorViewResolver implementation that attempts to resolve error views using well known conventions. Will search for templates and static assets under '/error' using the status code and the status series.
  For example, an HTTP 404 will search (in the specific order):
  '/<templates>/error/404.<ext>'
  '/<static>/error/404.html'
  '/<templates>/error/4xx.<ext>'
  '/<static>/error/4xx.html'
  ```

  

### 自定义错误页面

- 错误页面存放位置如DefaultErrorViewResolver类中

- 404.html>4xx.html的展示优先级

- 错误消息modelAndView

  ```json
  {"view":null,"model":{"timestamp":1742014303472,"status":500,"error":"Internal Server Error","path":"/manage.html"},"status":null,"empty":false,"reference":true,"modelMap":{"timestamp":1742014303472,"status":500,"error":"Internal Server Error","path":"/manage.html"},"viewName":"error/500"}
  ```

  

- 可以从错误消息modelAndView中取出信息给前端展示用

  ```xml
  <h1>500错误</h1>
  状态码:<h1 th:text="${status}"></h1>
  错误信息:<h1 th:text="${error}"></h1>
  ```

- 在拦截器中给/error放行

### 全局异常处理

- 全局异常处理优先级高于错误页面

- 定义

	- 1. @ControllerAdvice+@ExceptionHandler 处理全局异常

	- 2. 底层是 ExceptionHandlerExceptionResolver 支持的

- 需求

	- 1. 需求: 全局异常使用, 当发生 ArithmeticException、NullPointerException 时，不使 用默认异常机制匹配的 xxx.html , 而是显示全局异常机制指定的错误页面

- 实现

  ```java
  @Slf4j
  @ControllerAdvice // 标识一个全局异常处理器
  public class GlobalExceptionHandler {
    @ExceptionHandler({ArithmeticException.class, NullPointerException.class})
    public String ArithmeticExceptionHandler(Exception e, Model model) {
      log.info("捕获到了异常~~😁: {}", e.getMessage());
      // 放入错误消息给, 给前端展示使用
      model.addAttribute("msg", e.getMessage());
      return "/error/global"; // templates/error/global.html
    }
  }
  ```

  

- 原理 

	- 异常处理方法还可以传入参数handlerMethod, 即:发生异常的方法

	- org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver#doResolveHandlerMethodException

		- 根据异常类型在GlobalExceptionHandler中找对应异常类型的ExceptionHandler, 然后通过反射调用异常处理方法, 获取异常处理的modelAndView

### 自定义异常

- 1. 如果 Spring Boot 提供的异常不能满足开发需求，也可以自定义异常 

- 2. @ResponseStatus+自定义异常

- 3. 底 层 是 ResponseStatusExceptionResolver ， 底 层 调 用 response.sendError(statusCode, resolvedReason);

	- 他会遍历所有所有的异常解析器,来获取异常处理器

- 4. 当抛出自定义异常后，仍然会根据状态码，去匹配使用 x.html 显示

- 使用

  - 自定义403Forbidden异常

    ```java
    // 403异常状态码
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public class AccessException extends RuntimeException {
      public AccessException(String message) {
        super(message);
      }
      public AccessException() {
      }
    }
    ```

    

    - 使用

      ```java
      @GetMapping("err403")
      public String forbidden(String name) {
        if (!"tom".equals(name)) {
          throw new AccessException();
        }
        return "forward:/manage.html";
      }
      ```

      

    - 触发错误会跳转
      4xx.html页面去, 这是使用了默认的处理方法

  - 把自定义异常的处理放在自定义的全局异常处理器中

    ```java
    @ExceptionHandler({AccessException.class})
    public String accessExceptionHandler(Exception e, Model model, HandlerMethod handlerMethod) {
      log.info("捕获到了非法访问异常~~😁: {},{},{}", e.getMessage(), model, handlerMethod.getMethod().getName());
      // 放入错误消息给, 给前端展示使用
      model.addAttribute("msg", e.getMessage());
      return "/error/global";
    }
    ```

    

## 拦截器和过滤器的区别

### 1、使用范围不同

- 过滤器 实现的是 javax.servlet.Filter 接口，而这个接口是在 Servlet 规范中定义的，也就是说过滤器 Filter 的使用要依赖于 Tomcat 等容器，Filter 只能在 web 程序中使用

- 拦截器(Interceptor) 它是一个 Spring 组件，并由 Spring 容器管理，并不依赖 Tomcat 等容
器，是可以单独使用的。不仅能应用在 web 程序中，也可以用于 Application 等程序中

### 2、过滤器 和 拦截器的触发时机也不同

- request->tomcat->Filter->Servelt->Interceptor->Controller

- 过滤器 Filter 是在请求进入容器后, 但在进入 servlet 之前进行预处理, 请求结束是在 servlet 处理完以后

- 拦截器 Interceptor 是在请求进入 servlet 后, 在进入 Controller 之前进行预处理的, Controller 中渲染了对应的视图之后请求结束

### 3.过滤器不会处理(拦截)请求转发, 拦截器会处理请求转发

- 拦截器和过滤器的区别.png

## JavaEE三大组件Servlet,Filter,Listener注入容器

### 定义

- 1.Spring-Boot 支持将 Servlet、Filter、Listener 注入Spring 容器, 成为 Spring bean

- 2. 也就是说明 Spring-Boot 开放了和原生 WEB 组件(Servlet、Filter、Listener)的兼容

### 使用

- 方式一: 在启动类上加javaEE组件扫描

  ```java
  @SpringBootApplication
  @ServletComponentScan(basePackages = {"org.xxx.boothyme.servlet"})
  public class App {}
  ```

  

- 方式二: ServletRegistrationBean注册

```java
@Configuration
public class RegisterConfig_ {
  // 注册servlet
  @Bean
  public ServletRegistrationBean servlet_() {
    BootAndServlet bootAndServlet = new BootAndServlet();
    return new ServletRegistrationBean(bootAndServlet, "/servlet01", "/servlet02");
  }

  // 注册过滤器
  @Bean
  public FilterRegistrationBean filter_() {
    Filter_ filter = new Filter_();
    FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(filter);
    filterRegistrationBean.setUrlPatterns(Arrays.asList("/css/*", "/images/*"));
    return filterRegistrationBean;
  }

  // 注册listener
  @Bean
  public ServletListenerRegistrationBean listener_() {
    Listener listener = new Listener();
    return new ServletListenerRegistrationBean(listener);
  }

}
```



- servlet

```java
@WebServlet(name = "BootAndServlet", value = "/BootAndServlet")
public class BootAndServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.getWriter().write("BootAndServlet~~ 在boot中Servlet 完成OK~~~");
  }
```



- filter

```java
@Slf4j
@WebFilter(urlPatterns = {"/css/*","/images/*"})
public class Filter_ implements Filter {
  @Override
  public void doFilter(ServletRequest req, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    HttpServletRequest request = (HttpServletRequest) req;
    log.info("doFilter调用, 过滤uri是: " + request.getRequestURI());
    chain.doFilter(request, response);
  }
```



- listener

  - 举例子: ServletContextListener

```java
@Slf4j
@WebListener
public class Listener implements ServletContextListener {
  @Override
  public void contextInitialized(ServletContextEvent sce) {
    // 加入项目初始化相关的业务代码
    log.info("项目初始化OK~");
  }
  @Override
  public void contextDestroyed(ServletContextEvent sce) {
    log.info("项目销毁了");
  }
}
```



### 注意

- 1注意注入的原生 Servlet 不会被 Spring-Boot 拦截器拦截

	- DispacherServlet的请求路径是/

	- Servlet是优先精确匹配/最长路径匹配原则

		- 注:url优先等级: 精确路径>目录路径>扩展名路径> /* > /

	- 因此对于/ 和 /servlet01, 自然优先匹配/servlet01, 不走SpringMVC的DispatcherServlet那一套了

-  在 SpringBoot 中, 去调用@Controller 目标方法 是按照 DispatherServlet 分发匹配的机 制,

  - 1. DispatcherServletAutoConfiguration 完成对 DispatcherServlet 自动配置

    - DispatcherServlet的路径是  /

-  过滤器配置的 urlPatterns 也会经过 Spring-Boot 拦截器

- 注意: 过滤器配置的 urlPatterns 也会经过 Spring-Boot 拦截器(根据拦截器的规则) 所以为了看到效果，请在拦截器配置放行 /css/\*\*
在 servlet 匹配全部是 /*, 在 Spring-Boot 是/**

## 内置 Tomcat 配置和切换

### 默认容器

- 1. SpringBoot 支持的 webServer: Tomcat, Jetty, or Undertow

- Uses Tomcat as the default embedded container

### 配置类的位置

- org.springframework.boot.autoconfigure.web.ServerProperties

### tomcat的属性

```properties
#tomcat常用属性
#最大工作线程, 默认是200
server.tomcat.threads.max=200
#最小工作线程, 默认是10
server.tomcat.threads.min-spare=10
#tomcat线程达到最大时,接收排队的请求个数(默认是200)
server.tomcat.accept-count=200
#最大连接数, 并发数
server.tomcat.max-connections=2000
#建立连接的超时时间,单位ms
server.tomcat.connection-timeout=100000
```



- 也可以通过类来配置,不过配置项比较少

  ```java
  @Component
  public class CustomizationTomcat
    implements WebServerFactoryCustomizer<ConfigurableWebServerFactory> {
    @Override
    public void customize(ConfigurableWebServerFactory factory) {
      factory.setPort(8848);
    }
  }
  ```

  

### 使用Undertown,maven

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
  <exclusions>
    <exclusion>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-tomcat</artifactId>
    </exclusion>
  </exclusions>
</dependency>
```



## 数据库操作

###  JDBC+HikariDataSource(boot默认)

-  HikariDataSource : 目前市面上非常优秀的数据源, 是 springboot2 默认数据源

- 进行数据库开发，在 pom.xml 引入 data-jdbc starter和mysql驱动>mysql-connector-java
  和jdbc配置

  - data-jdbc starter包括

  	- hikari数据源, 事务,jdbc等

  - jdbc配置

  ```properties
  #数据源配置
  spring.datasource.url=jdbc:mysql://localhost:3306/furn_ssm
  spring.datasource.username=root
  spring.datasource.password=root
  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
  ```

  

### Druid

- 定义

	-  Druid: 性能优秀，Druid 提供性能卓越的连接池功能外【Java 基础】，还集成了 SQL 监 控，黑名单拦截等功能，强大的监控特性，通过 Druid 提供的监控功能，可以清楚知道连 接池和 SQL 的工作情况

- 将 Spring-Boot 的数据源切换成 Druid

  - 引入依赖

  	- druid:1.1.23

  - 配置druid数据源

  ```java
  @Configuration
  public class DruidDataSourceConfig {
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource druidDataSource() {
      DruidDataSource ds = new DruidDataSource();
      return ds;
    }
  }
  ```

  

  - @ConfigurationProperties(prefix = "spring.datasource")
  可以通过这个注解从文件中读取数据源配置

- 为什么配置了Druid就自动替换了hikari呢?

  ```java
  // DataSourceAutoConfiguration类
  @Configuration(proxyBeanMethods = false)
  @Conditional(PooledDataSourceCondition.class)
  @ConditionalOnMissingBean({ DataSource.class, XADataSource.class })
  protected static class PooledDataSourceConfiguration {}
  
  @ConditionalOnMissingBean({ DataSource.class指出当Datasource缺失时才会注入, 现在我们有druidDatasource, 就会不会注入hikari了
  ```

  

- druid监控功能

  - https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98

  - SQL监控功能

    - 配置

  ```java
  @Bean
  @ConfigurationProperties(prefix = "spring.datasource")
  public DataSource druidDataSource() throws SQLException {
    DruidDataSource ds = new DruidDataSource();
    ds.setFilters("stat");
    return ds;
  }
  @Bean
  public ServletRegistrationBean statViewServlet() {
    // druid ui servlet
    StatViewServlet statViewServlet = new StatViewServlet();
    ServletRegistrationBean<StatViewServlet> registrationBean =
      // 参数:servlet,urlPattern
      new ServletRegistrationBean<>(statViewServlet, "/druid/*");
    registrationBean.addInitParameter("loginUsername", "root");
    registrationBean.addInitParameter("loginPassword", "root");
    return registrationBean;
  }
  ```

  

  - 访问url:localhost/druid

  - Web 应用和 URI 监控页面功能开启

    - WebStatFilter 用于采集 web-jdbc 关联监控的数据

    ```java
    @Bean
    public FilterRegistrationBean webStatFilter() {
      WebStatFilter webStatFilter = new WebStatFilter();
      FilterRegistrationBean<WebStatFilter> registrationBean = new FilterRegistrationBean<>(webStatFilter);
      registrationBean.setUrlPatterns(Arrays.asList("/*"));
      registrationBean.addInitParameter("exclusions", "*.js,*.webp,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
      return registrationBean;
    }
    ```

    

  - sql防火墙

    - // 数据源加入wall配置
     ds.setFilters("stat,wall");

  - session监控

- Druid Spring Boot Starter更简单配置

  - 依赖

  ```xml
  <dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.17</version>
  </dependency>
  ```

  

  ```properties
  #druid
  spring.datasource.druid.stat-view-servlet.enabled=true
  spring.datasource.druid.stat-view-servlet.login-username=root
  spring.datasource.druid.stat-view-servlet.login-password=root
  spring.datasource.druid.stat-view-servlet.url-pattern=/druid/*
  #web监控功能
  spring.datasource.druid.web-stat-filter.enabled=true
  spring.datasource.druid.web-stat-filter.url-pattern=/*
  spring.datasource.druid.web-stat-filter.exclusions=*.js,*.webp,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*
  #sql监控-慢查询sql
  spring.datasource.druid.filter.stat.enabled=true
  spring.datasource.druid.filter.stat.slow-sql-millis=1000
  spring.datasource.druid.filter.stat.log-slow-sql=true
  #防火墙-禁止drop table
  spring.datasource.druid.filter.wall.enabled=true
  spring.datasource.druid.filter.wall.config.drop-table-allow=false
  #禁止删除操作
  spring.datasource.druid.filter.wall.config.delete-allow=false
  ```

  - 在开启禁止delete后, 去删除会报异常

## 单元测试

### 依赖

```xml
<!--unit test-->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-test</artifactId>
</dependency>
```



### 测试类

```java
// App.class是启动类
@SpringBootTest(classes = App.class)
public class CrudTest {
  @Autowired
  private JdbcTemplate jdbcTemplate;
  @Test
  void SelectAll() throws Exception {
    String sql = "select * from furn";
    List<Furn> furnList = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Furn.class));
    furnList.forEach(System.out::println);
  }
```



## Spring Boot 整合 MyBatis

### 依赖

- spring-boot-starter-parent:2.5.3
spring-boot-starter-web
mybatis-spring-boot-starter:2.2.2
spring-boot-starter-data-jdbc
mysql-connector-java

### 配置

```properties
#mybatis
#指定mapper.xml位置
mybatis.mapper-locations=classpath:mapper/*.xml
#别名
mybatis.type-aliases-package=org.xxx.bootmybatis.bean
#日志-控制台
mybatis.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
#下划线->驼峰转换
mybatis.configuration.map-underscore-to-camel-case=true
#使用原始的mybatis.xml配置
#mybatis.config-location=
#或者直接在这里application.properties中配置
#如果mybatis配置比较多可以使用mybatis-config.xml(比如说插件,缓存等等)
#建议在application.properties中指定mapper位置,可以使用通配符方便
```



### Mapper接口上加@Mapper

```java
@Mapper
public interface FurnMapper {
  Furn getFurnById(Integer id);
}
```

使用时,直接@Autowired即可 

### Mysql时间json序列化设置格式

```java
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
private Timestamp createTime;
```



### @Mapper注解说明以及优化

- 这个注解指定类是一个@Mapper接口, 所有dao包下的接口全都要加上@Mapper

- 如果有多个包或者类, 一个一个的加@Mapper太繁琐了, 这时可以在启动类上加个@MapperScan(basePackages = "org.xxx.bootmybatis.mapper"),指定包下面的所有Mapper类

## MybatisPlus

### 功能

- 无侵入,强大的 CRUD 操作
支持 Lambda 形式调用,
支持主键自动生成,内置代码生成器,
支持自定义全局通用操作,内置分页插件,
内置性能分析插件,内置全局拦截插件

### 使用

- 依赖,引入mybatisplus就不用引mybatis了,千万要注释掉mybatis的依赖,否则启动不了

  ```xml
  <!--mybatisplus-->
  <dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.10.1</version>
  </dependency>
  ```

  

- 配置

  - mybatisplus配置mapper.xml的默认值

  	- classpath*:/mapper/**/*.xml

  - 基本和mybatis一致,只是前缀变成了mybatis-plus

  ```properties
  #mybatisplus
  mybatis-plus.mapper-locations=classpath:mapper/*.xml
  mybatis-plus.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
  mybatis-plus.type-aliases-package=org.xxx.bootmybatis.bean
  mybatis-plus.configuration.map-underscore-to-camel-case=true
  ```

  

- Mapper接口继承BaseMapper<>

  - BaseMapper提供了很多方法, 现成的直接用,不用写简单sql了


  ```java
  @Mapper
  public interface FurnMapper extends BaseMapper<Furn> {
    Furn getFurnById(Integer id);
  }
  ```

  

- Service接口继承父IService

  ```java
  public interface FurnService extends IService<Furn> {}
  ```

  

- ServiceImpl实现类继承ServiceImpl<BaseMapper,实体类> 实现 Service接口

  ```java
  public class FurnServiceImpl extends ServiceImpl<FurnMapper,Furn> implements FurnService {}
  ```

  

- @TableName注解,解决实体类和表名不一致的问题

	- 如果在表tbl_user和User类进行查询, 会报错
使用@TableName注解可以解决
@TableName("tbl_user")
public class User {}

- 注意点

	- mybatisplus也可以在xml文件中写sql语句

	- // mybatis-plus不能自动填充表不存在的字段 @TableField(exist = false)

### Wrapper条件构造器

- https://baomidou.com/guides/wrapper/

- 查询QueryWrapper/LambdaQueryWrapper

- DDL,UpdateWrapper/LambdaUpdateWrapper

### 分页插件

- 配置

  ```java
  @Configuration
  public class MyBatisPlusConfig {
    /**
  
   * 添加分页插件
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
      MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
      PaginationInnerInterceptor pi = new PaginationInnerInterceptor(DbType.MYSQL);
      interceptor.addInnerInterceptor(pi); // 如果配置多个插件, 切记分页最后添加
      // 如果有多数据源可以不配具体类型, 否则都建议配上具体的 DbType
      return interceptor;
    }
  }
  ```

  

- 分页查询代码

  - 这个使用的是IService的方法


  ```java
  @GetMapping("/page")
  public Result page(
    @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
    @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize,
    @RequestParam(value = "name", defaultValue = "") String name) {
    LambdaQueryWrapper<Furn> lw = new LambdaQueryWrapper<>();
    lw.like(StringUtils.hasText(name), Furn::getName, name);
    Page<Furn> page = furnService.page(new Page<>(pageNum, pageSize), lw);
    return Result.ok(page);
  }
  ```

  

### MybatisX插件/MybatisCodeHelperPro

- 可以生成代码/sql之类,跳转sql.xml和mapper接口

## springboot整合redis

### 定义

- 在 springboot 中 , 整合 redis
可以通过 RedisTemplate 完成对 redis 的操作, 包括设置数据/获取数据

### 依赖

- spring-boot-starter-data-redis
commons-pool2
jackson-databind

### 配置文件

```properties
#Redis 服务器地址
spring.redis.host=192.168.2.85
#Redis 服务器连接端口
spring.redis.port=6379
#Redis 如果有密码,需要配置, 没有密码就不要写
spring.redis.password=root
#Redis 数据库索引(默认为 0)
spring.redis.database=0
```



连接超时时间(毫秒)

spring.redis.timeout=1800000

连接池最大连接数(使用负值表示没有限制)

spring.redis.lettuce.pool.max-active=20

最大阻塞等待时间(负数表示没限制)

spring.redis.lettuce.pool.max-wait=-1

连接池中的最大空闲连接

spring.redis.lettuce.pool.max-idle=5

连接池中的最小空闲连接

spring.redis.lettuce.pool.min-idle=0

### redis配置类

- 是对要使用的 RedisTemplate bean 对象的配置, 可以理解成是一个常规配置.

- 如果不配置, springboot 会使用默认配置, 这个默认配置, 会出现一些问题, 比如: redisTemplate 的 key 序列化等问题, 所以通常我们需要配置

  ```java
  @Configuration
  @EnableCaching
  @SuppressWarnings("all")
  public class RedisConfig {
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
      RedisTemplate<String, Object> template = new RedisTemplate<>();
      System.out.println("template=>" + template);
      RedisSerializer<String> redisSerializer = new StringRedisSerializer();
      Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
      ObjectMapper om = new ObjectMapper();
      om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
      om.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.WRAPPER_ARRAY);
      jackson2JsonRedisSerializer.setObjectMapper(om);
      template.setConnectionFactory(factory);
      // key 序列化方式
      template.setKeySerializer(redisSerializer);
      // value 序列化
      template.setValueSerializer(jackson2JsonRedisSerializer);
      // value hashmap 序列化
      template.setHashValueSerializer(jackson2JsonRedisSerializer);
      return template;
    }
  
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
      RedisSerializer<String> redisSerializer = new StringRedisSerializer();
      // 解决查询缓存转换异常的问题
      Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
      ObjectMapper om = new ObjectMapper();
      om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
      om.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.WRAPPER_ARRAY);
      jackson2JsonRedisSerializer.setObjectMapper(om);
      // 配置序列化(解决乱码的问题),过期时间 600 秒
      RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
        .entryTtl(Duration.ofSeconds(600))
        .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(redisSerializer))
        .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer))
        .disableCachingNullValues();
      RedisCacheManager cacheManager = RedisCacheManager.builder(factory)
        .cacheDefaults(config)
        .build();
      return cacheManager;
    }
  }
  ```

  

### RedisTemplate使用

- @Autowired
private RedisTemplate redisTemplate;

- 操作string

  ```java
  redisTemplate.opsForValue().set("book", "金瓶梅");
  String book = (String) redisTemplate.opsForValue().get("book");
  ```

  

- 操作list

  ```java
  redisTemplate.opsForList().leftPush("books", "水浒传");
  redisTemplate.opsForList().leftPush("books", "三国演义");
  // 一次性放多个
  redisTemplate.opsForList().leftPushAll("books", "西游记", "红楼梦", "道德经");
  // list-取出
  List<String> books = redisTemplate.opsForList().range("books", 0, -1);
  return String.join(",", books);
  ```

- set

	- redisTemplate.opsForSet();

- zset

	- redisTemplate.opsForHash();

- hash

	- redisTemplate.opsForZSet();

### 注意事项,序列化问题

- WRONGTYPE Operation against a key holding the wrong kind of value

- 看报错，是 json 转换异常，实际上是因为 redisTemplate 在做数据存储的时候会把存 储的内容序列化，所以，redisTemplate 读取的时候也会反序列化，而在 redis 客户端 set 的时候并不会做序列化，因此 set 的进去的值在用 redisTemplate 读的时候就会报类 型转换异常了

- 解决方案 : 最简单的就是用程序重新 set 一遍即可,或者不要用其他客户端设置值, 用什么写,就用什么读

