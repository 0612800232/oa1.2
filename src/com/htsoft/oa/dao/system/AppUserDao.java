package com.htsoft.oa.dao.system;

import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Department;

public interface AppUserDao extends BaseDao<AppUser>{
	public AppUser findByUserName(String username);
	public List findByDepartment(String path,PagingBean pb);
	public List findByDepartment(String path);
	public List findByDepartment(Department department);
	public List findByRole(Long roleId);
	public List findByRole(Long roleId,PagingBean pb);
	
	public List findByRoleId(Long roleId);
}
