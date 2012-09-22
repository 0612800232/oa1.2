package com.htsoft.oa.dao.admin;

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.admin.BookSn;

/**
 * 
 * @author 
 *
 */
public interface BookSnDao extends BaseDao<BookSn>{
	//通过bookId找到boonSn
	public List<BookSn> findByBookId(Long bookId);
}