package com.htsoft.oa.dao.info;

import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.News;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;

public interface ShortMessageDao extends BaseDao<ShortMessage> {

//	public ShortMessage findByRead(AppUser user);
	public List<ShortMessage> findAll(Long userId,PagingBean pb);
	public List<ShortMessage> findByUser(Long userId);
	public List searchShortMessage(Long userId,ShortMessage shortMessage,Date from,Date to,PagingBean pb);
}
