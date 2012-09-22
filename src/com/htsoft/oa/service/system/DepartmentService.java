package com.htsoft.oa.service.system;

import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.Department;

public interface DepartmentService extends BaseService<Department> {

	public List<Department> findByParentId(Long parentId);
	public List<Department> findByDepName(String depName);
	public List<Department> findByPath(String path);
}
