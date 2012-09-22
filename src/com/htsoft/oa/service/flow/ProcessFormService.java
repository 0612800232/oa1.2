package com.htsoft.oa.service.flow;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.ProcessForm;

public interface ProcessFormService extends BaseService<ProcessForm>{
	/**
	 * 取得某个流程实例的所有表单
	 * @param runId
	 * @return
	 */
	public List getByRunId(Long runId);
}


