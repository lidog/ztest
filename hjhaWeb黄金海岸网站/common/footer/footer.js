/*
 * @Author lizhenhua
 * @version 2018/4/12
 * @description 
 */

$(function () {
    initEvent()
});

function initEvent() {
    var html = require('html-withimg-loader!./footer.html');
    $("#footer").html(html);
    tools.getImg();
    //设置content 最小高度
    $(".content").css("min-height",document.body.clientHeight - $(".footer").outerHeight()-$(".header").outerHeight());

    $("#toTop").on('click',function () {
        $('html , body').animate({scrollTop: 0});
    })

    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        $("#tel").show();
    }else{
        $("#tel").hide();
    }

};


 