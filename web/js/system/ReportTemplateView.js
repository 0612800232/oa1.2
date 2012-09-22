Ext.ns('ReportTemplateView');
/**
 * 报表列表
 */
var ReportTemplateView = function() {
	return new Ext.Panel({
		id : 'ReportTemplateView',
		title : '报表列表',
		iconCls : 'menu-report',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'ReportTemplateSearchForm',
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
						name : 'Q_title_S_LK'
					}, {
						text : '描述'
					}, {
						xtype : 'textfield',
						name : 'Q_descp_S_LK'
					}, {
						text : '创建时间'
					}, {
						xtype : 'textfield',
						name : 'Q_createtime_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('ReportTemplateSearchForm');
							var grid = Ext.getCmp('ReportTemplateGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/system/listReportTemplate.do',
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
ReportTemplateView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
ReportTemplateView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'reportId',
					dataIndex : 'reportId',
					hidden : true
				}, {
					header : '标题',
					dataIndex : 'title'
				}, {
					header : '描述',
					dataIndex : 'descp'
				}, {
					header : '模版路径',
					dataIndex : 'reportLocation'
				}, {
					header : '查询条件路径',
					dataIndex : 'queryLocation'
				}, {
					header : '创建时间',
					dataIndex : 'createtime'
				}, {
					header : '修改时间',
					dataIndex : 'updatetime'
				}, {
					header : '管理',
					dataIndex : 'reportId',
					sortable : false,
					width : 55,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.reportId;
						var str = '<button title="查看" value=" " class="btn-preview" onclick="ReportTemplateView.preview('
								+ editId + ')"></button>';
						str += '<button title="删除" value=" " class="btn-del" onclick="ReportTemplateView.remove('
								+ editId + ')"></button>';
						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="ReportTemplateView.edit('
								+ editId + ')"></button>';
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
				id : 'ReportTemplateGrid',
				tbar : this.topbar(),
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

	grid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							ReportTemplateView.edit(rec.data.reportId);
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
ReportTemplateView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/system/listReportTemplate.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'reportId',
										type : 'int'
									}

									, 'title', 'descp', 'reportLocation',
									'queryLocation', 'createtime', 'updatetime']
						}),
				remoteSort : true
			});
	store.setDefaultSort('reportId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
ReportTemplateView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'ReportTemplateFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : [{
							iconCls : 'btn-add',
							text : '添加报表',
							xtype : 'button',
							handler : function() {
								new ReportTemplateForm();
							}
						}, {
							iconCls : 'btn-del',
							text : '删除报表',
							xtype : 'button',
							handler : function() {

								var grid = Ext.getCmp("ReportTemplateGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.Msg.alert("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids.push(selectRecords[i].data.reportId);
								}

								ReportTemplateView.remove(ids);
							}
						}]
			});
	return toolbar;
};

/**
 * 删除单个记录
 */
ReportTemplateView.remove = function(id) {
	var grid = Ext.getCmp("ReportTemplateGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/system/multiDelReportTemplate.do',
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
 * 编辑报表
 */
ReportTemplateView.edit = function(id) {
	new ReportTemplateForm(id);
}
/**
 * 查看报表
 */
ReportTemplateView.preview = function(id) {
	//只允许有一个编辑窗口
	var tabs = Ext.getCmp('centerTabPanel');
	var edit = Ext.getCmp('ReportPreview'+id);
	if(edit==null){
		edit = new ReportTemplatePreview(id);
		tabs.add(edit);
	}else{
		tabs.remove('ReportTemplatePreview');
		edit = new ReportTemplatePreview(id);
		tabs.add(edit);
	}
	tabs.activate(edit);
}
var ReportTemplatePreview = function(reportId){
var panel = new Ext.Panel({
				id : 'ReportPreview'+reportId,
				title:'查看报表',
				autoScroll:true,
				collapsible:true,
				tbar:[{xtype : 'label',text:'查询报表: '},
						 {xtype : 'label',text:"条件1"},
						 {xtype : 'textfield',id:'condition1'},
						 {xtype : 'label',text:"条件2"},
						 {xtype : 'textfield',id:'condition2'},
						 {
							xtype : 'button',
							text : '生成pdf报表',
							iconCls : 'search',
							handler : function(){
								var condition1 = Ext.getCmp('condition1').getValue();
								var condition2 = Ext.getCmp('condition2').getValue();
								var reportType = 'pdf';
								//要是查询条件里什么也没输入的话，则把参数值设为0,以免造成异常
								if(condition1==''){
									condition1='0';
									}
								if(condition2==''){
									condition2='0';	
									}
								document.location.href=__ctxPath+'/report/report.jsp?id='+reportId+'&condition1='+condition1+'&condition2='+condition2+'&reportType='+reportType;
								}
						},{
							xtype : 'button',
							text : '生成excel报表',
							iconCls : 'search',
							handler : function(){
								var condition1 = Ext.getCmp('condition1').getValue();
								var condition2 = Ext.getCmp('condition2').getValue();
								var reportType = 'xls';
								//要是查询条件里什么也没输入的话，则把参数值设为0,以免造成异常
								if(condition1==''){
									condition1='0';
									}
								if(condition2==''){
									condition2='0';
									}
								document.location.href=__ctxPath+'/report/report.jsp?id='+reportId+'&condition1='+condition1+'&condition2='+condition2+'&reportType='+reportType;
								}
						},{
							xtype : 'button',
							text : '生成html报表',
							iconCls : 'search',
							handler : function(){
								var condition1 = Ext.getCmp('condition1').getValue();
								var condition2 = Ext.getCmp('condition2').getValue();
								var reportType = 'html';
								//要是查询条件里什么也没输入的话，则把参数值设为0,以免造成异常
								if(condition1==''){
									condition1='0';
									}
								if(condition2==''){
									condition2='0';
									}
								document.location.href=__ctxPath+'/report/report.jsp?id='+reportId+'&condition1='+condition1+'&condition2='+condition2+'&reportType='+reportType;
								}
						}
						 ]
						 ,
				 items : [
							{
							xtype:'panel',
							//根据页面传来reportId，动态加载报表模版路径，显示报表
							html:'<iframe src="report/report.jsp?id='+reportId+'" width="100%" height="500" scrolling="auto"></iframe>'
							}
							 ]
			}
			    );
	return panel;
}
