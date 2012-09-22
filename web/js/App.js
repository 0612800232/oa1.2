Ext.ns("App");
Ext.ns("Ext.app");

Ext.util.Observable.observeClass(Ext.data.Connection);
Ext.data.Connection.on('requestcomplete', function(conn, resp,options ){
	if(resp.status!=200){
		alert('error:' + resp.statusText + " status:" + resp.status);
	}
});
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

App.init = function() {
	
	Ext.QuickTips.init();//这句为表单验证必需的代码
	
	Ext.BLANK_IMAGE_URL=__ctxPath+'/ext3/resources/images/default/s.gif';
	// requestcomplete //定义一个全局的权限错误标识
	//App.login.checkLogin(); // 检查登录,假如没有登录就要跳到登录页面
	// 创建流程查看窗口
	var tabPanel = new Ext.TabPanel({
				id : 'centerTabPanel',
				region : 'center',
				deferredRender : true,
				enableTabScroll : true,
				activeTab : 0, // first tab initially active
				defaults : {
					autoScroll : true,
					closable : true
				},
				items : [App.home.portal]
			});

	var megBtn = new Ext.Button({
				id : 'messageTip',
				hidden : true,
				width : 50,
				height : 20,
				// bodyStyle:'padding:5px;',
				// iconCls:'menu-receiveMessage',
				handler : function() {
					var megBtn = Ext.getCmp('messageTip');
					var megWin = Ext.getCmp('win');
					
					if (megWin == null) {
						new MessageWin();
						
					}
					megBtn.hide();
				}
			});

	var addBtn = function(count) {
		var megBtn = Ext.getCmp('messageTip');
		var megWin = Ext.getCmp('win');
		var reMegWin = Ext.getCmp('wind');
		if (count > 0 && megWin == null && reMegWin == null) {

			megBtn.setText('<img src="' + __ctxPath
					+ '/images/newpm.gif"/>你有<strong style="color: red;">'
					+ count + '</strong>信息');
			megBtn.show();
		} else {
			megBtn.hide();
		}
	};

	var addBtnFunction = function() {
		Ext.Ajax.request({
					url : __ctxPath + '/info/countInMessage.do',
					method : 'POST',
					success : function(response, options) {
						var result = Ext.util.JSON
								.decode(response.responseText);
						count = result.count;
						addBtn(count);
//						setTimeout(addBtnFunction, 1000 * 8);  //设8秒响应一次
					},
					failure : function(response, options) {
					},
					scope : this
				});
	};

	addBtnFunction();

	var westPanel = new Ext.Panel({
				region : 'west',
				id : 'west-panel', // see Ext.getCmp() below
				title : '导航',
				split : true,
				width : 200,
				autoScroll : true,
				layout : 'accordion',
				collapsible : true,
				margins : '0 0 0 2',
				items : [],
				bbar: new Ext.Toolbar({
					width: '100%',
	   				height: 25,
	   				items:[{
	   					text:'退出系统',
	   					iconCls:'btn-logout',
	   					handler:function(){
	   						App.login.logout();
	   					}
	   				},'->',{
	   					text:'看谁在线',
	   					iconCls:'btn-onlineUser',
	   					handler:function(){
	   						OnlineUserSelector.getView(function(userId,userName){
										Ext.Msg.alert("userId:"+userId+",userName:"+userName);
									},true).show();
	   					}
	   				}]
				})
			});
	// 构建左边的菜单
	Ext.Ajax.request({
				url : __ctxPath + '/pages/menu/items.jsp',
				success : function(response, options) {
					var arr = eval(response.responseText);
					var __activedPanelId = getCookie("__activedPanelId");
					for (var i = 0; i < arr.length; i++) {
						var panel = new Ext.tree.TreePanel({
									id : arr[i].id,
									title : arr[i].text,
									iconCls : arr[i].iconCls,
									autoScroll : true,
									border : false,
									loader : new Ext.app.MenuLoader({
												dataUrl : __ctxPath
														+ '/pages/menu/itemMenu.jsp?id='
														+ arr[i].id
											}),
									root : new Ext.tree.AsyncTreeNode({
												expanded : true
											}),
									listeners : {
										'click' : App.clickNode
									},
									rootVisible : false
								});
						westPanel.add(panel);
						panel.on('expand', function(p) {
									// 记住上次点激的panel
									var expires = new Date();
									expires.setDate(expires.getDate() + 30);
									setCookie("__activedPanelId", p.id,
											expires, __ctxPath);
								});
						// 激活上次点击的panel
						if (arr[i].id == __activedPanelId) {
							westPanel.layout.activeItem = panel;
						}
					}
					westPanel.doLayout();
				}
			});
	// Configure viewport
	var viewport = new Ext.Viewport({
		layout : 'border',
		items : [{
			xtype : 'panel',
			frame : true,
			region : 'north',
			height : 68,
			layout : 'border',
			bodyStyle : '',
			layoutConfig : {
				pack : 'left',
				align : 'middle'
			},
			defaults : {
				border : false
			},
			items : [{
						region : 'west',
						html : '<img src="' + __ctxPath
								+ '/images/ht-logo.png"/>'
					}, {
						region : 'center',
						layout : 'hbox',
						layoutConfig : {
							padding : '5',
							pack : 'center',
							align : 'middle'
						},
						defaults : {
							margins : '0 5 0 0'
						},
						items : [{
									xtype : 'label',
									text : '请输入查询关键字'
								}, {
									xtype : 'textfield',
									name : 'keySearch',
									width : 200,
									id : 'keySearch'
								}, {
									xtype : 'button',
									iconCls : 'btn-search',
									text : '查询',
									handler:function(){
										alert('对不起，目前暂不开放该功能！');
									}
								}]
					}, {
						region : 'east',
						html : '<img src="' + __ctxPath
								+ '/images/product.png"/>'
					}]
		}, westPanel, tabPanel, {
			xtype : 'panel',
			region : 'south',
			height : 28,
			border : false,
			bbar : [
					megBtn,
					'->',
					{
						xtype : "tbfill"
					},
					new Ext.Toolbar.TextItem('广州宏天软件办公协同管理系统'),
					{
						xtype : 'tbseparator'
					},
					new Ext.Toolbar.TextItem('技术支持 <a href=http://www.jee-soft.cn target="_blank">广州宏天软件有限公司</a>'),
					{
						xtype : 'tbseparator'
					}, {
						pressed : false,
						text : '与我们联系',
						handler:function(){
							Ext.Msg.alert("联系我们","电话：020-62652367,020-62652816,020-62652861<br/>网址：http://www.jee-soft.cn");
						}
					}]
		}]
	});
};

App.clickNode = function(node) {
	if (node.id == 'LogOut') {
		App.login.logout();
	} else {
		if(node.id==null || node.id=='' || node.id.indexOf('xnode')!=-1){
			return ;
		}
		var tabs = Ext.getCmp('centerTabPanel');
		var tabItem = tabs.getItem(node.id);
		
		if (tabItem == null) {
			$ImportJs(node.id, function(view) {
						tabItem = tabs.add(view);
						tabs.activate(tabItem);
			});
		}
		tabs.activate(tabItem);
	}
};

Ext.onReady(App.init);