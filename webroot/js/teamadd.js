$(function(){
    $(".close").click(function(){
        $(".addformteam").hide();
        window.location.reload();
    });
    //添加
    $(".add").click(function(){
        $(".addformteam").show();
        $(".addformteam tr:eq(0)").show();
        $(".addform img").hide();
        $(".addform input[name='teamId']").attr('readonly',false);//设置编号无法修改
        $(".addform input[name='teamId']").css('background',"white");
        var oFile=document.getElementById('file');
        oFile.onchange=function(){
                var reader = new FileReader();
                reader.readAsDataURL(oFile.files[0]);
             }
        // 正则表达式
        var regNumber = /[^0-9]/g;
        var regNumber20=/^(20)\d{8}$/;
        $("#sub").click(function(){
            var data=new FormData($("#teamAccount")[0]);
            // $(".team tr:gt(0)").each(function(){
                    if(data.get("teamName")!=""&&data.get("teamId")!=""){
                        // if(data.get("teamId")==$(this).children("td:eq(1)").text()){
                        //     alert("编号已存在！");
                        //     return false;
                        // }
                        if(data.get("teamId").length>2){
                            alert("编号过长！");
                            return false;
                        }else if(regNumber.test(data.get("teamId"))){
                            alert("编号必须为数字！");
                            return false;
                        }else if(!regNumber20.test(data.get("teamLeader"))){
                            alert("团队负责人必须以20开头的十位数字！");
                            return false;
                        }else if(data.get("teamDesc").length==0){
                            alert("团队简介不能为空！");
                            return false;
                        }else{
                        $.ajax({
                            type: "POST",
                            url: "/management/addTeam.action",
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
        $("input[name='team']:checked").each(function() {
            i++;
        });
        //选中单个时
        if(i==1){
            var changeIndex;
            $("input[name='team']:checked").each(function() {
                changeIndex=$(this).parent("td").parent("tr").index();
            });
            // 获取原来的数据并写入输入框
            var teamId=$(".team tbody tr:eq("+changeIndex+") td:eq(1)").text();
            var teamDesc=$(".team tbody tr:eq("+changeIndex+") textarea").val();
            var teamImagePath=$(".team tbody tr:eq("+changeIndex+") img").attr("src");//给后台
            if(teamImagePath==null){
                var teamImagePathnull="";
            }else{
                var teamImagePathnull=teamImagePath;
            }
            var teamLeader=$(".team tbody tr:eq("+changeIndex+")").children("td:eq(3)").text();
            var teamName=$(".team tbody tr:eq("+changeIndex+")").children("td:eq(2)").text();
            $(".addform textarea[name='teamDesc']").attr('value',teamDesc);
            $(".addform input[name='teamLeader']").attr('value',teamLeader);
            $(".addform input[name='teamName']").attr('value',teamName);
            $(".addform input[name='teamId']").attr('value',teamId);
            $(".addform input[name='teamId']").attr('readonly',true);//设置编号无法修改
            $(".addform input[name='teamId']").css('background',"grey");//设置无法修改的背景框为灰色
            $(".addform td[id='imageSpace'] img").replaceWith("<img style='float:left' src='"+teamImagePathnull+"' width='100px' height='100px'>");//回显图片
            // 显示表单
            $(".addformteam").show();
            // $(".addformteam tr:eq(0)").hide();
            //保存修改
            var regNumber = /[^0-9]/g;
            var regNumber20=/^(20)\d{8}$/;
            $("#sub").click(function(){
                var data=new FormData($("#teamAccount")[0]);
                data.append("imagePath",teamImagePath);
                        if(data.get("teamId").length>2){
                            alert("编号过长！");
                        }else if(regNumber.test(data.get("teamId"))){
                            alert("编号必须为数字！");
                        }else if(!regNumber20.test(data.get("teamLeader"))){
                            alert("团队负责人必须为开头为20的十位学号！");
                        }else if(data.get("teamDesc").length==0){
                            alert("团队简介不能为空！");
                        }else if(data.get("teamName")==""){
                            alert("团队名称不能为空！");
                        }else{
                            //   交互
                             $.ajax({
                                type: "POST",
                                url: "/management/updateTeam.action",
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