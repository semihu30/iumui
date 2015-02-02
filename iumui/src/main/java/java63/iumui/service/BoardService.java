package java63.iumui.service;

import java.util.HashMap;
import java.util.List;

import java63.iumui.dao.BoardDao;
import java63.iumui.domain.Board;
import java63.iumui.domain.BoardComment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardService {
  @Autowired BoardDao boardDao;
  
  public List<?> getList(int categoryNo, int pageNo, int pageSize, String boardSearchText, String boardSelectLocal) {
   
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("categoryNo", categoryNo);
    //paramMap.put("startIndex", ((pageNo - 1) * pageSize));
    paramMap.put("pageNo", pageNo);
    paramMap.put("pageSize", pageSize);
    boardSearchText = "%" + boardSearchText + "%";
    
    paramMap.put("boardSearchText", boardSearchText);
    paramMap.put("boardSelectLocal", boardSelectLocal);
    
    return boardDao.selectList(paramMap);
  }
  
  public List<?> getRcommendGroups (int mno,int startIndex) {
  	
  	HashMap<String,Object> paramMap = new HashMap<>();
  	paramMap.put("mno", mno);
  	paramMap.put("startIndex", startIndex);
  	
  	return boardDao.selectRecommendedGroup(paramMap);
  }
  
  public int getMaxPageNo(int no, int pageSize, String boardSearchText, String boardSelectLocal) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("categoryNo", no);
    
    boardSearchText = "%" + boardSearchText + "%";
    
    paramMap.put("boardSearchText", boardSearchText);
    paramMap.put("boardSelectLocal", boardSelectLocal);
        
    System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+no + "@@@@@@@@@@@@@@"+boardSearchText+"@@@@@@@@@@@" + boardSelectLocal);
    int totalSize = boardDao.totalSize(paramMap);
    System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+totalSize);
    int maxPageNo = totalSize / pageSize;
    if ((totalSize % pageSize) > 0) maxPageNo++;
    
    return maxPageNo;
  }
  
  public int getMessageCount(int memberNo) {
    int messageCount = boardDao.selectMessageCount(memberNo);
    
    return messageCount;
  }
  
  public List<?> getMessage(int memberNo) {
    
    return boardDao.selectMessage(memberNo);
  }
  
  public List<?> getAllList() {
    
    return boardDao.selectAllList();
  }
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void add(Board board) {
    boardDao.insert(board); 
  }
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public Board get(int boardNo) {
    Board board = boardDao.selectOne(boardNo);
    boardDao.updateClick(boardNo);
    
    return board;
  }
  
  public List<?> getComments(int boardNo) {
    
    return boardDao.selectComments(boardNo);
  }
  
public List<?> getRequests(int boardNo) {
    
    return boardDao.selectRequests(boardNo);
  }
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void addComment(BoardComment boardComment) {
    boardDao.insertComment(boardComment); 
  }
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void update(Board board) {
    boardDao.update(board);
  }
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void delete(int boardNo) {
    boardDao.deleteRequests(boardNo);
    boardDao.deleteRecommends(boardNo);
    boardDao.deleteComments(boardNo);
    boardDao.delete(boardNo);
  }

  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void recommend(int boardNo, int memberNo) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("boardNo", boardNo);
    paramMap.put("memberNo", memberNo);
    
    boardDao.recommend(paramMap);
  }
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void request(int boardNo, int memberNo) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("boardNo", boardNo);
    paramMap.put("memberNo", memberNo);
    
    boardDao.request(paramMap);
  }
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void requestAccept(int boardNo, int memberNo) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("boardNo", boardNo);
    paramMap.put("memberNo", memberNo);
    
    boardDao.requestAccept(paramMap);
  }
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void requestReject(int boardNo, int memberNo) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("boardNo", boardNo);
    paramMap.put("memberNo", memberNo);
    
    boardDao.requestReject(paramMap);
  }
}
