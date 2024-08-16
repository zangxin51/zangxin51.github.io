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

   8.方法引用综合练习

✅❌

1）判断语法正确性

```java
interface Lambda1 {
    int op(int a, int b);
}

interface Lambda2 {
    void op(Object obj);
}
```



1. `Lambda1 lambda = a, b -> a - b`  ❌
2. `Lambda1 lambda = (c, d) -> c * d` ✅
3. `Lambda1 lambda = (int a, b) -> a + b` ❌
4. `Lambda2 lambda = Object a -> System.out.println(a)` ❌



2）写出等价的 lambda 表达式

```java
static class Student {
    private String name;
    
    public Student(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
```



1. `Math::random`   

   `()->Math.random()`

2. `Math::sqrt`

   `(double number)->Math.sqrt(number)`

3. `Student::getName`

   `(Student stu)->stu.getName()`

4. `Student::setName`

   `(Student stu, String newName) -> stu.setName(newName)`

5. `Student::hashCode`

   `(Student stu) -> stu.hashCode()`

6. `Student::equals`

   `(Student stu, Object o) -> stu.equals(o)`

假设已有对象 `Student stu = new Student("张三");`

1. `stu::getName`

   `()->stu.getName()`

2. `stu::setName`

   `(String newName)->stu.setName(newName)`

3. `Student::new`

   `(String name)->new Student(name)`

9.函数分类

如果两个函数的参数的个数相同，且返回类型也相同，那么称这个两个函数等价

函数指的是一种只有一个`抽象的方法`的接口

```java
// 一般在java函数性接口会在接口上面加上@FunctionalInterface注解
@FunctionalInterface
public interface IntPredicate {

    /**
     * Evaluates this predicate on the given argument.
     *
     * @param value the input argument
     * @return {@code true} if the input argument matches the predicate,
     * otherwise {@code false}
     */
    boolean test(int value);
}
```



10. lambda表达式和方法引用是等价的

11.java中的lambda对象有两种表现形式 `lambda`表达式和`方法引用`

12.jdk中的函数分类

在包 java.util.function下

以后可以使用里面的函数

<img src="./../img/md-img/2024-08-10-functionalprogramming/image-20240811222704193.png" alt="image-20240811222704193" style="zoom:80%;" />

13.方法引用定义

def：将现有方法的调用转化为函数对象（lambda对象）

student.getName :=> stu -> stu.getName => Student::getName

() -> new Student()  Student::new 

14.静态方法

类名::静态方法

逻辑， 执行这个静态方法，

 参数，就是静态方法得参数

15.非静态方法

类名::非静态方法

逻辑：执行这个非静态方法， 

参数：对象， 非静态方法的 参数

```java
Student::getName  -> stu.getName() -> (stu) -> stu.getName()
Student::setName -> stu.setName(name) -> (stu,name) -> stu.setName()
```

16、对象:：非静态方法

逻辑：执行这个非静态方法， 

参数： 非静态方法的 参数

17.类名::new

对于构造方法，也有专门的语法把它们转换为 lambda 对象

函数类型应满足

* 参数部分与构造方法参数一致
* 返回值类型与构造方法所在类一致

18.this::非静态方法名

算是15的特例，只能用在类内部

19.super::非静态方法名

算是15的特例，只能用在类内部（用在要用 super 区分重载方法时）

20.特例

函数接口和方法引用之间，可以差一个返回值，例如

```java
public class ExceptionTest {
    public static void main(String[] args) {
        Runnable task1 = ExceptionTest::print1;
        Runnable task2 = ExceptionTest::print2;
    }
    
    static void print1() {
        System.out.println("task1 running...");
    }

    static int print2() {
        System.out.println("task2 running...");
        return 1;
    }
}
```

* 可以看到 Runnable 接口不需要返回值，而实际的函数对象多出的返回值也不影响使用

21.闭包（Closure）

何为闭包，闭包就是**函数对象**与**外界变量**绑定在一起，形成的整体。

* 有个限制，局部变量 x 必须是 final 或 effective final 的，effective final 意思就是，虽然没有用 final 修饰，但就像是用 final 修饰了一样，不能重新赋值，否则就语法错误。
  * 意味着闭包变量，在装进包里的那一刻，就不能变化了
  * 道理也简单，为了保证函数的不变性，防止破坏成道
* 闭包是一种给函数执行提供数据的手段，函数执行既可以使用函数入参，还可以使用闭包变量

22.柯里化

def：让接收多个参数的函数转换为一系列的接收一个参数的函数

实现：结合必包实现

作用：让多个函数分布执行， 类似结合律

```java
public class MyTest {
    @FunctionalInterface
    interface F2 {
        int op(int a, int b);
    }

    interface Fa {
        Fb op(int a);
    }

    interface Fb {
        int op(int b); //a + b
    }

    public static void main(String[] args) {
        Fa fa = (a) -> (b) -> a + b;
        Fb fb = fa.op(10);
        int r = fb.op(20);
        System.out.println("r = " + r);
    }
}
```

用途示例

```java
@Test
void test01() {
    // 分3步将三个集合合并成一个集合
    List<Integer> list1 = List.of(1, 2, 3);
    List<Integer> list2 = List.of(4, 5, 6);
    List<Integer> list3 = List.of(7, 8, 9);
    // F1 f1 = p1 -> p2 -> p3 -> {return new ArrayList<Integer>();};
    F1 f1 = p1 -> {
        List<Integer> r = new ArrayList<>();
        r.addAll(p1);
        return p2 -> {
            r.addAll(p2);
            return p3 ->{
                r.addAll(p3);
                return r;
            };
        };
    };
    F2 f2 = f1.op(list1);
    F3 f3 = f2.op(list2);
    List<Integer> result = f3.op(list3);
    System.out.println("result = " + result);
}

interface F1 {
    F2 op(List<Integer> list);
}
interface F2 {
    F3 op(List<Integer> list);
}
interface F3 {
    List<Integer> op(List<Integer> list);
}
```

23.高阶函数

def：使用了其他函数对象作为参数或者返回值

作用：将通用复杂的逻辑隐含在高阶函数内

将易变复杂的逻辑放在外部的函数对象中

24.简单流

```java
@Test
void test02() {
    List<Integer> list = List.of(1, 2, 3, 4, 5);
    SimpleStream.of(list)
            .filter(x -> (x & 1) == 1)
            .map(x -> x * x)
            .forEach(System.out::println);
}

class SimpleStream<T> {
    public static <T> SimpleStream<T> of(Collection<T> collection) {
        return new SimpleStream<>(collection);
    }

    private Collection<T> collection;

    private SimpleStream(Collection<T> collection) {
        this.collection = collection;
    }
	// 过滤
    public SimpleStream<T> filter(Predicate<T> predicate) {
        List<T> result = new ArrayList<>();
        for (T t : this.collection) {
            if (predicate.test(t)) {
                result.add(t);
            }
        }
        return new SimpleStream<>(result);
    }
	// 映射
    public <U> SimpleStream<U> map(Function<T, U> function) {
        List<U> result = new ArrayList<>();
        for (T t : this.collection) {
            U apply = function.apply(t);
            result.add(apply);
        }
        return new SimpleStream<>(result);
    }
    // 遍历
    public void forEach(Consumer<T> consumer) {
        for (T t : this.collection) {
            consumer.accept(t);
        }
    }
}
```

25.简单流-简化，reduce

```java
// identity是二元运算的单位元，满足 a * e = e * a = a
public T reduce(T identity, BinaryOperator<T> binaryOperator) {
    T pre = identity;
    for (T t : this.collection) {
        pre = binaryOperator.apply(pre, t);
    }
    return pre;
}

@Test
void test03() {
    List<Integer> list = List.of(1, 2, 3, 4, 5);
    Integer ret = SimpleStream.of(list)
            .reduce(0, Integer::sum);
    System.out.println("ret = " + ret);

    Integer min = SimpleStream.of(list)
            .reduce(Integer.MAX_VALUE, Integer::min);
    System.out.println("min = " + min);
}
```

26.简单流-收集，collect

```java
public <C> C collect(Supplier<C> supplier, BiConsumer<C, T> consumer) {
    C c = supplier.get(); // 创建了容器
    for (T t : this.collection) {
        consumer.accept(c, t);
    }
    return c;
}

@Test
void test04() {
    List<Integer> list = List.of(1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 7);
    // 集合
    HashSet<Integer> ret = SimpleStream.of(list)
            .collect(HashSet::new, HashSet::add);
    System.out.println("ret = " + ret);
    // StringBuilder
    StringBuilder ret2 = SimpleStream.of(list).collect(StringBuilder::new, StringBuilder::append);
    System.out.println("ret2 = " + ret2);
    // StringJoiner
    StringJoiner ret3 = SimpleStream.of(list)
            .collect(() -> new StringJoiner("-"),
                    ((joiner, x) -> joiner.add(x.toString())));
    System.out.println("ret3 = " + ret3);
    // Map
    HashMap<Integer, AtomicInteger> ret4 = SimpleStream.of(list)
            .collect(HashMap::new, (map, t) -> map.computeIfAbsent(t, k -> new AtomicInteger()).getAndIncrement());
    System.out.println("ret4 = " + ret4);
    AtomicInteger atomicInteger = new AtomicInteger();
}
```

