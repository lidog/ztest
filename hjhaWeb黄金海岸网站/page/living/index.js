/*
 * @Author lizhenhua
 * @version 2018/6/4
 * @description 
 */

import './living.scss'

$(function () {
    insertHtml()
    initEvent()
})

let start = 0, length = 8;
function insertHtml() {
    tools.insertBannerLeft();
    tools.get(API.factory.list,{start: start, length:length,type:0},function (data) {
        let allPage = tools.allPage(data.recordsFiltered, length);
        tools.tpl('liveAction','liveActionTpl',data.data)
        tools.pageNum(int => {
            start = (int - 1) * length;
            start = start < 0 ? 0 : start;
            tools.get(API.factory.list,{start: start, length:length,type:0},function (data) {
                tools.tpl('liveAction','liveActionTpl',data.data)
                tools.hideLoad();
            })
        }, allPage)
    })
}
function initEvent() {
    $(".live-action").on("click","img",function () {
        var src = $(this).attr('src');
        var arr = [];
        var arrTitle = [];
        var index = 0;
        $(".live-action img").each(function (i,o) {
            var _src = $(this).attr('src')
            var title = $(this).closest('li').find('p').text();
            arr.push(_src)
            arrTitle.push(title)
            if(_src===src){
                index = i;
            }
        })
        tools.openControlImg(arr,index,arrTitle);
    })
}


 