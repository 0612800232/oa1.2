package com.htsoft.oa.action.admin;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.admin.BookBorRet;
import com.htsoft.oa.model.communicate.PhoneBook;
import com.htsoft.oa.service.admin.BookBorRetService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class BookBorRetAction extends BaseAction{
	@Resource
	private BookBorRetService bookBorRetService;
	private BookBorRet bookBorRet;
	
	private Long recordId;

	public Long getRecordId() {
		return recordId;
	}

	public void setRecordId(Long recordId) {
		this.recordId = recordId;
	}

	public BookBorRet getBookBorRet() {
		return bookBorRet;
	}

	public void setBookBorRet(BookBorRet bookBorRet) {
		this.bookBorRet = bookBorRet;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BookBorRet> list= bookBorRetService.getAll(filter);
		
		Type type=new TypeToken<List<BookBorRet>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));

		
		JSONSerializer serializer=new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"borrowTime");
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"returnTime");
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"lastReturnTime");
		buff.append(serializer.exclude(new String[]{"class"}).prettyPrint(list));

		buff.append("}");
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				bookBorRetService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		BookBorRet bookBorRet=bookBorRetService.get(recordId);
		
		//Gson gson=new Gson();
		//将数据转成JSON格式
		JSONSerializer serializer=new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"borrowTime");
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"returnTime");
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"lastReturnTime");
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(serializer.exclude(new String[]{"class"}).prettyPrint(bookBorRet));
		//sb.append(gson.toJson(bookBorRet));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
		
	}
	/**
	 * 添加及保存图书借阅操作
	 */
	public String saveBorrow(){
		//用系统日期保存图书的借出日期
		bookBorRet.setBorrowTime(new Date());
		bookBorRetService.save(bookBorRet);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	/**
	 * 添加及保存图书归还操作
	 */
	public String saveReturn(){
		//用系统日期保存图书的归还日期
		bookBorRet.setReturnTime(new Date());
		bookBorRetService.save(bookBorRet);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
