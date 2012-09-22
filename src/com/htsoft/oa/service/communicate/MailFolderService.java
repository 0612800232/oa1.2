package com.htsoft.oa.service.communicate;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.communicate.MailFolder;
import com.htsoft.oa.model.document.DocFolder;

public interface MailFolderService extends BaseService<MailFolder>{

	public List<MailFolder> getUserFolderByParentId(Long curUserId, Long parentId);

	public List<MailFolder> getAllUserFolderByParentId(Long userId, Long parentId);
	
	public List<MailFolder> getFolderLikePath(String path);
}


