/*
 * @Author lizhenhua
 * @version 2019/6/4
 * @description 
 */

const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname,'data.txt')
const fileName2 = path.resolve(__dirname,'copy.txt')

const readStream = fs.createReadStream(fileName); //创建读容器
const writeStream = fs.createWriteStream(fileName2); //创建写入容器

readStream.pipe(writeStream) //让读的内容流入写容器
readStream.on('data',chunk=>{  //监听 data事件，拿到每个chunk
    console.log(chunk.toString())
})
readStream.on('end',()=>{ //监听写结束事件
    console.log('copy done')
})



 