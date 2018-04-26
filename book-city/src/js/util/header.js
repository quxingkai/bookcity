define(['jquery','render','text!headertpl','header'],function($,render,headertpl,header){
    var renderHeader = function (obj){
        $('.render-header').html(headertpl);
        render('#header-tpl',obj,'.render-header');
        $('.xiangzuo').on('click',function(){
            history.go(-1);
        });
    }
    return renderHeader;
});