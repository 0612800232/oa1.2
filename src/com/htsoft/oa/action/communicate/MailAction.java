package com.htsoft.oa.action.communicate;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.communicate.Mail;
import com.htsoft.oa.model.communicate.MailBox;
import com.htsoft.oa.model.communicate.MailFolder;
import com.htsoft.oa.model.info.InMessage;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.communicate.MailBoxService;
import com.htsoft.oa.service.communicate.MailFolderService;
import com.htsoft.oa.service.communicate.MailService;
import com.htsoft.oa.service.info.InMessageService;
import com.htsoft.oa.service.info.ShortMessageService;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.FileAttachService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;

/**
 * 
 * @author csx
 * 
 */
public class MailAction extends BaseAction {
	@Resource
	private MailService mailService;
	@Resource
	private FileAttachService fileAttachService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private MailFolderService mailFolderService;
	@Resource
	private MailBoxService mailBoxService;
	@Resource
	private ShortMessageService shortMessageService;
	@Resource
	private InMessageService inMessageService;

	private Mail mail;

	private Long mailId;

	private AppUser appUser;

	private Long folderId;
	
	private Long boxId;
	
	private String sendMessage;
	
	private Long replyBoxId;
	
	private String boxIds;//移动邮件的集合
	
	private Long fileId;//附件Id
	public Long getMailId() {
		return mailId;
	}

	public void setMailId(Long mailId) {
		this.mailId = mailId;
	}

	public Mail getMail() {
		return mail;
	}

	public void setMail(Mail mail) {
		this.mail = mail;
	}

	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}
	
	
	public Long getFolderId() {
		if(folderId==null){
			return 1l;
		}else{
			return folderId;
		}
	}

	public void setFolderId(Long folderId) {
		this.folderId = folderId;
	}
	
	public Long getBoxId() {
		return boxId;
	}

	public void setBoxId(Long boxId) {
		this.boxId = boxId;
	}

	public String getBoxIds() {
		return boxIds;
	}

	public void setBoxIds(String boxIds) {
		this.boxIds = boxIds;
	}

	public String getSendMessage() {
		return sendMessage;
	}

	public void setSendMessage(String sendMessage) {
		this.sendMessage = sendMessage;
	}
	
	public Long getReplyBoxId() {
		return replyBoxId;
	}

	public void setReplyBoxId(Long replyBoxId) {
		this.replyBoxId = replyBoxId;
	}

	public Long getFileId() {
		return fileId;
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		if(folderId==null||folderId==1){//folderId = 1 表示收件箱
			setFolderId(new Long(1));
		}
		filter.addFilter("Q_appUser.userId_L_EQ", ContextUtil.getCurrentUserId().toString());
		filter.addFilter("Q_mailFolder.folderId_L_EQ", folderId.toString());
//		}else{
//			filter.addFilter("Q_mail.senderAccount_S_EQ", ContextUtil.getCurrentUser().getUsername());
//			filter.addFilter("Q_mailFolder.folderId_L_EQ", folderId.toString());
//		}
		filter.addSorted("sendTime", "desc");
		List<MailBox> list = mailBoxService.getAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
				"sendTime");
		buff.append(serializer.exclude(
				new String[] { "class", "mail.appUser", "appUser.department",
						"mailFolder" }).prettyPrint(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {
		
		MailFolder deleteFolder = mailFolderService.get(4l);
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			if(getFolderId()==4){
				for (String id : ids) {
					mailBoxService.remove(new Long(id));
				}
			}else{
				for (String id : ids) {
					MailBox mailBoxDelete = mailBoxService.get(new Long(id));
					mailBoxDelete.setDelFlag((short)1);
					mailBoxDelete.setMailFolder(deleteFolder);
					mailBoxService.save(mailBoxDelete);
				}
			}
		}
		jsonString = "{success:true}";
		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		setMail(mailService.get(mailId));
		MailBox readed = mailBoxService.get(boxId);
		readed.setReadFlag((short)1);
		mailBoxService.save(readed);
		//if(folderId!=null && folderId==3){
		if(mail.getMailStatus()!=1){//假如为草稿
			JSONSerializer serializer = new JSONSerializer();
			//将数据转成JSON格式
			StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:[");
			sb.append(serializer.exclude(new String[] {"class","mail.appUser", "appUser.department",
					"mailFolder.appUser"}).prettyPrint(mail));
			sb.append("]}");
			setJsonString(sb.toString());
			return SUCCESS;
		}else{
			getRequest().setAttribute("mail", mail);
			getRequest().setAttribute("mailAttachs", mail.getMailAttachs());
			return "detail";
		}
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (mail.getMailStatus() == 1) {
			//假如发送邮件,发件人不能为空
			if(StringUtils.isEmpty(mail.getRecipientIDs())){
				setJsonString("{failure:true,msg:'收件人不能为空!'}");
				return SUCCESS;
			}
			//邮件主题不能为空
			if(StringUtils.isEmpty(mail.getSubject())){
				setJsonString("{failure:true,msg:'邮件主题不能为空!'}");
				return SUCCESS;
			}
			//邮件内容不能为空
			if(StringUtils.isEmpty(mail.getContent())){
				setJsonString("{failure:true,msg:'邮件内容不能为空!'}");
				return SUCCESS;
			}
			//假如是回复邮件,则原邮件改回复标识
			if(replyBoxId!=null&&!"".equals(replyBoxId)){
				MailBox reply = mailBoxService.get(replyBoxId);
				reply.setReplyFlag((short)1);
				mailBoxService.save(reply);
			}
			
			MailFolder receiveFolder = mailFolderService.get(1l);//收件箱
			MailFolder sendFolder = mailFolderService.get(2l);//发件箱
			String[] recipientIDs = mail.getRecipientIDs().split(",");// 收件人IDs
			String[] copyToIDs = mail.getCopyToIDs().split(",");// 抄送人IDs
			
			if(mail.getMailId()==null){//当该邮件是新建邮件时
				SaveMail();
				
				// 邮件保存到已发送
				
				MailBox mailBox = new MailBox();
				mailBox.setMail(mail);
				mailBox.setMailFolder(sendFolder);
				mailBox.setAppUser(ContextUtil.getCurrentUser());
				mailBox.setSendTime(mail.getSendTime());
				mailBox.setDelFlag((short) 0);
				mailBox.setReadFlag((short) 0);
				mailBox.setNote("已发送的邮件");
				mailBox.setReplyFlag((short)0);
				mailBoxService.save(mailBox);	
			}else{
				Mail old = mailService.get(mail.getMailId());
				 try{
		              BeanUtil.copyNotNullProperties(old, mail);
		              Set<FileAttach> mailAttachs = new HashSet<FileAttach>();
		              old.setSendTime(new Date());
		              String[] fileIds = mail.getFileIds().split(",");
			      		for (String id : fileIds) {
			      			if (!id.equals("")) {
			      				mailAttachs.add(fileAttachService.get(new Long(id)));
			      			}
			      		}
			      	  old.setMailAttachs(mailAttachs);
			      	  setMail(old);
		              mailService.save(old);
		           }catch(Exception ex){
		              logger.error(ex.getMessage());
		           }
		        MailBox drafted = mailBoxService.get(boxId);
		        drafted.setMailFolder(sendFolder);
		        drafted.setNote("已发送的邮件");
		        mailBoxService.save(drafted);
			}
			//发送系统提示信息
			if(sendMessage!=null&&sendMessage.equals("on")){
				ShortMessage shortMessage = new ShortMessage();
				shortMessage.setContent("您有新邮件!");
				shortMessage.setMsgType((short)4);//系统信息
				shortMessage.setSender(ContextUtil.getCurrentUser().getFullname());
				shortMessage.setSenderId(ContextUtil.getCurrentUserId());
				shortMessage.setSendTime(new Date());
				shortMessageService.save(shortMessage);
				for(String id : recipientIDs){
					if(!"".equals(id)){
						InMessage inMessage = new InMessage();
						inMessage.setDelFlag((short)0);
						inMessage.setReadFlag((short)0);
						inMessage.setShortMessage(shortMessage);
						inMessage.setUserFullname(appUserService.get(new Long(id)).getFullname());
						inMessage.setUserId(new Long(id));
						inMessageService.save(inMessage);
					}
				}
			}
			// 发送邮件
			for (String id : recipientIDs) {
				if (!"".equals(id)) {
					MailBox mailBoxSend = new MailBox();
					mailBoxSend.setMail(mail);
					mailBoxSend.setMailFolder(receiveFolder);
					mailBoxSend.setAppUser(appUserService.get(new Long(id)));
					mailBoxSend.setSendTime(mail.getSendTime());
					mailBoxSend.setDelFlag((short) 0);
					mailBoxSend.setReadFlag((short) 0);
					mailBoxSend.setNote("发送出去的邮件");
					mailBoxSend.setReplyFlag((short)0);
					mailBoxService.save(mailBoxSend);
				}
				
			}
			// 发送抄送邮件
			for (String id : copyToIDs) {
				if (!"".equals(id)) {
					MailBox mailBoxCopy = new MailBox();
					mailBoxCopy.setMail(mail);
					mailBoxCopy.setMailFolder(receiveFolder);
					mailBoxCopy.setAppUser(appUserService.get(new Long(id)));
					mailBoxCopy.setSendTime(mail.getSendTime());
					mailBoxCopy.setDelFlag((short) 0);
					mailBoxCopy.setReadFlag((short) 0);
					mailBoxCopy.setNote("抄送出去的邮件");
					mailBoxCopy.setReplyFlag((short)0);
					mailBoxService.save(mailBoxCopy);
				}
			}
			
		} else {
			//草稿时邮件主题不能为空
			if(StringUtils.isEmpty(mail.getSubject())){
				setJsonString("{failure:true,msg:'邮件主题不能为空!'}");
				return SUCCESS;
			}
			SaveMail();//先存邮件到mail表,再存到mailBox表
			
			//存草稿
			MailFolder draftFolder = mailFolderService.get(3l);//拿到草稿箱
			MailBox mailBox = new MailBox();
			mailBox.setMail(mail);
			mailBox.setMailFolder(draftFolder);
			mailBox.setAppUser(ContextUtil.getCurrentUser());
			mailBox.setSendTime(mail.getSendTime());
			mailBox.setDelFlag((short)0);
			mailBox.setReadFlag((short)0);
			mailBox.setNote("存草稿");
			mailBox.setReplyFlag((short)0);
			mailBoxService.save(mailBox);
		}

		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	public void SaveMail(){
		// 把邮件保存到mail 表里
		Set<FileAttach> mailAttachs = new HashSet<FileAttach>();
		setAppUser(ContextUtil.getCurrentUser());
		mail.setAppSender(appUser);
		mail.setSendTime(new Date());
		mail.setSender(appUser.getFullname());
		String[] fileIds = mail.getFileIds().split(",");
		for (String id : fileIds) {
			if (!id.equals("")) {
				mailAttachs.add(fileAttachService.get(new Long(id)));
			}
		}
		mail.setMailAttachs(mailAttachs);
		mailService.save(mail);
	}
	
	/**
	 * 邮件回复和转发
	 */
	public String opt(){
		setMail(mailService.get(mailId));
		String opt = getRequest().getParameter("opt");
		Mail reply = new Mail();
		StringBuffer newSubject = new StringBuffer("<br><br><br><br><br><br><br><hr>");
		newSubject.append("<br>----<strong>"+opt+"邮件</strong>----");
		newSubject.append("<br><strong>发件人</strong>:"+mail.getSender());
		newSubject.append("<br><strong>发送时间</strong>:"+mail.getSendTime());
		newSubject.append("<br><strong>收件人</strong>:"+mail.getRecipientNames());
		String copyToNames = mail.getCopyToNames();
		if(!"".equals(copyToNames)&&copyToNames!=null){
			newSubject.append("<br><strong>抄送人</strong>:"+copyToNames);
		}
		newSubject.append("<br><strong>主题</strong>:"+mail.getSubject());
		newSubject.append("<br><strong>内容</strong>:<br><br>"+mail.getContent());
		reply.setContent(newSubject.toString());
		reply.setSubject(opt+":"+mail.getSubject());
		reply.setImportantFlag((short)1);
		if(opt.equals("回复")){
			reply.setRecipientIDs(""+mail.getAppSender().getUserId());
			reply.setRecipientNames(mail.getSender());
		}
		JSONSerializer serializer = new JSONSerializer();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(serializer.exclude(new String[] {"class","appUser"}).prettyPrint(reply));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 移动邮件至指定文件夹
	 */
	public String move(){
		MailFolder moveToFolder = mailFolderService.get(new Long(folderId));
		String[] ids = boxIds.split(",");
		StringBuffer msg = new StringBuffer("{");
		boolean moveSuccess = false;
		if(ids[0]!=null&&!"".equals(ids[0])){//判断草稿不能移到其他,除了删除箱,判断正式邮件不能移至草稿箱
			Mail moveTest = mailBoxService.get(new Long(ids[0])).getMail();
			if(moveTest.getMailStatus()==0){
				//假如是草稿
				if(folderId ==3 ||folderId ==4){
					//假如是草稿箱或者是删除箱,则允许移动
					moveSuccess = true;
				}
				else msg.append("msg:'草稿只能移至草稿箱或是垃圾箱(移至垃圾箱相当于删除,请注意!)'");
			}
			else if(moveTest.getMailStatus()==1){
				//假如是正式邮件
				if(folderId !=3){
					//假如不是草稿箱,允许移动
					moveSuccess = true;
				}
				else msg.append("msg:'正式邮件不能移至草稿箱'");
			}
		}
		if(moveSuccess){
			//把id为包含在ids数组里的邮件移动至所选文件夹
			for (String id : ids) {
				if(!"".equals(id)){
					MailBox mailBoxDelete = mailBoxService.get(new Long(id));
					mailBoxDelete.setMailFolder(moveToFolder);
					mailBoxService.save(mailBoxDelete);
				}
			}
			msg.append("success:true}");
			setJsonString(msg.toString());
		}else{
			//不合规则,不允许移动
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}
		return SUCCESS;
	}
	
	/**
	 * 草稿邮件删除附件
	 * @return
	 */
	public String attach(){
		String fileIds = getRequest().getParameter("fileIds");
		String filenames = getRequest().getParameter("filenames");
		setMail(mailService.get(mailId));
		Set<FileAttach> mailAttachs = mail.getMailAttachs();
		FileAttach remove = fileAttachService.get(fileId);
		mailAttachs.remove(remove);
		mail.setMailAttachs(mailAttachs);
		mail.setFileIds(fileIds);
		mail.setFilenames(filenames);
		mailService.save(mail);
		fileAttachService.remove(fileId);
		return SUCCESS;
	}
}

