package com.htsoft.oa.dao.info;

import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.InMessage;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;

public interface InMessageDao extends BaseDao<InMessage> {

	public InMessage findByRead(Long userId);
	public Integer findByReadFlag(Long userId);
	public List<InMessage> findAll(Long userId,PagingBean pb);
	public List<InMessage> findByShortMessage(ShortMessage shortMessage,PagingBean pb);
	public List findByUser(Long userId,PagingBean pb);
	public List findByUser(Long userId);
    /**
     * 查询发送出去的信息
     * @param userId
     * @param inMessage
     * @param shortMessage
     * @param from
     * @param to
     * @param pb
     * @return
     */
	public List searchInMessage(Long userId,InMessage inMessage,ShortMessage shortMessage,Date from,Date to,PagingBean pb);

}
