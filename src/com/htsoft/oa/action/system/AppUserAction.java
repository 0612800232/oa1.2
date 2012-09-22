package com.htsoft.oa.action.system;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.model.OnlineUser;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.service.system.AppRoleService;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.DepartmentService;
/**
 * 
 * @author csx
 *
 */
public class AppUserAction extends BaseAction{
	@Resource
	private AppUserService appUserService;
	@Resource
	private DepartmentService departmentService;
	@Resource
	private AppRoleService appRoleService;
	
	private AppUser appUser;
	
	private Long userId;
	
	private Long depId;
	
	private Long roleId;

	
	public Long getDepId() {
		return depId;
	}

	public void setDepId(Long depId) {
		this.depId = depId;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}

	public String list(){		
		QueryFilter filter=new QueryFilter(getRequest());
//		String strDepId=getRequest().getParameter("depId");
//		if(StringUtils.isNotEmpty(strDepId)){
//			filter.addFilter("Q_department.depId_L_EQ",strDepId);
//		}else{
//		    filter.addFilter("Q_department.depId_L_EQ",ContextUtil.getCurrentUser().getDepartment().getDepId().toString());
//		}
		List<AppUser> list= appUserService.getAll(filter);		
		Type type=new TypeToken<List<AppUser>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");	
		System.out.println(buff.toString());
		jsonString=buff.toString();				
		return SUCCESS;
	}
	
	
	/**
	 * 根据部门查找列表
	 */
    public String select(){ 
    	PagingBean pb=getInitPagingBean();
		String strDepId=getRequest().getParameter("depId");
		String path="0.";
		appUser=ContextUtil.getCurrentUser();	
		if(StringUtils.isNotEmpty(strDepId)){
			Long depId=Long.parseLong(strDepId);
			Department dep=departmentService.get(depId);
            if(dep!=null){	
            	path=dep.getPath();
            }			
		}else{
			Department dep=appUser.getDepartment();
			if(dep!=null){
				path=dep.getPath();
			}
		}
		List<AppUser> list=new ArrayList<AppUser>();
		if("0.".equals(path)){
		    list=appUserService.getAll(pb);					 				
		}else{
			list=appUserService.findByDepartment(path, pb);
		}
		Type type=new TypeToken<List<AppUser>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pb.getTotalItems()).append(",result:");		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();		
		return SUCCESS;
	}
    /**
     * 在线用户
     * @return
     */
    public String online(){
    	Map<String, OnlineUser>onlineUsers= new HashMap<String, OnlineUser>();
    	Map<String, OnlineUser>onlineUsersByDep= new HashMap<String, OnlineUser>();
    	Map<String, OnlineUser>onlineUsersByRole= new HashMap<String, OnlineUser>();
    	
    	onlineUsers = AppUtil.getOnlineUsers();//获得所有在线用户
    	
    	//按部门选择在线用户
    	if(depId!=null){
    		for(String sessionId:onlineUsers.keySet()){
    			OnlineUser onlineUser = new OnlineUser(); 
    			onlineUser = onlineUsers.get(sessionId);
    			//if(onlineUser.getDepId().equals(depId)){
    			if(java.util.regex.Pattern.compile("."+depId+".").matcher(onlineUser.getDepPath()).find()){
    				onlineUsersByDep.put(sessionId, onlineUser);
    			}
    		}
    	}
    	
    	//按角色选择在线用户
    	if(roleId!=null){
    		for(String sessionId:onlineUsers.keySet()){
    			OnlineUser onlineUser = new OnlineUser();
    			onlineUser = onlineUsers.get(sessionId);
    			if(java.util.regex.Pattern.compile(","+roleId+",").matcher(onlineUser.getRoleIds()).find()){
    				onlineUsersByRole.put(sessionId,onlineUser);
    			}
    		}
    	}
    	
    	Type type=new TypeToken<java.util.Collection<OnlineUser>>(){}.getType();
    	StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(onlineUsers.size()).append(",result:");
    	
    	Gson gson=new Gson();
    	if(depId !=null){
    		buff.append(gson.toJson(onlineUsersByDep.values(),type));
    	}else if(roleId !=null){
    		buff.append(gson.toJson(onlineUsersByRole.values(),type));
    	}else{
    		buff.append(gson.toJson(onlineUsers.values(), type));
    	}
		buff.append("}");
		jsonString=buff.toString();	
		return SUCCESS;
    }
    
	/**
	 * 
	 * 根据角色查询
	 */
    public String find(){
    	String strRoleId=getRequest().getParameter("roleId");   	
    	PagingBean pb=getInitPagingBean();
    	if(StringUtils.isNotEmpty(strRoleId)){
    		List<AppUser> userList=appUserService.findByRole(Long.parseLong(strRoleId), pb);   	       	    	
	    	Type type=new TypeToken<List<AppUser>>(){}.getType();
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
			.append(pb.getTotalItems()).append(",result:");		
			Gson gson=new Gson();
			buff.append(gson.toJson(userList, type));
			buff.append("}");
			System.out.println(buff.toString());
			jsonString=buff.toString();	
    	}else{
    		jsonString="{success:false}";
    	}
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
				appUserService.remove(new Long(id));
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
		AppUser appUser=appUserService.get(userId);
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:[");
		sb.append(JsonUtil.getJSONSerializer(new String[]{"accessionTime"}).prettyPrint(appUser));
		sb.append("]}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String rolesIds = getRequest().getParameter("AppUserRoles");
		String[] ids = rolesIds.split(",");
		Set<AppRole> roles = new HashSet<AppRole>();
		for(String id:ids){
			if(!"".equals(id)){
				AppRole role = appRoleService.get(new Long(id));
				roles.add(role);
			}
		}
		appUser.setRoles(roles);
		if(appUser.getUserId()!=null){
			AppUser old = appUserService.get(appUser.getUserId());
			appUser.setPassword(old.getPassword());
		}
		appUserService.merge(appUser);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 查询已有角色
	 */
	public String selectedRoles(){
		if(userId!=null){
			setAppUser(appUserService.get(userId));
			Set<AppRole> roles = appUser.getRoles();
			StringBuffer sb = new StringBuffer("[");
			for(AppRole role:roles){
				sb.append("['"+role.getRoleId()+"','"+role.getRoleName()+"'],");
			}
			sb.deleteCharAt(sb.length()-1);
			sb.append("]");
			setJsonString(sb.toString());
		}
		return SUCCESS;
	}
	/**
	 * 查询可选角色
	 * @return
	 */
	public String chooseRoles(){
		List<AppRole> chooseRoles = appRoleService.getAll();;
		if(userId!=null){
			setAppUser(appUserService.get(userId));
			Set<AppRole> selectedRoles = appUser.getRoles();
			for(AppRole role :selectedRoles){
				chooseRoles.remove(role);
			}
		}
		StringBuffer sb = new StringBuffer("[");
		for(AppRole role:chooseRoles){
			if(role.getStatus()!=0){
				sb.append("['"+role.getRoleId()+"','"+role.getRoleName()+"'],");
			}
		}
		sb.deleteCharAt(sb.length()-1);
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/**
	 * 修改密码
	 * @return
	 */
	public String resetPassword(){
		String userId = getRequest().getParameter("appUserUserId");
		String oldPassword = getRequest().getParameter("oldPassword");
		String newPassword = getRequest().getParameter("newPassword");
		String againPassword = getRequest().getParameter("againPassword");
		setAppUser(appUserService.get(new Long(userId)));
		StringBuffer msg = new StringBuffer("{msg:'");
		boolean pass = false;
		if(oldPassword.equals(appUser.getPassword())){
			if(newPassword.equals(againPassword)){
				pass = true;
			}
			else msg.append("两次输入不一致.'");
		}
		else msg.append("旧密码输入不正确.'");
		if(pass){
			appUser.setPassword(newPassword);
			appUserService.save(appUser);
			setJsonString("{success:true}");
		}else{
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}
		return SUCCESS;
	}
	
	/**
	 * 删除用户照片
	 * @return
	 */
	public String photo(){
		setAppUser(appUserService.get(getUserId()));
		appUser.setPhoto("");
		appUserService.save(appUser);
		return SUCCESS;
	}
}
