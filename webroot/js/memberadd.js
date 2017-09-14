$(function(){
    $(".close").click(function(){
        $(".addform").hide();
        window.location.reload();
    });
	//添加
    $(".add").click(function(){
        $(".addform").show();
        $(".addformmember tr:eq(0)").show();
        $(".addform img").hide();
        $(".addform input[name='oldId']").attr('readonly',false);//设置编号可以修改
        $(".addform input[name='oldId']").css('background',"white");
        var oFile=document.getElementById('file');
        oFile.onchange=function(){
                var reader = new FileReader();
                reader.readAsDataURL(oFile.files[0]);
             }
        var regGrade=/^\d{4}$/g;
        var regNumber20=/^(20)\d{8}$/;
        var regPhone=/^1[34578]\d{9}$/;
        $("#sub").click(function(){
            var data=new FormData($("#memberAccount")[0]);
            var memberId=data.get("oldId");
            data.append("memberId",memberId);
            data.delete("oldId");
            // $(".member tr:gt(0)").each(function(){
                    if(data.get("memberName")!=""&&data.get("oldId")!=""){
                        /*if(data.get("oldId")==$(this).children("td:eq(3)").text()) {
                            alert("编号已存在！");
                            return false;
                        }else*/ if(!regNumber20.test(memberId)){
                            alert("编号必须为20开头的十位学号！");
                            return false;
                        }else if(!regGrade.test(data.get("memberGrade"))){
                            alert("年级必须为四位数字！");
                            return false;
                        }else if(!regPhone.test(data.get("memberPhone"))){
                            alert("请输入正确的电话！");
                            return false;
                        }else if(data.get("memberTeam").length==0){
                            alert("团队不得为空！");
                            return false;
                        }else if(data.get("memberDesc").length==0){
                            alert("简介不得为空！");
                            return false;
                        }else{
                        $.ajax({
                            type: "POST",
                            url: "/management/addMember.action",
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
        $("input[name='member']:checked").each(function() {
            i++;
        });
        //选中单个时
        if(i==1){
            var changeIndex;
            $("input[name='member']:checked").each(function() {
                changeIndex=$(this).parent("td").parent("tr").index();
            });
            // 获取原来的数据并写入输入框
            var memberId=$(".member tbody tr:eq("+changeIndex+") td:eq(3)").text();
            var memberDesc=$(".member tbody tr:eq("+changeIndex+") textarea").val();
            var memberImagePath=$(".member tbody tr:eq("+changeIndex+") img").attr("src");//给后台
            if(memberImagePath==null){
                var memberImagePathnull="";
            }else{
                var memberImagePathnull=memberImagePath;
            }
            var memberName=$(".member tbody tr:eq("+changeIndex+")").children("td:eq(1)").text();
            var memberPhone=$(".member tbody tr:eq("+changeIndex+")").children("td:eq(2)").text();
            var memberGrade=$(".member tbody tr:eq("+changeIndex+")").children("td:eq(4)").text();
            var memberTeam=$(".member tbody tr:eq("+changeIndex+")").children("td:eq(5)").text();
            var memberGradu=$(".member tbody tr:eq("+changeIndex+")").children("td:eq(6)").text();
            $(".addform textarea[name='memberDesc']").attr('value',memberDesc);
            $(".addform input[name='memberName']").attr('value',memberName);
            $(".addform input[name='memberPhone']").attr('value',memberPhone);
            $(".addform input[name='memberGrade']").attr('value',memberGrade);
            $(".addform input[name='memberTeam']").attr('value',memberTeam);
            $(".addform input[name='memberGradu']").attr('value',memberGradu);
            $(".addform input[name='oldId']").attr('value',memberId);
            $(".addform input[name='oldId']").attr('readonly',true);//设置编号无法修改
            $(".addform input[name='oldId']").css('background',"grey");//设置无法修改的背景框为灰色
            $(".addformmember td[id='imageSpace'] img").replaceWith("<img style='float:left' src='"+memberImagePathnull+"' width='100px' height='100px'>");//回显图片
            // 显示表单
            $(".addform").show();
            // $(".addformmember tr:eq(0)").hide();
            //保存修改
            var regGrade=/^\d{4}$/g;
            var regNumber20=/^(20)\d{8}$/;
            var regPhone=/^1[34578]\d{9}$/;
            $("#sub").click(function(){
                var data=new FormData($("#memberAccount")[0]);
                data.append("imagePath",memberImagePath);
                data.append("newId",memberId);
                //   交互
                if(!regNumber20.test(data.get("newId"))){
                    alert("编号必须为20开头的十位学号！");
                }else if(!regGrade.test(data.get("memberGrade"))){
                    alert("年级必须为四位数字！");
                }else if(!regPhone.test(data.get("memberPhone"))){
                    alert("请输入正确的电话！");
                }else if(data.get("memberTeam").length==0){
                    alert("团队不得为空！");
                }else if(data.get("memberDesc").length==0){
                    alert("简介不得为空！");
                }else if(data.get("memberName").length==0){
                    alert("姓名不得为空！");
                }else{
                    $.ajax({
                        type: "POST",
                        url: "/management/updateMember.action",
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