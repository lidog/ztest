/*
 * @Author lizhenhua
 * @version 2019/6/17
 * @description 
 */

export function initInjections(vm) {
    const result = resolveInject(vm.$option.inject,vm) //遍历祖先组件，找出inject
    if(result){
        observerState.shouldConvert = false //通知defineReactive不要把内容转为响应式
        Object.keys(result).forEach(key=>{
            defineReactive(vm,key,result[key]) //遍历inject对象，定义成 this的属性
        })
        observerState.shouldConvert = true
    }
}


export function rosolveInject(inject,vm) {
    if(inject){
        const result = Object.create(null)
        //如果result 的key是symbol 就调用Reflect.owmKeys 获取所有可枚举的key
        //否则用 Object.keys 获取；这样无法排除可枚举key
        const keys = hasSymbol?Reflect.ownKeys(inject).filter(key=>{
            return Object.getOwnPropertyDescriptor(inject,key).enumerable
        }):Object.keys(inject)
    }
    for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        const provideKey = inject[key].from
        let source = vm
        while (source){
            //provided 定义的东西，会被保存在_provided 中
            //如果存在_provided 并且 可以找到 provideKey 的值
            //就把 result 设置为 这个值，并终止循环
            if(source._provided && provideKey in source._provided){
                result[key] = source._provided[provideKey]
                break
            }
            //如果找不到，就把父组件设置为 source 继续找
            source = source.$parent
        }
        //如果所有父组件都没有找到，就尝试去inject默认项中寻找
        if(!source){
            if('default' in inject[key]){
                const provideDefault = inject[key].default
                result[key] = typeof provideDefault === 'function'
                ? provideDefault.call(vm)
                    :provideDefault
            }else if(process.env.NODE_ENV!=='production'){
                warn(`Injection "${key}" not found`,vm)
            }
        }
        return result
    }
}
 