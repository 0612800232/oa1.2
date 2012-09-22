package com.htsoft.oa.service.info;

import java.util.Date;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.News;

public interface NewsService extends BaseService<News>{
	public List<News> findByTypeId(Long typeId,PagingBean pb);
}
