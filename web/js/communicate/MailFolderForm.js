var MailFolderForm = function(folderId,parentId) {
	this.folderId = folderId;
	this.parentId = parentId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'MailFolderFormWin',
				title : 'MailFolder详细信息',
				width : 300,
				height : 160,
				modal : true,
				minWidth : 200,
				minHeight : 100,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '保存',
					handler : function() {
						var fp = Ext.getCmp('MailFolderForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.Msg.alert('操作信息', '成功信息保存！');
									Ext.getCmp('leftMailBoxTree').root.reload();
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
					handler : function() {
						window.close();
					}
				}]
			});
	window.show();
};

MailFolderForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/communicate/saveMailFolder.do',
		layout : 'form',
		id : 'MailFolderForm',
		frame : true,
		defaults : {
			widht : 300,
			anchor : '100%,100%'
		},
		formId : 'MailFolderFormId',
		defaultType : 'textfield',
		items : [
				{
					name : 'mailFolder.folderId',
					id : 'folderId',
					xtype : 'hidden',
					value : this.folderId == null ? '' : this.folderId
				},
					{
					fieldLabel : '父目录',
					name : 'mailFolder.parentId',
					xtype:'hidden',
					id : 'parentId',
					value:this.parentId == null ? '' : this.parentId
				}, 
//				{
//					fieldLabel : '目录层',
//					name : 'mailFolder.level',
//					id : 'level',
//					xtype:'hidden'
//				}, 
//					{
//					fieldLabel : '主键',
//					name : 'mailFolder.userId',
//					id : 'userId'
//				},
				{
					fieldLabel : '文件夹名称',
					name : 'mailFolder.folderName',
					id : 'folderName'
				},{
					fieldLabel :'是否共享', //'1=表示共享，则所有的员工均可以使用该文件夹 0=私人文件夹',
					hiddenName : 'mailFolder.isPublic',
					id : 'isPublic',
					xtype:'combo',
					mode : 'local',
					editable : false,
					triggerAction : 'all',
					store:[['1','是'], ['0','否']],
					value:0
				}
//					{
//					fieldLabel : '文件夹类型 ',//1=收信箱  2=发信箱     3=草稿箱    4=删除箱    10=其他'
//					name : 'mailFolder.folderType',
//					id : 'folderType'
//				}
		]
	});

	if (this.folderId != null && this.folderId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/communicate/getMailFolder.do?folderId='
					+ this.folderId,
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
