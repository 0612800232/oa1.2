package com.htsoft.oa.dao.system.impl;

import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.system.DiaryDao;
import com.htsoft.oa.model.system.Diary;

public class DiaryDaoImpl extends BaseDaoImpl<Diary> implements DiaryDao{

	public DiaryDaoImpl() {
		super(Diary.class);
	}

//	@Override
//	public List<Diary> getAllBySn(PagingBean pb) {
//		final String hql = "from Diary dy order by dy.dayTime";
//		return findByHql(hql,null,pb);
//	}
}