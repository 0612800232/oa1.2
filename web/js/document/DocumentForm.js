var DocumentForm = function(docId) {
	this.docId = docId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'DocumentFormWin',
				title : '文档详细信息',
				width : 680,
				height : 500,
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
					iconCls:'btn-save',
					handler : function() {
						var fp = Ext.getCmp('DocumentForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.Msg.alert('操作信息', '成功信息保存！');
									Ext.getCmp('DocumentGrid').getStore().reload();
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

DocumentForm.prototype.setup = function() {
	var _url = __ctxPath+'/document/listDocFolder.do?method=1';//不把根目录显示出来
	var folderSelector =  new TreeSelector('folderSelect',_url,'文件夹*','folderId');
	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/document/saveDocument.do',
		id : 'DocumentForm',
		width : 600,
		frame : true,
		formId : 'DocumentFormId',
		items : [
				{
					name: 'folderId',
					id:'folderId',
					xtype:'hidden'
				},
				{
					name : 'document.docId',
					id : 'docId',
					xtype : 'hidden',
					value : this.docId == null ? '' : this.docId
				},folderSelector, {
					xtype : 'textfield',
					fieldLabel : '文档名称',
					name : 'document.docName',
					id : 'docName',
					anchor : '98%'
				}, {
					height : 280,
					anchor : '98%',
					xtype : 'htmleditor',
					fieldLabel : '内容',
					name : 'document.content',
					id : 'content'
				}, {
					layout : 'column',
					items : [{
								columnWidth : .7,
								layout : 'form',
								items : [
										{
											fieldLabel : '附件',
											xtype : 'panel',
											id:'filePanel',
											frame:true,
											height:80,
											autoScroll:true,
											html:''
										}]
							}, {
								columnWidth : .3,
								items : [{
											xtype : 'button',
											text : '添加附件',
											handler : function() {
												var dialog=App.createUploadDialog({
													  file_cat:'document',
													  callback:function(data){
													  	var fileIds=Ext.getCmp("fileIds");
													  	var filePanel=Ext.getCmp('filePanel');

													  	for(var i=0;i<data.length;i++){
													  		if(fileIds.getValue()!=''){
													  			fileIds.setValue(fileIds.getValue()+',');
													  		}
													  		fileIds.setValue(fileIds.getValue()+data[i].fileId);
													  		Ext.DomHelper.append(filePanel.body,'<span><a href="#" onclick="FileAttachDetail.show('+data[i].fileId+')">'+data[i].filename+'</a> <img class="img-delete" src="'+__ctxPath+'/images/system/delete.gif" onclick="removeFile(this,'+data[i].fileId+')"/>&nbsp;|&nbsp;</span>');
													  	}
													  } 
												});
												dialog.show(this);
											}
										}, {
											xtype : 'button',
											text : '清除附件',
											handler : function() {
												var fileAttaches=Ext.getCmp("fileAttaches");
												var filePanel=Ext.getCmp('filePanel');
												
												filePanel.body.update('');
												fileAttaches.setValue('');
											}
										},{
											xtype:'hidden',
											id:'fileIds',
											name:'fileIds'
										}]
							}]
				}]
	});

	if (this.docId != null && this.docId != 'undefined') {
		formPanel.getForm().load({
					deferredRender : false,
					url : __ctxPath + '/document/getDocument.do?docId='
							+ this.docId,
					waitMsg : '正在载入数据...',
					success : function(form, action) {
						var folderId=action.result.data.docFolder.folderId;
						var folderName=action.result.data.docFolder.folderName;
						Ext.getCmp('folderId').setValue(folderId);
						Ext.getCmp('folderSelect').setValue(folderName);
						var af=action.result.data.attachFiles;
						var filePanel=Ext.getCmp('filePanel');
						var fileIds=Ext.getCmp("fileIds");
						for(var i=0;i<af.length;i++){
							if(fileIds.getValue()!=''){
					  			fileIds.setValue(fileIds.getValue()+',');
					  		}
					  		fileIds.setValue(fileIds.getValue()+af[i].fileId);
							Ext.DomHelper.append(filePanel.body,'<span><a href="#" onclick="FileAttachDetail.show('+af[i].fileId+')">'+af[i].fileName+'</a><img class="img-delete" src="'+__ctxPath+'/images/system/delete.gif" onclick="removeFile(this,'+af[i].fileId+')"/>&nbsp;|&nbsp;</span>');
						}
					},
					failure : function(form, action) {
						Ext.MessageBox.show({
									title : '操作信息',
									msg : '载入信息失败，请联系管理员！',
									buttons : Ext.MessageBox.OK,
									icon : 'ext-mb-error'
								});
					}
				});
	}
	return formPanel;

};

function removeFile(obj,fileId){
	var fileIds=Ext.getCmp("fileIds");
	var value=fileIds.getValue();
	if(value.indexOf(',')<0){//仅有一个附件
		fileIds.setValue('');
	}else{
		value=value.replace(',' + fileId,'').replace(fileId+',','');
		fileIds.setValue(value);
	}
	
	var el=Ext.get(obj.parentNode);
	el.remove();
};
