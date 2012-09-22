package com.htsoft.oa.service.system;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.Region;

public interface RegionService extends BaseService<Region>{

	public List<Region> getProvince();

	public List<Region> getCity(Long regionId);
	
}


