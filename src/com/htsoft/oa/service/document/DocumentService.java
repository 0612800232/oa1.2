package com.htsoft.oa.service.document;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.document.Document;
import com.htsoft.oa.model.system.AppUser;

public interface DocumentService extends BaseService<Document>{
	public List<Document> findByIsShared(Document document, Date from, Date to,
			Long userId, ArrayList<Long> roleIds, Long depId, PagingBean pb);
	public List<Document> findByPublic(String path,Document document,Date from,Date to,AppUser appUser,PagingBean pb);
	public List<Document> findByPersonal(Long userId,Document document,Date from,Date to,String path,PagingBean pb);
}


