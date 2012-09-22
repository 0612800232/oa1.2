package com.htsoft.oa.service.customer;
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.customer.Customer;

public interface CustomerService extends BaseService<Customer>{

	public boolean checkCustomerNo(String customerNo);
	
}


