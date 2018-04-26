define(['jquery','swiper','Handlebars','text!tblist','text!lrlist','render'],function($,swiper,Handlebars,tblist,lrlist,render){
    var fn = function(){
        var mySwiper = new Swiper('.bookBan');
        $('.btnBook').on('click','span',function(){
                var ind = $(this).index();
                $(this).addClass('bg').siblings().removeClass('bg');
                mySwiper.slideTo(ind);
        });
        // 获取上下结构，banner图，左右结构的数据
        $.ajax({
            url:"/pageOne",
            success: function(data){
               var data = JSON.parse(data);
               getBanner(data.items[0].data.data);
               $('#tb-list').html(tblist);
               render('#book-t-b-list', data.items[1].data.data,'#tb-list');
               $('#t-b-shelf').html(tblist);
               // 判断下标如果小于3才返回，大于就不返回了；
               Handlebars.registerHelper('tagsMax',function(ind,options){
                     if(ind<3){
                         return options.fn(this);
                     }
               });
               Handlebars.registerHelper('issix',function(ind,options){
                     if(ind<5){
                         return options.fn(this);
                     }
               });
               render('#book-t-b-list', data.items[1].data.data,'#t-b-shelf');
               $('#lrbookshelf').html(lrlist);
               render('#book-l-r-shelf',data.items[1].data.data,'#lrbookshelf');
            }
        });
        // 初始化banner并且渲染到页面
        function getBanner(data){
            render('#tplBan',data,'#bookbanners');
            new Swiper('.bookBanner',{
                autoplay:1000,
                loop:true,
                pagination:'.swiper-page'
            });
        }
        // 获取list男生女生数据
        function geticonlist(){
            $.ajax({
                url:'/booklist',
                success:function(data){
                    var data = JSON.parse(data);
                    render('#iconlist',data.iconList,'.iconlist');
                }
            }) 
        }
        geticonlist();

        $('.icon-switch').on('click',function(){
            $('#t-b-shelf').toggle();
            $('.book-l-r-list').toggle();
        });

    }
    
    return fn;
});