<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@page import="java.util.*"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.htsoft.oa.service.task.AppointmentService"%>
<%@page import="com.htsoft.oa.service.task.impl.AppointmentServiceImpl"%>
<%@page import="com.htsoft.core.web.paging.PagingBean"%>
<%@page import="com.htsoft.oa.model.task.Appointment"%>
<%
	long id = 0L;
	String strid = request.getParameter("appointId");
	if (strid != null) {
		id = Long.valueOf(strid);
	}
	AppointmentService appointmentService = (AppointmentService) AppUtil.getBean("appointmentService");
	Appointment appointment = (Appointment) appointmentService.get(id);
	request.setAttribute("appointment",appointment);
%>
<table class="table-info" width="100%" cellpadding="0" cellspacing="1">
	<tr>
		<td width="25%">主题：</td>
		<td width="75%">${appointment.subject}</td>
	</tr>
	<tr>
		<td width="25%">开始时间：</td>
		<td width="75%"><fmt:formatDate value="${appointment.startTime}"
			pattern="yyyy-MM-dd HH:mm" /></td>
	</tr>
	<tr>
		<td width="25%">结束时间：</td>
		<td width="75%"><fmt:formatDate value="${appointment.endTime}"
			pattern="yyyy-MM-dd HH:mm" /></td>
	</tr>
	<tr>
		<td width="25%">约会内容：</td>
		<td width="75%">${appointment.content}</td>
	</tr>
	<tr>
		<td width="25%">地点：</td>
		<td width="75%">${appointment.location}</td>
	</tr>
	<tr>
		<td width="25%">备注：</td>
		<td width="75%">${appointment.notes}</td>
	</tr>
	<tr>
		<td width="25%">受邀人Email：</td>
		<td width="75%">${appointment.inviteEmails}</td>
	</tr>
</table>