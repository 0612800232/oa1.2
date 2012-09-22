package com.htsoft.oa.service.info.impl;

import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.GenericDao;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.ShortMessageDao;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.service.info.ShortMessageService;

public class ShortMessageServiceImpl extends BaseServiceImpl<ShortMessage> implements
		ShortMessageService {
	private ShortMessageDao messageDao;
	
	public ShortMessageServiceImpl(ShortMessageDao dao) {
		super(dao);
		this.messageDao=dao;
	}

	@Override
	public List<ShortMessage> findAll(Long userId, PagingBean pb) {
		return messageDao.findAll(userId, pb);
	}

	@Override
	public List<ShortMessage> findByUser(Long userId) {
		return messageDao.findByUser(userId);
	}

	@Override
	public List searchShortMessage(Long userId,
			ShortMessage shortMessage, Date from, Date to, PagingBean pb) {
		return messageDao.searchShortMessage(userId, shortMessage, from, to, pb);
	}



}
