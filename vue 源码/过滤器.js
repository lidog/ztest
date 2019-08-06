/*
 * @Author lizhenhua
 * @version 2019/6/19
 * @description 
 */
//花括号中
{{message | capitalize}}

//属性中
<div v-bind:id="rawId | formatId"></div>

//定义filters 项
filters:{
    capitalize:function (value) {
        if(!value)return ""
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
}

//定义全局filter
Vue.filter('capitalize',function(value){
    ...
})

export function resolveFilter(id) {
    return resolveAsset(this.$options,'filters',id,true)|| identity
}

//该函数可以查找过滤器，组件和指令
export function resolveAsset(options,type,id,warnMissing) {
    if(typeof id === 'string'){
        return
    }
    const assets = options[type] //this.$options.filters 保存过滤器的集合
    //hasOwn 是基于 Object.prototype.hasOwnProperty 实现的判断对象是否有某属性的函数
    if(hasOwn(assets,id)) return assets[id] //如果存在id 名的过滤器，就返回这个过滤函数
    const camelizedId = camlize(id) //转驼峰方式去查
    if(hasOwn(assets,camelizedId)) return assets[camelizedId]
    const PascalCaseId = capitalize(camelizedId) //转大写方式去查
    if(hasOwn(assets,PascalCaseId)) return assets[PascalCaseId]

    //拿到过滤器函数返回
    const res = assets[id] || assets[camelizedId] || assets[PascalCaseId]
    return res
}

const query = {referer:'123'}
const transitionTo = router.history.transitionTo
router.history.transitionTo = function(location,onComplete,onAbort){
    location = typeof location === "object"
    ?{...location,query:{...location.query,...query}}
    :{path:location,query}

    transitionTo.call(router.history,location,onComplete,onAbort)
}


`<ul>
    <li v-for="user in users" v-if="user.isActive" :key="user.id">
        {{user.name}}
    </li>
</ul>`











