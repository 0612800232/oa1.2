package com.htsoft.oa.service.communicate;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.communicate.MailBox;

public interface MailBoxService extends BaseService<MailBox>{

	public Long CountByFolderId(Long folderId);
	
	public List<MailBox> findByFolderId(Long folderId);
}


