//首页的设置

Ext.ns("App.home");
var tools= [{
				id:'refresh',  
				handler: function(e, target, panel){  
				 
				} 
			}, {
				id : 'close',
				handler : function(e, target, panel) {
					panel.ownerCt.remove(panel, true);
				}
			}];
App.home = {
	portal : {
		title : '首页',
		iconCls:'menu-company',
		style : 'padding:4px 4px 4px 4px;',
		closable : false,
		xtype : 'portal',
		region : 'center',
		margins : '5 5 5 0',
		items : [{
					columnWidth : .33,
					style : 'padding:0 0 10px 0',
					items : [{
								title : '最新公告',
								layout : 'fit',
								tools : tools,
								height:240,
								autoScroll:true,
								autoLoad : {
									url : __ctxPath + '/info/showNotice.do'
								}
							}
							, {
								title : '日程管理',
								tools : tools,
								height:240,
								autoScroll:true,
								autoLoad : {
									url : __ctxPath + '/task/showCalendarPlan.do'
								}
							}]
				}, {
					columnWidth : .34,
					style : 'padding:0 0 10px 10px',
					items : [{
								title : '新闻中心',
								tools : tools,
								height:240,
								autoScroll:true,
								autoLoad : {
									url : __ctxPath + '/info/showNews.do'
								}
							}, {
								title : '我的约会',
								tools : tools,
								height:240,
								autoScroll:true,
								autoLoad : {
									url : __ctxPath+ '/task/showAppointment.do'
								}
							}]
				}, {
					columnWidth : .33,
					style : 'padding:0 10px 10px 10px',
					items : [{
								title : '个人短信',
								tools : tools,
								height:240,
								autoScroll:true,
								autoLoad : {
									url : __ctxPath+'/info/showShortMessage.do'
					}
							}, {
								title : '待办事项',
								tools : tools,
								html : '待办事项'
							}]
				}]
	}

};