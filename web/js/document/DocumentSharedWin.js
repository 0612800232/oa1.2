var DocumentSharedWin=function(docId){
  	this.docId = docId;
    var pa=this.setup();
	var window=new Ext.Window({
	        id : 'DocumentSharedWin',
			title : '文档信息',
			width : 510,
			autoHeight :true,
			modal : true,
			autoScroll:true,
			layout : 'anchor',
			plain : true,
			bodyStyle : 'padding:5px;',
			buttonAlign : 'center',
			items : [this.setup()],
			buttons : [{
				text : '关闭',
				handler : function() {
					window.close();
				}
			}]
		});
	window.show();
}
DocumentSharedWin.prototype.setup=function(){
	var panel=new Ext.Panel({
	     id:'DocumentSharedWinPanel',
	     modal : true,
	     autoScroll:true,
	     aotuHeight:true,
	     width:479,
	     autoLoad:{url:__ctxPath+'/document/detailDocument.do?docId='+this.docId}	     
	});
	return panel;
		
}