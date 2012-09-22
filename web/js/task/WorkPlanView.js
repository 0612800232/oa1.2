Ext.ns('WorkPlanView');
/**
 * 工作计划列表
 */
var WorkPlanView = function() {
	return new Ext.Panel({
		id : 'WorkPlanView',
		title : '工作计划列表',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'WorkPlanSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '计划名称'
					}, {
						xtype : 'textfield',
						name : 'Q_planName_S_LK'
					}, {
						text : '计划内容'
					}, {
						xtype : 'textfield',
						name : 'Q_planContent_S_LK'
					}, {
						text : '开始日期'
					}, {
						xtype : 'textfield',
						name : 'Q_startTime_S_LK'
					}, {
						text : '结束日期'
					}, {
						xtype : 'textfield',
						name : 'Q_endTime_S_LK'
					}, {
						text : '计划类型'
					}, {
						xtype : 'textfield',
						name : 'Q_typeId_S_LK'
					}, {
						text : '员工ID'
					}, {
						xtype : 'textfield',
						name : 'Q_userId_S_LK'
					}, {
						text : '发布范围'
					}, {
						xtype : 'textfield',
						name : 'Q_issueScope_S_LK'
					}, {
						text : '参与人'
					}, {
						xtype : 'textfield',
						name : 'Q_participants_S_LK'
					}, {
						text : '负责人'
					}, {
						xtype : 'textfield',
						name : 'Q_principal_S_LK'
					}, {
						text : '备注'
					}, {
						xtype : 'textfield',
						name : 'Q_note_S_LK'
					}, {
						text : '状态'
					}, {
						xtype : 'textfield',
						name : 'Q_status_S_LK'
					}, {
						text : '是否为个人计划'
					}, {
						xtype : 'textfield',
						name : 'Q_isPersonal_S_LK'
					}, {
						text : '图标'
					}, {
						xtype : 'textfield',
						name : 'Q_icon_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('WorkPlanSearchForm');
							var grid = Ext.getCmp('WorkPlanGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath + '/task/listWorkPlan.do',
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
WorkPlanView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
WorkPlanView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'planId',
					dataIndex : 'planId',
					hidden : true
				}, {
					header : '计划名称',
					dataIndex : 'planName'
				}, {
					header : '开始日期',
					dataIndex : 'startTime'
				}, {
					header : '结束日期',
					dataIndex : 'endTime'
				}, {
					header : '计划类型',
					dataIndex : 'typeId'
				}, {
					header : '员工ID',
					dataIndex : 'userId'
				}, {
					header : '发布范围',
					dataIndex : 'issueScope'
				}, {
					header : '负责人',
					dataIndex : 'principal'
				},{
					header : '状态',
					dataIndex : 'status'
				}, {
					header : '是否为个人计划',
					dataIndex : 'isPersonal'
				}, {
					header : '图标',
					dataIndex : 'icon'
				}, {
					header : '管理',
					dataIndex : 'planId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.planId;
						var str = '<input type="button" title="删除" value=" " class="btn-del" onclick="WorkPlanView.remove('
								+ editId + ')"/>';
						str += '&nbsp;<input type="button" title="编辑" value=" " class="btn-edit" onclick="WorkPlanView.edit('
								+ editId + ')"/>';
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
				id : 'WorkPlanGrid',
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
							WorkPlanView.edit(rec.data.planId);
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
WorkPlanView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/task/listWorkPlan.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'planId',
										type : 'int'
									}

									, 'planName', 'planContent', 'startTime',
									'endTime', 'typeId', 'userId',
									'issueScope', 'participants', 'principal',
									'note', 'status', 'isPersonal', 'icon']
						}),
				remoteSort : true
			});
	store.setDefaultSort('planId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
WorkPlanView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'WorkPlanFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : [{
							iconCls : 'btn-add',
							text : '添加工作计划',
							xtype : 'button',
							handler : function() {
								new WorkPlanForm();
							}
						}, {
							iconCls : 'btn-del',
							text : '删除工作计划',
							xtype : 'button',
							handler : function() {

								var grid = Ext.getCmp("WorkPlanGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.Msg.alert("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids.push(selectRecords[i].data.planId);
								}

								WorkPlanView.remove(ids);
							}
						}]
			});
	return toolbar;
};

/**
 * 删除单个记录
 */
WorkPlanView.remove = function(id) {
	var grid = Ext.getCmp("WorkPlanGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/task/multiDelWorkPlan.do',
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
WorkPlanView.edit = function(id) {
	new WorkPlanForm(id);
}
