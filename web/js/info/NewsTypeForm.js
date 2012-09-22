var NewsTypeForm=function(){
	var formPanel=this.initUI();
	
	 var window = new Ext.Window({
        title: '添加新闻类型',
        width: 260,
        height:150,
        layout: 'fit',
        modal:true,
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'center',
        items: formPanel,
        buttons: [{
            text: '保存',
            iconCls:'btn-save',
            handler:function(){
            	var newsTypeGrid = Ext.getCmp('NewsTypeGrid');
            	var type = Ext.getCmp('typeTree');
            	if(formPanel.getForm().isValid()){
            		formPanel.getForm().submit({
            			waitMsg:'正在提交新闻类型信息',
			            success: function(formPanel, o){
            				Ext.Msg.alert('操作信息','添加新闻类型成功！')
            				window.close();
            				if(newsTypeGrid!=null){
            					newsTypeGrid.getStore().reload();
            				}
            				if(type!=null){type.root.reload();}
            				
            			}
            		});
            	}
            }
        },{
            text: '取消',
            iconCls:'btn-cancel',
            handler:function(){
            	window.close();
            }
        }
        ]
    });
    window.show();
};

NewsTypeForm.prototype.initUI=function(){
var formPanel = new Ext.form.FormPanel({
			id:'newsTypeForm',
	        baseCls: 'x-plain',
	        layout:'absolute',
	        fileUpload:true,
	        defaultType: 'textfield',
	        url:__ctxPath+'/info/addNewsType.do',
	        defaultType: 'textfield',
	        reader: new Ext.data.JsonReader(
	        	{
	        	root:'data'
	        	},
	        	[
	        		 {name:'typeId',mapping:'typeId'}
	        		,{name:'typeName',mapping:'typeName'}
	        		,{name:'sn',mapping:'sn'}
	        	]
	        	),
	        defaults: {
	            anchor: '95%,95%',
	            allowBlank: false,
	            selectOnFocus: true,
	            msgTarget: 'side'
	        },
	        items: [
		        {
		        	xtype:'hidden'
		        	,name:'newsType.typeId'
		        	,id:'typeId'
		        }
	            ,{
	            	x:0,
	            	y:5,
	            	xtype:'label',
	            	text:'类型名称'
	            }
	            ,{
	            	x:0,
	            	y:20,
	            	name:'newsType.typeName',
	            	blankText: '类型名称为必填!',
	            	id:'typeName'
	            }
	            ,{
	            	xtype:'hidden',
	            	name:'newsType.sn',
	            	id:'sn'
	            }
	        	]
	    });
	    return formPanel;
}
