var NewPublicDocumentForm = function(dId,dName) {
	return this.setup(dId,dName);
};

NewPublicDocumentForm.prototype.setup = function(dId,dName) {
	var docId;
	this.docId=dId;
	var toolbar = this.initToolbar();
	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/document/saveDocument.do',
				title:dName==null?'新建公共文档':dName,
				iconCls:'menu-new-document',
				layout : 'form',
				id : 'NewPublicDocumentForm',
				tbar:toolbar,
				frame : true,
				formId : 'NewPublicDocumentFormId',
				items : [ 
				        {
				         xtype:'hidden',
				         id:'folderId',
				         name:'document.folderId'
				        },
						{
						layout:'column',
						height:28,
						items:[
						{text : '选择目录:',
						 xtype:'label',
						 width:98						 
						},{
						 name : 'docFolderName',
						 id : 'docFolderName',
						 xtype:'textfield',
						 width:165,
						 allowBlank:false
						},{
                         xtype:'button',
                         text:'请选择目录',
                         iconCls:'btn-select',
                         handler:function(){
                            DocFolderSelector.getView(
                              function(id, name){
                                  var docF=Ext.getCmp('docFolderName');
                                  var docFolderId=Ext.getCmp('folderId');
                                  docF.setValue(name);
                                  docFolderId.setValue(id);                          
                              }                           
                            ).show();
                         }
                         },{
                          xtype:'button',
                          text:'清除目录',
                          inconCls:'btn-clear',
                          handler:function(){
                            var docFolderName=Ext.getCmp('docFolderName');
                            var folderId=Ext.getCmp('folderId');
                            docFolderName.setValue('');
                            folderId.setValue('');                    	
                          }
                         }]},
							{
							fieldLabel : '文档名称',
							name : 'document.docName',
							id : 'docName',
							xtype:'textfield',
							width:165,
							allowBlank:false
						},{
							height : 250,
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
									}
						]
				}]
			});
	 if (this.docId != null && this.docId != 'undefined') {
		formPanel.getForm().load({
					deferredRender : false,
					url : __ctxPath + '/document/getDocument.do?docId='
							+ this.docId,
					waitMsg : '正在载入数据...',
					success : function(form, action) {
						var folder=action.result.data.docFolder;
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
						var folderId=folder.folderId;
						var folderName=folder.folderName;
						var folderIdField=Ext.getCmp('folderId');
						var folderNameField=Ext.getCmp('docFolderName');
						folderIdField.setValue(folderId);
						folderNameField.setValue(folderName);
											
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

/**
 * 
 * @return {}
 */
NewPublicDocumentForm.prototype.initToolbar = function() {

	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				items : [{
					text : '提交',
					iconCls:'btn-save',
					handler : function() {
						var docForm = Ext.getCmp('NewPublicDocumentForm');
						if(docForm.getForm().isValid()){
						docForm.getForm().submit({
									waitMsg : '正在提交,请稍候...',
									success : function(docForm, o) {
										Ext.Msg.alert('操作信息','提交成功！');
										var docForm = Ext.getCmp('NewPublicDocumentForm');
										docForm.getForm().reset();
										var fileAttaches=Ext.getCmp("fileAttaches");
										var filePanel=Ext.getCmp('filePanel');
										
										filePanel.body.update('');
										fileAttaches.setValue('');
									},
									failure : function(mailform,o){
										Ext.Msg.alert('错误信息',o.result.msg);
									}
								});
						}
					}

				}, {
					text : '重置',
					iconCls:'reset',
					handler : function() {
						var docForm = Ext.getCmp('NewPublicDocumentForm');
						docForm.getForm().reset();
						var fileAttaches=Ext.getCmp("fileAttaches");
						var filePanel=Ext.getCmp('filePanel');						
						filePanel.body.update('');
						fileAttaches.setValue('');
					}
				}]
			});
	return toolbar;
};

/**
 * 附件上传,可多附件
 * @param {} data
 */
function uploadMailAttach(data){
	var ids = null
	var fileIds = Ext.getCmp('fileIds');
	var filenames = Ext.getCmp('filenames');
	for(var i=0;i<data.length;i++){
		if(fileIds.getValue()!=''){
  			fileIds.setValue(fileIds.getValue()+',');
  			filenames.setValue(filenames.getValue()+',');
  		}
  		fileIds.setValue(fileIds.getValue()+data[i].fileId);
		filenames.setValue(filenames.getValue()+data[i].filename)
	}

}
