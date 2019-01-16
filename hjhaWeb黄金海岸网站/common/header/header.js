/*
 * @Author lizhenhua
 * @version 2018/4/12
 * @description 
 */

$(function () {
    initEvent();
    initNavigation();
});

function initEvent() {

    var html = require('html-withimg-loader!./header.html');
    $("#header").html(html);
    tools.getImg();

    $(window).scroll(tools.debounce(function(event){
        var height = $("#header").outerHeight();
        $(".header-height").height($("#navBar").outerHeight());
        var scrollTop = $(document).scrollTop();
        if(scrollTop>height){
            $("#navBar").addClass('nav-fix');
            $(".header-height").removeClass('hide');
        }else {
            $("#navBar").removeClass('nav-fix');
            $(".header-height").addClass('hide');
        }
    },50));

    $("#favorite").on('click',function () {
        tools.addFavorite();
    })
    
};

/**
 * 功能：高亮当前页面
 * @param {array}
 * @Author lzh
 */
function initNavigation() {
    var navigation= [
        "index.html",
        "login.html",
        "companyIntro.html",
        "case.html",
        "living.html",
        "flow.html",
        "product.html",
        "news.html",
        "contact.html",
    ],page='',url =  window.location.href;
     navigation.forEach(function (o) {
        if(url.indexOf(o)!==-1){
            page = o;
            return;
        }
    });
     page = page?page:navigation[0];
    $("#pageLink li").find("a[href='"+page+"']").parent().addClass("active").siblings().removeClass("active");
};
