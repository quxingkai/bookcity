define(['jquery','Handlebars','render','text!lrsearch','storage'],function($,Handlebars,render,lrsearch,storage){
    var fun= function(){
        var arr = [];
        var _bookname = storage.get('bookname') || [];
        $('.icon-left').on('click',function(){
            history.go(-1);
        });

        $('.btn').on('click',function(){
            var txt = $('.searchBook').val();
            _bookname = storage.set('bookname',txt);
            arr.push(txt);
            gethistory();
            if(!txt){
                $("#searchBooks").hide();
                $('.btnbook').show();
                return;
            }
            $('.btnbook').hide();
            getSearch(txt);
        });

        function gethistory(){
            var oLi = '';
            for(var i=0;i<arr.length;i++){
                oLi += `<li>${arr[i]}</li>`
            }
            $('.btnbook').append(oLi);
        }

        $('.searchBook').on('keyup',function(){
            if($(this).val()===''){
                $("#searchBooks").hide();
                $('.btnbook').show();
            }
        });

        $('.btnbook').on('click','li',function(){
            var txt = $(this).text();
            $('.searchBook').val(txt);
            getSearch(txt);
            $(this).parent().hide();
        });

        function getSearch(txt){
            $.ajax({
                url:"/api/search?value="+txt,
                dataType:'json',
                success:function(data){
                    $("#searchBooks").show();
                    if(data.length>0){
                        console.log(data);
                        $('#searchBooks').html(lrsearch);
                        render('#search-top',data,'#searchBooks');
                    }else{
                        $('#searchBooks').html('<li>暂无数据</li>');
                    }

                }
            });
            
        }
        // input搜索框搜索事件
        // $(".searchBook").on('keyup',function(){
        //     var txt = $(this).val();
        //     if(!$(this).val()){
        //         $('.btnbook').show();
        //         $("#searchBooks").hide();
        //         return;
        //     }
        //     $('.btnbook').hide();
        //     getSearch(txt);
        // });
    }
    return fun;
});