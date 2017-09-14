$(window).resize(function(){
    location.reload();
});
$(document).ready(function(){
    var i=0;
    var setInter;
    var speen=3000;
    var index=0;

    //获取电脑屏幕的大小
    var Width=$(window).width()+'px';
    var Height=$(window).height()+'px';

    //导航动画
    $(".Logonav").css("display","none");
    $(window).scroll(function(){
        $(".Logonav").slideDown(800);
    });
    $("#Index").mouseover(function(){
        $(".Logonav").slideUp();
    });
    $(".Logonav").mouseover(function(){
        $(".Logonav").stop();
    });

    $("#Index").css("width",Width);
    $("#Index").css("height",Height);
    $("#pictrue img").css("width",Width);
    $("#pictrue img").css("height",Height);
    $(".Logonav").css("width",Width);

    //轮播效果
    $("#bbon li").each(function(index,element){
        //鼠标移上小圆点切换图片
     	$(element).mouseover(function(event){
	        var index = $(this).index();//获取小圆点的索引值
	        $("#pictrue img")
	            .eq(index)
	            .fadeIn()
	            .siblings()
	            .hide();
	        $(this)
	            .addClass("oon")
	            .siblings()
	            .removeClass("oon");
        });
        //鼠标点击小圆点切换图片及自动切换图片
        $(element).click(function(){
	        i = index;//获取索引值
	        $(this)
	            .addClass("oon")
	            .siblings()
	            .removeClass("oon");
	        $("#pictrue img")
	            .eq(index)
	            .animate({opacity:"show"},800)
	            .siblings()
	            .animate({opacity:"hide"},800);
        })  //每300毫秒切换一次
            $(element).hover(function(){//hover事件
                clearInterval(setInter);
                    },function(){
                outPlay();//自动播放函数
            });
        })
        
        //索引不同的图片
        out_fun = function(){
            var listLen=$("#bbon li").length;
            if(i < listLen){
              	i++;
            }else{
              	i = 0;
            };
                $("#bbon li")
                    .eq(i)
                    .addClass("oon")
                    .siblings()
                    .removeClass("oon");
                $("#pictrue img")
                    .eq(i)
                    .animate({opacity:"show"},800)
                    .siblings()
                    .animate({opacity:"hide"},800);//自动动画函数
        }
        
        //自动播放函数
        outPlay = function(){
            setInter = setInterval("out_fun()",speen);//设置定时器
        }
        
        outPlay();//调用自动播放函数

        //点击左右按钮切换图片
        $(".arrow").click(function(){       
            var listLen=$("#bbon li").length;//获取索引个数
            if(i < listLen){
              	i++;
            }else{
              	i=0;
            };
            $("#bbon li")
                .eq(i)
                .addClass("oon")
                .siblings()
                .removeClass("oon");
            $("#pictrue img")
                .eq(i)
                .fadeIn()
                .siblings()
                .hide();
        });


        //工作室简介
        /*$(".Home_describe").css("width",Width);
        $(".Home_describe").css("height",Height);
        */

        
        //部门介绍
        /*$(".our_team").css("width",Width);
        $(".our_team").css("height",Height);*/

        //作品展示
       /* $(".works_show").css("width",Width);
        $(".works_show").css("height",Height);*/

        //学习家园
        /*$(".learn_town").css("width",Width);
        $(".learn_town").css("height",Height);*/

        //成员介绍
        /*$(".member_describe").css("width",Width);
        $(".member_describe").css("height",Height);*/

        //毕业去向
        /*$(".graduate_go").css("width",Width);
        $(".graduate_go").css("height",Height);*/

        //加入我们
        /*$(".join_us").css("width",Width);
        $(".join_us").css("height",Height);*/

    //没载入页面自动刷新一次
    if (location.href.indexOf("?xyz=")<0){
        location.href=location.href+"?xyz="+Math.random();
    }
});

     
    