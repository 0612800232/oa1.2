package com.htsoft.oa.dao.system.impl;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.AppRoleDao;
import com.htsoft.oa.model.system.AppRole;

public class AppRoleDaoImpl extends BaseDaoImpl<AppRole> implements AppRoleDao{

	public AppRoleDaoImpl() {
		super(AppRole.class);
	}
	
	public AppRole getByRoleName(String roleName){
		String hql="from AppRole ar where ar.roleName=?";
		return (AppRole)findUnique(hql, new Object[]{roleName});
	}

}
