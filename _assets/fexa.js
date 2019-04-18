require(['gitbook', 'jquery'], function(gitbook, $) {
    var configs;
    var apiUrl = "/api/product/withFavorite";
    var defaultPath = "https://tfuse.bingosoft.net";
    //生成内容导航
    function generateSectionNavigator(){
        $(".page-inner .markdown-section").find("h1,h2,h3").each(function(){
            var cls="anchor-h1";
            if($(this).is("h2")){
                cls="anchor-h2";
            }
            if($(this).is("h3")){
                cls="anchor-h3";
            }
            var text = $(this).text();
            var href = $(this).attr("id");
            $(".book-anchor-body").append("<a id='an_"+text+"' class='anchor-text "+cls+"' title='"+text+"'  href='#"+href+"'>"+text+"</a>")
        });

        $(".book-anchor-body>a").click(function(){
            $(".book-anchor-body>a").removeClass("selected");
            $(this).addClass("selected");
        });

        //获取hash值定向到指定位置
        var hash = decodeURIComponent(location.hash);
        if(hash){
            hash = hash.substring(1);
            $("#an_"+hash).addClass("selected");
        }
    }

    //基础设置
    function setBaseLayout(){
        //标题
        var $title = $(".header-inner .title");
        $title.text(gitbook.state.config.title);

        //搜索框
        var $searchIcon = $("#searchIcon");
        var $search = $('#book-search-input');
        var $searchInput = $search.find("input");
        var placeholder = configs.pluginsConfig["theme-fexa"]["search-placeholder"] || "输入关键字搜索"
        $searchInput.attr("placeholder",placeholder);
        $searchIcon.click(function(e){
            $search.fadeIn();
            $searchIcon.hide();
            $searchInput.focus();
        });
        $searchInput.blur(function(e) {
            $search.hide();
            $searchIcon.fadeIn();
        });

        var $homeIcon = $("#homeIcon");
        $homeIcon.click(function(e){
            location.href = "/";
        });

        //去掉gitbook-link
        $(".summary .gitbook-link").hide();
        $(".summary .divider").hide();
    }

    function tryFetchConfig(url){
        var code = configs.code;
        var nav = configs.variables["themeFexa"].nav;
        
        //如果没有控制台的配置就不发请求
        var consoleObj = nav.filter(function(item){
            return item.type == "console";
        });
        if(consoleObj.length<=0)return;
        
        $.ajax({
            url:url,
            success:function(data){
                var obj = data.filter(function(item){
                    return item.code == code;
                });
                if(obj.length>0){
                    $(".console").click(function(e){
                        window.open(obj[0].url);
                    })
                }
            },
            error:function(err){
                if(err.status==404){
                    url = defaultPath+apiUrl;
                    tryFetchConfig(url);
                }
            }
        });
    }

    gitbook.events.on('start', function() {
       
    });

    gitbook.events.on('page.change', function() {
        configs = gitbook.state.config;
        setBaseLayout();
        generateSectionNavigator();
        try{
            tryFetchConfig(apiUrl);
        }catch(err){
            console.log(err);
        }
    });
});
