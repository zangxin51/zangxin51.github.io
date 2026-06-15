---
layout: post
title: "Java SE 进阶学习笔记"
subtitle: ""
date: 2024-02-10 15:44:00
author: "zangxin"
header-img: "img/home-bg.jpg"
catalog: true
category: java
tags:
  - Java
  - Java SE
---

# Java SE 进阶学习笔记

本篇接续 Java SE 基础内容，集中整理集合、泛型、反射、多线程、JDBC、ThreadLocal、正则表达式、网络编程和 IO 等常用知识。

## 面向对象回顾

### 类的成员

| 成员 | 分类或作用 |
| --- | --- |
| 成员变量 | 静态变量、实例变量 |
| 方法 | 静态方法、实例方法 |
| 构造器 | 创建对象并初始化成员 |
| 代码块 | 静态代码块、实例代码块 |
| 内部类 | 成员、静态、局部、匿名内部类 |

### 封装、继承与多态

- **封装**：将属性私有化，通过方法控制访问。
- **继承**：子类复用父类成员，并可以重写父类方法。
- **多态**：父类型引用指向子类型对象，调用重写方法时执行对象实际类型的实现。

```java
Animal animal = new Dog(); // 向上转型
animal.run();

if (animal instanceof Dog) {
    Dog dog = (Dog) animal; // 向下转型
    dog.swim();
}
```

方法调用具有动态绑定特性，运行时根据对象的实际类型选择重写后的方法；成员变量不参与这种动态绑定。

### 抽象类与接口

抽象类用于提取共同状态和实现，接口用于定义能力和行为契约。二者都不能直接实例化，也都可以支持多态。

| 对比项 | 抽象类 | 接口 |
| --- | --- | --- |
| 定义 | `abstract class` | `interface` |
| 关系 | 类只能单继承 | 类可以实现多个接口 |
| 成员 | 可以包含普通类的大部分成员 | 以常量、抽象方法、默认方法和静态方法为主 |
| 适用场景 | 共享状态、模板和公共实现 | 定义能力、降低模块耦合 |

### 内部类

| 类型 | 定义位置 | 特点 |
| --- | --- | --- |
| 局部内部类 | 方法或代码块中 | 作用域仅限所在局部位置，可访问外部类成员 |
| 匿名内部类 | 局部位置且无显式类名 | 定义类的同时创建对象，适合一次性实现 |
| 成员内部类 | 外部类成员位置 | 可以访问外部类的全部成员 |
| 静态内部类 | 使用 `static` 修饰 | 只能直接访问外部类的静态成员 |

成员重名时遵循就近原则。在内部类中需要访问外部类同名成员时，可以使用 `OuterClass.this.member`。

## 集合框架

Java 集合框架主要分为两类：

- `Collection`：保存单列元素。
- `Map`：保存键值对。

### Collection 常用方法

| 方法 | 作用 |
| --- | --- |
| `add(E element)` | 添加元素 |
| `remove(Object value)` | 删除元素 |
| `contains(Object value)` | 判断是否包含元素 |
| `size()` | 获取元素数量 |
| `isEmpty()` | 判断集合是否为空 |
| `addAll(Collection c)` | 添加另一个集合的全部元素 |
| `containsAll(Collection c)` | 判断是否包含另一个集合的全部元素 |
| `removeAll(Collection c)` | 删除与另一个集合重合的元素 |
| `clear()` | 清空集合 |

### List

`List` 有索引、允许重复元素，并保留插入顺序。

常用方法：

```java
list.add(index, element);
list.addAll(index, collection);
list.get(index);
list.set(index, element);
list.remove(index);
list.indexOf(element);
list.lastIndexOf(element);
list.subList(fromIndex, toIndex); // 左闭右开
```

常见遍历方式：

```java
for (String value : list) {
    System.out.println(value);
}

for (int index = 0; index < list.size(); index++) {
    System.out.println(list.get(index));
}

Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}
```

#### List 实现类对比

| 实现类 | 底层结构 | 线程安全 | 特点 |
| --- | --- | --- | --- |
| `ArrayList` | 动态数组 | 否 | 随机访问快，尾部追加效率高 |
| `LinkedList` | 双向链表 | 否 | 首尾增删方便，随机访问需要遍历 |
| `Vector` | 动态数组 | 是 | 旧式同步容器，方法级同步开销较高 |

`ArrayList` 无参创建时底层数组初始为空，第一次添加元素时通常扩容到 10，后续按约 1.5 倍扩容。指定初始容量可以减少频繁扩容。

### Set

`Set` 不允许元素重复，通常没有索引，只能使用迭代器或增强 `for` 遍历。

| 实现类 | 特点 |
| --- | --- |
| `HashSet` | 基于哈希表，不保证遍历顺序 |
| `LinkedHashSet` | 在哈希表基础上维护双向链表，保留插入顺序 |
| `TreeSet` | 根据自然顺序或比较器排序 |

#### HashSet 与 HashMap

`HashSet` 底层使用 `HashMap` 保存元素。添加元素的大致过程：

1. 根据元素的 `hashCode()` 计算哈希值和桶索引。
2. 桶为空时直接添加。
3. 桶中已有元素时，通过哈希值和 `equals()` 判断是否重复。
4. 元素不重复时加入链表或红黑树。

在 Java 8 的典型实现中，哈希表默认加载因子为 `0.75`。首次需要分配时通常创建容量为 16 的数组，达到阈值后按两倍扩容。

当单个桶的链表长度达到树化条件，并且表容量至少为 64 时，链表可转换为红黑树；容量不足时会优先扩容。

> 自定义对象作为 `HashSet` 元素或 `HashMap` 的键时，应正确实现 `equals()` 和 `hashCode()`。

### Iterator

迭代器用于按统一方式遍历集合：

| 方法 | 作用 |
| --- | --- |
| `hasNext()` | 判断是否还有下一个元素 |
| `next()` | 返回下一个元素并移动游标 |
| `remove()` | 删除最近一次 `next()` 返回的元素 |

遍历时直接调用集合的增删方法可能触发 `ConcurrentModificationException`。需要在遍历过程中删除当前元素时，应使用迭代器的 `remove()`。

### Map

`Map` 以 `key-value` 形式保存数据。键不能重复，添加相同键时会覆盖原值；值可以重复。

| 方法 | 作用 |
| --- | --- |
| `put(K key, V value)` | 添加或更新键值对 |
| `get(Object key)` | 根据键获取值 |
| `remove(Object key)` | 删除键值对 |
| `containsKey(Object key)` | 判断是否包含键 |
| `containsValue(Object value)` | 判断是否包含值 |
| `keySet()` | 获取全部键 |
| `values()` | 获取全部值 |
| `entrySet()` | 获取全部键值对 |
| `size()` / `isEmpty()` / `clear()` | 数量、判空和清空 |

遍历键值对时优先使用 `entrySet()`：

```java
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

#### Map 实现类对比

| 实现类 | 顺序 | `null` | 线程安全 | 典型用途 |
| --- | --- | --- | --- | --- |
| `HashMap` | 不保证顺序 | 允许一个 `null` 键和多个 `null` 值 | 否 | 通用键值存储 |
| `LinkedHashMap` | 保留插入或访问顺序 | 允许 | 否 | 有序遍历、LRU 场景 |
| `TreeMap` | 按键排序 | 通常不允许 `null` 键 | 否 | 排序、范围查询 |
| `Hashtable` | 不保证顺序 | 键和值都不允许 `null` | 是 | 旧式同步容器 |
| `Properties` | 不保证顺序 | 不允许 | 是 | 读写字符串配置 |

`HashMap` 的哈希、扩容和树化机制与前面的 `HashSet` 基本一致，因为 `HashSet` 本身就是借助 `HashMap` 实现的。

`TreeMap` 可以使用键的自然顺序，也可以在构造时传入 `Comparator`。比较结果为 `0` 的键会被视为同一个键。

### Collections 工具类

`Collections` 提供操作集合的静态方法：

| 方法 | 作用 |
| --- | --- |
| `reverse()` | 反转列表 |
| `shuffle()` | 随机打乱 |
| `sort()` | 排序 |
| `swap()` | 交换两个位置的元素 |
| `max()` / `min()` | 获取最大值或最小值 |
| `frequency()` | 统计元素出现次数 |
| `copy()` | 将一个列表内容复制到另一个列表 |
| `replaceAll()` | 批量替换指定元素 |

### 集合选型

1. 保存单列数据时选择 `Collection`，保存键值关系时选择 `Map`。
2. 允许重复且需要索引时选择 `List`。
3. 不允许重复时选择 `Set`。
4. 主要进行随机访问时选择 `ArrayList`，频繁操作首尾时可以考虑 `LinkedList`。
5. 不关心顺序时选择 `HashSet` 或 `HashMap`。
6. 需要保留插入顺序时选择 `LinkedHashSet` 或 `LinkedHashMap`。
7. 需要排序时选择 `TreeSet` 或 `TreeMap`。
8. 读取 `.properties` 配置时使用 `Properties`。

## 泛型

泛型把类型检查提前到编译阶段，可以减少强制类型转换，提高代码复用性和类型安全。

### 泛型类

```java
public class Box<T> {
    private T value;

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }
}
```

类的泛型参数在创建对象时确定。静态成员属于类本身，因此不能直接使用类级泛型参数。

### 泛型接口

```java
public interface Converter<S, T> {
    T convert(S source);
}

public class StringToInteger implements Converter<String, Integer> {
    @Override
    public Integer convert(String source) {
        return Integer.valueOf(source);
    }
}
```

接口的泛型类型可以在继承接口或实现接口时确定。

### 泛型方法

泛型方法需要在返回值类型前单独声明类型参数：

```java
public static <T> T first(List<T> values) {
    return values.get(0);
}
```

仅仅使用类级泛型参数的方法，不等同于泛型方法。

### 通配符

泛型本身不具备继承关系，例如 `List<Integer>` 不是 `List<Number>` 的子类型。

| 写法 | 含义 | 典型用途 |
| --- | --- | --- |
| `<?>` | 任意泛型类型 | 只关心容器，不关心元素具体类型 |
| `<? extends T>` | `T` 或其子类型 | 主要读取，生产 `T` |
| `<? super T>` | `T` 或其父类型 | 主要写入，消费 `T` |

可以用 PECS 记忆：Producer Extends，Consumer Super。

### 类型擦除

Java 泛型主要在编译阶段生效。编译后泛型参数会被擦除，并在必要时插入类型转换或生成桥接方法，以维持多态行为。

## 反射

反射允许程序在运行时获取类的信息，并动态访问构造器、字段和方法。

### 获取 Class 对象

同一个类在一次类加载过程中只有一个对应的 `Class` 对象。

```java
Class<String> first = String.class;
Class<?> second = Class.forName("java.lang.String");
Class<? extends String> third = "hello".getClass();

System.out.println(first == second); // true
```

常见获取方式：

| 方式 | 适用场景 |
| --- | --- |
| `类名.class` | 编译期已知类型 |
| `对象.getClass()` | 已有对象 |
| `Class.forName("全限定类名")` | 根据配置动态加载 |

基本类型、数组、接口、枚举、注解和 `void` 都有对应的 `Class` 对象。

### 类加载过程

类加载通常包含以下阶段：

1. **加载**：读取字节码并创建 `Class` 对象。
2. **验证**：检查字节码是否符合 JVM 规范。
3. **准备**：为静态变量分配内存并设置初始值。
4. **解析**：将符号引用转换为直接引用。
5. **初始化**：执行静态变量显式赋值和静态代码块，形成 `<clinit>`。

静态加载在编译期就能确定依赖；动态加载则可能在运行时才确定具体类。

### 获取类结构

```java
Class<User> type = User.class;

Constructor<User> constructor = type.getDeclaredConstructor();
Field field = type.getDeclaredField("name");
Method method = type.getDeclaredMethod("setName", String.class);
```

常用 API：

| API | 作用 |
| --- | --- |
| `getName()` / `getSimpleName()` | 获取全限定类名或简单类名 |
| `getSuperclass()` | 获取父类 |
| `getInterfaces()` | 获取实现的接口 |
| `getDeclaredConstructors()` | 获取本类声明的构造器 |
| `getDeclaredFields()` | 获取本类声明的字段 |
| `getDeclaredMethods()` | 获取本类声明的方法 |
| `getAnnotations()` | 获取注解 |

`getXxx()` 通常只能获取公开成员，并可能包含继承成员；`getDeclaredXxx()` 获取当前类声明的成员，不受访问权限限制。

### 创建对象和调用方法

```java
Class<User> type = User.class;

Constructor<User> constructor = type.getDeclaredConstructor();
constructor.setAccessible(true);
User user = constructor.newInstance();

Field nameField = type.getDeclaredField("name");
nameField.setAccessible(true);
nameField.set(user, "Alice");

Method sayHello = type.getDeclaredMethod("sayHello", String.class);
sayHello.setAccessible(true);
Object result = sayHello.invoke(user, "Java");
```

现代代码优先使用 `Constructor.newInstance()`，避免使用已过时的 `Class.newInstance()`。

### 优点与限制

反射让框架可以根据配置动态创建对象、注入依赖和调用方法，但也会带来额外复杂度：

- 编译器难以检查运行时才确定的成员。
- 访问私有成员会破坏封装边界。
- 反射调用通常比直接调用慢。
- 重构时字符串形式的类名和成员名不容易被工具发现。

因此应将反射封装在框架或基础设施层，普通业务代码优先使用直接调用。

## 多线程

### 基本概念

| 概念 | 说明 |
| --- | --- |
| 程序 | 存放在磁盘上的指令和数据 |
| 进程 | 正在运行的程序实例 |
| 线程 | 进程中的执行单元 |
| 并发 | 多个任务在同一时间段交替推进 |
| 并行 | 多个任务在同一时刻同时执行 |

### 创建线程

继承 `Thread`：

```java
class DownloadThread extends Thread {
    @Override
    public void run() {
        System.out.println("download");
    }
}

new DownloadThread().start();
```

实现 `Runnable`：

```java
class DownloadTask implements Runnable {
    @Override
    public void run() {
        System.out.println("download");
    }
}

Thread thread = new Thread(new DownloadTask());
thread.start();
```

实现 `Runnable` 可以避免单继承限制，也更容易把任务与线程对象分开。

调用 `start()` 会请求 JVM 创建新线程，并由新线程执行 `run()`；直接调用 `run()` 只是普通方法调用，不会启动新线程。

### 共享数据与超卖问题

多个线程共同修改库存、余额或票数时，复合操作不是原子的，可能产生重复销售或负数库存。

```java
class SellTicketTask implements Runnable {
    private int tickets = 100;

    @Override
    public void run() {
        while (true) {
            synchronized (this) {
                if (tickets <= 0) {
                    break;
                }

                System.out.println(
                    Thread.currentThread().getName() + " 卖出第 " + tickets + " 张票"
                );
                tickets--;
            }
        }
    }
}
```

### 线程停止

不建议使用强制终止线程的旧 API。更常见的方式是使用中断状态或共享标记，让线程自己结束。

```java
class Worker implements Runnable {
    private volatile boolean running = true;

    public void stop() {
        running = false;
    }

    @Override
    public void run() {
        while (running && !Thread.currentThread().isInterrupted()) {
            // 执行任务
        }
    }
}
```

### 常用方法

| 方法 | 作用 |
| --- | --- |
| `start()` | 启动线程 |
| `run()` | 线程执行体 |
| `sleep(milliseconds)` | 让当前线程休眠指定时间 |
| `join()` | 等待目标线程结束 |
| `yield()` | 提示调度器让出执行机会，不保证成功 |
| `interrupt()` | 设置中断状态或唤醒阻塞线程 |
| `isInterrupted()` | 查询线程中断状态 |
| `currentThread()` | 获取当前线程 |
| `setDaemon(true)` | 设置为守护线程 |

`sleep()` 和 `yield()` 不会释放已经持有的监视器锁，`wait()` 会释放当前对象的监视器锁。

### 用户线程与守护线程

- **用户线程**：完成主要业务工作。
- **守护线程**：为其他线程提供后台服务。

当所有用户线程都结束后，JVM 可以退出，不会等待守护线程完成。

### 线程生命周期

Java 线程主要有以下状态：

| 状态 | 说明 |
| --- | --- |
| `NEW` | 已创建但未启动 |
| `RUNNABLE` | 可运行，包含运行和等待 CPU 调度 |
| `BLOCKED` | 等待进入同步区域 |
| `WAITING` | 无限期等待其他线程动作 |
| `TIMED_WAITING` | 在指定时间内等待 |
| `TERMINATED` | 执行结束 |

![线程生命周期](./../img/md-img/2025-03-26-project-01/截屏2025-04-20%2010.43.53.png)

可以使用 JConsole、VisualVM 或线程转储观察线程状态和锁等待情况。

### 线程同步

线程同步用于保护共享可变数据。常见方式包括：

- `synchronized` 代码块或方法。
- `Lock` 接口及其实现，例如 `ReentrantLock`。
- 原子类，例如 `AtomicInteger`。
- 并发集合，例如 `ConcurrentHashMap`。

```java
private final Lock lock = new ReentrantLock();

public void update() {
    lock.lock();
    try {
        // 修改共享数据
    } finally {
        lock.unlock();
    }
}
```

锁范围应尽量只覆盖需要原子执行的临界区，并始终在 `finally` 中释放显式锁。

### volatile 与双重检查

`volatile` 保证变量修改对其他线程的可见性，并限制相关指令重排序，但不能让 `count++` 这类复合操作变成原子操作。

```java
public class Singleton {
    private static volatile Singleton instance;

    private Singleton() {
    }

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

双重检查中的 `volatile` 用于避免对象引用在初始化尚未完成时被其他线程观察到。

## JDBC

JDBC 是 Java 访问关系型数据库的一组标准接口。数据库厂商提供驱动实现，业务代码通过统一 API 建立连接、执行 SQL 和处理结果。

### 基本步骤

1. 准备数据库驱动。
2. 使用 `DriverManager` 或连接池获取 `Connection`。
3. 创建 `PreparedStatement`。
4. 执行 SQL。
5. 处理 `ResultSet` 或更新行数。
6. 释放资源。

现代 JDBC 驱动通常支持自动注册，无需显式调用 `Class.forName()`。

```java
String url = "jdbc:mysql://localhost:3306/app"
    + "?useUnicode=true&characterEncoding=utf8"
    + "&serverTimezone=Asia/Shanghai";

try (
    Connection connection = DriverManager.getConnection(
        url,
        System.getenv("DB_USERNAME"),
        System.getenv("DB_PASSWORD")
    );
    PreparedStatement statement = connection.prepareStatement(
        "select id, name, email from user where id = ?"
    )
) {
    statement.setLong(1, 1L);

    try (ResultSet resultSet = statement.executeQuery()) {
        while (resultSet.next()) {
            long id = resultSet.getLong("id");
            String name = resultSet.getString("name");
            String email = resultSet.getString("email");
            System.out.println(id + ", " + name + ", " + email);
        }
    }
}
```

> 数据库地址、用户名和密码应放在环境变量或外部配置中，不要硬编码到源码。

### PreparedStatement

`PreparedStatement` 使用占位符传递参数：

```java
String sql = "insert into user(name, email) values (?, ?)";

try (PreparedStatement statement = connection.prepareStatement(sql)) {
    statement.setString(1, "Alice");
    statement.setString(2, "alice@example.com");

    int affectedRows = statement.executeUpdate();
    System.out.println("affected rows: " + affectedRows);
}
```

与拼接 SQL 相比，它具有以下优势：

- 参数和 SQL 结构分离，可防止大多数 SQL 注入。
- 自动处理字符串转义。
- 相同 SQL 重复执行时更容易复用执行计划。
- 支持批处理。

常用执行方法：

| 方法 | 适用场景 | 返回值 |
| --- | --- | --- |
| `executeQuery()` | `SELECT` | `ResultSet` |
| `executeUpdate()` | `INSERT`、`UPDATE`、`DELETE`、DDL | 受影响行数 |
| `execute()` | SQL 类型未知或可能返回多个结果 | 是否产生结果集 |

### JDBC 工具方法

可以集中管理连接创建和资源关闭：

```java
public final class JdbcUtils {
    private static final String URL = System.getenv("DB_URL");
    private static final String USERNAME = System.getenv("DB_USERNAME");
    private static final String PASSWORD = System.getenv("DB_PASSWORD");

    private JdbcUtils() {
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }
}
```

实际项目中更推荐使用 `DataSource` 和连接池，而不是每次通过 `DriverManager` 新建物理连接。

### 事务

事务用于保证一组数据库操作要么全部成功，要么全部失败。

```java
Connection connection = null;

try {
    connection = dataSource.getConnection();
    connection.setAutoCommit(false);

    updateAccount(connection, fromAccount, -amount);
    updateAccount(connection, toAccount, amount);

    connection.commit();
} catch (Exception exception) {
    if (connection != null) {
        connection.rollback();
    }
    throw exception;
} finally {
    if (connection != null) {
        connection.setAutoCommit(true);
        connection.close();
    }
}
```

事务代码需要注意：

- 在同一个 `Connection` 上执行全部操作。
- 关闭自动提交后显式调用 `commit()`。
- 异常时调用 `rollback()`。
- 连接归还连接池前恢复必要状态。

### 批处理

批量插入时可以先积累参数，再统一提交：

```java
String sql = "insert into user(name, email) values (?, ?)";

try (PreparedStatement statement = connection.prepareStatement(sql)) {
    for (int index = 0; index < users.size(); index++) {
        User user = users.get(index);
        statement.setString(1, user.getName());
        statement.setString(2, user.getEmail());
        statement.addBatch();

        if ((index + 1) % 500 == 0) {
            statement.executeBatch();
            statement.clearBatch();
        }
    }

    statement.executeBatch();
}
```

MySQL 驱动使用批处理优化时，可以根据驱动版本和项目配置评估 `rewriteBatchedStatements=true`。

### 数据库连接池

频繁创建和关闭物理连接成本较高。连接池预先创建连接，并在应用与数据库之间复用。

常见连接池包括：

| 连接池 | 说明 |
| --- | --- |
| HikariCP | 现代 Java 项目中常见，轻量且性能较好 |
| Druid | 提供监控、统计和扩展能力 |
| DBCP | Apache Commons 连接池 |
| C3P0 | 较早期的连接池实现 |

连接池通常通过 `DataSource` 暴露连接：

```java
try (
    Connection connection = dataSource.getConnection();
    PreparedStatement statement = connection.prepareStatement(sql)
) {
    // 执行数据库操作
}
```

调用 `connection.close()` 时，连接通常是归还连接池，而不是立即关闭物理连接。

### Apache DBUtils

Apache DBUtils 对 JDBC 的资源管理和结果集映射进行了轻量封装。

```java
QueryRunner queryRunner = new QueryRunner(dataSource);

User user = queryRunner.query(
    "select id, name, email from user where id = ?",
    new BeanHandler<>(User.class),
    1L
);
```

常见 `ResultSetHandler`：

| Handler | 返回结果 |
| --- | --- |
| `BeanHandler<T>` | 单个 JavaBean |
| `BeanListHandler<T>` | JavaBean 列表 |
| `ScalarHandler<T>` | 单个标量值 |
| `MapHandler` | 单行 `Map` |
| `MapListHandler` | 多行 `Map` 列表 |

### SQL 与 Java 类型映射

| SQL 类型 | 常用 Java 类型 |
| --- | --- |
| `INT` | `Integer` |
| `BIGINT` | `Long` |
| `DECIMAL` | `BigDecimal` |
| `VARCHAR` / `CHAR` | `String` |
| `DATE` | `LocalDate` 或 `java.sql.Date` |
| `DATETIME` / `TIMESTAMP` | `LocalDateTime` 或 `Timestamp` |
| `BOOLEAN` / `BIT` | `Boolean` |
| `BLOB` | `byte[]` 或二进制流 |

### 通用 BaseDao

可以在 DAO 基类中集中封装更新和查询逻辑：

```java
public abstract class BaseDao {
    private final QueryRunner queryRunner = new QueryRunner();

    protected int update(Connection connection, String sql, Object... args)
        throws SQLException {
        return queryRunner.update(connection, sql, args);
    }

    protected <T> T queryOne(
        Connection connection,
        Class<T> type,
        String sql,
        Object... args
    ) throws SQLException {
        return queryRunner.query(
            connection,
            sql,
            new BeanHandler<>(type),
            args
        );
    }

    protected <T> List<T> queryList(
        Connection connection,
        Class<T> type,
        String sql,
        Object... args
    ) throws SQLException {
        return queryRunner.query(
            connection,
            sql,
            new BeanListHandler<>(type),
            args
        );
    }

    protected <T> T queryScalar(
        Connection connection,
        String sql,
        Object... args
    ) throws SQLException {
        ScalarHandler<T> handler = new ScalarHandler<>();
        return queryRunner.query(connection, sql, handler, args);
    }
}
```

事务边界通常不应由单个 DAO 方法自行决定，而应由上层服务统一控制并传递同一个连接。

## ThreadLocal

`ThreadLocal` 为每个线程提供独立变量副本，适合保存与当前线程绑定的上下文，例如事务连接、请求追踪信息或日期格式化器。

```java
private static final ThreadLocal<Connection> CONNECTION_HOLDER =
    new ThreadLocal<>();

public static Connection currentConnection() throws SQLException {
    Connection connection = CONNECTION_HOLDER.get();
    if (connection == null) {
        connection = dataSource.getConnection();
        CONNECTION_HOLDER.set(connection);
    }
    return connection;
}
```

### 原理

每个 `Thread` 内部维护自己的 `ThreadLocalMap`：

- `ThreadLocal` 对象作为键。
- 当前线程独有的数据作为值。
- 不同线程访问同一个 `ThreadLocal` 时，读写的是各自线程中的映射。

`ThreadLocalMap` 使用开放寻址方式处理哈希冲突。键对 `ThreadLocal` 是弱引用，而值仍是强引用；如果线程长期存活且没有清理，值可能无法及时回收。

### 正确清理

在线程池中，线程会被长期复用，因此用完后必须调用 `remove()`：

```java
try {
    CONTEXT.set(context);
    handleRequest();
} finally {
    CONTEXT.remove();
}
```

`ThreadLocal` 不是线程间通信工具，也不会让共享对象自动变得线程安全。

## 正则表达式

正则表达式用于描述字符串匹配规则，可以完成校验、查找、分割和替换。

### 常用元字符

| 语法 | 含义 |
| --- | --- |
| `.` | 除换行外的任意字符 |
| `\d` / `\D` | 数字 / 非数字 |
| `\w` / `\W` | 单词字符 / 非单词字符 |
| `\s` / `\S` | 空白字符 / 非空白字符 |
| `^` / `$` | 字符串开头 / 结尾 |
| `\b` | 单词边界 |
| `[abc]` | `a`、`b` 或 `c` |
| `[^abc]` | 除 `a`、`b`、`c` 外的字符 |
| `[a-z]` | 指定字符范围 |
| `x|y` | 匹配 `x` 或 `y` |

Java 字符串本身也会处理反斜杠，因此正则中的 `\d` 在 Java 源码中需要写成 `"\\d"`。

### 数量词

| 语法 | 含义 |
| --- | --- |
| `?` | 0 次或 1 次 |
| `*` | 0 次或多次 |
| `+` | 1 次或多次 |
| `{n}` | 恰好 n 次 |
| `{n,}` | 至少 n 次 |
| `{n,m}` | n 到 m 次 |

数量词默认是贪婪模式，会尽可能多地匹配；后面加 `?` 可切换为勉强模式，例如 `.*?`。

### 分组、引用和环视

| 语法 | 说明 |
| --- | --- |
| `(pattern)` | 捕获分组 |
| `(?:pattern)` | 非捕获分组 |
| `\1` | 引用第一个捕获组 |
| `(?=pattern)` | 正向肯定预查 |
| `(?!pattern)` | 正向否定预查 |
| `(?<=pattern)` | 反向肯定预查 |
| `(?<!pattern)` | 反向否定预查 |

在 Java 字符串中，反向引用需要写为 `"\\1"`。

### 常见示例

```java
String username = "java_user";
boolean validUsername = username.matches("[A-Za-z][A-Za-z0-9_]{2,15}");

String number = "-12.50";
boolean validNumber = number.matches("-?\\d+(\\.\\d+)?");

String chineseText = "学习Java";
boolean containsChinese = chineseText.matches(".*[\\u4e00-\\u9fa5].*");
```

正则适合做格式初步校验，但邮箱、手机号等业务规则会变化，最终仍需结合业务逻辑和服务端校验。

### Pattern 与 Matcher

```java
Pattern pattern = Pattern.compile("\\d+");
Matcher matcher = pattern.matcher("订单 101，总价 299");

while (matcher.find()) {
    System.out.println(matcher.group());
}
```

常用方法：

| 方法 | 作用 |
| --- | --- |
| `matches()` | 整个字符串是否匹配 |
| `find()` | 查找下一个匹配片段 |
| `group()` | 获取当前匹配内容 |
| `start()` / `end()` | 获取匹配位置 |
| `replaceAll()` | 替换全部匹配内容 |
| `replaceFirst()` | 替换第一个匹配内容 |

`String` 也提供了便捷方法：

```java
text.matches(regex);
text.replaceAll(regex, replacement);
text.replaceFirst(regex, replacement);
text.split(regex);
```

频繁复用同一个正则时，应缓存编译后的 `Pattern`，避免重复编译。

## 常用类

### 包装类

八种基本类型都有对应包装类：

| 基本类型 | 包装类 |
| --- | --- |
| `byte` | `Byte` |
| `short` | `Short` |
| `int` | `Integer` |
| `long` | `Long` |
| `float` | `Float` |
| `double` | `Double` |
| `char` | `Character` |
| `boolean` | `Boolean` |

Java 支持自动装箱和拆箱：

```java
Integer value = 10; // 装箱
int number = value; // 拆箱
```

部分包装类会缓存常用值。比较包装对象的数值内容时，应使用 `equals()` 或先拆箱，不要依赖 `==`。

### String

`String` 对象不可变，修改操作会返回新字符串。

常用方法：

```java
text.length();
text.charAt(index);
text.substring(begin, end);
text.contains(keyword);
text.startsWith(prefix);
text.endsWith(suffix);
text.indexOf(keyword);
text.replace(oldValue, newValue);
text.trim();
text.toUpperCase();
text.toLowerCase();
text.split(regex);
```

### StringBuffer 与 StringBuilder

| 类型 | 线程安全 | 适用场景 |
| --- | --- | --- |
| `StringBuilder` | 否 | 单线程中频繁拼接字符串 |
| `StringBuffer` | 是 | 需要方法级同步的旧式多线程场景 |

```java
String result = new StringBuilder()
    .append("Java")
    .append(" ")
    .append("SE")
    .toString();
```

### Math

```java
Math.abs(-10);
Math.ceil(3.2);
Math.floor(3.8);
Math.round(3.5);
Math.max(10, 20);
Math.min(10, 20);
Math.pow(2, 10);
Math.random();
```

`Math.random()` 返回 `[0.0, 1.0)` 范围内的随机数。

### Arrays

```java
Arrays.sort(values);
Arrays.toString(values);
Arrays.binarySearch(values, target);
Arrays.copyOf(values, newLength);
Arrays.equals(first, second);
Arrays.fill(values, defaultValue);
```

使用 `binarySearch()` 前应保证数组已经按同一规则排序。

### System

```java
System.currentTimeMillis();
System.nanoTime();
System.arraycopy(source, 0, target, 0, length);
System.getProperty("java.version");
System.getenv("JAVA_HOME");
```

`currentTimeMillis()` 适合表示时间点，测量耗时时通常优先使用单调递增语义更合适的 `nanoTime()`。

### BigDecimal 与 BigInteger

`BigInteger` 用于任意精度整数，`BigDecimal` 用于高精度十进制计算。

```java
BigDecimal price = new BigDecimal("19.90");
BigDecimal count = new BigDecimal("3");
BigDecimal total = price.multiply(count);
```

创建 `BigDecimal` 时优先使用字符串构造器或 `BigDecimal.valueOf()`，避免直接传入二进制浮点数产生精度误差。

### 日期与时间

旧式日期 API 包括 `Date`、`Calendar` 和 `SimpleDateFormat`。现代 Java 优先使用 `java.time`：

```java
LocalDate today = LocalDate.now();
LocalDateTime now = LocalDateTime.now();
Instant instant = Instant.now();

DateTimeFormatter formatter =
    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

String formatted = now.format(formatter);
LocalDateTime parsed =
    LocalDateTime.parse("2025-04-20 10:30:00", formatter);
```

常用类型：

| 类型 | 用途 |
| --- | --- |
| `LocalDate` | 不带时间和时区的日期 |
| `LocalTime` | 不带日期和时区的时间 |
| `LocalDateTime` | 不带时区的日期时间 |
| `Instant` | UTC 时间线上的时间点 |
| `ZonedDateTime` | 带时区的日期时间 |
| `Duration` / `Period` | 时间或日期间隔 |

## 网络编程

### 基本概念

- **IP 地址**：定位网络中的主机。
- **域名**：便于人类记忆的主机名称，通过 DNS 解析为 IP。
- **端口**：定位主机中的具体进程，范围为 `0` 到 `65535`。
- **协议**：通信双方共同遵守的数据格式和交互规则。

常见端口示例：

| 协议 | 默认端口 |
| --- | --- |
| HTTP | 80 |
| HTTPS | 443 |
| SSH | 22 |
| MySQL | 3306 |

### TCP/IP 分层

| 层级 | 常见协议或职责 |
| --- | --- |
| 应用层 | HTTP、HTTPS、DNS、FTP、SMTP |
| 传输层 | TCP、UDP |
| 网络层 | IP、ICMP |
| 网络接口层 | 以太网、Wi-Fi 等链路通信 |

### TCP 与 UDP

| 对比项 | TCP | UDP |
| --- | --- | --- |
| 连接 | 面向连接 | 无连接 |
| 可靠性 | 可靠、有序、可重传 | 不保证到达和顺序 |
| 开销 | 较高 | 较低 |
| 数据形式 | 字节流 | 数据报 |
| 常见场景 | Web、文件传输、数据库连接 | 实时音视频、广播、简单查询 |

TCP 建立连接通常经历三次握手，关闭连接通常经历四次挥手。

### InetAddress

```java
InetAddress address = InetAddress.getByName("www.example.com");

System.out.println(address.getHostName());
System.out.println(address.getHostAddress());
System.out.println(address.isReachable(3000));
```

### TCP Socket

服务端：

```java
try (ServerSocket serverSocket = new ServerSocket(9000)) {
    try (
        Socket socket = serverSocket.accept();
        BufferedReader reader = new BufferedReader(
            new InputStreamReader(socket.getInputStream(), StandardCharsets.UTF_8)
        )
    ) {
        System.out.println(reader.readLine());
    }
}
```

客户端：

```java
try (
    Socket socket = new Socket("127.0.0.1", 9000);
    BufferedWriter writer = new BufferedWriter(
        new OutputStreamWriter(socket.getOutputStream(), StandardCharsets.UTF_8)
    )
) {
    writer.write("hello");
    writer.newLine();
    writer.flush();
}
```

当协议需要明确表示“请求体已经发送完成”时，可以调用 `socket.shutdownOutput()` 关闭输出方向，同时保留输入方向继续读取响应。

常用排查命令：

```shell
netstat -ano
lsof -i :9000
```

### UDP

UDP 通过 `DatagramSocket` 收发 `DatagramPacket`：

```java
byte[] data = "hello".getBytes(StandardCharsets.UTF_8);
InetAddress target = InetAddress.getByName("127.0.0.1");
DatagramPacket packet =
    new DatagramPacket(data, data.length, target, 9001);

try (DatagramSocket socket = new DatagramSocket()) {
    socket.send(packet);
}
```

接收端需要准备缓冲区：

```java
byte[] buffer = new byte[1024];
DatagramPacket packet = new DatagramPacket(buffer, buffer.length);

try (DatagramSocket socket = new DatagramSocket(9001)) {
    socket.receive(packet);
    String message = new String(
        packet.getData(),
        packet.getOffset(),
        packet.getLength(),
        StandardCharsets.UTF_8
    );
    System.out.println(message);
}
```

## IO 流

IO 流用于在程序与文件、网络、内存等数据源之间传输数据。

### File 与 Path

`File` 表示文件或目录路径，不代表文件内容本身：

```java
File file = new File("data/example.txt");

System.out.println(file.getName());
System.out.println(file.getAbsolutePath());
System.out.println(file.exists());
System.out.println(file.isFile());
System.out.println(file.length());
```

创建和删除：

```java
file.createNewFile();
file.delete();

File directory = new File("data/archive");
directory.mkdirs();
```

现代代码也可以使用 `Path` 和 `Files`：

```java
Path path = Path.of("data", "example.txt");

Files.createDirectories(path.getParent());
Files.writeString(path, "hello", StandardCharsets.UTF_8);
String content = Files.readString(path, StandardCharsets.UTF_8);
```

遍历目录：

```java
try (Stream<Path> paths = Files.walk(Path.of("src"))) {
    paths.filter(Files::isRegularFile)
        .filter(path -> path.toString().endsWith(".java"))
        .forEach(System.out::println);
}
```

`Files.walk()` 返回的流需要关闭，因此应放在 try-with-resources 中。

### 流的分类

| 分类 | 类型 | 适用场景 |
| --- | --- | --- |
| 字节流 | `InputStream` / `OutputStream` | 图片、音视频、压缩包和任意二进制数据 |
| 字符流 | `Reader` / `Writer` | 文本数据 |
| 节点流 | 直接连接数据源 | 文件、数组、管道等 |
| 处理流 | 包装其他流并增强功能 | 缓冲、转换、对象序列化等 |

### 字节流

```java
try (
    InputStream input = new FileInputStream("data/source.bin");
    OutputStream output = new FileOutputStream("data/target.bin")
) {
    byte[] buffer = new byte[8192];
    int length;

    while ((length = input.read(buffer)) != -1) {
        output.write(buffer, 0, length);
    }
}
```

### 字符流

```java
try (
    Reader reader = new FileReader(
        "data/source.txt",
        StandardCharsets.UTF_8
    );
    Writer writer = new FileWriter(
        "data/target.txt",
        StandardCharsets.UTF_8
    )
) {
    char[] buffer = new char[4096];
    int length;

    while ((length = reader.read(buffer)) != -1) {
        writer.write(buffer, 0, length);
    }
}
```

### 缓冲流

缓冲流减少底层 IO 调用次数：

```java
try (
    BufferedReader reader = Files.newBufferedReader(
        Path.of("data", "source.txt"),
        StandardCharsets.UTF_8
    );
    BufferedWriter writer = Files.newBufferedWriter(
        Path.of("data", "target.txt"),
        StandardCharsets.UTF_8
    )
) {
    String line;
    while ((line = reader.readLine()) != null) {
        writer.write(line);
        writer.newLine();
    }
}
```

### 转换流

`InputStreamReader` 和 `OutputStreamWriter` 在字节流与字符流之间转换，并允许指定字符集：

```java
Reader reader = new InputStreamReader(
    inputStream,
    StandardCharsets.UTF_8
);

Writer writer = new OutputStreamWriter(
    outputStream,
    StandardCharsets.UTF_8
);
```

### 对象序列化

`ObjectOutputStream` 可以把实现了 `Serializable` 的对象写入流，`ObjectInputStream` 可以读取。

```java
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
}
```

```java
try (ObjectOutputStream output = new ObjectOutputStream(
    new FileOutputStream("data/user.bin")
)) {
    output.writeObject(user);
}
```

序列化格式与类结构存在耦合，不适合作为长期稳定或跨语言的数据交换协议。接口传输通常使用 JSON、Protocol Buffers 等显式格式。

### 标准输入输出与打印流

| 对象 | 说明 |
| --- | --- |
| `System.in` | 标准输入 |
| `System.out` | 标准输出 |
| `System.err` | 标准错误输出 |

`PrintStream` 和 `PrintWriter` 提供 `print()`、`println()` 和 `printf()` 等便捷输出方法。

### Properties

`Properties` 常用于读写简单的键值配置：

```java
Properties properties = new Properties();

try (Reader reader = Files.newBufferedReader(
    Path.of("config", "app.properties"),
    StandardCharsets.UTF_8
)) {
    properties.load(reader);
}

String url = properties.getProperty("db.url");
```

敏感配置不应提交到仓库，可以通过环境变量或部署平台的 Secret 管理。

## 异常处理

异常处理用于分离正常业务流程和错误处理流程。

### try-catch-finally

```java
try {
    execute();
} catch (IOException exception) {
    logger.error("读取失败", exception);
} finally {
    releaseResource();
}
```

优先使用 try-with-resources 自动关闭实现 `AutoCloseable` 的资源：

```java
try (InputStream input = Files.newInputStream(path)) {
    // 使用资源
}
```

### throws

方法无法在当前层处理受检异常时，可以使用 `throws` 继续向调用方声明：

```java
public String read(Path path) throws IOException {
    return Files.readString(path);
}
```

### 自定义异常

```java
public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }

    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

自定义异常应表达明确的业务含义，并保留原始异常作为 `cause`，不要捕获后静默丢弃。

## 枚举与注解

### 枚举

枚举适合表示固定集合：

```java
public enum OrderStatus {
    CREATED,
    PAID,
    CANCELLED
}
```

枚举可以定义字段、构造器和方法，比散落的数字或字符串常量更安全。

### 注解

注解为类、方法、字段等程序元素提供元数据。

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Audit {
    String value() default "";
}
```

常用元注解：

| 元注解 | 作用 |
| --- | --- |
| `@Target` | 指定注解可使用的位置 |
| `@Retention` | 指定注解保留到源码、字节码还是运行时 |
| `@Documented` | 将注解包含在生成的文档中 |
| `@Inherited` | 允许类级注解被子类继承 |
| `@Repeatable` | 允许同一位置重复使用注解 |

运行时注解通常结合反射读取。

## GUI 事件处理

Java GUI 采用事件驱动模型：事件源产生事件，监听器接收并处理事件。

```java
JButton button = new JButton("提交");

button.addActionListener(event -> {
    System.out.println("按钮被点击");
});
```

其中：

- `JButton` 是事件源。
- `ActionEvent` 是事件对象。
- `ActionListener` 是事件监听器。
- Lambda 中的代码是事件处理逻辑。
