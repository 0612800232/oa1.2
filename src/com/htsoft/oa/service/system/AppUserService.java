package com.htsoft.oa.service.system;

import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.AppUser;


public interface AppUserService extends BaseService<AppUser>{
	
	public AppUser findByUserName(String username);
	public List findByDepartment(String path,PagingBean pb);
	public List findByRole(Long roleId,PagingBean pb);
	public List findByRoleId(Long roleId);
	
}
