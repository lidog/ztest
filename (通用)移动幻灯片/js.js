/**
 * Created by hxsd on 2016/8/23.
 */
//轮播函数
function Carousel(boxId,ImgWidth,ImgHeight,RollSpeed ){
    var oBox = document.getElementById(boxId);
    var oIn = oBox.getElementsByTagName("div")[0];
    var Img1 = oIn.getElementsByTagName('img')[0];
    var left = document.createElement('p');
    var right = document.createElement('p');
    left.className = 'left';
    right.className = 'right';
    var oOut = document.createElement('div');
    var oUl = document.createElement('ul');
    oOut.className = 'unlook';
    oOut.innerHTML = '<img src="'+Img1.src+'" >';
    oBox.appendChild(oOut);
    oBox.appendChild(oUl);
    oBox.appendChild(left);
    oBox.appendChild(right);
    oIn.innerHTML +='<img src="'+Img1.src+'" >';
    var Img = oIn.getElementsByTagName('img');
    oBox.style.width = ImgWidth + 'px';
    oIn.style.width = ImgWidth * Img.length + 'px';
    oIn.style.height = ImgHeight  + 'px';
    for(var i=0;i<Img.length;i++){
        Img[i].width = ImgWidth;
        Img[i].height = ImgHeight;
    }
    var arr = [ ];
    var text = '';
    for(var i=0;i<Img.length;i++){
        arr[i] = i+1;
    }
    for(var i=0;i<Img.length;i++){
        text+='<li>'+arr[i]+'</li>';
    }
    oUl.innerHTML = text;
    oUl.style.position = 'absolute';
    oUl.style.left = (oBox.offsetWidth - oUl.offsetWidth) / 2 + 'px';           //让ul居中显示。
    oUl.style.top = (oBox.offsetHeight- oUl.offsetHeight)-10 + 'px';

    //上面是准备工作，加入元素。下面是逻辑。

    var oLi = oBox.getElementsByTagName("li");
    var time = 0;
    var int = null;
    function run( ) {
        for (var i = 0; i < oLi.length; i++) {
            oLi[i].className = '';
        }
        if(time == Img.length-1){               //这里把最后一张图片的移动的时候的li变为第一个li红。
                oLi[0].className ='red';        //它只能独立存在外面，每次都判断以下。不能放在下面的判断里面。
        };
        if (time > Img.length-1 ){              //这里判断是否已经移动到最后一张。是，就把定位图片显示出来挡住下面图片的回拨。
            oLi[0].className ='red';           // 这里要占用一次调用的时间，所以它会慢一秒。。
            oOut.style.display = 'block';
            oIn.style.transform = "translateX(" + 0 + "px)"
            time = 1;
        }else{
            oOut.style.display = 'none';
            oIn.style.transform = "translateX(" + -1 * time * ImgWidth + "px)";
            oLi[time].className = 'red';
            time = time + 1;
        }
    }
    run();
    int = setInterval(run,RollSpeed)
    oBox.onmouseover = function(){                //当鼠标移入的时候，可以发生左右点击
        clearInterval(int);
        left.style.display = 'block'
        right.style.display = 'block'
        left.onclick = function(){
            clearInterval(int);
            for(var i=0;i<oLi.length;i++){
                oLi[i].className = '';
            }
            if(time==0){
                oLi[time].className='red';
                return;
            }else{
                time = time-1;
                oLi[time].className='red';
                oIn.style.transform="translateX("+ -1*time*ImgWidth+ "px)";
            }
        }
        right.onclick = function(){
            clearInterval(int);
            run();
        }
    }
    oBox.onmouseout = function(){
        int = setInterval(run,RollSpeed)
        left.style.display = 'none'
        right.style.display = 'none'
    }
    for(var i=0;i<Img.length;i++){                  //让li可以点击
        oLi[i].index = i;
        oLi[i].onclick = function (){
            clearInterval(int);
            for(var i=0;i<oLi.length;i++){
                oLi[i].className = '';
            }
            this.className = 'red';
            if(this.index ==this.length-1 || this.index == 0){
                oIn.style.transform="translateX("+ 0 + "px)";
                time = 0;
            }else{
                oIn.style.transform="translateX("+ -1*this.index*ImgWidth+ "px)";
                time = this.index;
            }
        }
    }
}