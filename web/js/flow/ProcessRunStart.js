/**
 *　流程启动的表单 
 */
var ProcessRunStart=function(defId,name,runId,activityName){
	this.defId=defId;
	this.name=name;
	this.activityName=activityName==null?'Start':activityName;
	this.runId=runId;
	return this.setup();
};

/**
 * 流程表单
 */
ProcessRunStart.prototype.setup=function(){
	
	var formPanel = new Ext.FormPanel({
		id : 'ProcessRunStart' + this.defId,
		frame : true,
		title : '流程启动－' + this.name,
		items : [{
					xtype : 'hidden',
					name : 'defId',
					value : this.defId
				}, {
					xtype : 'hidden',
					name : 'activityName',
					value : this.activityName
				}],
		fbar : new Ext.Toolbar({
			height : 28,
			frame : false,
			items : [{
				text : '保存',
				iconCls : 'btn-save',
				handler : function() {
					var form = formPanel.getForm();
					if (form.isValid()) {
						form.submit({
									url : __ctxPath + '/flow/saveProcessActivity.do',
									waitMsg : '正在提交信息...',
									success : function(userform, o) {
										Ext.MessageBox.show({
													title : '操作信息',
													msg : '成功保存信息！',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.INFO
												});
									}
								});
					}
				}
			}, '-', {
				text : '提交',
				iconCls : 'btn-ok',
				handler : function() {
					var form = formPanel.getForm();
					if (form.isValid()) {
						form.submit({
									url : __ctxPath
											+ '/flow/startProcessActivity.do',
									waitMsg : '正在提交信息...',
									success : function(userform, o) {
										Ext.MessageBox.show({
													title : '操作信息',
													msg : '成功提交，请查看流程审批情况！',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.INFO
												});
									}
								});
					}
				}
			}]
		})
	});
	
	$request({
		url:__ctxPath+ "/flow/getProcessActivity.do",
		params:{
			activityName:this.activityName,
			defId:this.defId,
			runId:this.runId
		},
		success:function(response,options){
			var object=Ext.util.JSON.decode(response.responseText);
			formPanel.add(object.data);
			formPanel.doLayout();
		}
	});
	
	return formPanel;
};