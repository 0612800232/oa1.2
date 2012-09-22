var DiaryForm = function(diaryId) {
	this.diaryId = diaryId;
	var fp = this.setup();
	var window = new Ext.Window( {
		id : 'DiaryFormWin',
		title : 'Diary详细信息',
		width : 500,
		height : 420,
		modal : true,
		minWidth : 300,
		minHeight : 200,
		layout : 'anchor',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : [ this.setup() ],
		buttons : [ {
			text : '保存',
			handler : function() {
				var fp = Ext.getCmp('DiaryForm');
				
				if (fp.getForm().isValid()) {
				
			fp.getForm().submit( {
				method : 'post',

				waitMsg : '正在提交数据...',
				success : function(fp, action) {
					Ext.Msg.alert('操作信息', '成功信息保存！');
					Ext.getCmp('DiaryGrid').getStore().reload();
					window.close();
				},
				failure : function(fp, action) {
					Ext.MessageBox.show( {
						title : '操作信息',
						msg : '信息保存出错，请联系管理员！',
						buttons : Ext.MessageBox.OK,
						icon : 'ext-mb-error'
					});
					window.close();
				}
			});
		}
	}
		}, {
			text : '取消',
			handler : function() {
				window.close();
			}
		} ]
	});
	window.show();
};

DiaryForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel( {
		url : __ctxPath + '/system/saveDiary.do',
		layout : 'form',
		id : 'DiaryForm',
		frame : true,
		defaults : {
			widht : 400,
			anchor : '100%,100%'
		},
		formId : 'DiaryFormId',
		defaultType : 'textfield',
		items : [ {
			name : 'diary.diaryId',
			id : 'diaryId',
			xtype : 'hidden',
			value : this.diaryId == null ? '' : this.diaryId
		}, {
			fieldLabel : '日期',
			xtype : 'datefield',
			name : 'diary.dayTime',
			id : 'dayTime',
			readOnly:true,
			format : 'Y-m-d'				
		}, {
			fieldLabel : '日志类型',
			xtype : 'combo',
			hiddenName : 'diary.diaryType',
			id : 'diaryType',
			mode : 'local',
			editable : false,
			triggerAction : 'all',
			store :[['0','个人日志'],['1','工作日志']]
		}, {
			fieldLabel : '内容',
			xtype : 'htmleditor',
			name : 'diary.content',
			id : 'content'
		}, {
			fieldLabel : 'id:',
			name : 'diary.userId',
			id : 'userId'
		} ]
	});

	if (this.diaryId != null && this.diaryId != 'undefined') {
		formPanel.getForm().load( {
			deferredRender : false,
			url : __ctxPath + '/system/getDiary.do?diaryId=' + this.diaryId,
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				// Ext.Msg.alert('编辑', '载入成功！');
		},
		failure : function(form, action) {
			// Ext.Msg.alert('编辑', '载入失败');
		}
		});
	}
	return formPanel;

};
