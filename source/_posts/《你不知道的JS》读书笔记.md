---
title: 《你不知道的JS》读书笔记
date: 2021-02-04 10:59:19
layout: 
  - tags
  - categories
categories:
  - FontEnd
  - JS
tags:
  - JavaScript
  - notes
---

## 作用域和闭包

### 作用域

#### 什么是作用域

作用域是一套规则， 用于确定在何处以及如何查找变量（标识符）。 如果查找的目的是对变量进行赋值， 那么就会使用 LHS 查询； 如果目的是获取变量的值， 就会使用 RHS 查询。赋值操作符会导致 LHS 查询。 ＝ 操作符或调用函数时传入参数的操作都会导致关联作用域的赋值操作。

#### js引擎做了什么

JavaScript 引擎首先会在代码执行前对其进行编译， 在这个过程中， 像 var a = 2 这样的声明会被分解成两个独立的步骤：

- 首先， var a 在其作用域中声明新变量。这会在最开始的阶段， 也就是代码执行前进行。

- 接下来， a = 2 会查询（LHS 查询） 变量 a 并对其进行赋值。LHS 和 RHS 查询都会在当前执行作用域中开始， 如果有需要（也就是说它们没有找到所需的标识符）， 就会向上级作用域继续查找目标标识符， 这样每次上升一级作用域（一层楼）， 最后抵达全局作用域（顶层）， 无论找到或没找到都将停止。
- 不成功的 RHS 引用会导致抛出 ReferenceError 异常。 不成功的 LHS 引用会导致自动隐式地创建一个全局变量（非严格模式下）， 该变量使用 LHS 引用的目标作为标识符， 或者抛出 ReferenceError 异常（严格模式下）。

### 词法作用域

#### eval

JavaScript 中有两个机制可以“欺骗” 词法作用域： eval(..) 和 with。 

- Eval(...) 可对一段包含一个或多个声明的“代码” 字符串进行演算， 并借此来修改已经存在的词法作用域（在运行时）。
- with 本质上是通过将一个对象的引用当作作用域来处理， 将对象的属性当作作用域中的标识符来处理， 从而创建了一个新的词法作用域（同样是在运行时）。

这两个机制的副作用是引擎无法在编译时对作用域查找进行优化， 因为引擎只能谨慎地认为这样的优化是无效的。 使用这其中任何一个机制都将导致代码运行变慢。 不要使用它们。

### 函数作用域

### 隐藏作用域

### 提升

#### TypeError 还是 ReferenceError

写出如下代码输入结果：

```javascript
foo();
function foo() {
console.log( a ); 
var a = 2;
}
```

==== 分割线 ====

这段代码实际上会被理解为下面的形式：

```javascript
function foo() {
var a;
console.log( a ); // undefined
a = 2;
} 

foo();
```

可以看到， 函数声明会被提升， 但是函数表达式却不会被提升。

```javascript
foo(); // 不是 ReferenceError, 而是 TypeError!
var foo = function bar() {
// ...
};
```

这段程序中的变量标识符 foo() 被提升并分配给所在作用域（在这里是全局作用域）， 因此foo() 不会导致 ReferenceError。 但是 foo 此时并没有赋值（如果它是一个函数声明而不是函数表达式， 那么就会赋值）。 foo() 由于对 undefined 值进行函数调用而导致非法操作，因此抛出 TypeError 异常。

名称标识符在赋值之前也无法在所在作用域中使用：

```javascript
foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() {
// ...
};

```

### 函数优先

考虑以下代码：

```javascript
foo(); // 1
var foo;
function foo() {
console.log( 1 );
} f
oo = function() {
console.log( 2 );
};
```

会输出 1 而不是 2 ！ 这个代码片段会被引擎理解为如下形式：

```javascript
function foo() {
console.log( 1 );
} f
oo(); // 1
foo = function() {
console.log( 2 );
}
```

var foo 尽管出现在 function foo()... 的声明之前， 但它是重复的声明（因此被忽略了）， 因为函数声明会被提升到普通变量之前。
尽管重复的 var 声明会被忽略掉， 但出现在后面的函数声明还是可以覆盖前面的。

```javascript
foo(); // 3
function foo() {
console.log( 1 );
}
var foo = function() {
console.log( 2 );
};
function foo() {
console.log( 3 );
}
```

### 作用域闭包

#### 定义

当函数可以记住并访问所在的词法作用域时， 就产生了闭包， 即使函数是在当前词法作用域之外执行。

#### 闭包有哪些细节？

```javascript
function foo() {
var a = 2;
function bar() {
console.log( a );
}
return bar;
}
var baz = foo();
baz(); // 2 —— 这就是闭包的效果。
```

函数 bar() 的词法作用域能够访问 foo() 的内部作用域。 然后将 bar() 函数本身当作一个值类型进行传递。 在这个例子中，  bar 所引用的函数对象本身当作返回值。
在 foo() 执行后， 其返回值（也就是内部的 bar() 函数） 赋值给变量 baz 并调用 baz()， 实际上只是通过不同的标识符引用调用了内部的函数 bar()。bar() 显然可以被正常执行。 但是在这个例子中， 它在自己定义的词法作用域以外的地方执行。

在 foo() 执行后， 通常会期待 foo() 的整个内部作用域都被销毁， 因为引擎有垃圾回收器用来释放不再使用的内存空间。 而闭包的“神奇” 之处正是可以阻止这件事情的发生。 事实上内部作用域依然存在， 没有被回收。 谁在使用这个内部作用域？ 原来是 bar() 本身在使用。
拜 bar() 所声明的位置所赐， 它拥有涵盖 foo() 内部作用域的闭包， 使得该作用域能够一直存活， 以供 bar() 在之后任何时间进行引用。
bar() 依然持有对该作用域的引用， 而这个引用就叫作闭包。

#### 闭包的本质

本质上，无论何时何地， 如果将函数（访问它们各自的词法作用域） 当作第一级的值类型并到处传递， 你就会看到闭包在这些函数中的应用。 在定时器、 事件监听器、Ajax 请求、 跨窗口通信、 Web Workers 或者任何其他的异步（或者同步） 任务中， 只要使用了回调函数， 实际上就是在使用闭包 和 对象原型。

#### 我是闭包吗？

```javascript
var a = 2;
(function IIFE() {
console.log( a );
})();
```

=== 分割线===



不是闭包。 为什么？

 因为函数（示例代码中的 IIFE） 并不是在它本身的词法作用域以外执行的。 它在定义时所在的作用域中执行（而外部作用域， 也就是全局作用域也持有 a）。 a 是通过普通的词法作用域查找而非闭包被发现的

### 循环和闭包

## 对象

### 主要类型（6 种）

- string
- number
- boolean
- null
- undifinded
- object

函数是对象的一个子类型（可调用的对象）

### 内置对象（对象子类型 ）

- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error

### 对象

在对象中，属性名永远是字符串！！！如果使用string以外其他值作为属性名，它首先会被转换成字符串，注意和数组中数字用法区分

```javascript
var myObject = {};

myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"];
myObject["3"];
myObject["[object object]"]
```

即便在对象的文字声明中，声明一个函数表达式，它也只是对于相同函数的多个引用。

### 数组

#### 数组下标可以不是数值吗？

数组期望的是数值下标，我们仍然可以给数组添加属性：

```javascript
var myArray = ["foo"， 42， "bar"]
myArray.baz = "baz";
myArray.length; // 3  
myArray.baz; // "baz"
```

可以看到虽然添加了命名属性，数组长度并未发生变化，所以完全可以把数组当做键值对使用，当然，这并不是一个好主意。如果属性名看起来是一个数字，那么它会变成数组下标，会修改数组的内容而不是添加一个属性。

### 复制对象

```javascript
function anotherFunction() { /*..*/ }
var anotherObject = {
c: true
};
var anotherArray = [];
var myObject = {
a: 2,
b: anotherObject, // 引用， 不是复本！
c: anotherArray, // 另一个引用！
d: anotherFunction
}
anotherArray.push( anotherObject, myObject );
```

如何准确地表示 myObject 的复制呢？
首先， 我们应该判断它是浅复制还是深复制。 对于浅拷贝来说， 复制出的新对象中 a 的值会复制旧对象中 a 的值， 也就是 2， 但是新对象中 b、 c、 d 三个属性其实只是三个引用， 它们和旧对象中 b、 c、 d 引用的对象是一样的。 对于深复制来说， 除了复制 myObject以外还会复制 anotherObject 和 anotherArray。 这时问题就来了， anotherArray 引用了 anotherObject 和myObject， 所以又需要复制 myObject， 这样就会由于循环引用导致死循环。



相比深复制， 浅复制非常易懂并且问题要少得多， 所以 ES6 定义了 Object.assign(..) 方法来实现浅复制。 Object.assign(..) 方法的第一个参数是目标对象， 之后还可以跟一个或多个源对象。 它会遍历一个或多个源对象的所有可枚举（enumerable， 参见下面的代码）的自有键（owned key， 很快会介绍） 并把它们复制（使用 = 操作符赋值） 到目标对象， 最后返回目标对象， 就像这样：

```javascript
var newObj = Object.assign( {}, myObject );
newObj.a; // 2
newObj.b === anotherObject; // true
newObj.c === anotherArray; // true
newObj.d === anotherFunction; // true
```

### [[Get]]

#### 属性访问过程都做了什么？

```javascript
var myObject = {
a: 2
};
myObject.a; // 2
myObject.b; // undefined
```

myObject.a 是一次属性访问，在语言规范中， myObject.a 在 myObject 上实际上是实现了 [[Get]] 操作（ 有点像函数调用：[[Get]]）。 对象默认的内置 [[Get]] 操作首先在对象中查找是否有名称相同的属性，如果找到就会返回这个属性的值。
然而， 如果没有找到名称相同的属性， 按照 [[Get]] 算法的定义会遍历可能存在的 [[Prototype]] 链。如果无论如何都没有找到名称相同的属性， 那 [[Get]] 操作会返回值 undefined：

从返回值的角度来说， 上面两个引用没有区别——它们都返回了 undefined。 然而， 尽管乍看之下没什么区别， 实际上底层的 [[Get]] 操作对 myObject.b 进行了更复杂的处理。由于仅根据返回值无法判断出到底变量的值为 undefined 还是变量不存在， 所以 [[Get]]
操作返回了 undefined。

### 遍历

for..in 循环可以用来遍历对象的可枚举属性列表（包括 [[Prototype]] 链）。 但是如何遍历属性的值呢？对于数值索引的数组来说， 可以使用标准的 for 循环来遍历值：

```javascript
var myArray = [1, 2, 3];
for (var i = 0; i < myArray.length; i++) {
console.log( myArray[i] );
} /
/ 1 2 3
```

这实际上并不是在遍历值， 而是遍历下标来指向值， 如 myArray[i]。
ES5 中增加了一些数组的辅助迭代器， 包括 forEach(..)、 every(..) 和 some(..)。 每种辅助迭代器都可以接受一个回调函数并把它应用到数组的每个元素上， 唯一的区别就是它们对于回调函数返回值的处理方式不同。
forEach(..) 会遍历数组中的所有值并忽略回调函数的返回值。 every(..) 会一直运行直到回调函数返回 false（或者“假” 值）， some(..) 会一直运行直到回调函数返回 true（或者“真” 值）。every(..) 和 some(..) 中特殊的返回值和普通 for 循环中的 break 语句类似， 它们会提前终止遍历。



注意：遍历数组下标时采用的是数字顺序（for 循环或者其他迭代器）， 但是遍历对象属性时的顺序是不确定的， 在不同的 JavaScript 引擎中可能不一样。 因此，在不同的环境中需要保证一致性时， 一定不要相信任何观察到的顺序， 它们是不可靠的。

遍历值可用如下方式

```javascript
var myArray = [ 1, 2, 3 ];
for (var v of myArray) {
console.log( v );
} /
/ 1
// 2
// 3
```

