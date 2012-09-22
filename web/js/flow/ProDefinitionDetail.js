/**
 *　流程详细页 
 */

 var ProDefinitionDetail=function(defId,title){
 	this.defId=defId;
 	this.title=title;
 	return this.getView();
 };
 
 ProDefinitionDetail.prototype.getView=function(){
 	
 	var leftPanel=new Ext.Panel({
 		title:'流程示意图',
 		width:500,
 		height:800,
 		split:true,
 		region:'west',
 		margin:'5 5 5 5',
 		html:'<img src="'+__ctxPath+ '/jbpmImage?defId='+this.defId+ '"/>'
 	});
 	
 	var rightPanel=new Ext.Panel({
 		title:'流程描述',
 		width:400,
 		height:800,
 		margin:'5 5 5 5',
 		region:'center',
 		autoLoad:{
					url:__ctxPath+'/flow/processDetail.do?defId='+this.defId
		}
 	});

 	var topPanel=new Ext.Panel({
 		id:'ProDefinitionDetail'+this.defId,
 		title:'流程详细信息－'+this.title,
 		layout:'border',
 		items:[
 			leftPanel,rightPanel
 		]
 	});
 	
 	return topPanel;
 };