package com.htsoft.oa.service.flow;
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.FormData;

public interface FormDataService extends BaseService<FormData>{
	/**
	 * 取得某个运行任务中的表单数据，返回一个Map,其值为name:value
	 * @param runId
	 * @param activityName
	 * @return
	 */
	Map getFromDataMap(Long runId,String activityName); 
}


