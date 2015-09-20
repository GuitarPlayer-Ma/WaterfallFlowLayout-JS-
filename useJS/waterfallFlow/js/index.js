function $(id){
    return typeof id === 'string' ? document.getElementById(id):id;
}

window.onload = function(){
    // 实现瀑布流布局
    waterfall('main', 'box');
    // 屏幕滚动时加载数据
    window.onscroll = function(){
        // 自己构造数据
        var imageData = {"data":[{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'},{"src":'10.jpg'}]};
        // 判断是否满足加载条件
        if(checkWillScroll){
            for(var i=0; i<imageData.data.length; i++){
                // 创建盒子
                var newBox = document.createElement('div');
                newBox.className = 'box';
                $('main').appendChild(newBox);
                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);
                var newImg = document.createElement('img');
                newImg.src = 'images/' + imageData.data[i].src;
                newPic.appendChild(newImg);
            }
            waterfall('main', 'box');
        }
    }
}

function waterfall(parent, box){
    // 所有盒子
    var allBox = $('main').getElementsByClassName(box);
    // 每个盒子是等宽
    var boxW = allBox[0].offsetWidth;
    // 浏览器的宽度
    var clientW = document.body.clientWidth;
    // 每一行盒子的个数
    var cloumns = Math.floor(clientW/boxW);
    // 父标签居中
    $(parent).style.cssText = 'width:' + box * cloumns + 'px; margin : 0 auto;';
    // 定位box
    var heightArray = [];
    for(var i=0; i<allBox.length; i++){
        // 拿到盒子
        var boxH = allBox[i].offsetHeight
        if(i < cloumns){
            // 添加到数组中
            heightArray.push(boxH);
        } else{
            // 取出数组中最矮的高度
            var minBoxH = Math.min.apply(null, heightArray);
            // 取出角标
            var index= getMinIndex(minBoxH, heightArray);
            // 定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.top = minBoxH + 'px';
            allBox[i].style.left = boxW * index + 'px';
            // 更新数组
            heightArray[index] += allBox[i].offsetHeight;
        }
    }
}

function getMinIndex(value, arr){
    for(var i=0; i<arr.length; i++){
        if(arr[i] == value){
            return i;
        }
    }
}

function checkWillScroll(){
    // 拿到所有盒子
    var allBox = $('main').getElementsByClassName(box);
    // 最后一个盒子
    var lastBox = allBox[allBox.length -1];
    // y值加自身高度的一半
    var lastBoxDis = lastBox.offsetTop + Math.floor(lastBox.offsetHeight/2);
    // 页面偏离浏览器的高度加浏览器高度
    var comparedH = (document.body.clientHeight || document.documentElement.clientHeight) + (document.body.offsetTop || document.documentElement.offsetTop);
    // 判断
    console.log('.....');
    return comparedH>lastBoxDis ? true : false;
}
