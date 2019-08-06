/*
 * @Author lizhenhua
 * @version 2019/6/5
 * @description 
 */

export default class VNode {
    constructor(
        tag,
        data,
        children,
        text,
        elm,
        context,
        componentOptions,
        asyncFactory
    ){
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
        this.context = context
        this.functionalContext = undefined
        this.functionalOptions = undefined
        this.functionalScopeId = undefined
        this.key = data && data.key
        this.componentOptions = componentOptions
        thiscomponentInstance = undefined
        this.parent = undefined
        this.isStatic = false
        this.isRootInsert = true
        this.isComment = false
        this.isCloned = false
        this.Once = fasle
        this.asyncFactory = asyncFactory
        this.asyncMeta = undefined
        this.isAsyncPlaceholder = false
    }
    get child(){
        return this.componentInstance
    }
}


export function createTextVNode(val) {
    return new VNode(undefined,undefined,undefined,String(val))
}
 