---
layout:     post
title:      "苍穹外卖项目学习"
subtitle:   ""
date:       2024-08-07 14:36:00
author:     "zangxin"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
---



苍穹外卖总结

前端: 管理端web 和用户端(小程序)

后端: java

1.1管理端基于nginx运行

1.2后端基于maven项目构建, 分模块开发

1.3.实体类对象分类

| **名称** | **说明**                                     |
| -------- | -------------------------------------------- |
| Entity   | 实体，通常和数据库中的表对应                 |
| DTO      | 数据传输对象，通常用于程序中各层之间传递数据 |
| VO       | 视图对象，为前端展示数据提供的对象           |
| POJO     | 普通Java对象，只有属性和对应的getter和setter |

1.4数据库, 导入表

1.5启动前端管理台服务, nginx配置反向代理

1.6启动后端工程

1.7登陆功能验证是否成功

1.8完善登录功能,添加md5密码校验, 存储密文

1.9导入接口文档(apifox), 编辑环境设置域名, 测试登录接口

1.10 swagger for java MVC-->knife4j 生成api文档

1.11引入knife4j的坐标, 在配置类中加入knife4j的相关配置, 设置静态资源映射, 否则接口页面无法访问

1.12保存用户接口

1.13 jwt拦截器

1.14ThreadLocal, 为每个线程提供一份单独存储空间, 只有在线程内才能获取到对应的值, 线程外则不能访问

1.15分页查询, 使用pagehelper

1.16 LocalDateTime(create,update_time)时间日期转换两种方式1.jackson JsonFormat2.扩展消息转换器



