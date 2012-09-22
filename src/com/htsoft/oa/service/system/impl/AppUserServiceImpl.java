package com.htsoft.oa.service.system.impl;
import java.util.Date;
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.system.AppUserDao;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.service.system.AppUserService;

public class AppUserServiceImpl extends BaseServiceImpl<AppUser> implements AppUserService{
	private AppUserDao dao;
	
	public AppUserServiceImpl(AppUserDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public AppUser findByUserName(String username) {
		return dao.findByUserName(username);
	}

	@Override
	public List findByDepartment(String path, PagingBean pb) {
		return dao.findByDepartment(path,pb);
	}

	@Override
	public List findByRole(Long roleId, PagingBean pb) {
		return dao.findByRole(roleId, pb);
	}

	public List findByRoleId(Long roleId){
		return dao.findByRole(roleId);
	}
}
