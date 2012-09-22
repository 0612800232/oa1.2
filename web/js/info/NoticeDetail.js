/**
 * 公告详情
 */
var NoticeDetail = function(id){
	var win = new Ext.Window({
	title : '公告详情',
	autoHeight :true,
	//autoWidth :true,
	width : 500,
	buttonAlign : 'center',
	autoLoad : {url:__ctxPath+'/pages/info/noticedetail.jsp?noticeId='+id},
	buttons: [{
		text : '关闭',
		handler : function(){
			win.close();
		}
	}]
});
win.show();
}