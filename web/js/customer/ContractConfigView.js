Ext.ns('ContractConfigView');
/**
 * [ContractConfig]列表
 */
var ContractConfigView = function() {
	return this.setup();
//	return new Ext.Panel({
//		id : 'ContractConfigView',
//		title : '合同配置',
//		iconCls: 'menu-contract_config',
//		autoScroll : true,
//		items : [new Ext.FormPanel({
//			height : 35,
//			frame : true,
//			id : 'ContractConfigSearchForm',
//			layout : 'column',
//			defaults : {
//				xtype : 'label'
//			},
//			items : [{
//						text : '请输入查询条件:'
//					}, {
//						text : '设备名称'
//					}, {
//						xtype : 'textfield',
//						name : 'Q_itemName_S_LK'
//					}, {
//						text : ''
//					}, {
//						xtype : 'textfield',
//						name : 'Q_contactId_S_LK'
//					}, {
//						text : '设置规格'
//					}, {
//						xtype : 'textfield',
//						name : 'Q_itemSpec_S_LK'
//					}, {
//						text : '数量'
//					}, {
//						xtype : 'textfield',
//						name : 'Q_amount_S_LK'
//					}, {
//						text : '备注'
//					}, {
//						xtype : 'textfield',
//						name : 'Q_notes_S_LK'
//					}, {
//						text : ''
//					}, {
//						xtype : 'textfield',
//						name : 'Q_contractId_S_LK'
//					}, {
//						xtype : 'button',
//						text : '查询',
//						iconCls : 'search',
//						handler : function() {
//							var searchPanel = Ext
//									.getCmp('ContractConfigSearchForm');
//							var grid = Ext.getCmp('ContractConfigGrid');
//							if (searchPanel.getForm().isValid()) {
//								searchPanel.getForm().submit({
//									waitMsg : '正在提交查询',
//									url : __ctxPath
//											+ '/customer/listContractConfig.do',
//									success : function(formPanel, action) {
//										var result = Ext.util.JSON
//												.decode(action.response.responseText);
//										grid.getStore().loadData(result);
//									}
//								});
//							}
//
//						}
//					}]
//		}), this.setup()]
//	});
};
/**
 * 建立视图
 */
ContractConfigView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
ContractConfigView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'configId',
					dataIndex : 'configId',
					hidden : true
				}, {
					header : '设备名称',
					width:100,
					dataIndex : 'itemName',
					editor: new Ext.form.TextField({
						allowBlank: false
					})
				}, {
					header : '设置规格',
					width:100,
					dataIndex : 'itemSpec',
					editor: new Ext.form.TextField({
						allowBlank: false
					})
				}, {
					header : '数量',
					width:43,
					dataIndex : 'amount',
					editor: new Ext.form.NumberField({
						allowBlank: false
					})
				}, {
					header : '备注',
					width:120,
					dataIndex : 'notes',
					editor: new Ext.form.TextField({
					})
				}, {
					header : '管理',
					dataIndex : 'configId',
					width : 65,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.configId;
						var str = '<button title="删除" value=" " class="btn-del" onclick="ContractConfigView.remove('
								+ editId + ')">&nbsp</button>';
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
	var grid = new Ext.grid.EditorGridPanel({
				id : 'ContractConfigGrid',
				tbar : this.topbar(),
				store : store,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				height : 180,
				clicksToEdit: 1,
				cm : cm,
				sm : sm,
				viewConfig : {
					forceFit : true,
					enableRowBody : false,
					showPreview : false
				}
//				bbar : new Ext.PagingToolbar({
//							pageSize : 25,
//							store : store,
//							displayInfo : true,
//							displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
//							emptyMsg : "当前没有记录"
//						})
			});

//	grid.addListener('rowdblclick', function(grid, rowindex, e) {
//				grid.getSelectionModel().each(function(rec) {
//							ContractConfigView.edit(rec.data.configId);
//						});
//			});
	return grid;

};

/**
 * 初始化数据
 */
ContractConfigView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/customer/listContractConfig.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'configId',
										type : 'int'
									}

									, 'itemName','itemSpec',
									'amount', 'notes']
						}),
				remoteSort : true
			});
	store.setDefaultSort('configId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
ContractConfigView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'ContractConfigFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : [{
							iconCls : 'btn-add',
							text : '添加配置',
							xtype : 'button',
							handler : function() {
								//new ContractConfigForm();
								var grid = Ext.getCmp('ContractConfigGrid');
								var store = grid.getStore();
								var Plant = grid.getStore().recordType;
				                var p = new Plant();
				                grid.stopEditing();
				                store.insert(0, p);
				                grid.startEditing(0, 0);
							}
						}, {
							iconCls : 'btn-del',
							text : '删除配置',
							xtype : 'button',
							handler : function() {

								var grid = Ext.getCmp("ContractConfigGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.Msg.alert("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids.push(selectRecords[i].data.configId);
								}

								ContractConfigView.remove(ids);
							}
						}]
			});
	return toolbar;
};

/**
 * 删除单个记录
 */
ContractConfigView.remove = function(id) {
	var grid = Ext.getCmp("ContractConfigGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
						url : __ctxPath + '/customer/multiDelContractConfig.do',
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
//ContractConfigView.edit = function(id) {
//	new ContractConfigForm(id);
//}
