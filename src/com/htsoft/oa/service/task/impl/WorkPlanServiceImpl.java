package com.htsoft.oa.service.task.impl;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.task.WorkPlanDao;
import com.htsoft.oa.model.task.WorkPlan;
import com.htsoft.oa.service.task.WorkPlanService;

public class WorkPlanServiceImpl extends BaseServiceImpl<WorkPlan> implements WorkPlanService{
	private WorkPlanDao dao;
	
	public WorkPlanServiceImpl(WorkPlanDao dao) {
		super(dao);
		this.dao=dao;
	}

}