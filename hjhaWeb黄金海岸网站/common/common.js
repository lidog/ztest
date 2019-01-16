/*
 * @Author lizhenhua
 * @version 2018/4/16
 * @description 
 */

var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?85bdfff2b6c9c55bac7cec2ffce59fcf";
    var s = document.getElementsByTagName("meta")[0];
    s.parentNode.insertBefore(hm, s);
})();

import tools from "./tools.js";
import API from "./apiConfig.js";


//暴露给全局   其他页面可以直接 使用 该对象下的方法
window.API = API;
window.tools = tools;   //直接使用的对象一定要在 $(function(){ 这里面使用 })

$(function () {
    initEvent()
});

function initEvent() {
    //全部运行此函数,加载本地图片资源；如果是服务器图片资源，直接用img标签即可
    tools.getImg();

    // var keyword = '<meta name="keyword" content="'+API.keyword+'"/>';
    // $("head").append(keyword);
    //
    // var description = '<meta name="description" content="'+API.description+'"/>'
    // $("head").append(description);

    //全局禁用右键
   setTimeout(function () {
       document.oncontextmenu = function(){
           event.returnValue = false;
       }
   })

    setInterval(function () {
        $(".news-content").css("user-select","none")
    },100)
};

 