$('#btn').hover(function(){
    $('.wrapper .header .nav .btnWrap ul').show();
})
$('.btnWrap').on('mouseleave',function(){
    $('.wrapper .header .nav .btnWrap ul').hide();
});
$('#swiper').swiper({
    images:['./src/img/1.jpg','./src/img/2.jpg','./src/img/3.jpg',]
});