/**
   * 作者：lzh
   * 功能：解决移动端输入板挡住输入框bug
   * 参数：id,需要修复点击bug的父元素id；
   * 参数：pullClass,需要被提起的盒子class；
   * 参数：scrollContentClass,发生滚动的盒子class，默认mobile-content；
   * 参数：top,发生滚动的盒子class，默认mobile-content；
   * 说明：fixBug,只有在原生标签 加上fixBug="true" 自定义属性才弹起修复；
   * 返回值：
   */
  fixInputBug(id="app",pullClass="form-item",scrollContentClass="mobile-content",top=100){
    var mobileArr = ["iPhone", "iPad", "Android", "Windows Phone", "BB10; Touch", "BB10; Touch", "PlayBook", "Nokia"];
    var ua = navigator.userAgent;
    var res = mobileArr.filter(function (arr) {
      return ua.indexOf(arr) > 0;
    });
    var nodeObj = document.getElementById(id);
    if (res.length > 0) {
      nodeObj.onclick = function (ev) {
        var ev = ev || nodeObj.event;
        var target = ev.target || ev.srcElement;
        let content = findParent(target,pullClass);
        let father = findParent(target,scrollContentClass);
        let scrollTop = father.scrollTop;
        let model = document.createElement('div');
        model.id = "inputBugModel";
        if (target.nodeName.toLowerCase() == 'input' || target.nodeName.toLowerCase() == 'textarea') {
          if(target.type!=="radio"&&target.type!=="checkbox"&&target.getAttribute('fixBug')){
            addClass(content,"input-bug")
            addClass(father,"input-bug-oh")
            if(document.getElementById("inputBugModel")){
              father.removeChild(document.getElementById("inputBugModel"));
            }
            father.appendChild(model);
            father.scrollTop = top;
            target.onblur = function () {
              removeClass(content,"input-bug")
              removeClass(father,"input-bug-oh")
              father.removeChild(model);
              father.scrollTop = scrollTop;
            }
          }
        }
      }
      function addClass(node,className) {
        if(node.className.split(" ").indexOf(className)==-1){
          node.className = node.className + ' ' + className;
        }
      }
      function removeClass(node,className) {
        node.className = node.className.replace(" "+className, '');
      }
      function  findParent(node, className){
        let target = node;
        if (target && target.parentNode&&target.parentNode.nodeName!=='HTML') {
          let classStr = target.parentNode.className;
          if(typeof classStr==='string'&&classStr.split(" ").indexOf(className)!==-1){
              return target.parentNode;
          } else {
            return findParent(target.parentNode,className)
          }
        } else {
          return document.getElementsByTagName('body')[0];
        }
      }
    };
  },