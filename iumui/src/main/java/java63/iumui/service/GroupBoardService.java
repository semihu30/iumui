package java63.iumui.service;

import java.util.HashMap;
import java.util.List;
import java63.iumui.dao.GroupBoardDao;
import java63.iumui.domain.GroupBoard;
import java63.iumui.domain.GroupBoardComment;

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
  public List<?> getList(int groupNo, int memberNo) {
    HashMap<String,Object> paramMap = new HashMap<>();
    
    paramMap.put("groupNo", groupNo);
    paramMap.put("memberNo", memberNo);
    return groupBoardDao.selectList(paramMap);
  }
  
  public List<?> getComments(int groupNo, int memberNo) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("groupNo", groupNo);
    paramMap.put("memberNo", memberNo);
    return groupBoardDao.selectComments(paramMap);
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
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void addGroupBoardComment(GroupBoardComment groupBoardComment) {
    groupBoardDao.insertGroupBoardComment(groupBoardComment);
  }
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void updateGroupBoard(GroupBoard groupBoard) {
    groupBoardDao.updateGroupBoard(groupBoard);
  }

  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void delete(int groupBoardNo) {
    groupBoardDao.deleteFiles(groupBoardNo);
    groupBoardDao.deleteComments(groupBoardNo);
    groupBoardDao.delete(groupBoardNo);
  }
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void deleteGroupBoard(int groupNo) {
    groupBoardDao.deleteGroupFiles(groupNo);
    groupBoardDao.deleteGroupComments(groupNo);
    groupBoardDao.deleteGroupBoard(groupNo);
  }
}