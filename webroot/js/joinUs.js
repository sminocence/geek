$(function(){     
    //姓名验证
    var ok1 = false;
    var ok2 = false;
    var ok3 = false;
    var ok4 = false;
    $("#userName").blur(function(){
        if($(this).val() == ''){
            $("#name_info").text("姓名不能为空").css("color","red").css("font-size","12px");
        }
        else{
            if(!$(this).val().match(/^[\u4e00-\u9fa5]{2,4}$/i)){
                $("#name_info").text("姓名格式不正确").css("color","red").css("font-size","12px");
            }
            else{
                $("#name_info").text('格式正确').css("color","red").css("font-size","12px");
                ok1 = true;
            }
        }
    })
    //学号验证
    $("#userId").blur(function(){
        if ($(this).val() == ''){
            $("#id_info").text("学号不能为空").css("color","red").css("font-size","12px");
        }
        else{
            if(/^\d{10}$/.test($(this).val()) == false) {
                $("#id_info").text("学号格式不正确").css("color","red").css("font-size","12px");
            }
            else{
                $("#id_info").text('格式正确').css("color","red").css("font-size","12px");
                ok2 = true;
            }
        }
    })
    //手机号验证
    $("#userPhone").blur(function(){
        if ($(this).val() == ''){
            $("#phone_info").text("手机号不能为空").css("color","red").css("font-size","12px");
        }
        else{
            if(/^0?1[3|4|5|8][0-9]\d{8}$/.test($(this).val()) == false) {
                $("#phone_info").text("手机号格式不正确").css("color","red").css("font-size","12px");
            }
            else{
                $("#phone_info").text('格式正确').css("color","red").css("font-size","12px");
                ok3 = true;
            }
        }
    })
    //邮箱验证
    $("#userEmail").blur(function () {
        if ($(this).val() == ''){
            $("#email_info").text("邮箱不能为空").css("color","red").css("font-size","12px");
        }
        else{
            if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(this).val()) == false) {
                $("#email_info").text("邮箱格式不正确").css("color","red").css("font-size","12px");
            }
            else{
                $("#email_info").text('格式正确').css("color","red").css("font-size","12px");
                ok4 = true;
            }
        }
    })
    //发送请求
    $(".submit #submit").click(function(){
        if(ok1 && ok2 && ok3 && ok4){
            $.ajax({
                type:"post",
                url: "/addJoin.action",
                data:{
                    joinEmail:$('#userEmail').val(),
                    joinId:$('#userId').val(),
                    joinName:$('#userName').val(),
                    joinPhone:$('#userPhone').val()
                },
                success:function(data){
                    $(".submit #reset").click();
                    alert(data.message);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                   // alert("无网络哦！亲");
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
                }
            });
        }
        else{
            alert("请完善你的信息！");
        }    
    });
});