package com.htsoft.oa.action.system;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.Company;
import com.htsoft.oa.service.system.CompanyService;


public class CompanyAction extends BaseAction{

	private Company company;

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}
	
	@Resource
	private CompanyService companyService;
	
	
	public String list(){
		Date date = null;
		
		List<Company> list = companyService.findCompany();
		company = list.get(0);
		System.out.println(company.getSetup());
		
//		SimpleDateFormat formate=new SimpleDateFormat("yyyy-MM-dd");
//		String str=formate.format(company.getSetup());
//		System.out.println(str);
		
		Gson gson = new Gson();
		StringBuffer cf = new StringBuffer("{success:true,result:[");
		cf.append(gson.toJson(company));
		cf.append("]}");
		System.out.print(cf.toString());
		setJsonString(cf.toString());
		return SUCCESS;

	}

	public String add(){
		System.out.println(company.getSetup());
		companyService.save(company);
		setJsonString("{success:true}");
		return SUCCESS;
	}

}
