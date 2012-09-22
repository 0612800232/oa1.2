/**
 * 个人短信详情
 */
var MessageDetail = function(id){
	var win = new Ext.Window({
	title : '个人短信详情',
	autoHeight :true,
	//autoWidth :true,
	width : 500,
	buttonAlign : 'center',
	autoLoad : {url:__ctxPath+'/info/detailInMessage.do?receiveId='+id},
	buttons: [{
		text : '关闭',
		handler : function(){
			win.close();
		}
	}]
});
win.show();
}