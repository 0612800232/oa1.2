package com.htsoft.oa.service.flow.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.jbpm.api.task.Task;

import com.htsoft.core.jbpm.pv.ParamField;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.oa.dao.flow.ProcessFormDao;
import com.htsoft.oa.dao.flow.ProcessRunDao;
import com.htsoft.oa.model.flow.FormData;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.flow.ProcessForm;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProcessRunService;

public class ProcessRunServiceImpl extends BaseServiceImpl<ProcessRun> implements ProcessRunService{
	private ProcessRunDao dao;
	@Resource
	private ProcessFormDao processFormDao;
	
	@Resource
	private JbpmService jbpmService;
	
	public ProcessRunServiceImpl(ProcessRunDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public ProcessRun getByPiId(String piId){
		return dao.getByPiId(piId);
	}
	
	/**
	 *
	 * @param proDefinition
	 * @param map
	 * @param activityName
	 */
	public void saveProcessRun(ProDefinition proDefinition,Map<String, ParamField>fieldMap,String activityName,boolean startFlow){
		Map variables=new HashMap();
		ProcessRun processRun=new ProcessRun();
		AppUser curUser=ContextUtil.getCurrentUser();
		
		Date curDate=new Date();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd-HHmmss");
		
		processRun.setSubject(proDefinition.getName()+sdf.format(curDate));
		processRun.setCreator(curUser.getFullname());
		processRun.setAppUser(curUser);
		processRun.setCreatetime(curDate);
		processRun.setProDefinition(proDefinition);

		save(processRun);
		
		ProcessForm pf=new ProcessForm();
		pf.setActivityName(activityName);
		pf.setProcessRun(processRun);

		Iterator it=fieldMap.keySet().iterator();
		
		while(it.hasNext()){
			String key=(String)it.next();
			ParamField paramField=fieldMap.get(key);
			FormData fd=new FormData(paramField);
			fd.setProcessForm(pf);
			//若后面需要启动流程，则把数据存储在variables
			if(startFlow){
				variables.put(key, fd.getValue());
			}
			
			pf.getFormDatas().add(fd);
		}
		
		processFormDao.save(pf);
		
		if(startFlow){
			//将在启动的流程中携带启动人员的相关信息
			variables.put("curUser", curUser);
			//设置流程名称
			variables.put("processName", proDefinition.getName());
			//启动流程之后，需要保存流程的实例piId，方便后面的流程跟踪
			String piId=jbpmService.startProcess(proDefinition.getDeployId(), variables);
			processRun.setPiId(piId);
			save(processRun);
		}
		
	}
	
	
	/**
	 * 完成任务，同时把数据保存至form_data表，记录该任务填写的表单数据
	 * @param piId
	 * @param transitionName
	 * @param variables
	 */
	public void saveAndNextstep(String piId,String activityName, String transitionName,Map<String, ParamField> fieldMap){
		
		String xml=jbpmService.getProcessDefintionXMLByPiId(piId);
		String nodeType=jbpmService.getNodeType(xml, activityName);
		
		ProcessRun processRun=getByPiId(piId);
		Iterator it=fieldMap.keySet().iterator();
		
		ProcessForm processForm=new ProcessForm();
		processForm.setActivityName(activityName);
		processForm.setProcessRun(processRun);
		//保存这些数据至流程运行的环境中
		Map<String,Object>variables=new HashMap<String, Object>();
		
		while(it.hasNext()){
			String key=(String)it.next();
			ParamField paramField=fieldMap.get(key);
			FormData fd=new FormData(paramField);
			fd.setProcessForm(processForm);
			//把数据存储在variables
			variables.put(key, fd.getValue());
			processForm.getFormDatas().add(fd);
		}
		//保存数据至表单中，方便后面显示
		processFormDao.save(processForm);
		
		//设置当前任务为完成状态，并且为下一任务设置新的执行人或候选人
		if("task".equals(nodeType)){
			 List<Task> taskList=jbpmService.getTasksByPiId(piId);
			 for(Task task:taskList){
				 if(activityName.equals(task.getName())){
					 try{
						 //完成此任务，同时为下一任务指定执行人
						 jbpmService.completeTask(task.getId(),transitionName,variables); 
						 break;
					 }catch(Exception ex){
						 ex.printStackTrace();
					 }
				 }
			 }
		}else{//普通节点
			//jbpmService.signalProcess(piId, signalName, reqDataMap); TODO
		}
	}

}