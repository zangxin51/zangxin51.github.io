---
layout:     post
title:      "postgreSQL"
subtitle:   ""
date:       2025-04-24 12:07:00
author:     "zangxin"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
---

# postgreSQL



![截屏2025-04-24 12.29.12](../img/md-img/2025-03-26-project-01/截屏2025-04-24 12.29.12.png)



主要特点: 

​	开源, 免费, 平台可移植性

官方文档: https://www.postgresql.org/docs

## 基本教程

### 安装(macOS)

```shell
# 安装
brew install postgresql@15
# 配置环境变量
echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc 
# 安装目录
/opt/homebrew/opt/postgrcreatedb mydbesql@15/bin/postgres
# 运行文件目录
/opt/homebrew/var/postgresql@15
# 启动postgres服务
brew services start postgresql@15
```

验证是否安装成功(创建数据库)

```shell
createdb mydb
```

### 访问数据库

激活数据库

```shell
psql mydb
```

```
mydb=> 普通用户
mydb=# root用户
```

查看psql版本版本

```sql
SELECT version();
```

该`psql`程序有许多非 SQL 命令的内部命令。它们以反斜杠字符“ `\`”开头。例如，您可以通过键入以下内容获取有关各种PostgreSQL SQL命令语法的帮助：

```
mydb=> \h
```

要退出`psql`，请输入：

```
mydb=> \q
```

要查看更多内部命令，请在提示符下输输入

```
mydb=>\?
```

### sql

导入sql: 导入名为basics.sql的sql脚本

```shell
mydb=# \i basics.sql
```

创建表

```sql
CREATE TABLE weather (
    city            varchar(80),
    temp_lo         int,           -- low temperature
    temp_hi         int,           -- high temperature
    prcp            real,          -- precipitation
    date            date
);
```

`varchar(80)`指定一种数据类型，可以存储长度不超过 80 个字符的任意字符串。

`int`是普通的整数类型

`real`是用于存储单精度浮点数的类型。

date 日期

第二张表

```sql
CREATE TABLE cities (
    name            varchar(80),
    location        point
);
```

The `point` type is an example of a PostgreSQL-specific data type.



删除表

```sql
DROP TABLE tablename;
```

插入

```
INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');
```

Constants that are not simple numeric values usually must be surrounded by single quotes (`'`)

```shell
INSERT INTO cities VALUES ('San Francisco', '(-194.0, 53.0)');
```

The `point` type requires a coordinate pair as input.

第二种插入方式(指出列)

```sql
INSERT INTO weather (city, temp_lo, temp_hi, prcp, date)
    VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');
```

查询表

```sql
SELECT * FROM weather;
```

在查询时进行计算 (as可以用来起别名)

```sql
SELECT city, (temp_hi+temp_lo)/2 AS temp_avg, date FROM weather;
```

and

```sql
SELECT * FROM weather WHERE city = 'San Francisco' AND prcp > 0.0;
```

排序

```sql
SELECT * FROM weather ORDER BY city;
```

```sql
SELECT * FROM weather ORDER BY temp_hi;
```

去重

```sql
select distinct city from weather order by city;
```

join 表之间的连接

所有字段*, 还给可以给表起别名

```sql
SELECT * FROM weather w JOIN cities c ON w.city = c.name;
```

特定字段

```sql
SELECT city, temp_lo, temp_hi, prcp, date, location
    FROM weather JOIN cities ON city = name;
```

加上表名.字段(当列名重复的是)

```sql
SELECT weather.city, weather.temp_lo, weather.temp_hi,
       weather.prcp, weather.date, cities.location
    FROM weather JOIN cities ON weather.city = cities.name;
```

另一种连接方式

```sql
SELECT * FROM weather, cities WHERE city = name;
```

上面的连接方式都是内连接

左外连接

因为连接运算符左侧的表的每一行都会在输出中至少出现一次，而右侧的表只会输出与左表中某些行匹配的行。当输出左表中没有与右表匹配的行时，右表的列将替换为空 (null)

```sql
SELECT * FROM weather LEFT OUTER JOIN cities ON weather.city = cities.name;
```

*自连接*

```sql
SELECT w1.city, w1.temp_lo AS low, w1.temp_hi AS high,
       w2.city, w2.temp_lo AS low, w2.temp_hi AS high
    FROM weather w1 JOIN weather w2
        ON w1.temp_lo < w2.temp_lo AND w1.temp_hi > w2.temp_hi;
```



聚合函数

An aggregate function computes a single result from multiple input rows. For example, there are aggregates to compute the `count`, `sum`, `avg` (average), `max` (maximum) and `min` (minimum) over a set of rows.

```sql
select max(temp_lo) from weather;
```

聚合函数不能用在where条件中

This restriction exists because the `WHERE` clause determines which rows will be included in the aggregate calculation; so obviously it has to be evaluated before aggregate functions are computed.

如果想查询最大天气对应的城市, 

```sql
# 这种方式行不通
SELECT city FROM weather WHERE temp_lo = max(temp_lo);     WRONG
```

可以使用子查询(subquery)来完成目标

```sql
select city from weather where temp_lo = (select max(temp_lo) from weather);
```

This is OK because the subquery is an independent computation that computes its own aggregate separately from what is happening in the outer query.



聚合函数通常和group by子句联合使用

根据城市分组, 查看城市最大低温,以及城市数量count

```sql
SELECT city, count(*), max(temp_lo)
    FROM weather
    GROUP BY city;
```

having 对分组结果进行过滤

```sql
SELECT city, count(*), max(temp_lo)
    FROM weather
    GROUP BY city
    HAVING max(temp_lo) < 40;
```



模糊匹配, f we only care about cities whose names begin with “`S`”,

```sql
SELECT city, count(*), max(temp_lo)
    FROM weather
    WHERE city LIKE 'S%'            -- (1)
    GROUP BY city;
```

where子句和having子句的区别

It is important to understand the interaction between aggregates and SQL's `WHERE` and `HAVING` clauses. The fundamental difference between `WHERE` and `HAVING` is this: `WHERE` selects input rows before groups and aggregates are computed (thus, it controls which rows go into the aggregate computation), whereas `HAVING` selects group rows after groups and aggregates are computed. Thus, the `WHERE` clause must not contain aggregate functions; it makes no sense to try to use an aggregate to determine which rows will be inputs to the aggregates. On the other hand, the `HAVING` clause always contains aggregate functions. (Strictly speaking, you are allowed to write a `HAVING` clause that doesn't use aggregates, but it's seldom useful. The same condition could be used more efficiently at the `WHERE` stage.)



Another way to select the rows that go into an aggregate computation is to use **FILTER**, which is a per-aggregate option: 

```sql
SELECT city, count(*) FILTER (WHERE temp_lo < 45), max(temp_lo)
    FROM weather
    GROUP BY city;
```

解释: FILTER只作用在声明了它的查询字段上

`FILTER` is much like `WHERE`, except that it removes rows only from the input of the particular aggregate function that it is attached to. Here, the `count` aggregate counts only rows with `temp_lo` below 45; but the `max` aggregate is still applied to all rows, so it still finds the reading of 46.



update(更新)

```sql
UPDATE weather
    SET temp_hi = temp_hi - 2,  temp_lo = temp_lo - 2
    WHERE date > '1994-11-28';
```

返回: UPDATE 2(影响行数)

delete (删除 )

```sql
DELETE FROM weather WHERE city = 'Hayward';
```

返回: DELETE 1(影响行数)

不加where条件会清空整张表的数据(危险操作)



### 高级特性

#### 视图

外键

事务

窗口函数

inheritance



Conclusion