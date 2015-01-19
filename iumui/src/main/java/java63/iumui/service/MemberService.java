package java63.iumui.service;

import java.util.HashMap;

import java63.iumui.dao.MemberDao;
import java63.iumui.domain.Member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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
}














