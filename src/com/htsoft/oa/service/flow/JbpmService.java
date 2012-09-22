package com.htsoft.oa.service.flow;

import java.util.List;
import java.util.Map;

import org.jbpm.api.ProcessInstance;
import org.jbpm.api.task.Task;
import org.jbpm.pvm.internal.model.Transition;

import com.htsoft.core.jbpm.bean.Node;
import com.htsoft.oa.model.flow.ProDefinition;

public interface JbpmService {

	/**
	 * 取得任务节点
	 * @param defId
	 * @return
	 */
	public List<Node>getTaskNodesByDefId(Long defId);
	
	/**
	 * 
	 * @param defId
	 * @return
	 */
	public String getDefinitionXmlByDefId(Long defId);
	/**
	 * 按发布id取得流程定义
	 * @return
	 */
	public String getDefinitionXmlByDpId(String deployId);
	/**
	 * 按流程实例ID取得流程定义
	 * @param piId
	 * @return
	 */
	public String getDefinitionXmlByPiId(String piId);
	
	/**
	 * 取得流程实例
	 * @param piId
	 * @return
	 */
	public ProcessInstance getProcessInstance(String piId);
	
	
	/**
	 * 发布或更新流程定义
	 * @param proDefinition
	 * @return
	 */
	public ProDefinition saveOrUpdateDeploy(ProDefinition proDefinition);
	
	/**
	 * 启动工作流，并返回流程实例id
	 * @param deployId
	 * @param variables
	 * @return
	 */
	public String startProcess(String deployId,Map variables);
	
	/**
	 * 显示某个流程当前任务对应的所有出口
	 * @param piId
	 * @return
	 */
	 public List<Transition> getTransitionsForSignalProcess(String piId);
	 
	/**
	 * 取到节点类型
	 * 
	 * @param xml
	 * @param nodeName
	 * @return
	 */
	public String getNodeType(String xml, String nodeName);
	
	/**
	 * 通过流程定义实例ID取得流程对应的XML
	 * @param piId
	 * @return
	 */
	public String getProcessDefintionXMLByPiId(String piId);
	
	/**
	  * 取得某流程实例对应的任务列表
	  * @param piId
	  * @return
	  */
	 public List<Task> getTasksByPiId(String piId);
	 
	/**
	 * 完成任务，
	 * @param taskId 任务ID
	 * @param transitionName　下一步的转换名称
	 * @param variables　流程的附加数据
	 */
	 public void completeTask(String taskId,String transitionName,Map variables);
	 
	/**
	 * 执行普通任务节点下一步
	 * @param executionId
	 * @param transitionName
	 * @param variables
	 */
	public void signalProcess(String executionId, String transitionName, Map<String, Object> variables);
	
	/**
	 * 结束流程实例
	 * @param piId
	 */
	public void endProcessInstance(String piId);
}
