package com.htsoft.oa.dao.system;

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.Region;

/**
 * 
 * @author 
 *
 */
public interface RegionDao extends BaseDao<Region>{

	public List<Region> getProvince();

	public List<Region> getCity(Long regionId);
	
}