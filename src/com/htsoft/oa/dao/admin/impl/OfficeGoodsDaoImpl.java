package com.htsoft.oa.dao.admin.impl;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.admin.OfficeGoodsDao;
import com.htsoft.oa.model.admin.OfficeGoods;

public class OfficeGoodsDaoImpl extends BaseDaoImpl<OfficeGoods> implements OfficeGoodsDao{

	public OfficeGoodsDaoImpl() {
		super(OfficeGoods.class);
	}

}