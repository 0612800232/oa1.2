package com.htsoft.oa.service.admin;
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.admin.InStock;

public interface InStockService extends BaseService<InStock>{
	public Integer findInCountByBuyId(Long buyId);
}


