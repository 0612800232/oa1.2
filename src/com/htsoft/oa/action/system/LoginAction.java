package com.htsoft.oa.action.system;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import nl.captcha.Captcha;
import org.springframework.security.AuthenticationManager;
import org.springframework.security.context.SecurityContext;
import org.springframework.security.context.SecurityContextHolder;
import org.springframework.security.providers.UsernamePasswordAuthenticationToken;
import org.springframework.security.ui.rememberme.TokenBasedRememberMeServices;
import org.springframework.security.ui.webapp.AuthenticationProcessingFilter;

import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;

public class LoginAction extends BaseAction{
	private AppUser user;
	private String username;
	private String password;
	private String checkCode;//验证码
	//private String rememberMe;//自动登录
	@Resource
	private AppUserService userService;
	@Resource(name="authenticationManager")
	private AuthenticationManager authenticationManager=null;

	/**
	 * 登录
	 * @return
	 */
	public String login(){
		StringBuffer msg = new StringBuffer("{msg:'");
		Captcha captcha = (Captcha)getSession().getAttribute(Captcha.NAME);
		Boolean login = false;
		if(!"".equals(username)&&username!=null){
			setUser(userService.findByUserName(username));
			if(user!=null){
				if(!"".equals(password)&&password!=null){
					if(user.getPassword().equals(password)){
						if(captcha.isCorrect(checkCode)){
							if(user.getStatus()==1){
								login=true;
							}
							else msg.append("此用户已被禁用.'");
						}
						else msg.append("验证码不正确.'");
					}
					else msg.append("密码不正确.'");
				}
				else msg.append("密码不能为空.'");
			}
			else msg.append("用户不存在.'");
		}
		if(login){
			UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
			SecurityContext securityContext = SecurityContextHolder.getContext();
			securityContext.setAuthentication(authenticationManager.authenticate(authRequest));
			SecurityContextHolder.setContext(securityContext);
	        getSession().setAttribute(AuthenticationProcessingFilter.SPRING_SECURITY_LAST_USERNAME_KEY,username);
	        String rememberMe = getRequest().getParameter("_spring_security_remember_me");
	        if(rememberMe!=null&&rememberMe.equals("on")){
	        	long tokenValiditySeconds = 1209600; // 14 days
		        long expiryTime = System.currentTimeMillis() + (tokenValiditySeconds * 1000);
		        String signatureValue = new String(username + ":" + expiryTime + ":" + password + ":" + "RememberAppUser");
		        String tokenValue = username + ":" + expiryTime + ":" + signatureValue;
		        getResponse().addCookie(makeValidCookie(expiryTime, tokenValue, getRequest()));
		        
	        }
	        
	        //登录成功后，需要把该用户显示至在线用户
	        AppUtil.addOnlineUser(getSession().getId(), user);

			setJsonString("{success:true}");
		}else{
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}
		return SUCCESS;
	}
	//add Cookie
	protected Cookie makeValidCookie(long expiryTime, String tokenValueBase64,
			HttpServletRequest request) {
			Cookie cookie = new Cookie(TokenBasedRememberMeServices.SPRING_SECURITY_REMEMBER_ME_COOKIE_KEY, tokenValueBase64);
			cookie.setMaxAge(60 * 60 * 24 * 365 * 5); // 5 years
			cookie.setPath(org.springframework.util.StringUtils.hasLength(request.getContextPath()) ? request.getContextPath():"/");
			return cookie;
		}
	
	/**
	 * 检查是否登录
	 * @return
	 */
	public String check(){
		//System.out.println("============come in");
		AppUser user=ContextUtil.getCurrentUser();
		if(user!=null){
			System.out.println("当前用户"+user.getUsername());
			setJsonString("{islogin:true}");
		}else{
			//System.out.println("user is null");
			setJsonString("{islogin:false}");
		}
		return SUCCESS;
		
	}
	
	public AppUser getUser() {
		return user;
	}
	
	public void setUser(AppUser user) {
		this.user = user;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public String getCheckCode() {
		return checkCode;
	}

	public void setCheckCode(String checkCode) {
		this.checkCode = checkCode;
	}

//	public String getRememberMe() {
//		return rememberMe;
//	}
//
//	public void setRememberMe(String rememberMe) {
//		this.rememberMe = rememberMe;
//	}
	
}
