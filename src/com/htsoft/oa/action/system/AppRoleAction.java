package com.htsoft.oa.action.system;

import java.util.List;
import javax.annotation.Resource;
import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.service.system.AppRoleService;
/**
 * 
 * @author csx
 *
 */
public class AppRoleAction extends BaseAction{
	@Resource
	private AppRoleService appRoleService;
	private AppRole appRole;
	
	private Long roleId;

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public AppRole getAppRole() {
		return appRole;
	}

	public void setAppRole(AppRole appRole) {
		this.appRole = appRole;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<AppRole> list= appRoleService.getAll(filter);
		
		Type type=new TypeToken<List<AppRole>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
			.append(filter.getPagingBean().getTotalItems()).append(",result:");
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 列出角色树
	 * 
	 */
	public String tree(){
		List<AppRole> listRole;
		StringBuffer buff = new StringBuffer("[");
		listRole=appRoleService.getAll();//最顶层父节点
		for(AppRole role:listRole){
			buff.append("{id:'"+role.getRoleId()+"',text:'"+role.getRoleName()+"',leaf:true},");
		}
		if (!listRole.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
	    }
		buff.append("]");
		setJsonString(buff.toString());
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
				appRoleService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 角色授权
	 * @return
	 */
	public String grant(){
		AppRole appRole=appRoleService.get(roleId);
		String rights=getRequest().getParameter("rights");
		
		appRole.setRights(rights);
		appRoleService.save(appRole);
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		AppRole appRole=appRoleService.get(roleId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(JsonUtil.getJSONSerializer().serialize(appRole));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		appRoleService.save(appRole);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
