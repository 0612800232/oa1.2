var GoodsApplyForm = function(applyId) {
	this.applyId = applyId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'GoodsApplyFormWin',
				title : '申请表详细信息',
				width : 395,
				autoHeight : true,
				modal : true,
				shadow:false,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '保存',
					iconCls:'btn-save',
					handler : function() {
						var fp = Ext.getCmp('GoodsApplyForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.Msg.alert('操作信息', '成功保存信息！');
									Ext.getCmp('GoodsApplyGrid').getStore()
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
					iconCls:'btn-cancel',
					handler : function() {
						window.close();
					}
				}]
			});
	window.show();
};

GoodsApplyForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/admin/saveGoodsApply.do',
				layout : 'form',
				id : 'GoodsApplyForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '100%,100%'
				},
				formId : 'GoodsApplyFormId',
				defaultType : 'textfield',
				items : [{
							name : 'goodsApply.applyId',
							id : 'applyId',
							xtype : 'hidden',
							value : this.applyId == null ? '' : this.applyId
						}, {
							name : 'goodsApply.goodsId',
							id : 'goodsId',
							xtype : 'hidden'
						}, {
							xtype : 'container',
							layout : 'column',
							style : 'padding-left:0px;margin-bottom:4px;',
							items : [{
										xtype : 'label',
										text : '商品名称:',
										style : 'margin-top:2px;',
										width : '27.2%'
									}, {
										// fieldLabel : '商品名称',
										xtype : 'textfield',
										name : 'inStock.officeGoods.goodsName',
										id : 'goodsName',
										allowBlank:false,
										readOnly : true,
										width : '31%'
									}, {
										xtype : 'button',
										text : '选择商品',
										handler : function() {
											GoodsSelector.getView(
													function(id, name) {
														var goodsIdField = Ext
																.getCmp('goodsId');
														goodsIdField
																.setValue(id);
														var goodsNameField = Ext
																.getCmp('goodsName');
														goodsNameField
																.setValue(name);
													}

													, true).show();
										}
									}, {
										xtype : 'button',
										text : ' 清除记录',
										handler : function() {
											var goodsIdField = Ext
													.getCmp('goodsId');
											goodsIdField.setValue('');
											var goodsNameField = Ext
													.getCmp('goodsName');
											goodsNameField.setValue('');
										}
									}]
						}, {
							fieldLabel : '申请日期',
							name : 'goodsApply.applyDate',
							id : 'applyDate',
							xtype : 'datefield',
							format : 'Y-m-d',
							allowBlank:false,
							readOnly:true
						}, {
							fieldLabel : '申请号',
							name : 'goodsApply.applyNo',
							id : 'applyNo',
							readOnly:true
						}, {
							fieldLabel : '申请数量',
							name : 'goodsApply.useCounts',
							allowBlank:false,
							xtype:'numberfield',
							id : 'useCounts'
							
						},{
								xtype : 'container',
								layout : 'column',
								style : 'padding-left:0px;margin-bottom:4px;',
								border : true,
								// layout:'column',
								items : [{
											xtype : 'label',
											text : '购买人:',
											style : 'margin-top:2px;',
											width : '27%'
										}, {
											// fieldLabel : '商品名称',
											xtype : 'textfield',
											name : 'goodsApply.proposer',
											id : 'proposer',
											allowBlank:false,
											readOnly : true,
											width : '31%'
										}, {
											xtype : 'button',
											text : '选择人员',
											handler : function() {
												UserSelector.getView(
														function(id, name) {
															var proposerField = Ext
																	.getCmp('proposer');
															proposerField
																	.setValue(name);
														}

														, false).show();
											}
										}, {
											xtype : 'button',
											text : ' 清除记录',
											handler : function() {
												var proposerField = Ext
														.getCmp('proposer');
												proposerField.setValue('');
											}
										}]
							}

						, {
							fieldLabel : '审批状态 ',
							hiddenName : 'goodsApply.approvalStatus',
							id : 'approvalStatus',
							xtype : 'combo',
							mode : 'local',
							editable : false,
							triggerAction : 'all',
							store : [['1', '已审批'], ['0', '未审批']]
						}, {
							fieldLabel : '备注',
							name : 'goodsApply.notes',
							id : 'notes',
							xtype:'textarea'
						}

				]
			});

	if (this.applyId != null && this.applyId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/admin/getGoodsApply.do?applyId=' + this.applyId,
			method:'post',
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				// Ext.Msg.alert('编辑', '载入成功！');
				var applyDate = action.result.data.applyDate;
				var applyDateField = Ext.getCmp('applyDate');
				applyDateField.setValue(new Date(getDateFromFormat(applyDate, "yyyy-MM-dd HH:mm:ss")));
				var goodsId=action.result.data.officeGoods.goodsId;
				var goodsName=action.result.data.officeGoods.goodsName;
				var goodsIdField=Ext.getCmp('goodsId');
	            var goodsNameField=Ext.getCmp('goodsName');
	            goodsIdField.setValue(goodsId);
	            goodsNameField.setValue(goodsName);
				
			},
			failure : function(form, action) {
				// Ext.Msg.alert('编辑', '载入失败');
			}
		});
	}
	return formPanel;

};
