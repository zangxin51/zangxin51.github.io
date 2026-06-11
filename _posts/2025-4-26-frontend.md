---
layout:     post
title:      "frontend"
subtitle:   ""
date:       2025-04-26 10:25:00
author:     "zangxin"
header-img: "img/home-bg.jpg"
catalog: true
tags:
---

# Frontend

## HTML

### 定义

- 超文本标记语言,由标签组成的文本,可以包括文本,图片,声音,视频,表格,链接等

### 字符实体

```html
&nbsp; &lt; &gt; &amp;(&)
```

### 结构

- 常用标签

  - font

  	- color, size, face(字体)

  - hr横线

  - 标题h1-h6

  	- 水平对齐 align=left,right,center

  - a超链接

    ```html
     target=_self,_blank
    ```

  - 列表

    - ul无序

      ```html
      type=disc(实心圆),circle(空心),square(正方形)
      ```

    - ol有序

    	- type=1,a,A,i,I
    start=起始值(数字)

    - li列表项放在ul和ol里面

  - img图片

  	- src图片路径

  	- width,height,宽高,设置一个就行

  	- alt无法找到图片时: 显示的文字

  	- border图片的边框

  - p段落标签

  - table表格

  	- table属性

  		- border边框宽度

  		- cellspacing 空隙大小

  		- celllpadding填充大小

  		- align

  		- bordercolor边框颜色

  		- width,height

  	- 行tr

  	- 列: 表头th, 普通行td

  	- 合并单元格

  		- colspan, rowspan

  - form表单

    - 属性

      - action=url

      - method=get(默认),post

        - get

          ```html
           username=&password=&fruit=2&gender=0&hobby=1&desc=请输入&photo=a.jpeg
          ```

          - 属性从地址栏发送拼接在url后面

          - 缺点:不安全可以看到隐私信息,并且url长度有限制(视浏览器和服务器而定)

        - post

        	- 提交的请求放在请求体中,不会展示在url后面

        	- 比get请求安全,**理论上没有长度限制**

    - 输入框标签input

    	- type=text输入框

    	- type=password密码框

    	- type=submit提交

    	- type=reset重置

    	- name=变量名

    	- value=变量值

    	- 隐藏域: type=hidden

    	- 上传文件: type=file

    	- 按钮: type=button, value就是按钮上面的名字

    - 多选框

    	- type=checkbox, value需要指定,checked默认选中

    - 单选框

    	- type=radio value指定,checked默认选中

    - 下拉框(单选)

    	- select->option,selected默认选中

    - 多行文本输入框textarea

    	- rows:显示几行的高度

    	- cols每行可以显示几个字符

    - 示例

  ```html
  <form method="get" action="#">
    用户名:<input type="text" name="username"> <br>
    密码:<input type="password" name="password"> <br>
    apple: <input type="checkbox" name="fruit" value="1">
    orange: <input type="checkbox" name="fruit" value="2" checked>
    watermelon: <input type="checkbox" name="fruit" value="3"> <br>
    男: <input type="radio" name="gender" value="0" checked> <br>
    女: <input type="radio" name="gender" value="1"> <br>
    hobby:
    <select name="hobby">
      <option value="1" selected>吃饭</option>
      <option value="2">锻炼</option>
      <option value="3">编程</option>
    </select><br>
    自我介绍:<textarea name="desc">请输入</textarea><br><br>
    头像:<input type="file" name="photo"><br><br>
    <input type="submit">
    <input type="reset">
  </form>
  ```

  - 布局标签

  	- div 独立块

  	- span 行内

## CSS

### 定义

- 层叠样式表,将html中的样式和内容分离,提高开发/修改的效率,更好控制页面:集中控制

### CSS引入方式

- 行内样式

  ```html
  <th style="color: red">tite1</th>
  ```

- 在head标签中使用style标签

- 创建.css文件, 在head中引入

  ```html
  <link rel="stylesheet" href="css/css01.css">
  ```


### CSS语法

- 选择器 {
声明1;
声明2;
...
}

- 注释/**/

- 选择器

	- 元素选择器

		- 元素名, 对所有元素起作用

	- id 选择器

		- #id_name {}

	- 类选择器

		- .class_name

	- 组合选择器,or的关系

		- div,div,span

	- 选择器优先级

		- 行内样式>id选择器>clss选择器>元素选择器

### 声明

- width/height宽高

- 背景色background

- 字体颜色color

- 边框border

	- border-style

- 字体font

	- 字体族,font-family

	- 字体大小font-size

	- 是否粗体font-weight

- margin

	- 水平居中: margin 0 auto

- 超链接去掉下划线

	- text-decoration:note

- 表格

  - 表格去掉间隙

  	- border-collapse: collapse;

  - 表格边框

  	- order: 1px solid black;

  - 示例

    ```css
    table,th,td {
      width: 50%;
      height: 20%;
      border: 1px solid black;
      border-collapse: collapse;
      margin: 0 auto;
    }
    ```

- 列表(ul/ol)去掉修饰

	- list-style:none

## Javascript

### 定义

- javascript是弱类型脚本语言

### 引入方式

- 行内

- 在html的head中script标签

- 引入外部xxx.js文件

  ```html
  <script type="text/javascript" src="js01.js"></script>
  ```


### 数据类型

- 查看类型typeof

- 数值类型number

- 字符串类型string

- boolean类型

  - true/false

- 对象类型object

- 函数类型function

- 特殊值

  - undefined

    - 变量没有初始值时默认为undefined

  - null

    - 空值

  - NaN

    - Not a Number非数值

### 运算符

- 算数运算符

  - 和java一样,但是 /除结果是浮点数

- 赋值运算符

  - 和java一样

- 关系运算符

  - ==比较字面值

  - 和java一样, 多个=== 除了比较字面值,也比较两个变量的数据类型

  - '123' == 123 true (fnck)
    '123' === 123 false

- 逻辑运算符

  - 和java一样,&& || ! 有短路现象

    - &&:表达式为真时返回最后一个表达式的值
      表达式为假时, 返回第一个为假的表达式的值

    - ||: 表达式真返回第一个真的表达式的值,
      为假时返回最后一个为假的表达式的值

  - 在js中所有变量都可以作为boolean值使用

  - 0, null, undefined, ""(空串), 当做false处理

- 三元运算符

### 数组

- 类似java集合,是object类型,没有容量限制,元素可以多种类型

- 创建数组

  - arr = [] 空数组
    arr = [1,2,3]
    arr = new Array() 空数组
    arr = new Array(1,2,3)

- 访问数组arr[0], arr[1],下标从0开始, 未赋值的元素为undefined

- 遍历数组

  ```javascript
  for(let i=0;i<arr.length;i++){
    console.log(i)
  }
  ```


### 函数

- 定义

  - 方式1

    ```java
    function fun_name(参数列表){
    函数体
    return值
    }

    调用 fun_name(参数列表){}
    ```

  - 方式2
    var f1= funcition(){}
    调用 f1()

  - 函数的类型为function

- 注意点

  - 没有重载overload

  - 隐形参数: arguments(不需要显示声明), 相当于java中可变参数
    使用方式相当于操作数组

  - 形参个数可以和实参个数不匹配, 未匹配的形参为undefined

### 对象

- 定义对象

  - 没有封装性

  - 方式1

    ```javascript
    var obj = new Object() 定义一个空对象
    obj.属性名=值 定义一个属性
    obj.函数名=function(){} 定义一个方法
    ```

  - 方式2

    ```java
    var obj = {
      属性名:值,
      方法名: function(){},
    }
    ```

    多个属性,方法之间用逗号隔开

- 访问对象: 
  对象名.属性
  对象名.方法名

### 事件

- 事件的定义

  - 事件是电脑输入设备与页面进行交互的响应

  - 时间通过与函数配合, 通过事件驱动函数执行, 调用后端接口, 然后完成用户需要的功能

- 事件的注册(绑定)

  - 概念: 当事件触发时需要浏览器执行哪些代码,叫做事件的绑定

  - 绑定方式

    - 静态: 在html标签中直接赋值给函数

    - 动态:通过js获取到dom对象, dom对象.事件名=函数

- 事件的分类

  - 页面加载完成事件onload

    - windown.onload=function(){加载完成后要执行的操作,比如动态绑定事件}

    - 页面加载完毕是: 页面可以显示出来了,所有dom对象创建完毕

    - 示例

    ```javascript
    // 页面加载完成事件onload
    window.onload = function (){
      console.log('加载完成')
      // 绑定点击事件, 要等要绑定的按钮的dom对象创建完成, 所以放在window.onload事件中
      let bt1 = document.getElementById("bt1")
      绑定按钮的点击事件到函数click1上
      bt1.onclick=click1;
    }
    ```


  - 鼠标点击事件onclick

    - 提交表单时校验

  - 失去焦点事件onblur

    - 输入姓名完成后,校验姓名是否合法

  - 内容发生改变事件onchange

  - 表单提交事件onsubmit

    - onsubmit绑定的函数返回true时提交表单, 返回false不提交表单  

  - 示例

- //事件

  ```javascript
  // 页面加载完成事件onload
  // 点击事件
  function click1() {
    console.log("click button ok")
  }
  function click2() {
    console.log("click button cancel")
  }
  // 失去焦点事件
  function onblur_() {
    console.log('输入框失去焦点了, 校验用户名是否合法')
  }
  // 内容改变事件
  function onbchange_() {
    console.log("改变了女朋友")
  }
  // 表单提交事件
  function checkNameAndPwd() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    if (username.value === "" || password.value === "") {
      alert("用户名和密码不能为空")
      // 返回false就不提交表单
      return false;
    }
    return true;
  }
  ```


### 正则表达式

- 邮箱:regex=/^[\w-]+@([a-zA-Z]\.)+[a-zA-Z]+$/

- 测试: regex.test(mail)

### dom

- 定义

  - 全称是文档对象模型, Doucument Object Model

  - 就是把外档中的标签,属性,文本,转换成对象来管理

- dom分类

  - html dom

  - css dom

  - xml dom

- dom的好处, 像操作对象一样操作html
  通过doucument对象可以访问所有标签对象

- HTML DOM

  - document对象常用方法

    - getElementById

    - getElementsByName

    - getElementsByClassName

    - getElementsByTagName (标签名)

    - createElement(标签名)

  - 节点常用方法

    - 将一个标签添加到另一个标签中, appendChild

  - 节点常用属性

    - childNodes所有子节点

    - firstChild第一个子节点

    - parentElement父节点

    - previousSibling前一个节点

    - nextSibling后一个节点

    - value获取value值

    - className标签的class属性值

    - innerHTML获取起始标签和结束标签之间的内容,作为元素来

    - innerText获取起始标签和结束标签之间的内容,作为文本

  - innerText和innerHTML属性的区别, 一个返回文本,一个返回dom对象

  - 使用方法: 1.拿到dom, 2.操作dom


## JSON

### 定义

- JSON是javascript对象表示法(javascript object natation), JSON的类型是Object

- json是轻量级的文本数据交换格式

- json独立于语言,java,php,.net,go都可以用json数据格式, 一般用来前后端数据交互格式

- json用户数据交互,xml用配置文件

### 使用

- JSON定义格式

  ```javascript
  var myjson = {
    "k1": "v1", // string
    "k2": 123, // Number
    "k3": [1, "hi", 2, 3], // array
    "k4": {"name": "Tom", "age": 23, "job": "DE"},// json对象
    "k5": [ // json数组
      {"name": "jerry", "age": 23, "job": "DE"},
      {"name": "henry", "age": 23, "job": "DE"}
    ]
  }
  ```


  - 元素类型为: string, number, object, array(object), true, false, null

  - 本质是key--value键值对, key必须用双引号引起来

- 查看属性

	- JSON.属性名,如myjosn.k1或者myjson[key]

- 遍历

  ```javascript
  for (let key in myjson) {
    console.log(key, "=", myjson[key])
  }
  ```

- JSON对象和字符串互转

	- string -->JSON

		- JSON.stringify(json)

	- JSON ---> string

		-      JSON.parse(jsonString)

	- 上面两个JSON的方法不会影响原来对象

	- 转json对象时,jsonString只能用双引号"",不要用单引号

## jQuery

### 基本介绍

- jQuery是一个js库,能方便的处理html,css,dom

- 提供方法,events,选择器,并且提供ajax交互

- 宗旨是: The Write Less, Do More, JavaScript Library

### 使用

- jquery对象

  - 获取对象

    - $("#id")

      - 在编程中,规定jquery对象命名以$开头

      - 等价于document.getElementById("id");

      - 绑定事件

        ```javascript
        $("#id").click(function () {
          alert("我是jquery阿❤️")
        });
        ```

        - window.onload = funciton(){} 的等价写法

        ```javascript
        $(function(){})
        ```


  - jquery对象是对dom对象的包装

    - dom对象转换成jquery对象

      - $(dom对象)

    - jquery对象转换成dom对象

      - jquery是一个dom数组,可以通过[index]和get(index)来获取,一遍来说index是0
        $("#id")[0].value 等价于document.getElementById("id").value

  - jquery对象的方法

    - html() 等价于 innerHTML

    - val()等价 value属性

      ```javascript
      // 把所有text类型的input的value改成足球
      $(input[type='text']).val("足球")
      ```

    - css("background","#0000FF"),设置css样式

    - // jquery的each方法用来遍历数组

      ```java
      $("input:hidden").each(function () {
        // this是个dom对象, 代表数组中元素
        console.log(this.value)
      });
      ```

    - length

      - 元素的个数, Jquery对象是个数组

    - text()

      - 获取下拉框选中的文本

- jquery的健壮性, 对于空指针, 原生js会抛出异常
  jquery会显示为undefined

- jquery选择器

  - 基本选择器

    - id选择器

      - $("#id")

    - 元素选择器

      - $("tagName")

    - class选择器

      - $(".className")

    - 通用选择器

      - $("*")匹配整个html页面所有元素

    - 并集选择器

      - $("div,#id,.class")

    - 交集选择器

      - div#id.class

  - 层级选择器

    - 后代选择器

      - $("form input")

        - 返回集合元素, 在给定的祖先元素下的所有后代元素

    - 父类选择器

      - $("parent > child")

        - 返回集合元素, 在给定父元素下匹配所有子元素

    - 兄弟选择器

      - $("pre+next")

        - 返回紧接着pre元素后面的next元素,只要next一个

    - prev ~siblings

      - $("pre ~siblings")

        - 匹配pre元素之后的所有siblings元素,不包括pre元素(匹配同辈的元素,不含同辈的儿子)

    - 选择所有兄弟

      - $("#id").siblings("div")

        - siblings匹配id的所有div兄弟(不包括他自己)

  - 伪类选择器

    - :first

      - $("tr:first") 返回第一个元素

    - :last

      - $("tr:first") 返回最后一个元素

    - :not(selector)

      - $("input:not(:checked)"), 对选择条件取反,这里表示input中被选中的

    - :even

      - $("tr:even")

        - 匹配索引值为偶数的元素, 从0开始计数

    - :odd

      - $("tr:odd")

        - 匹配索引值为奇数的元素, 从0开始计数

    - :eq(index)

      - $("tr:eq(2)")

        - 返回第二个

    - :lt(idex), :gt(index)

    - :header

      - $(":header")

        - 匹配所有h1,h2,...标题元素

    - :animated

      - 匹配所有正在执行动画效果的元素

  - 内容过滤选择器

    - 内容选择过滤器的过滤规则主要体现在它所包含的子元素和文本内容上

    - :contains(text)

      - $("div:contains("joihn")

        - 匹配包含给定文本的元素,它的作用是查找被标签包围起来文本内容是否匹配给定的文本内容

    - :empty

      - $("td:empty")

        - 匹配所有不包含子元素或文本的空元素

    - :has(selector)

      - $("div:has(p)")

        - 匹配含有选择器所匹配的元素的元素

    - :parent

      - $("td:parent")

        - 匹配含有子元素或者文本的元素

  - 可见度过滤选择器

    - 可见度过滤选择器是根据元素的可见和不可见状态来选择相应的元素

    - :hidden

      - $("tr:hidden")

        - 匹配所有的不可见元素,hidden的input也会被匹配到,css中display:none也会匹配到

    - visible

      - $("tr:visble")

        - 匹配所有可见的元素

  - 属性过滤选择器

    - 属性过滤选择器的过滤规则是通过元素的属性来获取相应的元素

    - [attribute]

      - $("div[id]")

        - 匹配所有带id属性的div标签

    - [attribute=value]

      - $("input[name='username']").attr("check",true)

        - 匹配某个属性是某个特定值

    - [attribute!=value]

      - $("input[name!='username']").attr("check",true)

        - 匹配所有不含特定属性或者不等于特定值的属性, 等价于:not([attr=value])

        - 要匹配含有特定属性但是不等于特定值的元素用:[attr]:not([attr=value])

    - [attribute^=value]

      - $("input[name^=user]")

        - 匹配给定属性是以某些值开头的

    - [attribute$=value]

      - $("input[name$=name]")

        - 匹配给定属性是以某些值结尾的元素

    - attribute*=value

      - $("input[name*='man']")

        - 匹配给定的属性是以包含某些值的元素.

    - \[attributeFilter1]\[attributeFilter2][attributeFilterN]

      - $("input\[id][name$='man']")

        - 复合属性选择器,需要同时满足多个条件时使用

  - 子元素过滤选择器

    - :first-child

      - $("ul li:first-child")

        - 为每个父元素匹配第一个的子元素, 这个是从1开始的, eq是从0开始的,不同于:first,返回一个, 这个是返回集合

    - :last-child

      - $("ul li:last-child")

        - 为每个父元素匹配一个最后的子元素,不同于:last,只返回一个, 这个是返回集合

    - :only-child

      - $("ul li:only-child")

        - 只有一个子元素的才会被匹配,独生子

    - nth-child()

      - nth-child(even)

        - 偶数子元素, 从1开始

      - nth-child(odd)

        - 奇数子元素,从1开始

      - nth-child(3n)

        - 匹配索引值为3的倍数的元素

  - 表单属性过滤选择器

    - 此选择器主要对所选择的表单元素进行过滤

    - :enabled

      - $("input:enabled")

        - 匹配所有可用元素, 可用:enabled, 不可用的:disabled

    - :disabled

      - $("input:disabled")

        - 匹配所有不可用元素,与上面的那个是相对应的

    - :checked

      - $("input:checked")

        - 匹配所有被选中的元素(checkbox, radio等)

    - :selected

      - $("input:selected")

        - 匹配被选中的option元素

  - 表单选择器

    - :input

      - $("input")

        - 匹配所有input,textarea,select,button元素

    - :text

      - $("text")

        - 匹配所有单行的文本框

    - :password

      - $(":password")

        - 匹配所有密码框

    - :radio

      - $(":radio")

        - 匹配所有单选框

    - :checkbox

      - $(":checkbox")

        - 匹配所有复选框

    - :submit

      - $(":submit")

        - 匹配所有提交按钮

    - :image

      - $(":image")

        - 匹配所有图像域

    - :reset

      - $(":reset")

        - 匹配所有重置按钮, 包括button

    - :button

      - $(":button")

        - 匹配所有<button>和<input type=button>的按钮

        - $("button")只匹配<button>

    - :file

      - $(":file")

        - 匹配所有文件域

    - :hidden

      - $(":hidden")

        - 匹配所有隐藏域

        - 这个不局限于表单了, 还匹配style为hidden的,宽度或高度为0的

- DOM操作

  - 查找节点,修改属性attr()方法

    - $("img").attr("src", "../../img/b.jpeg");
      $("img").attr("width","100px");

  - 创建节点

    - 使用jQuery的工厂函数$(): $(htm标签), 根据传入html标签名字符串,创建一个jquery对象

    - 动态创建的新节点不会自动加入到文档中, 而是需要使用其他方法插入到文档中

    - 创建元素时,需要注意闭合标签, 使用完整的标签名

    - 创建文本节点就是在创建元素节点时,把文本内容写出来, 创建属性节点也是在创建元素节点时,一起创建

    - 插入节点的方式

      - 内部插入(父子)

        - append(content)

          - 向每个匹配的元素的尾部追加内容, A.append(B), A,B都是Jquery对象, 结果是B成为A的子元素

        - appendTo(content)

          - 将每个匹配的元素追加到指定元素中内部的结尾处, A.appendTo(B) 等价于 B.append(A), 即A是B的子元素

        - prepend(content)

          - 向每个匹配元素的内部开始处插入指定内容

        - prependTo(content)

          - 将每个匹配的元素插入到指定元素开始处

      - 外部插入(兄弟)

        - after(content)

          - 在每个匹配的元素之后插入内容

        - before(content)

          - 在每个匹配元素之前插入内容

        - insertAfter(content)

          - 把所有匹配的元素插入到指定元素之后

        - insertBefore(content)

          - 把所有匹配的元素插入到指定元素之前

      - 移动节点

        - 对已有元素进行上面方法操作,就是移动元素

  - 删除节点

    - remove()

      - 从dom中删除所有匹配的元素, 传入的参数用于根据jQuery表达式来筛选元素, 当某个节点用remove方法删除后, 该节点所包含的所有后代节点都将被同时删除.这个方法返回一个指向被删除节点的引用

    - empty()

      - 清空节点,清空元素中所有后代节点,但是他自己保留

  - 复制节点

    - clone()

      - 克隆匹配的DOM元素, 返回值为克隆后的副本, 但不具有原节点的行为

        - $("p").clone(true).insertAfter($("button"))

    - clone(true)

      - 复制元素同时也复制元素中的事件

  - 替换节点

    - replaceWith()

      - 将所有匹配的元素都替换为指定HTML和DOM元素A.replaceWith.B, 用B替换A

    - replaceAll()

      - A.replaceAllB,用A替换B

    - 替换之前若是绑定了事件, 则替换后原先绑定的事件会与原先的元素一起消失

  - 属性操作

    - attr()

      - 获取属性和设置属性

      - 传递一个参数为根据属性名获取属性值 

      - 传递两个参数为:为某个属性设定属性值

      - 使用案例

      - 选中下拉框

        ```javascript
        $("#s1>option:eq(1)").attr('selected',true)
        原生dom操作
        let $option = $("#s1>option:eq(1)")[0];
        $option.removeAttribute("selected")
        $option.setAttribute("selected",true)
        ```

        - 全选功能不要用attr("chekced, true)

        - // 全选

        ```javascript
        $("#b1").click(function () {
          $("input[name='hobby']").each(function () {
            this.checked = true;
          });
        });
        ```

        - // 全不选

        ```javascript
        $("#b2").click(function () {
          $("input[name='hobby']").each(function () {
            this.checked = false;
          });
        });

        ```

        - // 反选

        ```javascript
        $("#b3").click(function () {
          $("input[name='hobby']").each(function () {
            this.checked = !this.checked
          });
        });
        ```

    - jQuery中很多方法都是一个函数实现获取和设置,如:attr(),html(),text(),val(),height(),width(),css()

  - removeAttr()

    - 删除指定元素的指定属性

  - 样式操作(class)

    - 获取class和设置class

    - 追加样式

      - class是元素的一个属性,所以可以用attr("class","class名不要带点")方法

      - addClass

    - 移除样式

      - removeClass

        - 从匹配的元素删除全部class或指定的class

    - 切换样式

      - toggleClass

        - 控制样式上的重复切换, 如果类名存在则删除它, 如果不存则添加它

    - 判断样式是否存在

      - hasClass

        - 判断元素中是否含有某个Class, 有true,无false

  - 获取HTML,文本,值(value)

    - 设置或返回所选择的元素内容(包括HTML标记)

      - html()

    - 读取和设置某个元素中的文本内容

      - text()

    - 读取和设置某个元素中的值

      - val()

        - 类似JavaScript中的value属性

    - 表单中defaultValue表示默认值.就是初始值,比如写死的value="这里是默认值"

      - 用户输入提示案例失去焦点提示, 获取焦点时清除提示

      ```java
      $(function () {
        $("#b1").focus(function () {
          if (this.value === this.defaultValue) {
            this.value = "";
          }
        });
        $("#b1").blur(function () {
          if ($("#b1").val().length === 0) {
            this.value = this.defaultValue;
          }
        });
      }) 
       <input type="text" value="用户名" id="b1"/><br>
      ```


  - 节点遍历

    - 方法

      - children()

        - 取得匹配元素的所有子元素的集合,该方法只考虑子元素,不考虑任何后代元素

      - next(),nextAll()

        - 匹配元素后面的同辈元素的集合

      - prev(),prevAll()

        - 匹配元素前面的同辈元素的集合

      - siblings()

        - 取得匹配元素前后所有同辈元素,不含它自己

      - nextAll().eq(index)

        - 获取指定的第几个元素

      - nextAll().filter("标签名")

        - 对获取的同辈元素进行过滤

  - CSS-Dom操作

    - css()

      - 获取和设置元素的样式属性

    - height()/width()

      - 获取元素的宽度和高度, 在设置值时, 若只传递数字, 则默认单位是px, 如果需要其他单位则需要传递一个字符串, 如:$("p:first").height("2em");

    - offset()(只读)

      - 获取元素在当前视窗中的相对位移, 其返回对象包含了两个属性top, left,该方法只对可见元素有效

    - 示例

      ```javascript
      $("img").css("position", "absolute")
      $("img").css("top", "100px")
      $("img").css("left", "100px")
      console.log('left', $("img").offset().left)
      console.log('top', $("img").offset().top)
      console.log('opacity', $("img").opacity)
      ```

  - 加载DOM

    - 在页面加载完毕后,浏览器会通过js为dom添加事件

    - 在常规的js代码中,通常使用windown.onload=function(){}

    - 在jQuery中使用$(document).ready()方法

    - 区别

      - 执行时机

        - window.onload必须等待网页中所有内容加载完毕后(包括图片)才能执行

        - $(document).ready()网页中所有dom结构绘制完毕后就执行, 可能dom元素关联的东西没有加载完毕

      - 编写个数

        - windown.onload只能编写一个

        - $(document).ready可以编写多个

      - 简写

        - $(...).ready ----> $()


## ES6新特性

- 全称 ECMAScript 6.0 ,是 JavaScript 的下一个版本标准， 增加了新的语法特性

- let

  - let声明的变量有严格作用域,在大括号外面看不见

  - let只能声明一次,var可以声明多次

  - let不存在变量提升,  var存在变量提升

    ```javascript
    console.log("y=",y) // undefined
    var y = 'gg'
    ```

  - let相当于java的变量使用, 不是let罕见, 而是var太逆天

- const

  - 常量在定义时，需要赋值

    常量赋值后不能修改

- 解构赋值

  - 解构赋值是对赋值运算符的扩展

    是一种针对数组或者对象进行模式匹配，然后对其中的变量进行赋值 

    主要有两种形式: 数组解构和对象解构

数组解构

```javascript
arr = [1, 3, 5]
let [a, b, c] = arr
let [num1, num2, num3] = [1, 2, 3]
```

​	对象解构(属性名要相同)

```javascript
// 对象解构
let user = {name: "Alan", age: 10}
// 传统写法
console.log(user.name, user.age)
// es6写法,把对象属性赋值给变量,变量名字和
// 对象的属性名字相同,与顺序无关
let {name, age} = user;
// 在方法中使用对象解构, 依旧要保持变量名相同
// 不同就是undefined
function fun1({name, age}) {
  console.log(name,age)
}
```


- 模版字符串

  - 使用反引号``括起来

  - 可以定义多行字符串,保持原来的格式

  - 在模板字符串中插入变量和表达式,使用${}

  ```javascript
  let userInfo = `用户名${name},年龄${age}`
  let calResult = `1+2=${1 + 2}`
  ```

  - 在模板字符串中调用函数

  ```javascript
  function sayHello(name) {
    return "hi " + name
  }
  let result = `返回结果${sayHello('name')}`
  let result1 = `返回结果${sayHello(age)}`
  ```


- 声明对象简写

  ```javascript
  let name = "jack"
  let age = "23"
  // 传统写法
  let user = {name: name, age: age}
  // es6 表示对象的属性名是name和age, 值是已经声明的变量的name和age的值
  let user = {name, age}
  ```


- 对象的方法简写

  - 传统写法

  ```javascript
  let user = {
    name: 'Alice',
    age: 22,
    showInfo: function () {
      // 使用成员变量一定要加上this.variable
      console.log(this.name, this.age)
    },
  }
  user.showInfo()
  ```


  - es6写法(省掉function关键字的的书写)

  ```javascript
  let user = {
    name: 'Alice',
    age: 22,
    showInfo() {
      // 使用成员变量一定要加上this.variable
      console.log(this.name, this.age)
    },
  }
  user.showInfo()
  ```


- 对象运算符的扩展

  - 值传递类型

    ```javascript
    let cat = {name: "多啦A梦", age: 2}
    let cat2 = cat;
    cat2.name = 'tom喵';
    console.log(cat == cat2) // true
    ```

  - 对象拷贝(深拷贝 {...}

    ```javascript
    let cat2 = {...cat}
    ```


  - 合并对象(深拷贝)

  ```javascript
  let cat = {name: "多啦A梦", age: 2}
  let tool = {tool_name: "任意门", color: "black"}
  let cat_tool = {...cat, ...tool}
  {"name": "多啦A梦", "age": 2, "tool_name": "任意门", "color": "black"}
  ```


- 箭头函数(lambda)

1. 箭头函数提供更加简洁的函数书写方式。

2. 基本语法是:(参数列表) => { 函数体 }
3. 箭头函数没有参数或有多个参数，要用 () 括起来,箭头函数只有一个参数, 可以省略()
4. 箭头函数函数体有多行语句，用 {} 包裹起来，表示代码块
5. 函数体只有一行语句，并且需要返回结果时，可以省略 {} , 结果会自动返回
6. 箭头函数多用于匿名函数的定义

  - 案例

    ```javascript
    let fun1 = (n) => n * 2;

    let f2 = (n, m) => {
      let sum = 0;
      for (let i = n; i <= m; i++) {
        sum += i;
      }
      return sum;
    }
    f2(1,100)
    ```


  - 函数作为形参

    ```javascript
    function fun2(func) {
      console.log(func(10))
    }
    fun2((n) => n * n)
    ```

形参解构

```javascript
// 形参名和要对象属性一致,否则拿不到数据
let user = {name: "Alice", age: 23}
let f3 = ({name,age}) =>{
    console.log(name,age)
}
f3(user)
```


- Promise

  - 异步编程的一种解决方案
    为了结解决ajax多个回调函数嵌套的问题
    Promise本质上一个对象

    ```javascript
    // ajax多层嵌套
    $.ajax({
      url: 'data/user.json',
      type: 'get',
      success(resultData) {
        console.log("第一次ajax请求,拿到简略信息=", resultData)
        $.ajax({
          url: `data/userDetail_${resultData.id}.json`,
          success(resultData) {
            console.log("第二次ajax请求,拿到简略信息=", resultData)
            // ..... ajax callback hell
            // 嵌套多个ajax层, 为了解决引入了promise
          },
        })
      }
    })
    ```

  - 使用Promise

    - /1. 创建 Promise 对象
    - //2. 构造函数传入一个箭头函数
    - //3. (resolve, reject) 参数列表 resolve: 如果请求成功, 调用 resolve 函数 
    - //4. 如果请求失败, 调用 reject 函数
    - //5. 箭头函数体, 仍然是通过 jquery 发出 ajax

  - Promise调用链

    ```javascript
    new Promise((resolve, reject)=>{}).then((resultData)=>{return new Promise((resolve,reject)=>{}}).catch((error)=>{统一处理异常))
    // 丑陋,千万不要打开后面看
    ```

  ```javascript
  function getUserInfo() {
    let p = new Promise((resolve, reject) => {
      $.ajax({
        url: 'data/user.json',
        success(resultData) {
          console.log("第一次Promise请求 ", resultData)
          resolve(resultData)
        },
        error(error) {
          console.log("第一次Promise请求,调用失败")
          reject(error)
        }
      })
    });

    p.then((resultData) => {
      return  new Promise((resolve, reject) => {
        $.ajax({
          url: `data/userDetail_${resultData.id}.json`,
          success(resultData) {
            console.log("第二次promise请求", resultData)
            resolve(resultData)
          },
          error(error) {
            console.log("第二次Promise请求,调用失败")
            reject(error)
          }
        })
      }).then((resultData)=>{
        return new Promise((resolve,reject)=>{
          $.ajax({
            url:`data/userDetail_${resultData.girlFriedId}.json`,
            success(resultData){
              console.log("第三次promise请求", resultData)
              resolve(resultData)
            }
          })
        })
      })
    }).catch((err)=>{
      console.log("统一处理多次请求的异常")
    });
  }
  ```

- 优化,代码重排(优美)

```javascript
/**
 * 编写一个封装promise调用ajax的调用的方法
 * @param url
 * @param data
 * @returns {Promise<unknown>}
   */
function get(url, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      data: data,
      success(resultData) {
        resolve(resultData)
      },
      error(error) {
        reject(error)
      }
    })
  })
}
```


// 需求:1.获取用户后,
// 2获取用户详情中用户女朋友id,
// 3.根据用户女朋友id获取用户女朋友信息

```javascript
function getUserInfo() {
  get("data/user.json", null).then((resultData) => {
    return get(`data/userDetail_${resultData.id}.json`, null).then((resultData) => {
      return get(`data/userDetail_${resultData.girlFriedId}.json`, null).then((resultData) => {
        // 最终的数据结果
        console.log('resultData', resultData)
      })
    })
  }).catch((error) => {
    console.log("发生错误...")
  })
}
```


- 模块化编程

  - 传统非模块化开发有如下的缺点:(1)命名冲突 (2)文件依赖
  可以更好的加载别人已经写好的模块
  和java的分层,分包管理类似, 更好的导包

  - commonJS/ES5写法

    - 1. 每个 js 文件就是一个模块，有自己的作用域。在文件中定义的变量、函数、类/对象， 都是私有的，对其他 js 文件不可见

    - 2. CommonJS 使用 module.exports={} / exports={}导出模块, 使用 let/const 名称 = require("xx.js") 导入模块

    - 在html引入js使用的是: 

      ```html
      <script src="function.js" type="text/javascript"></script>
      ```

    - 在js中
      function.js

      ```javascript
      // 当做一个对象导出
      module.exports = {
        sum: sum,
        sub: subs,
        myname: name,
        PI: PI,
        myCat: cat
      }
      ```


      在use.js导入function.js中

      ```javascript
      // 导入所有的
      const m = require("./function");
      // 使用
      console.log(m.sum(1,2))
      console.log(m.PI)
      ```

      // 导入部分

      ```javascript
      const {sum} = require("./function");

      // 如果导出的名字和方法名一致,可以写成如下
      // module可以省略掉
      exports = {
        sum,
        subs,
        name,
        PI,
        cat
      }
      ```


  - ES6写法

    - // 导出方式一,部分导出,也可以全部导出

      ```javascript
      export {
      sum,
        subs,
        name
      }
      ```

      // 导入
      // 要求导入到名称和导出名称一致

      ```javascript
      import {name, subs, sum} from "./common"
      console.log(sum(10, 20))
      ```

    - // 导出方式二
      // 定义时,直接导出, 导入时必须保证名字一样

      ```javascript
      export const sum = (a, b) => a + b;
      import {sum} from './common'
      console.log(sum(1,2))
      ```


    - // 默认导出
      // 默认导出, 把大括号中内容当做对象导出

      ```javascript
      export default {
        sum: (a, b) => a + b,
        multi(a, b) {
          return a * b;
        },
        pi: 3.14
      }
      ```

      // 导入默认导出的模块, m的名称可以自定义
      // 这样可以决绝命名冲突的问题

      ```javascript
      import my from './common'
      console.log(my.pi)
      console.log(my.sum(1, 2))
      ```


## AJAX

Asynchronous Javascript And XML 异步JavaScirpt和XML

Ajax是一种浏览器异步发起请求(指定发哪些数据),局部更新页面技术,底层还是http协议

### 表单提交的缺点

- 表单提交时把所有数据, 都提交给服务端,数据量大

- 在服务端没有http响应前, 浏览器页面处于等待状态, 处于挂起等等状态, 一直转圈

- 不能进行局部刷新, 而是刷新整个页面

### 通信过程

- 1.创建XMLHttpRequest对象

	- 2.XMLHttpRequest对象发送指定数据(异步), 浏览器不要等待, 用户可以进行其他操作,XMLHttpRequest指定由那个函数处理(事件绑定)

	- 3.得到返回数据, 后可以进行dom操作, 完成局部刷新/页面/数据

### 使用

- quickstart

```javascript
$(function () {
  let $username = $("input[name='username']");
  $username.blur(function () {
    let xhr = new XMLHttpRequest();
    // 获取响应, 当请求完成且响应码位200时,去执行操作
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // response : {"msg":"该名字已经被使用","code":0}
        console.log(this.response)
        console.log(typeof this.response) //string
        let res = JSON.parse(this.response) // 转成json对象
        // 替换原来提示信息
        $("#msg").text(res.msg)
      }
    };
    // 获取用户名,拼接到url后面给后端
    let username = $username.val()
    // 请求后端: 方法get, url, 使用异步
    xhr.open('get', '/checkUsrServlet?username=' + username, true)
    // 真正发送请求
    xhr.send()
  });
});
```

- onreadystatechange属性

	- onreadystatechange 属性定义了一个回调函数，当 readyState 改变时执行该函数。

- readyState 属性保存 XMLHttpRequest 的状态。

	- 0：请求未初始化
1：服务器连接已建立
2：请求已收到
3：正在处理请求
4：请求已完成且响应已就绪

- status 属性和 statusText 属性保存 XMLHttpRequest 对象的状态。

	- status  statusText
200: "OK"
403: "Forbidden"
404: "Not Found"

### jQuery操作Ajax

- $.ajax()

  - 参数

    - url 请求地址

    - type 请求方法,get,post

    - data  发送到Server的数据,将自动转换为字符串格式

    - success      成功时的回调函数

    - error 失败后的回调函数

    - dataType 返回后数据类型,常用json或者text

    - async 默认为true,使用异步请求,false使用同步请求

    - contentType 指定发送数据格式,比如json指定: 'application/json;utf8'

  - 示例

```javascript
$(function () {
  let $username = $("input[name='username']");
  $username.blur(function () {
    $.ajax({
      url: "/checkUsrServlet",
      type: "post",
      data: {
        username: $username.val(),
        date: new Date()
      },
      dataType: "json",
      error: function () {
        console.log("失败~")
      },
      success: function (res, statusTxt, xhr) {
        $("#msg").text(res.msg)
      },
    })
  });
});
```

- $.get

  - url,data,success

  - dataType 返回内容格式,xml,html,script,json,text

  - 示例

```javascript
$.get({
  url: "/checkUsrServlet",
  data:{
    username: $username.val(),
  },
  dataType:'json',
  success: function (res,statusText,xhr) {
    $("#msg").text(res.msg)
  },
})
```


- $.post

	- 和get完全一样,只是使用的请求方法不一样, get拼接在url后面...

- $.getJSON

	- 请求满足get方法,server返回json,不用写dataType


```javascript
$.getJSON({
  url: "/checkUsrServlet",
  data: {
    username: $username.val(),
  },
  success: function (res, statusText, xhr) {
    $("#msg").text(res.msg)
  },
})
```

- get,post,getJSON底层还是使用$.ajax方法来实现异步请求

## VUE

### 介绍

1. Vue (读音 /vjuː/，类似于 view) 是一个前端框架, 易于构建用户界面

2. Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或项目整合 
3. 支持和其它类库结合使用
4. 开发复杂的单页应用非常方便
5. 响应式的编程

- 声明式渲染：Vue 基于标准 HTML 拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系。

- 响应性：Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。

### mvvm模式

- 修改数据,dom会变化(domListener),dom变化也能影响到数据

### vue2

- quickstart

  - 引入vue包,创建vue实例挂载一个div实例上,然后在这个div元素内部就可以使用数据绑定了,message 就是从 model 的 data 数据池来设置,当我们的代码执行时，会到 data{} 数据池中去匹配数据, 如果匹配上, 就进行替换, 如果没有匹配上, 就是输出空

    ```html
    <div id="app">
      <!--  插值表达式,修改message值,这里显示的内容也会改变  -->
      <h1>{message}}-{name}}</h1>
    </div>
    <!--这里的数据不显示,没有绑定到vue上-->
    ```


    ```html
    <h1>{message}}-{name}}</h1>
    <script type="text/javascript">
      let vm = new Vue({
        el: "#app", // 把vue绑定id=app的元素上
        data: {
          message: "Hello Vue",
          name: "Tomcat&&Jerry"
        }
      })
      console.log(vm)
    </script>
    ```

注意代码顺序，要求 div 在前，script 在后，否则无法绑定数据

Vue 没有繁琐的 DOM 操作，如果使用 jQuery，我们需要先找到 div 节点，获取到 DOM 对象，然后进行节点操作, 显然 Vue 更加简洁

div元素不是必须的,也可是是其他元素,但是约定使用div, app也是这样的, 可以有多个vue实例, 但是一般一个就够用了

el是elemet的简写,表示绑定哪个元素

- 数据单向渲染

  - 插值表达式

  - v-bind,简写:

    - data数据池绑定的数据发生变化,会影响到view

    - 绑定到属性值上

      ```html
      <img v-bind:src="img" :width="img_width">
      ```

      ```json
      data: {
        message: "Hello zangxin",
        img: "../../img/a.jpeg",
        img_width: "100px"
      }
      ```

  - 插值表达式用在标签体

  - 如果给标签属绑定值, 则使用v-bind指令

  - 报红时, 引入命名空间

- 数据双向向渲染

  - v-model:
    和value属性配合使用简写为

    ```html
    name:<input type="text" v-model="username">
    ```


  - 快捷记忆, v-model = v和m都绑定
  v-bind = 只绑定视图

  - data变化会影响到view (data binding机制)
  view关联的元素值的变化,会影响到data数据池的数据(dom listener)

  - 要想输入影响后续的动作, 那就使用双向绑定

- 事件绑定

  - 使用v-on进行事件处理, 比如v-on:click表示点击事件

  - 事件调用的方法定义在vue对象声明的methods节点中(和data,el是同级的属性)

    ```html
    <button @click="hello()">点击输出</button>
    <button v-on:click="bye()">点击输出</button>
    methods: {
      hello() {
        console.log("你好")
      },
      bye() {
      	console.log("再见")
      }
    }
    ```

  - 细节

    - 如果方法没有参数,可以省略方法的小括号()

    - v-on指令简写@

    - 底层还是dom事件绑定机制

    - 可以在@click中写表达式

    ```javascript
    <button @click="count=count+3">点击+3</button>
    ```

    - 在方法中修改/访问data中属性, 使用this.属性名😯

- 事件修饰符

  - 修饰符(modifiers)是以(.)点指明的后缀, 指出某个指令以特殊方式绑定

  - .prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()即阻止事件原本的默认行为

  - 常用修饰符(v-on)

  	- .stop 阻止事件继续传播

  	- .prevent 阻止标签默认行为

  	- .capture 使用事件捕获模式, 即元素自身触发的事件先在此处处理，然后才交由内部元素进
  行处理

  	- .self 只当在 event.target 是当前元素自身时触发处理函数

  	- .once 事件将只会触发一次

  	- .passive 告诉浏览器你不想阻止事件的默认行为

  	- 键盘事件的修饰符
  项目经常需要监听一些键盘事件来触发程序的执行，而 Vue 中允许在监听的时候添 加关键修饰符

  - v-model 的修饰符

    - 自动过滤用户输入的首尾空格 

    ```javascript
    <input v-model.trim="msg">
    ```

  - 案例

    -  v-on:submit.prevent 的使用, 如果没有输入名字，控制台输出 "请输入名 字"，否则输出 "提交表单"

    ```html
    <form action="http://www.baidu.com" @submit.prevent="onMySubmit">
      name:<input type="text" v-model.trim="user.name">
      <button type="submit">注册</button>
    </form>
    ```

    ```javascript
    onMySubmit() {
      if (!this.user.name) {
        console.log("请输入名字")
      } else {
        console.log("可以提交名字: " + this.user.name)
      }
    }
    ```


- 条件渲染v-if/v-show

  - v-if

    - 当v-if表达式为真时, 才会进行渲染
      可以和v-else-if, v-else配合使用实现多分支

    ```html
    <input type="checkbox" v-model="isAgree"> 你是否同意上述条款
    <h1 v-if="isAgree">同意上述条款</h1>
    <h1 v-else>不同意上述条款</h1>
    ```


- v-show

  v-show的元素会被渲染在dom中, v-show只是切换css的display属性style="display: none;"

```html
<input type="checkbox" v-model="isAgree2"> 你是否同意上述条款
<h1 v-show="isAgree2">同意上述条款</h1>
<h1 v-show="!isAgree2">不同意上述条款</h1>
```
v-if会根据的返回值来决定是否动态的创建对应的子组件

使用建议: 如果频繁地切换使用v-show, 不频繁可以使用v-if

 示例,根据成绩显示评级,并且对超出范围的修改

```html
输入成绩1-100:<input type="text" v-model="score" @blur="checkScore">
<p>你当前成绩是{score}}</p>
<p v-if="score>=90">优秀</p>
<p v-else-if="score>=70">良好</p>
<p v-else-if="score>=60">及格</p>
<p v-else>不及格</p>
checkScore() {
// 大于100的,小于零更正
    if (this.score > 100) {
        this.score = 100
    } else if (this.score < 0) {
        this.score = 0
    }
}
```
- v-for循环
```html
<!--简单列表渲染-->
<ul>
  <li v-for="num in 3">{num}}</li>
</ul>
<hr>
<!--带索引(是数组的索引,并第几个列表)的列表渲染-->
<ul>
  <li v-for="(num,index) in 3">{index}}-{num}}</li>
</ul>
<hr>
<!--遍历对象的属性名和属性值,注意value在前面,key在后面-->
<ul>
  <li v-for="(value,name) in users[0]">{name}}--{value}}</li>
</ul>
<hr>
<!--将对象数组中每个对象对应一行字段,填入表格中
0	1	alice	23-->
<table width="200px" border="1" cellpadding="0" cellspacing="0">
  <tr v-for="(user,row) in users">
    <td>{row}}</td>
    <td v-for="value in user">{value}}</td>
  </tr>
</table>
users: [
{id: 1, name: "alice", age: 23},
{id: 2, name: "bob", age: 23},
{id: 3, name: "candy", age: 23},
]
```

过滤及格学生成绩表格


```html
 <!--展示成绩及格(score>60)的学生-->
<table border="1" width="300px" cellspacing="0" cellpadding="0">
    <tr v-for="(stu,index) in students" v-show="stu.score >= 60">
        <td>{index+1}}</td>
        <td v-for="(value) in stu">{value}}</td>
    </tr>
</table>
students: [
    {id: 1, name: "alice", age: 23, score: 50},
    {id: 2, name: "bob", age: 23, score: 60},
    {id: 3, name: "candy", age: 23, score: 70},
]
```


- vue组件

  - 定义

  	- 组件可以让页面复用

  	- 组件也是一个VUE实例, 包括data,methods,生命周期函数等

  	- 组件渲染需要html模板, 所以增加了template属性, 值就是html模板

  	- 对于全局组件, 任何的vue实例都可以直接在HTML中通过组件名称来使用组件

  	- data是一个函数,不再是一个对象, 这样每次引用组件都是独立的对象

  - 全局组件

    ```html
    <div id="app">
      <!--使用组件,两个counter互不干扰,都是不同组件实例-->
      <counter></counter>
      <counter></counter>
    </div>

    <div id="app2">
        <!--使用组件,多个vue示例可以共同使用counter组件,实现数据隔离/共享-->
        <counter></counter>
    </div>
    <script type="text/javascript">
        // 定义一个全局组件,名称为counter
        /// {} 表示组件相关的内容
        // template指定该组件的界面, 因为会引用到数据池的数据, 所以需要是模板字符串
        // 要把组件视为一个Vue实例,也有自己的数据池和methods
        // 对于组件,我们数据池的数据,是使用函数/方法返回(目的是为了保证每个组件的数据是独立的)
        // 这里就达成了是用template复用的效果
      // 全局组件属于所有vue实例, 因此可以在所有的vue中使用, (在同一个文件中)
        Vue.component("counter", {
            template: `<button @click="click">点击次数{count}}-组件化编程</button>`,
            // 不能用原来的方式来定义属性,要用return的方法
            data() {
                return {
                    count: 0
                }
            },
            methods: {
                click() {
                    this.count++
                }
            }
        })
        let vm = new Vue({
            el: "#app", // 把vue绑定id=app的元素上
            data: {}
        })
        let vm2 = new Vue({
            el: "#app2", // 把vue绑定id=app的元素上
            data: {}
        })
    </script>
    ```

  - 局部组件


```html
<div id="app">
  <!--使用组件-->
  <my_counter></my_counter>
</div>

<script type="text/javascript">
  const buttonCounter = Vue.component("counter", {
    template: `<button @click="click">点击次数{count}}-组件化编程</button>`,
    // 不能用原来的方式来定义属性,要用return的方法
    data() {
      return {
        count: 0
      }
    },
    methods: {
      click() {
        this.count++
      }
    }
  })
  let vm = new Vue({
    el: "#app", // 把vue绑定id=app的元素上
    data: {},
    components: {
      // 引入/注册某个组件my_counter
      // 这个my_counter就是一个组件, 是一个局部组件,他的范围在当前vue
      my_counter: buttonCounter
    }
  })
</script>
```
细节

组件的定义要放在new Vue的前面


### vue生命周期和监听函数(钩子函数)

![lifecycle_zh-CN.W0MNXI0C](../img/md-img/2025-03-26-project-01/lifecycle_zh-CN.W0MNXI0C.png)

- 定义

	- vue实例有一个完整的生命周期, 从开始创建,初始化数据,编译模板,挂载dom,渲染-更新-渲染,卸载等一列过程,称为Vue实例的生命周期

	- 钩子函数(监听函数)

		- Vue实例在完整的生命周期过程中,(比如设置数据监听,编译模板,将实例挂载到dom,在数据变化时更新dom等,也会运行叫钩子函数

		- 钩子函数的作用, 就是在某个阶段, 给程序员一个做某些处理的机会

- 钩子函数

	-  new Vue()

		- new 了一个 Vue 的实例对象，此时就会进入组件的创建过程。

	-  Init Events & Lifecycle

		- 初始化组件的事件和生命周期函数

	-  beforeCreate

		- 组件创建之后遇到的第一个生命周期函数，这个阶段 data 和 methods 以及 dom 结构都未 被初始化，也就是获取不到 data 的值，不能调用 methods 中的函数

	-  Init injections & reactivity

		- 这个阶段中, 正在初始化 data 和 methods 中的方法

	- created

		- 这个阶段组件的 data 和 methods 中的方法已初始化结束，可以访问，但是 dom 结构未 初始化，页面未渲染

		- 在这个阶段，经常会发起 Ajax 请求

	- beforeMount

		- 当模板在内存中编译完成，此时内存中的模板结构还未渲染至页面上，看不到真实的数据

	- Create vm.$el and replace ‘el’ with it

		- 把内存中渲染好的模板结构替换至真实的 dom 结构也就是页面上


	- mounted

		- 此时，页面渲染好，用户看到的是真实的页面数据， 生命周期创建阶段完毕，进入到了运 行中的阶段

	- beforeUpdate

		- 当执行此函数，数据池的数据新的，但是页面是旧的

	-  Virtual DOM re-render and patch

		- 根据最新的 data 数据，重新渲染内存中的模板结构，并把渲染好的模板结构，替换至页面 上

	- updated

		- 页面已经完成了更新，此时，data 数据和页面的数据都是新的

	- beforeDestroy

		- 当执行此函数时，组件即将被销毁，但是还没有真正开始销毁，此时组件的 data、methods,数据或方法 还可被调用

	- Teardown......

		- 注销组件和事件监听

	- destroyed

		- 组件已经完成了销毁

- 测试

  ```html
  <div id="app">
    <h1>{message}}</h1>
    <span id="num">{count}}</span>
    <button @click="count++">点赞👍🏻</button>
    <h2>{name}}, 有{count}}个赞👍🏻</h2>
  </div>

  <script type="text/javascript">
    let vm = new Vue({
      el: "#app", // 把vue绑定id=app的元素上
      data: {
        message: "Hello Vue",
        name: 'Alice',
        count: 0
      },
      methods: {
        show() {
          return this.name;
        },
        add() {
          this.count++
        }
      },
      beforeCreate() {
        console.log("===========beforeCreated============")
        console.log("数据池的数据是否加载?, ", this.name, this.count) // undefined
        // console.log("自定义方法是否加载?, ", this.show()) // no this.show is not a function
        console.log("用户页面dom是否加载? ", document.getElementById("num")) // yes <span id="num">{count}}</span>
        console.log("用户页面dom是完成渲染(解析{count}? ", document.getElementById("num").innerHTML) // no {count}}
      },
      created() {
        console.log("===========created============")
        console.log("数据池的数据是否加载?, ", this.name, this.count) // yes
        console.log("自定义方法是否加载?, ", this.show()) // yes
        console.log("用户页面dom是否加载? ", document.getElementById("num")) // yes
        console.log("用户页面dom是完成渲染(解析{count}? ", document.getElementById("num").innerHTML) // no {count}}
        // 可以发出ajax请求,接受返回数据, 再去更新data数据池的数据,编译内存模板
      },
      beforeMount() { //编译模板
        console.log("===========beforeMount============")
        console.log("数据池的数据是否加载?, ", this.name, this.count) // yes
        console.log("自定义方法是否加载?, ", this.show()) // yes
        console.log("用户页面dom是否加载? ", document.getElementById("num")) // yes
        console.log("用户页面dom是完成渲染(解析{count}? ", document.getElementById("num").innerHTML) // no {count}}
      },
      mounted() {// 挂载模板,至此渲染完成
        console.log("===========mounted============")
        console.log("数据池的数据是否加载?, ", this.name, this.count) // yes
        console.log("自定义方法是否加载?, ", this.show()) // yes
        console.log("用户页面dom是否加载? ", document.getElementById("num")) // yes
        console.log("用户页面dom是完成渲染(解析{count}? ", document.getElementById("num").innerHTML) // yes
      },
      beforeUpdate() {// 数据池数据更新前, 可以进行数据验证
        console.log("===========beforeUpdate============")
        console.log("数据池的数据是否加载?, ", this.name, this.count) // yes
        console.log("自定义方法是否加载?, ", this.show()) // yes
        console.log("用户页面dom是否加载? ", document.getElementById("num")) // yes <span id="num">1</span>
        console.log("用户页面dom是完成渲染(解析{count}? ", document.getElementById("num").innerHTML) // yes count=0 旧数据
      },
      updated() {// 数据池数据更新后
        console.log("===========updated============")
        console.log("数据池的数据是否加载?, ", this.name, this.count) // yes
        console.log("自定义方法是否加载?, ", this.show()) // yes
        console.log("用户页面dom是否加载? ", document.getElementById("num")) // yes <span id="num">1</span>
        console.log("用户页面dom是完成渲染(解析{count}? ", document.getElementById("num").innerHTML) // yes count=1 新数据
      },
    })
  ```


- vue-cli脚手架

	- 定义

		- 提高开发效率, 提供了规范,方便维护升级

	- 安装

		- 安装node10版本, 直接到官网用nvm安装

		- 卸载 vue-cli
npm uninstall vue-cli -g
配置淘宝镜像,并且安装cnpm
cnpm是国内的用来替代npm, npm经常无法直接访问,要安装对应版本的cnpm
npm install -g cnpm@7.1.1 --registry=https://registry.npmmirror.com
安装webpack和webpack-cli
cnpm install webpack@4.41.2 webpack-cli -D
安装vue-cli
cnpm install -g @vue/cli@4.0.3
cnpm install -g @vue/cli-init

#### 查看版本

vue -V

#### 创建vue项目

vue init webpack vue_project_name

#### 运行

npm run dev

#### 在Intelij idea中配置

run type 选择npm, 选择package.json

#### 文件目录介绍

	访问流程
	index.html的#app节点
	main.js 创建一个VUE实例, el是#app,表示挂载到index.html的#app上
	main.js引入了router/index.js中配置了,访问路由表, 每个uri对应一个组件
	main.js引入了组件App.vue
	app.vue
	 项目的主体组件, 在这里引入了<router-view/>标签可以把路由到组件在这里显示
	细节
	  @符号代表src目录
	  http://localhost:8080/#/
	  /#/是根目录
	  在每个vue组件中可以写脚本和样式

## Axios

### 是一个基于promise的HTTP库

通常和vue一起使用,实现ajax操作, 底层还是ajax, 作用就像jquery的$.get,$.ajax,$.getJson差不多

### 安装适配vue2的axios

- 安装
npm install --save axios@0 vue-axios@2

- main.js中使用插件

  ```javascript
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  Vue.use(VueAxios, axios)
  ```

- 参考

	- https://www.cnblogs.com/liangkuan/p/17481228.html

- 关于跨域问题

  - 有很多解决方案,这里选择关闭浏览器的跨域策略(mac)

    ```shell
    open -n -a Google\ Chrome --args --disable-web-security --user-data-dir=/tmp/chrome
    ```

  - springmvc中,在Controller上@CrossOrigin注解

  - 在前端设置代理vue.config.js

  ```javascript
  module.exports = {
    devServer: {
      port: 8888, //启动端口
      proxy: {  //设置代理
        '/api': {  //匹配访问路径中含有 '/api' 的路径
          target: 'http://localhost/furn_ssm', // 测试地址、目标地址
          changeOrigin: true,   // 是否设置同源: 是
          pathRewrite: {  // 重写请求路径
            '/api': ''
          }
        }
      }
    }
  }
  ```


### vue3

- 安装axios, 在工程目录和package.js同一个目录下
npm install axios

- 使用, 包装成工具类request.js/含有拦截器

```javascript
import axios from "axios";

const request = axios.create({
  timeout: 5000
})

// request拦截器的处理
// 拦截器的作用
// 1.可以对请求做统一的处理, 加请求头
// 2.比如统一加token, content-type
request.interceptors.request.use(config => {
  config.headers['content-type'] = 'application/json;charset=utf-8'
  return config;
}, error => {
  return Promise.reject(error)
})

// 配置response拦截器
// 可以在调用接口响应后,统一处理返回结果
request.interceptors.response.use(
  response => {
    let res = response.data
    // 如果是文件,就返回
    if (response.config.responseType === 'blob') {
      return res
    }
    //  如果是String就转为json对象
    if (typeof res === "string") {
      res = res ? JSON.parse(res) : res
    }
    return res;
  },
  error=>{
    console.log("error",error)
    return Promise.reject(error);
  }
)

// 导出request对象,在其他文件可以使用
export default request
```


### 分页时设置请求参数

```javascript
//  获取分页数据
getPageByName(pn) {
  request.get('/api/furn/getPageByName', {
    // 设置请求参数
    params: {
      pageNum: pn,
      pageSize: this.pageSize,
      name: this.search
    }
  }).then(res => {
    console.log(res)
    this.furnList = res.data.data.furnList
    this.totalRows = res.data.data.totalRows
  })
}
```


### 设置请求头, 可以在拦截器中设置, 也可以在发送时设置

```javascript
request.post("/api/furn/",
             this.formData,
             {
  headers: {
    "Content-Type": 'application/json',
  },
  responseType: 'json',
}
            ).then(res => {
  // 刷新数据
  this.getPageByName(this.pageNum)
  console.log("增加成功:", res.data)
});
```


### 使用案例

```javascript
import axios from "axios";
export default {
  name: "TestAxios",
  data() {
    return {
      userList: []
    }
  },
  methods: {
    list() {
      axios.get('http://localhost/jiaju_mall/response.data.json').then(
        (response) => {
          console.log("第一次请求", response.data);
          this.userList = response.data.data.items
          // 发送多次请求一定要return
          return axios.get('http://localhost/jiaju_mall/response.data.json').then(
            (response => {
              console.log("第二次请求", response.data);
            })
          )
        }
      ).catch((error) => {
        console.log("错误: ", error)
      })
    },
  },
  // 在创建完成时, 加载数据
  created() {
    this.list()
  }
}
```


### axios请求配置

- https://www.axios-http.cn/docs/req_config

- 响应类型

```javascript
// `responseType` 表示浏览器将要响应的数据类型
// 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
// 浏览器专属：'blob'
responseType: 'json', // 默认值
```


## vue3

### 安装/创建工程

- 安装node14
nvm install 14
安装vue-cli
npm install -g @vue/cli
创建front项目
vue create front
选择vue3, vuex,router
运行
npm run serve

- vue-cli只用安装一次,但是element-plus需要每次安装下, 安装完使用 npm install下

### 打开项目时会打开默认浏览器

- 在package.json中

  ```json
  "serve": "vue-cli-service serve --open"
  ```

### 路由机制

- index.html

	- 项目的首页面

	- 编译的相关的vue文件,通过index.html显示(挂载到id=app的div上)

- App.vue

	- App.vue页面可以用于布局界面

	- \<router-view/>就是路由指令

	- 会把路由到的页面内容,展示到\<router-view/> 位置

### 文件目录结构

- assets

	- 存放静态资源,图片,css,js等

- components

	- 存放组件,在vue中组件可以表示页面

- router/index.js

	- 用于配置路由

- store/index.js

	- 用于存放数据
比如登录后可以把数据放在这里,或者页面跳转/路由时, 存放要传递的数据/参数

- views

	- 视图:类似于传统前端的页面就, 在vue中,可以当做组件使用, 引用components组件来完成页面

- package.json

	- 说明前端项目包依赖关系, 类似于maven中的pom.xml

- main.js

	- 用于引入资源(css/组件/插件)等, 同时也是创建APP挂载#app, 引入./router ./store等资源的地方

### 配置vue服务端口

- 修改vue.config.js

  ```javascript
  module.exports = {
    devServer:{
      port:8848
    }
  }
  ```

  - 如果端口被占用的话, 端口会递增+`1

### 配置代理

vue.config.js

```javascript
module.exports = {
  devServer: {
    port: 8888, //启动端口
    proxy: {  //设置代理
      '/api': {  //匹配访问路径中含有 '/api' 的路径
        target: 'http://localhost/furn_ssm', // 测试地址、目标地址
        changeOrigin: true,   // 是否设置同源: 是
        pathRewrite: {  // 重写请求路径
          '/api': ''
        }
      }
    }
  }
}
```


## element-ui

### elemetUI2对应vue2

- ElementUI是组件库网站, 可以快速构建网页

- 版本2.12.0

- 具体参考文档

### elementPlus

- element plus = elementUI for Vue3
就是vue3必须用plus

- 安装

	- npm install element-plus --save

- 导包

  - main.js

  ```javascript
  createApp(App).use(store).use(router)
    .use(ElementPlus,{local: zhCn})
    .mount('#app')
  ```

- 数据校验

	- 细分主题 1

## bootsrap

## NodeJS

### npm

- 类似mavan的包管理工具
使用国内版本cnpm,国外的网络慢

- 常用命令
```shell
#卸载 vue-cli
npm uninstall vue-cli -g
#配置淘宝镜像,并且安装cnpm
#cnpm是国内的用来替代npm, npm经常无法直接访问,要安装对应版本的cnpm
npm install -g cnpm@7.1.1 --registry=https://registry.npmmirror.com
#安装webpack和webpack-cli
cnpm install webpack@4.41.2 webpack-cli -D
#安装vue-cli
cnpm install -g @vue/cli@4.0.3
cnpm install -g @vue/cli-init
```


#### 查看版本

vue -V

#### 创建vue项目

vue init webpack vue_project_name

#### 运行

npm run dev

#### 在Intelij idea中配置
