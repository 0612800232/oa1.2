Ext.ns('DepartmentView');

var DepartmentView=function(){	
	return this.setup();
};

DepartmentView.prototype.setup=function(){	
	var selected;
	var store=this.initData();
	var sm=new Ext.grid.CheckboxSelectionModel();
    var cm = new Ext.grid.ColumnModel({
		 columns:[sm,new Ext.grid.RowNumberer(),{
	          header: "userId",
	          dataIndex: 'userId',
	          hidden: true
	      },{
	          header: "账号",
	          dataIndex: 'username',
	          width: 60
	      },
//	      {
//	          header: "密码",
//	          dataIndex: 'password',
//	          width: 60
//	      },
	      {
	      	  header: "用户名",
	      	  dataIndex:'fullname',
	      	  width:60
	      },{
	          header: "邮箱",
	          dataIndex: 'email',
	          width: 60
	      },
//	      {
//	          header: "所属部门",
//	          dataIndex: 'department.depName',
//	          width: 60
//	      },
	      {
	          header: "所在职位",
	          dataIndex: 'position',
	          width: 60
	      },{
	          header: "入职时间",
	          dataIndex: 'accessionTime',
	          width: 35
	      },{
	          header: "状态",
	          dataIndex: 'status',
	          width: 60,
	          renderer:function(value){
	          	return value=='0'?"禁用":"激活";
	          }
	      },{
	      	header:'管理',
	      	dataIndex:'userId',
	      	width:50,
	      	renderer:function(value,metadata,record,rowIndex,colIndex){
	      		var editId=record.data.userId;
	      		var editName=record.data.username;
	      		var str='<button title="删除" value=" " class="btn-del" onclick="AppUserView.remove('+editId+')">&nbsp;</button>';
	      		    str+='&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="AppUserView.edit('+editId+',\''+editName+'\')">&nbsp;</button>';
	      		return str;
	      	}
	      }
      	],
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

	var grid = new Ext.grid.GridPanel({
	  id:'UserView',
      autoHeight:true,
      title:'员工基本信息',
      store: store,
      shim: true,
      trackMouseOver:true,
      disableSelection:false,
      loadMask: true,
      cm:cm,
      sm:sm,
      viewConfig: {
          forceFit:true,
          enableRowBody:false,
          showPreview:false  
      },
      // paging bar on the bottom
      bbar: new Ext.PagingToolbar({
          pageSize: 25,
          store: store,
          displayInfo: true,
          displayMsg: '当前显示从{0}至{1}， 共{2}条记录',
          emptyMsg: "当前没有记录"
      })
  });

  store.load({params:{start:0, limit:25}});
	
	
	
	var treePanel=new Ext.tree.TreePanel({
		region:'west',
		id:'treePanel',
		title:'部门信息显示',
		collapsible : true,
		split : true,
		height:800,
		width:200,
		tbar:new Ext.Toolbar({items:[{
			xtype:'button',
			iconCls:'btn-refresh',
			text:'刷新',
			handler:function(){
				treePanel.root.reload();
			}
		},
		{
			xtype:'button',
			text:'展开',
			iconCls:'btn-expand',
			handler:function(){
				treePanel.expandAll();
			}
		},
		{
			xtype:'button',
			text:'收起',
			iconCls:'btn-collapse',
			handler:function(){
				treePanel.collapseAll();
			}
		}
		]}),
		loader:new Ext.tree.TreeLoader({
		    url:__ctxPath+'/system/listDepartment.do'
			}),
		root:new Ext.tree.AsyncTreeNode({
	        expanded: true
		    }),
		rootVisible: false,
		listeners: {
	        'click': DepartmentView.clickNode
	    }
	});
		
	//树的右键菜单的
	treePanel.on('contextmenu', contextmenu, treePanel);

	// 创建右键菜单
	var treeMenu = new Ext.menu.Menu( {
	        id : 'treeMenu',
	        items : [ 
	        	{
	                text : '新建部门',
	                scope : this,
	                handler :createNode
	            },
	            {  
	                text : '修改部门信息',  
	                scope : this,
	                handler : editNode  
	            },{  
	                text : '删除部门',  
	                scope : this,
	                handler : deteleNode  
	            }
	            ]
	    });

	
	function contextmenu(node, e) {
		selected = new Ext.tree.TreeNode({
		    id:node.id,
		    text:node.text
		});
		//if(selected.id>0){
		treeMenu.showAt(e.getXY());	
		//}
	}
	/**
	 * 菜单事件
	 */

	
	function createNode(){
		var nodeId = selected.id;
		var departmentForm = Ext.getCmp('departmentForm');
		if(departmentForm==null){
			if(nodeId>0){
			    new DepartmentForm(nodeId);
			}else{
				new DepartmentForm(0);	
			}
		}
		
	}
	function deteleNode(){
		var depId = selected.id;
		var type = Ext.getCmp('treePanel');
		if(depId>0){
			Ext.Msg.confirm('删除操作','你确定删除部门?',function(btn){
				if(btn=='yes'){
				Ext.Ajax.request({
					url:__ctxPath+'/system/removeDepartment.do?depId='+depId,
					success:function(){
						Ext.Msg.alert('操作信息','删除成功!');
						type.root.reload();
					}
				});
				}
			});
		}else{
		 Ext.Msg.alert('警告',"总公司不能被删除");
	 }
	}
	function editNode(){
	var depId = selected.id;
	if(depId>0){	
		var departmentForm = Ext.getCmp('departmentForm');
		if(departmentForm==null){
			new DepartmentForm();
			departmentForm = Ext.getCmp('departmentForm');
		}
		departmentForm.form.load({
			url:__ctxPath+'/system/detailDepartment.do',
			params:{depId:depId},
			method:'post',
			deferredRender :true,
			layoutOnTabChange :true,
	        success : function() {
	           // Ext.Msg.alert('编辑', '载入成功！');
	        },
	        failure : function() {
	           // Ext.Msg.alert('编辑', '载入失败');
	        }
		});
	}else{
		Ext.Msg.alert('警告',"总公司不能修改！");
	}
		
}
	
	var panel=new Ext.Panel({
		id:'DepartmentView',
		title:'部门信息',
		closable:true,
		iconCls:'menu-department',
		layout : 'border',
		height:800,
		items:[treePanel,{region:'center',width:'100%',items:[grid]}]		     
	});
	
	return panel;	

};

DepartmentView.prototype.initData=function(){
	var store = new Ext.data.Store({  
        proxy: new Ext.data.HttpProxy({  
            url: __ctxPath+'/system/selectAppUser.do'
        }),  
        // create reader that reads the Topic records  
        reader: new Ext.data.JsonReader({  
            root: 'result',  
            totalProperty: 'totalCounts',  
            id: 'id',  
            fields: [  
                     {name:'userId',type:'int'},
                     'username',
//                     'password',
                     'fullname',
                     'email',
                     //'department.depName',
                     'title',//性别
                     'position',
                     {name:'accessionTime'},
                     {name:'status',type:'int'}
                     ]   
        }), 
        remoteSort: true  
    });  
    store.setDefaultSort('id', 'desc');  
    return store;
};




/**
 * 初始化
 * @return {}
 */

/**
 * 用户删除
 * @param {} userId
 */
DepartmentView.remove=function(userId){
	Ext.Msg.confirm('删除操作','你确定要删除该用户吗?',function(btn){
		if(btn=='yes'){
			Ext.Ajax.request({
				url: __ctxPath+'/system/removeAppUser.do',
				method:'post',
				params:{userId:userId},
				success:function(){
					Ext.Msg.alert("信息","删除成功"),
					UserView.grid.getStore().reload();
				},
				failure:function(){
					Ext.Msg.alert("信息","删除失败");
					UserView.grid.getStore().reload();
				}
			});
		}
	});
	
}


DepartmentView.clickNode=function(node){
    if (node != null) {
    	var users = Ext.getCmp('UserView');
    	var store=users.getStore();
    	store.url=__ctxPath+'/system/selectAppUser.do';
    	store.baseParams={depId:node.id};
    	store.params={start:0,limit:25};
    	store.reload({params:{start:0,limit:25}});
    }
   
};
