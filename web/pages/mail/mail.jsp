<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
		<table class="table-info" width="98%" cellpadding="0" cellspacing="1">
			<tr>
				<td width="20%">
					主题:
				</td>
				<td width="80%">
					${mail.subject}
				</td>
			</tr>
			<tr>
				<td width="20%">
					时间:
				</td>
				<td width="80%">
					${mail.sendTime}
				</td>
			</tr>
			<tr>
				<td width="20%">
					收件人:
				</td>
				<td width="80%">
					${mail.recipientNames }
				</td>
			</tr>
			<c:if test="${not empty mail.copyToNames}">
				<tr>
					<td width="20%">
						抄送人:
					</td>
					<td width="80%">
						${mail.copyToNames }
					</td>
				</tr>
			</c:if>
			<c:if test="${not empty mailAttachs}">
				<tr >
					<td width="20%" rowspan="${fn:length(mailAttachs)+1}">
						附件:
					</td>
					
				</tr>
				<c:forEach items="${mailAttachs}" var="attachs">
						<tr>
							<td width="80%" >
								 <a href="#" onclick="FileAttachDetail.show(${attachs.fileId});" class="attachment">${attachs.fileName}</a>
							</td>
						</tr>
					</c:forEach>
			</c:if>
			<tr>
				<td width="100%" colspan="2">
					内容:
				</td>
			</tr>
			<tr>
				<td width="100%"  colspan="2" style="min-height: 200px;">
					${mail.content}
				</td>
			</tr>
		</table>
