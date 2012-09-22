package com.htsoft.oa.dao.flow.impl;

import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.flow.FormDataDao;
import com.htsoft.oa.model.flow.FormData;

public class FormDataDaoImpl extends BaseDaoImpl<FormData> implements FormDataDao{

	public FormDataDaoImpl() {
		super(FormData.class);
	}
	
	/**
	 * 取得某个流程某个活动下的表单数据
	 * @param runId
	 * @param activityName
	 * @return
	 */
	public List<FormData> getByRunIdActivityName(Long runId,String activityName){
		String hql="from FormData fd where fd.processForm.processRun.runId=? and fd.processForm.activityName=?";
		return findByHql(hql,new Object[]{runId,activityName});
	}

}