package com.htsoft.oa.dao.customer;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.customer.CusLinkman;

/**
 * 
 * @author 
 *
 */
public interface CusLinkmanDao extends BaseDao<CusLinkman>{

	public boolean checkMainCusLinkman(Long customerId, Long linkmanId);
	
}