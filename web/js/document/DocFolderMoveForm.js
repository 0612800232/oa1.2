var DocFolderMoveForm=function(){
	return this.setup();	
}

DocFolderMoveForm.prototype.setup = function() {
	var toolbar = this.initToolbar();
	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/document/moveDocFolder.do',
				title:'文件夹转移',
				iconCls:'menu-folder-go',
				layout : 'form',
				id : 'DocFolderMoveForm',
				tbar:toolbar,
				frame : true,
				formId : 'DocFolderMoveFormId',
				items : [ 
				        {
				         xtype:'hidden',
				         id:'folderIdOld',
				         name:'folderIdOld'
				        },
				        {
				         xtype:'hidden',
				         id:'folderIdNew',
				         name:'folderIdNew'
				        },
						{
						layout:'column',
						height:28,
						items:[
						{text : '选择文件夹:',
						 xtype:'label',
						 width:98						 
						},{
						 name : 'docFolderNameOld',
						 id : 'docFolderNameOld',
						 xtype:'textfield',
						 width:165,
						 allowBlank:false
						},{
                         xtype:'button',
                         text:'请选择目录',
                         iconCls:'btn-select',
                         handler:function(){
                            PersonalDocFolderSelector.getView(
                              function(id, name){
                                  if(id==0){
                                      Ext.Msg.alert('操作错误','不能转移该文件！');                 
                                  }else{
	                                  var docF=Ext.getCmp('docFolderNameOld');
	                                  var docFolderId=Ext.getCmp('folderIdOld');
	                                  docF.setValue(name);
	                                  docFolderId.setValue(id);
                                  }
                              }                           
                            ).show();
                         }
                         },{
                          xtype:'button',
                          text:'清除目录',
                          inconCls:'btn-clear',
                          handler:function(){
                            var docFolderName=Ext.getCmp('docFolderNameOld');
                            var folderId=Ext.getCmp('folderIdOld');
                            docFolderName.setValue('');
                            folderId.setValue('');                    	
                          }
                         }]},
                         {
						layout:'column',
						height:28,
						items:[
						{text : '转移到:',
						 xtype:'label',
						 width:98						 
						},{
						 name : 'docFolderNameNew',
						 id : 'docFolderNameNew',
						 xtype:'textfield',
						 width:165,
						 allowBlank:false
						},{
                         xtype:'button',
                         text:'请选择目录',
                         iconCls:'btn-select',
                         handler:function(){
                            PersonalDocFolderSelector.getView(
                              function(id, name){                                 
	                                  var docF=Ext.getCmp('docFolderNameNew');
	                                  var docFolderId=Ext.getCmp('folderIdNew');
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
                            var docFolderName=Ext.getCmp('docFolderNameNew');
                            var folderId=Ext.getCmp('folderIdNew');
                            docFolderName.setValue('');
                            folderId.setValue('');                    	
                          }
                         }]}
				]
			});
	return formPanel;

};

/**
 * 
 * @return {}
 */
DocFolderMoveForm.prototype.initToolbar = function() {

	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				items : [{
					text : '提交',
					iconCls:'btn-save',
					handler : function() {
						var folderIdOld=Ext.getCmp('folderIdOld');
						var folderIdNew=Ext.getCmp('folderIdNew');
						if(folderIdOld.getValue()==folderIdNew.getValue()){
						     Ext.Msg.alert('错误信息','不能转移到自己的目录下！');
						}else{
						    var docForm = Ext.getCmp('DocFolderMoveForm');
							if(docForm.getForm().isValid()){
							docForm.getForm().submit({
										waitMsg : '正在提交,请稍候...',
										success : function(docForm, o) {
											Ext.Msg.confirm('操作信息','提交成功！');
											var docForm = Ext.getCmp('DocFolderMoveForm');
											docForm.getForm().reset();
										},
										failure : function(docForm,o){
											Ext.Msg.alert('错误信息',o.result.msg);
										}
									});
							}
						}
					}

				}, {
					text : '重置',
					iconCls:'reset',
					handler : function() {
						var docForm = Ext.getCmp('DocFolderMoveForm');
						docForm.getForm().reset();
					}
				}]
			});
	return toolbar;
};
