package java63.iumui.dao;

import java.util.List;
import java.util.Map;
import java63.iumui.domain.GroupBoard;


public interface GroupBoardDao {
  
  List<?> selectList(int no);
  List<?> selectComments(int no);
  int selectGroupMemberNo(Map<String,Object>paramMap);
  void insertGroupBoard(GroupBoard groupBoard);
  /*
  List<?> selectAllList();
  List<?> selectList(Map<String,Object>paramMap);
  
  void insert(Board board);
  Board selectOne(int no);
  List<?> selectComments(int boardNo);
  List<?> selectRequests(int boardNo);
  
  void insertComment(BoardComment boardComment);
  void update(Board board);
  void delete(int no);
  void deleteComments(int no);
  void deleteRequests(int no);
  void deleteRecommends(int no);
  int totalSize(int no);
  int selectMessageCount(int no);
  List<?> selectMessage(int no);
  
  void recommend(Map<String,Object>paramMap);
  void request(Map<String,Object>paramMap);
  void requestAccept(Map<String,Object>paramMap);
  void requestReject(Map<String,Object>paramMap);
  void updateClick(int no);
  */
}
