//# -*- coding: utf-8 -*-

//main io 页面初始化
$(function(){

    //诗词全集btnNav==>
    $("#nav-header-id-shici").click(function(){

        $(this).addClass("active");
        $("#nav-header-id-book").removeClass("active");

        //诗词名句 -- 古籍名句
        $("#header-random-text-shici").removeClass("egs-nav-invisible");
        $("#header-random-text-book").addClass("egs-nav-invisible");

        //诗词body -- 古籍body
        $("#mainbody-shici").removeClass("egs-nav-invisible");
        $("#mainbody-book").addClass("egs-nav-invisible");

        //背景色==诗词
        $("body").css("background-color","#f2f5e9");

        //清除
        $("#search-btn-id").removeClass("active");
        $("#search-btn-id .fa-search").removeClass("fa-remove");
        $("#search-box-id-shici").removeClass("active");
        $("#search-box-id-book").removeClass("active");
    });

    //古典书籍btnNav==>
    $("#nav-header-id-book").click(function(){

        $(this).addClass("active");
        $("#nav-header-id-shici").removeClass("active");

        //诗词名句 -- 古籍名句
        $("#header-random-text-shici").addClass("egs-nav-invisible");
        $("#header-random-text-book").removeClass("egs-nav-invisible");

        //诗词body -- 古籍body
        $("#mainbody-shici").addClass("egs-nav-invisible");
        $("#mainbody-book").removeClass("egs-nav-invisible");

        //背景色==书籍
        $("body").css("background-color","rgb(249, 252, 249)");

        //清除
        $("#search-btn-id").removeClass("active");
        $("#search-btn-id .fa-search").removeClass("fa-remove");
        $("#search-box-id-shici").removeClass("active");
        $("#search-box-id-book").removeClass("active");
    });

    //搜索按钮searchBtn==>
    $("#search-btn-id").click(function(){

        if($("#mainbody-shici").hasClass("egs-nav-invisible")){
            //书籍

            if($(this).hasClass("active"))
            {

                $(this).removeClass("active");
                $("#search-btn-id .fa-search").removeClass("fa-remove");
                $("#search-box-id-book").removeClass("active");
            }
            else
            {

                $(this).addClass("active");
                $("#search-btn-id .fa-search").addClass("fa-remove");
                $("#search-box-id-book").addClass("active");
            }


        }
        else{

            //诗词
            if($(this).hasClass("active"))
            {

                $(this).removeClass("active");
                $("#search-btn-id .fa-search").removeClass("fa-remove");
                $("#search-box-id-shici").removeClass("active");
            }
            else
            {

                $(this).addClass("active");
                $("#search-btn-id .fa-search").addClass("fa-remove");
                $("#search-box-id-shici").addClass("active");
            }
        }
    });

    //遮罩层，点击就让set消失&&快捷搜索框---hide
    $("#bg-mask").click(function(){

       $("#bg-mask").css("display","none");
        $(".result-box-all").css("display","none");
    });

});



/********************诗词全库:快速搜索********************/

var int_interval, text_input,is_shici_search,is_book_search;

//==诗词，快捷搜索框---show
function focusShiciSearchBox()
{
    is_shici_search = true;
    $(".result-box-all").css("display","block");
    $("#bg-mask").css("display","block");

    if("undefined" == typeof int_interval
    || 0 == int_interval)
        int_interval = setInterval('searchByAjax()',2000);
}

//==诗词，快捷搜索框---show
function focusBookSearchBox()
{
    is_book_search = true;

    $(".result-box-all").css("display","block");
    $("#bg-mask").css("display","block");

    if("undefined" == typeof int_interval
    || 0 == int_interval)
        int_interval = setInterval('searchByAjax()',2000);
}

//==诗词，stop定时器
function blurSearchBox()
{
    clearInterval(int_interval);
    int_interval = 0;

    $("#search-input-shici").attr("value","");
    is_shici_search = false;

     $("#search-input-book").attr("value","");
     is_book_search = false;
}

//==诗词，快捷索引搜索
function searchByAjax()
{
    if (is_shici_search) {

        var newInputTemp = $("#search-input-shici").val();

        if (text_input != newInputTemp
            && newInputTemp != 0
            && "undefined" != typeof newInputTemp) {

            text_input = newInputTemp;
            var urlstr = "/api/getpoem/?size=15&keyword=" + text_input;
            $.get(urlstr, function (data, status, result) {

                var objJSON = $.parseJSON(data);
                var resulthtml = "";

                $.each(objJSON, function (i, item) {

                    var titleWithTag = "<span style=\" color:#275F38; font-weight:bold;\">"+text_input+"</span>";
                    var rawTitle = item.title;
                    var newTitle = rawTitle.replace(text_input,titleWithTag);

                    resulthtml += "<div class=\"r-section\"><div class=\"mleft\"><span>诗词</span></div><div class=\"mright\"><div   style=\"background-color: rgb(251, 250, 246);\"><a target='_blank' class=\"adiv\" href=\"/poem/" + item.id + "/\">" + newTitle +"<span class=\"small\">"+"---" +item.dynasty+"『"+item.author+"』"+"</span>"+ " </a></div></div></div>";
                });

                resulthtml = '<div class=\"result-box\" >' + resulthtml + '</div>';


                $("#result-box-shici").html(resulthtml);

            });


        }
    }
    else if (is_book_search) {

        var newInputTemp = $("#search-input-book").val();

        if (text_input != newInputTemp
            && newInputTemp != 0
            && "undefined" != typeof newInputTemp) {

            text_input = newInputTemp;
            var urlstr = "/api/getbook/?size=15&keyword=" + text_input;

            $.get(urlstr, function (data, status, result) {

                var objJSON = $.parseJSON(data);
                var resulthtml = "";

                $.each(objJSON, function (i, item) {
                    var titleWithTag = "<span style=\" color:#275F38; font-weight:bold;\">"+text_input+"</span>";
                    var rawTitle = item.title;
                    var newTitle = rawTitle.replace(text_input,titleWithTag);

                    resulthtml += "<div class=\"r-section\"><div class=\"mleft\"><span>古书</span></div><div class=\"mright\"><div   style=\"background-color: rgb(251, 250, 246);\"><a target='_blank' class=\"adiv\" href=\"/book/" + item.id + "/\">" + newTitle + "---"+"<span class=\"small\">"+"『"+item.author+"』"+"</span>"+ " </a></div></div></div>";
                });

                resulthtml = '<div class=\"result-box\" >' + resulthtml + '</div>';


                $("#result-box-book").html(resulthtml);

            });


        }

    }


}