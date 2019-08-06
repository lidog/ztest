/*
 * @Author lizhenhua
 * @version 2019/6/14
 * @description 
 */

Vue.prototype.$on = function (event,fn) {
    const vm = this;
    if(Array.isArray(event)){
        for(let i=0;l=event.length,i<l;i++){
            //如果event 是一个数组，就递归调用$on，注册回调到对应的事件队列中
            this.$on(event[i],fn)
        }
    }else {
        //vm._events 是记录事件的对象，
        // event 是当前要注册的事件名，作为key，值是一个数组，就是事件队列
        //vm._events[event] 是一个数组，在其中压入 回调函数；
        (vm._events[event]||(vm._events[event] = [])).push(fn)
    }
    return vm
};

Vue.prototype.$off = function (event,fn) {
    const vm = this;
    //没有参数移除所有
    if(!arguments.length){
        vm._events = Object.create(null);
        return vm
    }
    //如果event是数组，就递归删除订阅
    if(Array.isArray(event)){
        for (var i = 0; i < event.length; i++) {
            this.$off(event[i],fn)
        }
        return vm
    }

    //如果没有监听该事件，直接返回
    const cbs = vm._events[event];
    if(!cbs){
        return vm
    }
    //如果只是一个参数 表示把该类事件的监听取消
    if(arguments.length===1){
        vm._events[event] = null;
        return vm
    }
    //如果存在第二个参数，表示只删除该事件下的fn回调
    if(fn){
        const cbs = vm.events[event];
        let cb;
        let i = cbs.length;
        while(i--){
            cb = cbs[i];
                cbs.splice(i,1);
                if(cb===fn||cb.fn===fn){
                break //下一次循环
            }
        }
        return vm
    }

    return vm
};

Vue.prototype.$once = function (event,fn) {
    const vm = this;
    function on() {
        vm.$off(event,on);
        fn.apply(vm.arguments)
    }
    on.fn = fn; //把回调函数 保存到on监听器的 fn属性中
    vm.$on(event,on);
    return vm
};

Vue.prototype.$emit = function (event) {
    const vm = this;
    let cbs = vm._events[event];
    if(cbs){
        const args = toArray(arguments,1);
        for(let i=0;l=cbs.length,i<l;i++){
            try{
                cbs[i].apply(vm,args)
            }catch(e){
                handleError(e,vm,`event handler for "${event}"`)
            }
        }
    }
};
Vue.prototype.$destroy = function () {
    const  vm = this;
    if(vm.isBeingDestroyed){ //如果正在销毁，直接返回
        return
    }
    callHook(vm,'beforeDestroy'); //调用回调钩子
    vm._isBeingDestroyed = true;

    //删除自己与父级的链接
    const parent = vm.$parent;
    //如果父不是正在销毁，并且父不是抽象组件
    if(parent&&!parent._isBeingDestroyed&&!vm.$options.abstract){
        remove(parent.$children,vm)
    }
    //从watcher 监听的所有状态的依赖列表中移除watcher
    if(vm._watcher){
        vm._watcher.teardown() //teardown 是watcher 提供的清除依赖的方法
    }
    let i = vm._watchers.length;
    while(i--){
        vm._watchers[i].teardown()
    }
    vm.isDestroyed = true;
    //在vnode 树上触发destroy钩子函数解绑指令
    vm._patch_(vm._vnode,null);
    //触发destroyed 钩子
    callHook(vm,'destroyed');
    //移除所有的事件监听器
    vm.$off()
};

var Provider = {
    provide:{
        foo:'bar'
    },
};
var child = {
    inject:['foo'],
    created(){
        console.log(this.foo) //‘bar’
    }
};
var child = {
    inject:['foo'],
    props:{
        bar:{
            default(){
                return this.foo
            }
        }
    }
};