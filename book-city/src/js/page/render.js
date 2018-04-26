define(['jquery','Handlebars'],function($,Handlebars){
    var fun = function(idSource,data,classList){
        console.log(data);
        var source = $(idSource).html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $(classList).html(html);
    }
    return fun;
});