<%@ page language="java" contentType="text/html; charset=UTF-8"pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set value="${pageContext.request.contextPath}" var="ctxPath"></c:set>
<ul class="home-message-ul">
<c:forEach items="${inList}" var="inMessage">
	<li class="noticeItem">
	<a href="#" onclick="MessageDetail(${inMessage.receiveId})">
	<c:choose>
			<c:when test="${fn:length(inMessage.shortMessage.content) > 10}">
				<c:out value="${fn:substring(inMessage.shortMessage.content, 0, 10)}..." />
			</c:when>
			<c:otherwise>
				<c:out value="${inMessage.shortMessage.content}" />
			</c:otherwise>
		</c:choose>
	</a>
	<span class="right"><fmt:formatDate value="${inMessage.shortMessage.sendTime}" pattern="yyyy-MM-dd"/></span> </li>
</c:forEach>
</ul>
<div align="right"><a href="#">&gt;&gt;更多</a></div>