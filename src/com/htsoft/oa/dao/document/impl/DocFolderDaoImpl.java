package com.htsoft.oa.dao.document.impl;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.document.DocFolderDao;
import com.htsoft.oa.model.document.DocFolder;
import com.htsoft.oa.model.document.DocPrivilege;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;

public class DocFolderDaoImpl extends BaseDaoImpl<DocFolder> implements DocFolderDao{

	public DocFolderDaoImpl() {
		super(DocFolder.class);
	}
	
	/**
	 * 取得某用户对应的所有文档
	 * @param userId
	 * @param parentId
	 * @return
	 */
	public List<DocFolder> getUserFolderByParentId(Long userId,Long parentId){
		
		String hql="from DocFolder df where df.isShared=0 and df.appUser.userId=? and parentId=?";
		
		return findByHql(hql, new Object[]{userId,parentId});
	}
	/**
	 * 取得某path下的所有Folder
	 * @param path
	 * @return
	 */
	public List<DocFolder> getFolderLikePath(String path){
		String hql="from DocFolder df where df.path like ?";
		return findByHql(hql,new Object[]{path+'%'});
	}

	@Override
	public List<DocFolder> getPublicFolderByParentId(Long parentId) {
        String hql="from DocFolder df where df.isShared=1 and parentId=? ";
		
		return findByHql(hql, new Object[]{parentId});
	}

}