package com.htsoft.oa.dao.admin;

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.admin.Book;

/**
 * 
 * @author 
 *
 */
public interface BookDao extends BaseDao<Book>{
	public List<Book> findByTypeId(Long typeId,PagingBean pb);
}