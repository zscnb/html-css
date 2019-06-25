window.onload = function () {
    var img = $('img');
    var len = img.length;
    var deg = 360 / len;
    for (var i = 0; i < len; i++) {
        img.eq(i).css({
            transform: 'rotateY(' + i * deg + 'deg) translateZ(300px)',
            transition: 'transform .5s linear ' + (len - 1 - i) * 0.1 + 's'
        })
        // console.log((len - 1 -i)*0.1);
    }
    bindEvent();
};
    // 水平平移 rotateY()
    // 竖直平移 rotateX()
    // 拖拽
    function bindEvent() {
        // console.log(11111)检测函数是否好使
        var lastX, lastY, nowX, nowY, disX, disY, roX = 0,
            roY = 0,
            timer;
        $('.box').on('mousedown', function (e) {
            clearInterval(timer);
            lastX = e.clientX;
            lastY = e.clientY;
            $('body').on('mousemove', function (e) {
                nowX = e.clientX;
                nowY = e.clientY;
                //坐标差值  deg
                disX = nowX - lastX;
                disY = nowY - lastY;
                //最终为了获得 旋转角度 roX roY
                //从下到上， clientY越来越小  nowY < lastY   disY为负数
                roX -= disY * 0.2; //rox = 0 - (负值)  >  0
                roY += disX * 0.2;
                $('.box').css({
                    transform: 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                })
                // console.log(roX +":"+roY) 
                lastX = nowX;
                lastY = nowY;
            });
            $('body').on('mouseup', function () {

                $('body').off('mousemove');
                //松开鼠标，图片还有些运动动画
                //运动  旋转的角度   角度越来越小（roX,roY)
                //逐渐减小disX,disY
                timer = setInterval(function () {
                    disX *= 0.95;
                    disY *= 0.95;
                    roX -= disY * 0.5;
                    roY += disX * 0.5;
                    // console.log(222222)
                    $('.box').css({
                        transform: 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                    });
                    if (Math.abs(disX) < 0.2 && Math.abs(disY) < 0.2) {
                        clearInterval(timer);
                    }
                }, 20);

            });
            return false;
        })
    }
