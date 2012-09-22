<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.htsoft.oa.service.info.NewsService"%>
<%@page import="com.htsoft.oa.service.info.impl.NewsServiceImpl"%>
<%@page import="com.htsoft.core.web.paging.PagingBean"%>
<%@page import="com.htsoft.oa.model.info.News"%>
<%@page import="com.htsoft.oa.model.info.NewsType"%>
<%@page import="com.htsoft.oa.service.info.NewsTypeService"%>
<%
	long id = 0L;
	String newsId = request.getParameter("newsId");
	if (newsId != null) {
		id = Long.valueOf(newsId);
	}
	NewsService newsService = (NewsService) AppUtil.getBean("newsService");
	//通过id得到News
	News news = (News) newsService.get(id);
	request.setAttribute("news",news);
	
%>
<table class="table-info" width="100%" cellpadding="0" cellspacing="1">
	<tr>
		<td width="25%">新闻标题：</td>
		<td width="75%">${news.subject }</td>
	</tr>
	<tr>
		<td width="25%">新闻内容：</td>
		<td width="75%">${news.content}</td>
	</tr>
	<tr>
		<td width="25%">发布者：</td>
		<td width="75%">${news.author}</td>
	</tr>
	<tr>
		<td width="25%">发布时间：</td>
		<td width="75%">
			<fmt:formatDate value="${news.createtime}" pattern="yyyy-MM-dd HH:mm"/>
		</td>
	</tr>
	<tr>
		<td width="25%">所属类别：</td>
		<td width="75%">${news.newsType.typeName}</td>
	</tr>
	<tr>
		<td width="25%">状态：</td>
		<td width="75%">
			<c:choose>
				<c:when test="${news.status==1}">
					生效
				</c:when>
				<c:otherwise>
					禁用
				</c:otherwise>
			</c:choose>
		</td>
	</tr>
</table>
