package com.htsoft.oa.service.communicate;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.communicate.PhoneGroup;

public interface PhoneGroupService extends BaseService<PhoneGroup>{
	public Integer findLastSn(Long userId);
	public PhoneGroup findBySn(Integer sn,Long userId);
	public List<PhoneGroup> findBySnUp(Integer sn,Long userId);
	public List<PhoneGroup> findBySnDown(Integer sn,Long userId);
	public List<PhoneGroup> getAll(Long userId);
}


