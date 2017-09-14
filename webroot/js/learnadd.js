$(function(){
    $(".close").click(function(){
        $(".addformlearn").hide();
        window.location.reload();
    });
    //添加
    $(".add").click(function(){
        $(".addformlearn").show();
        $(".addformlearn tr:eq(0)").show();
        $(".addform img").hide();
        $(".addform input[name='learnId']").attr('readonly',false);//设置编号无法修改
        $(".addform input[name='learnId']").css('background',"white");
        var oFile=document.getElementById('file');
        oFile.onchange=function(){
                var reader = new FileReader();
                reader.readAsDataURL(oFile.files[0]);
        }
        var regNumber=/^\d{1,4}$/g;
        $("#sub").click(function(){
            var data=new FormData($("#learnAccount")[0]);
            // $(".learn tr:gt(0)").each(function(){
                    if(data.get("learnName")!=""&&data.get("learnId")!=""){
                        // if(data.get("learnId")==$(this).children("td:eq(1)").text()) {
                        //     alert("编号已存在！");
                        //     return false;
                        // }else
                        if(!regNumber.test(data.get("learnId"))){
                            alert("编号必须为1-4位数字！");
                            return false;
                        }else if(data.get("learnDesc").length==0){
                            alert("简介不得为空！");
                            return false;
                        }else if(data.get("learnType").length==0){
                            alert("类型不得为空！");
                            return false;
                        }else{
                        $.ajax({
                            type: "POST",
                            url: "/management/addLearn.action",
                            data:data,
                            async:false,
                            cache:false,
                            contentType:false,
                            processData:false,
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
                    alert("编号名称不得为空");
                    return false;
                }
            // });
        });
    });
    //修改
    $(".change").click(function(){
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
            // 获取原来的数据并写入输入框
            var learnId=$(".learn tbody tr:eq("+changeIndex+") td:eq(1)").text();
            var learnDesc=$(".learn tbody tr:eq("+changeIndex+") textarea").val();
            var learnImagePath=$(".learn tbody tr:eq("+changeIndex+") img").attr("src");//给后台
            if(learnImagePath==null){
                var learnImagePathnull="";
            }else{
                var learnImagePathnull=learnImagePath;
            }
            var learnName=$(".learn tbody tr:eq("+changeIndex+")").children("td:eq(2)").text();
            var learnType=$(".learn tbody tr:eq("+changeIndex+")").children("td:eq(3)").text();
            var learnLink=$(".learn tbody tr:eq("+changeIndex+")").children("td:eq(6)").text();
            $(".addform textarea[name='learnDesc']").attr('value',learnDesc);
            $(".addform input[name='learnName']").attr('value',learnName);
            $(".addform input[name='learnType']").attr('value',learnType);
            $(".addform input[name='learnLink']").attr('value',learnLink);
            $(".addform input[name='learnId']").attr('value',learnId);
            $(".addform input[name='learnId']").attr('readonly',true);//设置编号无法修改
            $(".addform input[name='learnId']").css('background',"grey");//设置无法修改的背景框为灰色
            $(".addform td[id='imageSpace'] img").replaceWith("<img style='float:left' src='"+learnImagePathnull+"' width='100px' height='100px'>");//回显图片
            // 显示表单
            $(".addformlearn").show();
            // $(".addformlearn tr:eq(0)").hide();
            //保存修改
            $("#sub").click(function(){
                var data=new FormData($("#learnAccount")[0]);
                data.append("imagePath",learnImagePath);
                data.append("newId",learnId);
                data.append("oldId",learnId);
                //   交互
                if(data.get("learnName").length==0){
                    alert("名称不得为空！");
                }else if(data.get("learnDesc").length==0){
                    alert("简介不得为空！");
                }else if(data.get("learnType").length==0){
                    alert("类型不得为空！");
                }else{
                    $.ajax({
                        type: "POST",
                        url: "/management/updateLearn.action",
                        data:data,
                        async:false,
                        cache:false,
                        contentType:false,
                        processData:false,
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
});