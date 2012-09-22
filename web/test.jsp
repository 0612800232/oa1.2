<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="msthemecompatible" content="no">
		<title>EOFFICE</title>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ext3/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ext3/resources/css/ext-patch.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/admin.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ext3/ux/css/ux-all.css" />

		<script type="text/javascript" src="<%=request.getContextPath()%>/js/dynamic.jsp"></script>

		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/adapter/ext/ext-base-debug.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ext-all-debug.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ext-lang-zh_CN.js"></script>
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ux/XmlTreeLoader.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ux/CheckTreePanel.js"></script>
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/system/AppRoleView.js"></script>
		
		
</head>
<body style="">
	<input type="button" value="insert" onclick="insertHtml()">
	<input type="button" value="clear" onclick="clear2();">
</body>
</html>

<script type="text/javascript">
	//Ext.BLANK_IMAGE_URL = '../ext/resources/images/default/s.gif';

	Ext.ns("Ext.app");
	Ext.app.MenuLoader = Ext.extend(Ext.ux.tree.XmlTreeLoader, {
			processAttributes : function(attr) {
				if (attr.tagName == 'Item') {
					attr.leaf = true;
				} else if (attr.tagName == 'Items') {
					attr.loaded = true;
					attr.expanded = true;
				}
			}
		});
	
	Ext.onReady(function() {
		//var view=new AppRoleView();
		//view.render(document.body);
		Ext.QuickTips.init();

		var t2 = new Ext.ux.tree.CheckTreePanel({
			 renderTo:document.body
			,title:'角色授权'
			,id:'t2'
			,width:300
			,height:550
			,autoScroll:true
			,rootVisible:false
			,loader : new Ext.app.MenuLoader({
				dataUrl : __ctxPath + '/js/menu.xml'
			}),
			root : new Ext.tree.AsyncTreeNode({
				expanded : true
			})
			,tools:[{
				 id:'refresh'
				,qtip:'重新加载树'
				,handler:function() {
					t2.getRootNode().reload();
				}
			}]
		});
		
		
	});//end of ready
</script>