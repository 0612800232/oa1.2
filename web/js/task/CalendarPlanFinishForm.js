var CalendarPlanFinishForm = function(planId) {
	this.planId = planId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'CalendarPlanFinishFormWin',
				title : '完成任务',
				width : 560,
				height:480,
				modal : true,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '完成任务',
					id:'calendarPlanFinishBtn',
					iconCls: 'btn-save',
					handler : function() {
						var fp = Ext.getCmp('CalendarPlanFinishForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								params:{'calendarPlan.status':1},
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.Msg.alert('操作信息', '成功保存信息！');
									Ext.getCmp('CalendarPlanGrid').getStore().reload();
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
					iconCls: 'btn-cancel',
					handler : function() {
						window.close();
					}
				}]
			});
	window.show();
};

CalendarPlanFinishForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/task/saveCalendarPlan.do',
				layout : 'form',
				id : 'CalendarPlanFinishForm',
				frame : true,
				defaults : {
					anchor : '98%,98%'
				},
				items : [{
							name : 'calendarPlan.planId',
							id : 'planId',
							xtype : 'hidden',
							value : this.planId == null ? '' : this.planId
						}, 
						 {
							fieldLabel : '紧急程度',
							xtype : 'combo',
							triggerAction : 'all',
							hiddenName : 'calendarPlan.urgent',
							id : 'urgent',
							editable : false,
							disabled:true,
							store :[['0','一般'],['1','重要'],['2','紧急']]
						}, {
							fieldLabel : '内容',
							xtype:'textarea',
							disabled:true,
							height:100,
							name : 'calendarPlan.content',
							id : 'content'
						},{
							fieldLabel:'分配给',
							xtype:'textfield',
							anchor:'100%,100%',
							name : 'calendarPlan.fullname',
							id : 'fullname',
							disabled:true
						}, {
							xtype:'radiogroup',
							fieldLabel : '任务类型',
							autoHeight: true,
							disabled:true,
							columns : 2,
							items : [{
										boxLabel : '限期任务',
										name : 'calendarPlan.taskType',
										inputValue : 1,
										id:'taskType1'
									}, {
										boxLabel : '非限期任务',
										name : 'calendarPlan.taskType',
										id:'taskType2',
										inputValue : 2
									}]
						},{
							xtype:'fieldset',
							border:false,
							layout:'form',
							id:'timeDuration',
							autoHeight:true,
							items:[
								{
									fieldLabel : '开始时间',
									name : 'calendarPlan.startTime',
									xtype:'datetimefield',
									id : 'startTime',
									anchor : '98%,98%',
									disabled:true,
									format: 'Y-m-d H:i:s'
								}, {
									fieldLabel : '结束时间',
									name : 'calendarPlan.endTime',
									xtype:'datetimefield',
									id : 'endTime',
									anchor : '98%,98%',
									disabled:true,
									format: 'Y-m-d H:i:s'
								}
							]
						},{
							xtype : 'radiogroup',
							fieldLabel : '显示方式',
							autoHeight: true,
							disabled:true,
							columns : 2,
							items : [{
										boxLabel : '仅在任务中显示',
										name : 'calendarPlan.showStyle',
										inputValue : 1,
										id: 'showStyle1',
										checked : true
									}, {
										boxLabel : '在日程与任务中显示',
										name : 'calendarPlan.showStyle',
										id: 'showStyle2',
										inputValue : 2
									}]
						},
						{
							xtype:'textarea',
							fieldLabel:'反馈',
							allowBlank:false,
							name:'calendarPlan.feedback',
							id:'feedback'
						}

				]
			});

	if (this.planId != null && this.planId != undefined) {
		formPanel.getForm().load({
					deferredRender : false,
					url : __ctxPath + '/task/getCalendarPlan.do?planId='
							+ this.planId,
					waitMsg : '正在载入数据...',
					success : function(form, action) {
						// Ext.Msg.alert('编辑', '载入成功！');
						var plan=action.result.data;
						Ext.getCmp("taskType" + plan.taskType).setValue(true);
						Ext.getCmp("showStyle" + plan.showStyle).setValue(true);
						
						if(plan.status==1){
							Ext.getCmp("calendarPlanFinishBtn").setDisabled(true);
						}
					},
					failure : function(form, action) {
						
					}
				});
	}
	return formPanel;

};
