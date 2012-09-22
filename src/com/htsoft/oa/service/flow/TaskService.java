package com.htsoft.oa.service.flow;

import java.util.List;

import org.jbpm.pvm.internal.task.TaskImpl;

import com.htsoft.core.jbpm.pv.TaskInfo;
import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;

public interface TaskService extends BaseService<TaskImpl>{
	/**
	 * 取得用户的对应的任务列表
	 * @param userId
	 * @return
	 */
	public List<TaskImpl> getTasksByUserId(String userId,PagingBean pb);
	
	/**
	 * 
	 * @param userId
	 * @param pb
	 * @return
	 */
	public List<TaskInfo> getTaskInfosByUserId(String userId,PagingBean pb);
}
