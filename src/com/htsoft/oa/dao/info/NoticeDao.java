package com.htsoft.oa.dao.info;

import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.Notice;

public interface NoticeDao extends BaseDao<Notice> {
	public List<Notice> findByNoticeId(Long noticeId,PagingBean pb);
	public List<Notice> findBySearch(Notice notice,Date from,Date to,PagingBean pb);
}
