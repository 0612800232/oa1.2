package com.htsoft.oa.action.communicate;
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.communicate.PhoneBook;
import com.htsoft.oa.model.communicate.PhoneGroup;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.communicate.PhoneBookService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class PhoneBookAction extends BaseAction{
	@Resource
	private PhoneBookService phoneBookService;
	private PhoneBook phoneBook;
	private PhoneGroup phoneGroup;
	private Long phoneId;

	public Long getPhoneId() {
		return phoneId;
	}

	public void setPhoneId(Long phoneId) {
		this.phoneId = phoneId;
	}

	public PhoneGroup getPhoneGroup() {
		return phoneGroup;
	}

	public void setPhoneGroup(PhoneGroup phoneGroup) {
		this.phoneGroup = phoneGroup;
	}

	public PhoneBook getPhoneBook() {
		return phoneBook;
	}

	public void setPhoneBook(PhoneBook phoneBook) {
		this.phoneBook = phoneBook;
	}

	/**
	 * 显示列表
	 */
	public String list(){		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_appUser.userId_L_EQ", (ContextUtil.getCurrentUserId()).toString());
		String strGroupId=getRequest().getParameter("groupId");
		if(StringUtils.isNotEmpty(strGroupId)){
			Long groupId=Long.parseLong(strGroupId);
			 if(groupId>0){
		        filter.addFilter("Q_phoneGroup.groupId_L_EQ", strGroupId);
			 }
		}
		List<PhoneBook> list= phoneBookService.getAll(filter);
		Type type=new TypeToken<List<PhoneBook>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	public String share(){
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_isShared_SN_EQ","1");
		List<PhoneBook> list= phoneBookService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");	
		JSONSerializer serializer=new JSONSerializer();		
		buff.append(serializer.exclude(new String[]{"class","phoneGroup","appUser.department"}).prettyPrint(list));
		buff.append("}");		
		jsonString=buff.toString();
		System.out.println(buff.toString());
		return SUCCESS;
	}
	
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				phoneBookService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		PhoneBook phoneBook=phoneBookService.get(phoneId);		
		JSONSerializer serializer=new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"birthday");
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(serializer.exclude(new String[]{"class","appUser","phoneGroup.apUser"}).prettyPrint(phoneBook));
		sb.append("}");
		setJsonString(sb.toString());
		System.out.println(sb.toString());
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		AppUser appUser=ContextUtil.getCurrentUser();
		phoneBook.setAppUser(appUser);
		phoneBookService.save(phoneBook);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	
	/**
	 * 获取联系人详细信息
	 */
	
	public String detail(){
		String strPhoneId=getRequest().getParameter("phoneId");		
		if(StringUtils.isNotEmpty(strPhoneId)){
			Long phoneId=new Long(strPhoneId);
			phoneBook=phoneBookService.get(phoneId);			
		}
		return "detail";
	}
}
