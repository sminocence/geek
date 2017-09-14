$(function(){
	$.ajax({
		type: "get",
		url: "/findAllMasterpiece.action",
		success : function(data) {
			if (data.flag===true) {
				for(var i=0;i<data.object.length;i++) {
					var imagePath = data.object[i].imagePath;  //图片路径
					var masterDesc = data.object[i].masterDesc;  //作品描述
					var masterName = data.object[i].masterName;  //作品名称
					if (masterDesc.length >= 16) {
						var masterDescMin_1 = masterDesc.substring(0,16)+"...";
					}
					/*else{
						if (masterDesc.length >= 16) {
							var masterDescMin_2 = masterDesc.substring(0,107)+"...";
						}else {
							var masterDescMin = masterDesc;
						}
					}*/
					var appendStr = "<li id='one"+i+"'><img src='"+imagePath+"'/></li>";
					$("#jswbox ul").append(appendStr);
					// if (i==0) {
					// 	var appendStr_1 = "<div id='cont_one_"+(i+1)+"' class='introduce block'><div class='companyImage'><img src='"
					// 					+imagePath+
					// 					"' width='200px' height='200px'><div class='quotehover'><h5>"
					// 					+masterDescMin_1+
					// 					"</h5><h6>@GEEK</h6></div></div><div class='info'><a href='#'><h2>"
					// 					+masterName+
					// 					"</h2></a><p>"
					// 					+masterDescMin_2+
					// 					"</p><div class='socialicon'><a class='socialicon G' href='#'></a><a class='socialicon E' href='#'></a><a class='socialicon E' href='#'></a><a class='socialicon K' href='#'></a></div></div></div>"
					// }else {
					// 	var appendStr_1 = "<div id='cont_one_"+(i+1)+"' class='introduce'><div class='companyImage'><img src='"
					// 					+imagePath+
					// 					"' width='200px' height='200px'><div class='quotehover'><h5>"
					// 					+masterDescMin_1+
					// 					"</h5><h6>@GEEK</h6></div></div><div class='info'><a href='#'><h2>"
					// 					+masterName+
					// 					"</h2></a><p>"
					// 					+masterDescMin_2+
					// 					"</p><div class='socialicon'><a class='socialicon G' href='#'></a><a class='socialicon E' href='#'></a><a class='socialicon E' href='#'></a><a class='socialicon K' href='#'></a></div></div></div>"
					// }
					var appendStr_1 = "<div class='companyImage'><img src='"
					 					+imagePath+
										"' width='200px' height='200px'><div class='quotehover'><h5>"
					 					+masterDescMin_1+
					 					"</h5><h6>@GEEK</h6></div></div><div class='info'><a href='#'><h2>"
					 					+masterName+
					 					"</h2></a><p>"
					 					+masterDesc+
					 					"</p><div class='socialicon'><a class='socialicon G' href='#'></a><a class='socialicon E' href='#'></a><a class='socialicon E' href='#'></a><a class='socialicon K' href='#'></a></div></div>"
					$("#cont_one_"+i).append(appendStr_1);
					// var appendStr_1 = "<img src='"+imagePath+"' width='200px' height='200px'><div class='quotehover'><h5>"+masterDescMin_1+"</h5><h6>@GEEK</h6></div>";
					// $("#cont_one_"+(i+1)+" .companyImage").append(appendStr_1);
					// var appendStr_2 = "<a href='#'><h2>"+masterName+"</h2></a><p>"+masterDescMin_2+"</p><div class='socialicon'><a class+'socialicon G' href='#'></a><a class+'socialicon E' href='#'></a><a class+'socialicon E' href='#'></a><a class+'socialicon K' href='#'></a></div>";
					// $("cont_one_"+(i+1)+" .info").append(appendStr_2);
				}
				//请求成功之后实现js效果
				//成品简介鼠标移入移出动画效果
				$(".companyImage").hover(
					function(){
						$(this).children(".quotehover").fadeIn("slow");
					},
					function(){
						$(this).children(".quotehover").fadeOut("slow");
					}
				)
				//轮播图js代码
				function ZoomPic(){
					this.initialize.apply(this,arguments)
				}
				ZoomPic.prototype={
					initialize:function(id){
						var timer;
						var _this=this;this.wrap=typeof 
							id==="string"?document.getElementById(id):id;
							this.oUl=this.wrap.getElementsByTagName("ul")[0];
							this.aLi=this.wrap.getElementsByTagName("li");
							this.prev=this.wrap.getElementsByTagName("pre")[0];
							this.next=this.wrap.getElementsByTagName("pre")[1];
							this.timer=null;
							this.aSort=[];
							this.iCenter=3;
							this._doPrev=function(){
								return _this.doPrev.apply(_this)
							};
							this._doNext=function(){
								return _this.doNext.apply(_this)
							};
							this.options=[{width:300,height:202,top:48,left:20,zIndex:1},
										  {width:350,height:235,top:38,left:20,zIndex:2},
										  {width:389,height:262,top:28,left:160,zIndex:3},
										  {width:445,height:300,top:0,left:315,zIndex:4},
										  {width:300,height:262,top:28,left:628,zIndex:3},
										  {width:350,height:235,top:38,left:744,zIndex:2},
										  {width:300,height:202,top:48,left:280,zIndex:1},];
							for(var i=0;i<this.aLi.length;i++)
								this.aSort[i]=this.aLi[i];
							this.aSort.unshift(this.aSort.pop());
							this.setUp();
							this.addEvent(this.prev,"click",this._doPrev);
							this.addEvent(this.next,"click",this._doNext);
							this.doImgClick();
							this.timer=setInterval(function(){
								_this.doNext()
							},3000);
							this.wrap.onmouseover=function(){
								clearInterval(_this.timer)
							};
							this.wrap.onmouseout=function(){
								_this.timer=setInterval(function(){
									_this.doNext()
								},3000);
							}
						},doPrev:function(){
							this.aSort.unshift(this.aSort.pop());
							this.setUp()},doNext:function(){
								this.aSort.push(this.aSort.shift());
								this.setUp()
							},doImgClick:function(){
								var _this=this;
								for(var i=0;i<this.aSort.length;i++){
									this.aSort[i].onclick=function(num){
										return function(){
											console.log(num);
											if(this.index>_this.iCenter){
												for(var m=0;m<this.index-_this.iCenter;m++)
													_this.aSort.push(_this.aSort.shift());
												_this.setUp()
											}else if(this.index<_this.iCenter){
												for(var m=0;m<_this.iCenter-this.index;m++)
													_this.aSort.unshift(_this.aSort.pop());
												_this.setUp()
											}
											for(var j=0;j<=7;j++) {
												if(j==0){
													var showDiv = $("#cont_one_7");
												}else {
													var showDiv = $("#cont_one_" + (j-1));
												}
												if(j==num) {
													showDiv.css("display","block");
												}else {
													showDiv.css("display","none");
												}
											}
										}
									}(i);
								}
							},setUp:function(){
								var _this=this;
								var i=0;
								for(i=0;i<this.aSort.length;i++)
									this.oUl.appendChild(this.aSort[i]);
								for(i=0;i<this.aSort.length;i++){
									this.aSort[i].index=i;
									if(i<7){
										this.css(this.aSort[i],"display","block");
										this.doMove(this.aSort[i],this.options[i],function(){
											_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0],{opacity:100},function(){
												_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0],{opacity:100},function(){
													_this.aSort[_this.iCenter].onmouseover=function(){
														_this.doMove(this.getElementsByTagName("div")[0],{bottom:0})
													};
													_this.aSort[_this.iCenter].onmouseout=function(){
														_this.doMove(this.getElementsByTagName("div")[0],{bottom:-100});
													}
												})
											})
										});
									}else{
										this.css(this.aSort[i],"display","none");
										this.css(this.aSort[i],"width",0);
										this.css(this.aSort[i],"height",0);
										this.css(this.aSort[i],"top",152);
										this.css(this.aSort[i],"left",this.oUl.offsetWidth/2)
									}
									if(i<this.iCenter||i>this.iCenter){
										this.css(this.aSort[i].getElementsByTagName("img")[0],"opacity",30);
										this.aSort[i].onmouseover=function(){
											_this.doMove(this.getElementsByTagName("img")[0],{opacity:100})
										};
										this.aSort[i].onmouseout=function(){
											_this.doMove(this.getElementsByTagName("img")[0],{opacity:35})};
											this.aSort[i].onmouseout();
										}else{
											this.aSort[i].onmouseover=this.aSort[i].onmouseout=null
										}
									}
								},addEvent:function(oElement,sEventType,fnHandler){
									return oElement.addEventListener?oElement.addEventListener(sEventType,fnHandler,false):oElement.attachEvent("on"+sEventType,fnHandler)
								},css:function(oElement,attr,value){
									if(arguments.length==2){
										return oElement.currentStyle?oElement.currentStyle[attr]:getComputedStyle(oElement,null)[attr]
									}else if(arguments.length==3){
										switch(attr){
											case"width":
											case"height":
											case"top":
											case"left":
											case"bottom":oElement.style[attr]=value+"px";
											break;
											default:oElement.style[attr]=value;
											break
										}
									}
								},doMove:function(oElement,oAttr,fnCallBack){
									var _this=this;
									clearInterval(oElement.timer);
									oElement.timer=setInterval(function(){
										var bStop=true;
										for(var property in oAttr){
											var iCur=parseFloat(_this.css(oElement,property));
											property=="opacity"&&(iCur=parseInt(iCur.toFixed(2)*100));
											var iSpeed=(oAttr[property]-iCur)/5;
											iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
											if(iCur!=oAttr[property]){
												bStop=false;
												_this.css(oElement,property,iCur+iSpeed)
											}
										}if(bStop){
											clearInterval(oElement.timer);
											fnCallBack&&fnCallBack.apply(_this,arguments)
										}
									},30)
								}
							 };
				new ZoomPic("jswbox");
			}else {
				alert(data.message);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
          /*  alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);*/
        }
	})
	$.ajax({
		type : "get",
		url :  "/findAllMember.action",
		success : function(data) {
			if (data.flag === true) {
				for (var i = 0; i < data.object.length; i++) {
					var memberName = data.object[i].memberName;     //成员名字
					var memberGrade = data.object[i].memberGrade;    //年级
					var memberGradu = data.object[i].memberGradu;    //毕业去向
					if(memberGradu != null && memberGradu != ""){
                        var appendStr_4 = "<tbody><tr><td width='30%'>"+memberName+"</td><td width='20%'>"+memberGrade+"</td><td>"+memberGradu+"</td></tr></tbody>";
					}
					// if (memberGrade == 2016) {
						$(".div-left table").append(appendStr_4);
					// }
				}
				//表格各行变色，鼠标移入，高亮显示
				$("tbody>tr:even").addClass("even");
				$("tbody>tr:odd").addClass("odd");
				$("tbody>tr").hover(
					function(){
						$(this).addClass("hover");
					},
					function(){
						$(this).removeClass("hover");
					})
			}else {
				alert(data.message);
			}
		},
		error: function(XMLHttpRequest,textStatus,errorThrown) {
		/*	alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);*/
		}
	})
})
