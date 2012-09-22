package com.htsoft.oa.action.customer;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.customer.Customer;
import com.htsoft.oa.service.customer.CustomerService;
/**
 * 
 * @author csx
 *
 */
public class CustomerAction extends BaseAction{
	@Resource
	private CustomerService customerService;
	private Customer customer;
	
	private Long customerId;

	private String customerNo;
	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public String getCustomerNo() {
		return customerNo;
	}

	public void setCustomerNo(String customerNo) {
		this.customerNo = customerNo;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<Customer> list= customerService.getAll(filter);
		
		Type type=new TypeToken<List<Customer>>(){}.getType();
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
				customerService.remove(new Long(id));
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
		Customer customer=customerService.get(customerId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(customer));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		boolean pass = false;
		StringBuffer buff = new StringBuffer("{");
		if(customer.getCustomerNo()!=null&&!"".equals(customer.getCustomerNo())){
			if(customer.getCustomerId()==null){//新增客户时的验证
				if(customerService.checkCustomerNo(customer.getCustomerNo())){
					if(customer.getCustomerName()!=null&&!"".equals(customer.getCustomerName())){
						if(customer.getCustomerManager()!=null&&!"".equals(customer.getCustomerManager())){
							if(customer.getPhone()!=null&&!"".equals(customer.getPhone())){
								if(customer.getIndustryType()!=null&&!"".equals(customer.getIndustryType())){
									if(customer.getCustomerSource()!=null&&!"".equals(customer.getCustomerSource())){
										pass = true;
									}else buff.append("msg:'客户来源不能为空.',");
								}else buff.append("msg:'客户所属行业不能为空.',");
							}else buff.append("msg:'客户联系电话不能为空.',");
						}else buff.append("msg:'客户经理不能为空.',");
					}else buff.append("msg:'客户名称不能为空.',");
				}else buff.append("msg:'客户已存在,请重新填写.',rewrite:true,");
			}else{//修改已有客户时不用检测客户号,但也要验证必填信息
				if(customer.getCustomerName()!=null&&!"".equals(customer.getCustomerName())){
					if(customer.getCustomerManager()!=null&&!"".equals(customer.getCustomerManager())){
						if(customer.getPhone()!=null&&!"".equals(customer.getPhone())){
							if(customer.getIndustryType()!=null&&!"".equals(customer.getIndustryType())){
								if(customer.getCustomerSource()!=null&&!"".equals(customer.getCustomerSource())){
									pass = true;
								}else buff.append("msg:'客户来源不能为空.',");
							}else buff.append("msg:'客户所属行业不能为空.',");
						}else buff.append("msg:'客户联系电话不能为空.',");
					}else buff.append("msg:'客户经理不能为空.',");
				}else buff.append("msg:'客户名称不能为空.',");
			}//end else
		}else buff.append("msg:'客户号不能为空.',");
		
		if(pass){
			customerService.save(customer);
			buff.append("success:true,customerId:"+customer.getCustomerId()+"}");
		}else{
			buff.append("failure:true}");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	/**
	 * 系统按时间生成客户编号给用户
	 * @return
	 */
	public String number(){
		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss-SSS");
		String customerNo = date.format(new Date());
		setJsonString("{success:true,customerNo:'"+customerNo+"'}");
		return SUCCESS;
	}
	
	/**
	 * 验证客户编号是否可用
	 * @return
	 */
	public String check(){
		boolean pass = false;
		pass = customerService.checkCustomerNo(customerNo);
		if(pass){
			setJsonString("{success:true,pass:true}");
		}else{
			setJsonString("{success:true,pass:false}");
		}
		return SUCCESS;
	}
}
