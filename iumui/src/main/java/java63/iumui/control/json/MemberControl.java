package java63.iumui.control.json;

import java.io.File;
import java.util.HashMap;

import java63.iumui.dao.MemberDao;
import java63.iumui.domain.Member;
import java63.iumui.service.MemberService;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

@Controller("json.memberControl") 
@RequestMapping("/json/member") 
public class MemberControl {
	static Logger log = Logger.getLogger(MemberControl.class);
	
	@Autowired MemberDao       memberdao; 
  @Autowired MemberService   memberService;
  @Autowired ServletContext  servletContext;
  
  @RequestMapping(value="/add", method=RequestMethod.POST)
  public Object updataPhoto(Member member) throws Exception {
  	
  	if(member.getUserPhotofile() != null &&
  			!member.getUserPhotofile().isEmpty()) {
  		
  		String fileuploadRealPath = 
  				servletContext.getRealPath("/fileupload");
  		String filename = System.currentTimeMillis() + "_";
  		File file = new File(fileuploadRealPath + "/" + filename);
  		
  		member.getUserPhotofile().transferTo(file);
  		member.setUserPhoto(filename);
  	}
  	
  	memberService.add(member);
  	
  	HashMap<String, Object> resultMap = new HashMap<>();
  	resultMap.put("status","success");
  	
  	return resultMap;
  }
//파일업로드
  @RequestMapping(value="/test", method=RequestMethod.POST)
  public Object testPhoto(HttpSession session,MultipartFile userPhotofile) throws Exception {
    
    Member loginUser =  (Member)session.getAttribute("loginUser");
    
    
    //System.out.println(mno);
    
    System.out.println(userPhotofile);//org.springframework.web.multipart.commons.CommonsMultipartFile@129d4ef

    String fileuploadRealPath = 
        servletContext.getRealPath("/fileupload");
    String filename = System.currentTimeMillis() + "_"; 
    File file = new File(fileuploadRealPath + "/" + filename);

    System.out.println(file); ///home/bit/javaide/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/iumui/fileupload/1422322069827_
    System.out.println(filename); //1422322069827_
    System.out.println(userPhotofile);

    userPhotofile.transferTo(file);

    loginUser.setUserPhoto(filename); //1422322069827_

    System.out.println(file);   //home/bit/javaide/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/iumui/fileupload/1422322069827_
    System.out.println(filename);

    memberService.photoadd(loginUser);

    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");

    return resultMap;
  }
  
  
  public Object update (Member member) throws Exception {
  	memberService.update(member);
  	
  	HashMap<String, Object> resultMap = new HashMap<>();
  	resultMap.put("status", "success");
  	
  	return resultMap;
  }
  
  public Object execute(int mno) throws Exception {
  	
  	Member member = memberService.get(mno);
  	
  	HashMap<String, Object> resultMap = new HashMap<>();
  	resultMap.put("status", "success");
  	resultMap.put("member", member);
  	resultMap.put("photos", member.getUserPhotoList());
  	
  	return resultMap;
  }
  
  //회원정보 수정
  @RequestMapping("/user_info")
  public Object userInfo(HttpSession session) throws Exception {
    
    Member loginUser =  (Member)session.getAttribute("loginUser");
    
    int mno = loginUser.getMemberNo();
    Member member = memberService.getUserInfo(mno);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");    
    resultMap.put("member", member);
    
    return resultMap;
  }
  
  @RequestMapping("/user_info1")
  public Object userInfo1(HttpSession session) throws Exception {
    
    Member loginUser =  (Member)session.getAttribute("loginUser");
    
    int mno = loginUser.getMemberNo();
    String localName = memberService.getUserInfo1(mno);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");    
    resultMap.put("localName", localName);
    
    return resultMap;
  }
  
  @RequestMapping(value="/update", method=RequestMethod.POST)
  public Object edit(Member member) throws Exception {
    System.out.println(member);
    memberService.edit(member);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
  
  //아이디 찾기
  @RequestMapping(value="/findId", method=RequestMethod.POST)
  public Object findId(String name,String birthDate,String phone) throws Exception {
    memberService.FindId(name,birthDate,phone);
    HashMap<String,Object> resultMap = new HashMap<>();
    
    resultMap.put("status", "success");
    resultMap.put("check", memberService.FindId(name, birthDate, phone));
    
    System.out.println(memberService.FindId(name, birthDate, phone));
    
    return resultMap;
    
  }
  
//비밀번호 찾기
  @RequestMapping(value="/findPw", method=RequestMethod.POST)
  public Object findPw(String name,String birthDate,String email) throws Exception {
    memberService.FindPw(name,birthDate,email);
    HashMap<String,Object> resultMap = new HashMap<>();
    
    resultMap.put("status", "success");
    resultMap.put("check", memberService.FindPw(name, birthDate, email));
    
    System.out.println(memberService.FindPw(name,birthDate, email));
    
    
    return resultMap;
    
  }
  
  
  
}

