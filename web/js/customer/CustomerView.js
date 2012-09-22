Ext.ns('CustomerView');
/**
 * [Customer]列表
 */
var CustomerView = function() {
	return new Ext.Panel({
		id : 'CustomerView',
		title :'客户列表',
		iconCls:'menu-customerView',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'CustomerSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '查询条件:'
					}, {
						text : '行业 '
					}, {
						xtype : 'textfield',
						name : 'Q_industryType_S_LK',
						width:80
					},{
						text : '客户类型'
								//1=正式客户2=重要客户 3＝潜在客户4＝无效客户'
					}, {
						xtype : 'textfield',
						name : 'Q_customerType_S_LK',
						width:80
					}, {
						text : '客户名称 '
					}, {
						xtype : 'textfield',
						name : 'Q_customerName_S_LK',
						width:80
					}, {
						text : '负责人'
					}, {
						xtype : 'textfield',
						name : 'Q_customerManager_S_LK',
						width:80
					},{
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('CustomerSearchForm');
							var grid = Ext.getCmp('CustomerGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/customer/listCustomer.do',
									success : function(formPanel, action) {
										var result = Ext.util.JSON
												.decode(action.response.responseText);
										grid.getStore().loadData(result);
									}
								});
							}

						}
					}, {
						xtype : 'button',
						text : '高级查询',
						iconCls : 'search',
						handler : function() {
							Ext.alert.Msg('信息', '待实现．');
						}
					}]
		}), this.setup()]
	});
};
/**
 * 建立视图
 */
CustomerView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
CustomerView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'customerId',
					dataIndex : 'customerId',
					hidden : true
				}, {
					header : '客户类型',
					dataIndex : 'customerType',
					renderer:function(value){
						var str = '';
						if(value == '1'){//正式客户
							str += '<img title="正式客户" src="'+ __ctxPath +'/images/flag/customer/effective.png"/>'
						}else if ( value== '2'){//重要客户
							str += '<img title="重要客户" src="'+ __ctxPath +'/images/flag/mail/important.png"/>'
						}else if (value == '3'){//潜在客户
							str += '<img title="潜在客户" src="'+ __ctxPath +'/images/flag/customer/potential.png"/>'
						}else{//无效客户
							str += '<img title="无效客户" src="'+ __ctxPath +'/images/flag/customer/invalid.png"/>'
						}
						return str;
					}
				}, {
					header : '客户号',
					dataIndex : 'customerNo'
				}, {
					header : '客户名称',
					dataIndex : 'customerName'
				}, {
					header : '负责人',
					dataIndex : 'customerManager'
				}, {
					header : '电话',
					dataIndex : 'phone'
				}, {
					header : '邮箱',
					dataIndex : 'email'
				}, {
					header : '管理',
					dataIndex : 'customerId',
					width : 150,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.customerId;
						var customerName = record.data.customerName;
						var str = '<button title="删除" value=" " class="btn-del" onclick="CustomerView.remove('
								+ editId + ')">&nbsp</button>';
						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="CustomerView.edit('
								+ editId + ')">&nbsp</button>';
						str += '&nbsp;<button title="添加联系人" value="" class="btn-addCusLinkman" onclick="CustomerView.addLinkman('
								+ editId +')">&nbsp</button>';
						str += '&nbsp;<button title="管理联系人" value="" class="btn-editCusLinkman" onclick="CustomerView.editLinkman('
						+ editId +','+rowIndex+')">&nbsp</button>';
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
				id : 'CustomerGrid',
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
							CustomerView.edit(rec.data.customerId);
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
CustomerView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/customer/listCustomer.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'customerId',
										type : 'int'
									}

									, 'customerNo', 'customerType','companyScale',
									'customerName', 'customerManager', 'phone',
									'fax', 'site', 'email', 'state', 'city',
									'zip', 'address', 'registerFun','turnOver','currencyUnit', 'otherDesc',
									'principal', 'openBank', 'accountsNo',
									'taxNo', 'notes']
						}),
				remoteSort : true
			});
	store.setDefaultSort('customerId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
CustomerView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'CustomerFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : [{
							iconCls : 'btn-add',
							text : '添加客户',
							xtype : 'button',
							handler : function() {
								new CustomerForm();
							}
						}, {
							//先不给用户删除客户,只能转移客户
							iconCls : 'btn-del',
							text : '删除客户',
							xtype : 'button',
							handler : function() {

								var grid = Ext.getCmp("CustomerGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.Msg.alert("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids.push(selectRecords[i].data.customerId);
								}

								CustomerView.remove(ids);
							}
						},{
							text:'转移客户',
							xtype:'button',
							iconCls:'',
							handler:function(){
								//new CusLinkmanForm();
							}
						}]
			});
	return toolbar;
};

/**
 * 删除单个记录
 */
CustomerView.remove = function(id) {
	var grid = Ext.getCmp("CustomerGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/customer/multiDelCustomer.do',
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
CustomerView.edit = function(id) {
	new CustomerForm(id);
}
/**
 * 添加联系人
 */
CustomerView.addLinkman = function(customerId){
	new CusLinkmanForm();
	Ext.getCmp('customerId').setValue(customerId);
	Ext.getCmp('custoemrSelect').hide();
	Ext.getCmp('CusLinkmanForm').doLayout();
}
/**
 * 管理客户联系人
 * @param {} customerId
 */
CustomerView.editLinkman = function(customerId,rowIndex){
	var customerName = Ext.getCmp('CustomerGrid').getStore().getAt(rowIndex).data.customerName;
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
				header : 'linkmanId',
					dataIndex : 'linkmanId',
					hidden : true
				},{
					header : 'Main',
					dataIndex : 'isPrimary',
					width:45,
					renderer:function(value){
						if(value == '1'){
							return '<img title="主要联系人" src="'+ __ctxPath +'/images/flag/mail/important.png"/>';
						}
					}
				},{
					header : '姓名',
					dataIndex : 'fullname'
				},{
					header : '管理',
					dataIndex : 'linkmanId',
					width : 100,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.linkmanId;
						var str = '<input type="button" title="删除" value=" " class="btn-del" onclick="CustomerView.removeCusLinkman('
								+ editId + ')"/>';
						str += '&nbsp;<input type="button" title="编辑" value=" " class="btn-edit" onclick="CusLinkmanView.edit('
								+ editId + ')"/>';
						return str;
					}
				}],
			defaults : {
					sortable : true,
					menuDisabled : false,
					width : 100
				}
		})
		var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/customer/listCusLinkman.do'
						}),
						
				baseParams:{'Q_customer.customerId_L_EQ':customerId},
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'linkmanId',
										type : 'int'
									}
									, 'fullname', 'isPrimary']
						}),
				remoteSort : true
			});
		store.setDefaultSort('isPrimary', 'desc');
		store.load(
			{
				params : {
					start : 0,
					limit : 25
				}
			}
		)
	var toolbar = new Ext.Toolbar({
				id : 'CusLinkmanFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : [{
							iconCls : 'btn-add',
							text : '添加联系人',
							xtype : 'button',
							handler : function() {
								CustomerView.addLinkman(customerId);
							}
						}, {
							iconCls : 'btn-del',
							text : '删除联系人',
							xtype : 'button',
							handler : function() {
								CustomerView.deleteCusLinkman();
							}
						}]
			});
	var grilPanel = new Ext.grid.GridPanel({
			id : 'ManageLinkmanGrid',
			tbar : toolbar,
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
					}),
			listeners : {
				rowdblclick : function(gridPanel, rowindex, e){
					gridPanel.getSelectionModel().each(function(rec) {
							new CusLinkmanForm(rec.data.linkmanId);
						});
				}
			}
					
	});
	var window = new Ext.Window({
				id : 'ManageCusLinkmanWin',
				title : customerName+'-联系人管理',
				width : 500,
				height : 300,
				minWidth : 499,
				minHeight : 299,
				modal : true,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [grilPanel],
				buttons : [{
					text : '关闭',
					handler : function() {
						window.close();
					}
				}]
			});
	window.show();
}
/**
 * 管理客户联系人时删除联系人操作
 */
CustomerView.deleteCusLinkman = function(){
	var grid = Ext.getCmp('ManageLinkmanGrid');

	var selectRecords = grid.getSelectionModel()
			.getSelections();
	
	if (selectRecords.length == 0) {
		Ext.Msg.alert("信息", "请选择要删除的记录！");
		return;
	}
	var ids = Array();
	for (var i = 0; i < selectRecords.length; i++) {
		ids.push(selectRecords[i].data.linkmanId);
	}
	
	CustomerView.removeCusLinkman(ids);
}

CustomerView.removeCusLinkman = function (id) {
	var manageGrid = Ext.getCmp('ManageLinkmanGrid');
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/customer/multiDelCusLinkman.do',
								params : {
									ids : id
								},
								method : 'post',
								success : function() {
									Ext.Msg.alert("信息提示", "成功删除所选记录！");
									
									if(manageGrid !=null){
										manageGrid.getStore().reload({
												params : {
													start : 0,
													limit : 25
												}
										});
									}
								}
							});
				}
			});
	};
