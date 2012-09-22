package com.htsoft.oa.service.flow;
import java.util.Map;

import com.htsoft.core.jbpm.pv.ParamField;
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.flow.ProcessRun;

public interface ProcessRunService extends BaseService<ProcessRun>{
	public void saveProcessRun(ProDefinition proDefinition,Map<String, ParamField>fieldMap,String activityName,boolean startFlow);
	public ProcessRun getByPiId(String piId);
	
	/**
	 * 完成任务，同时把数据保存至form_data表，记录该任务填写的表单数据
	 * @param piId
	 * @param transitionName
	 * @param variables
	 */
	public void saveAndNextstep(String piId,String activityName, String transitionName,Map<String, ParamField> fieldMap);
}


