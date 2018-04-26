define(function(){
    function getRequest(){
        var url = location.search;
        
        var params = {};

        if(url.indexOf('?')!=-1){
            var str = url.substr(1);
            var arr = str.split('&');

            for (var i= 0, len = arr.length;i<len; i++) {
                var obj = arr[i].split('=');
                params[obj[0]] = obj[1];
            }
        }
        return params;
    }
    return getRequest;
})