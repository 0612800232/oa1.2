package com.htsoft.oa.service.flow;
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.ProDefinition;

public interface ProDefinitionService extends BaseService<ProDefinition>{
	public ProDefinition getByDeployId(String deployId);
}


