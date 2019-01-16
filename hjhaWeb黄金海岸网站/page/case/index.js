/*
 * @Author lizhenhua
 * @version 2018/6/4
 * @description 
 */

import "./case.scss"

$(function () {
    insertHtml()
    initEvent()
})

let start = 0, length = 5;

function insertHtml() {
    tools.insertBannerLeft("case")
    tools.get(API.case.list, {start: start, length: length}, function (res) {
        let allPage = tools.allPage(res.recordsFiltered, length);
        tools.tpl("caseItem", "caseItemTpl", res.data);
        tools.pageNum(int => {
            start = (int - 1) * length;
            start = start < 0 ? 0 : start;
            tools.get(API.case.list, {start: start, length: length}, function (res) {
                tools.tpl("caseItem", "caseItemTpl", res.data);
                tools.hideLoad();
            })
        }, allPage)
    })
}

function initEvent() {

}
 