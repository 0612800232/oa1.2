package com.htsoft.oa.service.system;
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.FileAttach;

public interface FileAttachService extends BaseService<FileAttach>{

	public void removeByPath(String filePath);
	
}


