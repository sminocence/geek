$(function(){
    $(".close").click(function(){
        $(".addformmaster").hide();
        window.location.reload();
    });
    //添加
    $(".add").click(function(){
        $(".addformmaster").show();
        $(".addformmaster tr:eq(0)").show();
        $(".addform img").hide();
        $(".addform input[name='masterId']").attr('readonly',false);//设置编号无法修改
        $(".addform input[name='masterId']").css('background',"white");
        var oFile=document.getElementById('file');
        oFile.onchange=function(){
                var reader = new FileReader();
                reader.readAsDataURL(oFile.files[0]);
             } 
        var regNumber=/^\d{1,4}$/g;
        $("#sub").click(function(){
            var data=new FormData($("#masterAccount")[0]);
            // $(".master tr:gt(0)").each(function(){
                    if(data.get("masterName")!=""&&data.get("masterId")!=""){
                        // if(data.get("masterId")==$(this).children("td:eq(1)").text()) {
                        //     alert("编号已存在！");
                        //     return false;
                        // }else
                        if(data.get("masterDesc").length==0){
                            alert("简介不得为空！");
                            return false;
                        }else if(!regNumber.test(data.get("masterId"))){
                            alert("编号必须为1-4位数字！");
                            return false;
                        }else{
                        $.ajax({
                            type: "POST",
                            url: "/management/addMasterpiece.action",
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
                	alert("编号名称不得为空！");
                    return false;
                }
             // });
        });
    });
    //修改
    $(".change").click(function(){
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
            // 获取原来的数据并写入输入框
            var masterId=$(".master tbody tr:eq("+changeIndex+") td:eq(1)").text();
            var masterDesc=$(".master tbody tr:eq("+changeIndex+") textarea").val();
            var masterLink=$(".master tbody tr:eq("+changeIndex+")").children("td:eq(5)").text();
            var masterImagePath=$(".master tbody tr:eq("+changeIndex+") img").attr("src");//给后台
            if(masterImagePath==null){
                var masterImagePathnull="";
            }else{
                var masterImagePathnull=masterImagePath;
            }
            var masterName=$(".master tbody tr:eq("+changeIndex+")").children("td:eq(2)").text();
            $(".addform textarea[name='masterDesc']").attr('value',masterDesc);
            $(".addform input[name='masterName']").attr('value',masterName);
            $(".addform input[name='masterLink']").attr('value',masterLink);
            $(".addform input[name='masterId']").attr('value',masterId);
            $(".addform input[name='masterId']").attr('readonly',true);//设置编号无法修改
            $(".addform input[name='masterId']").css('background',"grey");//设置无法修改的背景框为灰色
            $(".addform td[id='imageSpace'] img").replaceWith("<img style='float:left' src='"+masterImagePathnull+"' width='100px' height='100px'>");//回显图片
            // 显示表单
            $(".addformmaster").show();
            // $(".addformmaster tr:eq(0)").hide();
            //保存修改
            var regNumber=/^\d{1,4}$/g;
            $("#sub").click(function(){
                var data=new FormData($("#masterAccount")[0]);
                data.append("imagePath",masterImagePath);
                //   交互
                if(data.get("masterDesc").length==0){
                    alert("简介不得为空！");
                }else if(data.get("masterName").length==0){
                    alert("名称不得为空！");
                }else{
                    $.ajax({
                        type: "POST",
                        url: "/management/updateMasterpiece.action",
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