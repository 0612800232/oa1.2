package com.htsoft.oa.model.communicate;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * PhoneGroup Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class PhoneGroup extends com.htsoft.core.model.BaseModel {

    protected Long groupId;
	protected String groupName;
	protected Short isShared;
	protected Integer sn;
	protected com.htsoft.oa.model.system.AppUser appUser;


	/**
	 * Default Empty Constructor for class PhoneGroup
	 */
	public PhoneGroup () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class PhoneGroup
	 */
	public PhoneGroup (
		 Long in_groupId
        ) {
		this.setGroupId(in_groupId);
    }

	
	public com.htsoft.oa.model.system.AppUser getAppUser () {
		return appUser;
	}	
	
	public void setAppUser (com.htsoft.oa.model.system.AppUser in_appUser) {
		this.appUser = in_appUser;
	}

    

	/**
	 * 	 * @return Long
     * @hibernate.id column="groupId" type="java.lang.Long" generator-class="native"
	 */
	public Long getGroupId() {
		return this.groupId;
	}
	
	/**
	 * Set the groupId
	 */	
	public void setGroupId(Long aValue) {
		this.groupId = aValue;
	}	

	/**
	 * 分组名称	 * @return String
	 * @hibernate.property column="groupName" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getGroupName() {
		return this.groupName;
	}
	
	/**
	 * Set the groupName
	 * @spring.validator type="required"
	 */	
	public void setGroupName(String aValue) {
		this.groupName = aValue;
	}	

	/**
	 * 1=共享
            0=私有	 * @return Short
	 * @hibernate.property column="isShared" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getIsShared() {
		return this.isShared;
	}
	
	/**
	 * Set the isShared
	 * @spring.validator type="required"
	 */	
	public void setIsShared(Short aValue) {
		this.isShared = aValue;
	}	

	/**
	 * 	 * @return Integer
	 * @hibernate.property column="SN" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getSn() {
		return this.sn;
	}
	
	/**
	 * Set the sN
	 * @spring.validator type="required"
	 */	
	public void setSn(Integer aValue) {
		this.sn = aValue;
	}	

	/**
	 * 	 * @return Long
	 */
	public Long getUserId() {
		return this.getAppUser()==null?null:this.getAppUser().getUserId();
	}
	
	/**
	 * Set the userId
	 */	
	public void setUserId(Long aValue) {
	    if (aValue==null) {
	    	appUser = null;
	    } else if (appUser == null) {
	        appUser = new com.htsoft.oa.model.system.AppUser(aValue);
	        appUser.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
			appUser.setUserId(aValue);
	    }
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof PhoneGroup)) {
			return false;
		}
		PhoneGroup rhs = (PhoneGroup) object;
		return new EqualsBuilder()
				.append(this.groupId, rhs.groupId)
				.append(this.groupName, rhs.groupName)
				.append(this.isShared, rhs.isShared)
				.append(this.sn, rhs.sn)
						.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.groupId) 
				.append(this.groupName) 
				.append(this.isShared) 
				.append(this.sn) 
						.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("groupId", this.groupId) 
				.append("groupName", this.groupName) 
				.append("isShared", this.isShared) 
				.append("sn", this.sn) 
						.toString();
	}

	/**
	 * Return the name of the first key column
	 */
	public String getFirstKeyColumnName() {
		return "groupId";
	}
	
	/**
	 * Return the Id (pk) of the entity, must be Integer
	 */
	public Long getId() {
		return groupId;
	}

}
