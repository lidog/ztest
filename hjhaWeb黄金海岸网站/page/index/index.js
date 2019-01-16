/*
 * @Author lizhenhua
 * @version 2018/4/5
 * @description 
 */

// require('../css/index.css');

import './index.scss';

$(function () {
    insertHtml()
    initEvent()
});
function insertHtml() {

    //介绍
    var introduce = require('html-withimg-loader!../../component/introduce.html');
    $("#introduce").html(introduce);

    //服务类型
    var serverType = require('html-withimg-loader!../../component/serverType.html');
    $("#serverType").html(serverType);

    //优势
    var advantage = require('html-withimg-loader!../../component/advantage.html');
    $("#advantage").html(advantage);

    //流程
    var process = require('html-withimg-loader!../../component/process.html');
    $("#process").html(process);

    //证书
    var certificate = require('html-withimg-loader!../../component/certificate.html');
    $("#certificate").html(certificate);

    //banner
    var html = require('html-withimg-loader!../../component/banner.html');
    $("#banner").html(html);

    fn1(()=>{
        fn2(()=>{
            fn3()
        })
    })

}

function initEvent() {
    //优势
    tools.advantage();

    //证书
    tools.carousel({
        boxId: 'certificateSlider',
        leftId: "certificateSliderLeft",
        rightId: "certificateSliderRight",
        sliderBox: "certificateSliderBox",
        width: 1155,
        time: 4000
    });
    $("#certificateSliderBox").on('click', 'img', function () {
        tools.openImg($(this).attr('src'))
    })


    //新闻
    tools.tap("newsTitle", "newsItem")

};


function fn1(callback) {
    tools.get(API.banner, {start: 0, length: 5}, function (data) {
        tools.tpl('slider', 'sliderTpl', data.data)
        tools.carousel();
        if(callback){
            callback();
        }
    })
}

function fn2(callback) {
    //案例
    tools.get(API.case.list, {start: 0, length: 5}, function (res) {
        tools.tpl("caseSliderBox", "sliderItemTpl", res.data);
        tools.tpl("caseSliderPoint", "caseSliderPointTpl", res.data);
        //案例
        tools.carousel({
            boxId: 'caseSlider',
            sliderBox: "caseSliderBox",
            pointId: "caseSliderPoint",
            xControl: false,
            transType: 2,
            time: 3000
        });

        if(callback){
            callback();
        }
    })
}

function fn3() {
    //企业新闻
    tools.get(API.news.list, {start: 0, length: 6, type: 1}, function (res) {
        var list = res.data.splice(0, 1)[0];
        list.arr = res.data;
        tools.tpl("newsOne", "newsTpl", list);
    })

    //工厂实景
    tools.get(API.factory.list, {start: 0, length: 6}, function (res) {
        tools.tpl("factoryImg", "factoryImgTpl", res.data);
    })

    //产品
    tools.get(API.product.list, {start: 0, length: 6}, function (res) {
        tools.tpl("productImg", "productImgTpl", res.data);
    })

    //行业新闻
    tools.get(API.news.list, {start: 0, length: 6, type: 2}, function (res) {
        var list = res.data.splice(0, 1)[0];
        list.arr = res.data;
        tools.tpl("newsTwo", "newsTpl", list);
    })
}