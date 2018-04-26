define(['jquery','render'],function($,render){
    var fun = function(){
        var arr = ['page/female.html','page/menfolk.html']
        $('.iconlist').on('click','a',function(){
            var ind = $(this).index();
           $(this).attr('href',arr[ind]);
        });
    }
    return fun;
})