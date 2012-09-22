package com.htsoft.oa.action.admin;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.admin.GoodsApply;
import com.htsoft.oa.service.admin.GoodsApplyService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class GoodsApplyAction extends BaseAction{
	@Resource
	private GoodsApplyService goodsApplyService;
	private GoodsApply goodsApply;
	
	private Long applyId;

	public Long getApplyId() {
		return applyId;
	}

	public void setApplyId(Long applyId) {
		this.applyId = applyId;
	}

	public GoodsApply getGoodsApply() {
		return goodsApply;
	}

	public void setGoodsApply(GoodsApply goodsApply) {
		this.goodsApply = goodsApply;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<GoodsApply> list= goodsApplyService.getAll(filter);
		
//		Type type=new TypeToken<List<GoodsApply>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));
		JSONSerializer serializer=new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"applyDate");
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
				goodsApplyService.remove(new Long(id));
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
		GoodsApply goodsApply=goodsApplyService.get(applyId);
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer serializer=new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"applyDate");
		sb.append(serializer.exclude(new String[]{"class"}).prettyPrint(goodsApply));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmss-SSSS");//自动生成申请号
		goodsApply.setApplyNo("GA"+sdf.format(new Date()));
		if(goodsApply.getApplyId()==null){
			goodsApply.setApprovalStatus((short)0);//设初始值为0,即是为未通过审批
		}
		goodsApplyService.save(goodsApply);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
