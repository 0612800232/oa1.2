package com.htsoft.oa.dao.info;

import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.News;

public interface NewsDao extends BaseDao<News>{
	public List<News> findByTypeId(Long typeId,PagingBean pb);
}
