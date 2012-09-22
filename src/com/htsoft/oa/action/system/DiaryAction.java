package com.htsoft.oa.action.system;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Diary;
import com.htsoft.oa.service.system.DiaryService;
/**
 * 
 * @author csx
 *
 */
public class DiaryAction extends BaseAction{
	@Resource
	private DiaryService diaryService;
	private Diary diary;
	private Date from;
	private Date to;
	public Date getFrom() {
		return from;
	}

	public void setFrom(Date from) {
		this.from = from;
	}

	public Date getTo() {
		return to;
	}

	public void setTo(Date to) {
		this.to = to;
	}
	
	private Long diaryId;

	public Long getDiaryId() {
		return diaryId;
	}

	public void setDiaryId(Long diaryId) {
		this.diaryId = diaryId;
	}

	public Diary getDiary() {
		return diary;
	}

	public void setDiary(Diary diary) {
		this.diary = diary;
	}

	/**
	 * 显示列表
	 */
	public String list(){

		AppUser user = ContextUtil.getCurrentUser();
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_userId_L_EQ", (user.getId()).toString());
//		if(diary.getDiaryType()==null){
//			filter.addFilter("Q_diaryType_SN_EQ", (diary.getDiaryType()).toString());
//		}
//      filter.addFilter("Q_content_S_LK", diary.getContent());
		List<Diary> list= diaryService.getAll(filter);	
		Type type=new TypeToken<List<Diary>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
	    .append(filter.getPagingBean().getTotalItems()).append(",result:");
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString=buff.toString();		
		return SUCCESS;
	}
	
	/*
	 * 查询列表
	 */
	public String search(){

		AppUser user = ContextUtil.getCurrentUser();
		QueryFilter filter=new QueryFilter(getRequest());
		//按用户查询
		filter.addFilter("Q_userId_L_EQ", (user.getId()).toString());
		//按起始时间查询
		if(getRequest().getParameter("from")!=""){
			filter.addFilter("Q_dayTime_D_GE", getRequest().getParameter("from"));
		}
		//按最终时间查询
		if(getRequest().getParameter("to")!=""){
			filter.addFilter("Q_dayTime_D_LE", getRequest().getParameter("to"));
		}
		//按内容查询
		filter.addFilter("Q_content_S_LK", diary.getContent());
		//按类型查询
		if(diary.getDiaryType()!=null){
			filter.addFilter("Q_diaryType_SN_EQ", (diary.getDiaryType()).toString());
		}
		
		List<Diary> list= diaryService.getAll(filter);	
		Type type=new TypeToken<List<Diary>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
	    .append(filter.getPagingBean().getTotalItems()).append(",result:");
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
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
				diaryService.remove(new Long(id));
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
		Diary diary=diaryService.get(diaryId);
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(diary));
		sb.append("}");
		setJsonString(sb.toString());	
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		AppUser user = ContextUtil.getCurrentUser();
		diary.setUserId(user.getUserId());
		diaryService.save(diary);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
