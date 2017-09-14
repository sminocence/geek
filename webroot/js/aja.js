//部门介绍
$(function(){
     //获取数据
    $.ajax({
        type: "get",
        url: " /findAllTeam.action",
        success : function(data){
        	//console.log(data);
            if(data.flag===true){
                for(var i=0;i<data.object.length;i++){
                	var imagePath=data.object[i].imagePath; //图片路径
                	var teamDesc=data.object[i].teamDesc; //团队介绍
                	var teamName=data.object[i].teamName; //团队名称
                	var teamLeader=data.object[i].teamLeader; //组长名字
                    if(teamDesc.length>=10){
                        var teamDescMin=teamDesc.substring(0,10)+"...";
                    }else{
                        var teamDescMin=teamDesc;
                    }
                    //console.log(imagePath);
                    if (imagePath != null && imagePath != ""){
                        var appendStr='<div class="teamWrapper"><div class="item"><div class="teamIntro"><img src="'
                        +imagePath+'"/><span class="teamText"><h4>'
                        +teamName+'</h4>'
                        +teamDesc+'</div><span class="information"><strong>'
                        + "组长:" + teamLeader+'</strong>'
                        +teamDesc+'</span></div></div>';
                    }
                    $("#team").append(appendStr);
                }
            }else{
                alert(data.message);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
           // alert("无网络哦！亲");
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
            }
        })
    });


// 学习家园


//博客默认页
$(function(){
     //获取数据
    $.ajax({
        type: "get",
        url: " /findLearn.action",
        data:{
            learnType : $(".studyBlog").text()
        },
        success : function(data){
        	console.log(data);
            if(data.flag===true){
                for(var i=0;i<data.object.length;i++){
                	var imagePath=data.object[i].imagePath; //图片路径
                	var learnDesc=data.object[i].learnDesc; //书籍介绍
                	var learnName=data.object[i].learnName; //书籍名称
                    if(learnDesc.length>=10){
                        var learnDescMin=learnDesc.substring(0,10)+"...";
                    }else{
                        var learnDescMin=learnDesc;
                    }
                    console.log(imagePath);
                    if (imagePath != null && imagePath != ""){
                        var appendStr='<li><img src="'+imagePath+'" class="studyImg"><div class="studyText">'
					                    +'<p>博客名：'+learnName+'</p>'
					                    +'<p>概要：'+learnName+'</p>'
					                +'</div></li>';
                    }
                    $(".studyIntro").append(appendStr);
                }
            }else{
                alert(data.message);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // alert("无网络哦！亲");
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
            }
        })
    //点击网站
    $(".studyWeb").click(function(){
	    $.ajax({
        type: "get",
        url: " /findLearn.action",
        data:{
            learnType : $(".studyWeb").text()
        },
        success : function(data){
        	$(".studyIntro").html("");
            if(data.flag===true){
            	 // var studyData=data.object;
                for(var i=0;i<data.object.length;i++){
                	var imagePath=data.object[i].imagePath; //图片路径
                	var learnDesc=data.object[i].learnDesc; //书籍介绍
                	var learnName=data.object[i].learnName; //书籍名称
                    if(learnDesc.length>=10){
                        var learnDescMin=learnDesc.substring(0,10)+"...";
                    }else{
                        var learnDescMin=learnDesc;
                    }
                    console.log(imagePath);
                    if (imagePath != null && imagePath != ""){
                        var appendStr='<li><img src="'+imagePath+'" class="studyImg"><div class="studyText">'
					                    +'<p>网站名：'+learnName+'</p>'
					                    +'<p>概要：'+learnDesc+'</p>'
					                +'</div></li>';
                    }
                    $(".studyIntro").append(appendStr);
                }
            }else{
                alert(data.message);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // alert("无网络哦！亲");
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
            }

        })
	});
	//点击博客
	$(".studyBlog").click(function(){
	    $.ajax({
        type: "get",
        url: " /findLearn.action",
        data:{
            learnType : $(".studyBlog").text()
        },
        success : function(data){
        	$(".studyIntro").html("");
            if(data.flag===true){
            	 // var studyData=data.object;
                for(var i=0;i<data.object.length;i++){
                	var imagePath=data.object[i].imagePath; //图片路径
                	var learnDesc=data.object[i].learnDesc; //书籍介绍
                	var learnName=data.object[i].learnName; //书籍名称
                    if(learnDesc.length>=10){
                        var learnDescMin=learnDesc.substring(0,10)+"...";
                    }else{
                        var learnDescMin=learnDesc;
                    }
                    console.log(imagePath);
                    if (imagePath != null && imagePath != ""){
                        var appendStr='<li><img src="'+imagePath+'" class="studyImg"><div class="studyText">'
					                    +'<p>书名：'+learnName+'</p>'
					                    +'<p>概要：'+learnDesc+'</p>'
					                +'</div></li>';
                    }
                    $(".studyIntro").append(appendStr);
                }
            }else{
                alert(data.message);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
           // alert("无网络哦！亲");
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
            }
        })
	});
    //点击书籍
	$(".studyBook").click(function(){
	    $.ajax({
        type: "get",
        url: " /findLearn.action",
        data:{
            learnType : $(".studyBook").text()
        },
        success : function(data){
        	$(".studyIntro").html("");
            if(data.flag===true){
            	 // var studyData=data.object;
                for(var i=0;i<data.object.length;i++){
                	var imagePath=data.object[i].imagePath; //图片路径
                	var learnDesc=data.object[i].learnDesc; //书籍介绍
                	var learnName=data.object[i].learnName; //书籍名称
                    if(learnDesc.length>=10){
                        var learnDescMin=learnDesc.substring(0,10)+"...";
                    }else{
                        var learnDescMin=learnDesc;
                    }
                    console.log(imagePath);
                    if (imagePath != null && imagePath != ""){
                        var appendStr='<li><img src="'+imagePath+'" class="studyImg"><div class="studyText">'
					                    +'<p>书名：'+learnName+'</p>'
					                    +'<p>概要：'+learnDesc+'</p>'
					                +'</div></li>';
                    }
                    $(".studyIntro").append(appendStr);
                }
            }else{
                alert(data.message);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // alert("无网络哦！亲");
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
            }
        })
	});
});