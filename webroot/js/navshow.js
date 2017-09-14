$(document).ready(function(){
    //获取电脑屏幕的大小
    var Width=$(window).width()+ "px";
    var Height=$(window).height()+ "px";
    var listen = (($(window).height()) - 280)/2 + "px";
    $(".daohang_in_box").css("margin-top",listen);
	$(".body_img").css("width",Width);
    $(".body_img").css("height",Height);
    $(".box").css("width",Width);
    $(".box").height(Height).width(0).hide();  

    //评估图曾
    $(".nav_in").click(function(event){
    	//console.log("sd");
    	$(".box").show().animate({'width':Width}, 800);
    	
    });
    $(".xiaotu").click(function(event){
    	//console.log("sd");
    	$(".box").show().animate({'width':Width}, 800);   	
    });


    //第一颗心变色
    $(".star_box #heart1").each(function(index,element){
        $(element).unbind('click').click(function(event){
            var index = $(this).index();
            /*console.log(index);*/
            $(this).addClass("change");
        }).dblclick(function(event){
            var index = $(this).index();
            $(this).removeClass("change");
        });
    })

    //第2颗心变色
    $(".star_box #heart2").each(function(index,element){
        $(element).unbind('click').click(function(event){
            var index = $(this).index();
            /*console.log(index);*/
            $(this).addClass("change");
        }).dblclick(function(event){
            var index = $(this).index();
            $(this).removeClass("change");
        });
    })

    //第3颗心变色
    $(".star_box #heart3").each(function(index,element){
        $(element).unbind('click').click(function(event){
            var index = $(this).index();
            /*console.log(index);*/
            $(this).addClass("change");
        }).dblclick(function(event){
            var index = $(this).index();
            $(this).removeClass("change");
        });
    })
    //第4颗心变色
    $(".star_box #heart4").each(function(index,element){
        $(element).unbind('click').click(function(event){
            var index = $(this).index();
           /* console.log(index);*/
            $(this).addClass("change");
        }).dblclick(function(event){
            var index = $(this).index();
            $(this).removeClass("change");
        });
    })

    //第5颗心变色
    $(".star_box #heart5").each(function(index,element){
        $(element).unbind('click').click(function(event){
            var index = $(this).index();
           /* console.log(index);*/
            $(this).addClass("change");
        }).dblclick(function(event){
            var index = $(this).index();
            $(this).removeClass("change");
        });
    })

    //判断是否是5心
    $(".button_in").unbind('click').click(function(){
        if($(".star_box #heart1").attr("class") == "change" && 
            $(".star_box #heart2").attr("class") == "change" &&
            $(".star_box #heart3").attr("class") == "change" &&
            $(".star_box #heart4").attr("class") == "change" &&
            $(".star_box #heart5").attr("class") == "change"){
            //console.log("huying");
            window.location.href="index.html";
        }else{
            alert('亲！给个五"心"好评吧');
            return;
        }
    });
         
    //没载入页面自动刷新一次
    if (location.href.indexOf("?xyz=")<0){
        location.href=location.href+"?xyz="+Math.random();
    }
})
