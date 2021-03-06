var BookBorrowForm = function(recordId) {
	this.recordId = recordId;
	var fp = this.setup();
	var window = new Ext.Window( {
		id : 'BookBorrowFormWin',
		title : '图书借出详细记录',
		width : 500,
		//height : 420,
		autoHeight : true,
		modal : true,
		layout : 'anchor',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : [ this.setup() ],
		buttons : [ {
			text : '借出图书',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp('BookBorrowForm');
				if (fp.getForm().isValid()) {
					fp.getForm().submit( {
						method : 'post',
						waitMsg : '正在提交数据...',
						success : function(fp, action) {
							Ext.Msg.alert('操作信息', '成功保存信息！');
							Ext.getCmp('BookBorrowGrid').getStore().reload();
							window.close();
						},
						failure : function(fp, action) {
							Ext.MessageBox.show( {
								title : '操作信息',
								msg : '信息保存出错，请联系管理员！',
								buttons : Ext.MessageBox.OK,
								icon : 'ext-mb-error'
							});
							window.close();
						}
					});
				}
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				window.close();
			}
		} ]
	});
	window.show();
};

BookBorrowForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel( {
		url : __ctxPath + '/admin/saveBorrowBookBorRet.do',
		layout : 'form',
		id : 'BookBorrowForm',
		frame : true,
		defaults : {
			widht : 400,
			anchor : '100%,100%'
		},
		formId : 'BookBorrowFormId',
		defaultType : 'textfield',
		items : [ {
			name : 'bookBorRet.recordId',
			id : 'recordId',
			xtype : 'hidden',
			value : this.recordId == null ? '' : this.recordId
		}, {
			name : 'bookBorRet.bookSnId',
			id : 'bookSnId',
			xtype : 'hidden'
		}, {
			fieldLabel : '应还时间',
			name : 'bookBorRet.returnTime',
			id : 'returnTime',
			xtype : 'datefield',
			format : 'Y-m-d',
			readOnly : true,
			allowBlank : false,
			blankText : '应还时间不能为空'
		}, {
					xtype : 'container',
					layout : 'column',
					style : 'padding-left:0px;margin-bottom:4px;',
					items : [
							{
								xtype : 'label',
								text : '借出图书名称:',
								style : 'padding-left:0px;margin-top:2px;',
								width : '100'
							},
							{
								xtype : 'textfield',
								name : 'bookBorRet.bookName',
								id : 'bookName',
								allowBlank : false,
								blankText : '借出图书名称不能为空',
								readOnly : true,
								width : '45%'
							},
							{
								xtype : 'button',
								text : '选择图书',
								handler : function() {
									BookSelector.getView(
											function(id, name) {
												var bookNameField = Ext
														.getCmp('bookName');
												bookNameField.setValue(name);
												var store = Ext.getCmp(
														'borrowIsbn')
														.getStore();
												store.reload( {
													params : {
														bookId : id
													}
												});
											}, true).show();

								}
							}, {
								xtype : 'button',
								text : ' 清除记录',
								handler : function() {
								var bookNameField = Ext.getCmp('bookName');
								bookNameField.setValue('');
							}
							} ]
				},
				{
					xtype : 'container',
					layout : 'column',
					style : 'padding-left:0px;margin-bottom:4px;',
					items : [ {
						xtype : 'label',
						text : '借出图书的ISBN:',
						style : 'padding-left:0px;margin-top:2px;',
						width : '100'
					}, {
						name : 'bookBorRet.borrowIsbn',
						id : 'borrowIsbn',
						allowBlank : false,
						blankText : '借出图书的ISBN不能为空',
						//readOnly : true,
						width : '45%',
						maxHeight : 200,
						xtype : 'combo',
						mode : 'local',
						editable : false,
						triggerAction : 'all',
						emptyText : '请选择图书系列',
						store : new Ext.data.SimpleStore( {
							url : __ctxPath + '/admin/getSnBookSn.do',
							fields : [ 'bookSnId', 'bookSn' ]
						}),
						displayField : 'bookSn',
						valueField : 'bookSnId',
//						valueField : 'bookSn',
						listeners : {
							select : function(combo, record, index) {
								Ext.getCmp('bookSnId').setValue(combo.value);
							}
						}
					} ]
				} ]
	});

	if (this.recordId != null && this.recordId != 'undefined') {
		formPanel.getForm().load(
				{
					deferredRender : false,
					url : __ctxPath + '/admin/getBookBorRet.do?recordId='
							+ this.recordId,
					//method : 'post',
					waitMsg : '正在载入数据...',
					success : function(form, action) {
						// Ext.Msg.alert('编辑', '载入成功！');
						// 对应还日期格式化后再进行输出
						var returnTime = action.result.data.returnTime;
						var returnTimeField = Ext.getCmp('returnTime');
						returnTimeField.setValue(new Date(getDateFromFormat(returnTime, "yyyy-MM-dd HH:mm:ss")));
					},
					failure : function(form, action) {
						// Ext.Msg.alert('编辑', '载入失败');
				}
				});
	}
	return formPanel;

};
