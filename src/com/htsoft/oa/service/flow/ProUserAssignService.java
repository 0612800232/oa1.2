package com.htsoft.oa.service.flow;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.ProUserAssign;

public interface ProUserAssignService extends BaseService<ProUserAssign>{
	public List<ProUserAssign> getByDeployId(String deployId);
	
	/**
	 * 取得某流程某个任务的授权信息
	 * @param deployId
	 * @param activityName
	 * @return
	 */
	public ProUserAssign getByDeployIdActivityName(String deployId,String activityName);
}


