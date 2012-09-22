package com.htsoft.oa.dao.task;

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.task.Appointment;

/**
 * 
 * @author 
 *
 */
public interface AppointmentDao extends BaseDao<Appointment>{
	//首页中根据当前登录用户显示约会列表
	public List showAppointmentByUserId(Long userId,PagingBean pb);
}