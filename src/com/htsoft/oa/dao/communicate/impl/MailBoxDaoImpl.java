package com.htsoft.oa.dao.communicate.impl;

import java.util.List;

import org.hibernate.Query;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.communicate.MailBoxDao;
import com.htsoft.oa.model.communicate.MailBox;

public class MailBoxDaoImpl extends BaseDaoImpl<MailBox> implements MailBoxDao{

	public MailBoxDaoImpl() {
		super(MailBox.class);
	}

	@Override
	public Long CountByFolderId(Long folderId) {
		String hql = "select count(*) from MailBox where folderId =?";
		
		Query query = getSession().createQuery(hql);
		query.setLong(0, folderId);
		return (Long)query.uniqueResult();
	}
	
	public List<MailBox> findByFolderId(Long folderId){
		String hql = "from MailBox where folderId = ?";
		return findByHql(hql, new Object[]{folderId});
	}

}