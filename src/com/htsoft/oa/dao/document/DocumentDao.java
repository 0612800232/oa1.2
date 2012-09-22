package com.htsoft.oa.dao.document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.document.DocPrivilege;
import com.htsoft.oa.model.document.Document;
import com.htsoft.oa.model.system.AppUser;

/**
 * 
 * @author 
 *
 */
public interface DocumentDao extends BaseDao<Document>{
	
	/**
	 * 查找共享的文档
	 * @param document
	 * @param from
	 * @param to
	 * @param userId
	 * @param roleIds
	 * @param depId
	 * @param pb
	 * @return
	 */
	public List<Document> findByIsShared(Document document,Date from,Date to,Long userId,ArrayList<Long> roleIds,Long depId,PagingBean pb);
	/**
	 * 查找公共文档
	 * @param folderId
	 * @param document
	 * @param from
	 * @param to
	 * @param appUser
	 * @param pb
	 * @return
	 */
	public List<Document> findByPublic(String path,Document document,Date from,Date to,AppUser appUser,PagingBean pb);
	/**
	 * 根据文件夹个人查找个人文档
	 */
	public List<Document> findByPersonal(Long userId,Document document,Date from,Date to,String path,PagingBean pb);
}