package com.htsoft.oa.dao.flow;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.flow.ProDefinition;

/**
 * 
 * @author 
 *
 */
public interface ProDefinitionDao extends BaseDao<ProDefinition>{
	/**
	 * 按发布ID取得XML
	 * @param deployId
	 * @return
	 */
	public ProDefinition getByDeployId(String deployId);
	
}