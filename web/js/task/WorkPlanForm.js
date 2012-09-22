var WorkPlanForm = function(planId) {
	this.planId = planId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'WorkPlanFormWin',
				title : '工作计划详细信息',
				width : 560,
				height : 580,
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
						var fp = Ext.getCmp('WorkPlanForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.Msg.alert('操作信息', '成功保存信息！');
									Ext.getCmp('WorkPlanGrid').getStore().reload();
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

WorkPlanForm.prototype.setup = function() {
	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/task/saveWorkPlan.do',
				layout : 'form',
				id : 'WorkPlanForm',
				frame : true,
				defaults : {
					width : 400,
					anchor : '98%,98%'
				},
				formId : 'WorkPlanFormId',
				defaultType : 'textfield',
				items : [{
							name : 'workPlan.planId',
							id : 'planId',
							xtype : 'hidden',
							value : this.planId == null ? '' : this.planId
						}, {
							fieldLabel : '计划名称',
							name : 'workPlan.planName',
							id : 'planName'
						}, {
							fieldLabel : '计划内容',
							name : 'workPlan.planContent',
							xtype:'htmleditor',
							height:150,
							id : 'planContent'
						}, 
						{
							xtype:'container',
							height:26,
							layout:'column',
							style:'padding-left:0px;',
							defaultType:'label',
							items:[{
								text : '时间范围:',
								width:101,
								style:'padding-left:0px;padding-top:3px;'
							},{
								text : '从',
								style:'padding-left:0px;padding-top:3px;'
							},{
								xtype:'datefield',
								width: 149,
								format:'Y-m-d',
								readOnly:true,
								name : 'workPlan.startTime',
								id : 'startTime'
							},{
								text : '至',
								style:'padding-left:0px;padding-top:3px;'
							},{
								xtype:'datefield',
								width: 149,
								format:'Y-m-d',
								readOnly:true,
								name : 'workPlan.endTime',
								id : 'endTime'
							}]
						},{
							fieldLabel : '计划类型',
							name : 'workPlan.typeId',
							xtype:'combo',
							editable : false,
							triggerAction : 'all',
							id : 'typeId',
							store : new Ext.data.SimpleStore({
											autoLoad : true,
											url : __ctxPath
													+ '/task/comboPlanType.do',
											fields : ['typeId', 'typeName']
										}),
								displayField : 'typeName',
								valueField : 'typeId'
						}, {
							fieldLabel : '发布范围',
							name : 'workPlan.issueScope',
							id : 'issueScope'
						}, {
							fieldLabel : '参与人',
							name : 'workPlan.participants',
							id : 'participants'
						}, {
							fieldLabel : '负责人',
							name : 'workPlan.principal',
							id : 'principal'
						}, {
							fieldLabel : '备注',
							name : 'workPlan.note',
							xtype:'textarea',
							id : 'note'
						},{
							xtype:'radiogroup',
							fieldLabel : '是否启用',
							autoHeight: true,
							columns :2,
							items : [{
										boxLabel : '是',
										name : 'workPlan.status',
										inputValue : 1,
										id:'status1',
										checked : true
									},{
										boxLabel : '否',
										name : 'workPlan.status',
										inputValue : 0,
										id:'status0'
									}]
						},{
							xtype:'radiogroup',
							fieldLabel : '是否为个人计划',
							autoHeight: true,
							columns :2,
							items : [{
										boxLabel : '个人',
										name : 'workPlan.isPersonal',
										inputValue : 0,
										id:'isPersonal0',
										checked : true
									},{
										boxLabel : '部门',
										name : 'workPlan.isPersonal',
										inputValue : 1,
										id:'isPersonal1'
									}]
						}, {
							fieldLabel : '图标',
							name : 'workPlan.icon',
							id : 'icon'
						}

				]
			});

	if (this.planId != null && this.planId != 'undefined') {
		formPanel.getForm().load({
					deferredRender : false,
					url : __ctxPath + '/task/getWorkPlan.do?planId='
							+ this.planId,
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
