define(['jquery','storage','jsonp','getRequest','base64'],function($,storage,jsonp,getRequest,base64){
    var article = function(){
        // 获取fiction_id 和 chapter_id 
        var fiction_id = getRequest().fiction_id;
        var chapter_id = getRequest().chapter_id;

        console.log(fiction_id,chapter_id);
        var _setBg = storage.get('style_bg') || '#f7eee5' ; // 背景
        var _setSize = storage.get('style_size') || 14 / 37.5 * 1 + 'rem'; // 字大小
        var top_set = $('.top-set'); // 顶部返回
        var bot_set = $('.bot-set'); // 底部设置
        var set_style = $('.set-style'); // 字体样式
        var mask = $('.mask');

        // 页面初始化设置
        initStyle()
        function initStyle(){
            getJson(fiction_id,chapter_id);
            $('.details').css('background-color',_setBg);
            $('p').css('font-size',_setSize);
        }

        // 点击读书内容页面显示出设置栏
        $('.details').on('click',function(){
            top_set.show();
            bot_set.show();
            mask.show();
        });

        // 点击遮罩层隐藏
        mask.on('click',function(){
            top_set.hide();
            bot_set.hide();
            set_style.hide();
            mask.hide();
        });

        // 点击显示出设置面板
        $('.size').on('click',function(){
            set_style.toggle();
            $(this).toggleClass("active");
        });

        // 点击变大字体
        var initsize = 14;
        $('.large-btn').on('click',function(){
            if(initsize<24){
                initsize+=2;
            }
            _setSize = initsize / 37.5 * 1 + 'rem'
            storage.set('style_size',_setSize);
            $('p').css('font-size', _setSize);
        });

        // 点击变小字体
        $('.small-btn').on('click',function(){
            if(initsize>12){
                initsize-=2;
            }
            _setSize = initsize / 37.5 * 1 + 'rem'
            storage.set('style_size',_setSize);
            $('p').css('font-size', _setSize);
        });

        // 切换背景图片
        $('.bg-list').on('click','li',function(){
            _setBg = $(this).attr('bg-color');
            storage.set('style_bg',_setBg);
            $('.details').css('background-color',_setBg);
        });

        // 点击切换下一章
        $('.nextBtn').on('click',function(){
            if(chapter_id<4){
                chapter_id ++;
                console.log(chapter_id);
            }
            getJson(fiction_id,chapter_id);
            storage.set("chapter_id", chapter_id);
            initStyle();
        });

        // 点击切换上一章
        $('.prveBtn').on('click',function(){
            if(chapter_id > 1){
                chapter_id --;
            }
            getJson(fiction_id,chapter_id);
            storage.set("chapter_id", chapter_id);
            initStyle();
        })
        
        // 获取书的内容jsonp获取
        function getJson(fiction_id,chapter_id){
            $.ajax({
                url:"/api/articleUrl/?fiction_id="+fiction_id+'&chapter_id='+chapter_id,
                dataType: 'json',
                success: function(data){
                    getJSONP(data.jsonp);
                }
            })
        }

        function getJSONP(url){
            jsonp({
                url:url,
                cache: true,
                callback: "duokan_fiction_chapter",
                success:function(data){
                    var data = base64.decode(data);
                    var articalJson = decodeURIComponent(escape(data));
                    var parseArtical = JSON.parse(articalJson);
                    console.log(parseArtical);
                    var oP = '<h1>'+parseArtical.t+'</h1>';
                    parseArtical.p.forEach(function(v,i){
                        oP += '<p>'+v+'</p>';
                    });
                    $('.details').html(oP);
                    initStyle();
                }
            })
        }
    }
    return article;
});