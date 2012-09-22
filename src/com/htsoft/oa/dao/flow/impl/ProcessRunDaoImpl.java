package com.htsoft.oa.dao.flow.impl;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.flow.ProcessRunDao;
import com.htsoft.oa.model.flow.ProcessRun;

public class ProcessRunDaoImpl extends BaseDaoImpl<ProcessRun> implements ProcessRunDao{

	public ProcessRunDaoImpl() {
		super(ProcessRun.class);
	}
	/**
	 * get ProcessRun by PiId
	 * @param piId
	 * @return
	 */
	public ProcessRun getByPiId(String piId){
		String hql="from ProcessRun pr where pr.piId=?";
		return (ProcessRun)findUnique(hql, new Object[]{piId});
	}

}