/**
 * 我的约会详情
 */
var AppointmentDetail = function(id){
	var win = new Ext.Window({
	title : '我的约会详情',
	autoHeight :true,
	//autoWidth :true,
	width : 500,
	buttonAlign : 'center',
	autoLoad : {url:__ctxPath+'/pages/task/appointmentdetail.jsp?appointId='+id},
	buttons: [{
		text : '关闭',
		handler : function(){
			win.close();
		}
	}]
});
win.show();
}