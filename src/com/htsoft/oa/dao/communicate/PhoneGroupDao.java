package com.htsoft.oa.dao.communicate;

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.communicate.PhoneGroup;

/**
 * 
 * @author 
 *
 */
public interface PhoneGroupDao extends BaseDao<PhoneGroup>{
	
	public Integer findLastSn(Long userId);
	public PhoneGroup findBySn(Integer sn,Long userId);
	public List<PhoneGroup> findBySnUp(Integer sn,Long userId);
	public List<PhoneGroup> findBySnDown(Integer sn,Long userId);
	public List<PhoneGroup> getAll(Long userId);
}