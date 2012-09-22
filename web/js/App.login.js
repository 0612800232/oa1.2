Ext.ns('App.login');
/**
 * 系统登陆JS,包括登录,检查是否登录,登出
 * @type 
 */
App.login = {
	//登录窗口
	/*
	createLoginWindow : function(){
		var win=new Ext.Window({
			title:'test',
			height:200,
			width:300
		});
		
		win.show();
	}
	
	*/
	createLoginWindow : function() {
		App.loginWindow = new LoginWindow({
					url : __ctxPath + '/login.do',
					callback : function(result) {
						if (result.success) {
							App.loginWindow.close();
							window.location.href = __ctxPath + '/index.jsp'
						}else{
							Ext.Msg.alert('错误信息',result.msg)
						}
					}
				});
		App.loginWindow.show();
	},
	//登出
	logout : function() {
		Ext.Ajax.request({
					url : __ctxPath + '/j_logout.do',
					success : function() {
						window.location.href = __ctxPath + '/login.jsp';
					}
				})
	}
};

/**
 *  登录窗口
 * @class LoginWindow
 * @extends Ext.Window
 */

var LoginWindow = Ext.extend(Ext.Window, {
	title : '用户登录',
	width : 350,
	height : 220,
	closable : false,
	resizable:false,
	iconCls:'login-icon',
	buttonAlign : 'center',
	createFormPanel : function() {
		return new Ext.form.FormPanel({
					bodyStyle : 'padding-top:6px',
					defaultType : 'textfield',
					labelAlign : 'right',
					labelWidth : 55,
					labelPad : 0,
					layout:'form',
					frame:true,
					defaults : {
						allowBlank : false,
						anchor:'96%,96%',
						selectOnFocus : true
					},
					items : [{
								name : 'username',
								fieldLabel : '账      号',
								blankText : '账号不能为空'
							}, {
								name : 'password',
								fieldLabel : '密      码',
								blankText : '密码不能为空',
								inputType : 'password'
							}, {
								name : 'checkCode',
								fieldLabel : '验证码',
								blankText : '验证码不能为空'
							}, {
								xtype:'container',
								layout:'table',
								defaultType:'textfield',
								hideLabel:false,
								layoutConfig: {
									columns: 3
								},
								items:[
									{
										width:55,
										xtype:'label',
										text:'　　　　'//这里的排序以后再改
									},{
										width:150,
										id:'loginCode',
										xtype:'panel',
										html:'<img border="0" height="30" width="150" src="'+__ctxPath + '/CaptchaImg"/>'
									},{
										width:55,
										xtype:'panel',
										bodyStyle:'font-size:12px;padding-left:12px',
										html:'<a href="javascript:refeshCode()">看不清</a>'
									}]
							}, {
								xtype : 'checkbox',
								name : '_spring_security_remember_me',
								boxLabel : '让系统记住我 '
							}]
				});
	},
	login : function() {
		if (this.formPanel.form.isValid()) {
			this.formPanel.form.submit({
						waitTitle : "请稍候",
						waitMsg : '正在登录......',
						url : this.url,
						success : function(form, action) {
							this.hide();
							if (this.callback) {
								this.callback.call(this, action.result);
							}
						},
						failure : function(form, action) {
							if (this.callback) {
								this.callback.call(this, action.result);
							}
							form.findField("password").setRawValue("");
							form.findField("username").focus(true);
						},
						scope : this
					});
		}
	},
	initComponent : function() {
		
		this.keys = {
			key : Ext.EventObject.ENTER,
			fn : this.login,
			scope : this
		};
		LoginWindow.superclass.initComponent.call(this);
		this.formPanel = this.createFormPanel();
		this.add(this.formPanel);
		this.addButton({text:'登录',iconCls:'btn-login'}, this.login, this);
		this.addButton({text:'重填',iconCls:'btn-login-reset'}, function() {
					this.formPanel.getForm().reset();
				}, this);
	}
});

/**
 * 更新验证码
 */
function refeshCode(){
	var loginCode = Ext.getCmp('loginCode');
	loginCode.body.update('<img border="0" height="30" width="150" src="'+__ctxPath + '/CaptchaImg?rand='+Math.random()+'"/>');
};