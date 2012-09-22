package com.htsoft.oa.model.info;


import java.util.Set;

import com.htsoft.core.model.BaseModel;

public class NewsType extends BaseModel {
	private Long typeId;
	private String typeName;
	private Short sn;
//	private Set<News> news;
	public NewsType() {
		// TODO Auto-generated constructor stub
	}
	public Long getTypeId() {
		return typeId;
	}
	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public Short getSn() {
		return sn;
	}
	public void setSn(Short sn) {
		this.sn = sn;
	}
//	public Set<News> getNews() {
//		return news;
//	}
//	public void setNews(Set<News> news) {
//		this.news = news;
//	}
	
	
}
