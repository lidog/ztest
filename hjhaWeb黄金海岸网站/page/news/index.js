/*
 * @Author lizhenhua
 * @version 2018/6/4
 * @description 
 */

import './news.scss'
$(function () {
    insertHtml()
    initEvent()
})

let start = 0, length = 5;

function insertHtml() {
    tools.insertBannerLeft('news')

    tools.get(API.news.list,{start: start, length:length},function (data) {
        let allPage = tools.allPage(data.recordsFiltered, length);
        renderTpl(data.data)
        tools.pageNum(int => {
            start = (int - 1) * length;
            start = start < 0 ? 0 : start;
            tools.get(API.news.list,{start: start, length:length},function (data) {
                renderTpl(data.data)
                tools.hideLoad();
            })
        }, allPage)
    })

    //推荐新闻
    tools.get(API.news.list,{start: 0, length:12,type:4},function (data) {
        tools.tpl('recommendNew','recommendNewTpl',data.data)
    })

}

function initEvent() {
}

function renderTpl(data) {
    if(data.length>0){
        data.forEach(item=>{
            let b = item.createTime.split(' ')[0];
            let a  = b.split('-');
            item.day=a[2];
            item.month = a[0]+'-'+a[1];
        })
    }
    tools.tpl('newsList','newsListTpl',data)
}