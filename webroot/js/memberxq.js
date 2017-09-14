$(document).ready(function(){        
        //向后台请求数据
        $.ajax({
            type:"get",
            url:"/findAllMember.action",
            success: function(data){               
                if(data.flag === true){
                    for(var i=0;i<data.object.length;i++){
                        var imagePath = data.object[i].imagePath;
                        var memberDesc = data.object[i].memberDesc;
                        var memberTeam = data.object[i].memberTeam;
                        var memberGrade = data.object[i].memberGrade;
                        var memberName = data.object[i].memberName;
                        if(imagePath != null && imagePath != ""){
                            var str="";
                            str+="<li class='member_photo'>"+"<div class='in'>"+
                            "<img src="+imagePath+" class='member_img'>"+"<p class='member_intro'>"+memberName+"-"
                                +memberGrade+"-"+memberTeam+"</p>"+"</div>"+"</li>";
                            $("div.member_photos").append(str);
                        }
                    }
                };               
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                // alert("无网络哦！亲");
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
            }         
        });
});
