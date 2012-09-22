var FileAttachForm = function(fileId) {
	this.fileId = fileId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'FileAttachFormWin',
				title : '附件详细信息',
				width : 500,
				height : 420,
				modal : true,
				minWidth : 300,
				minHeight : 200,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '保存',
					handler : function() {
						var fp = Ext.getCmp('FileAttachForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.Msg.alert('操作信息', '成功信息保存！');
									Ext.getCmp('FileAttachGrid').getStore()
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
					handler : function() {
						window.close();
					}
				}]
			});
	window.show();
};

FileAttachForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/system/saveFileAttach.do',
				layout : 'form',
				id : 'FileAttachForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '100%,100%'
				},
				formId : 'FileAttachFormId',
				defaultType : 'textfield',
				items : [{
							name : 'fileAttach.fileId',
							id : 'fileId',
							xtype : 'hidden',
							value : this.fileId == null ? '' : this.fileId
						}, {
							fieldLabel : '文件名',
							name : 'fileAttach.fileName',
							id : 'fileName'
						}, {
							fieldLabel : '文件路径',
							name : 'fileAttach.filePath',
							id : 'filePath'
						}, {
							fieldLabel : '创建时间',
							name : 'fileAttach.createtime',
							id : 'createtime'
						}, {
							fieldLabel : '扩展名',
							name : 'fileAttach.ext',
							id : 'ext'
						}, {
							fieldLabel : '附件类型',
							name : 'fileAttach.type',
							id : 'type'
						}, {
							fieldLabel : '说明',
							name : 'fileAttach.note',
							id : 'note'
						}, {
							fieldLabel : '上传者',
							name : 'fileAttach.creator',
							id : 'creator'
						}

						, {
							fieldLabel : '文件名',
							name : 'fileAttach.fileName',
							id : 'fileName'
						}, {
							fieldLabel : '文件路径',
							name : 'fileAttach.filePath',
							id : 'filePath'
						}, {
							fieldLabel : '创建时间',
							name : 'fileAttach.createtime',
							id : 'createtime',
							xtype : 'datefield',
							// 将日期格式化为2000-01-01 00:00:00格式
							format : 'Y-m-d H:i:s'
						}, {
							fieldLabel : '扩展名',
							name : 'fileAttach.ext',
							id : 'ext'
						}, {
							fieldLabel : '附件类型',
							name : 'fileAttach.type',
							id : 'type'
						}, {
							fieldLabel : '说明',
							name : 'fileAttach.note',
							id : 'note'
						}, {
							fieldLabel : '上传者',
							name : 'fileAttach.creator',
							id : 'creator'
						}

				]
			});

	if (this.fileId != null && this.fileId != 'undefined') {
		formPanel.getForm().load({
					deferredRender : false,
					url : __ctxPath + '/system/getFileAttach.do?fileId='
							+ this.fileId,
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
