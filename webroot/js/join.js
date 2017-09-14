$(function(){
    // //获取数据
  $.ajax({
        type: "get",
        url: "/management/findJoin.action",
        success : function(data){
            if(data.flag===true){
                for(var i=0;i<data.object.length;i++){
                    var joinName=data.object[i].joinName;
                    var joinPhone=data.object[i].joinPhone;
                    var joinEmail=data.object[i].joinEmail;
                    var joinId=data.object[i].joinId;
                    var appendStr="<tr><td><input type='checkbox' name='join'></td><td>"+joinName+"</td><td>"+joinPhone+"</td><td>"+joinEmail+"</td><td>"+joinId+"</td></tr>";
                    $("tbody").append(appendStr);
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
    });;
//  删除
   $(".del").click(function() {
        var i=0;
        $("input[name='join']:checked").each(function() {
            i++;
        });
        if(i==0){
            alert("请先选中！");
        }else if(i==1){
            var co=confirm("删除后无法恢复，确定删除？");
            if(co){
                $(".join tbody tr").each(function(i){
                    var chk=$(this).find("input[type='checkbox']");
                    if(chk.attr("id")!="checkall"){//不能删除标题行
                        if(chk.attr("checked")){
                             var deleteJoinId=$(this).children("td:eq(4)").text();
                            $(this).remove();
                            //    交互
                            $.ajax({
                                type: "POST",
                                url: "/management/deleteJoin.action",
                                data:{
                                    joinId: deleteJoinId
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
                var deleteJoinIdArray="";
                // =new Array();
                $(".join tbody tr").each(function(i){
                    var chk=$(this).find("input[type='checkbox']");
                    if(chk.attr("id")!="checkall"){//不能删除标题行
                        if(chk.attr("checked")){
                            var deleteJoinId=$(this).children("td:eq(4)").text();
                            if(deleteJoinId!=""){
                                //    交互
                                deleteJoinIdArray+=deleteJoinId+",";
                            }else{
                                $(this).remove();
                            }
                        }
                    }
                });
                deleteJoinIdArray=deleteJoinIdArray.substr(0,deleteJoinIdArray.lastIndexOf(","));
                   alert(deleteJoinIdArray);
               $.ajax({
                    type: "POST",
                    url: "/management/deleteJoins.action",
                    data:{
                        joinId:deleteJoinIdArray
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
//悬停变色
/*    $("tr").live({
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
