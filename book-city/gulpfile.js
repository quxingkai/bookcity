var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var pageOne = require('./src/data/pageOne.json');
var home = require('./src/data/home.json');
var searchJson = require('./src/data/search.json');
var chapterListJson = require('./src/data/book/chapter-list.json');
var path = require('path');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
gulp.task('copyCss',function(){
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
});

gulp.task('default',['copyCss'],function(){
    gulp.src('src')
        .pipe(server({
            port:8989,
            // host:'169.254.5.127',
            open:true,
            livereload:true,
            middleware: function(req, res, next){
               
               if (req.url ==='/pageOne') {
                   res.end(JSON.stringify(home));
               }else if (req.url === '/booklist') {
                   res.end(JSON.stringify(pageOne));
               }else if (/\/api\/search/g.test(req.url)) {
                    var key = url.parse(req.url,true).query.value;
                    var arr = [];
                    var unkey = querystring.unescape(key);
                    searchJson.items.forEach(function(v,i){
                        if(v.title.match(unkey)){
                           arr.push(v);
                        } 
                }); 
                res.end(JSON.stringify(arr))              
               }else if(/\/api\/readbook/g.test(req.url)){
                   var fiction_id= url.parse(req.url,true).query.fiction_id;
                   var data = require('./src/data/'+fiction_id+'.json');
                   res.end(JSON.stringify(data));   
               }else if(/\/api\/catalog/g.test(req.url)){
                    var fiction_id= url.parse(req.url,true).query.fiction_id;
                    res.end(JSON.stringify(chapterListJson));   
               }else if(/\/api\/articleUrl/g.test(req.url)){
                   var fiction_id= url.parse(req.url,true).query.fiction_id;
                   var chapter_id = url.parse(req.url, true).query.chapter_id;
                   var data = require("./src/data/reader/data" + chapter_id + ".json");
                   res.end(JSON.stringify(data));
               }
               next();
            }
        }))
});

gulp.watch('src/scss/*.scss',['copyCss']);