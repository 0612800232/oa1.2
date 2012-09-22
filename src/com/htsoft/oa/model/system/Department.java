package com.htsoft.oa.model.system;

import java.util.HashSet;
import java.util.Set;

import com.htsoft.core.model.BaseModel;

public class Department extends BaseModel {
	
	private Long depId;
	private String depName;
	private String depDesc;
	private Integer depLevel;
	private Long parentId;
	private String path;
	public Department() {

	}


	public Long getDepId() {
		return depId;
	}

	public void setDepId(Long depId) {
		this.depId = depId;
	}

	public String getDepName() {
		return depName;
	}

	public void setDepName(String depName) {
		this.depName = depName;
	}

	public String getDepDesc() {
		return depDesc;
	}

	public void setDepDesc(String depDesc) {
		this.depDesc = depDesc;
	}

	public Integer getDepLevel() {
		return depLevel;
	}

	public void setDepLevel(Integer depLevel) {
		this.depLevel = depLevel;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	
	

	
}
