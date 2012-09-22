package com.htsoft.oa.dao.system;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.FileAttach;

/**
 * 
 * @author 
 *
 */
public interface FileAttachDao extends BaseDao<FileAttach>{

	public void removeByPath(String filePath);
	
}