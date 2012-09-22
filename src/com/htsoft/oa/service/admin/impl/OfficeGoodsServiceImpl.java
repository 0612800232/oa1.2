package com.htsoft.oa.service.admin.impl;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.OfficeGoodsDao;
import com.htsoft.oa.model.admin.OfficeGoods;
import com.htsoft.oa.service.admin.OfficeGoodsService;

public class OfficeGoodsServiceImpl extends BaseServiceImpl<OfficeGoods> implements OfficeGoodsService{
	private OfficeGoodsDao dao;
	
	public OfficeGoodsServiceImpl(OfficeGoodsDao dao) {
		super(dao);
		this.dao=dao;
	}

}