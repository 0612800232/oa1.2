package com.htsoft.oa.action.admin;
import java.util.List;

import javax.annotation.Resource;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.admin.Book;
import com.htsoft.oa.model.admin.BookSn;
import com.htsoft.oa.model.admin.BookType;
import com.htsoft.oa.service.admin.BookService;
import com.htsoft.oa.service.admin.BookSnService;
import com.htsoft.oa.service.admin.BookTypeService;

import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class BookAction extends BaseAction{
	@Resource
	private BookService bookService;
	@Resource
	private BookTypeService bookTypeService;
	@Resource
	private BookSnService bookSnService;
	
	private Book book;
	
	private Long bookId;
	
	private Long typeId;
	private BookType bookType;

	public Long getTypeId() {
		return typeId;
	}

	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}

	public BookType getBookType() {
		return bookType;
	}

	public void setBookType(BookType bookType) {
		this.bookType = bookType;
	}

	public Long getBookId() {
		return bookId;
	}

	public void setBookId(Long bookId) {
		this.bookId = bookId;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<Book> list= bookService.getAll(filter);
		
		//Type type=new TypeToken<List<Book>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
			
		JSONSerializer serializer=new JSONSerializer();

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
				bookService.remove(new Long(id));
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
		Book book=bookService.get(bookId);
		
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer serializer=new JSONSerializer();
		sb.append(serializer.exclude(new String[]{"class"}).prettyPrint(book));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		bookService.save(book);	
		
		String bookSnNumber = "";
			for(int i=1;i<=book.getAmount();i++){
				//添加图书成功后，根据ISBN和图书数量自动生成每本图书SN号
				BookSn bookSn = new BookSn();
				//每本书的bookSn号根据书的ISBN号和数量自动生成,
				//如书的ISBN是123,数量是3,则每本书的bookSn分别是：123-1,123-2,123-3
				bookSnNumber=book.getIsbn()+"-"+i;
				bookSn.setBookId(book.getBookId());
				bookSn.setBookSN(bookSnNumber);
				//默认书的状态是0表示未借出
				bookSn.setStatus(new Short((short) 0));
				//添加bookSn信息
				bookSnService.save(bookSn);
			
			}
		setJsonString("{success:true,bookSnNumber:'"+bookSnNumber+"'}");
		
		//setJsonString("{success:true}");
		return SUCCESS;
	}
	
}
