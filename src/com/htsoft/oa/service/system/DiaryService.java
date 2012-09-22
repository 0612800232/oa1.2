package com.htsoft.oa.service.system;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.Diary;

public interface DiaryService extends BaseService<Diary>{
	
	public List<Diary> getAllBySn(PagingBean pb);
	
}


