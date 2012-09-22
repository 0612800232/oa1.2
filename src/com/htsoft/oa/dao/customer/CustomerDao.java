package com.htsoft.oa.dao.customer;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.customer.Customer;

/**
 * 
 * @author 
 *
 */
public interface CustomerDao extends BaseDao<Customer>{

	public boolean checkCustomerNo(String customerNo);
	
}