package java63.iumui.service;

import java.util.HashMap;
import java.util.List;
import java63.iumui.dao.GroupDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupService {
	
  @Autowired GroupDao groupDao;
  
  public List<?> getUserGroups(int pageNo, int mno) {
  	HashMap<String,Object> paramMap = new HashMap<>();
  	paramMap.put("startIndex", ((pageNo - 1) * 6));
  	paramMap.put("mno", mno);
  	
  	return groupDao.selectUserGroups(paramMap);
  }
  
  public int getAllGroups(int mno) {
  	return mno;
  }
  
  public int getMaxPageNo(int mno) {
  	int totalSize = groupDao.totalSize(mno);
  	int maxPageNo = totalSize / 6;
  	if ((totalSize % 6) > 0) maxPageNo++;
  	
  	return maxPageNo;
  }
  
  public List<?> getUserSchedules (int mno, int dataSize) {
  	
  	HashMap<String,Object> paramMap = new HashMap<>();
  	paramMap.put("mno", mno);
  	paramMap.put("dataSize", dataSize);
  	
  	
  	return groupDao.selectUserSchedules(paramMap);
  }
}