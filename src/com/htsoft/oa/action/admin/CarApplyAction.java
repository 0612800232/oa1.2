package com.htsoft.oa.action.admin;
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.admin.CarApply;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.admin.CarApplyService;
import com.htsoft.oa.service.system.AppUserService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class CarApplyAction extends BaseAction{
	@Resource
	private CarApplyService carApplyService;
	private CarApply carApply;
	
	@Resource
	private AppUserService appUserService;
	
	private Long applyId;

	public Long getApplyId() {
		return applyId;
	}

	public void setApplyId(Long applyId) {
		this.applyId = applyId;
	}

	public CarApply getCarApply() {
		return carApply;
	}

	public void setCarApply(CarApply carApply) {
		this.carApply = carApply;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CarApply> list= carApplyService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		JSONSerializer serializer=new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"applyDate");
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"startTime");
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"endTime");
		buff.append(serializer.exclude(new String[]{"class"}).prettyPrint(list));
		buff.append("}");
		
		jsonString=buff.toString();
		
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
				carApplyService.remove(new Long(id));
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
		CarApply carApply=carApplyService.get(applyId);
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer serializer=new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"applyDate");
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"startTime");
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"endTime");
		sb.append(serializer.exclude(new String[]{"class"}).prettyPrint(carApply));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String strUserId=getRequest().getParameter("userId");
		if(StringUtils.isNotEmpty(strUserId)){
			if(carApply.getApplyId()==null){
				AppUser appUser=appUserService.get(new Long(strUserId));
				carApply.setDepartment(appUser.getDepartment().getDepName());
				carApply.setApprovalStatus((short)0);
			}	
		}
		carApplyService.save(carApply);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
