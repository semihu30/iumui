package java63.iumui.control.json;

import java.util.HashMap;

import java63.iumui.domain.Group;
import java63.iumui.domain.GroupMember;
import java63.iumui.domain.Member;
import java63.iumui.service.GroupService;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("json.groupControl")
@RequestMapping("/group")
public class GroupControl {
	static Logger log = Logger.getLogger(GroupControl.class);

	@Autowired GroupService   	   groupService;
	@Autowired ServletContext 		 servletContext;

	@RequestMapping("/mygroups")
	public Object mygroupList (
			@RequestParam(defaultValue="1")int pageNo,
			HttpSession session) throws Exception {
		
		HashMap<String, Object> resultMap = new HashMap<>();
		
		if((Member)session.getAttribute("loginUser") != null) {
			System.out.println("로긴되어있음");
			
			Member loginUser = (Member) session.getAttribute("loginUser");
			
			int mno = loginUser.getMemberNo();
			int maxPageNo = groupService.getMaxPageNo(mno);
			
			if (pageNo <= 0) pageNo = 1;
			if (pageNo > maxPageNo) pageNo = maxPageNo;
			
			resultMap.put("status","success");
			resultMap.put("currPageNo", pageNo);
			resultMap.put("maxPageNo", maxPageNo);
			resultMap.put("groups", groupService.getUserGroups(pageNo, mno));
			
		} else {
			
			System.out.println("로긴 안되어있음");
			return resultMap;
		}
		
		return resultMap;
	}
	
	@RequestMapping("/myallgroups")
	public Object getAllGroups ( HttpSession session ) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<>();
		
		Member loginUser = (Member) session.getAttribute("loginUser");
		
		int mno = loginUser.getMemberNo();

		resultMap.put("status","success");
		resultMap.put("groups", groupService.getAllGroups(mno));
		
		return resultMap;
	}
	
	@RequestMapping("/recommendgroups")
	public Object getRecommendGroups ( 
			HttpSession session ) throws Exception {
		
		Member loginUser = (Member) session.getAttribute("loginUser");
		
		int mno = loginUser.getMemberNo();
		
		HashMap<String,Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("recgroups", groupService.getRcommendGroups(mno));
		
		return resultMap;
	}
	
	@RequestMapping("/myschedules")
	public Object getUserSchedules ( 
			HttpSession session, 
			int dataSize) throws Exception {
		
		Member loginUser = (Member) session.getAttribute("loginUser");
		
		int mno = loginUser.getMemberNo();
		
		HashMap<String,Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("schedules", groupService.getUserSchedules(mno, dataSize));
		
		return resultMap;
	}
	
	@RequestMapping("/updateColor")
	public Object updateFormColor ( 
			HttpSession session,
			int gno,
			String color) throws Exception {
		
		Member loginUser = (Member) session.getAttribute("loginUser");
		int mno = loginUser.getMemberNo();
	
		groupService.updateColor(color, gno, mno);
		
		HashMap<String,Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		
		return resultMap;
	}
	
	@RequestMapping("/group")
	public Object loadGroupPage ( 
			HttpSession session,
			@RequestParam(defaultValue="0") int gno ) throws Exception {
		
		Member loginUser = (Member) session.getAttribute("loginUser");
		int mno = loginUser.getMemberNo();
		
		HashMap<String,Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("group", groupService.getMyGroup(gno, mno));
		
		return resultMap;
	}
	
	@RequestMapping(value="/add_group", method=RequestMethod.POST)
  public Object add_group(
      Group group) throws Exception {  
	 System.out.println(group);
	 group.setGno(groupService.getNextVal());
	  groupService.addGroup(group);
	  
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("no", group.getGno());
    
    return resultMap;
  }
	
	@RequestMapping(value="/add_group_member", method=RequestMethod.POST)
  public Object add_group_member(
      GroupMember groupMember) throws Exception {  
   
    groupService.addGroupMember(groupMember);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
	
	@RequestMapping("/delete_group")
	public Object delete_group(int no) throws Exception {
	  groupService.deleteGroup(no);
	  
	  HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
}
