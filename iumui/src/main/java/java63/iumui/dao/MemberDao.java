package java63.iumui.dao;

import java.util.List;
import java.util.Map;
import java63.iumui.domain.Member;

public interface MemberDao {
	
  Member existUser(Map<String,String> params);
  
  Member selectOne(int no);
  
  String checkAv(Map<String,String> params);
  
  void insert(Member member);
  
  void insertPhoto(Member member);
  
  void update(Member member);
  
  void delete(int no);
  
  List<?> selectPhoto(int mno);
  
  void deletePhoto(int mno);
  
  int totalSize();

  Member userInfo(int mno); //회원정보 수정
  
  
}
