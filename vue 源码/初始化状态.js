/*
 * @Author lizhenhua
 * @version 2019/6/17
 * @description 
 */

export function initState() {
    vm._watchers = [] //用_watchers 来保存当前组件中的所有的watcher实例
    const opts = vm.$options
    if(opts.props)initProps(vm,opts.props)
    if(opts.methods)initMethods(vm,opts.methods)
    if(opts.data){
        initData(vm)
    }else {
        observe(vm.data = {},true /*asRootData*/) //如果没有data 就观察空对象
    }
    if(opts.computed)initComputed(vm,opts.computed)
    //最后初始化watch，因为这样就可以监测到所有数据
    if(opts.watch&& opts.watch !== nativeWatch){
        initWatch(vm,opts.watch)
    }
}

//vm： vue实例， propsOptions 是props选项
function initProps(vm,propsOptions) {
    const propsData = vm.$options.propsData || {} //保存真实的props原始数据
    const props = vm._props = {} //指向vm._props
    //指向vm.$options.propKeys 的指针
    //更新props时，只需要遍历keys 就可以得到所有的props的key
    const keys = vm.$options.propKeys = []
    const isRoot = !vm.$parent //当前组件是否是根组件
    if(!isRoot){ //如果不是根组件，就不要转化props为响应式数据
        toggleObserving(false)
    }
    for (const key in propsOptions){
        keys.push(key) //遍历新传入的props，把新key 加入 vm.$options.propKeys
        //检验新props格式，并得到其值
        const value = validateProp(key,propsOptions,propsData,vm)
        //通过 defineReactive 把新props 设置到 vm._props 中
        defineReactive(props,key,value)
        //如果vm 中没有这个key,就通过proxy 函数代理到 vm._props[key]
        //就是说如果data 中已经有这个值，props再定义是无效的。
        if(!(key in vm)){
            proxy(vm,`_props`,key)
        }
    }
    toggleObserving(true)
}

function initMethods(vm,methods) {
    const props = vm.$options._props
    for(const key in methods){
        //非生产环境下，只有key 没有value 的方法
        if(process.env.NODE_ENV!=='production'){
            if(methods[key]==null){
                warn(`Method "${key}" has an undefined value in the component definition
                 Did you referentce the function correctly?`,vm)
            }
        }
        //在 props 中已经存在这个key
        if(props && hasOwn(props,key)){
            warn(`Method "${key}" has already been defined as a prop`,vm)
        }
        //vm属性方法中如果已经存在这个key，并且以 _ $ 开头的
        if((key in vm)&& isReserved(key)){
            warn(`Method "${key}" conflices with an existing Vue instance method.
            Avoid defining component methods that start with _ or $.`)
        }
        //如果方法合法，就通过bind 改写其中的this，然后赋值给 vm[key]
        //所以你在method 中访问this 其实就是去拿的 vm 的this
        vm[key] = methods[key] == null?noop:bind(methods[key],vm)
    }
}

//一个watcher 配置 lazy true 表示是生成一个供计算属性使用的watcher实例
const computedWatcherOptions = {lazy:true}
//computed 当前实例的计算属性对象
function initComputed(vm,computed) {
    //_computedWatchers 从来保存所有 计算属性的 watcher 实例
    const watchers = vm._computedWatchers = Object.create(null)
    //是否是服务端渲染
    const isSSR = isServerRendering()
    for(const key in computed){
        const userDef = computed[key]
        const getter = typeof userDef === 'function'?userDef:userDef.get
        if(process.env.NODE_ENV!=='production'&& getter==null){
            warn(
                `Getter is missing for computed property "${key}"`,vm
            )
        }
        if(!isSSR){
            //如果是非服务端渲染，就创建计算属性的 watcher 实例
            watchers[key] = new Watcher(
                vm,
                getter||noop,
                noop,
                computedWatcherOptions
                )
        }
        if(!(key in vm)){
            defineComputed(vm,key,userDef)
        }else if(process.env.NODE_ENV!=='production'){
            if(key in vm.$data){
                warn(`The computed property "${key}" is already defined in data.`,vm)
            }else if(vm.$options.props&&key in vm.$options.props){
                warn(`the computed property ${key} is already defined as a prop.`,vm)
            }
        }
    }

}

export default class Watcher{
    constructor(vm,expOrFn,cb,options){
        if(options){
            this.computed = !!options.computed
        }else {
            this.computed = false
        }
        this.dirty = this.computed
        if(this.computed){
            this.value = undefined
            this.dep = new Dep()
        }else {
            this.value = this.get()
        }
    }

    update(){
        if(this.computed){
            if(this.dep.subs.length===0){
                this.dirty = true
            }else{
                this.getAndInvoke(()=>{
                    this.dep.notify()
                })
            }
        }
    }
    getAndInvok(cb){
        const value = this.get()
        if(value!==this.value||isObject(value)||this.deep){
            const oldValue = this.value
            this.value = value
            this.dirty = false
            if(this.user){
                try{
                    cb.call(this.vm,value,oldValue)
                }catch(e) {
                    hendleError(e,this.vm,`callback for watcher "${this.expression}"`)
                }
            }else{
                cb.call(this.vm,value,oldValue)
            }
        }
    }
    evaluate(){
        //dirty为true 表示返回值已经发生变化，就重新执行get方法拿到新值
        if(this.dirty){
            this.value = this.get()
            this.dirty = false
        }
        return this.value
    }
    depend(){
        //this.deps 保存了所有尖酸属性用到的所有状态的dep实例
        // let i = this.deps.length
        // while (i--){
        //     循环拿到每个实例，然后执行 实例的depend 订阅当前计算属性
        //     当这些计算属性变化时，订阅了的组件就会得到通知
        //     this.deps[i].depend()
        // }
        if(this.dep && Dep.target){
            this.dep.depend()
        }
    }
}

var vm = new Vue({
    data:{
        a:1,
        b:2,
        c:3,
        d:4,
        e:{
            f:{
                g:5
            }

        }
    },
    watch:{
        a:function (val,oldVal) { //普通声明
        },
        b:"someMethod",//方法名
        c:{
            handler:function (val,oldVal) {
            },
            deep:true,//深度watcher
        },
        d:{
            handler:function (val,oldVal) {
            },
            immediate:true,//侦听开始就立刻执行
        },
        e:[
            function handle1(val,oldVal){},
            function handle2(val,oldVal){},
        ],
        'e.f':function (val,oldVal) {} //监听表达式
    }
})

/**
* 参数：watch，用户自定义watch对象
*/
function initWatch(vm,watch) {
    for(const key in watch){
        const handler = watch[key]
        if(Array.isArray(handler)){
            for(let i=0;i<handler.length;i++){
                creatWatcher(vm,key,handler[i])
            }
        }else {
            createWatcher(vm,key,handler)
        }
    }
}

/**
* 参数：vm  vue实例
* 参数：expOrFn  表达式或者计算属性
* 参数：handler  watch对象的值
* 参数：options  传递给vm.$watch的配置
*/
function createWatcher(vm,expOrFn,handler,options) {
    if(isPlainObject(handler)){
        options = handler
        handler = handler.handler
    }
    if(typeof handler==='string'){
        handler = vm[handler]
    }
    return vm.$watch(expOrFn,handler,options)
}

export function initProvide(vm) {
    const provide = vm.$options.provide
    if(provide){
        vm._provided = typeof provide === 'function'
        ?provide.call(vm):provide
    }
}










 