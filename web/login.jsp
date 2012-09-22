<%@page pageEncoding="UTF-8"%>
<html>
	<head>
		<title>J.Office 用户登录</title>
		
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ext3/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ext3/resources/css/ext-patch.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/login.css" />
	
		<script type="text/javascript">
			var __ctxPath="<%=request.getContextPath() %>";
		</script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/adapter/ext/ext-base.gzjs"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ext-all.gzjs"></script>
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/App.login.js"></script>
		<script type="text/javascript">
	 		Ext.onReady(function(){
		 		Ext.QuickTips.init(); 
				App.login.createLoginWindow();
			});	
		</script>
	</head>
	<body>
		<div style="text-align: center;">
			<div id="loginArea">
			</div>
		</div>
	</body>
</html>