Ext.ns('PublicDocumentView');

var PublicDocumentView = function() {
	
};

PublicDocumentView.prototype.getView=function(){
     return new Ext.Panel({
     	id:'PublicDocumentView',
     	title:'公共文档列表',
     	autoScroll : true,
		region:'center',
		anchor:'100%',
     	items:[new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'PublicDocumentSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '文档名称'
					}, {
						xtype : 'textfield',
						name : 'document.docName',
						width:90
					}, {
						text : '创建时间 从'
					}, {
						xtype : 'datefield',
						format:'Y-m-d',
						name : 'from'
					},{
						text : '至'
					},{
						xtype : 'datefield',
						format:'Y-m-d',
						name : 'to'
					},{
						xtype : 'button',
						text : '查询',
						iconCls : 'btn-search',
						handler : function() {
							var searchPanel = Ext.getCmp('PublicDocumentSearchForm');
							var grid = Ext.getCmp('PublicDocumentGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/document/publicListDocument.do',
									params:{folderId:DocumentView.folderId},
									success : function(formPanel, action) {
										var result = Ext.util.JSON
												.decode(action.response.responseText);
										grid.getStore().loadData(result);
									}
								});
							}

						}
					},{
						xtype:'button',
						text:'重置',
						iconCls:'btn-reset',
						hander:function(){
							var searchPanel = Ext.getCmp('PublicDocumentSearchForm');
							searchPanel.getForm().reset();
						}
					}]
		}),this.setup()]     	
     });
}

PublicDocumentView.prototype.setFolderId=function(folderId){
	this.folderId=folderId;
	PublicDocumentView.folderId=folderId;
};

PublicDocumentView.prototype.getFolderId=function(){
	return this.folderId;
};


PublicDocumentView.prototype.setup=function(){
   return this.grid();
}

PublicDocumentView.prototype.grid=function(){
   
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'docId',
					dataIndex : 'docId',
					hidden : true
				}, {
					header : '文档名称',
					dataIndex : 'docName',
					width:120
				}, {
					header : '创建 人',
					dataIndex : 'creator',
					width:120
				}, {
					header : '修改时间',
					dataIndex : 'createtime'
				},{
					header : '文件夹',
					dataIndex : 'forlderName'
				},{
					header : '附件',
					dataIndex : 'haveAttach',
					renderer:function(value,metadata,record){
						
						if(value=='' || value=='0'){
							return '无附件';
						}else{
							var attachFiles=record.data.attachFiles;
							var str='';
							for(var i=0;i<attachFiles.length;i++){
								str+='<a href="#" onclick="FileAttachDetail.show('+attachFiles[i].fileId+');" class="attachment">'+attachFiles[i].fileName+'</a>';
								str+='&nbsp;';
							}
							return str;
						}
					}
				}
				, {
					header : '管理',
					dataIndex : 'docId',
					width : 50,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.docId;
						var str = '<button title="查看" value="" class="btn-readdocument" onclick="PublicDocumentView.detail('
								+ editId + ')">&nbsp;</button>';	
						return str;
						
					}
				}
				],
		defaults : {
			sortable : true,
			menuDisabled : false,
			width : 100
		}
	});

	var store = this.store();
	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});
	
	var grid=new Ext.grid.GridPanel({	
		id:'PublicDocumentGrid',
		store : store,
		trackMouseOver : true,
		disableSelection : false,
		loadMask : true,
		autoHeight:true,
		maxHeight:600,
		cm : cm,
		sm : sm,
		viewConfig : {
			forceFit : true,
			enableRowBody : false,
			showPreview : false
		},
		bbar : new Ext.PagingToolbar({
					pageSize : 25,
					store : store,
					displayInfo : true,
					displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
					emptyMsg : "当前没有记录"
				})
		});

		grid.addListener('rowdblclick', function(grid, rowindex, e) {
					grid.getSelectionModel().each(function(rec) {
								PublicDocumentView.detail(rec.data.docId);
							});
				});
		return grid;
}


PublicDocumentView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/document/publicListDocument.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'docId',
										type : 'int'
									},{
									   name:'forlderName',
									   mapping:'docFolder.folderName'									
									},{
									name:'creator',
									mapping:'appUser.fullname'
									},'docName', 'content', 'createtime','haveAttach','attachFiles','isShared'
									]
						}),
				remoteSort : true
			});
	store.setDefaultSort('docId', 'desc');
	return store;
};

PublicDocumentView.detail=function(id){
  Ext.Ajax.request({
				url : __ctxPath + '/document/rightDocument.do',
				params:{docId:id},
				method : 'POST',
				success : function(response, options) {
					var result = Ext.util.JSON
							.decode(response.responseText);
					var rightM = result.rightM;
					var rightD=result.rightD;
					var docName=result.docName;
					if(id!=null){
					    new PublicDocumentDetailWin(id,docName);
					}
					if(rightM==1){
					 var publicDocumentTopBar=Ext.getCmp('PublicDocumentTopBar');
					  publicDocumentTopBar.add(new Ext.Button({
					        iconCls : 'btn-add',
							text : '修改公共文档 &nbsp;',
							xtype : 'button',
							handler : function() {
							      var tabs = Ext.getCmp('centerTabPanel');
							      var newPublicDocumentForm=Ext.getCmp('NewPublicDocumentForm');
							      var publicDocumentDetailWin=Ext.getCmp('PulicDocumentDetailWin');					      
							      publicDocumentDetailWin.close();
							      if(newPublicDocumentForm==null){
							           newPublicDocumentForm=new NewPublicDocumentForm(id,docName+'-文档信息');
							           tabs.add(newPublicDocumentForm);
							           tabs.activate(newPublicDocumentForm);	
							      }else{
							           tabs.remove('NewPublicDocumentForm');
							           newPublicDocumentForm=new NewPublicDocumentForm(id,docName+'-文档信息')
							           tabs.add(newPublicDocumentForm);
							           tabs.activate(newPublicDocumentForm);
							      }

							}
					  }));
					  publicDocumentTopBar.doLayout(true);
					}
					if(rightD==1){
					 var publicDocumentTopBar=Ext.getCmp('PublicDocumentTopBar');
					  publicDocumentTopBar.add(new Ext.Button({
					       iconCls : 'btn-del',
							text : '删除公共文档',
							xtype : 'button',
							handler : function() {
									Ext.Msg.confirm('信息确认', '您确认要删除该文档吗？', function(btn) {
									if (btn == 'yes') {
										Ext.Ajax.request({
													url : __ctxPath
															+ '/document/multiDelDocument.do',
													params : {
														ids : id
													},
													method : 'post',
													success : function() {
														var publicDocumentDetailWin=Ext.getCmp('PulicDocumentDetailWin');					      
							      						publicDocumentDetailWin.close();
														Ext.Msg.alert("信息提示", "成功删除所选记录！");
														var grid=Ext.getCmp('PublicDocumentGrid');
														grid.getStore().reload({
														    params : {
																start : 0,
																limit : 25
															}
														});
													}
												});
									}
								});							
							}
					  }));
					  publicDocumentTopBar.doLayout(true);
					}
				},
				failure : function(response, options) {
				},
				scope : this
	});	
}
