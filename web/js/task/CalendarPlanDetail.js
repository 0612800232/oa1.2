/**
 * 日程管理详情
 */
var CalendarPlanDetail = function(id){
	var win = new Ext.Window({
	title : '日程管理详情',
	autoHeight :true,
	//autoWidth :true,
	width : 500,
	buttonAlign : 'center',
	autoLoad : {url:__ctxPath+'/pages/task/calendarplandetail.jsp?planId='+id},
	buttons: [{
		text : '关闭',
		handler : function(){
			win.close();
		}
	}]
});
win.show();
}