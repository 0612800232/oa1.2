

Ext.ns('CompanyView');

var CompanyView=function(){
	return this.setup();
};

CompanyView.prototype.setup=function(){
	
	var formPanel = new Ext.form.FormPanel({	
		id:'CompanyView',
		labelAlign: 'top',
        frame:true,
        closable: true,//这个属性可以控制关闭form
        url:__ctxPath+'/system/addCompany.do',
        title: '公司信息',
        iconCls:'menu-company',
        bodyStyle:'padding:5px 5px 0',
        width: 600,
        reader: new Ext.data.JsonReader(
	        	{
	        	root:'result'
	        	},
	        	[
	        		{name:'companyId',mapping:'companyId'},
	        		{name:'companyNo',mapping:'companyNo'},
	        		{name:'companyName',mapping:'companyName'},
	        		{name:'companyDesc',mapping:'companyDesc'},
	        		{name:'legalPerson',mapping:'legalPerson'},
	        		{name:'setup',mapping:'setup'},
	        		{name:'phone',mapping:'phone'},
	        		{name:'fax',mapping:'fax'},
	        		{name:'site',mapping:'site'},
	        		{name:'logo',mapping:'logo'}
	        	]
	        	),
        items: [{
            layout:'column',
            items:[{
                columnWidth:.5,
                layout: 'form',
                items: [
				{
				    xtype:'hidden', 
				    fieldLabel: '公司ID',
				    name: 'company.companyId',
				    id: 'companyId',
				    
				    anchor:'95%'
				},
                {
                    xtype:'textfield',
                    fieldLabel: '公司编号',
                    name: 'company.companyNo',
                    id: 'companyNo',
                    anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: '公司名称',       
                    name: 'company.companyName',
                    id: 'companyName',
                    allowBlank:false,
                    anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: '法人',
                    name: 'company.legalPerson',
                    id: 'legalPerson',
                    anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: '电话',
                    name: 'company.phone',
                    id: 'phone',
                    anchor:'95%'
                }]
            },{
                columnWidth:.5,
                layout: 'form',
                items: [ {
                	fieldLabel: '成立时间',
                	xtype:'datefield',
                    format:'Y-m-d', 


                    name: 'company.setup' ,
                    id: 'setup'
                },{
                    xtype:'textfield',
                    fieldLabel: '传真',
                    name: 'company.fax',
                    id: 'fax',
                    anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Logo',
                    name: 'company.logo',
                    id: 'logo',
                    anchor:'95%'
                }
                , {
                    xtype:'textfield',
                    fieldLabel: '公司网址(必须为完整网址)',
                    name: 'company.site',
                    id: 'site',
                    anchor:'95%'
                }
                ]
            }]
        },{
            columnWidth:.1,
            layout: 'form',
            items: [ {
            	buttons: [{
                    text: '访问公司主页',
                    handler:function(){
            		var s = Ext.getCmp('site');
            		var site = s.getValue().trim();	
            		window.open(site);
            	}
            	}]
            }]},{
            xtype:'htmleditor',           
            fieldLabel:'公司描述',
            name:'company.companyDesc',
            id:'companyDesc',
            height:200,
            anchor:'98%'
        }],

        buttons: [{
            text: '保存',
            handler:function(){
        	
        		var formPanel = Ext.getCmp('CompanyView');
            	if(formPanel.getForm().isValid()){
            		formPanel.getForm().submit({
            			waitMsg:'正在修改公司信息',
			            success: function(formPanel, o){
            				Ext.Msg.alert('操作信息','公司信息保存成功！')
				
            			}
            		});
            	}
            }
        },{
            text: '重置',
            handler: function(){  	
        		var formPanel = Ext.getCmp('CompanyView');
        		formPanel.form.load({
        			url:__ctxPath+'/system/listCompany.do',
        			
        			deferredRender :true,
        			layoutOnTabChange :true,
        			waitMsg : '正在加载公司信息...',
        			success: function(formPanel, o){
    				Ext.Msg.alert('操作信息','公司信息重置成功！');
		
    			}
        		});	
        	}
        }]

	});

	formPanel.form.load({
		url:__ctxPath+'/system/listCompany.do',
		deferredRender :true,
		layoutOnTabChange :true,
		waitMsg : '正在载入数据...'
		
	});	
	
	return formPanel;
}


