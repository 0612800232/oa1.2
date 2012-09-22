package com.htsoft.oa.dao.admin;

import java.util.Date;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.admin.DepreRecord;

/**
 * 
 * @author 
 *
 */
public interface DepreRecordDao extends BaseDao<DepreRecord>{
	/**
	 * 查找出最近折旧的时间
	 * @param assetsId
	 * @return
	 */
	
	public Date findMaxDate(Long assetsId);
}