package com.htsoft.oa.dao.document.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.document.DocumentDao;
import com.htsoft.oa.model.document.DocPrivilege;
import com.htsoft.oa.model.document.Document;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;

public class DocumentDaoImpl extends BaseDaoImpl<Document> implements DocumentDao{

	public DocumentDaoImpl() {
		super(Document.class);
	}

	@Override
	public List<Document> findByIsShared(Document document, Date from, Date to,
			Long userId, ArrayList<Long> roleIds, Long depId, PagingBean pb) {
		ArrayList list=new ArrayList();
		StringBuffer buff=new StringBuffer("select vo from Document vo where vo.isShared=1 and ( 0=1 ");
		if(depId!=null){
			buff.append(" or vo.sharedDepIds like ? ");
			list.add("%,"+depId+",%");
		}
		if(roleIds!=null){
			for(Long roleId:roleIds){
		        buff.append(" or vo.sharedRoleIds like ?");
		        list.add("%,"+roleId+",%");
			}
		}
		if(userId!=null){
			buff.append(" or vo.sharedUserIds like ?");
			list.add("%,"+userId+",%");
		}
		buff.append(")");
		if(document!=null){
			if(StringUtils.isNotEmpty(document.getDocName())){
				buff.append(" and vo.docName like ?");
				list.add("%"+document.getDocName()+"%");
			}
			if(StringUtils.isNotEmpty(document.getAppUser().getFullname())){
				buff.append(" and vo.appUser.fullname=?");
				list.add(document.getAppUser().getFullname());
			}
		}
		if(to!=null){
			buff.append(" and vo.createtime <= ?");
			list.add(to);
		}
		if(from!=null){
			buff.append(" and vo.createtime >= ?");
			list.add(from);
		}
		return findByHql(buff.toString(),list.toArray(),pb);
	}

	/**
	 * 查询公共文档列表
	 * 参数Path:是文件夹路径
	 * 
	 */
	@Override
	public List<Document> findByPublic(String path,Document document,Date from,Date to,AppUser appUser,PagingBean pb) {
		Set<AppRole> roles=appUser.getRoles();
		StringBuffer buff=new StringBuffer();
		
		if(roles!=null){
			Iterator it=roles.iterator();
			while(it.hasNext()){
				buff.append(((AppRole)it.next()).getRoleId().toString());
			}
			if(roles.size()>0){
				buff.deleteCharAt(buff.length()-1);
			}
		}
		Integer userId=Integer.parseInt(appUser.getUserId().toString());
		
		StringBuffer sb =new StringBuffer("select doc from Document doc,DocFolder docF,DocPrivilege pr where doc.docFolder=docF and pr.docFolder=docF and pr.rights>0 and ((pr.udrId=? and pr.flag=1)");
		List list=new ArrayList();
		list.add(userId);
		if(appUser.getDepartment()!=null){
			Integer depId=Integer.parseInt(appUser.getDepartment().getDepId().toString());
			sb.append(" or (pr.udrId=? and pr.flag=2)");
			list.add(depId);
		}
		if(buff.toString()!=null&&buff.length()>0){
			sb.append(" or (pr.udrId in ("+buff.toString()+") and pr.flag=3)");
		}
		sb.append(")");
		if(path!=null){
			sb.append(" and docF.path like ?");
			list.add(path+"%");
		}
		if(document!=null){
			if(document.getDocName()!=null){
			   sb.append(" and doc.docName=?");
			   list.add(document.getDocName());
			}
			if(document.getContent()!=null){
				sb.append("doc.content like ?");
				list.add("%"+document.getContent()+"%");
			}
		}
		if(to!=null){
			sb.append(" and vo.createtime <= ?");
			list.add(to);
		}
		if(from!=null){
			sb.append(" and vo.createtime >= ?");
			list.add(from);
		}
		sb.append(" group by doc");
		System.out.println(sb.toString());
		List<Document> docList=findByHql(sb.toString(),list.toArray(),pb);
		return docList;
	}

	@Override
	public List<Document> findByPersonal(Long userId,Document document,Date from,Date to, String path, PagingBean pb) {
		StringBuffer sb=new StringBuffer();
		ArrayList list=new ArrayList();
		
		  sb.append("select doc from Document doc,DocFolder docFolder where doc.docFolder=docFolder and docFolder.appUser.userId is not Null");
		if(path!=null){
		  sb.append(" and docFolder.path like ?");
		  list.add(path+"%");
		}
//		else{
//			sb.append("select doc from Document doc where 1=1");
//		}
		if(userId!=null){
			sb.append(" and doc.appUser.userId=?");
			list.add(userId);
		}
		if(document!=null){
			if(document.getDocName()!=null){
			   sb.append(" and doc.docName=?");
			   list.add(document.getDocName());
			}
		}
		if(to!=null){
			sb.append(" and vo.createtime <= ?");
			list.add(to);
		}
		if(from!=null){
			sb.append(" and vo.createtime >= ?");
			list.add(from);
		}
		sb.append("group by doc");
		return findByHql(sb.toString(),list.toArray(),pb);
	}
}