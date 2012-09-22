package com.htsoft.oa.dao.flow;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.flow.ProcessRun;

/**
 * 
 * @author 
 *
 */
public interface ProcessRunDao extends BaseDao<ProcessRun>{
	public ProcessRun getByPiId(String piId);
}