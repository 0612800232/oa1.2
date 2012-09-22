<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@page import="java.util.*"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.htsoft.oa.service.task.CalendarPlanService"%>
<%@page import="com.htsoft.oa.service.task.impl.CalendarPlanServiceImpl"%>
<%@page import="com.htsoft.core.web.paging.PagingBean"%>
<%@page import="com.htsoft.oa.model.task.CalendarPlan"%>
<%
	long id = 0L;
	String strid = request.getParameter("planId");
	if (strid != null) {
		id = Long.valueOf(strid);
	}
	CalendarPlanService calendarPlanService = (CalendarPlanService) AppUtil.getBean("calendarPlanService");
	CalendarPlan calendarPlan = (CalendarPlan) calendarPlanService.get(id);
	request.setAttribute("calendarPlan",calendarPlan);
%>
<table class="table-info" width="100%" cellpadding="0" cellspacing="1">
	<tr>
		<td width="25%">员工名：</td>
		<td width="75%">${calendarPlan.fullname}</td>
	</tr>
	<tr>
		<td width="25%">分配人：</td>
		<td width="75%">${calendarPlan.assignerName}</td>
	</tr>
	<tr>
		<td width="25%">内容：</td>
		<td width="75%">${calendarPlan.content}</td>
	</tr>
	<tr>
		<td width="25%">紧急程度：</td>
		<td width="75%">
			<c:choose>
				<c:when test="${calendarPlan.urgent==0}">
					一般
				</c:when>
				<c:when test="${calendarPlan.urgent==1}">
					重要
				</c:when>
				<c:otherwise>
					紧急
				</c:otherwise>
			</c:choose>
		</td>
	</tr>
	<tr>
		<td width="25%">任务类型：</td>
		<td width="75%">
		<c:choose>
			<c:when test="${calendarPlan.taskType==1}">
					限期任务
				</c:when>
			<c:otherwise>
					非限期任务
				</c:otherwise>
		</c:choose></td>
	</tr>
	<tr>
		<td width="25%">开始时间：</td>
		<td width="75%"><fmt:formatDate value="${calendarPlan.startTime}"
			pattern="yyyy-MM-dd" /></td>
	</tr>
	<tr>
		<td width="25%">结束时间：</td>
		<td width="75%"><fmt:formatDate value="${calendarPlan.endTime}"
			pattern="yyyy-MM-dd" /></td>
	</tr>
	<tr>
		<td width="25%">状态：</td>
		<td width="75%">
		<c:choose>
			<c:when test="${calendarPlan.status==0}">
					未完成
				</c:when>
			<c:otherwise>
					完成
				</c:otherwise>
		</c:choose></td>
	</tr>
	
</table>