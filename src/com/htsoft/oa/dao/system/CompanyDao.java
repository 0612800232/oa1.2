
package com.htsoft.oa.dao.system;

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;

import com.htsoft.oa.model.info.News;
import com.htsoft.oa.model.system.Company;

/**
 * @author Student LHH
 *
 */
public interface CompanyDao extends BaseDao<Company> {
	
	public List<Company> findByHql(final String hql);
	public List<Company> findCompany();
	
}
