var MessageWin=function(){
	var panel=this.initUI();	
	var window = new Ext.Window({
		id:'win',
		title: '信息',
		region:'west',
        width: 300,
        height:200,
        x: 5,
        y:350,
        layout: 'fit',
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'center',
        items:[],
        buttons:[{
		        	text:'知道了',
		        	handler:function(){
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
				        	 var win=Ext.getCmp('win');
			        	     win.close();
//			        	     var mPanel=Ext.getCmp('mePanel');
//			        	     mPanel.removeAll();
                    }
		        },{
		        	text:'回复',
		        	handler:function(){				           	
		        	      var win=Ext.getCmp('win');
		        	      win.close();
		        	      var form =Ext.getCmp('mFormPanel');
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
		        	      new ReMessageWin();
		        	      
		        	      var reply=Ext.getCmp('mmFormPanel');
		        	      reply.form.load({
		        	  		url:__ctxPath+'/info/replyInMessage.do',
		        	  		params:{receiveId:replyId},
		        	  		method:'post',
		        	  		deferredRender :true,
		        	  		layoutOnTabChange :true,
		        	          success : function() {
		        	          },
		        	          failure : function() {
		        	          }
		        	  	     });  
		            }
		        },{
		        	text:'删除',
		        	handler:function(){
		        	Ext.Ajax.request({ 				        		
		    			url: __ctxPath+'/info/removeInMessage.do',
		    			method:'POST',
		    			params:{receiveId:replyId},
		    			success: function(response,options){ 		
		    				var win=Ext.getCmp('win');
			        	    win.close();
			        	    var mPanel=Ext.getCmp('mePanel');
			        	    mPanel.removeAll();
			        	    Ext.Msg.alert('操作信息', '信息删除成功！');
		    			
		    			}, 
		    			failure: function(response,options){ 	
		    				Ext.Msg.alert('操作信息', '信息删除失败！');
		    			}, 
		    			scope:this 
		    	   });
		         } 
		        }]
	});			
	window.show();
}

var replyId;
MessageWin.prototype.initUI=function(){		
	var store=this.initData();
    store.load();
	store.on('load',AJAX_Loaded, store, true);	
	function AJAX_Loaded(){
		 var window=Ext.getCmp('win');
		 window.removeAll();
		 var rec = store.getAt(0);
		 replyId=rec.get('receiveId');		 
		 var senderId=rec.get("senderId");
		 var sender=rec.get('sender');
		 var sendTime=rec.get('sendTime');
		 var content=rec.get("content");			  
		 var panel=new Ext.Panel({
			 id:'pp',
			 columnWidth:.33,
             height:150,
			 width:160,
			 html:'<p>  '+sender+'  '+sendTime+'</p><p style="color:red;">'+content+'</p>'		 
		 });
		 window.setTitle(sender+'发送的信息');
		 window.add(panel);
		 window.doLayout(true);
	}
}

MessageWin.prototype.initData=function(){
	var store = new Ext.data.Store({  
        proxy: new Ext.data.HttpProxy({  
            url: __ctxPath+'/info/readInMessage.do'
        }),   
        reader: new Ext.data.JsonReader(
        {  
            root: 'data'
        },[ {name:'receiveId',type:'int'},
            {name:'messageId',type:'int'},
            {name:'msgType',type:'int'}, 
            {name:'senderId',type:'int'},
            'sender',
            'content', 
            {name:'sendTime'}
            ]  
        ) 
    });  	
    return store;
};


