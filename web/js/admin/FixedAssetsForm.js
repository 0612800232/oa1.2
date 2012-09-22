var FixedAssetsForm = function(assetsId) {
	this.assetsId = assetsId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'FixedAssetsFormWin',
				title : '[FixedAssets]详细信息',
				width : 420,
				height : 310,
				modal : true,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '保存',
					iconCls : 'btn-save',
					handler : function() {
						var fp = Ext.getCmp('FixedAssetsForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.Msg.alert('操作信息', '成功保存信息！');
									Ext.getCmp('FixedAssetsGrid').getStore()
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

FixedAssetsForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/admin/saveFixedAssets.do',
		layout : 'form',
		id : 'FixedAssetsForm',
		frame : true,
		// defaults : {
		// width : 200,
		// anchor : '98%,98%'
		// },
		formId : 'FixedAssetsFormId',
		defaultType : 'textfield',
		items : [{
					name : 'fixedAssets.assetsId',
					id : 'assetsId',
					xtype : 'hidden',
					value : this.assetsId == null ? '' : this.assetsId
				}, {
					xtype : 'tabpanel',
					plain : true,
					border : false,
					activeTab : 0,
					items : [{
						layout : 'form',
						title : '基本信息(*为必填)',
						width : 300,
						id : 'assetsFormPanel',
						height : 190,
						defaults : {
							anchor : '98%,98%'
						},
						defaultType : 'textfield',
						items : [{
									fieldLabel : '资产名称*',
									name : 'fixedAssets.assetsName',
									id : 'assetsName',
									allowBlank : false

								}, {
									xtype : 'container',
									layout : 'column',
									id : 'assetsNoContainer',
									style : 'padding-left:0px;padding-bottom:3px;',
									items : [{
										xtype : 'label',
										style : 'padding-left:0px;padding-top:3px;',
										text : '资产编号:',
										width : 101
									}, {
										xtype : 'textfield',
										name : 'fixedAssets.assetsNo',
										id : 'assetsNo',
										readOnly : true,
										width : 266
									}]
								}, {
									fieldLabel : '资产类别*',
									hiddenName : 'fixedAssets.assetsType.assetsTypeId',
									id : 'assetsTypeId',
									xtype : 'combo',
									mode : 'local',
									allowBlank : false,
									editable : false,
									valueField : 'id',
									displayField : 'name',
									readOnly : true,
									triggerAction : 'all',
									store : new Ext.data.SimpleStore({
												url : __ctxPath
														+ '/admin/comboxAssetsType.do',
												fields : ['id', 'name']
											})
								}, {
									fieldLabel : '置办日期*',
									name : 'fixedAssets.buyDate',
									id : 'buyDate',
									format : 'Y-m-d',
									xtype : 'datefield',
									allowBlank : false,
									editable : false,
									readOnly : true
								}, {
									fieldLabel : '规格型号',
									name : 'fixedAssets.model',
									id : 'model'
								}, {
									fieldLabel : '制造厂商',
									name : 'fixedAssets.manufacturer',
									id : 'manufacturer'
								}, {
									fieldLabel : '出厂日期',
									name : 'fixedAssets.manuDate',
									format : 'Y-m-d',
									id : 'manuDate',
									xtype : 'datefield',
									allowBlank : false,
									editable : false,
									readOnly : true
								}]
					}, {
						layout : 'form',
						id : 'deprePanel',
						title : '折旧信息(*为必填)',
						height : 190,
						defaults : {
							anchor : '98%,98%'
						},
						defaultType : 'textfield',
						items : [{
							fieldLabel : '折旧类型*',
							hiddenName : 'fixedAssets.depreType.depreTypeId',
							id : 'depreTypeId',
							xtype : 'combo',
							mode : 'local',
							allowBlank : false,
							editable : false,
							valueField : 'id',
							displayField : 'name',
							readOnly : true,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										url : __ctxPath
												+ '/admin/comboxDepreType.do',
										fields : ['id', 'name', 'method']
									}),
							listeners : {
								select : function(combo, record, index) {
									var method = record.data.method;
									if (method == '1') {
										Ext.getCmp('intendTermContainer')
												.show();
										Ext.getCmp('intendTermContainer')
										Ext.getCmp('WorkGrossPanel').hide();
									}
									if (method == '2') {
										Ext.getCmp('WorkGrossPanel').show();
										Ext.getCmp('intendTermContainer')
												.hide();
									}
								}
							}
						}, {
							fieldLabel : '开始折旧日期',
							name : 'fixedAssets.startDepre',
							id : 'startDepre',
							format : 'Y-m-d',
							xtype : 'datefield',
							editable : false,
							readOnly : true
						}, {
							layout : 'column',
							xtype : 'container',
							style : 'padding-left:0px;padding-bottom:3px;',
							id : 'intendTermContainer',
							items : [{
										xtype : 'label',
										style : 'padding-left:0px;',
										text : '预计使用年限*:',
										width : 101
									}, {
										xtype : 'textfield',
										name : 'fixedAssets.intendTerm',
										id : 'intendTerm',
										width : 266
									}]
						}, {
							layout : 'column',
							xtype : 'container',
							style : 'padding-left:0px;padding-bottom:3px;',
							id : 'WorkGrossPanel',
							defaults : {
								anchor : '100%,100%'
							},
							items : [{
										xtype : 'label',
										text : '预使用总工作量*:',
										style : 'padding-left:0px;',
										width : 101
									}, {
										xtype : 'textfield',
										name : 'fixedAssets.intendWorkGross',
										id : 'intendWorkGross'
									}, {
										xtype : 'label',
										text : '单位:'
									}, {
										xtype : 'textfield',
										name : 'fixedAssets.workGrossUnit',
										id : 'workGrossUnit',
										width : 30
									}]
						}, {
							layout : 'column',
							style : 'padding-left:0px;padding-bottom:3px;',
							xtype : 'container',
							items : [{
										xtype : 'label',
										text : '残值率*',
										style : 'padding-left:0px;padding-top:3px;',
										width : 101
									}, {
										xtype : 'textfield',
										name : 'fixedAssets.remainValRate',
										id : 'remainValRate',
										width : 240,
										allowBlank : false
									}, {
										xtype : 'label',
										text : '%',
										width : 10
									}]
						}, {
							fieldLabel : '资产值*',
							name : 'fixedAssets.assetValue',
							id : 'assetValue',
							allowBlank : false
						}, {
							fieldLabel : '资产当前值*',
							name : 'fixedAssets.assetCurValue',
							id : 'assetCurValue',
							allowBlank : false
						}]

					}, {
						layout : 'form',
						title : '其他信息(*为必填)',
						height : 190,
						defaults : {
							anchor : '98%,98%'
						},
						defaultType : 'textfield',

						items : [{
							layout : 'column',
							style : 'padding-left:0px;padding-bottom:3px;',
							xtype : 'container',
							items : [{
										xtype : 'label',
										text : '所属部门:',
										style : 'padding-left:0px;padding-top:3px;',
										width : 101

									}, {
										xtype : 'textfield',
										name : 'fixedAssets.beDep',
										id : 'beDep',
										allowBlank : false,
										readOnly : true,
										width : 108
									}, {
										xtype : 'button',
										iconCls : 'btn-dep-sel',
										text : '选择部门',
										handler : function() {
											DepSelector.getView(
													function(id, name) {
														Ext.getCmp('beDep')
																.setValue(name);
													}, true).show();
										}
									}, {
										xtype : 'button',
										text : '清除记录',
										handler : function() {
											Ext.getCmp('beDep').setValue('');
										}
									}]
						}, {
							layout : 'column',
							style : 'padding-left:0px;padding-bottom:3px;',
							xtype : 'container',
							items : [{
										xtype : 'label',
										text : '保管人:',
										style : 'padding-left:0px;padding-top:3px;',
										width : 101

									}, {
										xtype : 'textfield',
										name : 'fixedAssets.custodian',
										id : 'custodian',
										readOnly : true,
										width : 108
									}, {
										xtype : 'button',
										iconCls : 'btn-user-sel',
										text : '选择人员',
										handler : function() {
											UserSelector.getView(
													function(id, name) {
														Ext.getCmp('custodian')
																.setValue(name);
													}, true).show();
										}
									}, {
										xtype : 'button',
										text : '清除记录',
										handler : function() {
											Ext.getCmp('custodian')
													.setValue('');
										}
									}]
						}, {
							fieldLabel : '备注',
							name : 'fixedAssets.notes',
							id : 'notes',
							height : 130,
							xtype : 'textarea'
						}]
					}]

				}

		]
	});

	if (this.assetsId != null && this.assetsId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/admin/getFixedAssets.do?assetsId='
					+ this.assetsId,
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				// Ext.Msg.alert('编辑', '载入成功！');
				var method = action.result.data.depreType.calMethod;
				if (method == '2') {
					Ext.getCmp('WorkGrossPanel').show();
					Ext.getCmp('intendTermContainer').hide();
				} else {
					Ext.getCmp('WorkGrossPanel').hide();
					Ext.getCmp('intendTermContainer').show();
				}
				Ext.getCmp('buyDate').setValue(new Date(getDateFromFormat(
						action.result.data.buyDate, "yyyy-MM-dd HH:mm:ss")));
				Ext.getCmp('startDepre').setValue(new Date(getDateFromFormat(
						action.result.data.startDepre, "yyyy-MM-dd HH:mm:ss")));
				Ext.getCmp('manuDate').setValue(new Date(getDateFromFormat(
						action.result.data.manuDate, "yyyy-MM-dd HH:mm:ss")));
			},
			failure : function(form, action) {
				// Ext.Msg.alert('编辑', '载入失败');
			}
		});
	}
	return formPanel;

};
