Ext.ns('DepreRecordView');
/**
 * [DepreRecord]列表
 */
var DepreRecordView = function() {
	return new Ext.Panel({
		id : 'DepreRecordView',
		title : '固定资产折旧记录列表',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'DepreRecordSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '资产名称'
					}, {
						xtype : 'textfield',
						name : 'Q_assetsId_S_LK'
					}, {
						text : '工作量'
					}, {
						xtype : 'textfield',
						name : 'Q_workCapacity_S_LK'
					}, {
						text : '折旧金额'
					}, {
						xtype : 'textfield',
						name : 'Q_depreAmount_S_LK'
					}, {
						text : '执行时间'
					}, {
						xtype : 'textfield',
						name : 'Q_calTime_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('DepreRecordSearchForm');
							var grid = Ext.getCmp('DepreRecordGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/admin/listDepreRecord.do',
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
DepreRecordView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
DepreRecordView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'recordId',
					dataIndex : 'recordId',
					hidden : true
				}, {
					header : '资产名称',
					dataIndex : 'assets'
				}, {
					header : '工作量',
					id:'workCapacity',
					dataIndex : 'workCapacity'
				}, {
					header : '折旧后值',
					dataIndex : 'depreAmount'
				}, {
					header : '计算时间',
					dataIndex : 'calTime'
				}, {
					header : '管理',
					dataIndex : 'recordId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.recordId;
						var str = '<button title="删除" value=" " class="btn-del" onclick="DepreRecordView.remove('
								+ editId + ')">&nbsp;</button>';
//						str += '&nbsp;<input type="button" title="编辑" value=" " class="btn-edit" onclick="DepreRecordView.edit('
//								+ editId + ')"/>';
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
				id : 'DepreRecordGrid',
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

//	grid.addListener('rowdblclick', function(grid, rowindex, e) {
//				grid.getSelectionModel().each(function(rec) {
//							DepreRecordView.edit(rec.data.recordId);
//						});
//			});
	return grid;

};

/**
 * 初始化数据
 */
DepreRecordView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/admin/listDepreRecord.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'recordId',
										type : 'int'
									}

									,{ name:'assets',
									   mapping:'fixedAssets.assetsName'
									}, 'workCapacity',
									'depreAmount', 'calTime']
						}),
				remoteSort : true
			});
	store.setDefaultSort('recordId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
DepreRecordView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'DepreRecordFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : [{
							iconCls : 'btn-add',
							text : '添加折旧记录',
							xtype : 'button',
							handler : function() {
								new DepreRecordForm();
							}
						}, {
							iconCls : 'btn-del',
							text : '删除折旧记录',
							xtype : 'button',
							handler : function() {

								var grid = Ext.getCmp("DepreRecordGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.Msg.alert("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids.push(selectRecords[i].data.recordId);
								}

								DepreRecordView.remove(ids);
							}
						}]
			});
	return toolbar;
};

/**
 * 删除单个记录
 */
DepreRecordView.remove = function(id) {
	var grid = Ext.getCmp("DepreRecordGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/admin/multiDelDepreRecord.do',
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
DepreRecordView.edit = function(id) {
	new DepreRecordForm(id);
}
