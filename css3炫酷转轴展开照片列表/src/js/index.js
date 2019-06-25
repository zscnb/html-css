var wrap = $('.wrapper');
setInterval(function () {
    wrap.removeClass('init');
}, 200);
$('ul').on('click', 'li', function () {
    // console.log(this);
    $(this).addClass('active');
    wrap.addClass('wrap-active');
});
$('.close').on('click', function (e) {
    // 阻止冒泡事件
    e.stopPropagation();
    $('.active').removeClass('active');
    wrap.removeClass('wrap-active');
});