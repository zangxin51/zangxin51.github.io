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
}
```

27. stream api

过滤，filter，Predicate

```java
public static void main(String[] args) {
    Stream.of(
                    new Fruit("草莓", "Strawberry", "浆果", "红色"),
                    new Fruit("桑葚", "Mulberry", "浆果", "紫色"),
                    new Fruit("杨梅", "Waxberry", "浆果", "红色"),
                    new Fruit("核桃", "Walnut", "坚果", "棕色"),
                    new Fruit("花生", "Peanut", "坚果", "棕色"),
                    new Fruit("蓝莓", "Blueberry", "浆果", "蓝色")
            )
            .filter(fruit -> fruit.category.equals("浆果") && fruit.color.equals("蓝色"))
            .forEach(System.out::println);

}
record Fruit(String cname, String name, String category, String color) {}
```

28. map 映射

```java
Stream.of(
                new Fruit("草莓", "Strawberry", "浆果", "红色"),
                new Fruit("桑葚", "Mulberry", "浆果", "紫色"),
                new Fruit("杨梅", "Waxberry", "浆果", "红色"),
                new Fruit("核桃", "Walnut", "坚果", "棕色"),
                new Fruit("草莓", "Peanut", "坚果", "棕色"),
                new Fruit("蓝莓", "Blueberry", "浆果", "蓝色")
        )
        .map(f->f.cname()+"酱")
        .forEach(System.out::println);
```

29.flatMap 扁平化

```java
Integer[][] array2D = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9},
};

Arrays.stream(array2D)
        .flatMap(array -> Arrays.stream(array))
        .forEach(System.out::println);
```

30、构建流

用已有数据构建出stream对象

集合、数组、对象

```java
// 1. 从集合构建
Set.of(1, 2, 3).stream().forEach(System.out::println);
Map.of("k1",1,"k2",2).entrySet().stream().forEach(System.out::println);

// 2. 从数组构建
int[] array = {1, 2, 3};
Arrays.stream(array).forEach(System.out::println);

// 3. 从对象构建
Stream.of(1,2,3,4,5).forEach(System.out::println);
```

31、流的合并,跳过，截取

```java
Stream<Integer> s1 = Stream.of(1, 2, 1,3);
Stream<Integer> s2 = Stream.of(4, 5, 6,1,2);
// 合并
Stream<Integer> concat = Stream.concat(s1, s2);
concat.skip(2).forEach(System.out::println);
concat.limit(2).forEach(System.out::println);
concat.skip(2).limit(2).forEach(System.out::println);
// 满足条件保留
concat.takeWhile(x -> x < 3).forEach(System.out::println);
// 满足条件丢弃
concat.dropWhile(x->x<3).forEach(System.out::print);
```

32、整数流的生成方法

```java
// IntStream.range
IntStream.range(1, 10).forEach(System.out::println); // [a,b)
IntStream.rangeClosed(1, 10).forEach(System.out::println); // [a,b]
// 递推生成，依赖上一个元素
IntStream.iterate(1, x -> 2 * x + 1).limit(10).forEach(System.out::println);
// 指定停止条件
IntStream.iterate(1, x -> x <= 9, x -> x + 2).forEach(System.out::println);
// 不依赖于任何参数
IntStream.generate(() -> ThreadLocalRandom.current().nextInt(100)).limit(5).forEach(System.out::println);
// 更快捷的生成整数流的方法
ThreadLocalRandom.current().ints(5,0,100).forEach(System.out::println);
```

33、查找与判断

```java
        IntStream stream = IntStream.of(1, 2, 3, 4, 5, 6);
//        System.out.println(stream.filter(x -> (x & 1) == 0).findFirst().orElse(-1));
        // 找到第一个元素
//        stream.filter(x -> (x & 1) == 0).findFirst().ifPresent(System.out::println);
        // 找出任意一个元素,与findFirst区别：并行流下结果有所不同，findFirst按顺序
//        stream.filter(x->(x&1)==0).findAny().ifPresent(System.out::println);

        // 有一个满足
//        System.out.println(stream.anyMatch(x -> (x & 1) == 0)); // true
        // 所有元素必须满足
//        System.out.println(stream.anyMatch(x -> (x & 1) == 0)); // false
        // 所有元素都不满足
        System.out.println(stream.noneMatch(x -> (x & 1) == 0));
```

34.去重与排序

```java
// 排序
Stream.of(
                new C09SortTest.Hero("令狐冲", 90),
                new C09SortTest.Hero("风清扬", 98),
                new C09SortTest.Hero("独孤求败", 100),
                new C09SortTest.Hero("方证", 92),
                new C09SortTest.Hero("东方不败", 98),
                new C09SortTest.Hero("冲虚", 90),
                new C09SortTest.Hero("向问天", 88),
                new C09SortTest.Hero("任我行", 92),
                new C09SortTest.Hero("不戒", 88)
        ).sorted(Comparator.comparingInt(C09SortTest.Hero::strength)) // 升序
        .sorted(Comparator.comparingInt(C09SortTest.Hero::strength).reversed()) // 降序
        // strength一致时，姓名长度长的排在前面
   .sorted(Comparator.comparing(C09SortTest.Hero::strength).thenComparing(C09SortTest.Hero::name,Comparator.reverseOrder()))
        .forEach(System.out::println);
```

35.化简流

```java
@Test
void test05() {
    Stream<Hero> heroStream = Stream.of(
            new Hero("令狐冲", 90),
            new Hero("风清扬", 98),
            new Hero("独孤求败", 100),
            new Hero("方证", 92),
            new Hero("东方不败", 98),
            new Hero("冲虚", 90),
            new Hero("向问天", 88),
            new Hero("任我行", 92),
            new Hero("不戒", 88)
    );
    // 无初始值, 找出最大strength
//        heroStream.reduce((a, b) -> a.strength() > b.strength() ? a : b).ifPresent(System.out::println);
    // 有初始值
//        Hero result = heroStream.reduce(new Hero("-", Integer.MIN_VALUE), (a, b) -> a.strength() > b.strength() ? a : b);
//        System.out.println("result = " + result);
    // 求总数
//        Integer ret2 = heroStream.map(hero -> 1).reduce(0, (a, b) -> a + b);
//        System.out.println("ret2 = " + ret2);
    // stream统计api
//        System.out.println("heroStream.count() = " + heroStream.count());
//        System.out.println(heroStream.max(Comparator.comparing(Hero::strength)));
//        System.out.println(heroStream.min(Comparator.comparing(Hero::strength)));
//        System.out.println(heroStream.mapToInt(Hero::strength).sum());
    System.out.println(heroStream.mapToInt(Hero::strength).average());
```

36.收集流

```java
/*创建容器，收集方法*/
Stream<String> stream = Stream.of("令狐冲", "风清扬", "独孤求败", "方证", "东方不败", "冲虚", "向问天", "任我行", "不戒");
//     List<String> ret1 = stream.collect(ArrayList::new, ArrayList::add, (a, b) -> {});
//        System.out.println("ret1 = " + ret1);
// map
//   Map<String, Integer> ret2 = stream.collect(HashMap::new, (map, x) -> map.put(x, 1), (a, b) -> {});
//        System.out.println("ret2 = " + ret2);

//  StringBuilder ret3 = stream.collect(StringBuilder::new, StringBuilder::append, (a, b) -> {});
//        System.out.println("ret3 = " + ret3);
StringJoiner ret4 = stream.collect(() -> new StringJoiner("$"), StringJoiner::add, (a, b) -> {});
System.out.println("ret4 = " + ret4);
```

37.改善收集流-->收集器Collectors	

```java
Stream<String> stream = Stream.of("令狐冲", "风清扬", "独孤求败", "方证", "东方不败", "冲虚", "向问天", "任我行", "不戒");
List<String> list = stream.collect(Collectors.toList());
String str = stream.collect(Collectors.joining());
Set<String> set = stream.collect(Collectors.toSet());
Map<String, Integer> map = stream.collect(Collectors.toMap(x -> x, x -> 1));
```

38.收集流，下游收集器

```java
Stream<Hero> stream = Stream.of(
        new Hero("令狐冲", 90),
        new Hero("风清扬", 98),
        new Hero("独孤求败", 100),
        new Hero("方证", 92),
        new Hero("东方不败", 98),
        new Hero("冲虚", 90),
        new Hero("向问天", 88),
        new Hero("任我行", 92),
        new Hero("不戒", 88)
);
// 下游收集器 {2=[92, 90, 88], 3=[90, 98, 88, 92], 4=[100, 98]}
Map<Integer, List<Integer>> ret = stream.collect(Collectors.groupingBy(h -> h.name.length(), Collectors.mapping(Hero::strength, Collectors.toList())));
System.out.println("ret = " + ret);

```

```java
@Test
void test08() {
    Stream<Hero> stream = Stream.of(
            new Hero("令狐冲", 90),
            new Hero("风清扬", 98),
            new Hero("独孤求败", 100),
            new Hero("方证", 92),
            new Hero("东方不败", 98),
            new Hero("冲虚", 90),
            new Hero("向问天", 88),
            new Hero("任我行", 92),
            new Hero("不戒", 88)
    );
    // 映射分组结果
    // 下游收集器之改变收集的结果的value值
//        Map<Integer, List<Integer>> ret = stream.collect(Collectors.groupingBy(h -> h.name.length(), Collectors.mapping(Hero::strength, Collectors.toList())));
//        System.out.println("ret = " + ret);
    // 在分组中过滤
    // 需求:根据名字长度分组,分组后过滤strength小于98的
//        Map<Integer, List<Hero>> ret2 = stream.collect(Collectors.groupingBy(h -> h.name.length(), Collectors.filtering(h -> h.strength >= 98, Collectors.toList())));
//        System.out.println("ret2 = " + ret2);
    // flatMapping {2=[方, 证, 冲, 虚, 不, 戒], 3=[令, 狐, 冲, 风, 清, 扬, 向, 问, 天, 任, 我, 行], 4=[独, 孤, 求, 败, 东, 方, 不, 败]}
//        Map<Integer, List<String>> ret3 = stream.collect(groupingBy(h -> h.name.length(), flatMapping(h -> h.name.chars().mapToObj(Character::toString), toList())));
//        System.out.println("ret3 = " + ret3);
    // 根据名字长度分组, 分组后求每组个数 {2=3, 3=4, 4=2}
//        Map<Integer, Long> ret4 = stream.collect(groupingBy(h -> h.name.length(), counting()));
//        System.out.println("ret4 = " + ret4);
    // 根据名字长度分组,分组后求每组strength最小的人
//        Map<Integer, Optional<Hero>> ret5 = stream.collect(groupingBy(h -> h.name.length(), minBy(Comparator.comparing(Hero::strength))));
//        System.out.println("ret5 = " + ret5);

    // summingInt(x->int) 需求:根据名字长度分组,分组后求每组的strength和
//        Map<Integer, Integer> ret6 = stream.collect(groupingBy(hero -> hero.name.length(), summingInt(Hero::strength)));
//        System.out.println("ret6 = " + ret6);
    // averagingDouble(x->int) 需求:根据名字长度分组,分组后求每组的平均值
//        Map<Integer, Double> ret7 = stream.collect(groupingBy(hero -> hero.name.length(), averagingDouble(Hero::strength)));
//        System.out.println("ret7 = " + ret7);

    // reducing(identity,(p,x)->r) 等价于summingInt
    Map<Integer, Integer> ret8 = stream.collect(groupingBy(hero -> hero.name.length(), mapping(Hero::strength, reducing(0, (a, b) -> a + b))));
    System.out.println("ret8 = " + ret8);
}
```

39.三种基本流

基本类型流指 IntStream、LongStream 和 DoubleStream，它们在做数值计算时有更好的性能。

转换成基本流

* mapToInt
* mapToLong
* mapToDouble
* flatMapToInt
* flatMapToLong
* flatMapToDouble
* mapMultiToInt
* mapMultiToLong
* mapMultiToDouble

基本流转对象流

* mapToObj
* boxed

```java
@Test
void test09() {
    IntStream a = IntStream.of(97, 98, 99);
    LongStream b = LongStream.of(1L, 2L, 3L);
    DoubleStream c = DoubleStream.of(1.1, 2.2, 3.3);

//        a.mapToObj(Character::toString).forEach(System.out::println);
    // 转换成包装类型
//        a.boxed().forEach(System.out::println);
    // 统计
/*        IntSummaryStatistics statistics = a.summaryStatistics();
    System.out.println("statistics.getAverage() = " + statistics.getAverage());
    System.out.println("statistics.getMax() = " + statistics.getMax());
    System.out.println("statistics.getMin() = " + statistics.getMin());
    System.out.println("statistics.getCount() = " + statistics.getCount());
    System.out.println("statistics.getSum() = " + statistics.getSum());*/

    Stream<Hero> stream = Stream.of(
            new Hero("令狐冲", 90),
            new Hero("风清扬", 98)
    );
    stream.mapToInt(Hero::strength).forEach(System.out::println);
```



40.流的特性

1.一次使用

2.两类操作(中间操作,lazy懒惰；终结操作  eager 迫切)

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4);
stream
        .map(x -> x + 1) // 接水管 lazy
        .filter(x -> x >= 2) // 接水管 lazy
        .forEach(System.out::println); // 打开阀门 eager
```















