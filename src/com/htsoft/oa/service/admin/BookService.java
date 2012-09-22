package com.htsoft.oa.service.admin;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.admin.Book;

public interface BookService extends BaseService<Book>{
	public List<Book> findByTypeId(Long typeId,PagingBean pb);
}


