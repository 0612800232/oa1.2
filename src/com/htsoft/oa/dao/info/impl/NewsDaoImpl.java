package com.htsoft.oa.dao.info.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.NewsDao;
import com.htsoft.oa.model.info.News;

public class NewsDaoImpl extends BaseDaoImpl<News> implements NewsDao{
	
	public NewsDaoImpl() {
		super(News.class);
	}

	@Override
	public List<News> findByTypeId(final Long typeId,final PagingBean pb) {
		final String hql = "from News n where n.newsType.typeId=?";
		Object[] params ={typeId};
		return findByHql(hql, params, pb);
	}

	
}
