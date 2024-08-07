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





# 1.开发环境搭建

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

