/**
 * 系统导入的模块js，主要用于后加载方式，需要使用某些js时，需要在此指定加载哪一些。
 */
 Ext.ns("App");
App.importJs = {
	AppRoleView : [
			__ctxPath + '/js/system/AppRoleView.js',
			__ctxPath+'/ext3/ux/CheckTreePanel.js',
			__ctxPath+'/js/system/RoleGrantRightView.js',
			__ctxPath + '/js/system/AppRoleForm.js'],
	PersonalDocumentView : [
			__ctxPath + '/js/document/PersonalDocumentView.js',
			__ctxPath + '/js/document/DocumentView.js',
			__ctxPath + '/js/document/DocumentForm.js',
			__ctxPath + '/js/document/DocumentSharedForm.js',
			__ctxPath + '/js/document/DocFolderForm.js'],
	DocumentSharedView : [
	        __ctxPath + '/js/document/DocumentSharedView.js',
	        __ctxPath + '/js/document/DocumentSharedWin.js'],
	DocFolderSharedView :[
	        __ctxPath + '/js/document/FindPublicDocumentView.js',
	        __ctxPath + '/js/document/DocFolderView.js',
	        __ctxPath +'/js/document/DocFolderForm.js',
	        __ctxPath + '/js/document/DocFolderSharedView.js',
	        __ctxPath + '/js/document/DocFolderSharedForm.js',
	        __ctxPath + '/js/document/DocPrivilegeForm.js',
	        __ctxPath + '/js/document/DocPrivilegeView.js'],
	FindPublicDocumentView :[
	        __ctxPath + '/js/document/FindPublicDocumentView.js',
	        __ctxPath + '/js/document/PublicDocumentView.js',
	        __ctxPath + '/js/document/PublicDocumentDetailWin.js',
	        __ctxPath + '/js/document/NewPublicDocumentForm.js',
	        __ctxPath + '/js/document/DocFolderSelector.js'],
	NewPublicDocumentForm :[
	        __ctxPath + '/js/document/NewPublicDocumentForm.js',
	        __ctxPath + '/js/document/DocFolderSelector.js'],
	DocFolderMoveForm : [
	        __ctxPath + '/js/document/DocFolderMoveForm.js',
	        __ctxPath + '/js/document/PersonalDocFolderSelector.js'],
	NoticeView : [
			__ctxPath + '/js/info/NoticeView.js',
			__ctxPath + '/js/info/NoticeForm.js',
			__ctxPath + '/js/info/NoticeDetail.js'],
	ReportTemplateView : [
			__ctxPath + '/js/system/ReportTemplateView.js',
			__ctxPath + '/js/system/ReportTemplateForm.js'],       
	MessageView : [
	        __ctxPath + '/js/info/MessageView.js',
	        __ctxPath + '/js/info/MessageForm.js',
	        __ctxPath + '/js/info/MessageWin.js'],
	PhoneBookView : [
	        __ctxPath + '/js/communicate/PhoneBookView.js',
	        __ctxPath + '/js/communicate/PhoneGroupForm.js',
	        __ctxPath + '/js/communicate/PhoneBookForm.js'],
    DepartmentView : [
            __ctxPath + '/js/system/DepartmentView.js',
            __ctxPath + '/js/system/DepartmentForm.js',
            __ctxPath + '/js/system/AppUserView.js',
            __ctxPath + '/js/system/AppUserForm.js'],
    AppUserView : [
            __ctxPath+'/js/system/AppUserView.js',
            __ctxPath+'/js/system/AppUserForm.js'],
    NewsView : [
            __ctxPath + '/js/info/NewsView.js',
            __ctxPath + '/js/info/NewsForm.js',
            __ctxPath + '/js/info/NewsTypeTree.js',
            __ctxPath + '/js/info/NewsTypeForm.js'],
	NewsTypeView : [
            __ctxPath + '/js/info/NewsTypeView.js',
            __ctxPath + '/js/info/NewsTypeForm.js'],
    CompanyView : [
            __ctxPath + '/js/system/CompanyView.js'],
    FileAttachView : [
    		__ctxPath + '/js/system/FileAttachView.js',
    		__ctxPath + '/js/system/FileAttachForm.js',
    		__ctxPath + '/js/system/FileAttachDetail.js'],
    DiaryView : [
    		__ctxPath + '/js/system/DiaryView.js',
    		__ctxPath + '/js/system/DiaryForm.js'],
    PersonalMailBoxView : [
    		__ctxPath + '/js/communicate/PersonalMailBoxView.js',
    		__ctxPath + '/js/communicate/MailView.js',
    		__ctxPath + '/js/communicate/MailForm.js',
    		__ctxPath + '/js/communicate/MailFolderForm.js'],
    MailForm : [
    		__ctxPath + '/js/communicate/MailForm.js'],
   	PersonalPhoneBookView:[
   	        __ctxPath+'/js/communicate/PersonalPhoneBookView.js',
	        __ctxPath+'/js/communicate/PhoneBookView.js',
	        __ctxPath+'/js/communicate/PhoneGroupForm.js',
	        __ctxPath+'/js/communicate/PhoneBookForm.js'],
    SharedPhoneBookView:[
            __ctxPath+'/js/communicate/SharedPhoneBookView.js',
            __ctxPath+'/js/communicate/SharedPhoneBookWin.js'],
    
    FlowManagerView:[
    		__ctxPath+'/js/flow/ProTypeForm.js',
    		__ctxPath+'/js/flow/ProDefinitionForm.js',
    		__ctxPath+'/js/flow/ProDefinitionView.js',
    		__ctxPath+'/js/flow/FlowManagerView.js',
    		__ctxPath+'/js/flow/ProDefinitionDetail.js',
    		__ctxPath+'/js/flow/ProDefinitionView.js',
    		__ctxPath+'/js/flow/ProDefinitionSetting.js',
    	
    		__ctxPath+'/js/flow/ProcessRunView.js',
    		__ctxPath+'/js/flow/ProcessRunDetail.js',
    		__ctxPath+'/js/flow/MyTaskView.js',
    		__ctxPath+'/js/flow/ProcessNextForm.js'
    ],
    NewProcess:[
    	__ctxPath+'/js/flow/NewProcess.js',
    	__ctxPath+'/js/flow/ProDefinitionView.js',
    	__ctxPath+'/js/flow/ProcessRunStart.js'
    ],
    ProcessRunView:[
    	__ctxPath+'/js/flow/ProcessRunView.js',
    	__ctxPath+'/js/flow/ProcessRunDetail.js'
    ],
    MyTaskView:[
    	__ctxPath+'/js/flow/MyTaskView.js',
    	__ctxPath+'/js/flow/ProcessNextForm.js'
    ],
   BookManageView:[
            __ctxPath+'/js/admin/BookManageView.js',
            __ctxPath+'/js/admin/BookView.js',
            __ctxPath+'/js/admin/BookForm.js',
            __ctxPath+'/js/admin/BookTypeForm.js'],
    BookTypeView:[
            __ctxPath+'/js/admin/BookTypeView.js',
            __ctxPath+'/js/admin/BookTypeForm.js'],
    BookBorrowView:[
            __ctxPath+'/js/admin/BookBorrowView.js',
            __ctxPath+'/js/admin/BookBorrowForm.js',
            __ctxPath+'/js/admin/BookReturnForm.js'],
    BookReturnView:[
            __ctxPath+'/js/admin/BookReturnView.js',
            __ctxPath+'/js/admin/BookReturnForm.js',
            __ctxPath+'/js/admin/BookBorrowForm.js'],
     OfficeGoodsManageView: [
            __ctxPath+'/js/admin/OfficeGoodsManageView.js',
            __ctxPath+'/js/admin/OfficeGoodsTypeForm.js',
            __ctxPath+'/js/admin/OfficeGoodsView.js',
            __ctxPath+'/js/admin/OfficeGoodsForm.js'],
    InStockView:[
            __ctxPath+'/js/admin/InStockView.js',
            __ctxPath+'/js/admin/InStockForm.js'],
    GoodsApplyView:[
            __ctxPath+'/js/admin/GoodsApplyView.js',
            __ctxPath+'/js/admin/GoodsApplyForm.js'],
    CarView:[
            __ctxPath+'/js/admin/CarView.js',
            __ctxPath+'/js/admin/CarForm.js'],
    CartRepairView:[
            __ctxPath+'/js/admin/CartRepairView.js',
            __ctxPath+'/js/admin/CartRepairForm.js'],
    CarApplyView:[
            __ctxPath+'/js/admin/CarApplyView.js',
            __ctxPath+'/js/admin/CarApplyForm.js'],        
    AppointmentView:[
    		__ctxPath+'/js/task/AppointmentView.js',
    		__ctxPath+'/js/task/AppointmentForm.js'
    ],
    CalendarPlanView:[
    		__ctxPath+'/js/task/CalendarPlanView.js',
    		__ctxPath+'/js/task/CalendarPlanForm.js',
    		__ctxPath+'/js/task/CalendarPlanFinishForm.js'
    ],
    MyPlanTaskView:[
    	__ctxPath+'/js/task/CalendarPlanView.js',
    	__ctxPath+'/js/task/CalendarPlanForm.js',
    	__ctxPath+'/js/task/CalendarPlanFinishForm.js',
    	__ctxPath+'/ext3/ux/caltask/e2cs_zh_CN.js',
    	__ctxPath+'/ext3/ux/caltask/calendar.js',
    	__ctxPath+'/ext3/ux/caltask/scheduler.js',
    	__ctxPath+'/ext3/ux/caltask/monthview.js',
    	__ctxPath+'/ext3/ux/caltask/weekview.js',
    	__ctxPath+'/ext3/ux/caltask/dayview.js',
    	__ctxPath+'/ext3/ux/caltask/task.js',
    	__ctxPath+'/js/task/MyPlanTaskView.js'
    ],
    PlanTypeView:[
    	__ctxPath+'/js/task/PlanTypeView.js',
    	__ctxPath+'/js/task/PlanTypeForm.js'
    ],
    WorkPlanView:[
    	__ctxPath+'/js/task/WorkPlanView.js',
    	__ctxPath+'/js/task/WorkPlanForm.js'
    ],
    CustomerView:[
    		__ctxPath+'/js/customer/CustomerView.js',
    		__ctxPath+'/js/customer/CustomerForm.js',
    		__ctxPath+'/js/customer/CusLinkmanForm.js'
    ],
    CusLinkmanView:[
    		__ctxPath+'/js/customer/CusLinkmanView.js',
    		__ctxPath+'/js/customer/CusLinkmanForm.js'
    ],
    FixedAssetsManageView:[
            __ctxPath+'/js/admin/FixedAssetsManageView.js',
            __ctxPath+'/js/admin/FixedAssetsView.js',
            __ctxPath+'/js/admin/FixedAssetsForm.js',
            __ctxPath+'/js/admin/AssetsTypeForm.js',
            __ctxPath+'/js/admin/DepreWin.js'
    ],
    DepreTypeView :[
            __ctxPath+'/js/admin/DepreTypeForm.js',
            __ctxPath+'/js/admin/DepreTypeView.js'
    ],
    DepreRecordView:[
            __ctxPath+'/js/admin/DepreRecordForm.js',
            __ctxPath+'/js/admin/DepreRecordView.js'
    ],
    CusConnectionView:[
    		__ctxPath+'/js/customer/CusConnectionView.js',
    		__ctxPath+'/js/customer/CusConnectionForm.js'
    ],
    ProjectView:[
    		__ctxPath+'/js/customer/ProjectView.js',
    		__ctxPath+'/js/customer/ProjectForm.js'
    ],
    ContractView:[
    		__ctxPath+'/js/customer/ContractView.js',
    		__ctxPath+'/js/customer/ContractForm.js',
    		__ctxPath+'/js/customer/ContractConfigView.js'
    ]
};
