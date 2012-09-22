package com.htsoft.oa.dao.flow.impl;

import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.flow.ProcessFormDao;
import com.htsoft.oa.model.flow.ProcessForm;

public class ProcessFormDaoImpl extends BaseDaoImpl<ProcessForm> implements ProcessFormDao{

	public ProcessFormDaoImpl() {
		super(ProcessForm.class);
	}
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.flow.ProcessFormDao#getByRunId(java.lang.Long)
	 */
	public List getByRunId(Long runId){
		String hql="from ProcessForm pf where pf.processRun.runId=? order by pf.formId asc";
		return findByHql(hql, new Object[]{runId});
	}

}