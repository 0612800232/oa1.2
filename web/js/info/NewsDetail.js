/**
 * 新闻详情
 */
var NewsDetail = function(id){
	var win = new Ext.Window({
	title : '新闻详情',
	autoHeight :true,
	//autoWidth :true,
	//height : 500,
	width : 500,
	buttonAlign : 'center',
	autoLoad : {url:__ctxPath+'/pages/info/newsdetail.jsp?newsId='+id},
	buttons: [{
		text : '关闭',
		handler : function(){
			win.close();
		}
	}]
});
win.show();
}