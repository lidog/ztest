/*
 * @Author lizhenhua
 * @version 2019/8/20
 * @description 
 */

//处理异步版本
const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"

clsss Promise{
    constructor(executor)
    {
        this.value = underfined;
        this.reason = underfined;
        this.status = PENDING;
        this.onResolveCallbacks = [];//定义两个队列保存同步的操作。
        this.onRejectCallbacks = [];

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED
                this.onResolveCallbacks.forEach(fn => fn()) //resolve时 执行所有的同步then。
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectCallbacks.forEach(fn => fn())
            }
        }
        try { //先执行同步函数参数,如果有错误就用reject(e) 捕获
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(suc, err)
    {
        if (this.status === FULFILLED) {
            suc(this.value)
        }
        if (this.status === REJECTED) {
            err(this.reason)
        }
        if (this.status === PENDING) { //then时如果处于等待状态
            //就分别把当前要执行的suc,err 回调赋参以后包裹成一个函数,压进各自的队列中
            this.onResolveCallbacks.push(() => {
                suc(this.value)
            })
            this.onRejectCallbacks.push(() => {
                err(this.reason)
            })
        }
    }
}


 