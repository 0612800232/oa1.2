/**
 * 角色授权窗口
 * 
 * @param {}
 *            roleId
 */
var RoleGrantRightView = function(roleId,roleName) {
	var roleGrantView = new Ext.ux.tree.CheckTreePanel({
				title : '为角色['+roleName+']授权',
				id : 'roleGrantView',
				autoScroll : true,
				rootVisible : false,
				loader : new Ext.app.MenuLoader({
							dataUrl : __ctxPath + '/js/menu.xml'
						}),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						}),
				tools : [{
							id : 'refresh',
							qtip : '重新加载树',
							handler : function() {
								roleGrantView.getRootNode().reload();
							}
						}]
			});

	var granWin = new Ext.Window({
				id : 'RoleGrantView',
				title : '角色授权设置',
				width : 600,
				height : 450,
				modal : true,
				layout : 'fit',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [roleGrantView],
				buttons : [
						{
							text : '保存',
							iconCls:'btn-save',
							handler : function() {
								//alert(roleGrantView.getValue().toString());
								Ext.Ajax.request({
									url : __ctxPath + '/system/grantAppRole.do',
									method : 'POST',
									params:{roleId:roleId,rights:roleGrantView.getValue().toString()},
									success : function(response, options) {
										Ext.Msg.alert('操作信息','授权成功！');
										granWin.close();
									},
									failure : function(response, options) {
										Ext.Msg.alert('操作信息','授权出错，请联系管理员！');
									},
									scope : this
								});
							}
						},{
							text : '取消',
							iconCls:'btn-cancel',
							handler:function(){
								granWin.close();
							}
						}
				]
			});
			
	
			
	granWin.show();
	
	//load the has the value setttings.
	Ext.Ajax.request({
		url : __ctxPath + '/system/getAppRole.do',
		method : 'POST',
	    params:{roleId:roleId},
		success : function(response, options) {
			var object=Ext.util.JSON.decode(response.responseText);
			//alert(object.data.rights);
			if(object.data.rights!=null){
				roleGrantView.setValue(object.data.rights);
			}
			
		},
		failure : function(response, options) {
			Ext.Msg.alert('操作信息','加载权限出错！');
		},
		scope : this
	});
}