package com.htsoft.oa.action.flow;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.velocity.app.VelocityEngine;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;
import org.jbpm.api.task.Task;
import org.jbpm.pvm.internal.model.Transition;
import org.springframework.ui.velocity.VelocityEngineUtils;

import com.htsoft.core.jbpm.pv.ParamField;

import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.XmlUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.flow.Transform;
import com.htsoft.oa.service.flow.FormDataService;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProDefinitionService;
import com.htsoft.oa.service.flow.ProcessRunService;

import flexjson.JSONSerializer;

public class ProcessActivityAction extends BaseAction{
	@Resource
	private ProDefinitionService proDefinitionService;
	@Resource
	private ProcessRunService processRunService;
	
	@Resource
	private JbpmService jbpmService;
	
	@Resource
	private FormDataService formDataService;
	
	@Resource
	VelocityEngine velocityEngine;
	
	private String activityName;
	
	private Long runId;
	
	/**
	 * 流程实例ID
	 */
	private String piId;

	public String getPiId() {
		return piId;
	}

	public void setPiId(String piId) {
		this.piId = piId;
	}

	public Long getRunId() {
		return runId;
	}

	public void setRunId(Long runId) {
		this.runId = runId;
	}

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}
	
	/**
	 * 流程的定义ID
	 */
	private Long defId;

	public Long getDefId() {
		return defId;
	}

	public void setDefId(Long defId) {
		this.defId = defId;
	}

	/**
	 * 显示某个流程的任务表单信息
	 * @return
	 * @throws Exception
	 */
	public String get() throws Exception {
		//流程名称
		String processName=null;
		if(defId!=null){
			ProDefinition proDefinition=proDefinitionService.get(defId);
			processName=proDefinition.getName();
		}else if(piId!=null){
			ProcessRun processRun=processRunService.getByPiId(piId);
			processName=processRun.getProDefinition().getName();
			runId=processRun.getRunId();
		}

		String tempLocation="/form/"+ processName+"/" + activityName+ ".vm";
		
		Map model=new HashMap();
		
		if(runId!=null){
			Map formDataMap=formDataService.getFromDataMap(runId, activityName);
			model.putAll(formDataMap);
		}
		model.put("curUser", ContextUtil.getCurrentUser());
		String formUiJs=VelocityEngineUtils.mergeTemplateIntoString(velocityEngine,tempLocation , "UTF-8", model);
		
		logger.info("formUIJs:" + formUiJs);
		
		setJsonString("{success:true,data:"+formUiJs+"}");
		
		return SUCCESS;
	}
	
	/**
	 * 保存申请
	 */
	public String save(){
		
		logger.info("save the Process Run Information");
		
		Map fieldMap=constructFieldMap();
		
		if(defId!=null){//添加流程申请
			ProDefinition proDefinition=proDefinitionService.get(defId);
			processRunService.saveProcessRun(proDefinition, fieldMap, activityName,false);
		}else{//更新流程申请
			//TODO
			//ProcessRun processRun=processRunService.get(runId);
			
		}
		
		setJsonString("{success:true}");
		return SUCCESS;
	}
	/**
	 * 保存申请并启动流程
	 * @return
	 */
	public String start(){
		
		logger.info("start the Process Run Information");
		
		ProDefinition proDefinition=proDefinitionService.get(defId);
		
		Map fieldMap=constructFieldMap();
		
		processRunService.saveProcessRun(proDefinition, fieldMap, activityName,true);
		
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 下一步
	 * @return
	 */
	public String next(){

		String signalName=getRequest().getParameter("signalName");
		
		String xml=jbpmService.getProcessDefintionXMLByPiId(piId);
		
		String nodeType=jbpmService.getNodeType(xml, activityName);
		
		//完成当前任务
		Map<String, ParamField> fieldMap=constructFieldMap();
		
		processRunService.saveAndNextstep(piId,activityName,signalName,fieldMap);
		
		setJsonString("{success:true}");
		
		return SUCCESS;
	}
	
	/**
	 * 取得当前任务所有出口
	 * @return
	 */
	public String trans(){
		List<Transition> trans=jbpmService.getTransitionsForSignalProcess(piId);
		List<Transform>allTrans=new ArrayList<Transform>();
		
		for(Transition tran:trans){
			allTrans.add(new Transform(tran));
		}
		
		JSONSerializer serializer=JsonUtil.getJSONSerializer();
		String result=serializer.serialize(allTrans);
		logger.info("result:" + result);
		setJsonString("{success:true,data:"+result+"}");
		return SUCCESS;
	}
	
	/**
	 * 构建提交的流程或任务对应的表单信息字段
	 * @return
	 */
	protected Map<String, ParamField> constructFieldMap(){
		HttpServletRequest request=getRequest();
		
		String processName=null;
		if(defId!=null){
			ProDefinition proDefinition=proDefinitionService.get(defId);
			processName=proDefinition.getName();
		}else if(piId!=null){
			ProcessRun processRun=processRunService.getByPiId(piId);
			processName=processRun.getProDefinition().getName();			
		}
	
		String fieldsXmlLoaction="velocity/form/"+ processName+"/" + activityName + "-fields.xml";
		Map<String,ParamField>map=new HashMap<String, ParamField>();
		try{
			InputStream is=Thread.currentThread().getContextClassLoader().getResourceAsStream(fieldsXmlLoaction);
			Document doc=XmlUtil.load(is);
			Element fields=doc.getRootElement();
			List<Element> els = fields.elements();
			for(Element el:els){
				String name=el.attribute("name").getValue();
				
				Attribute attLabel = el.attribute("label");
				Attribute attType = el.attribute("type");
				Attribute attLength = el.attribute("length");
				
				String label=attLabel==null?name:attLabel.getValue();
				String type=attType==null?ParamField.FIELD_TYPE_VARCHAR:attType.getValue();
				Integer length=attLength==null?0:new Integer(attLength.getValue());
				
				ParamField pf=new ParamField(name,type,label,length);
				
				String value=request.getParameter(name);
				pf.setValue(value);
				
				map.put(name, pf);
			}
		}catch(Exception ex){
			logger.error("error when read the file from " + activityName + "-fields.xml: " + ex.getMessage());
		}
		
		return map;
	}
	
	
	
}
