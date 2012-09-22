<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@page import="java.util.*"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.htsoft.oa.service.info.NoticeService"%>
<%@page import="com.htsoft.oa.service.info.impl.NoticeServiceImpl"%>
<%@page import="com.htsoft.core.web.paging.PagingBean"%>
<%@page import="com.htsoft.oa.model.info.Notice"%>
<%
	long id = 0L;
	String strid = request.getParameter("noticeId");
	if (strid != null) {
		id = Long.valueOf(strid);
	}
	NoticeService noticeService = (NoticeService) AppUtil
			.getBean("noticeService");
	Notice notice = (Notice) noticeService.get(id);
	request.setAttribute("notice",notice);
%>
<table class="table-info" width="100%" cellpadding="0" cellspacing="1">
	<tr>
		<td width="25%">公告标题：</td>
		<td width="75%">${notice.noticeTitle}</td>
	</tr>
	<tr>
		<td width="25%">公告内容：</td>
		<td width="75%">${notice.noticeContent}</td>
	</tr>
	<tr>
		<td width="25%">发布者：</td>
		<td width="75%">${notice.postName}</td>
	</tr>
	<tr>
		<td width="25%">生效日期：</td>
		<td width="75%"><fmt:formatDate value="${notice.effectiveDate}"
			pattern="yyyy-MM-dd" /></td>
	</tr>
	<tr>
		<td width="25%">失效日期：</td>
		<td width="75%"><fmt:formatDate value="${notice.expirationDate}"
			pattern="yyyy-MM-dd" /></td>
	</tr>
	<tr>
		<td width="25%">状态：</td>
		<td width="75%"><c:choose>
			<c:when test="${notice.state==1}">
					正式发布
				</c:when>
			<c:otherwise>
					草稿
				</c:otherwise>
		</c:choose></td>
	</tr>
</table>