package com.htsoft.oa.service.info;

import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.NewsType;

public interface NewsTypeService extends BaseService<NewsType>{
	public Short getTop();
	public NewsType findBySn(Short sn);
	public List<NewsType> getAllBySn();
	public List<NewsType> getAllBySn(PagingBean pb);
	public List<NewsType> findBySearch(NewsType newsType,PagingBean pb);
}
