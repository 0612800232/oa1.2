package com.htsoft.oa.service.flow.impl;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import org.jbpm.api.Execution;
import org.jbpm.api.ExecutionService;
import org.jbpm.api.ProcessDefinition;
import org.jbpm.api.ProcessEngine;
import org.jbpm.api.ProcessInstance;
import org.jbpm.api.RepositoryService;
import org.jbpm.api.TaskService;
import org.jbpm.api.task.Participation;
import org.jbpm.api.task.Task;
import org.jbpm.pvm.internal.env.Environment;
import org.jbpm.pvm.internal.env.EnvironmentFactory;
import org.jbpm.pvm.internal.model.Activity;
import org.jbpm.pvm.internal.model.ExecutionImpl;
import org.jbpm.pvm.internal.model.Transition;

import com.htsoft.core.jbpm.bean.Node;
import com.htsoft.core.jbpm.pv.ParamField;
import com.htsoft.oa.model.flow.FormData;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.flow.ProUserAssign;
import com.htsoft.oa.model.flow.ProcessForm;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProDefinitionService;
import com.htsoft.oa.service.flow.ProUserAssignService;
import com.htsoft.oa.service.flow.ProcessFormService;
import com.htsoft.oa.service.flow.ProcessRunService;

public class JbpmServiceImpl implements JbpmService{
	
	private static final Log logger=LogFactory.getLog(JbpmServiceImpl.class);
	
	@Resource
	private ProcessEngine processEngine;
	
	@Resource
	private RepositoryService repositoryService;
	
	@Resource
	private ExecutionService executionService; 
	
	@Resource
	private ProDefinitionService proDefinitionService;
	
	@Resource
	private TaskService taskService;
	
	@Resource
	private ProUserAssignService proUserAssignService;
	
	
	//TODO 需要去掉该注入方式，把该运行服务转至其他
	@Resource
	private ProcessRunService processRunService;
	
	@Resource
	private ProcessFormService processFormService;
	
//	@Resource
//	private DataSource dataSource;
	
	/**
	 * 发布或更新流程定义
	 * @param proDefinition
	 * @return
	 */
	public ProDefinition saveOrUpdateDeploy(ProDefinition proDefinition){
		//添加流程定义及发布流程至Jbpm流程表中
		if(proDefinition.getDeployId()==null){
			
			String deployId=repositoryService.createDeployment().addResourceFromString("process.jpdl.xml", proDefinition.getDefXml()).deploy();
			
		    proDefinition.setDeployId(deployId);
		    
		    proDefinitionService.save(proDefinition);
		    
		}else{
			//先从数据库中移除，保证下次从数据库取出来的是旧的记录而不是Hibernate中的缓存的记录
			proDefinitionService.evict(proDefinition);
			
			ProDefinition proDef=proDefinitionService.get(proDefinition.getDefId());
			//需要比较数据库的xml文件与现在更新的xml文件是否不相同，若不相同则删除原来的发布并布新的流程
			if(!proDef.getDefXml().equals(proDefinition.getDefXml())){
				if(proDef.getDeployId()!=null){
					//不进行删除所有旧流程的东西，保留旧流程运行中的信息。repositoryService.deleteDeploymentCascade(deploymentId)
					repositoryService.deleteDeployment(proDef.getDeployId());
				}
				String deployId=repositoryService.createDeployment().addResourceFromString("process.jpdl.xml", proDefinition.getDefXml()).deploy();
			    
				proDefinition.setDeployId(deployId);
			
			}
			
			proDefinitionService.merge(proDefinition);
		}
		
		return proDefinition;
	}
	
	/**
	 * 按流程定义id取得流程定义的XML
	 * @param defId
	 * @return
	 */
	public String getDefinitionXmlByDefId(Long defId){
		ProDefinition proDefinition=proDefinitionService.get(defId);
		return proDefinition.getDefXml();
	}
	
	/**
	 * 按发布id取得流程定义的XML
	 */
	public String getDefinitionXmlByDpId(String deployId){
		ProDefinition proDefintion=proDefinitionService.getByDeployId(deployId);
		return proDefintion.getDefXml();
	}
	/**
	 * 按流程例id取得流程定义的XML
	 */
	public String getDefinitionXmlByPiId(String piId){
		ProcessInstance pi=executionService.createProcessInstanceQuery().processInstanceId(piId).uniqueResult();
		ProcessDefinition pd=repositoryService.createProcessDefinitionQuery().processDefinitionId(pi.getProcessDefinitionId()).uniqueResult();
		return getDefinitionXmlByDpId(pd.getDeploymentId());
	}
	/**
	 * 取得流程实例
	 * @param piId
	 * @return
	 */
	public ProcessInstance getProcessInstance(String piId){
		ProcessInstance pi=executionService.createProcessInstanceQuery().processInstanceId(piId).uniqueResult();
		return pi;
	}
	
	/**
	 * 通过流程定义取得所有的任务列表
	 * @param defId
	 * @return
	 */
	public List<Node>getTaskNodesByDefId(Long defId){
		ProDefinition proDefinition=proDefinitionService.get(defId);
		return getTaskNodesFromXml(proDefinition.getDefXml(),false);
	}
	
	 /**
     * 从XML文件中取得任务节点名称列表
     * @param xml
     * @param includeStart  是否包括启动节点
     * @return
     */
    private List<Node> getTaskNodesFromXml(String xml,boolean includeStart){
		List<Node> nodes=new ArrayList<Node>();
		try{
			Element root = DocumentHelper.parseText(xml).getRootElement();
			   for (Element elem : (List<Element>) root.elements()) {
		            String type = elem.getQName().getName();
		            if("task".equalsIgnoreCase(type)){
			            if (elem.attribute("name") != null) {
			               Node node=new Node(elem.attribute("name").getValue(),"任务节点");
			               nodes.add(node);
			            }
		            }else if(includeStart && "start".equalsIgnoreCase(type)){
		            	if (elem.attribute("name") != null){
		            		Node node=new Node(elem.attribute("name").getValue(),"开始节点");
				            nodes.add(node);
		            	}
		            }
		       }
		}catch(Exception ex){
			logger.error(ex.getMessage());
		}
		return nodes;
	}
    
	public String startProcess(String deployId, Map variables) {
		ProcessDefinition pd = repositoryService.createProcessDefinitionQuery().deploymentId(deployId).uniqueResult();
		//启动工作流
		ProcessInstance pi = executionService.startProcessInstanceById(pd.getId(), variables);
		
		assignTask(pi,pd);
		
		return pi.getId();
	}
	
	public void assignTask(ProcessInstance pi,ProcessDefinition pd){
		
		if(pd==null){
			pd=repositoryService.createProcessDefinitionQuery().processDefinitionId(pi.getProcessDefinitionId()).uniqueResult();
		}
		//取得当前任务的名称，然后根据该任务名称以及流程定义，查看该任务将由哪一个用户或用户组来处理比较合适
		Iterator<String> activityNames=pi.findActiveActivityNames().iterator();
		
		while(activityNames.hasNext()){
			String actName=activityNames.next();
			Task task=taskService.createTaskQuery().processInstanceId(pi.getId()).activityName(actName).uniqueResult();
			if(task!=null){//进行任务的授权用户的操作
				//取得对应的用户
				
				ProUserAssign assign=proUserAssignService.getByDeployIdActivityName(pd.getDeploymentId(), actName);
				
				if(assign!=null){
					if(StringUtils.isNotEmpty(assign.getUserId())){//用户优先处理该任务
						taskService.assignTask(task.getId(), assign.getUserId());
					}
					if(StringUtils.isNotEmpty(assign.getRoleId())){//角色中的人员成为该任务的候选人员
						taskService.addTaskParticipatingGroup(task.getId(), assign.getRoleId(), Participation.CANDIDATE);
					}
				}
			}
		}
	}
	
	/**
	 * 显示某个流程当前任务对应的所有出口
	 * @param piId
	 * @return
	 */
	 public List<Transition> getTransitionsForSignalProcess(String piId) {
	        ProcessInstance pi = executionService.findProcessInstanceById(piId);
	        EnvironmentFactory environmentFactory = (EnvironmentFactory) processEngine;
	        Environment env = environmentFactory.openEnvironment();

	        try {
	            ExecutionImpl executionImpl = (ExecutionImpl) pi;
	            Activity activity = executionImpl.getActivity();

	            return activity.getOutgoingTransitions();
	        } finally {
	            env.close();
	        }
	    }
	 
	 /*
	  * (non-Javadoc)
	  * @see com.htsoft.oa.service.flow.JbpmService#getProcessDefintionXMLByPiId(java.lang.String)
	  */
	 public String getProcessDefintionXMLByPiId(String piId){
		 ProcessRun processRun=processRunService.getByPiId(piId);
		 return processRun.getProDefinition().getDefXml();
	 }
	 
	 /**
	  * 取得某流程实例对应的任务列表
	  * @param piId
	  * @return
	  */
	 public List<Task> getTasksByPiId(String piId){
		 List<Task> taskList=taskService.createTaskQuery().processInstanceId(piId).list();
		 return taskList;
	 }
	    
    /**
	 * 取到节点类型
	 * @param xml
	 * @param nodeName
	 * @return
	 */
	public String getNodeType(String xml,String nodeName){
		String type="";
		try{
			Element root = DocumentHelper.parseText(xml).getRootElement();
			for (Element elem : (List<Element>) root.elements()){
				if(elem.attribute("name")!=null){
					String value=elem.attributeValue("name");
					if(value.equals(nodeName)){
						type = elem.getQName().getName();
						return type;
					}
				}
			}
		}catch(Exception ex){
			logger.info(ex.getMessage());
		}
		return type;
	}
	
	/**
	 * 完成任务
	 * @param taskId
	 * @param transitionName
	 * @param variables
	 */
	public void completeTask(String taskId,String transitionName,Map variables){
		Task task=taskService.getTask(taskId);
		ProcessInstance pi=executionService.createProcessInstanceQuery().processInstanceId(task.getExecutionId()).uniqueResult();
		//完成任务
		taskService.setVariables(taskId, variables);
	    taskService.completeTask(taskId, transitionName);
	    
	    //为下一任务授权
	    assignTask(pi, null);
	}
	
	/**
     * 执行下一步的流程，对于非任务节点
     * @param id processInstanceId
     * @param transitionName
     * @param variables
     */
    public void signalProcess(String executionId, String transitionName,
        Map<String, Object> variables) {
       
        executionService.setVariables(executionId,variables);
        //executionService.signalExecutionById(id);
        executionService.signalExecutionById(executionId,transitionName);
    }
    
    
    public void endProcessInstance(String piId) {
        ExecutionService executionService = processEngine
            .getExecutionService();
        executionService.endProcessInstance(piId,Execution.STATE_ENDED);
    }
	
}
