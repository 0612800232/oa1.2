<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set value="${pageContext.request.contextPath}" var="ctxPath"></c:set>
<!-- 用jstl的function标签对标题长度超过10个字符进行截取后输出 -->
<ul class="home-ul">
	<c:forEach items="${list}" var="notice">
		<li class="noticeItem"><a href="#"
			onclick="NoticeDetail(${notice.noticeId})"> <c:choose>
			<c:when test="${fn:length(notice.noticeTitle) > 10}">
				<c:out value="${fn:substring(notice.noticeTitle, 0, 10)}..." />
			</c:when>
			<c:otherwise>
				<c:out value="${notice.noticeTitle}" />
			</c:otherwise>
		</c:choose> </a> <span class="right"> <fmt:formatDate
			value="${notice.effectiveDate}" pattern="yyyy-MM-dd" /> </span></li>
	</c:forEach>
</ul>
<div align="right"><a href="#">&gt;&gt;更多</a></div>