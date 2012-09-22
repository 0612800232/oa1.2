package com.htsoft.oa.service.customer;
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.customer.Project;

public interface ProjectService extends BaseService<Project>{

	public boolean checkProjectNo(String projectNo);
	
}


