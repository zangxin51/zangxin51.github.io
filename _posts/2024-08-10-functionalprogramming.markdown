---
layout:     post
title:      "函数式编程"
subtitle:   "Functional Programming"
date:       2024-08-10 22:05:00
author:     "zangxin"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
---







# 函数式编程

1.函数f: A-->B的一个映射, (A,B为非空集合)

f: x --> f(x)

x的不可变性

2.在java中 静态方法相当于C语言的中函数概念, 因为实例方法的调用需要`对象.方法()`调用

3.普通函数和lambda函数区别

普通函数的调用: 对象.方法()

lambda: 函数作为一个对象

```java
interface Lambda {
    int calculate(int a, int b);
}

// 函数化为对象
static Lambda add = (a, b) -> a + b;
// 内部类
static Lambda minus = new Lambda() {
    @Override
    public int calculate(int a, int b) {
        return a - b;
    }
};
```

4.行为参数化operator(a,b) 二元运算---> 具体运算规则的实现a+b, a*b, a/b

lambda 将行为也作为参数, 即将函数作为参数

5.延迟执行

