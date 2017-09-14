$(function(){
    // //获取数据
     $.ajax({
        type: "get",
        url: "/management/findSuggestion.action",
        success : function(data){
            if(data.flag===true){
                for(var i=0;i<data.object.length;i++){
                    var phone=data.object[i].phone;
                    var time=data.object[i].time;
                    // console.log(time);
                    time=time.replace("T"," ");
                    time=time.substring(0,19);
                    var view=data.object[i].view;
                    /*if(view.length>=10){
                        var viewMin=view.substring(0,10)+"...";
                    }else{
                        var viewMin=view;
                    }*/
                    var appendStr="<tr><td><input type='checkbox' name='view'></td><td>"+phone+"</td><td>"+time+"</td><td><textarea cols='20' rows='10' readonly='true'>"+view+"</textarea></td></tr>";
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
    });
//  删除
    $(".del").click(function() {
        var i=0;
        $("input[name='view']:checked").each(function() {
            i++;
        });
        if(i==0){
            alert("请先选中！");
        }else if(i==1){
            var co=confirm("删除后无法恢复，确定删除？");
            if(co){
                $(".view tbody tr").each(function(i){
                    var chk=$(this).find("input[type='checkbox']");
                    if(chk.attr("id")!="checkall"){//不能删除标题行
                        if(chk.attr("checked")){
                            var deleteDate=$(this).children("td:eq(2)").text();
                            /*deleteDate=deleteDate.replace("T"," ");
                            deleteDate=deleteDate.substring(0,19);*/
                             // console.log(deleteDate);
                            $(this).remove();
                            //    交互
                            $.ajax({
                                type: "POST",
                                url: "/management/deleteSuggestion.action",
                                data:{
                                    time: deleteDate
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
                var deleteTimeArray="";
                // =new Array();
                $(".view tbody tr").each(function(i){
                    var chk=$(this).find("input[type='checkbox']");
                    if(chk.attr("id")!="checkall"){//不能删除标题行
                        if(chk.attr("checked")){
                            var deleteTime=$(this).children("td:eq(2)").text();
                            if(deleteTime!=""){
                                //    交互
                                deleteTimeArray+=deleteTime+",";
                            }else{
                                $(this).remove();
                            }
                        }
                    }
                });
                deleteTimeArray=deleteTimeArray.substr(0,deleteTimeArray.lastIndexOf(","));
                   alert(deleteTimeArray);
               $.ajax({
                    type: "POST",
                    url: "/management/deleteSuggestions.action",
                    data:{
                        time:deleteTimeArray
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

