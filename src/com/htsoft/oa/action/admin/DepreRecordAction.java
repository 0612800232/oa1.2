package com.htsoft.oa.action.admin;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import java.math.BigDecimal;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.admin.DepreRecord;
import com.htsoft.oa.model.admin.FixedAssets;
import com.htsoft.oa.service.admin.DepreRecordService;
import com.htsoft.oa.service.admin.FixedAssetsService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class DepreRecordAction extends BaseAction{
	@Resource
	private DepreRecordService depreRecordService;
	private DepreRecord depreRecord;
	@Resource
	private FixedAssetsService fixedAssetsService;
	
	private Long recordId;

	public Long getRecordId() {
		return recordId;
	}

	public void setRecordId(Long recordId) {
		this.recordId = recordId;
	}

	public DepreRecord getDepreRecord() {
		return depreRecord;
	}

	public void setDepreRecord(DepreRecord depreRecord) {
		this.depreRecord = depreRecord;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<DepreRecord> list= depreRecordService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer=new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"calTime");
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
				depreRecordService.remove(new Long(id));
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
		DepreRecord depreRecord=depreRecordService.get(recordId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(depreRecord));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}	
	/**
	 * 折旧运算
	 */
	public String depreciate(){
		String strAssetsId=getRequest().getParameter("ids");
		if(StringUtils.isNotEmpty(strAssetsId)){
			FixedAssets fixedAssets=fixedAssetsService.get(new Long(strAssetsId));
			short method=fixedAssets.getDepreType().getCalMethod();
			if(method==1){  //平均年限法
				BigDecimal yearRateDiv=fixedAssets.getRemainValRate().divide(new BigDecimal("100")); 
				BigDecimal yearRateAdd=yearRateDiv.add(new BigDecimal("1"));
				BigDecimal intendTerm=fixedAssets.getIntendTerm();
				BigDecimal yearRate=yearRateAdd.divide(intendTerm,5,5);//年折旧率
				BigDecimal monthRate=yearRate.divide(new BigDecimal("12"),2,2); //月折旧率
				
				Date lastCalTime=depreRecordService.findMaxDate(new Long(strAssetsId));
				if(lastCalTime==null){
					lastCalTime=fixedAssets.getStartDepre();
				}				
				Integer deprePeriod=fixedAssets.getDepreType().getDeprePeriod();
				GregorianCalendar gc1 = new GregorianCalendar();
				gc1.setTime(lastCalTime);
				Integer i=0;

				while(deprePeriod>=1){
					gc1.roll(Calendar.MONTH, deprePeriod);
					Date curDate=gc1.getTime();
					if(curDate.after(new Date())){
						if(i==0){
							setJsonString("{success:false,message:'还没到折算时间!'}");
						}else{
							setJsonString("{success:true}");
						}
						return SUCCESS;
					}else{
						i++;
						DepreRecord depreR=new DepreRecord();
						depreR.setFixedAssets(fixedAssets);
						depreR.setCalTime(curDate);
						BigDecimal value=fixedAssets.getAssetCurValue().multiply(new BigDecimal(deprePeriod.toString())).multiply(monthRate);
						BigDecimal cruValue=fixedAssets.getAssetCurValue().subtract(value.multiply(new BigDecimal(i.toString())));
						if(cruValue.compareTo(new BigDecimal("0"))==-1){
							setJsonString("{success:true}");
							return SUCCESS;
						}
						depreR.setDepreAmount(cruValue);
						fixedAssets.setAssetCurValue(cruValue);
						depreRecordService.save(depreR);
					}
				}	
			}else if(method==2){//工作量法
				BigDecimal total=new BigDecimal("1").subtract(fixedAssets.getRemainValRate().divide(new BigDecimal("100"))).multiply(fixedAssets.getAssetValue());
				BigDecimal per=total.divide(fixedAssets.getIntendWorkGross(),3,3);
				BigDecimal assetCurValue=fixedAssets.getAssetCurValue().subtract(per.multiply(depreRecord.getWorkCapacity()));
				depreRecord.setCalTime(new Date());
				depreRecord.setFixedAssets(fixedAssets);
				depreRecord.setDepreAmount(assetCurValue);
				fixedAssets.setAssetCurValue(assetCurValue);
				depreRecordService.save(depreRecord);
			}else if(method==3){//双倍余额递减折旧法
				//未实现
			}else if(method==4){//年数总和折旧法
				
			}
			fixedAssetsService.save(fixedAssets);
			setJsonString("{success:true}");
		}else{
			setJsonString("{success:false}");
		}
		
		return SUCCESS;
	}
}
