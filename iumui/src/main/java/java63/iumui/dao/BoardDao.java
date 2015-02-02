package java63.iumui.dao;

import java.util.List;
import java.util.Map;

import java63.iumui.domain.Board;
import java63.iumui.domain.BoardComment;

/*
Product selectOne(int no);
void update(Product product);
void delete(int no);
List<?> selectList(Map<String,Object> params);
void insert(Product product);
void insertPhoto(Product product);
List<?> selectPhoto(int productNo);
void deletePhoto(int productNo);
int totalSize();
*/
public interface BoardDao {
  List<?> selectAllList();
  List<?> selectList(Map<String,Object>paramMap);
  List<?> selectRecommendedGroup(Map<String,Object> params);
  //
  //void delete(int no);
  
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
  int totalSize(Map<String,Object>paramMap);
  int selectMessageCount(int no);
  List<?> selectMessage(int no);
  
  void recommend(Map<String,Object>paramMap);
  void request(Map<String,Object>paramMap);
  void requestAccept(Map<String,Object>paramMap);
  void requestReject(Map<String,Object>paramMap);
  void updateClick(int no);
}
