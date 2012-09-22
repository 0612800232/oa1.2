<%@page import="java.util.List"%>
<%@page import="com.htsoft.oa.service.flow.ProcessFormService"%>
<%@page import="com.htsoft.oa.model.flow.ProcessRun"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.htsoft.oa.service.flow.ProcessRunService"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	//显示流程的明细，（为流程的标题及内容）
	//传入piId,即流程实例ID
%>
<c:forEach items="${pfList}" var="processForm">
	<table class="table-info" cellpadding="0" cellspacing="1" width="96%">
		<tr>
			<th colspan="2">流程任务：[${processForm.activityName}]</th>
		</tr>
		<c:forEach items="${processForm.formDatas}" var="formData">
		<tr>
			<th>${formData.fieldLabel}</th>
			<td>${formData.value}</td>
		</tr>
		</c:forEach>
	</table>
</c:forEach>