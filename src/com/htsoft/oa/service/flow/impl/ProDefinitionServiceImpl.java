package com.htsoft.oa.service.flow.impl;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.ProDefinitionDao;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.service.flow.ProDefinitionService;

public class ProDefinitionServiceImpl extends BaseServiceImpl<ProDefinition> implements ProDefinitionService{
	private ProDefinitionDao dao;
	
	public ProDefinitionServiceImpl(ProDefinitionDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public ProDefinition getByDeployId(String deployId){
		return dao.getByDeployId(deployId);
	}

}