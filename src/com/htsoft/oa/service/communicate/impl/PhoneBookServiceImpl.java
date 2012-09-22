package com.htsoft.oa.service.communicate.impl;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.communicate.PhoneBookDao;
import com.htsoft.oa.model.communicate.PhoneBook;
import com.htsoft.oa.service.communicate.PhoneBookService;

public class PhoneBookServiceImpl extends BaseServiceImpl<PhoneBook> implements PhoneBookService{
	private PhoneBookDao dao;
	
	public PhoneBookServiceImpl(PhoneBookDao dao) {
		super(dao);
		this.dao=dao;
	}

}