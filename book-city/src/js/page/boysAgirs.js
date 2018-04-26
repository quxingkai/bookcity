define(['jquery'],function($){
    var fun = function(){
        $('.xiangzuo').on('click',function(){
            history.go(-1);
        });
    }
    return fun;
});