/*
 * @Author lizhenhua
 * @version 2018/4/8
 * @description 定义一些工具方法，全局公用
 */

import template from "../plugins/template"
import notie from  "../plugins/notie-master/dist/notie.min.js"

//是否是生产环境
let product = true;
// let product = false;

export default {
    addFavorite: function () {
        var url = window.location;
        var title = document.title;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("360se") > -1) {
            alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
        }
        else if (ua.indexOf("msie 8") > -1) {
            window.external.AddToFavoritesBar(url, title); //IE8
        }
        else if (document.all) {
            try {
                window.external.addFavorite(url, title);
            } catch (e) {
                alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
            }
        }
        else if (window.sidebar) {
            window.sidebar.addPanel(title, url, "");
        }
        else {
            alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }
    },
    showLoad:function () {
        $("#loader").show();
        $('body').addClass('oh');
    },
    hideLoad:function () {
        $("#loader").hide();
        $('body').removeClass('oh');
    },
    //防抖动函数
    debounce: function (fn, delay) {
        // 持久化一个定时器 timer
        let timer = null;
        // 闭包函数可以访问 timer
        return function () {
            // 通过 'this' 和 'arguments'
            // 获得函数的作用域和参数
            let context = this;
            let args = arguments;
            // 如果事件被触发，清除 timer 并重新开始计时
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    },
    say: function (str) {
        notie.alert({type: 1, text: str || "hello world！", time: 2})
    },
    //实现img html使用<span class="data-img" img-src="newLogo.png"></span>
    getImg: function () {
        $("span[img-src]").each(function (i, o) {
            if ($(o).find('img').length == 0) {
                var src = $(o).attr("img-src");
                var img = document.createElement("img");
                img.src = require("../images/" + src);
                $(o).append(img);
            }
        })
    },
    //获取url中的参数
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    },
    /**
     * 功能：template 摸板函数 返回html 片段
     * @param {scriptId} 摸板id
     * @param {data}    渲染数据
     * @Author lzh
     */
    getHtml: function (scriptId, data) {
        var tpl = document.getElementById(scriptId).innerHTML;
        template.config({escape: true});
        return template(tpl, {list: data});
    },
    /**
     * 功能：template摸板函数 直接插入目标id
     * @param {boxId} 插入目标id
     * @param {scriptId} 摸板id
     * @param {data}    渲染数据
     * @Author lzh
     */
    tpl: function (boxId, scriptId, data) {
        document.getElementById(boxId).innerHTML = this.getHtml(scriptId, data);
    },
    post: function (url, param, callBack) {
        $.ajax({
            data: param,
            url: product ? url : '/web' + url,
            type: "post",
            success: function (data) {
                tools.ajaxCallback(data, callBack)
            }
        })
    },
    get: function (url, param, callBack) {
        $.ajax({
            data: param,
            url: product ? url : '/web' + url,
            type: "get",
            success: function (data) {
                tools.ajaxCallback(data, callBack)
            }
        })
    },
    ajaxCallback: function (data, callback) {
        if (data.code == 0 || data.code == 200) {
            callback(data)
        } else {
            this.tips(data.message, 'warn')
        }
    },
    //错误动画提示
    errKey: function ($obj) {
        $obj.addClass('err-key');
        setTimeout(function () {
            $obj.removeClass('err-key');
        }, 1000)
    },
    //消息提示
    tips: function (text, typeStr, time) {
        if (text) {
            switch (typeStr) {
                case "warn": {
                    notie.alert({type: 2, text: text, time: time || 2})
                }
                    break;
                case "err": {
                    notie.alert({type: 3, text: text, time: time || 2})
                }
                    break;
                case "info": {
                    notie.alert({type: 4, text: text, time: time || 2})
                }
                    break;
                default: {
                    notie.alert({type: 1, text: text, time: time || 2})
                }
            }
        }
    },
    //轮播图
    carousel: function (option) {
        tools.getImg();
        var defaultOption = {
            boxId: 'slider',
            xControl: true,//false 则不要左右控制箭头
            leftId: "sliderLeft",
            rightId: "sliderRight",
            pointId: "sliderPoint",
            sliderBox: "sliderBox",
            width: false,//定义一屏的宽高的基准box,默认100% $box.width
            transType: 1,//1:translate;2:show/hide
            time: 5000,
        };
        option = $.extend(defaultOption, option);
        var $box = $("#" + option.boxId);
        var width = option.width || parseInt($box.width());
        var height = parseInt($box.height());
        var $sliderBox = $("#" + option.sliderBox);
        var $left = option.xControl ? $("#" + option.leftId) : $('');
        var $right = option.xControl ? $("#" + option.rightId) : $('');
        var $point = $("#" + option.pointId).find('li');
        var $image = $sliderBox.find('.slider-item');
        var index = 0;

        if (option.transType == 1) {
            $sliderBox.css("width", width * $image.length)
        }
        ;
        if (option.transType == 2) {
            $sliderBox.css("width", width)
        }

        $image.css("width", width).css("height", height)

        $left.click(function () {
            index = index == 0 ? $image.length - 1 : index - 1;
            transIndex(index)
        });
        $right.click(function () {
            index = index == $image.length - 1 ? 0 : index + 1;
            transIndex(index)
        });

        $point.click(function () {
            index = $(this).index();
            transIndex(index)
        });

        var int = setTime();
        $box.hover(function () {
            clearInterval(int)
        }, function () {
            int = setTime()
        })

        function transIndex(index) {
            if (option.transType == 1) {
                $sliderBox.css("transform", "translateX(" + (-1 * width * index) + "px)");
            }
            if (option.transType == 2) {
                $image.eq(index).show().siblings().hide();
            }
            $point.eq(index).addClass('on').siblings().removeClass('on');
        }

        function setTime() {
            return setInterval(function () {
                index++;
                if (index == $image.length) {
                    index = 0
                }
                transIndex(index)
            }, option.time)
        }
    },
    tap: function (tabLi, tabItem) {
        var topLi = $("#" + tabLi + ">li");
        var botLi = $("#" + tabItem + ">li");
        topLi.click(function () {
            var index = $(this).index()
            $(this).addClass('on').siblings().removeClass('on')
            botLi.eq(index).addClass('on').siblings().removeClass('on')
        })
    },
    /**
     *  初始化页码
     *  currentPage: 当前页码
     *  totalPage: 总页码
     */
    pageNum: function (callback, totalPage, currentPage) {
        var $pageNum = $("#pageNum")
        $pageNum.pagination({
            currentPage: currentPage || 1,
            totalPage: totalPage || 12,
            callback: function (current) {
                tools.showLoad();
                if (callback) {
                    callback(current)
                }
                var top = $(".page-right").offset().top - 60;
                $('html , body').animate({scrollTop: top});
            }
        });
        setTimeout(function () {
            if ($pageNum.find('a').length == 0) {
                $pageNum.hide();
                return;
            }
        }, 0)
    },
    /*
     * 求 总页数
     * */
    allPage: function (total, length) {
        let a = total % length;
        if (total < length || total == length) {
            return 1
        }
        if (a > 0) {
            return parseInt(total/length)  + 1
        }
        if (a == 0) {
            return parseInt(total/length)
        }
    },
    /*插入头部 和 左边公共区域*/
    insertBannerLeft: function (str) {
        var banner = require('html-withimg-loader!../component/banner.html');
        $("#banner").html(banner);
        tools.get(API.banner, {start: 0, length: 5}, function (data) {
            tools.tpl('slider', 'sliderTpl', data.data)
            tools.carousel();
        })
        tools.insertLeft(str);
    },
    /*插入左边公共区域*/
    insertLeft: function (str) {
        var pageLeft = require('html-withimg-loader!../component/pageLeft.html');
        $("#pageLeft").html(pageLeft);

        if (str == "news") {
            //推荐新闻
            tools.get(API.news.list, {start: 0, length: 12, type: 4}, function (data) {
                tools.tpl('newsType', 'newsTypeTpl', data.data)
            });
            $("#caseType").addClass('hide');
            $("#dlThree").addClass('hide');
        } else if (str == "case") {
            //推荐新闻
            tools.get(API.case.list, {start: 0, length: 12, type: 4}, function (data) {
                tools.tpl('caseType', 'caseTypeTpl', data.data)
            });
            $("#newsType").addClass('hide');
            $("#dlThree").addClass('hide');
        } else {
            tools.get(API.product.list, {start: 0, length: 3}, function (data) {
                tools.tpl('dlThree', 'dlThreeTpl', data.data)
            })
            $("#caseType").addClass('hide');
            $("#newsType").addClass('hide');
        }
        setTimeout(function () {
            $("#leftContent").css('width', $("#pageLeft").outerWidth())
        }, 1000)

        $(window).scroll(tools.debounce(function (event) {
            $("#pageLeft").css('height', $("#pageLeft").parent().outerHeight())
            var scrollTop = $(document).scrollTop();
            var footerHeight = $("#footer").offset().top;
            if (scrollTop > 770) {
                $("#leftContent").addClass('left-content-fixed');
            } else {
                $("#leftContent").removeClass('left-content-fixed');
            }
            //如果底部已经碰到左边栏，就固定定位
            if (scrollTop + $("#leftContent").outerHeight() + 60 > footerHeight) {
                $("#leftContent").addClass('left-content-ab');
            } else {
                $("#leftContent").removeClass('left-content-ab');
            }
        }, 10))
    },
    /*优势轮播*/
    advantage: function () {
        var $itemBox = $("#adItem");
        var $contentLi = $itemBox.find("li");
        var $controlLi = $("#adControl li");
        var width = parseInt($itemBox.width());
        $itemBox.css('width', $contentLi.length * width).find('span').css('width', width);
        $controlLi.hover(function () {
            var index = $(this).index();
            if (index == 4) {
                return;
            }
            $(this).addClass('on').siblings().removeClass('on');
            $itemBox.css("transform", "translateX(" + (-1 * width * index) + "px)");
        })
    },
    /*放大图片*/
    openImg: function (imgSrc, id) {
        var id = id || "bigImg"
        $("#" + id + " img").attr('src', imgSrc).bind("mousewheel", function () {
            zoomImg(this);
            return false;
        });
        function zoomImg(o) {
            var zoom = parseInt(o.style.zoom, 10) || 100;
            zoom += event.wheelDelta / 10; //可适合修改
            if (zoom > 0) o.style.zoom = zoom + '%';
        }

        $("#" + id).unbind('click').click(function (e) {
            $(this).addClass('hide');
            $('body').removeClass('oh');
            $(this).find('img').css('zoom', '100%');
            e.stopPropagation();
        });
        $(".big-img-box").unbind('click').click(function (e) {
            e.stopPropagation();
        })
        $('body').addClass('oh');
        $("#" + id).removeClass('hide');
    },
    openControlImg: function (arr, index, arrTitle) {
        var index = index;
        var imgSrc = arr[index];
        this.openImg(imgSrc, "imgControl")
        $("#bigTitle").text(arrTitle[index]);
        $("#tranLeft").click(function (e) {
            if (index == 0) {
                index = arr.length - 1;
            } else {
                index--;
            }
            trans(arr[index], index);
            e.stopPropagation();
        })
        $("#tranRight").click(function (e) {
            if (index == arr.length - 1) {
                index = 0;
            } else {
                index++;
            }
            trans(arr[index], index);
            e.stopPropagation();
        })
        function trans(src, index) {
            $("#imgControl img").attr('src', src).css('zoom', '100%');
            $("#bigTitle").text(arrTitle[index]);
        }

    }
}


 