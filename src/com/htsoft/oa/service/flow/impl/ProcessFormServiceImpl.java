package com.htsoft.oa.service.flow.impl;

import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.ProcessFormDao;
import com.htsoft.oa.model.flow.ProcessForm;
import com.htsoft.oa.service.flow.ProcessFormService;

public class ProcessFormServiceImpl extends BaseServiceImpl<ProcessForm> implements ProcessFormService{
	private ProcessFormDao dao;
	
	public ProcessFormServiceImpl(ProcessFormDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	/**
	 * 取得某个流程实例的所有表单
	 * @param runId
	 * @return
	 */
	public List getByRunId(Long runId){
		return dao.getByRunId(runId);
	}

}