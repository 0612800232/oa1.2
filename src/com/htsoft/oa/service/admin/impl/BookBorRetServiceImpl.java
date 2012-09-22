package com.htsoft.oa.service.admin.impl;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.BookBorRetDao;
import com.htsoft.oa.model.admin.BookBorRet;
import com.htsoft.oa.service.admin.BookBorRetService;

public class BookBorRetServiceImpl extends BaseServiceImpl<BookBorRet> implements BookBorRetService{
	private BookBorRetDao dao;
	
	public BookBorRetServiceImpl(BookBorRetDao dao) {
		super(dao);
		this.dao=dao;
	}

}