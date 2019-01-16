### 黄金海岸企业网站接口文档

> 后台管理地址：http://www.gc1989.com/gc-admin-ui

#### 1、新闻

获取新闻列表：

http://www.gc1989.com/api/news/list?start=0&length=2

发送参数：

start 开始记录索引

length 每页大小

type 类型

1：公司动态

2：行业动态

0：按着时间排序

4：推荐列表

返回值：

```
{
    "recordsFiltered":11,//筛选总记录数量
    "recordsTotal":11,//总记录数量
    "draw":null,
    "data":[
        {
            "id":17,
            "title":"aaaaaa",
            "content":null,
            "createTime":"2018-06-15T16:43:00.000+0000",
            "updateTime":"2018-06-15T16:43:00.000+0000",
            "thumbnail":"https://imgsa.baidu.com/exp/whcrop=92,69/sign=84167b2931292df59796fa57d3416159/574e9258d109b3de8c7a5a6ec7bf6c81810a4cea.jpg",
            
            //内容摘要（前100个字符）
            "introduction":"如何快速写好一篇新闻稿？听语音|浏览：688|更新：2017-09-29 05:23|标签：校园生活 123456分步阅读作为职场中的一名小编，时常写新闻稿是再正常不过的事情，但是面对大量的"
        }
    ],
    "success":true,//接口请求状态
    "message":null,
    "code":0
}
```

#### (2)获取单个文本全部内容

http://www.gc1989.com/api/news/get?id=17

发送参数：

id 新闻id

返回值：

```
太长忽略，自行请求
```

### 2、案例

#### (1)获取案例列表

url：

http://www.gc1989.com/api/exampleCase/list?start=0&length=10

参数：

start 开始记录索引

length 每页大小

返回值：

```
跟新闻差不多
```



#### (2)获取单个案例详细信息

url：

http://www.gc1989.com/api/exampleCase/get?id=21



