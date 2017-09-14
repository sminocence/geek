$(function(){
    // //获取数据
    $.ajax({
        type: "get",
        url: "/findAllMasterpiece.action",
        success : function(data){
            if(data.flag===true){
                for(var i=0;i<data.object.length;i++){
                    var imagePath=data.object[i].imagePath;
                    var masterDesc=data.object[i].masterDesc;
                    var masterId=data.object[i].masterId;
                    var masterName=data.object[i].masterName;
                    var masterLink=data.object[i].masterLink;
                    if(masterLink==null){
                        masterLink="";
                    }
                    /*if(masterDesc.length>=10){
                        var masterDescMin=masterDesc.substring(0,10)+"...";
                    }else{
                        var masterDescMin=masterDesc;
                    }*/
                    if (imagePath != null && imagePath != ""){
                        var appendStr="<tr><td><input type='checkbox' name='master'></td><td>"+masterId+"</td><td>"+masterName+"</td><td><a href='"+ imagePath +"' target='_blank'><img src='"+imagePath+"' width='50px' height='50px'></a></td><td><textarea cols='20' rows='10' readonly='true'>"+masterDesc+"</textarea></td><td><a href='"+masterLink+"'>"+masterLink+"</a></td></tr>";
                    }else {
                        var appendStr="<tr><td><input type='checkbox' name='master'></td><td>"+masterId+"</td><td>"+masterName+"</td><td></td><td><textarea cols='20' rows='10' readonly='true'>"+masterDesc+"</textarea></td><td><a href='"+masterLink+"'>"+masterLink+"</a></td></tr>";
                    }
                    $(".master tbody").append(appendStr);
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
    /*//添加
    $(".add").live("click",function(){
        alert("一次只能添加一行数据，否则会出错！");
        if($(this).parent().next().find("table").attr("class")=="master") {
            $(this).parent().next().find("table").append("<tr><td><input type='checkbox' name='master'></td><td><input type='text' size='8' name='masterId'></td><td><input type='text' size='8' name='masterName'></td><td><input type='file' name='image'></td><td id='desc'><input type='button' value='编辑' class='editDesc'></td></tr>");
            // 保存添加
            $(".saveadd").live("click",function(){
                var n=0;
                var masterId=$("tr:last input:eq(1)").val();
                var masterName=$("tr:last input:eq(2)").val();
                $("tr:gt(0)").each(function(){
                    //var haveuserName=$(this).children("td:eq(1)").text();
                    if(masterName!=""&&masterId!=""){
                        if(masterId==$(this).children("td:eq(1)").text()) {
                            alert("编号已存在！");
                            return false;
                        }else{
                            $("tr:last input:eq(2)").replaceWith(masterName);
                            $("tr:last input:eq(1)").replaceWith(masterId);
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
        $("input[name='master']:checked").each(function() {
            i++;
        });
        if(i==0){
            alert("请先选中！");
        }else if(i==1){
            var co=confirm("删除后无法恢复，确定删除？");
            if(co){
                $(".master tbody tr").each(function(i){
                    var chk=$(this).find("input[type='checkbox']");
                    if(chk.attr("id")!="checkall"){//不能删除标题行
                        if(chk.attr("checked")){
                            var deleteMasterId=$(this).children("td:eq(1)").text();
                            $(this).remove();
                            //    交互
                            $.ajax({
                                type: "POST",
                                url: "/management/deleteMasterpiece.action",
                                data:{
                                    masterId: deleteMasterId
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
                var deleteMasterIdArray="";
                // =new Array();
                $(".master tbody tr").each(function(i){
                    var chk=$(this).find("input[type='checkbox']");
                    if(chk.attr("id")!="checkall"){//不能删除标题行
                        if(chk.attr("checked")){
                            var deleteMasterId=$(this).children("td:eq(1)").text();
                            if(deleteMasterId!=""){
                                //    交互
                                deleteMasterIdArray+=deleteMasterId+",";
                            }else{
                                $(this).remove();
                            }
                        }
                    }
                });
                deleteMasterIdArray=deleteMasterIdArray.substr(0,deleteMasterIdArray.lastIndexOf(","));
                 // alert(deleteMasterIdArray);
               $.ajax({
                    type: "POST",
                    url: "/management/deleteMasterpieces.action",
                    data:{
                        masterId:deleteMasterIdArray
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
        $("input[name='master']:checked").each(function() {
            i++;
        });
        //选中单个时
        if(i==1){
            var changeIndex;
            $("input[name='master']:checked").each(function() {
                changeIndex=$(this).parent("td").parent("tr").index();
            });
            var masterName=$("tbody tr:eq("+changeIndex+")").children("td:eq(2)").text();
            $("tbody tr:eq("+changeIndex+")").children("td:eq(2)").replaceWith("<td><input type='text' size='8' value="+masterName+"></td>");
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
/*    $(".editDesc").live('click',function(){
        $(".descBg").show();
        $(".desc").show();
        $("textarea").show();
        $(".exit").bind('click',function(event){
            $(".descBg").hide();
            $(".desc").hide();
            $("textarea").hide();
        });
    });*/
});
