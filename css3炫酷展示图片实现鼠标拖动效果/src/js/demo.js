
// 页面加载完  将图片分散  利用旋转加平移
window.onload = function () {
    var img = document.getElementsByTagName('img');
    var len = img.length;
    // 算出来每一张图片需要移动的平均角度
    var deg = 360 / len;
    for (var i = 0; i < len; i++) {
        // 每一张图片 先绕着y轴旋转 不同的角度   然后再沿着z轴方向平移
        img[i].style.transform = 'rotateY(' + i * deg + 'deg) translateZ(300px)';
        // 每一张图片进行运动时 进行延迟
        img[i].style.transition = 'transform 0.5s linear ' + (len - 1 - i) * 0.1 + 's';
    }
    // 调用点击事件
    bindEvent();
}

function bindEvent() {
    // 实现拖拽动作   在进行拖拽的过程中是图片整体在运动即父级box进行运动
    var oBox = document.getElementsByClassName('box')[0];
    // 将事件绑定在body上
    var body = document.getElementsByTagName('body')[0];
    var lastX, lastY, nowX, nowY, disX, disY;
    var roX = 0, roY = 0;
    var timer;
    // 鼠标落下mousedown事件
    body.onmousedown = function (e) {
        // 获得鼠标落下这点坐标
        lastX = e.clientX;
        lastY = e.clientY;
        // 鼠标进行拖拽移动的同时 box 进行运动
        body.onmousemove = function (e) {
            // 获得当前鼠标移动到的位置坐标
            nowX = e.clientX;
            nowY = e.clientY;

            // 计算出鼠标移动距离
            disX = nowX - lastX;
            disY = nowY - lastY;

            // 确定box旋转角度与方向
            // 水平拖拽绕着y轴旋转   竖直拖拽绕着x轴运动
            roX -= disY * 0.2;
            roY += disX * 0.2;
            oBox.style.transform = 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)';

            // 下次进行移动时  此刻的点做为下一次运动的上一点
            lastX = nowX;
            lastY = nowY;
        };
        body.onmouseup = function (e) {
            // 阻止鼠标拖拽移动事件
            body.onmousemove = function () {return false;}
            // 鼠标抬起后  box继续运动且 动作越来越小
            // 鼠标移动距离决定旋转大小  所以将disx  disy越来越小  变化角度就越来越小
            timer = setInterval(function (e) {
                // 将disx disy变小
                disX *= 0.95;
                disY *= 0.95;
                // 角度同时也变小
                roX -= disY*0.5;
                roY += disX*0.5;
                oBox.style.transform = 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)';
                // 当变化小于一定值的时候   清除定时器
                if (Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1) {
                    clearInterval(timer);
                }
            }, 20);
        }
        return false;
    }
}