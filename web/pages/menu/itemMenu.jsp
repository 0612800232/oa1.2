<%@page import="org.dom4j.Node"%><%@page import="java.util.List"%><%@page import="org.dom4j.Element"%><%@page import="org.dom4j.Document"%><%@page import="com.htsoft.core.util.XmlUtil"%><%@page pageEncoding="UTF-8"%><%
	response.setContentType("text/xml");
	String filePath=pageContext.getServletContext().getRealPath("/js");
	filePath+="/menu.xml";
	Document doc=XmlUtil.load(filePath);
	String id=request.getParameter("id");
	if(doc!=null){
		StringBuffer sb=new StringBuffer("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r");
		Element el=doc.getRootElement();
		
		List nodes=el.selectNodes("/Menus/Items[@id='"+id+"']/*");
		sb.append("<Menus>\r");
		for(int i=0;i<nodes.size();i++){
			Node node=(Node)nodes.get(i);
			sb.append(node.asXML());
		}
		sb.append("\r</Menus>\r");
		out.println(sb.toString());
	}
%>