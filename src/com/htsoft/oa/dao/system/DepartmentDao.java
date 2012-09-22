package com.htsoft.oa.dao.system;

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.Department;

public interface DepartmentDao extends BaseDao<Department> {

	public List<Department> findByParentId(Long parentId);
	public List<Department> findByVo(Department department,PagingBean pb);
	public List<Department> findByDepName(String depName);
	public List<Department> findByPath(String path);
}
