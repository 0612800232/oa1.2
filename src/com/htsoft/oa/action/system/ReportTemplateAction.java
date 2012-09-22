package com.htsoft.oa.action.system;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.system.ReportTemplate;
import com.htsoft.oa.service.system.ReportTemplateService;
/**
 * 
 * @author csx
 *
 */
public class ReportTemplateAction extends BaseAction{
	@Resource
	private ReportTemplateService reportTemplateService;
	private ReportTemplate reportTemplate;
	
	private Long reportId;

	public Long getReportId() {
		return reportId;
	}

	public void setReportId(Long reportId) {
		this.reportId = reportId;
	}

	public ReportTemplate getReportTemplate() {
		return reportTemplate;
	}

	public void setReportTemplate(ReportTemplate reportTemplate) {
		this.reportTemplate = reportTemplate;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ReportTemplate> list= reportTemplateService.getAll(filter);
		
		Type type=new TypeToken<List<ReportTemplate>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
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
				reportTemplateService.remove(new Long(id));
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
		ReportTemplate reportTemplate=reportTemplateService.get(reportId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(reportTemplate));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		//通过后台直接设置报表上传时间和修改时间
		reportTemplate.setCreatetime(new Date());
		reportTemplate.setUpdatetime(new Date());
		reportTemplateService.save(reportTemplate);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
