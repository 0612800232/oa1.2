Ext.ns("MailFolder");
/**
 *　个人文档目录视图
 */
var PersonalMailBoxView = function() {
	var selectedNode;
	
	var mailView=new MailView();
	//var mailBoxView = new MailBoxView();
	var treePanel = new Ext.tree.TreePanel({
				//region : 'west',
				id : 'leftMailBoxTree',
				//title : '我的邮箱目录',
				//collapsible : true,
				split : true,
				width : 158,
				height : 405,
				tbar:new Ext.Toolbar({items:[{
						xtype:'button',
						iconCls:'btn-refresh',
						text:'刷新',
						handler:function(){
							treePanel.root.reload();
						}
					},
					{
						xtype:'button',
						text:'展开',
						iconCls:'btn-expand',
						handler:function(){
							treePanel.expandAll();
						}
					},
					{
						xtype:'button',
						text:'收起',
						iconCls:'btn-collapse',
						handler:function(){
							treePanel.collapseAll();
						}
					}
					]}),
				loader : new Ext.tree.TreeLoader({
							url : __ctxPath + '/communicate/listMailFolder.do'
						}),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						}),
				rootVisible : false,
				listeners : {
					'click' : function(node){
						if (node != null) {
							mailView.setFolderId(node.id);
							var mailCenterView = Ext.getCmp('MailCenterView');
							var mail = Ext.getCmp('MailView');
							var showMailDetail = Ext.getCmp('ShowMailDetail');
							if(showMailDetail!=null){
								mailCenterView.remove('ShowMailDetail')
								mail.show();
								mailCenterView.doLayout();
							}
							if (node.id != 0) {
								Ext.getCmp('MailView').setTitle('[' + node.text + ']');

								var mailGrid = Ext.getCmp('MailGrid');
								var store = mailGrid.getStore();

								store.url = __ctxPath+ '/communicate/listMail.do';
								store.baseParams = {
									folderId : node.id
								};
								store.reload({
											params : {
												start : 0,
												limit : 25
											}
										});
							}
					    }
					}
				}
			});

	function contextmenu(node, e) {
		selectedNode = new Ext.tree.TreeNode({
					id : node.id,
					text : node.text
		});
		treeMenu.showAt(e.getXY());
	}
	//树的右键菜单的
	treePanel.on('contextmenu', contextmenu, treePanel);

	// 创建右键菜单
	var treeMenu = new Ext.menu.Menu({
				tbar : new Ext.Toolbar({
							items : [{
										text : '刷新',
										handler : function() {
											alert('refresh');
										}
									}]
						}),
				id : 'treeMenu',
				items : [{
							text : '新建目录',
							scope : this,
							iconCls:'btn-add',
							handler : createNode
						}, {
							text : '修改目录',
							scope : this,
							iconCls:'btn-edit',
							handler : editNode
						}, {
							text : '删除目录',
							scope : this,
							iconCls:'btn-delete',
							handler : deleteNode
						}]
			});

	//新建目录
	function createNode(nodeId) {
		var parentId=selectedNode.id;
		
		new MailFolderForm(null,parentId);
		
	};
	//编辑目录
	function editNode() {
		var folderId=selectedNode.id;
		if(folderId > 4){//禁止用户对默认文件夹进行修改操作
			new MailFolderForm(folderId);
		}
		
	};
	//删除目录，子目录也一并删除
	function deleteNode() {
		var folderId=selectedNode.id;
		if(folderId > 4){//禁止用户对默认文件夹进行删除操作
			Ext.Ajax.request({
				url:__ctxPath+'/communicate/countMailFolder.do',
				params:{folderId:folderId},
				method:'post',
				success:function(result,request){
					var res = Ext.util.JSON.decode(result.responseText);
					if (res.count == 0) {
						Ext.Ajax.request({
									url : __ctxPath
											+ '/communicate/removeMailFolder.do',
									params : {
										folderId : folderId
									},
									method : 'post',
									success : function(result, request) {
										Ext.Msg.alert('操作信息', '成功删除目录！');
										treePanel.root.reload();
									},

									failure : function(result, request) {
										Ext.MessageBox.show({
													title : '操作信息',
													msg : '信息保存出错，请联系管理员！',
													buttons : Ext.MessageBox.OK,
													icon : 'ext-mb-error'
												});
									}

								});
					}//if count == 0
					//文件夹中存在邮件
					else{
						Ext.Msg.confirm('警告信息','该文件夹及其子目录下还有'+res.count+'封邮件,确定要删除吗?',function(btn){
							if(btn == 'yes'){
								Ext.Ajax.request({
									url : __ctxPath
											+ '/communicate/removeMailFolder.do',
									params : {
										folderId : folderId,
										count : res.count
									},
									method : 'post',
									success : function(result, request) {
										Ext.Msg.alert('操作信息', '成功删除目录！');
										treePanel.root.reload();
									},

									failure : function(result, request) {
										Ext.MessageBox.show({
													title : '操作信息',
													msg : '信息保存出错，请联系管理员！',
													buttons : Ext.MessageBox.OK,
													icon : 'ext-mb-error'
												});
									}

								});
							}
						});
						
					}
				},
				failure:function(result,request){
					Ext.MessageBox.show({
						title : '操作信息',
						msg : '信息保存出错，请联系管理员！',
						buttons : Ext.MessageBox.OK,
						icon : 'ext-mb-error'
					});
				}
				
			});
		}
	};
	var leftMailBoxPanel = new Ext.Panel({
		//id : 'leftMailBoxPanel',
		collapsible : true,
		width : 160,
		height : 800,
		region : 'west',
		title : '我的邮箱目录',
		autoScroll : true,
		items :[new Ext.Container({
			layout:'table',
			height:23,
			layoutConfig:{columns:2},
			items:[new Ext.Button({
				width:78,
				text:'收邮件',
				iconCls : 'btn-mail_receive',
				handler:function(){//这里把列表显示为收件箱
					mailView.setFolderId(1);//收件箱folderId==1
					Ext.getCmp('MailView').setTitle('[收件箱]');
					var mailGrid = Ext.getCmp('MailGrid');
					var store = mailGrid.getStore();
					store.url = __ctxPath+ '/communicate/listMail.do';
					store.baseParams = {folderId : 1};
					store.reload({params : {start : 0,limit : 25}});
				}
			}),new Ext.Button({
				width:79,
				text:'发邮件',
				iconCls : 'btn-mail_send',
				handler:function(){//发邮件功能
					var tab = Ext.getCmp('centerTabPanel');
					var mailForm = Ext.getCmp('MailForm');
					if(mailForm==null){
						mailForm = new MailForm('','','');
						tab.add(mailForm);
						tab.activate(mailForm);
					}else{
						tab.remove(mailForm);
						mailForm = new MailForm('','','');
						tab.add(mailForm);
						tab.activate(mailForm);
					}
				}
			})]
		}),treePanel]
	});
	var centerPanel = new Ext.Panel({
		id : 'MailCenterView',
		region:'center',
		//title : '[收件箱]',
		autoScroll : true,
		items:[mailView.getView()]
	})
	var panel = new Ext.Panel({
				title : '我的邮箱',
				iconCls:'menu-mail_box',
				layout : 'border',
				id:'PersonalMailBoxView',
				height : 800,
				items : [leftMailBoxPanel,centerPanel]
	});
	
	return panel;
};


