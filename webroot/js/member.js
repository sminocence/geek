$(function(){
    // //获取数据
    $.ajax({
        type: "get",
        url: "/management/findAllMember.action",
        success : function(data){
            if(data.flag===true){
                for(var i=0;i<data.object.length;i++){
                    var memberName=data.object[i].memberName;
                    var memberTeam=data.object[i].memberTeam;
                    var memberPhone=data.object[i].memberPhone;
                    var memberId=data.object[i].memberId;
                    var memberGradu=data.object[i].memberGradu;
                    var memberGrade=data.object[i].memberGrade;
                    var memberDesc=data.object[i].memberDesc;
                    var imagePath=data.object[i].imagePath;
                    /*if(memberDesc.length>=10){
                        var memberDescMin=memberDesc.substring(0,10)+"...";
                    }else{
                        var memberDescMin=memberDesc;
                    }*/
                    if (imagePath != null && imagePath != ""){
                        var appendStr="<tr><td><input type='checkbox' name='member'></td><td>"+memberName+"</td><td>"+memberPhone+"</td><td>"+memberId+"</td><td>"+memberGrade+"</td><td>"+memberTeam+"</td><td>"+memberGradu+"</td><td><a href='"+ imagePath +"' target='_blank'><img src='"+imagePath+"' width='50px' height='50px'></a></td><td><textarea cols='20' rows='10' readonly='true'>"+memberDesc+"</textarea></td></tr>";
                    }else {
                        var appendStr="<tr><td><input type='checkbox' name='member'></td><td>"+memberName+"</td><td>"+memberPhone+"</td><td>"+memberId+"</td><td>"+memberGrade+"</td><td>"+memberTeam+"</td><td>"+memberGradu+"</td><td></td><td><textarea cols='20' rows='10' readonly='true'>"+memberDesc+"</textarea></td></tr>";
                    }
                    $(".member tbody").append(appendStr);
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
    /*$(".add").click(function(){
        alert("一次只能添加一行数据，否则会出错！");
        if($(this).parent().next().find("table").attr("class")=="member") {
            var str="<tr><td><input type='checkbox' name='member'></td> <td><input type='text'></td> <td><input type='text'></td> <td><input type='text'></td> <td><input type='text'></td> <td><input type='text'></td> <td><input type='text'></td> <td><input type='file'></td><textarea cols='20' rows='10'></textarea></tr>";
            $(this).parent().next().find("table").append(str);
            // 保存添加
            $(".saveadd").click(function(){
                // var n=0;
                var memberName=$("tr:last input:eq(1)").val();
                var memberPhone=$("tr:last input:eq(2)").val();
                var memberId=$("tr:last input:eq(3)").val();
                var memberGrade=$("tr:last input:eq(4)").val();
                var memberTeam=$("tr:last input:eq(5)").val();
                var memberGradu=$("tr:last input:eq(6)").val();
                $("tr:gt(0)").each(function(){
                    //var haveuserName=$(this).children("td:eq(1)").text();
                    if(memberName!=""&&memberId!=""){
                        if(memberId==$(this).children("td:eq(3)").text()) {
                            alert("学号已存在！");
                            return false;
                        }else{
                            $("tr:last input:eq(6)").replaceWith(memberGradu);
                            $("tr:last input:eq(5)").replaceWith(memberTeam);
                            $("tr:last input:eq(4)").replaceWith(memberGrade);
                            $("tr:last input:eq(3)").replaceWith(memberId);
                            $("tr:last input:eq(2)").replaceWith(memberPhone);
                            $("tr:last input:eq(1)").replaceWith(memberName);
                            // //交互
                            // $.ajax({
                            //     type: "POST",
                            //     url: "js/manager.json",
                            //     contentType: "application/json; charset=utf-8",
                            //     data: JSON.stringify(GetJsonData()),
                            //     dataType: "json",
                            //     success: function (data) {
                            //         if(data.flag=="true"){
                            //             alert(data.message);
                            //         }else{
                            //             alert(data.message);
                            //         }
                            //     },
                            //     error: function () {
                            //         alert("添加失败！");
                            //     }
                            // });

                            // function GetJsonData() {
                            //     var json = {
                            //         "object":[{"password": password,"userName": userName}]
                            //     };
                            //     return json;
                            // }
                            // return false;
                         }
                    }else{
                        alert("姓名学号不得为空！");
                        return false;
                    }
                });
            });
        }
    });*/
//  删除
    $(".del").click(function() {
        var i=0;
        $("input[name='member']:checked").each(function() {
            i++;
        });
        if(i==0){
            alert("请先选中！");
        }else if(i==1){
            var co=confirm("删除后无法恢复，确定删除？");
            if(co){
                $(".member tbody tr").each(function(i){
                    var chk=$(this).find("input[type='checkbox']");
                    if(chk.attr("id")!="checkall"){//不能删除标题行
                        if(chk.attr("checked")){
                            var deleteMemberId=$(this).children("td:eq(3)").text();
                            $(this).remove();
                            //    交互
                            $.ajax({
                                type: "POST",
                                url: "/management/deleteMember.action",
                                data:{
                                    memberId: deleteMemberId
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
                var deleteMemberIdArray="";
                // =new Array();
                $(".member tbody tr").each(function(i){
                    var chk=$(this).find("input[type='checkbox']");
                    if(chk.attr("id")!="checkall"){//不能删除标题行
                        if(chk.attr("checked")){
                            var deleteMemberId=$(this).children("td:eq(3)").text();
                            if(deleteMemberId!=""){
                                //    交互
                                deleteMemberIdArray+=deleteMemberId+",";
                            }else{
                                $(this).remove();
                            }
                        }
                    }
                });
                deleteMemberIdArray=deleteMemberIdArray.substr(0,deleteMemberIdArray.lastIndexOf(","));
                 // alert(deleteMemberIdArray);
               $.ajax({
                    type: "POST",
                    url: "/management/deleteMembers.action",
                    data:{
                        memberId:deleteMemberIdArray
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
    /*$(".change").click(function(){
        var i=0;
        //获取选中数目
        $("input[name='member']:checked").each(function() {
            i++;
        });
        //选中单个时
        if(i==1){
            var changeIndex;
            $("input[name='member']:checked").each(function() {
                changeIndex=$(this).parent("td").parent("tr").index();
            });
            $("tbody tr:eq("+changeIndex+")").children("td:eq(1)").replaceWith("<td><input type='text' size='8'></td>");
            $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").replaceWith("<td><input type='text' size='8'></td>");
            $("tbody tr:eq("+changeIndex+")").children("td:eq(4)").replaceWith("<td><input type='text' size='8'></td>");
            $("tbody tr:eq("+changeIndex+")").children("td:eq(5)").replaceWith("<td><input type='text' size='8'></td>");
            $("tbody tr:eq("+changeIndex+")").children("td:eq(6)").replaceWith("<td><input type='text' size='8'></td>");
            //保存修改
            $(".savechange").click(function(){
                $("tbody tr:eq("+changeIndex+")").children("td:eq(1)").replaceWith("<td>"+ $("tbody tr:eq("+changeIndex+")").children("td:eq(1)").children("input").val()+"</td>");
                $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").replaceWith("<td>"+ $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").children("input").val()+"</td>");
                $("tbody tr:eq("+changeIndex+")").children("td:eq(4)").replaceWith("<td>"+ $("tbody tr:eq("+changeIndex+")").children("td:eq(4)").children("input").val()+"</td>");
                $("tbody tr:eq("+changeIndex+")").children("td:eq(5)").replaceWith("<td>"+ $("tbody tr:eq("+changeIndex+")").children("td:eq(5)").children("input").val()+"</td>");
                $("tbody tr:eq("+changeIndex+")").children("td:eq(6)").replaceWith("<td>"+ $("tbody tr:eq("+changeIndex+")").children("td:eq(6)").children("input").val()+"</td>");
                //   交互
            });
        }else{
            alert("不能不选或同时修改多项！");
        }
    });*/
//         var changeIndex=0;
//         var password="";
//         $("tr:gt(0)").children("td:eq(2)").click(function(){
//             changeIndex=$(this).parent("tr").index();
//             alert(changeIndex);
//             $(this).replaceWith("<td><input type='text' size='8'></td>");
//             password=$("tr:eq("+changeIndex+") input:eq(1)").val();
//         });
//         $(".change").click(function(){
//             $("tr:eq("+changeIndex+")").children("td:eq(2)").replaceWith("<td>"+password+"</td>");
//         });
//搜索
        $(".searchMember").click(function(){
            var findVal=$(".findInput").val();
            $(".member tbody tr").hide().filter(":contains('"+findVal+"')").show();
            if($(".member tbody tr:visible").length==0){
                alert("没有找到结果！");
            }
        });
//悬停变色
    /*$("tr").live({
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
