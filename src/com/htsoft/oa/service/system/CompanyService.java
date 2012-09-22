package com.htsoft.oa.service.system;

import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.Company;

public interface CompanyService extends BaseService<Company> {

	public List<Company> findByHql(final String hql);
	public List<Company> findCompany();
}
