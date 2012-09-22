package com.htsoft.oa.action.customer;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.customer.Project;
import com.htsoft.oa.service.customer.ProjectService;

import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class ProjectAction extends BaseAction{
	@Resource
	private ProjectService projectService;
	private Project project;
	
	private Long projectId;
	
	private String projectNo;

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public String getProjectNo() {
		return projectNo;
	}

	public void setProjectNo(String projectNo) {
		this.projectNo = projectNo;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<Project> list= projectService.getAll(filter);
		
		//Type type=new TypeToken<List<Project>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		//Gson gson=new Gson();
		JSONSerializer json = new JSONSerializer();
		buff.append(json.exclude(new String[]{"class","appUser.department"}).prettyPrint(list));
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
				projectService.remove(new Long(id));
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
		Project project=projectService.get(projectId);
		
		//Gson gson=new Gson();
		JSONSerializer json = new JSONSerializer();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(json.exclude(new String[]{"class","appUser.department"}).prettyPrint(project));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		projectService.save(project);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 系统按时间生成项目编号给用户
	 * @return
	 */
	public String number(){
		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss-SSS");
		String projectNo = date.format(new Date());
		setJsonString("{success:true,projectNo:'"+projectNo+"'}");
		return SUCCESS;
	}
	
	/**
	 * 验证项目编号是否可用
	 * @return
	 */
	public String check(){
		boolean pass = false;
		pass = projectService.checkProjectNo(projectNo);
		if(pass){
			setJsonString("{success:true,pass:true}");
		}else{
			setJsonString("{success:true,pass:false}");
		}
		return SUCCESS;
	}
}
