<%@ page language="java" contentType="text/html; charset=UTF-8"pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set value="${pageContext.request.contextPath}" var="ctxPath"></c:set>

<ul class="home-appointment-ul">
<c:forEach items="${list}" var="appointment">
	<li class="noticeItem">
	<a href="#" onclick="AppointmentDetail(${appointment.appointId})">
	<c:choose>
			<c:when test="${fn:length(appointment.subject) > 10}">
				<c:out value="${fn:substring(appointment.subject, 0, 10)}..." />
			</c:when>
			<c:otherwise>
				<c:out value="${appointment.subject}" />
			</c:otherwise>
		</c:choose>
	</a>
	<span class="right"><fmt:formatDate value="${appointment.startTime}" pattern="yyyy-MM-dd"/></span> </li>
</c:forEach>
</ul>
<div align="right"><a href="#">&gt;&gt;更多</a></div>