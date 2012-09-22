package com.htsoft.oa.action.flow;

import java.util.List;

import javax.annotation.Resource;
import org.jbpm.api.task.Task;
import org.jbpm.pvm.internal.task.TaskImpl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.jbpm.pv.TaskInfo;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.service.flow.TaskService;

import flexjson.JSONSerializer;

/**
 * 流程中的任务的显示及操作
 * @author csx
 *
 */
public class TaskAction extends BaseAction{
	@Resource(name="flowTaskService")
	private TaskService flowTaskService;
	
	public String list(){
		
		PagingBean pb=new PagingBean(this.start, limit);
		List<TaskInfo> tasks=flowTaskService.getTaskInfosByUserId(ContextUtil.getCurrentUserId().toString(),pb);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pb.getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		
		buff.append(gson.toJson(tasks));
		
		buff.append("}");
		
		setJsonString(buff.toString());
		return SUCCESS;
	}
}
