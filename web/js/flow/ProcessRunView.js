Ext.ns('ProcessRunView');
/**
 * 申请列表
 */
var ProcessRunView = function() {
	return new Ext.Panel({
		id : 'ProcessRunView',
		title : '我的申请流程列表',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'ProcessRunSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '标题'
					}, {
						xtype : 'textfield',
						name : 'Q_subject_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('ProcessRunSearchForm');
							var grid = Ext.getCmp('ProcessRunGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath + '/flow/listProcessRun.do',
									success : function(formPanel, action) {
										var result = Ext.util.JSON
												.decode(action.response.responseText);
										grid.getStore().loadData(result);
									}
								});
							}

						}
					}]
		}), this.setup()]
	});
};
/**
 * 建立视图
 */
ProcessRunView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
ProcessRunView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'runId',
					dataIndex : 'runId',
					hidden : true
				}, {
					header : '标题',
					dataIndex : 'subject'
				},{
					header : '时间',
					dataIndex : 'createtime',
					width:60
				},  {
					header : '管理',
					dataIndex : 'runId',
					width : 50,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var runId = record.data.runId;
						var defId=record.data.defId;
						var piId=record.data.piId;
						var runId=record.data.runId;
						var subject=record.data.subject;
						
						var str = '<button title="删除" value=" " class="btn-del" onclick="ProcessRunView.remove('
								+ runId + ')"></button>';
						//
						//runId,defId,piId,name
						if(piId!=null&&piId!=undefined&&piId!=''){		
							str += '&nbsp;<button type="button" title="审批明细" value=" " class="btn-approval" onclick="ProcessRunView.detail('+
							runId+','+defId+',\''+ piId + '\',\''+ subject + '\')"></button>';
						}
						return str;
					}
				}],
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
	var grid = new Ext.grid.GridPanel({
				id : 'ProcessRunGrid',
				store : store,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				autoHeight : true,
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
	return grid;

};

/**
 * 初始化数据
 */
ProcessRunView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/flow/listProcessRun.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'runId',
										type : 'int'
									}
									, 'subject','createtime',
									'defId', 'piId']
						}),
				remoteSort : true
			});
	store.setDefaultSort('runId', 'desc');
	return store;
};

/**
 * 删除单个记录
 */
ProcessRunView.remove = function(id) {
	var grid = Ext.getCmp("ProcessRunGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/flow/multiDelProcessRun.do',
								params : {
									ids : id
								},
								method : 'post',
								success : function() {
									Ext.Msg.alert("信息提示", "成功删除所选记录！");
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
};

/**
 * 
 */
ProcessRunView.edit = function(runId,name) {
	var contentPanel=App.getContentPanel();
	var startForm=contentPanel.getItem('ProcessRunStart'+runId);
	if(startForm==null){
		startForm=new ProcessRunStart(runId,name);
		contentPanel.add(startForm);
	}
	contentPanel.activate(startForm);
}
/**
 * 显示明细
 * @param {} runId
 * @param {} name
 */
ProcessRunView.detail=function(runId,defId,piId,name){
	var contentPanel=App.getContentPanel();
	var detailView=contentPanel.getItem('ProcessRunDetail'+runId);
	
	if(detailView==null){
		detailView=new ProcessRunDetail(runId,defId,piId,name);
		contentPanel.add(detailView);
	}
	
	contentPanel.activate(detailView);
};
