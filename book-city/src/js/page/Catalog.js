define(['jquery','text!lrstorybook','render','Handlebars','text!tblist','header'],function($,lrstorybook,render,Handlebars,tblist,header){
    var Catalog = function(){
        var fiction_id = location.search;
        console.log(fiction_id);
        $.ajax({
            url:'/api/catalog'+fiction_id,
            dataType:'json',
            success: function(res){
                // 渲染头部 把标题引入hander中
                header({title:res.item.title});
                console.log(res.item.toc);
                // 目录
                var data = res.item.toc;
                var oLi = '';
                $.each(data,function(i,v){
                    oLi+=`<li>${v.title}</li>`;
                });
                $('.bookCatalog').html(oLi);
            }
        })
    }
    return Catalog
})