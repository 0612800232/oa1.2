Ext.ns('PhoneBookView');
/**
 * 联系人列表
 */
var PhoneBookView = function() {

};

PhoneBookView.prototype.getStore = function() {
	var store = PhoneBookView.store;
	return store;
};

PhoneBookView.prototype.getView = function() {
	return new Ext.Panel({
		id : 'PhoneBookView',
		region : 'center',
		title : '联系人列表',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'PhoneBookSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '姓名'
					}, {
						xtype : 'textfield',
						name : 'Q_fullname_S_LK'
					}, {
						text : '称谓'
					}, {
						xtype : 'textfield',
						name : 'Q_title_S_LK'
					}
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_birthday_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_nickName_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_duty_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_spouse_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_childs_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_companyName_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_companyAddress_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_companyPhone_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_companyFax_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_homeAddress_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_homeZip_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_mobile_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_phone_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_email_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_QQ_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_MSN_S_LK'
					// }
					// ,{
					// text : ''
					// }, {
					// xtype : 'textfield',
					// name : 'Q_note_S_LK'
					// }
					, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PhoneBookSearchForm');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/communicate/listPhoneBook.do',
									success : function(formPanel, action) {
										var result = Ext.util.JSON
												.decode(action.response.responseText);
										PhoneBookView.store.loadData(result);
									}
								});
							}

						}
					}]
		}), this.setup()]
	});
};

PhoneBookView.prototype.setPhoneId = function(phoneId) {
	this.phoneId = phoneId;
	PhoneBookView.phoneId = phoneId;
};

PhoneBookView.prototype.getPhoneId = function() {
	return this.phoneId;
};
/**
 * 建立视图
 */
PhoneBookView.prototype.setup = function() {
	return this.panel();
};

/**
 * 建立DataPanel
 */
PhoneBookView.prototype.panel = function() {

	this.store = this.store();
	var store = this.store;
	var a = new Array(6);
	store.load({
				params : {
					start : 0,
					limit : 6
				}
			});
	store.on('load', AJAX_Loaded, store, true);// 这里需要注意
	var phoneBookPanel = new Ext.Panel({
				id : 'phoneBookView',
				closable : true,
				tbar : this.topbar(),
				autoHeight : true,
				// title : '联系人详细信息',
				layout : 'column',
				bbar : new Ext.PagingToolbar({
							pageSize : 6,
							store : store,
							displayInfo : true,
							displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
							emptyMsg : "当前没有记录"
						}),
				height : 500,
				width : 600,
				defaults : {
					// 应用到每个包含的panel
					bodyStyle : 'padding:15px'
				},
				layoutConfig : {
					// layout-specific configs go here
					titleCollapse : false,
					animate : true,
					activeOnTop : true,
					region : 'center',
					margins : '35 5 5 0'
				},
				items : []
			});

	return phoneBookPanel;

	function AJAX_Loaded() {
		var phoneBookPanel = Ext.getCmp('phoneBookView');
		phoneBookPanel.removeAll();
		for (var i = 0; i < store.getCount(); i++) {
			var rec = store.getAt(i);
			idd = rec.get("phoneId");
			var nickName = rec.get("nickName");
			var name = rec.get("fullname");
			var mobile = rec.get("mobile");
			var email = rec.get("email");
			var qq = rec.get("qqNumber");
			var handlerWrapper = function(button, event, idd) {
				// Fetch additional data
			};
			panel = new Ext.Panel({
						id : 'aa' + idd,
						title : '' + idd,
						columnWidth : .33,
						height : 150,
						bodyStyle : '',
						width : 160,
						html : '<p>姓名：' + name + '</p><p>手机：' + mobile
								+ '</p><p>Email:' + email + '</p><p>qq:' + qq
								+ '</p>',
						bbar : [new Ext.Toolbar.TextItem(''), {
									xtype : "button"
								}, {
									pressed : true,
									text : '编辑',
									iconCls : 'btn-edit',
									handler : edit.createDelegate(this, [idd])
								}, {
									xtype : "button"
								}, {
									pressed : true,
									text : '删除',
									iconCls : 'delete-info',
									handler : remove
											.createDelegate(this, [idd])
								}]
					});
			phoneBookPanel.add(panel);
			phoneBookPanel.doLayout();

		}
	}

};

var edit = function(phoneId) {
	PhoneBookView.edit(phoneId);
};

var remove = function(phoneId) {
	PhoneBookView.remove(phoneId);
}
/**
 * 初始化数据
 */
PhoneBookView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/communicate/listPhoneBook.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'phoneId',
										type : 'int'
									}

									, 'fullname', 'title', 'birthday',
									'nickName', 'duty', 'spouse', 'childs',
									'companyName', 'companyAddress',
									'companyPhone', 'companyFax',
									'homeAddress', 'homeZip', 'mobile',
									'phone', 'email', 'qqNumber', 'msn',
									'note', 'userId', 'groupId', 'isShared']
						}),
				remoteSort : true
			});
	store.setDefaultSort('phoneId', 'desc');
	PhoneBookView.store = store;
	return store;
};

/**
 * 建立操作的Toolbar
 */
PhoneBookView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'PhoneBookFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : [{
							iconCls : 'btn-add',
							text : '添加联系人',
							xtype : 'button',
							handler : function() {
								new PhoneBookForm();
							}
						}, {
							iconCls : 'btn-del',
							text : '删除联系人',
							xtype : 'button',
							handler : function() {

								var grid = Ext.getCmp("PhoneBookGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.Msg.alert("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids.push(selectRecords[i].data.phoneId);
								}

								PhoneBookView.remove(ids);
							}
						}]
			});
	return toolbar;
};

/**
 * 删除单个记录
 */
PhoneBookView.remove = function(id) {
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/communicate/multiDelPhoneBook.do',
								params : {
									ids : id
								},
								method : 'post',
								success : function() {
									Ext.Msg.alert("信息提示", "成功删除所选记录！");
									PhoneBookView.store.reload({
												params : {
													start : 0,
													limit : 6
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
PhoneBookView.edit = function(id) {
	new PhoneBookForm(id);
}
