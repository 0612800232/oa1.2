/**
 * 
 */
package com.htsoft.oa.service.info.impl;

import java.util.Date;
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.NoticeDao;
import com.htsoft.oa.model.info.Notice;
import com.htsoft.oa.service.info.NoticeService;

/**
 * @author 谢宏溪
 *
 */
public class NoticeServiceImpl extends BaseServiceImpl<Notice> implements
		NoticeService {
	private NoticeDao noticeDao;
	
	public NoticeServiceImpl(NoticeDao noticeDao) {
		super(noticeDao);
		this.noticeDao = noticeDao;
	}

	@Override
	public List<Notice> findByNoticeId(Long noticeId, PagingBean pb) {
		// TODO Auto-generated method stub
		return noticeDao.findByNoticeId(noticeId, pb);
	}

	@Override
	public List<Notice> findBySearch(Notice notice, Date from, Date to,
			PagingBean pb) {
		// TODO Auto-generated method stub
		return noticeDao.findBySearch(notice, from, to, pb);
	}
	
}
