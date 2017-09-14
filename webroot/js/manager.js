$(function(){
    //获取数据
    $.ajax({
        type: "get",
        url: "/management/findAllUser.action",
        success : function(data){
            if(data.flag===true){
                for(var i=0;i<data.object.length;i++){
                    var userName=data.object[i].userName;
                    var password=data.object[i].password;
                    $("tbody").append("<tr><td><input type='checkbox' name='manager'></td><td>"+userName+"</td><td>"+password+"</td></tr>");
                }
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
    //添加
    $(".add").one("click",function(){
        alert("一次只能添加一行数据，否则会出错！");
        if($(this).parent().next().find("table").attr("class")=="manager") {
            $(this).parent().next().find("table").append(
                "<tr>" +
                "<td><input type='checkbox' name='manager'></td>" +
                "<td><input type='text' size='10' name='userName' placeholder='6-12位英文数字'></td>" +
                "<td><input type='text' size='10' name='password' placeholder='6-12位英文数字特殊字符'></td>" +
                "</tr>"
            );
            // 保存添加
            var regUsername=/^[0-9a-zA-Z]{6,12}$/g;
            var regPassword=/^[0-9a-zA-Z\x21-\x7e]{6,12}$/g;
            $(".saveadd").click(function(){
                var n=0;
                var userName=$("tr:last input:eq(1)").val();
                var password=$("tr:last input:eq(2)").val();
                $("tr:gt(0)").each(function(){
                    if(userName!=""&&password!=""){
                        if(userName==$(this).children("td:eq(1)").text()) {
                            alert("用户名已存在！");
                            return false;
                        }else if(!regUsername.test(userName)){
                            alert("用户名必须是6-12位英文数字！");
                            return false;
                        }else if(!regPassword.test(password)){
                            alert("密码必须是6-12位英文数字特殊字符！");
                            return false;
                        }else{
                            $("tr:last input:eq(2)").replaceWith(password);
                            $("tr:last input:eq(1)").replaceWith(userName);
                            //交互
                                $.ajax({
                                type: "POST",
                                url: "/management/addUser.action",
                                data:{
                                    password: password,
                                    userName: userName
                                },
                                success: function (data) {
                                    if(data.flag===true){
                                        alert(data.message);
                                        window.location.reload();
                                    }else{
                                        alert(data.message);
                                        window.location.reload();
                                    }
                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    alert(XMLHttpRequest.status);
                                    alert(XMLHttpRequest.readyState);
                                    alert(textStatus);
                                    window.location.reload();
                                }
                            });
                            return false;
                        }
                    }else{
                        alert("用户名密码不得为空！");
                        return false;
                    }
                 });
            });
        }
    });
//  删除
    $(".del").click(function() {
            var i=0;
            $("input[name='manager']:checked").each(function() {
                i++;
            });
            if(i==0){
                alert("请先选中！");
            }else if(i==1){
                var co=confirm("删除后无法恢复，确定删除？");
                if(co){
                    $(".manager tbody tr").each(function(i){
                        var chk=$(this).find("input[type='checkbox']");
                        if(chk.attr("id")!="checkall"){//不能删除标题行
                            if(chk.attr("checked")){
                                var deleteUserName=$(this).children("td:eq(1)").text();
                                $(this).remove();
                                if(deleteUserName!=""){
                                    //    交互
                                    $.ajax({
                                        type: "POST",
                                        url: "/management/deleteUser.action",
                                        data:{
                                            userName: deleteUserName
                                        },
                                        success: function (data) {
                                            if(data.flag===true){
                                                alert(data.message);
                                                window.location.reload();
                                            }else{
                                                alert(data.message);
                                                window.location.reload();
                                            }
                                        },
                                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                                            alert(XMLHttpRequest.status);
                                            alert(XMLHttpRequest.readyState);
                                            alert(textStatus);
                                            window.location.reload();
                                        }
                                    });
                                }else{
                                    window.location.reload();
                                }
                            }
                        }
                    });
                }
            }else if(i>1){
                var co=confirm("删除后无法恢复，确定删除？");
                if(co){
                    var deleteUserNameArray="";
                    // =new Array();
                    $(".manager tbody tr").each(function(i){
                        var chk=$(this).find("input[type='checkbox']");
                        if(chk.attr("id")!="checkall"){//不能删除标题行
                            if(chk.attr("checked")){
                                var deleteUserName=$(this).children("td:eq(1)").text();
                                if(deleteUserName!=""){
                                    //    交互
                                    deleteUserNameArray+=deleteUserName+",";
                                }else{
                                    $(this).remove();
                                }
                            }
                        }
                    });
                    deleteUserNameArray=deleteUserNameArray.substr(0,deleteUserNameArray.lastIndexOf(","));
                    // alert(deleteUserNameArray);
                   $.ajax({
                        type: "POST",
                        url: "/management/deleteUsers.action",
                        data:{
                            userName: deleteUserNameArray
                        },
                        success: function (data) {
                            if(data.flag===true){
                                alert(data.message);
                                window.location.reload();
                            }else{
                                alert(data.message);
                                window.location.reload();
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest.status);
                            alert(XMLHttpRequest.readyState);
                            alert(textStatus);
                            window.location.reload();
                        }
                    });
                }
            }
    });
//    修改
    $(".change").click(function(){
        var i=0;
        //获取选中数目
        $("input[name='manager']:checked").each(function() {
            i++;
        });
        //选中单个时
        if(i==1){
            var changeIndex;
            $("input[name='manager']:checked").each(function() {
                changeIndex=$(this).parent("td").parent("tr").index();
            });
             $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").replaceWith("<td><input type='text' size='8' placeholder='6-12位英文数字特殊字符'></td>");
             //保存修改
             var regPassword=/^[0-9a-zA-Z\x21-\x7e]{6,12}$/g;
             $(".savechange").click(function(){
                 var updataUserName=$("tbody tr:eq("+changeIndex+")").children("td:eq(1)").text();
                 var updataPassword=$("tbody tr:eq("+changeIndex+")").children("td:eq(2)").children("input").val();
                 if(!regPassword.test(updataPassword)){
                    alert("密码必须是6-12位英文数字特殊字符！");
                 }else{
                        $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").replaceWith("<td>"+ $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").children("input").val()+"</td>");
                        //   交互
                        $.ajax({
                         type: "POST",
                         url: "/management/updateUser.action",
                         data:{
                             userName: updataUserName,
                             password: updataPassword
                         },
                         success: function (data) {
                             if(data.flag===true){
                                 alert(data.message);
                                 window.location.reload();
                             }else{
                                 alert(data.message);
                                 window.location.reload();
                             }
                         },
                         error: function(XMLHttpRequest, textStatus, errorThrown) {
                             alert(XMLHttpRequest.status);
                             alert(XMLHttpRequest.readyState);
                             alert(textStatus);
                             window.location.reload();
                         }
                     });
                 }
             });
        }else{
            alert("不能不选或同时修改多项！");
        }
    });
//悬停变色
 /*   $("tr").live({
        mouseenter:
            function()
            {
                $(this).css("background","#D8E4F9");
            },
        mouseleave:
            function()
            {
                $(this).css("background","white");
            }
    });*/
});
