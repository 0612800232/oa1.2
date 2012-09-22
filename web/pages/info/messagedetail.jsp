<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<table class="table-info" width="100%" cellpadding="0" cellspacing="1">
	<tr>
		<td width="25%">发送人：</td>
		<td width="75%">${inMessage.shortMessage.sender}</td>
	</tr>
	<tr>
		<td width="25%">类别：</td>
		<td width="75%">
			<c:choose>
				<c:when test="${inMessage.shortMessage.msgType==1}">
					个人信息
				</c:when>
				<c:when test="${inMessage.shortMessage.msgType==2}">
					日程安排
				</c:when>
				<c:when test="${inMessage.shortMessage.msgType==3}">
					计划任务
				</c:when>
				<c:when test="${inMessage.shortMessage.msgType==4}">
					系统信息
				</c:when>
				<c:otherwise>
					其他
				</c:otherwise>
			</c:choose>
		</td>
	</tr>
	<tr>
		<td width="25%">内容：</td>
		<td width="75%">${inMessage.shortMessage.content}</td>
	</tr>
	<tr>
		<td width="25%">发送时间：</td>
		<td width="75%"><fmt:formatDate value="${inMessage.shortMessage.sendTime}"
			pattern="yyyy-MM-dd HH:mm:ss" /></td>
	</tr>
</table>