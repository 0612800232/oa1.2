package com.htsoft.oa.action.document;

import javax.annotation.Resource;

import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.system.FileAttachService;

public class FileDetailAction extends BaseAction{
	@Resource
	private FileAttachService fileAttachService;
	
	private FileAttach fileAttach;
	private Long fileId;

	public Long getFileId() {
		return fileId;
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}

	public FileAttach getFileAttach() {
		return fileAttach;
	}

	public void setFileAttach(FileAttach fileAttach) {
		this.fileAttach = fileAttach;
	}

	@Override
	public String execute() throws Exception {
		fileAttach=fileAttachService.get(fileId);
		return SUCCESS;
	}
}
