/*
 * @Author lizhenhua
 * @version 2019/6/4
 * @description 
 */

const  fs = require('fs') //文件操作基础库
const path = require('path') //路径操作基础库

const  fileName = path.resolve(__dirname,'data.txt')

//读取文件内容，是异步的
// fs.readFile(fileName,(err,data)=>{
//     if(err){
//         console.error(err)
//     }
//     //data 是二进制类型，需要转字符串输出
//     console.log(data.toString())
// })

//写入文件
const  content = "这是写入文件的内容\n"
const  opt = {
    flag:'a' //追加写入，覆盖用 w
}
fs.writeFile(fileName,content,opt,(err)=>{
    if(err){
        console.error(err)
    }
})

fs.exists(fileName,(exist)=>{
    console.log(exist)
})