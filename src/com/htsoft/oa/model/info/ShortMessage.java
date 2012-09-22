package com.htsoft.oa.model.info;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.htsoft.core.model.BaseModel;

public class ShortMessage extends BaseModel {
	
	private Long messageId;
	private String content;
	private Long senderId;
	private String sender;
    private Short msgType;
    private Date sendTime;
    private Set<InMessage> messages=new HashSet<InMessage>();
   
    public ShortMessage(){
    	
    }

    
	public Set<InMessage> getMessages() {
		return messages;
	}


	public void setMessages(Set<InMessage> messages) {
		this.messages = messages;
	}

	public Long getMessageId() {
		return messageId;
	}

	public void setMessageId(Long messageId) {
		this.messageId = messageId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getSenderId() {
		return senderId;
	}

	public void setSenderId(Long senderId) {
		this.senderId = senderId;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public Short getMsgType() {
		return msgType;
	}

	public void setMsgType(Short msgType) {
		this.msgType = msgType;
	}

	public Date getSendTime() {
		return sendTime;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}
    
}
