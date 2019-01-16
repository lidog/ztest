/*
 * @Author lizhenhua
 * @version 2018/6/4
 * @description 
 */

import './companyIntro.scss';

$(function () {
    insertHtml()
    initEvent()
})

function insertHtml() {
    tools.insertBannerLeft();

    var introduce = require('html-withimg-loader!../../component/introduce.html');
    $("#introduce").html(introduce);

    var serverType = require('html-withimg-loader!../../component/serverType.html');
    $("#serverType").html(serverType);

    var advantage = require('html-withimg-loader!../../component/advantage.html');
    $("#advantage").html(advantage);

    var certificate = require('html-withimg-loader!../../component/certificate.html');
    $("#certificate").html(certificate);

}

function initEvent() {

    //优势
    tools.advantage();

    //证书
    tools.carousel({
        boxId:'certificateSlider',
        leftId:"certificateSliderLeft",
        rightId:"certificateSliderRight",
        sliderBox:"certificateSliderBox",
        width:800,
        time:4000
    });
    $("#certificateSliderBox").on('click','img',function () {
        tools.openImg($(this).attr('src'))
    })

    $("#introduce .part-title").remove();
}


 