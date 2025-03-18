---
layout:     post
title:      "javase latter"
subtitle:   ""
date:       2024-02-10 15:44:00
author:     "zangxin"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
---

# java

## 基础

## 面向对象

### 面向对象1

- 类的成员

	- 成员变量

		- 静态变量

		- 实例变量

	- 方法

		- 静态方法

		- 实例方法

	- 构造器

	- 代码块

		- 代码块

		- 非静态代码块

	- 内部类

### 面向对象2

- 封装

	- 私有化属性,提供访问器方法

- 继承

	- 方法重写

- 多态

	- 向上转型

	- 向下转型

	- 动态绑定

### 面向对象3

- 抽象类

	- 抽象方法

- 接口

	- 属性为常量
方法为抽象方法
具有多态性

- 内部类

	- 定义在外部类局部位置上（方法内）

		- 局部内部类

		  地位相当于局部变量，
		  不能添加访问修饰符，可以用final修饰（不可继承，本质还是类）
		  可以访问外部类的所有成员包括私有的
		  作用域：仅仅在定义他的方法或代码块中
		  外部其他类不能访问局部内部类
		  如果外部类和局部内部类的成员重名时，使用就近原则使用局内变量，如果想访问外部变量则使用OuterClass.this.variable来访问
		  
		- 匿名内部类

		  定义在外部类的局部位置，并且没有类名
		  匿名内部类既是一个类的定义，同时它本身也是一个对象
		  匿名内部类是一个子类
		
	- 定义在外部类的成员上

		- 成员内部类

		  定义在外部类的成员位置上
		  可以添加访问修饰符public protected 默认 private
		  可以访问外部类的成员，包括私有的
		  如果内部类变量和外部类变量重名，使用就近原则，想要访问外部类使用Outer.this.outerVar
		  
		- 静态内部类
		
  静态内部类定义在外部类成员位置，并有static修饰
		  可以添加访问修饰符
		  作用域：同其他成员，为整个类体
		  静态内部类可以访问所有静态成员
		  外部类访问静态内部类，先创建对象，再访问
		  
		  
## 集合

### 集合框架体系

### Collection(单列数据)

add
remove
contains
size
isEmpty
addAll
containsAll
removeAll

- List

  add(int index,Object ele)
  addAll(int index, Collection c)
  get(int index)
  indexOf
  lastIndexOf
  remove
  set(int index,Object ele)
  subList(int from, int to) (from,to]
  
  三种遍历方式 iterator, foreach, fori
  
	- ArrayList

	  ArrayList可以加入多个null
	  ArrayList是由数组来实现数据存储的
	  ArrayList基本等同于Vector,除了ArrayList是线程不安全的(执行效率高)
	  
	  1.ArrayList中维护了一个Object类型的数组elementData
	  transient Object[] elementData;
	  2.如果创建ArrayList对象时使用无参构造器,则数组容量为0,第一次添加,则扩容为10,如需要再次扩容,则扩容为1.5倍(0 10 15 22 33)
	  3.如果使用指定大小构造器,则初始容量为指定,再次扩容为1.5倍
	  
	- Vector

	  底层数组:protected Object[] elementData;
	  Vector是线程安全的,方法签名带有synchronized
	  需要线程安全时,可以使用Vector
	  扩容:无参构造器,第一次添加10,每次扩容2倍
	  
	- LinkedList(双向链表)
	
  array和linkedList比较
	  linkedList和ArrayList都是线程不安全的
	  增删效率: array涉及扩容较低, linkedList通过链表追加较高
	  改查效率:array是数组效率高,linkedList要遍历,效率低
	
- Set

  无序,没有索引,不允许元素重复
  实现了collection接口,可以使用collection接口中的方法
  只有两种遍历方式,iterator,foreach
  
  HashSet实际上是HashMap
  public HashSet() {
      map = new HashMap<>();
  }
  可以存放null值,但只能有一个(不能重复)
  HashSet无序是由hash后的索引结果决定的
  不能有重复元素
  
	- HashSet

	  1.hashSet底层是hashMap
	  2.添加一个元素,先得到hash值-》转化成索引值
	  3.找到存储数据的表table,看这个索引位置是否已经存放元素
	  4如果没有直接加入
	  5.如果有,调用equals方法比较,如果相同,则放弃添加,如果不同就添加到最后
	  6.在java8中,链表长度 > 8 且 哈希表容量 ≥ 64 时，链表会树化为红黑树。如果链表长度 > 8 但容量 < 64，HashMap 会优先扩容
	  扩容机制(resize())
	  1.第一次tabl扩容到16,临界值=容量*加载因子0.75=16*.75=12,
	  如果table数组到了临界值12,table就会扩容两倍32,临界值为24,以此类推
	  3.java8只有链表长度大于8,table长度大于等于64才会进行红黑树树化,否则只会扩容table
	  
	- LinkedHashSet

	  linkedHashset是hashset的子类
	  1.在linked中维护了一个hash表和双向链表
	  2.每一个节点有before和after属性,这样可以形成双向链表
	  3每添加一个元素时,先求hash值,再求索引,确定元素在tbale的位置,然后再将添加的元素加入到双向链表中,如果元素已经存在,则不添加
	  4.这样能在遍历时,可以保证顺序和添加时一致
	  
	- TreeSet

- 迭代器

  Iterator
  hasNext:判断是否还有下一个
  next():下移元素,将下移后集合位置上的元素返回
  
### Map(双列元素)

Map和Collection接口并列存在
Map用于保存句用映射关系到数据:key-value键值对
Map中key和Value可以是任何饮用类型的元素,会封装到HashMap$Node对象中
Map中的key不能重复,value可以重复
Map的key只有一个为null
常用String作为key
key和Value是映射关系,通过key可以找到value,反之不一定(非双射)
常用方法:
put
get
remove
size
isEmpty
clear清空
containsKey
containsValue

- HashMap

  使用key-value对存储数据,HashMap$Node(实现Map.Entry)
  如果添加相同的key则会更新原来的value
  与hashSet一样不保证映射的顺序
  hashMap没有实现同步,因此是线程不安全的
  扩容机制:和hashset一样
  HashMap底层维护了Node类型数组table,默认为null
  当创建对象时,将加载因子初始化为0.75
  当添加key-value,通过key的hash值得到table的索引.然后判断索引是否有元素,无的话,直接添加,有的话,则继续判断key是否相等,相等替换,不等时判断是否为树结构或链表结构,做出相应处理,如果容量不够时,则需要扩容
  第1次添加,容量为16,临界值为12
  以后再扩容table长度*2(32),临界值*2(24),以此类推,超过临界值就会触发扩容
  在java8中,链表长度>8,且table长度>=64,触发树化
  
- Hashtable

  1.存放元素是键值对
  hashtable的key和value都不能为null,否则空指针
  hashtable使用方法和hashmap一样
  hashtable是线程安全的
  Hashtable添加元素使用头插法,hashMap使用尾插法
  
- LinkedHashMap

- Properties

  继承与hashtable接口
  使用和hashtable类似
  可以用于从xxx.properrties文件中,加载数据到Properties对象进行读写(jdbc配置文件)
  
- TreeMap

  使用无参构造器,创建时是无序的
  构造器可以指定比较器,指定如何比较,cmp=0的元素只能存在一个
  
### Collections

reverse
shuffle
sort
swap
max
min
frequency
copy
replaceAll

### 集合选型

选择的集合类取决于业务操作特点
1.先判断存储的类型: 单列 or 双列
2.单列: Collection接口
	允许重复: List
		增删多:linkedList
		修改查找多:ArrayList
	不允许重复:
		无序: HashSet
		排序: TreeSet
		添加顺序和取出顺序一致: linkedHashSet
3.双列: Map
	键无序: HashMap
	键排序:TreeMap
	键添加和取出顺序一致: linkedHashMap
	读取文件: Properties	

## 泛型

### 优点:编译时,检查元素的类型,提高安全性
减少了类型转换次数

### jdk5新特性,解决数据类型安全问题
类声明标识属性的类型
方法的返回值或参数类型
编译时会确定泛型的实际类型,默认用Object替代

### 泛型语法

- 声明interface/class <K,V>

	- 泛型类

	  class 类名 <T, R...> {   }
	  普通成员可以使用泛型:属性和方法
	  使用泛型的数组,不能初始化(不能确定T的类型,无法在内存中开辟空间)
	  静态方法中不能使用类的泛型, 泛型类的泛型在创建对象时确定
	  如果创建对象没有执行类型,默认为Object
	  
	- 泛型接口
	
  静态成员不能使用泛型
	  泛型接口类型, 在继承接口或者实现接口时确定
	  没有指定类型, 默认为Object
	  
	- 泛型方法
	
  修饰符 <T, R...> 返回类型 方法名(参数列表) { }
	  泛型方法可以定义在普通类, 也可以定义在泛型类
	  2.当泛型方法被调用时,类型会确定
	  3.public void eat(E e){} 修饰符后没有<T,R..> eat,所以方法不是泛型方法,而是使用了泛型
	  
	- 泛型继承和通配符说明
	
	- 泛型不具备继承性
	
	- <?>支持任意泛型类型
	<? extends A> 支持A类以及A的子类,规定了泛型的上限
<? super A> 支持A类以及A的父类,不限于直接父类,规定泛型的下限

- 泛型擦除
	
	- 在编译时使用泛型进行类型检查，而在运行时将泛型类型信息擦除，替换为原始类型（通常是Object）或边界类型
	
	  类型参数替换为原始类型：
		  
		  如果泛型类型没有指定边界（如<T>），则类型参数会被替换为Object。
		  如果指定了边界（如<T extends Number>），则类型参数会被替换为边界类型（如Number）。
		  类型检查在编译时完成：
		  
		  编译器会在编译时检查泛型类型的安全性，确保类型匹配。
		  运行时，泛型类型信息会被擦除，无法通过反射获取具体的泛型类型。
		  桥接方法：
		  
		  为了保证多态性，编译器会生成桥接方法（bridge methods）。例如，如果泛型类继承或实现了某个类或接口，编译器会生成额外的方法来确保类型擦除后的代码仍然能正确运行。
		  
		  
## 反射

### 反射机制

- 反射机制允许在程序执行期借助于ReflectionAPI取得任何类的内部信息(比如成员变量,构造器,成员方法等等)并且能够操作对象的属性及方法,反射在设计模式和框架底层都会用到

- 加载类完成后,在堆中产生一个Class类型的对象,一个类只有一个Class对象,这个对象包含了类的完整结构信息.通过这个对象获取类的结构, 这个Class对象就像一个镜子,通过这个镜子反射到类的结构---形象称为反射

- 反射机制原理图

### 反射类

- java.lang.Class:代表一个类,Class对象表示某个类加载后在堆中的对象

	- 注意点

		- Class也是类,也继承Object类

		- Class类不是new出来的,而是系统创建的

		- 对于某个类Class类对象,在内存中只有一份,因为类只加载一次

		- 每个类实例都会记得自己是由哪个Class实例生成

		- 通过Class对象可以完整的得到一个类的完整结构,通过一系列API

		- Class对象是放在堆里面的

		- 类的字节码二进制数据是放在方法区的,有的地方称为类的元数据(包括方法代码,变量名,方法名,访问权限等)

	- 常用方法

		- forName
newInstance
getName 返回Class对象表示的实体类名称
getInterfaces
getClassLoader
getSuperClass
getConstructors
getDeclaredFields
getFields区别,getDeclaredFields返回该类所有字段,getFields会查找父类接口等,不返回私有的字段
getMethod
getPackage 获取类的包

	- 获取类Class对象

		- Class.forName(类的全限定名)

		- Class clazz = Cat.class

		- 对象.getClass(运行类型--真正类型)

		- ClassLoader cl = 对象.getClass.getClassLoader
Class clazz = cl.loadClass("类的全限定名)

		- 基本数据类型
Class clazz = int.class

		- 包装类: Integer.TYPE (Integer 和int是一个Class对象)

	- 哪些类型有Calss对象

		- 外部类,成员内部类,静态内部类,局部内部类,匿名内部类

		- 接口

		- 数组

		- 枚举

		- 注解

		- 基本数据类型

		- void

	- 类加载

		- 反射机制是实现动态语言的关键,也就是通过反射实现类动态加载
静态加载:编译时加载相关的类,如果没有则报错,依赖性太强
动态加载:运行时加载需要的类, 如果运行时不用该类,即使不存在该类,也不报错,降低了依赖性

		- 加载时机

			- 当创建对象时 new

			- 子类被加载时,父类也会被加载

			- 调用类中的静态成员时

			- 通过反射(动态加载)

		- 加载过程

			- 1加载

				- 将字节码从不同的数据源(jar,.class文件,网络中获取转换二进制字节流加载到内存里, 并且生成一个表示该类的Class对象

			- 2连接

				- 1.验证

					- 目的是为了确保class字节码文件中包含信息符合虚拟机要求,且不会危害到虚拟机安全

					- 包括:文件格式验证(是否以0xcafebabe开头)元数据验证字节码验证符号饮用验证...

					- 可以考虑使用-Xverify:none参数来关闭大部分验证,缩短虚拟机加载时间

				- 2.准备

					- JVM会在该阶段对静态变量分配内存并默认初始化(对应的数据类的默认初始值(0,0L,null,false等),注意静态常量直接赋值, 这些变量所使用内存都将在方法区中进行分配

				- 3.解析

					- 虚拟机将常量池内的符号引用替换为直接引用的过程

			- 3.初始化

				- 到初始化阶段,才是真正执行类中定义的java程序代码,此阶段是执行<clinit>()方法的过程.

				- <clinit>方法是有编译器按照语句在源文件中出现的顺序,一次自动收集类中的所有静态变量的赋值动作和静态代码块中的语句,并进行合并.

				- 虚拟机会保证一个类的<clinit>方法在多线程环境中被正确的枷锁,同步,如果多个线程同时去初始化一个类, 那么只会有一个线程去执行这个<clinit>方法,其他线程都需堵塞等待,直到线程活动执行<clinit>方法完毕

- java.lang.reflect.Method代表类的方法,Method对象表示某个类的方法

- java.lang.reflect.Field:表示类的成员变量

- java..lang.reflect.constructor:代表类的构造方法,constructor对象表示构造器

### 反射的缺点和优点

- 缺点:执行速度慢

	- 优化

		- Method和Field和Constructor对象都有set Accessible方法,该方法的作用是启动和禁用访问访问检查开关
设置为true表示关闭访问检查,提高反射效率,false代表反射的对象执行访问检查

- 优点:动态创建和使用对象,使用灵活,没有反射,框架技术就失去了支撑

### 通过反射获取类的结构信息

- java.lang.Class类

	- getName获取全类名
get SimpleName
getFileds获取所有public修饰的属性,包含本类的和父类的
getDeclaredFields:获取本类中所有属性
getMethods获取所有public修饰的方法,包含本类以及父类的
getConstructor获取本类所有public修饰的构造器
getDeclaredConstructor获取本类中所有构造器
getPackage:以package形式返回包信息
getSuperClass以Class形式返回父类信息
getInterfaces以class[]形式返回接口信息
getAnnotations:以Annotation[]形式返回注解信息

- java.lang.reflect.Field类

	- getModifiers:以int形式返回修饰符,默认是0,public1, private2, protectded是4,static是8,final是16
getType:以class形式返回类型, get Name返回属性名

- java.lang.reflect.Method类

	- getModifiers:以int形式返回修饰符,默认是0,public1, private2, protectded是4,static是8,final是16
getReturnType:以Class形式返回 返回类型
getName 返回方法名
getParameter Types:以Class[]返回参数类型数组

- java.lang.reflect.Constructor

	- 和method一样

- 通过反射创建对象

	- Class.newInstance

	- 构造器对象.newInstance

	- 遇到私有构造器可以暴力破解:set Accessible(true)

- 访问属性

	- 根据属性名获取Field对象
Field f = Class对象.getDeclaredField(属性名);
爆破: f.setAccessib(true)
访问: f.set(obj, 值) // 实例变量
f.set(null,值) // 静态变量

- 访问方法

	- 根据方法名和参数列表获取Method对象
Method m = Class对象.getDeclaredMethod(方法名,XX.class);
获取对象 Ojbect obj = clazz.newInstance()
爆破 m.set Accessible(true)
调用,m.invoke(obj,参数列表)
如果静态方法: m.invoke(null,参数列表)
返回值: invoke方法有返回值

## 多线程

### 程序

程序:为了完成特定任务,用某种语言编写的一组指令集合(代码)
进程:进程指运行中的程序,操作系统会为该进程分配内存空间.
进程是程序的一次执行过程,或者是正在运行的一个程序,是动态过程,具有生命周期:产生,存在,死亡.
线程:线程是由进程创建的,是进程的一个实体
一个进程可以拥有多个线程

​		

- 线程

	- 单线程:同一时刻只允许执行一个线程

	- 多线程:同一个时刻可以执行多个线程(游戏画面和游戏音乐)

- 并发:同一个时刻,多个任务交替执行,造成一种“貌似同时”的错觉,单核CPU的多任务就是并发

- 并行:同一时刻,多个任务同时执行.多核CPU可以实现并行

- 在多核CPU上可以同时存在并发和并行

### 创建线程的方式

- 1继承Thread类重写run方法,执行start启动线程

	- Thread类实现了Runnable接口

- 2实现函数型接口Runnable,重写run方法,执行:new Thread(new Runnable()).start();

	- Thread代理了Runnable接口任务

- java是单继承的,如果有时候类已经继承了其他父类,就不能使用继承Thread方法创建多线程了
所以要使用实现Runnable接口创建线程

### 启动线程:当main线程启动一个子线程时,主线程不会堵塞,会继续执行

- 为什调用start方法启动线程而不是run方法
start方法调用start0(native方法),线程并不一定执行,知识将线程变成了可运行状态,具体执行时间取决于cpu的调度.
执行run方法,相当于串行的执行一个普通方法.
start0 是一个本地方法，由 JVM 实现，负责调用操作系统的线程创建 API
当调用 Thread 的 start 方法时，start0 会创建一个新线程，并让该线程执行 run 方法。
start0 的实现依赖于 JVM 和操作系统的底层线程库。

### jconsole查看线程

### 超卖问题

public static void main(String[] args) {
    SellTicketTask sellTicketTask = new SellTicketTask();
    Thread t1 = new Thread(sellTicketTask);
    Thread t2 = new Thread(sellTicketTask);
    Thread t3 = new Thread(sellTicketTask);
    t1.start();t2.start();t3.start();
}
lass SellTicketTask implements Runnable {
    // 只有100张票
    private int count = 100;
    // 售票
    @Override
    public void run() {
        while (count > 0) {
        
System.out.println(Thread.currentThread().getName() + "卖出一张票,还剩:" + --count);
              Thread.sleep(50);
        }
    }
}


### 线程终止

- 当线程完成任务后,会自动退出

- 还可以通过使用变量来控制run方法退出的方式停止线程,即通知方式

  class T extends Thread {
      private int count = 0;
      private boolean loop = true;
      @Override
      public void run() {
          // 修改loop使得线程退出----》通知方式
          // t.setLoop(false); 让循环结束
          while (loop) {
              try {
                  Thread.sleep(50);
              } catch (InterruptedException e) {
                  throw new RuntimeException(e);
              }
              System.out.println("T running..." + ++count);
          }
      }
      public void setLoop(boolean loop) {
          this.loop = loop;
      }
  }
  
  
### 线程的常用方法

setName
getName
start 启动新线程
run 不会启动新线程
setPriority 设置线程优先级 高10 中5 低1
getPriority
sleep 线程静态方法,是当前线程休眠
interrupt 中断线程,并非结束线程, 一般用于中断正在休眠的线程(让线程停止休眠,来干活)

- 线程方法

	- yield:yield 方法用于提示线程调度器当前线程愿意让出 CPU 资源。

它是一个静态的本地方法，具体实现由 JVM 提供。

yield 只是一个提示，线程调度器可能会忽略它。

适用于需要提高多线程程序公平性的场景，但不适用于精确控制线程执行顺序。

	- join:线程的插队,插队成功后,则肯定先执行插入的线程的所有任务

### 用户线程和守护线程

- 用户线程:也叫工作线程,当线程执行完或者通知方式结束
守护线程:一般为工作线程服务,当所有用户线程结束时,守护线程自动结束
常见守护线程: 垃圾回收机制
设置守护线程: 
myDaemonThread.setDaemon(true);
myDaemonThread.start();

### 线程的生命周期

- NEW

- RUNNABLE

	- READ

	- RUNNING

- BLOCKED

- WAITING

- TIMED_WAITING

- TERMINATED

### 线程同步机制

- 多个线程要共享一个资源, 但是在同一时刻只允许一个线程访问,只有当该线程访问完了,其他线程才能访问

- 同步机制方式

	- 同步方法:public synchronized void method(){}

	- 同步代码块 synchronized(对象) {需要同步的代码}

- 互斥锁

	- 在java中引入了互斥锁,来保证共享数操作的安全性


	- 每个对象都对应于一个可称为互斥锁的标记,这个标记用来保证在任何一个时刻,只能有一个线程访问该对象
	
	- 关键字synchronized于对象的互锁联系,当某个对象用synchronized修饰时,表明该对象在任意一时刻只能由一个线程访问
	
	- 同步方法(非静态)的锁可以时this,也可以时其他的对象
静态的: 锁为当前类本身

- 释放锁

	- 释放锁

		- 代码正常执行完毕

		- 发生错误异常

		- wait()方法

	- 不释放锁

		- Thread.sleep
yield

		- suspend
resume

## JDBC

### jdbc作用

- 1.jdbc为访问不同的数据库提供了统一的接口, 为使用者屏蔽了细节问题

- 2.java程序使用jdbc,可以连接任何提供了jdbc驱动程序的数据库, 从而完成对数据库的各种操作

- 3.如果不同数据库,我们DAO层的方法不统一,不利于程序的管理,而jdbc通过规定一套接口规范, 让不同的数据库厂商实现, 在java程序中统一调用接口的方法

- 4.jdbc时java(sun/oracle)开发者提供的一条用于数据库操作的接口, java程序员只要面向这套接口编程即可. 不同的数据库厂商,需要针对这套接口, 提供不同的实现

### jdbc作用示意

- java程序需要访问数据库

	- JDBC

		- JDBCMysqlImpl

			- MySQL DB

		- JDBCOracleImpl

			- Oracle DB

		- JDBCSqlserverImpl

			- Sqlserver DB

### jdbc接口编写步骤

- 1.注册驱动类

- 2.获取连接

	- 五种方法获取连接

		- 1.        Driver driver = new com.mysql.cj.jdbc.Driver();

		- 2. Class<?> aClass = Class.forName("com.mysql.cj.jdbc.Driver");
          driver = (Driver) aClass.newInstance();

		- 3.// 反射
        Class<?> aClass = Class.forName("com.mysql.cj.jdbc.Driver");
        driver = (Driver) aClass.newInstance();
        // 使用DriverManager统一管理
        DriverManager.registerDriver(driver); // 注册驱动
        // 获取连接
        Connection connection = DriverManager.getConnection(url, "root", "root");

		-    4.// 反射
        Class<?> aClass = Class.forName("com.mysql.cj.jdbc.Driver");
        driver = (Driver) aClass.newInstance();
        // 使用DriverManager统一管理，获取连接
        Connection connection = DriverManager.getConnection(url, "root", "root");

			- 简化成

				-         // 使用DriverManager统一管理，获取连接
        Connection connection = DriverManager.getConnection(url, "root", "root");

				- mysql驱动5.1.6可以无需使用Class.forName去加载类, 而是自动的调用驱动jar包下的mysql-connector-j-8.4.0.jar!/META-INF/services/java.sql.Driver文本中类名称去注册

		- 5.通过文件获取
    @Test
    void jdbcConnect05() throws Exception {
        Properties p = new Properties();
        p.load(this.getClass().getResourceAsStream("/jdbc.properties"));
        Connection connection = DriverManager.getConnection(p.getProperty("url"), p.getProperty("user"), p.getProperty("password"));
    }

			- jdbc.properties

				- driverClassName=com.mysql.cj.jdbc.Driver
user=root
password=root
url=jdbc:mysql://localhost:3306/jbdc_db

- 3.执行增删改查

	- 查询

		- 结果集ResultSet

			- 游标遍历

				-        String sql = "select * from news";
        ResultSet resultSet = ps.executeQuery(sql);
        // 移动光标，当没有值时返回false
        while (resultSet.next()) {
            // 列从1开始，这是jdbc和其他java api的不同之处
            int id = resultSet.getInt(1);
            String title = resultSet.getString(2);
            String content = resultSet.getString(3);
            System.out.printf("id=%s,title=%s,content=%s\n", id, title, content);
        }

			- next()向下移动一行

			- previous() 向上移动一行

			- getXxx(列的索引|列名) 返回对应列的值, 接受类型是Xxx

			- getObject(列的索引|列名) 返回对应的列的值, 接受类型是 Object

- 4.关闭连接, 释放资源

- 实例

	- // 1.注册驱动
        Driver driver = new com.mysql.cj.jdbc.Driver();
        // 2.获取连接
        // mysql协议连接url
        String url = "jdbc:mysql://localhost:3306/jbdc_db";
        // 准备连接信息
        Properties props = new Properties();
        props.setProperty("user", "root");
        props.setProperty("password", "root");
        Connection connect = driver.connect(url, props);
        // 3.执行sql
        String sql = "insert into actor(id, name, gender, birthday, phone) values (null,'刘德华','m',current_timestamp(),'10086')";
        // 执行sql
        PreparedStatement ps = connect.prepareStatement(sql);
        // ResultSet resultSet = ps.executeQuery();
         int affectedRows = ps.executeUpdate();
        // boolean execute = ps.execute();
        // 4.关闭连接，释放资源
        ps.close();
        connect.close();

### PreparedStatement对象

- PreparedStatement执行sql语句中的参数用?来表示,调用PreparedStatement的setXXX方法来设置这些参数, setXXX方法有两个参数, 第一个设置索引,第二个设置值(Statement对象没有这些功能)

	- String sql = "select * from news where id = ? and title = ? and content = ? ";
        ps = connect.prepareStatement(sql);
        ps.setInt(1,1);
        ps.setString(2,"震惊");
        ps.setString(3,"智障md");
        System.out.println(sql);
        // 这里不要再填sql参数，否则会报错
        ResultSet resultSet = ps.executeQuery();

- DQL

	- 调用executeQuery方法返回ResultSet对象

- DML

	- 调用executeUpdate方法返回affected rows, 执行update, delete, insert

- 调用execute()方法返回的是boolean值, 用来区分query或update操作

- 预处理的好处, 不再使用+拼接sql语句, 减少语法错误,有效解决了sql注入问题, 大大减少了编译次数,效率高

### SQL注入问题

- SQL注入是利用某些系统没有对用户输入的数据进行充分的检查, 而在用户输入数据中注入非法的SQL语句段或者命令, 恶意攻击数据库

- 使用Statement对象会产生SQL注入问题, 只要使用PreparedStatement从(Statement扩展而来)来取代statement就可以了

### JDBCUtils工具类

- 获取资源和关闭资源两个静态方法

### JDBC事务

- 基本介绍

	1. 当jdbc程序中当一个Connectin对象创建时, 默认情况是自动提交事务, 每次执行一个sql语句时, 如果执行成功,就会向数据库提交, 而不能回滚

		- 案例

			- try {
            String sql1 = "update account set balance = balance-100 where id = 1";
            String sql2 = "update account set balance = balance+100 where id = 2";
            connection = JdbcUtil.getConnection();
            // 关闭自动提交事务
            connection.setAutoCommit(false);
            // 执行多个sql
            ps = connection.prepareStatement(sql1);
            int rows1 = ps.executeUpdate();
            ps = connection.prepareStatement(sql2);
            int x = 1/0;
            int rows2 = ps.executeUpdate();
            // 提交事务
            connection.commit();
            System.out.println("rows1 = " + rows1);
            System.out.println("rows2 = " + rows2);
        } catch (Exception e) {
            // 发生异常时回滚事务
            connection.rollback();
            e.printStackTrace();
        } finally {
            JdbcUtil.close(null, ps, connection);
        }

	2. JDBC程序中为了让多个SQL语句作为一个整体执行,需要使用事务

	3. 调用connection.setAutoCommit(false)可以取消自动提交事务

	4. 在所有sql执行成功后,调用connection的commit()方法提交事务

	5. 在其中某个操作失败或者出现异常时,调用connection的rollback()方法回滚事务

### 批处理

1. 当需要成批插入或者更新记录时, 可以采用java的批量更新机制, 这一机制允许多条语句一次性提交给数据库批量处理, 通常比单独提交处理更有效率

2. jdbc的批量处理语句包括下面的方法

	1. addBatch添加批量处理的sql语句或者参数

	2. executeBatch 执行批量处理语句

	3. clearBatch清空批量处理语句

3. JDBC连接mysql时, 如果要使用批处理功能, 需要在url后添加参数?rewriteBatchedStatements=true

	- 实例

		- String sql = "insert into news values (null,?,?)";
        PreparedStatement ps = connection.prepareStatement(sql);
        for (int i = 0; i < 5000; i++) {
            ps.setString(1, "ggggg");
            ps.setString(2, "haf;akdaha");
            // 加入批处理
            ps.addBatch();
            if ((i + 1) % 1000 == 0) {
                // 执行批处理
                ps.executeBatch();
                // 清空批处理
                ps.clearBatch();
            }
        }

### 数据库连接池

- 传统连接问题

	- 传统的jdbc数据库连接使用drivermanager来获取,每次向数据库连接时都要将Connection加载到内存中, 再验证ip/用户名和密码,(0.05-1s)时间, 需要数据库的连接时候, 就向数据库要求一个, 平凡的进行数据库连接操作占用很多系统资源, 很容易造成服务器崩溃

	- 每一次数据库连接, 使用完都得断开, 如果程序出现异常而未能关闭, 将导致数据库内存泄露,最终导致重启数据库

	- 传统的获取连接的方式,不能控制创建的连接数量了, 如果连接过多, 可能导致内存泄漏, mysql崩溃/或者拒绝连接

	- 解决传统开发中数据库连接问题, 可以采用数据库连接池技术

- 连接池原理

	1. 从连接池取出连接

	2. 使用连接操作mysql完, 将连接放入到连接池,并非关闭连接(复用)

	3. 等待队列: 如果连接池连接不够, java程序会先加入等待队列中, 等到其他线程释放资源时, 再使用连接

- 连接池种类

	- jdbc数据库连接池使用javax.sql.DataSource接口来表示, 由第三方实现

		- C3P0

			- 速度相对较慢,但稳定性不错

				- 配置

					1. 引入c3p0的jar包

					2. [配置文件c3p0-config.xml](file:///Users/qingsongcai/IdeaProjects/j2025/javase/resources/c3p0-config.xml)

					3. 实例

						- ComboPooledDataSource ds = new ComboPooledDataSource("jbdc_db");
Connection connection = ds.getConnection();

		- DBCP

			- 比c3p0块,但不稳定

		- Proxool

			- 有监控功能,没有c3p0稳定

		- BoneCP

			- 速度快

		- Druid

			- 速度快,有监控功能,稳定

				1. 引入druid的jar包

				2. [配置文件druid.properties](file:///Users/qingsongcai/IdeaProjects/j2025/javase/resources/druid.properties)

				3. 实例

					- properties.load(TestDruidConnectPool.class.getResourceAsStream("/druid.properties"));
DataSource ds = DruidDataSourceFactory.createDataSource(properties);
Connection connection = ds.getConnection();

### Apache DBUtils

- 问题引入

	1. 结果集和connection是关联的, 如果关闭连接, 就不能使用结果集

	2. 结果集不利于数据管理, 用一次,查一次

	3. 返回信息处理不方便, 一个一个取, 有多少张表就要遍历多少次

- 有什么方法能够将结果集转换为javaBean的集合

	- apache common-dbutils

- api

	- DbUtils类

		- QueryRunner类: 封装了SQL的执行,是线程安全的, 可以实现增删改查,批处理

		- 使用QueryRunner类实现查询

		- ResultSetHandler接口用于处理java.sql.ResultSet,将数据转换为另一种形式

			- ArrayHandler把结果集中的第一行转为对象数组

			- ArrayListHandler将结果集中的每一行都转成一个数组放入list中

			- BeanHandler把结果集中第一行数据封装到一个javabean中

			- BeanHandlerList将结果集中的每一行数据都封装一个对应的javabean实例,存放到list中

			- columnListHandler把结果集中某一列数据存放到list中

			- keyedHandler(name)将结果集中的每一行数据都封装到map中, 在把这些map存个一个map中, 其key为指定的key

			- MapHandler将结果集中第一行数据封装一个Map中,key是列名,value是对应的值

			- MapListHandler将结果集中每一行数据都封装一个map中,然后在存放list中

		- 查询

			- 单行
        String sql = "select * from news where id =?";
        QueryRunner queryRunner = new QueryRunner();
        News news = queryRunner.query(connection, sql, new BeanHandler<>(News.class), 1);

			-         多行
        QueryRunner queryRunner = new QueryRunner();
        String sql = "select * from news where id in (?,?)";
        // 底层使用反射机制，来封装
        List<News> newsList = queryRunner.query(connection, sql, new BeanListHandler<>(News.class), 1, 2);
        // 底层帮忙关闭了resultSet和preparedStatement，只用关闭connection
        JdbcDruidUtil.close(null, null, connection);
        newsList.forEach(System.out::println);

			- 单行单列
Object query = queryRunner.query(connection, sql, new ScalarHandler<>(), 4);

		- 实例

			- dml

				-         String sql = "delete from news where id = ?";
        QueryRunner queryRunner = new QueryRunner();
        // 返回受影响的行数
        int affectedRows = queryRunner.update(connection, sql, 35034);

### 表和javaBean的类型映射关系

- int,double等java中都要使用包装类, 因为mysql中所有的类型都可能是null, 而java中只有引用类型才有NULL值

- mysql字符串类型 ---> java String
浮点--->浮点
日期,---> Date

### [baseDao](file:///Users/qingsongcai/IdeaProjects/j2025/javase/src/xxx/util/BaseDao.java)

## ThreadLocal

### 作用

- 可以实现在同一线程数据共享,从而解决多线程数据安全问题

- 可以给当前线程关联一个数据(普通变量,对象,数组)set方法

- ThreadLocal可以像Map一样存储数据, key为当前线程,get方法

- 每一个ThreadLocal对象只能为当前线程关联一个数据, 如果要为当前线程关联多个数据,就需要使用多个ThreadLocal对象示例

- 每个ThreadLocal对象实例声明时,一般为static

- ThreadLocal中保存的数据,在线程销毁后,会自动释放

### 原理

- 最本质的原理就是, 线程Thread持有了一个键位ThreadLocal的Map, Map<ThreadLocal,Ojbect>

	- set,get,remove三个方法都是lMap的方法,key是当前线程(执行这些方法的线程), value就是线程要保留变量

	- 三个对象之间关系, 
threadLocal, Thread, Object(要存的变量)

- Thread类的threadLocals字段

	- 类型是ThreadLocalMap

		- 是ThreadLocal的静态内部类,本质上是一个定制的hash表,用于存储线程本地变量

		- Entry 是 ThreadLocalMap 的内部类，继承自 WeakReference<ThreadLocal<?>>，即键（ThreadLocal 实例）是弱引用。

			- 键的弱引用：当 ThreadLocal 实例失去强引用时，垃圾回收器可以回收键，避免内存泄漏。

值的强引用：Entry 的值（即存储的变量副本）始终是强引用。如果线程未终止且未主动清理，值可能无法被回收，导致内存泄漏。

- ThreadLocal.set

	- 获取当前线程的 ThreadLocalMap。

若 ThreadLocalMap 不存在，则创建并绑定到当前线程。

然后以当前 ThreadLocal 实例为键，存储值到 ThreadLocalMap 的 Entry 中。

		- 这一步意味着一个线程可以有多个ThreadLocal变量

- ThreadLocal.get

	- 获取当前线程的 ThreadLocalMap。

若 ThreadLocalMap 存在，查找当前 ThreadLocal 对应的 Entry。

若找到 Entry，直接返回值；否则调用 initialValue() 初始化值并存储。

- ThreadLocal.remove()

	- 作用：删除当前线程的 ThreadLocalMap 中与当前 ThreadLocal 关联的 Entry。

必要性：避免内存泄漏（尤其在线程池中，线程可能被长期复用）。

- ThreadLocalMap 的哈希冲突处理

	- 开放地址法（线性探测法）：

插入或查找时，若目标位置已被占用（哈希冲突），则向后线性探测，直到找到空槽或匹配的键。

优点：避免链表结构，减少内存占用。

缺点：哈希冲突较多时效率下降。

动态扩容：

初始容量为 16，负载因子为 2/3。

当 size >= threshold 时，扩容为原容量的 2 倍，并重新哈希所有 Entry。

- 总结

	- 线程隔离：ThreadLocal 通过为每个线程维护独立的变量副本，实现线程安全。

底层实现：依赖 ThreadLocalMap 和弱引用机制，需注意内存泄漏问题。

最佳实践：在线程池或长期存活的线程中，务必调用 remove() 清理 Entry。(使用,try-finally)

```java
try {
	threadLocal.set(value);
	// 业务逻辑
} finally {
    threadLocal.remove();
}
```


## 正则表达式

### regular expression

- 对字符串执行模式匹配的技术

- java正则默认是贪婪匹配:匹配最长的

	- \\d+ --> 111 ---> 匹配全部的1

	- 用非贪婪的
\\d+? --> 3个1

- 注意

	- 注意: 在[]中.+等字符当做普通字符来用,而不正则元字符

### 理论

- 转义符号: java中\\ 表示其他语言中\, \\$代表转义的$

- 元字符

	- 限定符

		- *

			- 指定字符重复0次或n次

				- (abc)*

					- 包含任意个abc字符串
abc,abcabc, abcabcabc

		- +

			- 指定字符重复1次或者n次

				- m+(abc)*

					- m,mabc,mmabc

		- ?

			- 指定字符重复0次或1次

				- m+abc?

					- mab,mabc

		- {n}

			- 只能输入n个字符

				- [abcd]{3}

					- abc,abd,bcd

		- {n,}

			- 至少n个

				- [abcd]{3,}

					- abc,abcd,aabdfa

		- {n,m}

			- n个到m个

				- [abcd]{3.5}

					- abc,abcd, abcda

	1. 选择匹配符

		- |

			- ab | abc

				- 匹配 ab或者abc

	- 分组组合和反向引用符

		- 分组组合

			- 目标字符串

				- zangxin51 zangxinaixizao zangxineat zangxinfly

			- (?<name>pattern)

				- 给分组起别名

					- String regex = "(?<g1>\\d\\d)(?<g2>\\d)(?<g3>\\d)";
matcher.group("g1") <==> matcher.group(1)

			- (?:pattern)

				- zangxin51|zangxinaixizao|zangxinaixizao|zangxinfly

				- zangxin(?:51|aixizao|eat|fly)

			- (?=pattern)

				- zangxin(?=51|aixizao|eat|fly)

			- (?!pattern)

				- zangxin(?!51|eat|fly)

					- 对上面的取反

			- 注意 (?:pattern) | (?=pattern) | (?!pattern) 是非捕获分组, 不能使用group(1)

		- 反向引用符

			- 引入问题: 找出所有四位数字, 其中第一位和第4位相同,第二位和第三位相同,如1221,1331

			- 匹配两个连续相同的数字:(\\d)\\1

			- 匹配5个连续相同的数字:(\\d)\\1{4}

			- 匹配个位与千位相同,十位与百位相同的数字(\\d)(\\d)\\2\\1

			- 匹配12321-133999111,前面是五位数,后面9位,每三位重复

				- ^\d{5}-(\d)\1{2}(\d)\2{2}(\d)\3{2}$

			- 把 类似 : "我....我要....学学学学....编程 java!"  通过正则表达式 修改成 "我要学编程 java

				- // 1.去掉所有的点.
content= Pattern.compile("\\.").matcher(content).replaceAll("");
2.去掉重复的字,分组捕获的内容记录到$1,使用反向引用$1来替换匹配的内容
content= Pattern.compile("(.)\\1+").matcher(content).replaceAll("$1");

	2. 特殊字符

	3. 字符匹配符

		- [ ] 可接收字符列表

			- [efg] 补表示efg中任意1个字符

		- [^不接收字符列表] 

			- [^abc]表示除a,b,c之外的任意一个字符

		- - 连字符

			-  A-Z 所有大写字母

		- . 

			- 匹配除了\n以外的任何字符

		- \\d

			- 匹配单个数字字符

		- \\D

			- 匹配单个非数字字符,相当于[^0-9]

		- \\w

			-  匹配数字,英文字母(大小写),下划线相当于[0-9a-zA-Z]

		- \\W

			- 匹配单个非数字,大小字母,相当于[^0-9a-zA-Z]

	- 定位符

		- ^

			- 起始字符

		- $结束字符

		- \\b

			- 匹配目标字符串的边界

				- 边界是子串后面有空格,或者是字符串结束的位置

					- xin\\b --> "zangxin zang xin" --> 匹配两个

		- \\B

			- 匹配目标字符串的非边界

				- zang\\B --> "zangxin zang xin" --> 匹配1个

- 案例

	- 匹配汉字

		- "^[\u0391-\uffe5]+$"

	- 邮政编码 要求:1-9开头的六个数字,比如123890
^[1-9]\\d{5}$

	- QQ号 要求:1-9开头的5-10个数字,比如 12368, 3292996020
^[1-9]\d{4,9}$

	- 手机号码:必须以13,14,15,18开头的11位数, 17688861008
^1[3|4|5|8]\d{9}$

	- url
((http|https)://)([\w-]+\.)+[\w-]+(\/[\w-_?=&/%+.#@]+)*$

### 正则表达式类

- java.util.regex

	- Pattern类

		- 没有构造器, 调用公共静态方法获取对象
该方法接受一个正则表达式字符串作为参数

			- Pattern pattern = Pattern.compile("[a-zA-Z0-9]+")

	- Matcher

		- 调用Pattern类compile方法获取对象

			- Matcher matcher = pattern.matcher(content)

	- PatternSyntaxException

		- 表示正则表示语法错误

	- 使用方法

		- 整体匹配,验证输入是否满足条件

			- boolean isMatch = Pattern.matches(regex, content);

		- 替换

			- String srcString = "ggstar";
pattern = Pattern.compile(srcString);
matcher = pattern.matcher(target);
// 替换不改变原来字符串内容, 而是返回一个新的字符串
String newStr = matcher.replaceAll("zangxin");

		- 查找

			- String target = "hello edu java tom hello smith ggstar ggstar happy";
String regex = "hello";
Pattern pattern = Pattern.compile(regex);
Matcher matcher = pattern.matcher(target);
while (matcher.find()) {
    System.out.print("目标字符串开始索引:" + matcher.start() + " ");
    System.out.print("目标字符串结束索引:" + matcher.end() + " ");
    // 等价于 target.substring(matcher.start(), matcher.end());
    System.out.println("找到:" + matcher.group());
}

### String类中使用正则表达式(简化使用正则类)

- public String repleaceAll(String regex, String replacement)

- public boolean matches(String regex)

- public String[] split(String regex)

## 常用类

### 包装类

- 自动装箱(底层调用valueOf方法/自动拆箱(底层调用intValue方法)

- 整数类型有缓存(-128-+127)


- 数值类型继承了Number类

### String

- final类不可继承

- 不可以修改
private final char value[]放在常量池中

- 常用方法

  equals:区分大小写判断内容是否相等
  equalsIgnoreCase
  charAt()
  length
  indexOf:字符第一次出现的位置
  concat
  replace
  format
  
### StringBuffer
char[] value放在堆中可以更改

final类不可被继承
stringBuffer的直接父类是AbstractStringBuilder
实现了序列化接口
在父类中,属性char[] value不是final
因为StringBuffer字符内容存到char[] value中,所以每次增加或删除时,不用每次都更换地址(即不是每次创建新对象),所以效率高于String


- string --> stringBuffer
构造器或者append方法
stringBuffer --> string
stringBuffer的toString方法
或者string的构造器

### StringBuilder

继承AbstractStringBuilder,实现了序列化接口
final类不可被继承
属性char[] value 内容存在value中(堆)
单线程使用,stringBuilder效率高

- 与stringBuffer ApI兼容
stringBuffer是线程安全,
stringBuilder非线程安全

### Math

- [a,b]: (int)(Math.random()*(b-a+1)+a)

### Arrays

- toString
sort
binarySearch
copyOf
fill
equals
asList

### System

- exit
arraycopy
currentTimeMillis
gc

### BigDecimal和BigInteger

- BigInteger

- BigDecimal
除不尽可能抛出异常,需要指定精度(RoundingMode)

### 日期类

- 第一代日期类

	- Date精确到毫秒
SimpleDateFormat.parse
利用format格式化date日期,或将日期字符串转换成date对象

- 第二代日期类

	- Calendar
日历类

		- Calendar.getInstance()
c.get(Calendar.YEAR)

- 第三代日期类

	- LocalDate

	- LocalTime

	- LocalDateTime

		- now()
getYear
格式化时间:配合类DateTimeFormatter来使用

		  LocalDateTime now = LocalDateTime.now();
		  // 格式化时间日期
		  DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		  String format = dtf.format(now);
		  System.out.println(format);
		  
		- 计算时间

		  LocalDateTime after100day = now.plusDays(100);
		  LocalDateTime before1000min = now.minusMinutes(1000);
		  
		
	- Instant时间戳对象
和Date互相转换

	  Instant now = Instant.now();
	  Date date = Date.from(now);
	  Instant instant = date.toInstant();
	  
	- java.sql.Timestamp

		- java.sql.Timestamp转换成LocalDateTime

			- DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String format = formatter.format( new Timestamp(1741585226000L).toLocalDateTime());

		- LocalDateTime转成Timestamp

			- // 2000-1-1 00:00:00 转成Timestamp
Timestamp.valueOf(LocalDateTime.of(2000, 1, 1, 0, 0, 0)

		- 更简单的String转换成Timestamp

			- Timestamp format must be yyyy-mm-dd hh:mm:ss[.fffffffff]

			- Timestamp.valueOf("2022-12-12 12:12:12")

## 网络编程

### 网络通信

- 网络: 两台+的设备通过物理设备连接起来构成了网络

	- 局域网,城域网,广域网(万维网)

- 两台设备之间通过网络实现数据传输

- ip地址

	- 概念: 用于表示网络中的每台计算机/主机

	- 查看ip地址: ipconfig/ifconfig

	- ip地址形式: ff.ff.xx.xx (每一个十进制数范围(0-255)

	- ip地址的组成: 网络地址+主机地址

		- A类

			- 127.0.0.1表示本机

		- B类

		- C类

			- 192.168.xx.xx局域网

		- D类,E类

	- ipv6是用于替代v4的下一代ip地址,主要原因是ipv4能表示范围有限2^32=40亿

	- 域名:将ip映射成域名,便于记忆,传播

	- 端口号

		- 用于标识计算机上某个特定的网络程序

		- 范围0-65536

			- 0-1024一般都被占用了,ssh24,ftp21,smtp25,http80

		- 80端口可以默认不用写

- 网络通信协议

	- 传输数据的规范,约定

	- TCP/IP(Transmission Control Protocol/ Internet Protocol是internet最基本的协议,网络的基础

	- OSI七层模型

		- 与 OSI 模型相比，TCP/IP 模型更简洁，更贴近实际的互联网协议栈。

	- TCP/IP模型

		- 应用层

			- 提供应用程序与网络之间的接口，处理高级别协议和数据格式。	

			- HTTP, HTTPS, FTP, SMTP, DNS, Telnet, SSH

				- HTTP/HTTPS：用于网页浏览。

FTP：用于文件传输。

SMTP：用于电子邮件发送。

DNS：将域名解析为 IP 地址。

SSH/Telnet：用于远程登录

		- 传输层
	
			- 提供端到端的通信，确保数据的可靠传输和流量控制。	
	
			- TCP (可靠传输), UDP (不可靠传输)
	
				- TCP（传输控制协议）：
提供可靠的、面向连接的服务。
通过三次握手建立连接(客户端-服务端)，确保数据按序到达。
适用于需要高可靠性的应用（如网页浏览、文件传输）
传输完毕需要释放连接
可以传输大量的数据

					- TCP 三次握手 是 TCP 协议中用于建立连接的过程，分为三个步骤：

客户端发送 SYN 报文。

服务器回复 SYN-ACK 报文。

客户端发送 ACK 报文。

三次握手确保了双向通信的可靠性，防止旧的重复连接初始化，并同步初始序列号。

				- UDP（用户数据报协议）：
提供不可靠的、无连接的服务。
传输速度快，但不保证数据的可靠性和顺序。
适用于实时应用（如视频流、在线游戏）
不用连接无需释放资源
每个数据报的大小控制在64k内不合适传输大量数据
用来发送通知,短信等比较好, 无需别人是否在线

		- 网络层
	
			- 负责数据包的路由和转发，将数据从源主机发送到目标主机。	
	
			- IP (IPv4, IPv6), ICMP, ARP, IGMP
	
				- IP（互联网协议）：

为数据包提供逻辑地址（IP 地址）。

负责将数据包从源主机路由到目标主机。

ICMP（互联网控制消息协议）：

用于发送错误报告和网络诊断（如 ping 命令）。

ARP（地址解析协议）：

将 IP 地址解析为物理地址（MAC 地址）。

		- 网络接口层
	
			- 处理物理网络连接，负责数据帧的传输和硬件地址（如 MAC 地址）的管理。	
	
			- Ethernet, Wi-Fi, PPP, DSL
	
				- Ethernet：用于有线局域网。
	
				- Wi-Fi：用于无线局域网。
	
				- PPP（点对点协议）：用于拨号连接。
	
		- 工作流程
	
			- 数据封装：

数据从应用层开始，每一层都会添加自己的头部信息（Header），形成新的数据单元。

例如：应用层数据 → 传输层添加 TCP 头部 → 网络层添加 IP 头部 → 网络接口层添加帧头部。

数据传输：

数据通过网络接口层发送到目标主机。

数据解封装：

目标主机接收到数据后，每一层会移除对应的头部信息，最终将原始数据传递给应用程序。

### 网络编程

- InetAddress类

	- // 获取本机的ip地址对象
        InetAddress localHost = InetAddress.getLocalHost();

	- // 从主机名获取ip地址对象
        InetAddress host1 = InetAddress.getByName("qingsongdeMacBook-Pro.local");

	- // 根据域名返回ip地址对象
        InetAddress host2 = InetAddress.getByName("wwww.baidu.com");

	- // 根据ip地址对象返回ip
 String address = host2.getHostAddress();
//根据ip地址对象返回主机名
 String hostName = host2.getHostName();

- Socket(套接字)

	- 通信的两端都要有socket,是两台计算机通信的端点
网络通信其实就是socket之间的通信
socket允许程序把网络连接成一个车流, 数据在两个socket之间通过IO传输.
一般主动发起通信的程序属于cilent,等待通信请求的为server

	- TCP网络通信编程

		- server

			- ServerSocket(int port)
监听
Socket accept()
接受请求/发送使用
socket.getInputStream
socket.getOutputStream
// 关闭
socket.close()

		- client

			- 填服务器的地址
Socket(InetAddres,port)
// 发送请求/接受请求
outputStream/InputStream
// 关闭
socket.close()

		- 流要全部关闭

			- serverSocket

				- 如果你想关闭某个客户端连接，只需调用 socket.close()。

如果你想停止整个服务端（包括停止接受新的连接），必须调用 serverSocket.close()，同时关闭所有已建立的客户端连接（通过关闭对应的 Socket 对象）。

				- 是否可以只用 socket.close()？
不能。如果你只关闭 socket.close()，服务端的 ServerSocket 仍然会继续监听新的连接请求。如果你希望完全停止服务端，包括停止接受新的连接，必须调用 serverSocket.close()。

			- 写的时候,写完要flush和
设置结束标志shutdownOutput,否则接受方不知道你是否写完了,造成阻塞

		- netstat
	
			- netstat -an | less
netstat -anb | less
netstat -anb | grep 9999

			-  sudo lsof -nP -iTCP -sTCP:LISTEN
查看所有TCP监听窗口

			- 当客户端连接到服务器时,客户端也是通过一个端口和server通讯的,这个端口是Tcp/Ip随机分配的
	
	- UDP网络通信编程
	
		- DataGramSocket和DatagramPacket(数据报)实现了基于UDP协议的网络程序
	
			- UDP通过Datagram Socket发送和接收,系统不保证数据报一定能送到目的地,也不确定什么时候到达
	
			- DatagramPacket封装了UDP数据报,数据报中包含有发送端的ip地址和端口及接收端的ip和端口
	
			- UDP中有ip地址和端口,所以无需建立发送方和接收方的连接
	
		- 编写流程
	
			- 核心类,DatagramSocket和Datagram Packet
建立接收端,发送端
发送数据,打包Datagram对象
调用Datagram的发送接收方法
关闭流

```JAVA
- 实例代码
  @Test
  void receiver01() throws Exception {
  DatagramSocket socket = new DatagramSocket(9999);
  // udp数据报最大为64kb
  byte[] buf = new byte[1024];
  DatagramPacket datagramPacket = new DatagramPacket(buf, buf.length);
  // 接受数据
  socket.receive(datagramPacket);
  // 拆包
  byte[] data = datagramPacket.getData();
  int len = datagramPacket.getLength();
  // 打印数据
  System.out.println(new String(data, 0, len));
  // 回复消息
  byte[] b = "receiver: ok, 你也好, 明天一起出去玩嘛!".getBytes();
  socket.send(new DatagramPacket(b, 0, b.length, InetAddress.getByName("127.0.0.1"), 8888));
  socket.close();
}
```


​				  
## IO流

### 流

- 文件在程序中是一流带形式来操作的

- 数据在数据源(文件/磁盘中)和程序(内存)之间经历的路径

- 输入流: 数据源-->程序(内存)
输出流:程序(内存)-->数据源(文件)

### 文件对象

- 创建文件构造器

	- new File(String pathname)//文件绝对路径
newFile(File parent,String child)
newFile(String parent, String child)

	- 获取文件的相关信息

		- getName 文件名
getAbsolutePath绝对路径文件名
getParent父目录
length字节
exists文件是否存在
isFile是文件吗
isDirectory是目录吗

	- 创建/删除文件

		- delete //只有空目录才能删除
createNewFile()// 创建文件
mkdir 创建一级目录
mkdirs(mkdir -p)创建多级目录

- 文件

	- 遍历文件

		- Files.walk()
在jdk8中，可以使用walk方法递归的去查找目录下所有文件

			- // 列出所有正规文件:即非目录
// path是绝对路径
Files.walk(Paths.get(path))
        .filter(Files::isRegularFile)
        .forEach(System.out::println);

			- var dirName = "C:/Users/Jano/Downloads";

//过滤出目录
try (Stream<Path> paths = Files.walk(Paths.get(dirName))) {
    paths.filter(Files::isDirectory)
            .forEach(System.out::println);
}

```JAVA
//按后缀名过滤
try (Stream<Path> paths = Files.walk(Paths.get(dirName), 2)) {
    paths.map(path -> path.toString()).filter(f -> f.endsWith(".pdf"))
            .forEach(System.out::println);
}
```



```JAVA
		- 扫描指定包下的所有.class文件
String packageName = "com.mvc";
// com/mvc
String packageNamePath = packageName.replaceAll("\\.", "/");
// 获取运行时类路径:绝对路径
String path = WebApplicationContext.class.getClassLoader()
        .getResource(packageNamePath).getPath();
System.out.println("packageNamePath = " + packageNamePath);
System.out.println("path = " + path);
// 遍历开始路径
Path start = Paths.get(path);
System.out.println("------------");
try (Stream<Path> pathStream = Files.walk(start)) {
    //             检查是否为文件,不是目录
    List<String> list = pathStream.filter(Files::isRegularFile)
            // 转成String
            .map(Path::toString)
            // 文件以.class结尾
            .filter(f -> f.endsWith(".class"))
            // 把绝对路径替换成类路径
            .map(f -> f.substring(f.indexOf(packageNamePath)))
            // 把文件分隔符/替换为包包分隔符.
            .map(f -> f.replaceAll("/", "."))
            .collect(Collectors.toList());
	}
}
```
- 路径

### java IO流

按操作数据单位分 字节流(字节)二进制文件, 字符流(字符) 文本文件
按数据流向分:输入流, 输出流
按流的角色不同分: 节点流, 处理流/包装流

- 字节流

	- InputStream

		- FileInputStream

	- OutputStream

		- FileOutputStream
写文件不存在时会创建文件

- 字符流

	- Reader
Writer

		- FileReader

		- FileWriter 构造器可以指定追加模式和覆盖模式
写完后要执行flush或者close方法,才能把文件从内存写入到磁盘

- 节点流
从一个特定的数据源读取数据
节点流是底层流,低级流,直接和数据源相连

	- 文件

		- FileReader/FileWriter
FileInputStream/FileOutputStream

	- 数组

		- ByteArrayInputStream/BayteArrayOutputStream
CharArrayReader/CharArrayWriter

	- 管道

	- 字符串

- 包装流/处理流
包装节点流,既可以消除不同节点流的实现差异,可以提供更方便的方法完成输入输出
包装流使用了修饰器设计模式,不会与数据类直接相连
增加缓冲,提高效率

	- 缓冲流

		- BufferedReader/BufferedWriter
关闭流只需关闭外层流即可
是否追加写有节点流决定
不要去操作字节文件(视频,图片,音频,pdf,doc等)可能造成文件毁坏

		- BufferedInputStream/BufferedOutputStream
处理二进制文件ok ,也能处理文本

	- 对象流

		- ObjectInputStream/ObjectOutputSteam
读取的顺序和写入的顺序要一致

			- 序列化:在保存数据时,保存数据的值和类型
反序列化:恢复数据时,恢复数据的值和类型
需要让某对象支持序列化机制,必须让其类是可序列化,实现接口: Serializable或Externalizable

			- 注意事项
1.读取的顺序要和写入的顺序一致
2.读取时需要实现序列化
3.添加序列化ID: serialVersionUID
4.默认序列化对象的All‘字段,除了static和transient
5.序列化具有可继承性,父类实现序列化,其所有子类都可以序列化
6.注意流的关闭,否则可能导致读取异常,因为没有写入完毕,程序退出

	- 标准输入/输出流

		- 标准输入:System.in  键盘
// 编译类型：InputStream
 // 运行类型 BufferedInputStream

		- 标准输出:System.out 显示器
编译类类型和运行类型一致 PrintStream

	- 转换流(字符流)

		- InputStreamReader

			- 重要构造器:    public InputStreamReader(InputStream in, String charsetName)
可以设置字符集,读入字节流,输出字符流


		- OutputStreamWriter
	
			-     public OutputStreamWriter(OutputStream out, String charsetName)
将字节流转换成字符流,可以设置写入文件的字符集

	- 打印流
	
		- PrintSteam字节流
	
			- 默认输出显示器,可以设置输出到文件中
System.setOut(new PrintStream(filename));

		- PrintWriter字符流
	
			-         PrintWriter printWriter = new PrintWriter(System.out);
	    PrintWriter printWriter = new PrintWriter(new FileWriter(file));
记得close或者flush一下

	- Properties(hashtable的子类)
	
		- 常见方法
	
			- load:加载配置文件的键值对到Properties对象
list : 将数据显示到指定设备
getProperty 根据键获取值
setProperty(k,v) 设置键值到Properties对象
store 将Properties中的键值对存储到配置文件中,在idea中,保存信息到配置文件,如果有中文,会存储为unicode码

		- .properties文件格式
	
			- key=value
key=value
不需要有空格,默认类型是String

## 异常

### try-catch捕捉异常

### throws往上抛异常

### 自定义异常,一般继承runtime exception,使用默认的往上抛出处理方式

## 枚举类和注解

### 枚举类

包含有限对象的类
只有一个对象的类是单例模式
使用enum后就不能继承其他类,因为他默认继承java.lang.Enum类
枚举类可以实现接口

### 注解

- 元注解

	- Retention指定注解的作用范围

	  source:编译器使用后直接丢弃
	  class:编译器记录,但是运行时jvm不会保留注解,这个是默认值
	  runtime:编译器记录在class文件中,当jvm运行时会保留注解,程序可以通过反射获取注解
	  
	- target指定修饰那些个程序元素

	  type:类
	  field:成员变量
	  method:方法
	  parameter:形参
	  constructor:构造器
	  ...
	  
	- documented被javadoc工具提取成文档时,可以看到该注解

	- Inherited:如果某个类使用了被Inherited修饰的注解,则其子类将自动具有该注解

## GUI

### 事件处理机制

## Iterable

### Collection

- List

	- ArrayList

	- Vector

	- LinkedList

- Set

	- TreeSet

	- HashSet

## Map

### HashMap

- LinkedHashMap

### TreeMap

### Hashtable

- Properties

