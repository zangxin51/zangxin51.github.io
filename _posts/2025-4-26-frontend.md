---
layout:     post
title:      "前端基础学习笔记"
subtitle:   ""
date:       2025-04-26 10:25:00
author:     "zangxin"
header-img: "img/home-bg.jpg"
catalog: true
category: frontend
tags:
---

# 前端基础学习笔记

## HTML

HTML（HyperText Markup Language）是用于描述网页结构的标记语言。页面可以包含文本、图片、音视频、表格、表单和链接等内容。

### 字符实体

| 显示内容 | 实体 |
| --- | --- |
| 空格 | `&nbsp;` |
| `<` | `&lt;` |
| `>` | `&gt;` |
| `&` | `&amp;` |

### 常用标签

| 标签 | 用途 | 常用属性或说明 |
| --- | --- | --- |
| `<h1>`～`<h6>` | 标题 | 数字越小，标题级别越高 |
| `<p>` | 段落 | 块级元素 |
| `<a>` | 超链接 | `href`、`target="_self"`、`target="_blank"` |
| `<img>` | 图片 | `src`、`width`、`height`、`alt` |
| `<ul>` / `<ol>` | 无序/有序列表 | 列表项使用 `<li>` |
| `<div>` | 块级布局容器 | 通常独占一行 |
| `<span>` | 行内容器 | 通常用于局部文本 |
| `<hr>` | 水平分隔线 | 语义上表示主题切换 |

### 表格

表格由 `<table>`、行 `<tr>`、表头单元格 `<th>` 和普通单元格 `<td>` 组成。合并单元格时使用 `colspan` 或 `rowspan`。

| 属性 | 作用 |
| --- | --- |
| `border` | 边框宽度 |
| `cellspacing` | 单元格间距 |
| `cellpadding` | 单元格内边距 |
| `width` / `height` | 宽度和高度 |

### 表单

`<form>` 的 `action` 指定提交地址，`method` 指定请求方式。

| 请求方式 | 特点 |
| --- | --- |
| GET | 参数拼接在 URL 后，长度受浏览器和服务器限制，不适合传输敏感信息 |
| POST | 参数放在请求体中，不直接显示在 URL 中，更适合提交表单数据 |

常用表单控件：

| 控件 | 写法或用途 |
| --- | --- |
| 单行文本 | `<input type="text">` |
| 密码 | `<input type="password">` |
| 单选框 | `<input type="radio">` |
| 复选框 | `<input type="checkbox">` |
| 文件上传 | `<input type="file">` |
| 隐藏域 | `<input type="hidden">` |
| 下拉框 | `<select>` 与 `<option>` |
| 多行文本 | `<textarea>` |
| 提交/重置 | `<input type="submit">` / `<input type="reset">` |

```html
<form method="post" action="#">
  用户名：<input type="text" name="username"><br>
  密码：<input type="password" name="password"><br>

  性别：
  <label><input type="radio" name="gender" value="0" checked> 男</label>
  <label><input type="radio" name="gender" value="1"> 女</label><br>

  爱好：
  <select name="hobby">
    <option value="1" selected>吃饭</option>
    <option value="2">锻炼</option>
    <option value="3">编程</option>
  </select><br>

  自我介绍：<textarea name="description"></textarea><br>
  头像：<input type="file" name="photo"><br>

  <input type="submit" value="提交">
  <input type="reset" value="重置">
</form>
```

## CSS

CSS（Cascading Style Sheets）用于控制页面样式，将内容与表现分离，便于统一维护。

### 引入方式

1. 行内样式：直接写在元素的 `style` 属性中。
2. 内部样式：在 `<head>` 中使用 `<style>` 标签。
3. 外部样式：在独立的 `.css` 文件中定义，再通过 `<link>` 引入。

```html
<link rel="stylesheet" href="css/main.css">
```

### 基本语法

```css
选择器 {
  属性: 值;
  属性: 值;
}
```

### 常用选择器

| 类型 | 示例 | 说明 |
| --- | --- | --- |
| 元素选择器 | `div` | 选择所有同名元素 |
| ID 选择器 | `#app` | 选择指定 ID 的元素 |
| 类选择器 | `.active` | 选择指定 class 的元素 |
| 并集选择器 | `div, span` | 同时匹配多个选择器 |
| 交集选择器 | `div.active` | 同时满足多个条件 |

选择器优先级通常为：行内样式 > ID 选择器 > 类选择器 > 元素选择器。

### 常用声明

| 属性 | 作用 |
| --- | --- |
| `width` / `height` | 宽度和高度 |
| `background` | 背景 |
| `color` | 文字颜色 |
| `border` | 边框 |
| `font-family` | 字体 |
| `font-size` | 字号 |
| `font-weight` | 字重 |
| `margin` | 外边距 |
| `text-decoration` | 文本装饰 |
| `list-style` | 列表样式 |

```css
table,
th,
td {
  width: 50%;
  border: 1px solid #000;
  border-collapse: collapse;
}

table {
  margin: 0 auto;
}

a {
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}
```

## JavaScript

JavaScript 是一种动态、弱类型的脚本语言，主要用于实现网页交互。

### 引入方式

- 行内脚本。
- 在 HTML 中使用 `<script>` 标签。
- 引入独立的 `.js` 文件。

```html
<script src="js/main.js"></script>
```

### 数据类型

使用 `typeof` 可以查看变量类型。

| 类型 | 示例或说明 |
| --- | --- |
| `number` | 数值 |
| `string` | 字符串 |
| `boolean` | `true` / `false` |
| `object` | 对象、数组以及 `null` |
| `function` | 函数 |
| `undefined` | 变量已声明但未赋值 |
| `NaN` | 非数值结果 |

### 运算符

| 类型 | 说明 |
| --- | --- |
| 算术运算符 | `+`、`-`、`*`、`/`、`%` |
| 赋值运算符 | `=`、`+=`、`-=` 等 |
| 比较运算符 | `==` 比较值，`===` 同时比较值和类型 |
| 逻辑运算符 | `&&`、`||`、`!`，支持短路计算 |
| 三元运算符 | `条件 ? 值1 : 值2` |

`0`、`null`、`undefined`、`NaN` 和空字符串在布尔判断中会被当作 `false`。

### 数组

数组容量可动态变化，也可以保存不同类型的元素。

```javascript
const values = [1, "hello", true];

for (let index = 0; index < values.length; index++) {
  console.log(values[index]);
}
```

### 函数

```javascript
function add(left, right) {
  return left + right;
}

const multiply = function (left, right) {
  return left * right;
};
```

JavaScript 函数没有传统意义上的重载。实参数量可以与形参数量不同，也可以通过 `arguments` 获取调用时传入的参数。

### 对象

```javascript
const user = {
  name: "Tom",
  age: 23,
  sayHello() {
    console.log(`Hello, ${this.name}`);
  }
};

console.log(user.name);
user.sayHello();
```

### 事件

事件用于响应用户操作或页面状态变化，可以在 HTML 中静态绑定，也可以通过 JavaScript 动态绑定。

| 事件 | 触发时机 |
| --- | --- |
| `load` | 页面资源加载完成 |
| `click` | 鼠标点击 |
| `blur` | 元素失去焦点 |
| `change` | 表单内容改变 |
| `submit` | 表单提交 |

```javascript
window.addEventListener("load", () => {
  const button = document.getElementById("submit");

  button.addEventListener("click", () => {
    console.log("button clicked");
  });
});
```

### 正则表达式

```javascript
const emailPattern = /^[\w-]+@([a-zA-Z]+\.)+[a-zA-Z]+$/;
console.log(emailPattern.test("user@example.com"));
```

### DOM

DOM（Document Object Model）把 HTML 文档转换成可操作的对象树。

#### 查找与创建节点

| 方法 | 作用 |
| --- | --- |
| `getElementById()` | 根据 ID 查找元素 |
| `getElementsByName()` | 根据 name 查找元素 |
| `getElementsByClassName()` | 根据 class 查找元素 |
| `getElementsByTagName()` | 根据标签名查找元素 |
| `createElement()` | 创建元素 |
| `appendChild()` | 添加子节点 |

#### 常用属性

| 属性 | 作用 |
| --- | --- |
| `childNodes` | 所有子节点 |
| `firstChild` | 第一个子节点 |
| `parentElement` | 父元素 |
| `previousSibling` / `nextSibling` | 相邻节点 |
| `value` | 表单控件的值 |
| `className` | 元素的 class |
| `innerHTML` | 读取或设置 HTML 内容 |
| `innerText` | 读取或设置纯文本内容 |

## JSON

JSON（JavaScript Object Notation）是一种轻量级文本数据交换格式，与具体编程语言无关，常用于前后端通信。

### 基本格式

JSON 由键值对组成，键必须使用双引号。值可以是字符串、数字、对象、数组、布尔值或 `null`。

```javascript
const data = {
  "name": "Tom",
  "age": 23,
  "skills": ["JavaScript", "Vue"],
  "active": true
};
```

### 访问与遍历

```javascript
console.log(data.name);
console.log(data["age"]);

for (const key in data) {
  console.log(key, data[key]);
}
```

### 对象与字符串互转

| 方法 | 作用 |
| --- | --- |
| `JSON.stringify(value)` | JavaScript 对象转 JSON 字符串 |
| `JSON.parse(text)` | JSON 字符串转 JavaScript 对象 |

```javascript
const jsonText = JSON.stringify(data);
const parsedData = JSON.parse(jsonText);
```

## jQuery

jQuery 是一个 JavaScript 库，封装了 DOM、事件、样式和 Ajax 等常用操作，核心理念是 “Write Less, Do More”。

### 对象与事件

`$()` 返回 jQuery 对象。项目中通常使用 `$` 前缀标识 jQuery 对象，例如 `$button`。

```javascript
$(function () {
  const $button = $("#submit");

  $button.click(function () {
    alert("提交");
  });
});
```

DOM 对象与 jQuery 对象可以互相转换：

```javascript
const button = document.getElementById("submit");
const $button = $(button);
const originalButton = $button[0];
```

### 常用方法

| 方法 | 作用 |
| --- | --- |
| `html()` | 读取或设置 HTML 内容 |
| `text()` | 读取或设置文本内容 |
| `val()` | 读取或设置表单值 |
| `css()` | 读取或设置样式 |
| `attr()` / `removeAttr()` | 读取、设置或删除属性 |
| `addClass()` / `removeClass()` | 添加或删除 class |
| `toggleClass()` | 切换 class |
| `hasClass()` | 判断 class 是否存在 |
| `each()` | 遍历 jQuery 集合 |

```javascript
$("input[type='text']").val("足球");

$("input:hidden").each(function () {
  console.log(this.value);
});
```

### 选择器

#### 基本与层级选择器

| 类型 | 示例 | 说明 |
| --- | --- | --- |
| ID | `$("#app")` | 根据 ID 选择 |
| 元素 | `$("div")` | 根据标签名选择 |
| class | `$(".active")` | 根据 class 选择 |
| 通用 | $("*") | 选择全部元素 |
| 并集 | `$("div, #app, .active")` | 匹配多个选择器 |
| 后代 | `$("form input")` | 匹配所有后代 |
| 子元素 | `$("form > input")` | 匹配直接子元素 |
| 相邻兄弟 | `$("h2 + p")` | 匹配紧邻的下一个兄弟 |
| 后续兄弟 | `$("h2 ~ p")` | 匹配后续所有兄弟 |

#### 过滤选择器

| 选择器 | 作用 |
| --- | --- |
| `:first` / `:last` | 第一个/最后一个元素 |
| `:not(selector)` | 排除匹配项 |
| `:even` / `:odd` | 偶数/奇数索引 |
| `:eq(index)` | 指定索引 |
| `:contains(text)` | 包含指定文本 |
| `:empty` / `:parent` | 空元素/包含内容的元素 |
| `:hidden` / `:visible` | 隐藏/可见元素 |
| `:first-child` / `:last-child` | 第一个/最后一个子元素 |
| `:nth-child(n)` | 指定位置的子元素 |

#### 属性与表单选择器

| 选择器 | 作用 |
| --- | --- |
| `[name]` | 含有指定属性 |
| `[name='user']` | 属性等于指定值 |
| `[name^='user']` | 属性以指定值开头 |
| `[name$='name']` | 属性以指定值结尾 |
| `[name*='man']` | 属性包含指定值 |
| `:enabled` / `:disabled` | 可用/不可用控件 |
| `:checked` / `:selected` | 已选中的控件/选项 |
| `:text` / `:password` | 文本框/密码框 |
| `:radio` / `:checkbox` | 单选框/复选框 |
| `:submit` / `:reset` | 提交/重置按钮 |
| `:file` | 文件控件 |

### DOM 操作

#### 插入与删除

| 方法 | 作用 |
| --- | --- |
| `append()` / `appendTo()` | 在元素内部末尾插入 |
| `prepend()` / `prependTo()` | 在元素内部开头插入 |
| `after()` / `insertAfter()` | 在元素后面插入兄弟节点 |
| `before()` / `insertBefore()` | 在元素前面插入兄弟节点 |
| `remove()` | 删除元素及其后代 |
| `empty()` | 清空后代，保留元素本身 |
| `clone(true)` | 克隆元素并复制事件 |
| `replaceWith()` / `replaceAll()` | 替换节点 |

#### 全选、全不选与反选

```javascript
$("#select-all").click(function () {
  $("input[name='hobby']").prop("checked", true);
});

$("#clear-all").click(function () {
  $("input[name='hobby']").prop("checked", false);
});

$("#invert").click(function () {
  $("input[name='hobby']").each(function () {
    this.checked = !this.checked;
  });
});
```

#### 节点遍历

| 方法 | 作用 |
| --- | --- |
| `children()` | 直接子元素 |
| `next()` / `nextAll()` | 后续兄弟元素 |
| `prev()` / `prevAll()` | 前置兄弟元素 |
| `siblings()` | 全部兄弟元素 |
| `eq(index)` | 指定索引的元素 |
| `filter(selector)` | 按选择器过滤 |

### 页面加载

`window.onload` 会等待页面资源（包括图片）加载完成，且直接赋值时通常只能保留一个处理函数。`$(document).ready()` 在 DOM 结构构建完成后即可执行，可以注册多个处理函数，常简写为 `$()`。

```javascript
$(function () {
  console.log("DOM ready");
});
```

## ES6 新特性

ECMAScript 2015（ES6）是 JavaScript 的重要版本，引入了块级作用域、解构、模板字符串、箭头函数、Promise 和模块化等常用语法。

### let 与 const

| 关键字 | 说明 |
| --- | --- |
| `let` | 块级作用域；同一作用域不能重复声明；存在暂时性死区 |
| `const` | 声明时必须赋值；绑定关系不能重新赋值 |
| `var` | 函数作用域；允许重复声明；声明会提升 |

```javascript
if (true) {
  let message = "block scope";
  const version = "ES6";
  console.log(message, version);
}
```

### 解构赋值
解构赋值是对赋值运算符的扩展，可以从数组或对象中按结构提取数据。

是一种针对数组或者对象进行模式匹配，然后对其中的变量进行赋值

主要有两种形式: 数组解构和对象解构

数组解构

```javascript
arr = [1, 3, 5]
let [a, b, c] = arr
let [num1, num2, num3] = [1, 2, 3]
```

​  对象解构(属性名要相同)

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

### 模板字符串
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

### 对象与方法简写

```javascript
  let name = "jack"
  let age = "23"
  // 传统写法
  let user = {name: name, age: age}
  // es6 表示对象的属性名是name和age, 值是已经声明的变量的name和age的值
  let user = {name, age}
```

#### 方法简写
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

### 展开运算符
普通赋值复制的是对象引用：

```javascript
    let cat = {name: "多啦A梦", age: 2}
    let cat2 = cat;
    cat2.name = 'tom喵';
    console.log(cat == cat2) // true
```

#### 对象浅拷贝

```javascript
    let cat2 = {...cat}
```

#### 合并对象

```javascript
  let cat = {name: "多啦A梦", age: 2}
  let tool = {tool_name: "任意门", color: "black"}
  let cat_tool = {...cat, ...tool}
  {"name": "多啦A梦", "age": 2, "tool_name": "任意门", "color": "black"}
```

### 箭头函数

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

### Promise

Promise 用于描述异步操作的最终状态，可以减少多层回调嵌套，并通过调用链统一处理结果和异常。

```javascript
function get(url, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      data,
      success(result) {
        resolve(result);
      },
      error(error) {
        reject(error);
      }
    });
  });
}
```

#### Promise 调用链

`then()` 返回新的 Promise，因此可以连续执行多个异步步骤；任意步骤失败时，由链尾的 `catch()` 统一处理。

```javascript
get("data/user.json")
  .then((user) => get(`data/userDetail_${user.id}.json`))
  .then((detail) => get(`data/userDetail_${detail.friendId}.json`))
  .then((friend) => {
    console.log(friend);
  })
  .catch((error) => {
    console.error("请求失败", error);
  });
```

### 模块化编程

模块化可以隔离作用域、减少命名冲突，并明确文件之间的依赖关系。

#### CommonJS

CommonJS 常用于传统 Node.js 项目，通过 `module.exports` 导出，通过 `require()` 导入。

```javascript
// math.js
function sum(left, right) {
  return left + right;
}

module.exports = {
  sum,
  PI: 3.14
};
```

```javascript
// app.js
const math = require("./math");
console.log(math.sum(10, 20));
```

也可以使用解构只导入需要的成员：

```javascript
const { sum } = require("./math");
```

#### ES Modules

ES Modules 使用 `export` 和 `import`，是现代浏览器和前端工程的标准模块方案。

```javascript
// math.js
export const sum = (left, right) => left + right;
export const PI = 3.14;
```

```javascript
// app.js
import { PI, sum } from "./math.js";
console.log(sum(10, 20), PI);
```

默认导出在一个模块中只能出现一次，导入时可以自定义名称：

```javascript
// calculator.js
export default {
  sum: (left, right) => left + right,
  multiply: (left, right) => left * right
};
```

```javascript
import calculator from "./calculator.js";
console.log(calculator.multiply(2, 3));
```

## AJAX

AJAX 的全称是 Asynchronous JavaScript and XML。它允许浏览器异步发送 HTTP 请求，并在不刷新整个页面的情况下更新局部内容。

### 相比传统表单提交

- 可以只发送必要的数据。
- 请求期间页面仍可继续交互。
- 可以根据响应结果局部更新 DOM。

### XMLHttpRequest 通信过程

1. 创建 `XMLHttpRequest` 对象。
2. 配置请求方法、地址和异步回调。
3. 发送请求并等待状态变化。
4. 请求完成后解析响应并更新页面。

```javascript
$(function () {
  const $username = $("input[name='username']");

  $username.blur(function () {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        $("#msg").text(result.msg);
      }
    };

    const username = encodeURIComponent($username.val());
    xhr.open("GET", `/checkUsrServlet?username=${username}`, true);
    xhr.send();
  });
});
```

### readyState

| 值 | 状态 |
| --- | --- |
| `0` | 请求未初始化 |
| `1` | 已建立服务器连接 |
| `2` | 请求已接收 |
| `3` | 正在处理请求 |
| `4` | 请求完成，响应已就绪 |

常见 HTTP 状态码包括 `200 OK`、`403 Forbidden` 和 `404 Not Found`。

### jQuery Ajax

`$.ajax()` 是 jQuery 的通用异步请求方法。

| 参数 | 作用 |
| --- | --- |
| `url` | 请求地址 |
| `type` | 请求方法，如 GET、POST |
| `data` | 发送给服务端的数据 |
| `dataType` | 预期的响应数据类型 |
| `contentType` | 请求体的数据格式 |
| `success` | 请求成功时的回调 |
| `error` | 请求失败时的回调 |
| `async` | 是否异步，默认为 `true` |

```javascript
$.ajax({
  url: "/checkUsrServlet",
  type: "POST",
  data: {
    username: $("input[name='username']").val()
  },
  dataType: "json",
  success(result) {
    $("#msg").text(result.msg);
  },
  error(error) {
    console.error("请求失败", error);
  }
});
```

`$.get()`、`$.post()` 和 `$.getJSON()` 都是基于 `$.ajax()` 的快捷方法。

## Vue

### 介绍

1. Vue (读音 /vjuː/，类似于 view) 是一个前端框架, 易于构建用户界面

2. Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或项目整合
3. 支持和其它类库结合使用
4. 开发复杂的单页应用非常方便
5. 响应式的编程

- 声明式渲染：Vue 基于标准 HTML 拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系。
- 响应性：Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。

### MVVM 模式

- 修改数据,dom会变化(domListener),dom变化也能影响到数据

### Vue 2

#### 快速开始
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

`el` 是 `element` 的简写,表示绑定哪个元素

#### 单向数据绑定
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
#### 双向数据绑定
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
#### 事件绑定
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
#### 事件修饰符
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
- v-on:submit.prevent 的使用, 如果没有输入名字，控制台输出 "请输入名 字"，否则输出 "提交表单"

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

#### 条件渲染
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
#### 列表渲染
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

#### 组件
- 定义
- 组件可以让页面复用
- 组件也是一个VUE实例, 包括data,methods,生命周期函数等
- 组件渲染需要html模板, 所以增加了template属性, 值就是html模板
- 对于全局组件, 任何的vue实例都可以直接在HTML中通过组件名称来使用组件
- data是一个函数,不再是一个对象, 这样每次引用组件都是独立的对象
##### 全局组件

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

##### 局部组件

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

### Vue 生命周期与钩子函数

![Vue 生命周期](/img/md-img/2025-03-26-project-01/lifecycle_zh-CN.W0MNXI0C.png)

Vue 实例会依次经历创建、挂载、更新和销毁。生命周期钩子允许开发者在指定阶段执行初始化、请求数据、访问 DOM 或清理资源等操作。

| 阶段 | 钩子 | 状态与常见用途 |
| --- | --- | --- |
| 创建前 | `beforeCreate` | `data`、`methods` 和 DOM 尚未初始化 |
| 创建后 | `created` | 可访问数据和方法，DOM 尚未挂载；常用于发起 Ajax 请求 |
| 挂载前 | `beforeMount` | 模板已编译，但还未渲染到页面 |
| 挂载后 | `mounted` | 页面已渲染，可以访问真实 DOM |
| 更新前 | `beforeUpdate` | 数据已变化，页面仍是旧状态 |
| 更新后 | `updated` | 数据与页面都已完成更新 |
| 销毁前 | `beforeDestroy` | 实例仍可使用，适合开始清理资源 |
| 销毁后 | `destroyed` | 组件、事件监听等已完成销毁 |

#### 生命周期示例

### Vue CLI 2 脚手架

脚手架提供统一的工程目录和构建流程，可以提高开发、维护和升级效率。下面的命令对应旧版 Vue CLI 2 项目。

#### 安装

```bash
# 卸载旧版 vue-cli
npm uninstall vue-cli -g

# 安装 cnpm、webpack 和 Vue CLI
npm install -g cnpm@7.1.1 --registry=https://registry.npmmirror.com
cnpm install webpack@4.41.2 webpack-cli -D
cnpm install -g @vue/cli@4.0.3
cnpm install -g @vue/cli-init
```

#### 创建与运行项目

```bash
vue -V
vue init webpack vue_project_name
npm run dev
```

在 IntelliJ IDEA 中运行时，Run Configuration 的类型选择 `npm`，并指定项目中的 `package.json`。

#### 项目访问流程

| 文件 | 作用 |
| --- | --- |
| `index.html` | 提供 `#app` 挂载节点 |
| `main.js` | 创建 Vue 实例，引入路由和根组件 |
| `router/index.js` | 配置 URI 与组件的映射 |
| `App.vue` | 项目根组件，通过 `<router-view>` 展示路由组件 |

`@` 通常表示 `src` 目录；开发地址一般为 `http://localhost:8080/#/`。

## Axios

Axios 是一个基于 Promise 的 HTTP 库，常与 Vue 配合完成 Ajax 请求。

### Vue 2 安装

```bash
npm install --save axios@0 vue-axios@2
```

```javascript
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);
```

### 跨域处理

开发中优先使用以下方案：

1. 后端配置允许的跨域来源，例如 Spring MVC 的 `@CrossOrigin`。
2. 在 `vue.config.js` 中配置开发代理。
3. 仅在本地调试时临时关闭浏览器同源策略，不应用于日常浏览或生产环境。

```javascript
module.exports = {
  devServer: {
    port: 8888,
    proxy: {
      "/api": {
        target: "http://localhost/furn_ssm",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
```

### Vue 3 安装

```bash
npm install axios
```

### 封装请求实例

可以在 `request.js` 中统一配置超时、请求头和响应处理。

```javascript
import axios from "axios";

const request = axios.create({
  timeout: 5000
});

request.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=utf-8";
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => {
    let result = response.data;

    if (response.config.responseType === "blob") {
      return result;
    }

    if (typeof result === "string") {
      result = result ? JSON.parse(result) : result;
    }

    return result;
  },
  (error) => Promise.reject(error)
);

export default request;
```

### GET 查询参数

```javascript
request.get("/api/furn/getPageByName", {
  params: {
    pageNum: this.pageNum,
    pageSize: this.pageSize,
    name: this.search
  }
}).then((response) => {
  this.furnList = response.data.data.furnList;
  this.totalRows = response.data.data.totalRows;
});
```

### POST 请求头

请求头既可以在拦截器中统一设置，也可以在单次请求中覆盖。

```javascript
request.post("/api/furn", this.formData, {
  headers: {
    "Content-Type": "application/json"
  },
  responseType: "json"
});
```

`responseType` 常用值包括 `arraybuffer`、`document`、`json`、`text`、`stream`，浏览器还支持 `blob`。更多选项参见 [Axios 请求配置](https://www.axios-http.cn/docs/req_config)。

## Vue 3

### 创建与运行项目

```bash
nvm install 14
npm install -g @vue/cli
vue create front
cd front
npm run serve
```

创建项目时可按需选择 Vue 3、Vuex 和 Vue Router。Vue CLI 只需要全局安装一次，项目依赖需要在各项目目录中安装。

### 自动打开浏览器

在 `package.json` 中为启动命令添加 `--open`：

```json
{
  "scripts": {
    "serve": "vue-cli-service serve --open"
  }
}
```

### 路由机制

| 文件 | 作用 |
| --- | --- |
| `index.html` | 提供应用挂载节点 |
| `App.vue` | 根组件和页面整体布局 |
| `<router-view>` | 展示当前路由匹配的组件 |
| `router/index.js` | 配置路由表 |

### 目录结构

| 路径 | 作用 |
| --- | --- |
| `assets/` | 图片、CSS、JavaScript 等静态资源 |
| `components/` | 可复用组件 |
| `views/` | 页面级组件 |
| `router/index.js` | 路由配置 |
| `store/index.js` | 跨组件共享状态 |
| `main.js` | 引入资源、插件、路由和状态管理，并挂载应用 |
| `package.json` | 项目依赖与 npm 脚本 |

### 开发服务器配置

在 `vue.config.js` 中设置端口和代理：

```javascript
module.exports = {
  devServer: {
    port: 8848,
    proxy: {
      "/api": {
        target: "http://localhost/furn_ssm",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
```

## Element UI

Element UI 是面向 Vue 2 的组件库；Vue 3 项目应使用 Element Plus。

### Element UI 2（Vue 2）

笔记使用的版本为 `2.12.0`，具体组件和属性以对应版本文档为准。

### Element Plus（Vue 3）

```bash
npm install element-plus --save
```

在 `main.js` 中注册：

```javascript
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
```

## Bootstrap

Bootstrap 是一套响应式前端 UI 框架，提供栅格系统、常用组件和工具类。

## Node.js

### npm

npm 是 Node.js 的包管理工具，作用类似 Java 生态中的 Maven。国内网络环境下可以配置镜像源，通常无需额外安装 cnpm。

### 常用命令

```bash
# 查看版本
node --version
npm --version

# 配置 npm 镜像
npm config set registry https://registry.npmmirror.com

# 安装项目依赖
npm install

# 安装开发依赖
npm install webpack webpack-cli --save-dev

# 全局安装 Vue CLI
npm install -g @vue/cli
```

### 旧版 Vue CLI 2 命令

```bash
npm uninstall vue-cli -g
npm install -g @vue/cli-init
vue -V
vue init webpack vue_project_name
npm run dev
```

在 IntelliJ IDEA 中运行 npm 脚本时，Run Configuration 类型选择 `npm`，并指定项目的 `package.json`。
