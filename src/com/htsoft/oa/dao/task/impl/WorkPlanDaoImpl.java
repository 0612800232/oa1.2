package com.htsoft.oa.dao.task.impl;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.task.WorkPlanDao;
import com.htsoft.oa.model.task.WorkPlan;

public class WorkPlanDaoImpl extends BaseDaoImpl<WorkPlan> implements WorkPlanDao{

	public WorkPlanDaoImpl() {
		super(WorkPlan.class);
	}

}