<%@ page language="java" contentType="text/html; charset=UTF-8"pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set value="${pageContext.request.contextPath}" var="ctxPath"></c:set>

<ul class="home-calendarplan-ul">
<c:forEach items="${list}" var="calendarPlan">
	<li class="noticeItem">
	<a href="#" onclick="CalendarPlanDetail(${calendarPlan.planId})">
	<c:choose>
			<c:when test="${fn:length(calendarPlan.content) > 10}">
				<c:out value="${fn:substring(calendarPlan.content, 0, 10)}..." />
			</c:when>
			<c:otherwise>
				<c:out value="${calendarPlan.content}" />
			</c:otherwise>
		</c:choose>
	</a>
	<span class="right"><fmt:formatDate value="${calendarPlan.startTime}" pattern="yyyy-MM-dd"/></span> </li>
</c:forEach>
</ul>
<div align="right"><a href="#">&gt;&gt;更多</a></div>