/*
 * @Author lizhenhua
 * @version 2018/6/20
 * @description 
 */

import './newDetail.scss'

$(function () {
    insertHtml()
    initEvent()
})

function insertHtml() {
    tools.insertLeft("news");
    let id= tools.getUrlParam('id');
    tools.get(API.news.item,{id:id},function (data) {
        tools.tpl('newDetail','newDetailTpl',data.data);
        $("#newsContent").html(data.data.content).on('click','img',function () {
            tools.openImg($(this).attr('src'));
        }).find('img').eq(0).hide();
    })
}

function initEvent() {

}


 