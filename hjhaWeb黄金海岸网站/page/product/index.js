/*
 * @Author lizhenhua
 * @version 2018/6/4
 * @description 
 */

import './product.scss'

$(function () {
    insertHtml()
    initEvent()
})

let start = 0, length = 8;
var typeName = ["酒店床垫", "宾馆床垫", "公寓床垫", "宿舍床垫", "学生床垫", "民宿床垫", "弹簧床垫", "独立弹簧床垫", "棕床垫", "乳胶床垫", "弹簧加棕床垫", "弹簧加乳胶床垫"]
function insertHtml() {
    let type = tools.getUrlParam('type');
    var param = {start: start, length: length};
    tools.insertBannerLeft();
    //根据 type 定参数
    if (type) {
        param.type = type;
        $("#typeName").text(typeName[type - 1])
    } else {
        $("#typeName").text("产品展示")
    }
    tools.get(API.product.list, param, function (data) {
        let allPage = tools.allPage(data.recordsFiltered, length);
        tools.tpl('liveAction', 'liveActionTpl', data.data)
        tools.pageNum(int => {
            start = (int - 1) * length;
            start = start < 0 ? 0 : start;
            tools.get(API.product.list, param, function (data) {
                tools.tpl('liveAction', 'liveActionTpl', data.data)
                tools.hideLoad();
            })
        }, allPage)
    })

}

function initEvent() {

}


 