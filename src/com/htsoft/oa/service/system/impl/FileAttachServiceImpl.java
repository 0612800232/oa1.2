package com.htsoft.oa.service.system.impl;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.FileAttachDao;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.system.FileAttachService;

public class FileAttachServiceImpl extends BaseServiceImpl<FileAttach> implements FileAttachService{
	private FileAttachDao dao;
	
	public FileAttachServiceImpl(FileAttachDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public void removeByPath(String filePath) {
		dao.removeByPath(filePath);
	}

}