package java63.iumui.service;

import java.util.HashMap;
import java.util.List;

import java63.iumui.dao.GroupBoardDao;
import java63.iumui.domain.GroupBoard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GroupBoardService {
	
  @Autowired GroupBoardDao groupBoardDao;
  

  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public List<?> getList(int groupNo) {
    
    return groupBoardDao.selectList(groupNo);
  }
  
  public List<?> getComments(int groupNo) {
    
    return groupBoardDao.selectComments(groupNo);
  }
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public int getGroupMemberNo(int groupNo, int memberNo) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("groupNo", groupNo);
    paramMap.put("memberNo", memberNo);
    
    return groupBoardDao.selectGroupMemberNo(paramMap);
  }
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void addGroupBoard(GroupBoard groupBoard) {
    groupBoardDao.insertGroupBoard(groupBoard);
  }
 
}