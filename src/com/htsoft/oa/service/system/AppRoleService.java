package com.htsoft.oa.service.system;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.AppRole;

public interface AppRoleService extends BaseService<AppRole>{
	public AppRole getByRoleName(String roleName);
}
