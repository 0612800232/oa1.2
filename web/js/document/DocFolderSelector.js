var DocFolderSelector = {
	getView : function(callback) {
		var nodeValue;
		var clickNode = function(node) {
			if (node != null) {
				if(!node.disabled){
					nodeValue=node;
				  return nodeValue;
				}
			}
	    };
		
		var treePanel = new Ext.tree.TreePanel({
					id : 'docFolderTreePanel',
					title : '目录列表 ',
					loader : new Ext.tree.TreeLoader({
								url : __ctxPath + '/document/selectDocFolder.do'
							}),
					root : new Ext.tree.AsyncTreeNode({
								expanded : true
							}),
					rootVisible : false,
					listeners : {
						'click' : clickNode
					}
		});
						
		var window = new Ext.Window({
			title : '请选择目录',
			width : 440,
			height : 420,
			layout:'fit',
			items : [treePanel],
			modal:true,
			buttonAlign : 'center',
			buttons : [{
						text : '确认',
						iconCls:'btn-ok',
						scope:'true',
						handler : function(){
						  if(nodeValue!=null&&nodeValue.id>0){
							if (callback != null) {
								callback.call(this, nodeValue.id, nodeValue.text);
							}
							window.close();
						  }else{
						        Ext.Msg.alert('提示','你无权插文档入该目录！');
						  }
						}
					}, {
						text : '关闭',
						iconCls:'btn-cancel',
						handler : function() {
							window.close();
						}
					}]
		});
		return window;
	}
};
