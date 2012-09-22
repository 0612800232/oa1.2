package com.htsoft.oa.dao.communicate.impl;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.communicate.PhoneBookDao;
import com.htsoft.oa.model.communicate.PhoneBook;

public class PhoneBookDaoImpl extends BaseDaoImpl<PhoneBook> implements PhoneBookDao{

	public PhoneBookDaoImpl() {
		super(PhoneBook.class);
	}

}