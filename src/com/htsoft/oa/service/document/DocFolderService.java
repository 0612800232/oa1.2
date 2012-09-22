package com.htsoft.oa.service.document;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.document.DocFolder;

public interface DocFolderService extends BaseService<DocFolder>{
	/**
	 * 按父Id取得某目录下的所有子文件夹
	 * @param userId
	 * @param parentId
	 * @return
	 */
	public List<DocFolder> getUserFolderByParentId(Long userId,Long parentId);
	
	/**
	 * 取得某path下的所有Folder
	 * @param path
	 * @return
	 */
	public List<DocFolder> getFolderLikePath(String path);
	/**
	 * 获取公共文件夹
	 * @param userId
	 * @param parentId
	 * @return
	 */
	public List<DocFolder> getPublicFolderByParentId(Long parentId);
}


