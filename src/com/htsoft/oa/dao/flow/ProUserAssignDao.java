package com.htsoft.oa.dao.flow;

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.flow.ProUserAssign;

/**
 * 
 * @author 
 *
 */
public interface ProUserAssignDao extends BaseDao<ProUserAssign>{
	public List<ProUserAssign> getByDeployId(String deployId);
	
	/**
	 * 取得某流程某个任务的授权信息
	 * @param deployId
	 * @param activityName
	 * @return
	 */
	public ProUserAssign getByDeployIdActivityName(String deployId,String activityName);
}