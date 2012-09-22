package com.htsoft.oa.service.document.impl;

import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.document.DocPrivilegeDao;
import com.htsoft.oa.model.document.DocPrivilege;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.document.DocPrivilegeService;

public class DocPrivilegeServiceImpl extends BaseServiceImpl<DocPrivilege> implements DocPrivilegeService{
	private DocPrivilegeDao dao;
	
	public DocPrivilegeServiceImpl(DocPrivilegeDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<DocPrivilege> getAll(DocPrivilege docPrivilege,Long folderId, PagingBean pb) {
		
		return dao.getAll(docPrivilege,folderId, pb);
	}

	@Override
	public List<Integer> getRightsByFolder(AppUser user, Long folderId) {
		return dao.getRightsByFolder(user, folderId);
	}

	@Override
	public Integer getRightsByDocument(AppUser user, Long docId) {
		return dao.getRightsByDocument(user, docId);
	}

}