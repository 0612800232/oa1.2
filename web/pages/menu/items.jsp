<%@page import="org.dom4j.Document"%>
<%@page import="org.dom4j.Attribute"%>
<%@page import="java.util.List"%>
<%@page import="org.dom4j.Element"%>
<%@page import="com.htsoft.core.util.XmlUtil"%>
<%@page pageEncoding="UTF-8"%>
<%
	String filePath = pageContext.getServletContext().getRealPath("/js");
	filePath += "/menu.xml";
	Document doc = XmlUtil.load(filePath);
	StringBuffer sb = new StringBuffer("[");
	if (doc != null) {
		Element root = doc.getRootElement();
		List els = root.elements();

		for (int i = 0; i < els.size(); i++) {
			Element el = (Element) els.get(i);
			Attribute id = el.attribute("id");
			Attribute text = el.attribute("text");
			Attribute iconCls = el.attribute("iconCls");

			sb.append("{id:'").append(id == null ? "" : id.getValue()).append("',");
			sb.append("text:'").append(text == null ? "" : text.getValue()).append("',");
			sb.append("iconCls:'").append(iconCls == null ? "" : iconCls.getValue()).append("'},");
		}
		if(els.size()>0){
			sb.deleteCharAt(sb.length()-1);
		}
	}
	
	sb.append("]");
	
	out.println(sb.toString());
%>