Ext.ns('MessageView');

var MessageView=function(){
	return this.setup();
};

MessageView.prototype.setup=function(){	
    var topbar=this.initTopToolbar(); 
    var formPanel=new MessageForm();

    var receiveStore=MessageView.prototype.initReceiveData();
	receiveStore.load({params:{start:0, limit:12}});			    	
	var receiveTopbar=MessageView.prototype.initReceiveTopToolbar();
    var sm=new Ext.grid.CheckboxSelectionModel();

	var cm = new Ext.grid.ColumnModel({
		 columns:[sm,new Ext.grid.RowNumberer(),
		          {
	          header: "状态",
	          dataIndex: 'readFlag',
	          width: 60,
	          renderer:function(value) {
					return value == '1' ? "<img src='"+__ctxPath+"/images/info/email_open.png'/>" : "<img src='"+__ctxPath+"/images/info/email.png'/>";
				}
	      },{
	          header: "类别",
	          dataIndex: 'msgType',
	          width: 60,
	          renderer:function(value) {
					if(value=='1'){
					   return "<p style='color:green;'>个人信息</p>";					
					}else if(value=='2'){
					   return "<p style='color:green;'>日程安排</p>";
					}else if(value=='3'){
					   return "<p style='color:green;'>计划任务</p>";
					}else if(value=='4'){
					   return "<p style='color:green;'>系统信息</p>";
					}else{
					
					   return "<p style='color:green;'>其他</p>";
					}
					
				}
	      },{
	          header: "发送人",
	          dataIndex: 'sender',
	          width: 100
	      },
	      {
	          header: "内容",
	          dataIndex: 'content',
	          width: 80
	         
	      },{
	          header: "发送时间",
	          dataIndex: 'sendTime',
	          width: 90
	      },
	     
      {
				header:'操作',
				dataIndex:'receiveId',
				width:120,
				renderer:function(value,metadata,record,rowIndex,colIndex){
					var replyId=record.data.receiveId;
					var msgType=record.data.msgType;
					var str='<button title="删除" value=" " class="btn-del" onclick="MessageView.removeReceiveMessage('+replyId+')">&nbsp;</button>';
					if(msgType=='1'){    //1为个人信息
					    str+='&nbsp;<button title="回复" value=" " class="btn-update" onclick="MessageView. reply('+replyId+')">&nbsp;</button>';
					}
					return str;}
	      }],
	    defaults: {
	        sortable: true,
	        menuDisabled: true,
	        width: 100
	    },
	    listeners: {
	        hiddenchange: function(cm, colIndex, hidden) {
	            saveConfig(colIndex, hidden);
	        }
	    }
	});
	
	
	var gridReceive=new Ext.grid.GridPanel({   	
    	id:'ReceiveMessageV',
    	autoHeight : true,
        title:'已收信息显示',
        tbar:receiveTopbar,
        store: receiveStore,
        shim: true,
        trackMouseOver:true,
        disableSelection:false,
        autoScroll:true,
        loadMask: true,
        draggable :true,
        cm:cm,
        sm:sm,
        viewConfig: {
            forceFit:true,
            enableRowBody:false,
            showPreview:false  
        },
        bbar: new Ext.PagingToolbar({
            pageSize: 12,
            store: receiveStore,
            displayInfo: true,
            displayMsg: '当前显示从{0}至{1}， 共{2}条记录',
            emptyMsg: "当前没有记录"
        })
    });
	
    var panel=new Ext.Panel({
		id:'MessageView',
		iconCls:"menu-message",
		title:'内部信息',
		height:800,
		tbar:topbar,
		closable:true,
		frame:false,
		items:gridReceive
	});	
	return panel;
}

MessageView.prototype.initReceiveTopToolbar=function(){
	var searchPanelR=new Ext.FormPanel({
		height:20,
//		frame:true,
		id:'receiveSearchForm',
		layout:'column',
		url:__ctxPath+'/info/listShortMessage.do',
		defaults:{xtype:'label'},
		bodyStyle : "backgroundColor:#DFE8F9;",
		border:false,
		items:[
				{
					border:false,
					text : '类型'
				}, {
					border:false,
					xtype : 'textfield',
					name : 'shortMessage.msgType'
				}, {
					border:false,
					text : '发送人'
				}, {
					border:false,
					xtype : 'textfield',
					name : 'shortMessage.sender'
				},{
					border:false,
		            text:'从'
		    	}
		    	,{
		    		border:false,
		    		xtype:'datefield',
		    		format:'Y-m-d',
		    		name:'from',
		    		readOnly:true
		    	},
		    	{
		    		border:false,
		    		text:'到'
		    	},
		    	{
		    		border:false,
		    		xtype:'datefield',
		    		format:'Y-m-d',
		    		name:'to',
					readOnly:true
		    	},
		    	{
		    		xtype:'hidden',
		    		name:'start',
		    		value:0
		    	},
		    	{
		    		xtype:'hidden',
		    		name:'limit',
		    		value:12
		    	}
		]
	});
	var toolbar=new Ext.Toolbar({
		id:'search',
	    width: '100%',
	    height: 25,
	    items: [
	    searchPanelR
		,{
				text:'查询',
				iconCls:'search',
				handler:function(){
					var receiveGrid = Ext.getCmp('ReceiveMessage');
					searchPanelR.getForm().submit({
	            			waitMsg:'正在提交查询信息',
				            success: function(searchPanelR, action){
				            	var receiveStore = receiveGrid.getStore();
				            	var rsText=action.response.responseText.replace('success:true,',"");
				            	var result=Ext.util.JSON.decode(rsText);
				            	receiveStore.loadData(result,false);
	            			},
	            			failure:function(searchPanelR, action){
	            				alert('something wrong');
	            			}
					     
	            	});
            		
				}
			}
			,{
				text:'重置'
				,iconCls:'reset',
				handler:function(){
				searchPanelR.getForm().reset();
				}
			},
			{
				iconCls : 'btn-del',
				text : '删除信息',
				xtype : 'button',
				handler : function() {
					
					var grid=Ext.getCmp("ReceiveMessage");
					
					var selectRecords=grid.getSelectionModel().getSelections();
					
					if(selectRecords.length==0){
						Ext.Msg.alert("信息","请选择要删除的记录！");
						return;
					}
					var ids=Array();
					for(var i=0;i<selectRecords.length;i++){
						ids.push(selectRecords[i].data.roleId);
					}
					
					MessageView.removeReceiveMessage(ids);
				}
			}
			]
	});
	return toolbar;
};

MessageView.prototype.initSendTopToolbar=function(){
	var searchPanelS=new Ext.FormPanel({
		height:20,
//		frame:true,
		id:'sendSearchForm',
		layout:'column',
		url:__ctxPath+'/info/listInMessage.do',
		defaults:{xtype:'label'},
		border:false,
		bodyStyle : "backgroundColor:#DFE8F9;",
		items:[
				{
					text : '收信人'
				}, {
					xtype : 'textfield',
					name : 'inMessage.userFullname'
				},{
		            text:'从'
		    	}
		    	,{
		    		xtype:'datefield',
		    		format:'Y-m-d',
		    		name:'from',
		    		readOnly:true
		    	},
		    	{
		    		text:'到'
		    	},
		    	{
		    		xtype:'datefield',
		    		format:'Y-m-d',
		    		name:'to',
					readOnly:true
		    	},
		    	{
		    		xtype:'hidden',
		    		name:'start',
		    		value:0
		    	},
		    	{
		    		xtype:'hidden',
		    		name:'limit',
		    		value:12
		    	}
		]
	});
	var toolbar=new Ext.Toolbar({
		id:'search',
	    width: '100%',
	    height: 25,
	    items: [
	    searchPanelS
		,{
				text:'查询',
				iconCls:'search',
				handler:function(){
					var sendGrid = Ext.getCmp('sendMessage');
					searchPanelS.getForm().submit({
	            			waitMsg:'正在提交查询信息',
				            success: function(searchPanelS, action){
				            	var sendStore = sendGrid.getStore();
				            	var rsText=action.response.responseText.replace('success:true,',"");
				            	var result=Ext.util.JSON.decode(rsText);
				            	sendStore.loadData(result,false);
	            			}
	            	});
            		
				}
			}
			,{
				text:'重置'
				,iconCls:'reset',
				handler:function(){
					searchPanelS.getForm().reset();
				}
			}
			]
	});
	return toolbar;
};



MessageView.prototype.initTopToolbar=function(){	   
   
    
	var sm=new Ext.grid.CheckboxSelectionModel();

	var cm = new Ext.grid.ColumnModel({
		 columns:[sm,new Ext.grid.RowNumberer(),
		          {
	          header: "状态",
	          dataIndex: 'readFlag',
	          width: 60,
	          renderer:function(value) {
					return value == '1' ? "<img src='"+__ctxPath+"/images/info/email_open.png'/>" : "<img src='"+__ctxPath+"/images/info/email.png'/>";
				}
	      },{
	          header: "类别",
	          dataIndex: 'msgType',
	          width: 60,
	          renderer:function(value) {
					if(value=='1'){
					   return "<p style='color:green;'>个人信息</p>";					
					}else if(value=='2'){
					   return "<p style='color:green;'>日程安排</p>";
					}else if(value=='3'){
					   return "<p style='color:green;'>计划任务</p>";
					}else if(value=='4'){
					   return "<p style='color:green;'>系统信息</p>";
					}else{
					
					   return "<p style='color:green;'>其他</p>";
					}
					
				}
	      },{
	          header: "发送人",
	          dataIndex: 'sender',
	          width: 100
	      },
	      {
	          header: "内容",
	          dataIndex: 'content',
	          width: 80
	         
	      },{
	          header: "发送时间",
	          dataIndex: 'sendTime',
	          width: 90
	      },
	     
      {
				header:'操作',
				dataIndex:'receiveId',
				width:120,
				renderer:function(value,metadata,record,rowIndex,colIndex){
					var replyId=record.data.receiveId;
					var msgType=record.data.msgType;
					var str='<button title="删除" value=" " class="btn-del" onclick="MessageView.removeReceiveMessage('+replyId+')">&nbsp;</button>';
					if(msgType=='1'){    //1为个人信息
					    str+='&nbsp;<button title="回复" value=" " class="btn-update" onclick="MessageView. reply('+replyId+')">&nbsp;</button>';
					}
					return str;}
	      }],
	    defaults: {
	        sortable: true,
	        menuDisabled: true,
	        width: 100
	    },
	    listeners: {
	        hiddenchange: function(cm, colIndex, hidden) {
	            saveConfig(colIndex, hidden);
	        }
	    }
	});
    
    var cms = new Ext.grid.ColumnModel({
		 columns:[sm,new Ext.grid.RowNumberer(),
//		    {
//	          header: "类别",
//	          dataIndex: 'msgType',
//	          width: 60,
//	          renderer:function(value) {
//					return value == '1' ? "<p style='color:green;'>个人信息</p>" : "<p style='color:red;'>其他</p>";
//				}
//	      },
	      {
	          header: "收信人",
	          dataIndex: 'userFullname',
	          width: 100
	      },
	      {
	          header: "内容",
	          dataIndex: 'content',
	          width: 80
	         
	      },{
	          header: "发送时间",
	          dataIndex: 'sendTime',
	          width: 90
	      },{
				header:'操作',
				dataIndex:'receiveId',
				width:120,
				renderer:function(value,metadata,record,rowIndex,colIndex){
					var editId=record.data.receiveId;
				    var str='&nbsp;<button title="重发" value=" " class="btn-update" onclick="MessageView.reSend('+editId+')">&nbsp;</button>';
					return str;
				}
	      }],
	    defaults: {
	        sortable: true,
	        menuDisabled: true,
	        width: 100
	    },
	    listeners: {
	        hiddenchange: function(cm, colIndex, hidden) {
	            saveConfig(colIndex, hidden);
	        }
	    }
	});
      
	var toolbar=new Ext.Toolbar({
	    width: '100%',
	    height: 30,
	    layout:'column',
	    items: [new Ext.Button({text: '发送信息',
		    iconCls:'btn-sendM',
		    handler: function() {
	    	    var reView=Ext.getCmp('MessageView');		    	
		    	reView.removeAll();
		    	reView.add(new MessageForm());
		    	reView.doLayout(true);
		    }
		}),{text: '已发信息',
			    iconCls:'btn-sendMessage',
			    handler: function() {
			    	var reView1=Ext.getCmp('MessageView');
			    	reView1.removeAll();
			    	var sendStore=MessageView.prototype.initSendData();
			    	sendStore.load({params:{start:0, limit:12}});
			    	var sendTopbar=MessageView.prototype.initSendTopToolbar();
			    	reView1.add(
			    		new Ext.grid.GridPanel({   	
			        	id:'sendMessage',
			        	autoHeight : true,
			            title:'已发信息显示',
			            tbar:sendTopbar,
			            store: sendStore,
			            shim: true,
			            trackMouseOver:true,
			            disableSelection:false,
			            autoScroll:true,
			            loadMask: true,
			            draggable :true,
			            cm:cms,
			            sm:sm,
			            viewConfig: {
			                forceFit:true,
			                enableRowBody:false,
			                showPreview:false  
			            },
			            bbar: new Ext.PagingToolbar({
			                pageSize: 12,
			                store: sendStore,
			                displayInfo: true,
			                displayMsg: '当前显示从{0}至{1}， 共{2}条记录',
			                emptyMsg: "当前没有记录"
			            })
			        }));
			    	reView1.doLayout(true);
			    }
			},{text: '已收信息',
			    iconCls:'btn-receiveMessage',
			    handler: function() {
			    	var reView2=Ext.getCmp('MessageView');
			    	reView2.removeAll();
			    	var receiveStore=MessageView.prototype.initReceiveData();
			    	receiveStore.load({params:{start:0, limit:12}});			    	
			    	var receiveTopbar=MessageView.prototype.initReceiveTopToolbar();
			    	reView2.add(new Ext.grid.GridPanel({   	
			        	id:'ReceiveMessage',
			        	autoHeight : true,
			            title:'已收信息显示',
			            tbar:receiveTopbar,
			            store: receiveStore,
			            shim: true,
			            trackMouseOver:true,
			            disableSelection:false,
			            autoScroll:true,
			            loadMask: true,
			            draggable :true,
			            cm:cm,
			            sm:sm,
			            viewConfig: {
			                forceFit:true,
			                enableRowBody:false,
			                showPreview:false  
			            },
			            bbar: new Ext.PagingToolbar({
			                pageSize: 12,
			                store: receiveStore,
			                displayInfo: true,
			                displayMsg: '当前显示从{0}至{1}， 共{2}条记录',
			                emptyMsg: "当前没有记录"
			            })
			        }));
			    	reView2.doLayout(true);
			    }
			}]
	});
	return toolbar;
};

MessageView.prototype.initReceiveData=function(){
	var receiveStore = new Ext.data.Store({  
        proxy: new Ext.data.HttpProxy({  
            url: __ctxPath+'/info/listShortMessage.do'
        }),   
        reader: new Ext.data.JsonReader({  
            root: 'result',  
            totalProperty: 'totalCounts',  
            id: 'id',  
            fields: [  
            {name:'receiveId',type:'int'},
            {name:'messageId',mapping:'shortMessage.messageId',type:'int'},
            {name:'msgType',mapping:'shortMessage.msgType',type:'int'}, 
            {name:'senderId',mapping:'shortMessage.senderId',type:'int'},
            {name:'sender',mapping:'shortMessage.sender'},
            {name:'content',mapping:'shortMessage.content'}, 
            {name:'sendTime',mapping:'shortMessage.sendTime'},
            {name:'readFlag'}
            ]  
        }), 
        remoteSort: true  
    });  
	receiveStore.setDefaultSort('id', 'desc'); 
	MessageView.sendStore=receiveStore;
    return receiveStore;
};

MessageView.prototype.initSendData=function(){
	var sendStore = new Ext.data.Store({  
        proxy: new Ext.data.HttpProxy({  
            url: __ctxPath+'/info/listInMessage.do'
        }),   
        reader: new Ext.data.JsonReader({  
            root: 'result',  
            totalProperty: 'totalCounts',  
            id: 'id',  
            fields: [
            {name:'receiveId',type:'int'},
            {name:'messageId',mapping:'shortMessage.messageId',type:'int'},
            {name:'msgType',mapping:'shortMessage.msgType' ,type:'int'}, 
            {name:'content',mapping:'shortMessage.content'},
            {name:'userId',type:'int'},
            'userFullname',
            {name:'sendTime',mapping:'shortMessage.sendTime'}
            ]  
        }), 
        remoteSort: true  
    });  
	sendStore.setDefaultSort('id', 'desc'); 	
    MessageView.sendStore=sendStore;
	return sendStore;
};

MessageView.reply=function(replyId){
	var reView1=Ext.getCmp('MessageView');
	reView1.removeAll();
	var message=new MessageForm();		
	reView1.add(message);
	var reply=Ext.getCmp('mFormPanel');
	reView1.doLayout(true);	
	reply.form.load({
		url:__ctxPath+'/info/replyInMessage.do',
		params:{receiveId:replyId},
		method:'post',
		deferredRender :true,
		layoutOnTabChange :true,
        success : function() {
			Ext.Ajax.request({ 				        		
    			url: __ctxPath+'/info/knowInMessage.do',
    			method:'POST',
    			params:{receiveId:replyId},
    			success: function(response,options){ 		
    			}, 
    			failure: function(response,options){ 				    				
    			}, 
    			scope:this 
    		});  
        },
        failure : function() {
        }
	});
}

MessageView.reSend=function(receiveId){
	var grid=Ext.getCmp('sendMessage');
	var rows=grid.getSelectionModel().getSelections();
	if(rows.length>0){
	var userId=rows[0].data.userId;
	var content=rows[0].data.content;
	Ext.Ajax.request(
			{
				url:__ctxPath+'/info/sendShortMessage.do',
				params:{userId:userId+',',content:content},
				method:'post',
				success: function(){
            		Ext.Msg.alert('操作信息','重发成功！');
            		grid.getStore().reload();
            	}
			}
	);
	}
}


MessageView.removeReceiveMessage=function(receiveId){
	var receive = Ext.getCmp('ReceiveMessage');
	Ext.Msg.confirm('删除操作','你确定要删除该信息吗?',function(btn){
		if(btn=='yes'){
			//alert(newsId)
			Ext.Ajax.request(
			{
				url:__ctxPath+'/info/multiRemoveInMessage.do',
				params:{ids:receiveId},
				method:'post',
				success: function(){
            		Ext.Msg.alert('操作信息','删除信息成功！')
            		receive.getStore().reload();
            	}
			}
			);
		}
	});
	
};

