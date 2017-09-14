$(function(){
        //控制footer位置
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
        $('.submit').click(function() {
            $.ajax({
                type: "post",
                data:{
                    password: $('#password').val(),
                    userName: $('#userName').val()
                },
                url: "/login.action",
                success : function(data){
                    if(data.flag===true) {
                        window.location.href="management.jsp";
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