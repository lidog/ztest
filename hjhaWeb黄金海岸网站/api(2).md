### 黄金海岸企业网站接口文档

###  1.后台管理

##### 地址：http://www.gc1989.com/gc-admin-ui
##### 用户名：admin
##### 密码：123456

### 2、新闻动态

#### 获取单个新闻详情
##### url: http://www.gc1989.com/api/news/get
##### 参数:
id: 新闻id
##### 返回值
```
      
{
    "success":true,
    "data":{
    	//id
        "id":24,
        
        //标题
        "title":"这是一个新的",
        
        //正文
        "content":"",
        "createTime":"2018-06-23 21:00:17",
        
        //更新时间
        "updateTime":"2018-06-23",
        
        //第一张图片
		"thumbnail":"",
		
		//前100字简介
        "introduction":"",
        
        //新闻类型
        "type":4
    },
    "message":null,
    "code":200
}
```

#### 获取新闻列表
##### url: http://www.gc1989.com/api/news/list
##### 参数: 
start:开始索引
length: 页长度
type: 1公司动态，2行业动态，3推荐资讯
##### 返回值
```
      
{
    "recordsFiltered":3,
    "recordsTotal":3,
    "draw":1,
    "data":[
        {
            "id":24,
            "title":"这是一个新的",
            "content":null,
            "createTime":"2018-06-23 21:00:17",
            "updateTime":"2018-06-23",
            "thumbnail":"",
            "introduction":"",
            "type":4
        },
        {
            "id":23,
            "title":"这是一个新的",
            "content":null,
            "createTime":"2018-06-23 21:00:04",
            "updateTime":"2018-06-23",
            "thumbnail":"",
            "introduction":"",
            "type":2
        },
        {
            "id":22,
            "title":"公司动态",
            "content":null,
            "createTime":"2018-06-23 20:59:52",
            "updateTime":"2018-06-23",
            "thumbnail":"",
            "introduction":"",
            "type":1
        }
    ],
    "success":true,
    "message":null,
    "code":0
}
```
### 2、工程案例
http://www.gc1989.com/api/exampleCase/get
http://www.gc1989.com/api/exampleCase/list

### 2、工厂实景
http://www.gc1989.com/api/factoryReality/get
http://www.gc1989.com/api/factoryReality/list

### 2、产品展示
http://www.gc1989.com/api/product/get
http://www.gc1989.com/api/product/list

### 2、banner
http://www.gc1989.com/api/banner/get
http://www.gc1989.com/api/banner/list
