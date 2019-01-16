/*
 * @Author lizhenhua
 * @version 2018/6/4
 * @description 
 */

import './contact.scss'
$(function () {
    insertHtml()
    initEvent()
})

function insertHtml() {

    tools.insertBannerLeft();


    var serverType = require('html-withimg-loader!../../component/serverType.html');
    $("#serverType").html(serverType);



}

function initEvent() {

}


 