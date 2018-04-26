define(function(){
        var storage = window.localStorage;

        storageApi = {
           set: function(key, val){
                if(val === undefined){
                    this.remove(key);
                }
                storage.setItem(key,JSON.stringify(val));
           },
           get: function(key){
                var val = JSON.parse(storage.getItem(key));
                return val;
           },
           remove: function(key){
               storage.removeItem(key);
           },
           clear: function(){
               storage.clear();
           }
        }
    return storageApi;
})