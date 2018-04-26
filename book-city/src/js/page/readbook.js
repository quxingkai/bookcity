define(['jquery','text!lrstorybook','render','Handlebars','text!tblist'],function($,lrstorybook,render,Handlebars,tblist){
    var readBook = function(){
       var fiction_id = location.search;
       if(fiction_id.indexOf('?')!=-1){
        fiction_id = fiction_id.split('?')[1];
        var objArr = {};
        fiction_id.split('=');
        objArr.fiction_id=fiction_id.split('=')[1];
        
        $.ajax({
            url:'/api/readbook?'+ fiction_id,
            success:function(res){
               var data = JSON.parse(res);
               getStoryBook(data.item);
               getauthorbooks(data.author_books);
            }
        });
       }
    
       // 点击最近更新进入目录详情
       $('#storybook').on('click','.Newest',function(){
             $(this).attr('href','Catalog.html?'+fiction_id);
       });

       // 点击开始阅读进入书目
       $('#storybook').on('click','.beginRead',function(){
            var chapter_id = 1;
            window.location.href = "article.html?"+fiction_id + "&chapter_id=" + chapter_id;
       });


       // 得到书的详细信息
       function getStoryBook(data){
        console.log(data);
        Handlebars.registerHelper('istrue',function(bool){
            if(bool){
                return '已完结';
            }else{
                return '连载中'
            }
        });
        Handlebars.registerHelper('numwords',function(num){
            var num = num / 10000;
            return num +'万';
        });
        $('#storybook').html(lrstorybook);
        render('#storybook-tpl',data,'#storybook');
       }
       // 作者其他书数据
       function getauthorbooks(data){
            $('#tb-storybook').html(tblist);
            render('#book-t-b-list',data,'#tb-storybook');
       }
    }
    return readBook
})