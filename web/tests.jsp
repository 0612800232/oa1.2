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
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ux/CheckTreePanel.js"></script>
		
		<link rel="stylesheet" type="text/css" href="TreeCheckbox.css" />
		<link rel="stylesheet" type="text/css" href="TriStateNodeUI.css" />
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ux/XmlTreeLoader.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ux/TreeCheckbox.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ux/TriStateNodeUI.js"></script>
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/system/AppRoleView.js"></script>
		
		
</head>
<body style="">
	<input type="button" value="insert" onclick="insertHtml()">
	<input type="button" value="clear" onclick="clear2();">
</body>
</html>

<script type="text/javascript">
	//Ext.BLANK_IMAGE_URL = '../ext/resources/images/default/s.gif';

	var data = [{
	text:'ColumnTree Example',
	checked:null,
	expanded:true,
	children:[{
		text:'Abstract rendering in TreeNodeUI',
		checked:true,
		leaf:true
	},{
		text:'Create TreeNodeUI with column knowledge',
		checked:false,
		leaf:true
	},{
		text:'Create TreePanel to render and lock headers',
		checked:true,
		leaf:true
	},{
		text:'Add CSS to make it look fly',
		checked:false,
		leaf:true
	},{
		text:'Test and make sure it works',
		checked:true,
		leaf:true
	}]
},{
	text:'Custom Field Example',
	checked:false,
	expanded:true,
	children:[{
		text:'Implement "Live Search" on extjs.com from Alex',
		checked:false,
		leaf:true
	},{
		text:'Extend TwinTrigger',
		checked:false,
		leaf:true
	},{
		text:'Testing and debugging',
		checked:false,
		leaf:true
	}]
},{
	text:'Foo Bar Item',
	checked:true,
	expanded:true,
	children:[{
		text:'Abstract rendering in TreeNodeUI',
		checked:true,
		leaf:true
	},{
		text:'Create TreeNodeUI with column knowledge',
		checked:true,
		leaf:true
	},{
		text:'Create TreePanel to render and lock headers',
		checked:true,
		leaf:true
	},{
		text:'Add CSS to make it look fly',
		checked:true,
		leaf:true
	},{
		text:'Test and make sure it works',
		checked:true,
		leaf:true
	}]
},{
	text:'WTF Item',
	checked:null,
	disabled:true,
	children:[{
		text:'Abstract rendering in TreeNodeUI',
		checked:false,
		disabled:true,
		leaf:true
	},{
		text:'Create TreeNodeUI with column knowledge',
		checked:true,
		disabled:true,
		leaf:true
	},{
		text:'Create TreePanel to render and lock headers',
		checked:false,
		disabled:true,
		leaf:true
	},{
		text:'Add CSS to make it look fly',
		checked:true,
		disabled:true,
		leaf:true
	},{
		text:'Test and make sure it works',
		checked:false,
		disabled:true,
		leaf:true
	}]
}];
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
	
Ext.onReady(function(){
	var root = new Ext.tree.TreeNode({
		children:data
	});
	new Ext.tree.TreeLoader({
		preloadChildren:true,
		baseAttrs:{
			uiProvider:Ext.tree.TriStateNodeUI
		}
	}).load(root);
	new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'treepanel',
			title:'Tree checkbox test',
			rootVisible:false,
			autoScroll:true,
			root:root
		}]
	});
	/*
	new Ext.Viewport({
	layout:'fit',
	items:[{
		xtype:'treepanel',
		title:'Tree checkbox test',
		rootVisible:false,
		loader : new Ext.app.MenuLoader({
			dataUrl : __ctxPath + '/js/menu.xml'
		}),
		autoScroll:true,
		root:new Ext.tree.AsyncTreeNode({
			expanded : true
		})
	}]
});*/
});
	
	
</script>