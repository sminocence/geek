$(function(){
	// 意见反馈聚焦冒出小猫
	function cat(){
		if(!$(".gifPic").is(":animated")&&!$(".catText").is(":animated")){
			if(!$(".inputMessage").is(":focus")&&!$(".inputTel").is(":focus")){
				$(".gifPic").animate({top:"0px"},1000);
				$(".catText").animate({top:"0px"},1000);
			}else{
				$(".gifPic").animate({top:"-100px"},1000);
				$(".catText").animate({top:"-100px"},1000);
			}
		}
	}
	// 点击执行冒出小猫函数
	$("html").click(cat);
	// 获取当前时间
	function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var seconds=date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if(seconds<10){
    	seconds="0"+seconds;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + seconds;
    return currentdate;
}
	// 提交表单
	$(".submit").click(function(){
		var data=new FormData($("#suggestionAccount")[0]);
		var time=getNowFormatDate();
		// data.append("time",time);
        if(data.get("phone").length==0){
            alert("大侠请留下你的联系方式!");
        }else if(data.get("view").length==0){
            alert("意见不能为空哦！");
        }else{
            $.ajax({
            type: "POST",
            url: "/addSuggestion.action",
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
});