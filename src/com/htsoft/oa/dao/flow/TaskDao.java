package com.htsoft.oa.dao.flow;

import java.util.List;

import org.jbpm.pvm.internal.task.TaskImpl;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;

public interface TaskDao extends BaseDao<TaskImpl>{
	public List<TaskImpl> getTasksByUserId(String userId,PagingBean pb);
}
