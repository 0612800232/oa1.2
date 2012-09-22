package com.htsoft.oa.service.document.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.document.DocumentDao;
import com.htsoft.oa.model.document.Document;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.document.DocumentService;

public class DocumentServiceImpl extends BaseServiceImpl<Document> implements DocumentService{
	private DocumentDao dao;
	
	public DocumentServiceImpl(DocumentDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<Document> findByIsShared(Document document, Date from, Date to,
			Long userId, ArrayList<Long> roleIds, Long depId, PagingBean pb) {
		return dao.findByIsShared(document, from, to, userId, roleIds, depId, pb);
	}

	@Override
	public List<Document> findByPublic(String path,Document document,Date from,Date to,AppUser appUser, PagingBean pb) {
		return dao.findByPublic(path,document, from, to, appUser, pb);
	}

	@Override
	public List<Document> findByPersonal(Long userId, Document document,
			Date from, Date to, String path, PagingBean pb) {
		return dao.findByPersonal(userId, document, from, to, path, pb);
	}

	


}