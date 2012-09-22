var ContractForm = function(contractId) {
	this.contractId = contractId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'ContractFormWin',
				title : '合同详细信息',
				//width : 500,
				//height : 420,
				x:100,
				y:30,
				modal : true,
				autoWidth : true,
				autoHeight : true,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '保存',
					iconCls : 'btn-save',
					handler : function() {
						var fp = Ext.getCmp('ContractForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.Msg.alert('操作信息', '成功保存信息！');
									Ext.getCmp('ContractGrid').getStore()
											.reload();
									window.close();
								},
								failure : function(fp, action) {
									Ext.MessageBox.show({
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
				}]
			});
	window.show();
};

ContractForm.prototype.setup = function() {
	var _url = __ctxPath + '/system/listDepartment.do';
	var serviceDepSelector = new TreeSelector('serviceDepSelector', _url,
			'维护部门', 'serviceDep');
	var configGrid = new ContractConfigView();
	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/customer/saveContract.do',
		layout : 'table',
		layoutConfig : {
			columns : 2
		},
		id : 'ContractForm',
		frame : true,
		autoWidth : true,
		autoHeight : true,
		// defaults : {
		// labelWidth : 55
		// //anchor : '98%,98%'
		// },
		formId : 'ContractFormId',
		defaultType : 'textfield',
		items : [{
			xtype : 'fieldset',
			title : '合同信息',
			layout : 'form',
			rowspan : 2,
			labelWidth : 58,
			defaultType : 'textfield',
			autoWidth : true,
			autoHeight : true,
			defaults : {
				width : 280
			},
			items : [{
						name : 'contract.contractId',
						id : 'contractId',
						xtype : 'hidden',
						value : this.contractId == null ? '' : this.contractId
					}, {
						fieldLabel : '合同编号',
						name : 'contract.contractNo',
						id : 'contractNo'
					}, {
						fieldLabel : '合同标题',
						name : 'contract.subject',
						id : 'subject'
					}, {
						xtype : 'container',
						layout : 'column',
						height : 26,
						style : 'padding-left:0px;',
						defaultType : 'label',
						items : [{
									text : '合同金额:',
									width : 59,
									style : 'padding-left:0px;padding-top:3px;'
								}, {
									xtype : 'numberfield',
									width : 150,
									name : 'contract.contractAmount',
									id : 'contractAmount'
								}, {
									text : '元',
									width : 10,
									style : 'padding-left:0px;padding-top:3px;'
								}]
					}, {
						fieldLabel : '主要条款',
						xtype : 'textarea',
						name : 'contract.mainItem',
						id : 'mainItem'
					}, {
						fieldLabel : '售后条款',
						xtype : 'textarea',
						name : 'contract.salesAfterItem',
						id : 'salesAfterItem'
					},{
						xtype:'container',
						heigth:26,
						layout:'column',
						defaultType:'label',
						style:'padding-left:0px;',
						items:[{
							text:'合同附件:',
							width:57,
							style:'padding-left:0px;padding-top:3px;'
						},{
							xtype:'button',
							iconCls:'btn-upload',
							text:'上传',
							handler:function(){
								Ext.Msg.alert('Message','待实现!');
							}
						}]
					}, {
						xtype : 'container',
						height : 26,
						layout : 'column',
						// layoutConfig:{columns:4},
						defaultType : 'label',
						style : 'padding-left:0px;',
						items : [{
									text : '有效日期:',
									width : 56,
									style : 'padding-left:0px;padding-top:3px;'
								}, {
									// fieldLabel : '有效日期',
									xtype : 'datefield',
									width : 90,
									format : 'Y-m-d',
									readOnly:true,
									name : 'contract.validDate',
									id : 'validDate'
								}, {
									text : '至',
									width : 10,
									style : 'padding-left:0px;padding-top:3px;'
								}, {
									// fieldLabel : '有效期',
									xtype : 'datefield',
									width : 90,
									format : 'Y-m-d',
									readOnly:true,
									name : 'contract.expireDate',
									id : 'expireDate'
								}]
					}, {
						fieldLabel : '维护部门',// 本公司的部门
						name : 'contract.serviceDep',
						id : 'serviceDep',
						xtype : 'hidden'
					}, serviceDepSelector,// 下拉树选择部门
					{
						xtype : 'container',
						layout : 'column',
						height : 26,
						style : 'padding-left:0px;',
						items : [{
									xtype : 'label',
									text : '维护人*:',
									style : 'padding-left:0px;padding-top:3px;',
									width : 59
								}, {
									xtype : 'textfield',
									width : 100,
									readOnly : true,
									name : 'contract.serviceMan',
									id : 'serviceMan'
								}, {
									xtype : 'button',
									text : '维护人',
									iconCls : 'btn-mail_recipient',
									handler : function() {
										UserSelector.getView(
												function(userIds, fullnames) {
													Ext.getCmp('serviceMan').setValue(fullnames);
												}, true).show();
									}
								}]
					}, {
						xtype : 'container',
						layout : 'column',
						height : 26,
						style : 'padding-left:0px;',
						items : [{
									xtype : 'label',
									text : '签约人*:',
									style : 'padding-left:0px;padding-top:3px;',
									width : 59
								}, {
									xtype : 'textfield',
									width : 100,
									readOnly : true,
									name : 'contract.signupUser',
									id : 'signupUser'
								}, {
									xtype : 'button',
									text : '签约人',
									iconCls : 'btn-mail_recipient',
									handler : function() {
										UserSelector.getView(
												function(userIds, fullnames) {
													Ext.getCmp('signupUser').setValue(fullnames);
												}, true).show();
									}
								}]
					},{
						fieldLabel : '签约时间',
						xtype:'datefield',
						foramt:'Y-m-d',
						readOnly:true,
						name : 'contract.signupTime',
						id : 'signupTime'
					}]
		}, {
			xtype : 'fieldset',
			title : '项目信息',
			layout : 'form',
			//height : 150,
			labelWidth : 55,
			width : 380,
			autoHeight : true,
			defaultType : 'textfield',
			items : [{
						fieldLabel : '所属项目',// 项目选择器
						name : 'contract.projectId',
						id : 'projectId'
					},{
						xtype:'panel',
						width:200,
						autoHeight:true,
						html:'项目编号: <br> 项目名称: <br> 所属客户: <br>' +
								'联系人: <br> 项目描述: <br>'
					}]
		}, {
			xtype : 'fieldset',
			title : '配置单',
			layout : 'form',
			width : 380,
			autoHeight : true,
			//height : 150,
			labelWidth : 58,
			defaultType : 'textfield',
			items : [{
						fieldLabel : '收货地址',
						name : 'contract.consignAddress',
						id : 'consignAddress'
					}, {
						fieldLabel : '收货人',
						name : 'contract.consignee',
						id : 'consignee'
					},configGrid]
		}

		]
	});

	if (this.contractId != null && this.contractId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/customer/getContract.do?contractId='
					+ this.contractId,
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				// Ext.Msg.alert('编辑', '载入成功！');
			},
			failure : function(form, action) {
				// Ext.Msg.alert('编辑', '载入失败');
			}
		});
	}
	return formPanel;

};
