package com.htsoft.oa.dao.info.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.NoticeDao;
import com.htsoft.oa.model.info.Notice;

public class NoticeDaoImpl extends BaseDaoImpl<Notice> implements NoticeDao {

	public NoticeDaoImpl() {
		super(Notice.class);
	}

	@Override
	public List<Notice> findBySearch(Notice notice, Date from, Date to,
			PagingBean pb) {
		// TODO Auto-generated method stub
		StringBuffer hql = new StringBuffer("from Notice notice where 1=1");
		List params = new ArrayList();
		if(!"".equals(notice.getPostName())&&notice.getPostName()!=null){
			hql.append("and notice.postName like ?");
			params.add("%"+notice.getPostName()+"%");
		}
		if(!"".equals(notice.getNoticeTitle())&&notice.getNoticeTitle()!=null){
			hql.append("and notice.noticeTitle like ?");
			params.add("%"+notice.getNoticeTitle()+"%");
		}
		if(from!=null){
			hql.append("and notice.effectivDate > ?");
			params.add(from);
		}
		if(to!=null){
			hql.append("and notice.expirationDate < ?");
			params.add(to);
		}
		return findByHql(hql.toString(), params.toArray(), pb);
	}

	@Override
	public List<Notice> findByNoticeId(Long noticeId, PagingBean pb) {
		// TODO Auto-generated method stub
		final String hql = "from Notice notice where notice.noticeId=?";
		Object[] params ={noticeId} ;
		return findByHql(hql, params, pb);
	}
}
