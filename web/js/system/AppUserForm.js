var AppUserForm = function(_title,_userId) {
	return this.setup(_title,_userId);
};

AppUserForm.prototype.setup = function(_title,userId) {
	var _url = __ctxPath + '/system/listDepartment.do';
	var depSelector = new TreeSelector('depTreeSelector', _url, '所属部门',
			'appUser.depId');
	var footToolbar = this.initFooterToolbar(userId);
	var userform = new Ext.form.FormPanel({
				id : 'AppUserForm',
				title : _title,
				closable : true,
				iconCls:'menu-customer',
				border : false, // 不要边框
				fileUpload : true, // 允许上传
				autoScroll : true,
				bodyStyle : "margin-top:5px;margin-left: 4%; background-color: transparent;",
				labelAlign : "right",
				layout : 'table',
				autoScroll : true,
				tbar : footToolbar,
				defaultType : "textfield",
				layoutConfig:{columns:3},
				url : __ctxPath + '/system/saveAppUser.do',
				reader : new Ext.data.JsonReader({
							root : 'data'
						}, [{
									name : 'appUser.userId',
									mapping : 'userId'
								}, {
									name : 'appUser.username',
									mapping : 'username'
								}, {
									name : 'appUser.password',
									mapping : 'password'
								}, {
									name : 'appUser.fullname',
									mapping : 'fullname'
								}, {
									name : 'appUser.email',
									mapping : 'email'
								}, {
									name : 'appUser.depName',
									mapping : 'department.depName'
								}, {
									name : 'appUser.accessionTime',
									mapping : 'accessionTime'
								}, {
									name : 'appUserStatus',
									mapping : 'status'
								},

								{
									name : 'appUserTitle',
									mapping : 'title'
								}, {
									name : 'appUser.position',
									mapping : 'position'
								}, {
									name : 'appUser.phone',
									mapping : 'phone'
								}, {
									name : 'appUser.mobile',
									mapping : 'mobile'
								}, {
									name : 'appUser.fax',
									mapping : 'fax'
								}, {
									name : 'appUser.address',
									mapping : 'address'
								}, {
									name : 'appUser.zip',
									mapping : 'zip'
								},
								{
									name : 'appUser.photo',
									mapping : 'photo'
								}]),
				items : [{
					id:'displayUserPhoto',
					xtype : "panel",
					width : 230,
					rowspan:2,
					height : 435,
					title : "个人照片",
					html : '<img src="' + __ctxPath + '/images/default_image_male.jpg"/>',
					tbar : new Ext.Toolbar({
								width : '100%',
								height : 30,
								items : [{
											text : '上传',
											iconCls : 'btn-upload',
											handler : function() {
												var photo = Ext.getCmp('appUser.photo');
												var dialog = App.createUploadDialog({
																file_cat : 'system/appUser',
																callback : uploadUserPhoto,
																permitted_extensions:['jpg']
															});
												if(photo.value != '' && photo.value !=null && photo.value !='undefined'){
													var msg = '再次上传需要先删除原有图片,';
													Ext.Msg.confirm('信息确认', msg+'是否删除？', function(btn) {
														if (btn == 'yes') {
															//删除图片
															Ext.Ajax.request({
																url:__ctxPath + '/system/deleteFileAttach.do',
																method:'post',
																params:{filePath:photo.value},
																success:function(){
																	if(userId != '' && userId !=null && userId !='undefined'){
																		Ext.Ajax.request({
																			url:__ctxPath + '/system/photoAppUser.do',
																			method:'post',
																			params:{userId:userId},
																			success:function(){
																				photo.setValue('');
																				var appUserTitle = Ext.getCmp('appUserTitle');
																				var display = Ext.getCmp('displayUserPhoto');
																				if(appUserTitle.value ==1){
																					display.body.update('<img src="' + __ctxPath
																							+ '/images/default_image_male.jpg" />');
																				}else{
																					display.body.update('<img src="'+ __ctxPath
																							+ '/images/default_image_female.jpg" />');
																				}
																				dialog.show('queryBtn');
																			}
																		});
																	}else{
																		photo.setValue('');
																		var appUserTitle = Ext.getCmp('appUserTitle');
																		var display = Ext.getCmp('displayUserPhoto');
																		if(appUserTitle.value ==1){
																			display.body.update('<img src="' + __ctxPath
																					+ '/images/default_image_male.jpg" />');
																		}else{
																			display.body.update('<img src="'+ __ctxPath
																					+ '/images/default_image_female.jpg" />');
																		}
																		dialog.show('queryBtn');
																	}
																}
															});
														}
													})
												}else{
													dialog.show('queryBtn');
												}
											}
										}, {
											text : '删除',
											iconCls : 'btn-delete',
											handler : function() {
												var photo = Ext.getCmp('appUser.photo');
												if(photo.value != null && photo.value !='' && photo.value !='undefined'){
													var msg = '照片一旦删除将不可恢复,';
													Ext.Msg.confirm('确认信息',msg+'是否删除?',function(btn){
														if(btn == 'yes'){
															Ext.Ajax.request({
																url:__ctxPath + '/system/deleteFileAttach.do',
																method:'post',
																params:{filePath:photo.value},
																success:function(){
																	if(userId != '' && userId !=null && userId !='undefined'){
																			Ext.Ajax.request({
																			url:__ctxPath + '/system/photoAppUser.do',
																			method:'post',
																			params:{userId:userId},
																			success:function(){
																					photo.setValue('');
																					var appUserTitle = Ext.getCmp('appUserTitle');
																					var display = Ext.getCmp('displayUserPhoto');
																					if(appUserTitle.value ==1){
																						display.body.update('<img src="' + __ctxPath
																								+ '/images/default_image_male.jpg" />');
																					}else{
																						display.body.update('<img src="'+ __ctxPath
																								+ '/images/default_image_female.jpg" />');
																					}
																				}
																			});
																	}else{
																		photo.setValue('');
																		var appUserTitle = Ext.getCmp('appUserTitle');
																		var display = Ext.getCmp('displayUserPhoto');
																		if(appUserTitle.value ==1){
																			display.body.update('<img src="' + __ctxPath
																					+ '/images/default_image_male.jpg" />');
																		}else{
																			display.body.update('<img src="'+ __ctxPath
																					+ '/images/default_image_female.jpg" />');
																		}
																	}
																}
															});
														}
													});
												}// end if
												else{
													Ext.Msg.alert('提示信息','您还未增加照片.');
												}
												
											}
										}]
							})
				}, {
					xtype : "panel",
					id:'AppUserMustInfo',
					width : 265,
					height : 215,
					title : "基本信息(必填)",
					layout : 'form',
					defaultType : "textfield",
					defaults : {
						width : 163
					},
					labelWidth : 55,
					labelAlign : "right",
					hideLabels : false,
					items : [{
								xtype : 'hidden',
								fieldLabel : '员工ID',
								name : 'appUser.userId',
								id : 'appUser.userId'
							}, {
								fieldLabel : '登录账号',
								name : 'appUser.username',
								id : 'appUser.username'
//								minLength : 6,
//								maxLength : 50
							}, {
								fieldLabel : '登录密码',
								name : 'appUser.password',
								id : 'appUser.password'
//								minLength : 6,
//								maxLength : 50
							}, {
								fieldLabel : '员工姓名',
								name : 'appUser.fullname',
								id : 'appUser.fullname'
							}, {
								fieldLabel : 'E-mail',
								name : 'appUser.email',
								id : 'appUser.email',
								vtype : 'email',
								vtypeText : '邮箱格式不正确!'
							},

							depSelector,// 所属部门
							{
								fieldLabel : '入职时间',
								xtype : 'datefield',
								readOnly : true,
								format : 'Y-m-d',
								name : 'appUser.accessionTime',
								id : 'appUser.accessionTime',
								length : 50
							}, {
								fieldLabel : '状态',
								id : 'appUserStatus',
								hiddenName : 'appUser.status',
								xtype : 'combo',
								mode : 'local',
								editable : false,
								triggerAction : 'all',
								store : [['1', '可用'], ['0', '禁用']],
								value : 0
							}, {
								xtype : 'hidden',
								name : 'appUser.department.depId',
								id : 'appUser.depId'
							}]
				}, {
					xtype : "panel",
					width : 265,
					height : 215,
					title : "扩展信息(选填)",
					layout : 'form',
					defaultType : 'textfield',
					labelWidth : 55,
					defaults : {
						width : 163
					},
					hideLabel : false,
					items : [{
								fieldLabel : '性别',
								xtype : 'combo',
								hiddenName : 'appUser.title',
								id : 'appUserTitle',
								mode : 'local',
								editable : false,
								triggerAction : 'all',
								store : [['1', '先生'], ['0','女士']],
								value : '1',
								listeners:{
									select:function(combo, record,index){
										  var photo = Ext.getCmp('appUser.photo');
										  if(photo.value =='' || photo.value == 'undefined' || photo.value ==null){
											  var display = Ext.getCmp('displayUserPhoto');
										      if(combo.value == '0'){
										      	display.body.update('<img src="' + __ctxPath
													+ '/images/default_image_female.jpg" />');
										      }else{
										      	display.body.update('<img src="' + __ctxPath
													+ '/images/default_image_male.jpg" />');
										      }
										  }
									}
								}
							}, {
								fieldLabel : '职位',
								name : 'appUser.position',
								id : 'appUser.position'
							}, {
								fieldLabel : '家庭电话',
								xtype : 'numberfield',
								name : 'appUser.phone',
								id : 'appUser.phone'
							}, {
								fieldLabel : '移动电话',
								xtype : 'numberfield',
								name : 'appUser.mobile',
								id : 'appUser.mobile'
							}, {
								fieldLabel : '传真',
								xtype : 'numberfield',
								name : 'appUser.fax',
								id : 'appUser.fax'
							}, {
								fieldLabel : '家庭住址',
								name : 'appUser.address',
								id : 'appUser.address'
							}, {
								fieldLabel : '邮编',
								xtype : 'numberfield',
								name : 'appUser.zip',
								id : 'appUser.zip'
							},{
								filedLabel:'照片',
								xtype:'hidden',
								id:'appUser.photo',
								name:'appUser.photo'
							}]
				}, {
			xtype : 'panel',
			title:'用户角色',
			width : 530,
			height : 220,
			colspan : 2,
			items : [{
				xtype : 'itemselector',
				id:'AppUserRoles',
				name : 'AppUserRoles',
				
				fromLegend : '',
				imagePath : __ctxPath+'/ext3/ux/images/',
				multiselects : [{
							id:'chooseRoles',
							title:'可选角色',
							width : 247,
							height : 190,
							//SimpleStore 有可能 在Ext 3.0 以后的版本 换成 ArrayStore,更新版本时请注意
							store : new Ext.data.SimpleStore({
								autoLoad :true,
								baseParams :{userId:userId},
								url:__ctxPath+'/system/chooseRolesAppUser.do',
								fields:['roleId','roleName']
							}),
							displayField : 'roleName',
							valueField : 'roleId'
						}, {
							id:'selectedRoles',
							name:'selectedRoles',
							title:'已有角色',
							width : 247,
							height : 190,
							store : new Ext.data.SimpleStore({
								autoLoad :true,
								baseParams :{userId:userId},
								url:__ctxPath+'/system/selectedRolesAppUser.do',
								fields:['roleId','roleName']
							}),
							tbar : [{
								text : '清除所选',
								handler : function() {
									Ext.getCmp('AppUserForm').getForm().findField('AppUserRoles').reset();
								}
							}],
							displayField : 'roleName',
							valueField : 'roleId'
						}]

			}]

		}]
	});
	return userform;
};
// 初始化操作菜单
AppUserForm.prototype.initFooterToolbar = function(userId) {

	var toolbar = new Ext.Toolbar({
				id:'AppUserFormToolbar',
				width : '100%',
				height : 30,
				items : [{
					text : '保存',
					iconCls:'btn-save',
					handler : function() {
						var userform = Ext.getCmp('AppUserForm');
						userform.getForm().submit({
									waitMsg : '正在提交用户信息',
									success : function(userform, o) {
										Ext.Msg.alert('操作信息', '保存成功！')
										var userview = Ext.getCmp('AppUserGrid');
										if (userview != null) {//假如员工列表不为空,则重载数据
											userview.getStore().reload({
														start : 0,
														limit : 25
													});
										}
									}
								});
					}

				}, {
					text : '取消',
					iconCls:'reset',
					handler : function() {
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('AppUserForm');
					}
				},{
					text: '修改密码',
					id:'resetPassword',
					iconCls:'btn-password',
					hidden:true,
					handler : function(){
						new resetPassword(userId);
					}
				}]
			});
	return toolbar;
};
/**
 * 上传照片
 * @param {} data
 */
function uploadUserPhoto(data){
	var photo = Ext.getCmp('appUser.photo');
	var display = Ext.getCmp('displayUserPhoto');
	photo.setValue(data[0].filepath);
	display.body.update('<img src="' + __ctxPath + '/attachFiles/'+data[0].filepath+'"  width="100%" height="100%"/>');
};

/**
 * 修改密码
 */
function resetPassword(userId){
	var formPanel = new Ext.FormPanel({
				url : __ctxPath+ '/system/resetPasswordAppUser.do',
				layout : 'form',
				id:'setPasswordForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '100%,100%'
				},
	        	defaultType : 'textfield',
				items : [{
							name : 'appUserUserId',
							id : 'appUserUserId',
							xtype:'hidden',
							value : userId
						}, {
							fieldLabel : '旧密码',
							name : 'oldPassword',
							id : 'oldPassword',
							inputType : 'password'
						}, {
							fieldLabel : '新密码',
							name : 'newPassword',
							id : 'newPassword',
							inputType : 'password'
						}, {
							fieldLabel : '再输入',
							name : 'againPassword',
							id : 'againPassword',
							inputType : 'password'
						}]
			});
			
	var setPassword = new Ext.Window({
		title:'修改密码',
		width : 300,
		height : 175,
		modal: true,
		layout : 'anchor',
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items:[formPanel],
		buttons : [{
					text : '保存',
					handler : function() {
						var fp=Ext.getCmp('setPasswordForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
										method: 'post',
										waitMsg : '正在提交数据...',
										success : function(fp,action) {
											Ext.Msg.alert('操作信息', '密码修改成功！');
											setPassword.close();
										},
										failure : function(fp,action) {
											Ext.Msg.alert('错误提示',action.result.msg);
											Ext.getCmp('setPasswordForm').getForm().reset();
										}
							});
						}
					}
				}, {
					text : '取消',
					handler : function() {
						setPassword.close();
					}
				}]
			});
	setPassword.show();

}

