$(function(){
    // //获取数据
    $.ajax({
        type: "get",
        url: "/management/findAllLearn.action",
        success : function(data){
            if(data.flag===true){
                for(var i=0;i<data.object.length;i++){
                    var imagePath=data.object[i].imagePath;
                    var learnDesc=data.object[i].learnDesc;
                    var learnId=data.object[i].learnId;
                    var learnName=data.object[i].learnName;
                    var learnType=data.object[i].learnType;
                    var learnLink=data.object[i].learnLink;
                    if(learnLink==null){
                        learnLink="";
                    }
                    /*if(learnDesc.length>=10){
                        var learnDescMin=learnDesc.substring(0,10)+"...";
                    }else{
                        var learnDescMin=learnDesc;
                    }*/
                    if (imagePath != null && imagePath != ""){
                        var appendStr="<tr><td><input type='checkbox' name='learn'></td><td>"+learnId+"</td><td>"+learnName+"</td><td>"+learnType+"</td><td><a href='"+ imagePath +"' target='_blank'><img src='"+imagePath+"' width='50px' height='50px'></a></td><td><textarea cols='20' rows='10' readonly='true'>"+learnDesc+"</textarea></td><td><a href='"+learnLink+"'>"+learnLink+"</a></td></tr>";
                    }else {
                        var appendStr="<tr><td><input type='checkbox' name='learn'></td><td>"+learnId+"</td><td>"+learnName+"</td><td>"+learnType+"</td><td></td><td><textarea cols='20' rows='10' readonly='true'>"+learnDesc+"</textarea></td><td><a href='"+learnLink+"'>"+learnLink+"</a></td></tr>";
                    }
                    $(".learn tbody").append(appendStr);
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
   /* $(".add").live("click",function(){
        alert("一次只能添加一行数据，否则会出错！");
        if($(this).parent().next().find("table").attr("class")=="learn") {
            $(this).parent().next().find("table").append("<tr><td><input type='checkbox' name='learn'></td><td><input type='text' size='8' name='learnId'></td><td><input type='text' size='8' name='learnName'></td><td><input type='file' name='image'></td><td id='desc'><input type='button' value='编辑' class='editDesc'></td></tr>");
            // 保存添加
            $(".saveadd").live("click",function(){
                var n=0;
                var learnId=$("tr:last input:eq(1)").val();
                var learnName=$("tr:last input:eq(2)").val();
                $("tr:gt(0)").each(function(){
                    //var haveuserName=$(this).children("td:eq(1)").text();
                    if(learnName!=""&&learnId!=""){
                        if(learnId==$(this).children("td:eq(1)").text()) {
                            alert("编号已存在！");
                            return false;
                        }else{
                            $("tr:last input:eq(2)").replaceWith(learnName);
                            $("tr:last input:eq(1)").replaceWith(learnId);
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
                            //
                            // function GetJsonData() {
                            //     var json = {
                            //         "object":[{"password": password,"userName": userName}]
                            //     };
                            //     return json;
                            // }
                            return false;
                        }
                    }else{
                        alert("编号名称不得为空！");
                        return false;
                    }
                });
            });
        }
    });*/
//  删除
    $(".del").click(function() {
        var i=0;
        $("input[name='learn']:checked").each(function() {
            i++;
        });
        if(i==0){
            alert("请先选中！");
        }else if(i==1){
            var co=confirm("删除后无法恢复，确定删除？");
            if(co){
                $(".learn tbody tr").each(function(i){
                    var chk=$(this).find("input[type='checkbox']");
                    if(chk.attr("id")!="checkall"){//不能删除标题行
                        if(chk.attr("checked")){
                             var deleteLearnId=$(this).children("td:eq(1)").text();
                            $(this).remove();
                            //    交互
                            $.ajax({
                                type: "POST",
                                url: "/management/deleteLearn.action",
                                data:{
                                    learnId: deleteLearnId
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
                var deleteLearnIdArray="";
                // =new Array();
                $(".learn tbody tr").each(function(i){
                    var chk=$(this).find("input[type='checkbox']");
                    if(chk.attr("id")!="checkall"){//不能删除标题行
                        if(chk.attr("checked")){
                            var deleteLearnId=$(this).children("td:eq(1)").text();
                            if(deleteLearnId!=""){
                                //    交互
                                deleteLearnIdArray+=deleteLearnId+",";
                            }else{
                                $(this).remove();
                            }
                        }
                    }
                });
                deleteLearnIdArray=deleteLearnIdArray.substr(0,deleteLearnIdArray.lastIndexOf(","));
                  // alert(deleteLearnIdArray);
               $.ajax({
                    type: "POST",
                    url: "/management/deleteLearns.action",
                    data:{
                        learnId:deleteLearnIdArray
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
   /* $(".change").click(function(){
        var i=0;
        //获取选中数目
        $("input[name='learn']:checked").each(function() {
            i++;
        });
        //选中单个时
        if(i==1){
            var changeIndex;
            $("input[name='learn']:checked").each(function() {
                changeIndex=$(this).parent("td").parent("tr").index();
            });
            var learnName=$("tbody tr:eq("+changeIndex+")").children("td:eq(2)").text();
            $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").replaceWith("<td><input type='text' size='8' value="+learnName+"></td>");
            //保存修改
            $(".savechange").click(function(){
                $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").replaceWith("<td>"+ $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").children("input").val()+"</td>");
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
//  图片按钮
//     $(".picView").live('click',function(){
//         alert();
//         $(".picBg").show();
//         $(".desc").show();
//         $(".exit").bind("click",function(){
//             $(".picBg").hide();
//             $(".desc").hide();
//         })
//     });
//     $(".select").live('click',function(){
//     });
//    简介按钮
    $(".editDesc").live('click',function(){
        $(".descBg").show();
        $(".desc").show();
        $("textarea").show();
        $(".exit").bind('click',function(event){
            $(".descBg").hide();
            $(".desc").hide();
            $("textarea").hide();
        });
    });
});
