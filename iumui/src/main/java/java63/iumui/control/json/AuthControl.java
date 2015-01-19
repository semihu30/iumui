package java63.iumui.control.json;

import java.util.HashMap;

import java63.iumui.domain.Member;
import java63.iumui.service.MemberService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("json.authControl") 
@RequestMapping("/json/auth") 
public class AuthControl {
  @Autowired MemberService memberService;
  
  @RequestMapping(value="/loginUser", method=RequestMethod.GET)
  public Object loginUser(HttpSession session) throws Exception {
    HashMap<String,Object> resultMap = new HashMap<>();
    
    if (session.getAttribute("loginUser") != null) {
      resultMap.put("status", "success");
      resultMap.put("loginUser", session.getAttribute("loginUser"));
    } else {
      resultMap.put("status", "fail");
    }
    return resultMap;
  }
  
  @RequestMapping(value="/login", method=RequestMethod.POST)
  public Object login(
      String email, 
      String pwd, 
      boolean save,
      String requestUrl, /* 세션에 저장된 값을 달라고 하려면?*/
      HttpServletResponse response,
      HttpSession session) throws Exception {

    if (save) { // 쿠키로 아이디 저장
      Cookie cookie = new Cookie("email", email);
      cookie.setMaxAge(60 * 60 * 24 * 15);
      response.addCookie(cookie);
    } else {
      Cookie cookie = new Cookie("email", "");
      cookie.setMaxAge(0); // 무효화시킴
      response.addCookie(cookie);
    }
    
    Member member = memberService.validate(email, pwd);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    
    if (member != null) {
      resultMap.put("status", "success");
      session.setAttribute("loginUser", member);
    } else {
      session.invalidate();
      resultMap.put("status", "fail");
    }
    
    return resultMap;
  }
  
  @RequestMapping("/logout")
  public Object execute(HttpSession session) throws Exception {
    session.invalidate();
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    return resultMap;
  }
  
  @RequestMapping(value="/check")
  public Object check(String email) throws Exception {
    
    memberService.available(email);
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("check", memberService.available(email));
    
    System.out.println(memberService.available(email));
    
    
    return resultMap;
  }
  
  @RequestMapping(value="/add", method=RequestMethod.POST)
  public Object add(Member member) throws Exception {  
    System.out.println(member);
    
    memberService.add(member);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }

}












