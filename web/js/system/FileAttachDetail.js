/*
 * 文件附件详细
 */
Ext.ns('FileAttachDetail');
FileAttachDetail.show=function(fileId){
	var window = new Ext.Window({
				title : '文档详细信息',
				width : 480,
				height : 280,
				modal : true,
				minWidth : 300,
				minHeight : 200,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				scope:this,
				buttonAlign : 'center',
				autoLoad:{
					url:__ctxPath+'/document/fileDetail.do?fileId='+fileId
				},
				buttons:[
				{
					xtype:'button',
					text:'关闭',
					handler:function(){
						window.close();
					}
				}
				]
				
	});
	window.show();
};