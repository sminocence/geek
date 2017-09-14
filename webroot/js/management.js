$(function(){
    // //初始化第一个页面显示
    // hide();
    // $(".handle:eq(0)").show();
    $(".buttonFirst").children().addClass("buttonBgFirst");
    // //隐藏handle
    // function hide(){
    //     $(".handle").hide();
    // }
    //点击左侧按钮显示相应的div
    $(".buttons .button").click(function(){
        var i=$(this).index();
        if(i==0){
            $(".buttonBg").removeClass("buttonBg a");
            $(".buttonBgFirst").removeClass("buttonBgFirst a");
            $(".buttonBgLast").removeClass("buttonBgLast a");
            $(this).children().addClass("buttonBgFirst a");
        }else if(i==6){
            $(".buttonBg").removeClass("buttonBg a");
            $(".buttonBgFirst").removeClass("buttonBgFirst a");
            $(".buttonBgLast").removeClass("buttonBgLast a");
            $(this).children().addClass("buttonBgLast a");
        }else{
            $(".buttonBg").removeClass("buttonBg a");
            $(".buttonBgFirst").removeClass("buttonBgFirst a");
            $(".buttonBgLast").removeClass("buttonBgLast a");
            $(this).children().addClass("buttonBg a");
        }
    });
    //全选全不选
    $(".manager input[type=checkbox]:eq(0)").click(function() {
        if (this.checked) {
            $(".manager input[type=checkbox]").each(function() { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", true);
            })
        }else {
            $(".manager input[type=checkbox]").each(function () { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", false);
            });
        }
    });
    $(".team input[type=checkbox]:eq(0)").click(function() {
        if (this.checked) {
            $(".team input[type=checkbox]").each(function() { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", true);
            })
        }else {
            $(".team input[type=checkbox]").each(function () { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", false);
            });
        }
    });
    $(".member input[type=checkbox]:eq(0)").click(function() {
        if (this.checked) {
            $(".member input[type=checkbox]").each(function() { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", true);
            })
        }else {
            $(".member input[type=checkbox]").each(function () { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", false);
            });
        }
    });
    $(".master input[type=checkbox]:eq(0)").click(function() {
        if (this.checked) {
            $(".master input[type=checkbox]").each(function() { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", true);
            })
        }else {
            $(".master input[type=checkbox]").each(function () { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", false);
            });
        }
    });
    $(".learn input[type=checkbox]:eq(0)").click(function() {
        if (this.checked) {
            $(".learn input[type=checkbox]").each(function() { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", true);
            })
        }else {
            $(".learn input[type=checkbox]").each(function () { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", false);
            });
        }
    });
    $(".join input[type=checkbox]:eq(0)").click(function() {
        if (this.checked) {
            $(".join input[type=checkbox]").each(function() { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", true);
            })
        }else {
            $(".join input[type=checkbox]").each(function () { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", false);
            });
        }
    });
    $(".view input[type=checkbox]:eq(0)").click(function() {
        if (this.checked) {
            $(".view input[type=checkbox]").each(function() { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", true);
            })
        }else {
            $(".view input[type=checkbox]").each(function () { //遍历所有的name为selectFlag的 checkbox
                $(this).attr("checked", false);
            });
        }
    });
    //控制底部位置
        if($(window).height()<=630){
            $(".footer").removeClass("footerPosition");
        }else if($(window).height()>630){
            $(".footer").addClass("footerPosition");
        }
    window.onresize=function(){
        if($(window).height()<=630){
            $(".footer").removeClass("footerPosition");
        }else if($(window).height()>630){
            $(".footer").addClass("footerPosition");
        }
    }
    // 注销
    $(".loginOrleave").click(function(){
        $.ajax({
        type: "POST",
        url: "/management/logout.action",
        success : function(data){
            if(data.flag===true){
                alert(data.message);
                window.location.href="login.html";
            }else{
                alert(data.message);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
    });
});
