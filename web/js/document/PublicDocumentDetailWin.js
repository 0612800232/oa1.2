var PublicDocumentDetailWin=function(docId,docName){
  	this.docId = docId;
  	this.docName=docName;
    var pa=this.setup();
	var window=new Ext.Window({
	        id : 'PulicDocumentDetailWin',
			title : ''+docName,
			autoHeight :true,
			width:510,
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
PublicDocumentDetailWin.prototype.setup=function(){
	var topbar=this.topbar();
	var panel=new Ext.Panel({
	     id:'PublicDocumentDetailWinPanel',
	     modal : true,
	     tbar:topbar,
	     autoScroll:true,
	     aotuHeight:true,
	     width:479,
	     autoLoad:{url:__ctxPath+'/document/publicDetailDocument.do?docId='+this.docId}	     
	});
	return panel;
		
}
PublicDocumentDetailWin.prototype.topbar=function() {
	var toolbar = new Ext.Toolbar({
				id : 'PublicDocumentTopBar',
				height : 25,
				bodyStyle:'text-align:center',
				items : []
			});
						
	return toolbar;
};