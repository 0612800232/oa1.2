package com.htsoft.oa.service.communicate.impl;

import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.communicate.MailBoxDao;
import com.htsoft.oa.model.communicate.MailBox;
import com.htsoft.oa.service.communicate.MailBoxService;

public class MailBoxServiceImpl extends BaseServiceImpl<MailBox> implements MailBoxService{
	private MailBoxDao dao;
	
	public MailBoxServiceImpl(MailBoxDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Long CountByFolderId(Long folderId) {
		return dao.CountByFolderId(folderId);
	}

	public List<MailBox> findByFolderId(Long folderId){
		return dao.findByFolderId(folderId);
	}
}