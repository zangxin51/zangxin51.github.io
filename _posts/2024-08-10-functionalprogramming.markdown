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

1.函数f: A-->B的一个映射, (A,B为非空集合) 自变量x的不可变性（java中就是final类型）

f: x --> f(x)

f(x) = x ^ 2,f:  x -> x ^ 2， lambda 表达式就是函数（映射）

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

```java
int add(int a, int b){
    return a + b;
}

interface Operator {
    int op(int a, int b);
}

add(1,2);
Operator add = (a,b) -> add(a,b);
// 这二者的区别， 一个返回一个数值，一个返回一个对象/接口， 在java中函数以接口得形式存在
```





6.lambda表达式的分类

```java
// 只有一行代码可以省略大括号和return
(int a, int b) -> a + b;
// 代码多于一行不可以省略最后一行的reutrn和大括号
(int a, int b) -> {
    int c = a + b;
    return c;
}
// 可以根据接口的定义获取参数类型， lambda表达式可以省略类型声明
Lambada2 lambda = (a,b) -> a + b;
interface Lambada1 {
    int op(int a, int b);
}
interface Lambda2 {
    double op(double a, double b);
}
// 只有一个参数时，可以省略()
a -> a;
```

7.方法引用

```java
Math::max   ==> (int a, int b) -> Math.max(a,b)
Student::getName ==> Student stu -> stu.getName()
System.out::println() ==> Object obj -> System.out.println(obj)
Student::new () -> new Student();
```

