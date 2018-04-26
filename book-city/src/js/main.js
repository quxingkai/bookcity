require.config({
    baseUrl:"/js/",
    paths:{
        // 工具
        "jquery":"libs/jquery-2.1.1.min",
        "Handlebars":"libs/handlebars-v4.0.11",
        "swiper":"libs/swiper.min",
        "text":"libs/text",
        "jsonp":"libs/jquery.jsonp",
        "base64":"libs/jquery.base64",
        // util
        "render":"page/render",
        "search":"page/search",
        "header":"util/header",
        "storage":"util/localStorage", // 本次缓存配置
        "getRequest":"util/getRequest",
        // 书籍单页
        "index":"page/index",
        "pageOne":"page/pageOne", // 第一页js页面渲染
        "Recommend":"page/Recommend", // 重磅推荐
        "boysAgirs":"page/boysAgirs", // 进入男生女生专栏区
        "iconlistonclick":"page/iconlistonclick", // 点击男生女生
        "readbook":"page/readbook", // 进入书的简介区
        "Catalog":"page/Catalog",   // 书的目录详情
        "article":"page/article",   // 书的内容区
        // 模板
        "tblist":"../page/tpl/t-b-list.html",
        "lrlist":"../page/tpl/l-r-list.html",
        "lrRecommend":"../page/tpl/l-r-Recommend.html",
        "free":"../page/tpl/free.html",
        "lrsearch":"../page/tpl/l-r-search.html",
        "headertpl":"../page/tpl/header.html",
        "lrstorybook":"../page/tpl/l-r-storybook.html"
    }
});