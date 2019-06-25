(function () {


    // var width = $('.wrapper ul li').width();
    // var nowIndex = 0;
    // var lock = false;
    // var timer = null;
    // // 人看到的图片个数
    // var imgNum = $('.wrapper ul li').length - 1;
    // 初始化 执行函数
    function Init(options) {
        // 保存父元素  即轮播要插入的位置
        this.parent = options.parent;
        // 存储 用户要轮播的所有图片
        // console.log(this);
        this.images = options.images;
        // 轮播的一个方向
        this.direction = options.direction || 'next';
        // 每张图片的宽度
        this.width = options.width || $(this.parent).width();
        // console.log(this.width)
        // 每张图片的高度
        this.height = options.height || $(this.parent).height();
        // 自动轮播的时间
        this.autoTime = options.autoTime || 3000;
        // 当前展示图片的所引致
        this.nowIndex = options.nowIndex || 0;
        // 判断当前动画是否结束（厕所里有没有人）
        this.lock = false;
        // 设置自动轮播定时器
        this.timer = null;
        // 轮播图片的个数
        this.animateTimer = options.animateTimer || 2000;
        this.imgNum = options.images.length;
        this.createDom();
        this.addCss();
        this.bindEvent();
        this.autoMove();
        this.changeIndex();
    }
    // 创建轮播图内容
    Init.prototype.createDom = function () {
        var imgContent = $('<ul class="imgContent"></ul>')
        var pointer = $('<div class="pointer"></div>');
        for (var i = 0; i < this.imgNum; i++) {
            $('<li><img src="'+ this.images[i] +'"/></li>').appendTo(imgContent);
            $('<div></div>').appendTo(pointer);
        }
        // 插入最后一个li  内容与第一张一样
        imgContent.append($('<li><img src="'+ this.images[0] +'"/></li>'));
        $(this.parent).append(imgContent)
                      .append($('<div class="btn left-btn">&lt;</div>'))
                      .append($('<div class="btn right-btn">&gt;</div>'))
                      .append(pointer);
    }
    // 添加初始化样式
    Init.prototype.addCss = function () {
        $('.imgContent', this.parent).css({
            position: 'absolute',
            width: this.width * (this.imgNum + 1),
            fontSize: '0px',
            left: 0,
        });
        $('.imgContent > li', this.parent).css({
            width: this.width,
            height: this.height,
            display: 'inline-block',
        });
        $('.imgContent > li > img', this.parent).css({
            width: '100%',
            height: '100%',
        });
        $('.btn', this.parent).css({
            // 用户可以定义按钮颜色 和背景颜色 留给同学们
            width: 50,
            height: 50,
            background: '#eee',
            position: 'absolute',
            top: '50%',
            'margin-top': -25,
            lineHeight: '50px',
            textAlign: 'center',
            fontSize: 24,
            cursor: 'pointer',
            opacity: 0.5,
            display: 'none',
        });
        $('.btn.left-btn', this.parent).css({
            left: 0,
        });
        $('.btn.right-btn', this.parent).css({
            right: 0,
        });
        $('.pointer', this.parent).css({
            position: 'absolute',
            bottom: '10px',
            width: '100%',
            textAlign: 'center',
        });
        $('.pointer > div', this.parent).css({
            width: 6,
            height: 6,
            display: 'inline-block',
            borderRadius: '50%',
            margin: '0 5px',
            backgroundColor: '#fff',
            cursor: 'pointer',
        });
    }
    // 所有事件的集合  添加事件
    Init.prototype.bindEvent = function () {
        var self = this;
        $(this.parent).hover(function () {
            $('.btn', self.parent).show();
            clearInterval(self.timer);
        }, function () {
            $('.btn', self.parent).hide();
            self.autoMove();
        });
        $(this.parent).on('click', '.btn', function (e) {
            if ($(this).hasClass('left-btn')) {
                self.move('prev');
            } else if ($(this).hasClass('right-btn')) {
                self.move('next');
            }
        });
        $('.pointer', self.parent).on('click', 'div', function (e) {
            self.move($(this).index());
        });
    }
    // 运动函数  dir 运动方向  prev 向前一张图片  next向后一张图片
    Init.prototype.move = function (dir) {
        if (this.lock) {
            return false;
        }
        // console.log(dir)
        this.lock = true;
        var self = this;
        if (dir == 'prev') {
            if (this.nowIndex == 0) {
                this.nowIndex = this.imgNum;
                $('ul', this.parent).css('left', -this.nowIndex * this.width);
            }
            this.nowIndex--;
            $('ul', this.parent).animate({
                'left': -this.nowIndex * this.width
            }, this.animateTimer, function () {
                self.changeIndex();
                self.lock = false;
            });
        } else if (dir == 'next') {
            if (this.nowIndex == this.imgNum) {
                this.nowIndex = 0;
                $('ul', this.parent).css('left', - this.nowIndex * this.width);
            }
            this.nowIndex++;
            $('ul', this.parent).animate({
                'left':-this.nowIndex * this.width
            }, this.animateTimer, function () {
                self.changeIndex();
                self.lock = false;
            });
        } else if (typeof dir == 'number') {
            // 把当前的图片索引值改变到了新的位置 接下来展示图片的索引值
            this.nowIndex = dir;
            $('ul', this.parent).animate({
                'left':-this.nowIndex * this.width
            }, this.animateTimer, function () {
                self.changeIndex();
                self.lock = false;
            });
        }
    }
    // 小红点展示
    Init.prototype.changeIndex = function () {
        $('.pointer > div', this.parent).css('background', '#fff');
        if (this.nowIndex == this.imgNum) {
            $('.pointer > div', this.parent).eq(0).css('background', 'red');
        } else {
            $('.pointer > div', this.parent).eq(this.nowIndex).css('background', 'red');
        }
    }
    Init.prototype.autoMove = function () {
        var self = this;
        this.timer = setInterval(function () {
            self.move('next');
        }, this.autoTime);
    }

    // $.fn.extend({

    // })

    $.fn.extend({
        swiper: function (options) {
            // 记录当前谁调用的swiper方法  即存储父级
            // console.log(this);
            options.parent = this;
            var swiper = new Init(options);
            return this;
        }
    });
} ());