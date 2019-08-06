/*
 * @Author lizhenhua
 * @version 2019/6/5
 * @description 
 */

Vue.prototype.$watch = function (expOrFn,cb,options) {
    const vm = this
    options = options || {}
    const watcher = new Watcher(vm,expOrFn,cb,options)
    if(options.immediate){
        cb.call(vm,watcher.value)
    }
    return function unwatchFn() {
        watcher.teardown();
    }
}

export default class Watcher{
    constructor (vm,expOrFn,cb){
        this.vm = vm
        if(typeof expOrFn === 'function'){
            this.getter = expOrFn
        }else {
            this.getter = parsePath(expOrFn)
        }
        ...
    }
}



 