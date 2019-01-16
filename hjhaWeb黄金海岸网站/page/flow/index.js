/*
 * @Author lizhenhua
 * @version 2018/6/4
 * @description 
 */
import './flow.scss'

$(function () {
    insertHtml()
    initEvent()
})

function insertHtml() {
    tools.insertBannerLeft();

    var serverType = require('html-withimg-loader!../../component/serverType.html');
    $("#serverType").html(serverType);

    var certificate = require('html-withimg-loader!../../component/certificate.html');
    $("#certificate").html(certificate);

}

function initEvent() {

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

    $("#process .part-title").remove();
}


 