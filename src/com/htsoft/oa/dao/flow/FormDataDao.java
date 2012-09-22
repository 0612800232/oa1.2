package com.htsoft.oa.dao.flow;

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.flow.FormData;

/**
 * 
 * @author 
 *
 */
public interface FormDataDao extends BaseDao<FormData>{
	/**
	 * 取得某个流程某个活动下的表单数据
	 * @param runId
	 * @param activityName
	 * @return
	 */
	public List<FormData> getByRunIdActivityName(Long runId,String activityName);
}