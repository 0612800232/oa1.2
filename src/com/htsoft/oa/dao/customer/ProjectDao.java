package com.htsoft.oa.dao.customer;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.customer.Project;

/**
 * 
 * @author 
 *
 */
public interface ProjectDao extends BaseDao<Project>{

	public boolean checkProjectNo(String projectNo);
	
}