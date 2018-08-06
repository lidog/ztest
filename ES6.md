1，let 定义的变量没有变量提升的说法
```
	（function(){
    	console.log(a)	//a is underfind;
      var a = 12

    }）（）

    (function(){
    	console.log(a)	//a is not defind;
        let a = 12
    })()


```

2,同一个作用域中 let 定义的变量不能重复定义
```
let a = 10;

let a  = 5;//identifier ‘a’ has already been declared;

console.log(a)

```
3，for 循环中定义的 let i= 0；具有自己的作用于，是 后面 { } 作用域的 父级 作用域；

4，const 定义的变量不能改，只能读；并且定义的时候就一定要给值；//identifier ‘a’ has already been declared;


5,const 定义的 对象可以更改属性
```
	const a = [];
   a.push(b);
   console.log(a) //[b];

   如果希望对象类型不能更改，可以使用Object.freeze() 方法

```

6，字符串模板中用 ${ 变量名字 } 拼接字符串
```
var name = "lzj";

console.log(`我的名字叫 ${name}`);

```
7，扩展运算符  ...
```
//用在函数的展开参数上
var arr= [a,b,c,d];

function fn(a,b,c,d){ do something}

fn(...arr)


//用在函数的收起参数上
function fn(...a){
	console.log(a)
}

fn(1) //1
fn(1,2,3,4)	//[1,2,3,4] 变成了数组

//深拷贝一个数组
var arr = [1,2,3]
var arr2 = [...arr]//此时的arr2 是新的数组，不是arr的引用

```

8，箭头函数没有arguments，不能作为构造函数

9，foreach(function(值，index,循环对象){}，回调中this的指向默认window)； foreach 第一个参数是回调，第二个参数是操作回调函数中 this 的指向，默认window

10，map 一般用于加工arr 每个item。配合return使用， 得到一个新的数组；如果没有return，则相当于foreach；所以，一般用map都用return，否则用 foreach；

11，filter 返回 一个 回调函数中 reture true 的新数组；

12，arr.some 只要数组中某个item 符合条件，就返回true；arr.every 数组中所有item 都符合条件返回true；

13，arr.reduce 求数组元素之和；arr.reduce((perv,cur,index,arr)=>{ }) ;perv 是前一个值，cur 是下一个值；

14，arr.reduceRight() 原理跟 reduce 相同，执行顺序是从右往左；

15，arr.keys()  方法返回一个数组索引的迭代器。

16，arr.entries() 方法返回一个 Array Iterator(数组迭代) 对象，该对象包含数组中每一个索引的键值对。


17，迭代器可以通过next(),访问到值；

18，arr.form 可以复制一个数组，同时可以把arguments这种类数组转化为正的数组；

19，split 和 join

split 用于将字符串分割为数组，join 用于把数组合成字符串；
```
let arr = 'lzh'.split('');

console.log(arr)// ['l','z','h'];

console.log(arr.join(''))//'lzh'


```

20，arr.fill(val,star,end);//填充val到数组中，改变原数组；

21，arr.includes(str),如果arr中存在str,返回true，否则返回false；

22，对象的属性如果是一个函数，不要用箭头函数；
```
let name = 2
 let obj = {
 	show:()=>{
    	return this.name
    },
    name:1
 }

obj.show()//2 this指向window

```

23，Object.is(a,b) 如果ab相等，就返回true，否则false；
```
console.log(NaN==NaN)//false

console.log(+0 == -0)//true

Object.is(NaN,NaN)//true

Object.is(+0,-0)//false


```

24,Object.assign(目标对象，object1，object2) 合并对象，深度合并，返回一个新对象；后面的值会覆盖前面的
```
let obj1={a:1},obj2={b:1},obj3={c:1};
let obj = Object.assign({},obj1,obj2,obj3);
console.log(obj)//{a:1,b:1,c:1};

obj = Object.assign({},obj1,obj2,obj3,{a:3});
console.log(obj)//{a:3,b:1,c:1}

```
25,Object遍历值
```
Object.keys(obj) 返回一个由obj的key 组成的数组；

Object.values(obj) 返回由value 组成的数组；

```
26，解构 Object 得到其函数函数

```
	let { keys,values } = Object,	obj={a:1,b:2};

	console.log(keys(obj))// [a,b]
   console.log(values(obj))//[1,2]

```

27，解构 object 得到值

```
	let {x,y,...z} = {x:1,y:2,a:3,b:4};

    console.log(x,y,z)// 1,2,{a:3,b:4}

```
28,通过解构 object 可以深度复制对象

```
	let obj1= {a:1,b:2};
    let obj2 = {...obj1};
    console.log(obj2)//{a:1,b:2};
    delect obj2.a
    console.log(obj1.a)//1


```
29,promise 简写
```
 return Promise.resolve(res) 将res 包裹在一个promise 对象中返回，并且已经是 resolve 状态
 //等价于
 return new Promise(resolve=>{
 	resolve(res)
 })

还有 Promise.reject(res) 也是一样道理

```

30，promise.all([p1,p2,p3]) 和 promise.race([p1,p2,p3])
```
p1,p2,p3都是一个promise 对象， promise.all 把三者打包为一个promise,共用一个状态；
三者都rosolve 时，指向 resolve,否则reject；

promise.race([p1,p2,p3]) 相反，只要其中一个 p 成功，就resolve；
```

