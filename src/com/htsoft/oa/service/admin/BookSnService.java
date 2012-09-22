package com.htsoft.oa.service.admin;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.admin.BookSn;

public interface BookSnService extends BaseService<BookSn>{
	public List<BookSn> findByBookId(Long bookId);
}


