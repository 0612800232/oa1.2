package com.htsoft.oa.service.customer;
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.customer.CusLinkman;

public interface CusLinkmanService extends BaseService<CusLinkman>{

	public boolean checkMainCusLinkman(Long customerId, Long linkmanId);
	
}


