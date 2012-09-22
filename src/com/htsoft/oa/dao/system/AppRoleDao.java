package com.htsoft.oa.dao.system;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.AppRole;

/**
 * 用户
 * @author 
 *
 */
public interface AppRoleDao extends BaseDao<AppRole>{
	public AppRole getByRoleName(String roleName);
}
