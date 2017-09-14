$(document).ready(function(){
	$("tbody>tr:even").addClass("even");
	$("tbody>tr:odd").addClass("odd");
	$("tbody>tr").hover(
		function(){
			$(this).addClass("hover");
		},
		function(){
			$(this).removeClass("hover");
		})
	
	$(".companyImage").hover(
		function(){
			$(this).children(".quotehover").fadeIn("slow");
		},
		function(){
			$(this).children(".quotehover").fadeOut("slow");
		})
	// $.ajax({
	// 	type: "get",
	// 	url: "/findAllMasterpiece.action",
	// 	succsess : function(data) {
	// 		if (data.flag===true) {
	// 			for(var i=0;i<data.object.length;i++) {
	// 				var imagePath = data.object[i].imagePath;  //图片路径
	// 				var masterDesc = data.object[i].masterDesc;  //公司描述
	// 				var masterName = data.object[i].masterName;  //公司名称
	// 				console.log(imagePath);
	// 				if (masterDesc.length >= 16) {
	// 					var masterDescMin_1 = masterDesc.substring(0,16)+"...";
	// 				}else{
	// 					if (masterDesc.length >= 107) {
	// 						var masterDescMin_2 = masterDesc.substring(0,107)+"...";
	// 					}else {
	// 						var masterDescMin = masterDesc;
	// 					}
	// 				}
	// 				if (imagePath != null && imagePath != "" ) {
	// 					var appendStr = "<div class='introduce'><div class='companyImage'><img src='"
	// 									+imagePath+
	// 									"' width='150px' height='150px'><div class='quotehover'><h5>"
	// 									+masterDescMin_1+
	// 									"</h5><h6>@GEEK</h6></div></div></div><div class='info'><a href='"
	// 									+path+
	// 									"'><h2>"
	// 									+masterName+
	// 									"</h2></a><p>"
	// 									+masterDescMin_2+
	// 									"</p><a class='socialicon G' href='#'></a><a class='socialicon E' href='#'></a><a class='socialicon e' href='#'></a><a class='socialicon k' href='#'></a></div>"
	// 				}else {
	// 					var appendStr = "<div class='introduce'><div class='companyImage'><div class='quotehover'><h5>"
	// 									+masterDescMin_1+
	// 									"</h5><h6>@GEEK</h6></div></div></div><div class='info'><a href='"
	// 									+path+
	// 									"'><h2>"
	// 									+masterName+
	// 									"</h2></a><p>"
	// 									+masterDescMin_2+
	// 									"</p><a class='socialicon G' href='#'></a><a class='socialicon E' href='#'></a><a class='socialicon e' href='#'></a><a class='socialicon k' href='#'></a></div>"
	// 				}
	// 				if (i%2 == 0) {
	// 					$(".company-left").append(appendStr);
	// 				}else {
	// 					$(".company-right").append(appendStr);
	// 				}
	// 			}
	// 		}
	// 	}
	// })
})