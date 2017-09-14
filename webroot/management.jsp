<%@page contentType="text/html" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head>
	<title>极客网后台数据管理</title>
</head>
<link rel="stylesheet" type="text/css" href="css/management.css">
<script type="text/javascript" src="js/jquery1.js"></script>
<script type="text/javascript" src="js/management.js"></script>
<body>
	<div class="pageMain">
		<!-- 头部 -->
		<div class="header">
			<div class="logo"><img src="img/logo.png" width="200px" height="200px"></div>
			<!-- 右上角人员信息 -->
			<div class="login">
				<!-- 身份显示 -->
				<%
					Object o = request.getSession().getAttribute("user");
					if (o == null){
						response.sendRedirect("/login.html");
					}
				%>
				<div class="manager">管理员： ${sessionScope.user.userName}</div>
				<!-- 登录或退出 -->
				<a class="loginOrleave">注销</a>
			</div>
			极客网工作室主页后台管理页面
		</div>
		<div class="main">
			<!-- 左侧按钮 -->
			<div class="buttons">
				<div class="button buttonFirst"><div><a href="manager.html" target="controlmain">管理员</a></div></div>
				<div class="button"><div><a href="team.html" target="controlmain">团队管理</a></div></div>
				<div class="button"><div><a href="member.html" target="controlmain">成员管理</a></div></div>
				<div class="button"><div><a href="master.html" target="controlmain">作品管理</a></div></div>
				<div class="button"><div><a href="learn.html" target="controlmain">学习家园</a></div></div>
				<div class="button"><div><a href="join.html" target="controlmain">加入我们</a></div></div>
				<div class="button buttonLast"><div><a href="view.html" target="controlmain">意见反馈</a></div></div>
			</div>
			<!-- 右边操作界面 -->
			<div class="handle">
				<iframe src="manager.html" width="100%" height="100%" name="controlmain" frameborder="0"></iframe>
			</div>
		</div>
	</div>
		<!-- 底部 -->
		<div class="footer footerPosition">
			<div class="textInfo">
				<p>
				版权所有 | 重庆邮电大学极客网工作室 |<a href="suggestHHG.html"> 意见反馈</a>
				</p>
				<p>
				重庆市南岸区崇文路2号邮电大学经济管理学院
				</p>
			</div>
		</div>
</body>
</html> 