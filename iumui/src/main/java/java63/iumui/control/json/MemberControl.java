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

@Controller("json.memberControl") 
@RequestMapping("/json/member") 
public class MemberControl {
	static Logger log = Logger.getLogger(MemberControl.class);
	
	@Autowired MemberDao memberdao; 
  @Autowired MemberService memberService;
  @Autowired ServletContext servletContext;
  
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
    System.out.println(mno);
    Member member = memberService.getUserInfo(mno);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");    
    resultMap.put("member", member);
    
    return resultMap;
  }
  
  
  
}












