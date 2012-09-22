package com.htsoft.oa.dao.admin;

import java.math.BigDecimal;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.admin.InStock;

/**
 * 
 * @author 
 *
 */
public interface InStockDao extends BaseDao<InStock>{
	public Integer findInCountByBuyId(Long buyId);
}