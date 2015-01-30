package java63.iumui.dao;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

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

  String userInfo1(int mno); //회원정보 수정(로컬주소)
  
  void edit(Member member); //회원정보 수정(수정)
  
  String getId(Map<String,Object> params); //아이디 찾기

  String getPw(Map<String, Object> params); //비밀번호 찾기

  Member photoadd1(int mno, MultipartFile userPhotofile);
  
  
}
