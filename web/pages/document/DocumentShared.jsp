<%@ page pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib prefix="s" uri="/struts-tags"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<html>
<head>
<title></title>
</head>
<body>
    <table class="table-info" width="460">
       <tr>
          <td>文档名称：</td><td><s:property value="document.docName" /></td>
       </tr>
        <tr>
          <td>共享人：</td><td><s:property value="document.appUser.fullname" /></td>
       </tr>
       <tr>
          <td>创建时间：</td><td><fmt:formatDate value="${document.createtime}" pattern="yyy-MM-dd HH:mm:ss"/></td>
      </tr>
      <tr>
          <td>更新时间：</td><td><fmt:formatDate value="${document.updatetime}" pattern="yyy-MM-dd HH:mm:ss"/></td>
       </tr>         
       <tr height="250">
          <td valign="top">内容：</td><td valign="top"><s:property value="document.content" /></td>
       </tr>
       <tr>
          <td>附件：</td>
          <td>
             <s:iterator id="aa" value="document.attachFiles">
	           <a href="#" onclick="FileAttachDetail.show(${aa.fileId});" class="attachment">${aa.fileName}</a>
	        </s:iterator>          
          </td>
       </tr>
    </table> 
</body>
</html>