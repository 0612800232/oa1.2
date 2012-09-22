package com.htsoft.oa.dao.system.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.security.userdetails.UserDetails;
import org.springframework.security.userdetails.UserDetailsService;
import org.springframework.security.userdetails.UsernameNotFoundException;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.system.AppUserDao;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Department;

public class AppUserDaoImpl extends BaseDaoImpl<AppUser> implements AppUserDao,
		UserDetailsService {

	public AppUserDaoImpl() {
		super(AppUser.class);
	}

	@Override
	public AppUser findByUserName(String username) {
		String hql = "from AppUser au where username=?";
		Object[] params = { username };
		List<AppUser> list = findByHql(hql, params);
		AppUser user = null;
		if (list.size() != 0) {
			user = list.get(0);
		}
		return user;
	}

	@Override
	public UserDetails loadUserByUsername(final String username)
			throws UsernameNotFoundException, DataAccessException {

		return (UserDetails) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						String hql = "from AppUser ap where ap.username=?";
						Query query = session.createQuery(hql);
						query.setString(0, username);

						AppUser user = null;
						try {
							user = (AppUser) query.uniqueResult();
							if (user != null) {
								Hibernate.initialize(user.getRoles());
							}
						} catch (Exception ex) {
							logger.warn("user:" + username
									+ " can't not loding rights:"
									+ ex.getMessage());
						}
						return user;
					}
				});
	}

	/**
	 * 根据部门PATH属性查找
	 */
	@Override
	public List findByDepartment(String path,PagingBean pb) {
		String hql="select vo2 from Department vo1,AppUser vo2 where vo1=vo2.department and vo1.path like ?";
		Object[] params = {path+"%" };		
		return findByHql(hql,params,pb);
	}

	@Override
	public List findByDepartment(Department department) {
		String hql="select vo2 from Department vo1,AppUser vo2 where vo1=vo2.department and vo1.path like ?";
		Object[] params = { department.getPath()+"%" };		
		return findByHql(hql,params);
	}

	@Override
	public List findByRole(Long roleId) {
		String hql="select vo from AppUser vo join vo.roles roles where roles.roleId=?";
		Object[] objs={roleId};
		return findByHql(hql, objs);
	}

	@Override
	public List findByRole(Long roleId, PagingBean pb) {
		String hql="select vo from AppUser vo join vo.roles roles where roles.roleId=?";
		Object[] objs={roleId};
		return findByHql(hql,objs,pb);
	}

	@Override
	public List<AppUser> findByDepartment(String path) {
		String hql="select vo2 from Department vo1,AppUser vo2 where vo1.depId=vo2.depId and vo1.path like ?";
		Object[] params = {path+"%" };		
		return findByHql(hql,params);
	}
	
	public List findByRoleId(Long roleId){
		String hql="select vo from AppUser vo join vo.roles as roles where roles.roleId=?";
		return findByHql(hql,new Object[]{roleId});
	}
	
	public List findByUserIds(Long... userIds){
		String hql="select vo from AppUser vo where 1=1 ";

		if(userIds==null || userIds.length==0) return null;
		hql+=" where vo.userId in (";
		int i=0;
		for(Long userId:userIds){
			if(i++>0){
				hql+=",";
			}
			hql+="?";
		}
		hql+=" )";
		
		return findByHql(hql,new Object[]{userIds});
	}

}
