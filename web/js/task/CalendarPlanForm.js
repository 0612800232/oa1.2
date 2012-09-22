var CalendarPlanForm = function(planId) {
	this.planId = planId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'CalendarPlanFormWin',
				title : '日程详细信息',
				width : 560,
				height:500,
				modal : true,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '保存',
					iconCls: 'btn-save',
					handler : function() {
						var fp = Ext.getCmp('CalendarPlanForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
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

CalendarPlanForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/task/saveCalendarPlan.do',
				layout : 'form',
				id : 'CalendarPlanForm',
				frame : true,
				defaults : {
					//width : 360
					anchor : '98%,98%'
				},
				formId : 'CalendarPlanFormId',
				items : [{
							name : 'calendarPlan.planId',
							id : 'planId',
							xtype : 'hidden',
							value : this.planId == null ? '' : this.planId
						},{
							xtype:'radiogroup',
							fieldLabel : '紧急程度',
							autoHeight: true,
							columns : 3,
							items : [{
										boxLabel : '一般',
										name : 'calendarPlan.urgent',
										inputValue : 0,
										id:'urgent0',
										checked : true
									},{
										boxLabel : '重要',
										name : 'calendarPlan.urgent',
										inputValue : 1,
										id:'urgent1'
									},{
										boxLabel : '紧急',
										name : 'calendarPlan.urgent',
										inputValue : 2,
										id:'urgent2'
									}]
						}, {
							fieldLabel : '内容',
							xtype:'htmleditor',
							height:200,
							name : 'calendarPlan.content',
							id : 'content'
						}, {
							fieldLabel : '员工ID',
							xtype:'hidden',
							name : 'calendarPlan.userId',
							id : 'userId'
						}, {
							layout:'column',
							autoHeight: true,
							items:[
								{   
									columnWidth:.8,
									layout : 'form',
										items : [
											{
												fieldLabel:'分配给',
												xtype:'textfield',
												anchor:'100%,100%',
												name : 'calendarPlan.fullname',
												id : 'fullname'
											}]
									
								},{
									columnWidth:.2,
									xtype:'button',
									iconCls:'btn-user-sel',
									text:'选择员工',
									handler:function(){
										UserSelector.getView(function(userId,fullname){
											Ext.getCmp("userId").setValue(userId);
											Ext.getCmp("fullname").setValue(fullname);
										}).show();
									}
								}
							]
						}, {
							xtype:'radiogroup',
							fieldLabel : '任务类型',
							autoHeight: true,
							columns : 2,
							items : [{
										boxLabel : '限期任务',
										name : 'calendarPlan.taskType',
										inputValue : 1,
										id:'taskType1',
										checked : true,
										listeners:{
											check:function(ck,bval){
												if(bval){
													Ext.getCmp("timeDuration").show();
												}
											}
										}
									}, {
										boxLabel : '非限期任务',
										name : 'calendarPlan.taskType',
										id:'taskType2',
										inputValue : 2,
										listeners:{
											check:function(ck,bval){
												if(bval){
													Ext.getCmp("timeDuration").hide();
													Ext.getCmp("startTime").setValue('');
													Ext.getCmp("endTime").setValue('');
												}
											}
										}
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
									format: 'Y-m-d H:i:s'
								}, {
									fieldLabel : '结束时间',
									name : 'calendarPlan.endTime',
									xtype:'datetimefield',
									id : 'endTime',
									anchor : '98%,98%',
									format: 'Y-m-d H:i:s'
								}
							]
						},{
							xtype : 'radiogroup',
							fieldLabel : '显示方式',
							autoHeight: true,
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
						}

				]
			});

	if (this.planId != null && this.planId != 'undefined') {
		formPanel.getForm().load({
					deferredRender : false,
					url : __ctxPath + '/task/getCalendarPlan.do?planId='
							+ this.planId,
					waitMsg : '正在载入数据...',
					success : function(form, action) {
						// Ext.Msg.alert('编辑', '载入成功！');
						var plan=action.result.data;
						Ext.getCmp("urgent" + plan.urgent).setValue(true);
						Ext.getCmp("taskType" + plan.taskType).setValue(true);
						Ext.getCmp("showStyle" + plan.showStyle).setValue(true);
					},
					failure : function(form, action) {
						
					}
				});
	}
	return formPanel;

};
