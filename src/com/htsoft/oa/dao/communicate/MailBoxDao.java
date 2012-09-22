package com.htsoft.oa.dao.communicate;

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.communicate.MailBox;

/**
 * 
 * @author 
 *
 */
public interface MailBoxDao extends BaseDao<MailBox>{

	public Long CountByFolderId(Long folderId);
	
	public List<MailBox> findByFolderId(Long folderId);
}