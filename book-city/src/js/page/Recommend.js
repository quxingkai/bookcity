define(['jquery','Handlebars','text','text!lrRecommend','text!lrlist','text!free','render'],function($,Handlebars,text,lrRecommend,lrlist,free,render){
    var fun = function(){
        $.ajax({
            url:'/pageOne',
            success:function(data){
                var data = JSON.parse(data);
                var datas=data.items[2].data.data
                // console.log(data.items[2].data.data);
                // 重磅推荐
                $('#Gravity-recommendation').html(lrRecommend);
                Handlebars.registerHelper('isfirst',function(ind,options){
                    if(ind==0){
                        return options.fn(this);
                    }
                });
                Handlebars.registerHelper('billb',function(ind){
                        ind++;
                        return ind+1
                });
                Handlebars.registerHelper('isslice',function(ind,options){
                    if(ind<4){
                        return options.fn(this);
                    }
                })

                render('#gravity',datas,'#Gravity-recommendation');

                // 女生最爱
                var gData = data.items[3].data.data;
                $('#Girls-favorite').html(lrlist);
                render('#book-l-r-shelf',gData,'#Girls-favorite');
                // 男生最爱
                var bData = data.items[4].data.data;
                $('#boy-favorite').html(lrlist);
                render('#book-l-r-shelf',bData,'#boy-favorite');
                // 限时免费
                var fData = data.items[5].data.data;
                var arr = [];
                $.each(fData,function(i,v){
                    arr.push(v.data);
                });
                $('#Free-Admission').html(free);
                var source = $('#free').html();
                var template = Handlebars.compile(source);
                var html = template(arr);
                $('#Free-Admission').html(html);
                // render('#free',fData,'#Free-Admission');
            }
        })
    }
    return fun;
});