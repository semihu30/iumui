package java63.iumui.service;

import java.util.HashMap;

import java63.iumui.dao.MemberDao;
import java63.iumui.domain.Member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MemberService {
	
  @Autowired 
  MemberDao memberDao;
  
  public Member validate(String email, String password) {
    HashMap<String,String> params = new HashMap<>();
    
    params.put("email", email);
    params.put("password", password);
    
    return memberDao.existUser(params);
  }
  
  public String available(String email){
    HashMap<String, String> params = new HashMap<>();
    params.put("email", email);
    
    return memberDao.checkAv(params);
    
  }// available()
  
  @Transactional(
  		rollbackFor=Exception.class,
  		propagation=Propagation.REQUIRED)
  public void add(Member member) {
  	memberDao.insert(member);
  	
  	if (member.getUserPhoto() != null) {
  		memberDao.insertPhoto(member);
  	}
  }
  
  @Transactional(
  		rollbackFor=Exception.class,
  		propagation=Propagation.REQUIRED)
  public void update(Member member) {
  	memberDao.update(member);
  }
  
  @Transactional(
  		rollbackFor=Exception.class,
  		propagation=Propagation.REQUIRED)
  public void delete(int mno) {
  	memberDao.deletePhoto(mno);
  	memberDao.delete(mno);
  }
  
  public Member get(int mno) {
  	Member member = memberDao.selectOne(mno);
  	member.setUserPhotoList(memberDao.selectPhoto(mno));
  	return member;
  }

  public Member getUserInfo(int mno) {
    Member member = memberDao.userInfo(mno);
    System.out.println("MEMBERSERVICE" + member);
    return member;
  }
  
  public String getUserInfo1(int mno) {
    String localName = memberDao.userInfo1(mno);
    System.out.println("MEMBERSERVICE : " + localName);
    
    return localName;
  }

  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void edit(Member member) {
    memberDao.edit(member);
    
    if(member.getUserPhoto() != null){
      memberDao.insertPhoto(member);      
    }
  }//edit()
  
  
  //아이디찾기
  public String FindId(String name, String birthDate, String phone) {
    HashMap<String, Object> params = new HashMap<>();
    
    params.put("name", name);
    params.put("birthDate", birthDate);
    params.put("phone", phone);
    
    return memberDao.getId(params);
    
  }
  
  //비밀번호 찾기
  public String FindPw(String name, String birthDate, String email) {
    HashMap<String, Object> params = new HashMap<>();
    
    params.put("name", name);
    params.put("birthDate", birthDate);
    params.put("email", email);
    
    return memberDao.getPw(params);
    
  }
  
  public void photoadd(Member member) {
    memberDao.insertPhoto(member);
 }
  
  public void insertPhoto(int mno, MultipartFile userPhotofile) {
    memberDao.photoadd1(mno,userPhotofile);
    
  }
  
  
}














