
$(window).on('load', function(){
    // 实现瀑布流
    waterfall();
    // 判断是否需要加载新数据
    $(window).on('scroll', function(){
        // 造数据
        var data = {"dataImg":[{"src":"0.jpg"},{"src":"2.jpg"},{"src":"5.jpg"},{"src":"8.jpg"},{"src":"10.jpg"}]};
        // 判断
        if(checkWillScroll){
            $.each(data.dataImg, function(index, value){
                var newBox = $('<div>').addClass('box').appendTo($('#main'));
                var newPic = $('<div>').addClass('pic').appendTo($(newBox));
                $('<img>').attr('src', 'images/' + $(value).attr('src')).appendTo($(newPic));
            });
            waterfall();
        };
    });
});

function waterfall(){
    // 取出所有盒子
    var allBox = $('#main>div');
    // 盒子宽度
    var boxW = allBox.eq(0).outerWidth();
    // 浏览器宽度
    var clientW = $(window).width();
    // 每一行盒子个数（列数）
    var columns = Math.floor(clientW/boxW);
    // 让父标签居中
    $('main').css({
        'width' : boxW * columns + 'px',
        'margin' : '0 auto'
    })
    // 定位
    var heightArray = [];
    $.each(allBox, function(index, value){
        var boxH = $(value).outerHeight();
        if(index<columns){
            heightArray[index] = boxH;
        } else{
            // 数组中最矮的行
            var minBoxH = Math.min.apply(null, heightArray);
            // 对应的角标
            var minIndex = $.inArray(minBoxH, heightArray);
            // 定位
            var box = allBox[index];
            $(box).css({
                'position' : 'absolute',
                'top' : minBoxH + 'px',
                'left' : minIndex * boxW + 'px'
            });
            // 跟新高度
            heightArray[minIndex] += boxH;
        }
    });
}

function checkWillScroll(){
    // 最后一个盒子
    var lastBox = $('#main>div').last();
    // 求出盒子自身高度的一半 + 头部偏离的高度
    var lastBoxDis = $(lastBox).offset().top + Math.floor($(lastBox).offset().height / 2);
    // 求出页面偏离的高度
    var topScrollH = $(window).offset().top;
    // 求出浏览器的高度
    var clientH = $(window).height();

    return lastBoxDis < (topScrollH + clientH) ? true : false;
}