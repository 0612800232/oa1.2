package com.htsoft.oa.model.system;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * Diary Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class Diary extends com.htsoft.core.model.BaseModel {

    protected Long diaryId;
	protected java.util.Date dayTime;
	protected String content;
	protected Short diaryType;
	protected Long userId;


	/**
	 * Default Empty Constructor for class Diary
	 */
	public Diary () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class Diary
	 */
	public Diary (
		 Long in_diaryId
        ) {
		this.setDiaryId(in_diaryId);
    }

    

	/**
	 * 	 * @return Long
     * @hibernate.id column="diaryId" type="java.lang.Long" generator-class="native"
	 */
	public Long getDiaryId() {
		return this.diaryId;
	}
	
	/**
	 * Set the diaryId
	 */	
	public void setDiaryId(Long aValue) {
		this.diaryId = aValue;
	}	

	/**
	 * 	 * @return java.util.Date
	 * @hibernate.property column="dayTime" type="java.util.Date" length="10" not-null="true" unique="false"
	 */
	public java.util.Date getDayTime() {
		return this.dayTime;
	}
	
	/**
	 * Set the dayTime
	 * @spring.validator type="required"
	 */	
	public void setDayTime(java.util.Date aValue) {
		this.dayTime = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="content" type="java.lang.String" length="65535" not-null="true" unique="false"
	 */
	public String getContent() {
		return this.content;
	}
	
	/**
	 * Set the content
	 * @spring.validator type="required"
	 */	
	public void setContent(String aValue) {
		this.content = aValue;
	}	

	/**
	 * 1=	 * @return Short
	 * @hibernate.property column="diaryType" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getDiaryType() {
		return this.diaryType;
	}
	
	/**
	 * Set the diaryType
	 * @spring.validator type="required"
	 */	
	public void setDiaryType(Short aValue) {
		this.diaryType = aValue;
	}	

	/**
	 * Ա	 * @return Long
	 * @hibernate.property column="userId" type="java.lang.Long" length="19" not-null="true" unique="false"
	 */
	public Long getUserId() {
		return this.userId;
	}
	
	/**
	 * Set the userId
	 * @spring.validator type="required"
	 */	
	public void setUserId(Long aValue) {
		this.userId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof Diary)) {
			return false;
		}
		Diary rhs = (Diary) object;
		return new EqualsBuilder()
				.append(this.diaryId, rhs.diaryId)
				.append(this.dayTime, rhs.dayTime)
				.append(this.content, rhs.content)
				.append(this.diaryType, rhs.diaryType)
				.append(this.userId, rhs.userId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.diaryId) 
				.append(this.dayTime) 
				.append(this.content) 
				.append(this.diaryType) 
				.append(this.userId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("diaryId", this.diaryId) 
				.append("dayTime", this.dayTime) 
				.append("content", this.content) 
				.append("diaryType", this.diaryType) 
				.append("userId", this.userId) 
				.toString();
	}

	/**
	 * Return the name of the first key column
	 */
	public String getFirstKeyColumnName() {
		return "diaryId";
	}
	
	/**
	 * Return the Id (pk) of the entity, must be Integer
	 */
	public Long getId() {
		return diaryId;
	}

}
