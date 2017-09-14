$(function(){
     //获取数据
    $.ajax({
        type: "get",
        url: "/management/findAllTeam.action",
        success : function(data){
            if(data.flag===true){
                for(var i=0;i<data.object.length;i++){
                    var teamId=data.object[i].teamId;
                    var teamName=data.object[i].teamName;
                    var teamLeader=data.object[i].teamLeader;
                    var imagePath=data.object[i].imagePath;
                    var teamDesc=data.object[i].teamDesc;
                    /*if(teamDesc.length>=10){
                        var teamDescMin=teamDesc.substring(0,10)+"...";
                    }else{
                        var teamDescMin=teamDesc;
                    }*/
                    if (imagePath != null && imagePath != ""){
                        var appendStr="<tr><td><input type='checkbox' name='team'></td><td>"+teamId+"</td><td>"+teamName+"</td><td>"+teamLeader+"</td><td><a href='"+ imagePath +"' target='_blank'><img src='"+imagePath+"' width='50px' height='50px'></a></td><td><textarea readonly='true' cols='20' rows='10'>"+teamDesc+"</textarea></td></tr>";
                    }else {
                        var appendStr="<tr><td><input type='checkbox' name='team'></td><td>"+teamId+"</td><td>"+teamName+"</td><td>"+teamLeader+"</td><td></td><td><textarea readonly='true' cols='20' rows='10'>"+teamDesc+"</textarea></td></tr>";
                    }
                    $(".team tbody").append(appendStr);
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
  /*  $(".add").click(function(){
        var str="<tr><input type='checkbox' name='team'>"+
                "<form id='teamAccount' enctype='multipart/form-data'>"+
                    "<input type='text' size='8' name='teamId'>"+
                    "<input type='text' size='8' name='teamName'>"+
                    "<input type='text' size='8' name='teamLeader'>"+
                    "<input type='file' name='image' id='file'>"+
                    "<textarea cols='20' rows='10' name='teamDesc'></textarea>"+
                "</form></tr>";
        $("#tbody").append(str);
    });*/
    // //添加
    // $(".add").click(function(){
    //     alert("一次只能添加一行数据，否则会出错！");
    //     if($(this).parent().next().find("table").attr("class")=="team") {
    //         $(this).parent().next().find("table").append("<tr><td><input type='checkbox' name='team'></td>"+
    //             "<form id='teamAccount' enctype='multipart/form-data'>"+
    //                 "<td><input type='text' size='8' name='teamId'></td>"+
    //                 "<td><input type='text' size='8' name='teamName'></td>"+
    //                 "<td><input type='text' size='8' name='teamLeader'></td>"+
    //                 "<td><input type='file' name='image' id='file'></td>"+
    //                 "<td><textarea cols='20' rows='10' name='teamDesc'></textarea></td>"+
    //             "</form></tr>");
    //         var oFile=document.getElementById('file');
    //         oFile.onchange=function(){
    //             var reader = new FileReader();
    //             reader.readAsDataURL(oFile.files[0]);
    //         }
    //         // 保存添加
    //         $(".saveadd").click(function(){
    //        /*    var oTeamAccount=document.getElementById('teamAccount');*/
    //             var data=new FormData($("#teamAccount")[0]);
    //             /*console.log($("input[name='teamId']").val());
    //             return;*/
    //             console.log(data.get("teamId"),$("input[name='teamId']").val());
    //             return false;
    //             // alert(data);
    //             // var n=0;
    //             var teamId=$("tr:last input:eq(1)").val();
    //             var teamDesc=$("tr:last textarea").val();
    //             var teamDescMin=teamDesc.substring(0,10)+"...";
    //             var teamLeader=$("tr:last input:eq(3)").val();
    //             var teamName=$("tr:last input:eq(2)").val();
    //             $("tr:gt(0)").each(function(){
    //                 if(teamName!=""&&teamId!=""){
    //                     if(teamId==$(this).children("td:eq(1)").text()) {
    //                         alert("编号已存在！");
    //                         return false;
    //                     }else{
    //                         $("tr:last textarea").replaceWith(teamDescMin);
    //                         //$("tr:last input:eq(4)").replaceWith("<a href=''><img src=''></a>");
    //                         $("tr:last input:eq(3)").replaceWith(teamLeader);
    //                         $("tr:last input:eq(2)").replaceWith(teamName);
    //                         $("tr:last input:eq(1)").replaceWith(teamId);
    //                         // //交互
    //                         /*$.ajax({
    //                             type: "POST",
    //                             url: "/addTeam.action",
    //                             data:{
    //                                 teamId: teamId,
    //                                 teamLeader:teamLeader,
    //                                 teamName:teamName,
    //                                 teamDesc:teamDesc,
    //                                 image:data
    //                             },
    //                             data:data,
    //                             async:false,
    //                             cache:false,
    //                             contentType:false,
    //                             processData:false,
    //                             success: function (data) {
    //                                 if(data.flag===true){
    //                                     alert(data.message);
    //                                     window.location.reload();
    //                                 }else{
    //                                     alert(data.message);
    //                                     window.location.reload();
    //                                 }
    //                             },
    //                             error: function(XMLHttpRequest, textStatus, errorThrown) {
    //                                 alert(XMLHttpRequest.status);
    //                                 alert(XMLHttpRequest.readyState);
    //                                 alert(textStatus);
    //                                 window.location.reload();
    //                             }
    //                         });*/
    //                         return false;
    //                      }
    //                 }else{
    //                     alert("编号名称不得为空！");
    //                     return false;
    //                 }
    //             });
    //         });
    //     }
    // });
//  删除
    $(".del").click(function() {
        var i=0;
        $("input[name='team']:checked").each(function() {
            i++;
        });
        if(i==0){
            alert("请先选中！");
        }else if(i==1){
            var co=confirm("删除后无法恢复，确定删除？");
            if(co){
                $(".team tbody tr").each(function(i){
                    var chk=$(this).find("input[type='checkbox']");
                    if(chk.attr("id")!="checkall"){//不能删除标题行
                        if(chk.attr("checked")){
                            var deleteTeamId=$(this).children("td:eq(1)").text();
                            $(this).remove();
                            //    交互
                            $.ajax({
                                type: "POST",
                                url: "/management/deleteTeam.action",
                                data:{
                                    teamId:deleteTeamId
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
            }
        }else if(i>1){
            var co=confirm("删除后无法恢复，确定删除？");
                if(co){
                    var deleteTeamIdArray="";
                    // =new Array();
                    $(".team tbody tr").each(function(i){
                        var chk=$(this).find("input[type='checkbox']");
                        if(chk.attr("id")!="checkall"){//不能删除标题行
                            if(chk.attr("checked")){
                                var deleteTeamId=$(this).children("td:eq(1)").text();
                                if(deleteTeamId!=""){
                                    //    交互
                                    deleteTeamIdArray+=deleteTeamId+",";
                                }else{
                                    $(this).remove();
                                }
                            }
                        }
                    });
                    deleteTeamIdArray=deleteTeamIdArray.substr(0,deleteTeamIdArray.lastIndexOf(","));
                     // alert(deleteTeamIdArray);
                   $.ajax({
                        type: "POST",
                        url: "/management/deleteTeams.action",
                        data:{
                            teamId:deleteTeamIdArray
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
    // $(".change").click(function(){
    //     var i=0;
    //     //获取选中数目
    //     $("input[name='team']:checked").each(function() {
    //         i++;
    //     });
    //     //选中单个时
    //     if(i==1){
    //         var changeIndex;
    //         $("input[name='team']:checked").each(function() {
    //             changeIndex=$(this).parent("td").parent("tr").index();
    //         });
    //         // 获取原来的数据并写入输入框
    //         var teamDesc=$("tbody tr:eq("+changeIndex+")").children("td:eq(5)").text();
    //         //var teamImage=$("tbody tr:eq("+changeIndex+")").children("td:eq(4)").text();
    //         var teamLeader=$("tbody tr:eq("+changeIndex+")").children("td:eq(3)").text();
    //         var teamName=$("tbody tr:eq("+changeIndex+")").children("td:eq(2)").text();
    //         $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").replaceWith("<td><input type='text' size='8' value="+teamName+"></td>");
    //         $("tbody tr:eq("+changeIndex+")").children("td:eq(3)").replaceWith("<td><input type='text' size='8' value="+teamLeader+"></td>");
    //         $("tbody tr:eq("+changeIndex+")").children("td:eq(4)").append("<td><input type='file'  id='image' class='select' ></td>");
    //         $("tbody tr:eq("+changeIndex+")").children("td:eq(5)").replaceWith("<td><textarea cols='10' rows='10'>"+teamDesc+"</textarea></td>");
    //         //保存修改
    //         $(".savechange").click(function(){
    //             $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").replaceWith("<td>"+ $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").children("input").val()+"</td>");
    //             $("tbody tr:eq("+changeIndex+")").children("td:eq(3)").replaceWith("<td>"+ $("tbody tr:eq("+changeIndex+")").children("td:eq(3)").children("input").val()+"</td>");
    //             $("tbody tr:eq("+changeIndex+")").children("td:eq(4)").replaceWith("<td><a href=''><img src=''></a></td>");
    //             $("tbody tr:eq("+changeIndex+")").children("td:eq(5)").replaceWith("<td>"+ $("tbody tr:eq("+changeIndex+")").children("td:eq(5)").children("textarea").val().substring(0,10)+"..."+"</td>");
    //             //   交互
    //             $.ajax({
    //                 type: "POST",
    //                 url: "/updateTeam.action",
    //                 data:{
    //                     teamName: $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").children("input").val(),
    //                     teamLeader: $("tbody tr:eq("+changeIndex+")").children("td:eq(3)").children("input").val(),
    //                     teamId:$("tbody tr:eq("+changeIndex+")").children("td:eq(1)").text(),
    //                     teamDesc:$("tbody tr:eq("+changeIndex+")").children("td:eq(5)").children("textarea").val(),
    //                     imagePath:$("tbody tr:eq("+changeIndex+")").children("td:eq(4)").children("img").attr("src")
    //                 },
    //                 success: function (data) {
    //                     if(data.flag===true){
    //                         alert(data.message);
    //                         window.location.reload();
    //                     }else{
    //                         alert(data.message);
    //                         window.location.reload();
    //                     }
    //                 },
    //                 error: function(XMLHttpRequest, textStatus, errorThrown) {
    //                     alert(XMLHttpRequest.status);
    //                     alert(XMLHttpRequest.readyState);
    //                     alert(textStatus);
    //                     window.location.reload();
    //                 }
    //             });
    //             /*$.ajaxFileUpload({
    //                 url: '/updataTeam.action', //用于文件上传的服务器端请求地址
    //                 secureuri: false, //是否需要安全协议，一般设置为false
    //                 fileElementId: 'file', //文件上传域的ID
    //                 success: function (data) //服务器成功响应处理函数
    //                 {
    //                     $("img").attr("src", data.imgurl);
    //                     $("img").parent("a").attr("href", data.imgurl);
    //                     if(data.flag===true){
    //                         alert(data.message);
    //                         window.location.reload();
    //                     }else{
    //                         alert(data.message);
    //                         window.location.reload();
    //                     }
    //                 },
    //                 error: function (data, status, e)//服务器响应失败处理函数
    //                 {
    //                     alert(e);
    //                     window.location.reload();
    //                 }
    //             });*/
    //         });
    //     }else{
    //         alert("不能不选或同时修改多项！");
    //     }
    // });
//悬停变色
  /*  $("tr").live({
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
