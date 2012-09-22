Ext.ns('MyTaskView');
/**
 * 我的任务流程 
 */
var MyTaskView=function(){
	MyTaskView.grid=this.setup();
	return MyTaskView.grid;
};

MyTaskView.prototype.setup=function(){
	//显示一个GridPanel先即可
	var store=this.initData();
	var sm=new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		 columns:[sm,new Ext.grid.RowNumberer(),{
	          header: "userId",
	          dataIndex: 'userId',
	          width: 20,
	          hidden: true,
	          sortable: true
	      },{
	          header:'事项名称',
		      dataIndex:'activityName',
		      width:120
	      },{
	          header:'执行人',
		      dataIndex:'assignee',
		      width:140,
		      renderer:function(value,metadata,record,rowIndex,colIndex){
		      	var assignee=record.data.assignee;
		      	if(assignee==null || assignee==''){
		      		return '<font color="red">暂无执行人</font>';
		      	}else{
		      		return assignee;
		      	}
		      }
	      },{
	      	  header:'开始时间',
	      	  dataIndex:'createTime',
	      	  width:100
	      },{
	      	   header:'到期时间',
	      	   dataIndex:'dueDate',
	      	   width:100,
	      	   renderer:function(value){
	      	   	if(value==''){
	      	   		return '无限制';
	      	   	}else{
	      	   		return value;
	      	   	}
	      	   }
	      },
	      	{
	      		header:'executionId',
		      	hidden:true,
		      	dataIndex:'executionId'
	      },{
	      		header:'taskdbid',
		      	hidden:true,
		      	dataIndex:'taskdbid'
	      },{
	      	header:'管理',
	      	dataIndex:'taskdbid',
	      	width:50,
	      	renderer:function(value,metadata,record,rowIndex,colIndex){
	      		var taskdbid=record.data.taskdbid;
	      		var exeId=record.data.executionId;
	      		var assignee=record.data.assignee;
	      		var activityName=record.data.activityName;
	      		var str='';
	      		if(assignee==''){
	      			str+='<button title="锁定任务" value="锁定任务" class="btn-del" onclick="MyTaskView.lockTask('+taskdbid+')"></button>';
	      		}else{
	      			str+='<button title="审核任务" value="审核任务" class="btn-next" onclick="MyTaskView.nextStep(\''+exeId+'\',\''
	      			+activityName+'\')"></button>';
	      		}
	      		return str;
	      	}
	      }
      	],
	    defaults: {
	        sortable: true,
	        menuDisabled: true,
	        width: 100
	    }
	});
	//显示任务
	var grid = new Ext.grid.GridPanel({
	  id:'MyTaskView',
      width:700,
      height:500,
      title:'待办事项',
      closable:true,
      store: store,
      columnLines: true,
      shim: true,
      trackMouseOver:true,
      disableSelection:false,
      loadMask: true,
      tbar:new Ext.Toolbar({
	    width: '100%',
	    height: 30,
	    items: ['-',
			{
			    text: '下一步',
			    handler: function() {
		    		
			    }
			},'-',{
				text: '查看',
			    handler: function() {
				    	
				}
			},'-'
	 	]}),
	      cm:cm,

      // customize view config
      viewConfig: {
          forceFit:true,
          showPreview:false  
      },

      // paging bar on the bottom
      bbar: new Ext.PagingToolbar({
          pageSize: 25,
          store: store,
          displayInfo: true,
          displayMsg: '显示{0}-{1}， 共{2}条记录。',
          emptyMsg: "当前没有记录。"
      })
  });
  grid.getColumnModel().setHidden(0,true);
  store.load({params:{start:0, limit:25}});
  return grid;
};


MyTaskView.prototype.initData=function(){
	var store = new Ext.data.Store({  
        proxy: new Ext.data.HttpProxy({  
            url: __ctxPath+'/flow/listTask.do'
        }),  
        // create reader that reads the Topic records  
        reader: new Ext.data.JsonReader({
            root: 'result',  
            totalProperty: 'totalCounts',  
            fields: [
	            'activityName',
	            'assignee',
	            'createTime',
	            'dueDate',
	            'executionId',
	            'taskdbid'
	            ]  
        }), 
        remoteSort: true  
    });  
    store.setDefaultSort('dbId', 'desc');  
    return store;
};


/**
 * 锁定任务，则表示申请执行该任务
 * @param {} taskdbid
 */
MyTaskView.lockTask=function(taskdbid){
	Ext.Ajax.request({
		url:__ctxPath+'/process/ProcessServlet',
		params:{
			action:'lockTask',
			taskdbid:taskdbid,
			userId:curUser
		},
		method:'post',
		success:function(result,response){
			var grid=Ext.getCmp("MyTaskView");
			var r=null;
			eval(" r="+result.responseText + ";");
			
			if(r.hasAssigned==true){
				Ext.Msg.alert("操作提示","该任务已经被其他用户锁定执行！");
			}else{
				Ext.Msg.alert("操作提示","该任务已经成功锁定，请执行下一步操作！");
			}
			grid.getStore().reload();
		}
	});
};
/**
 * 下一步的任务
 * @param {} taskdbid
 */
MyTaskView.nextStep=function(exeId,taskName){
	var contentPanel=App.getContentPanel();
	var formView=contentPanel.getItem('ProcessNextForm'+exeId);
	if(formView==null){
		formView=new ProcessNextForm(exeId,taskName);
		contentPanel.add(formView);
	}
	contentPanel.activate(formView);
};
