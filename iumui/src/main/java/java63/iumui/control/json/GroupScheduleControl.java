package java63.iumui.control.json;

import java.util.HashMap;

import java63.iumui.domain.Member;
import java63.iumui.service.GroupBoardService;
import java63.iumui.service.GroupService;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("json.groupScheduleControl")
@RequestMapping("/groupschedule")
public class GroupScheduleControl {
	static Logger log = Logger.getLogger(GroupScheduleControl.class);

	@Autowired GroupService   	   groupService;
	@Autowired GroupBoardService   groupBoardService;
	@Autowired ServletContext 		 servletContext;
	
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
	
	@RequestMapping("/thisgroupschedule")
	public Object getThisGroupSchedule (
			HttpSession session,
			int gno) throws Exception {
		
		Member loginUser = (Member) session.getAttribute("loginUser");
		
		int mno = loginUser.getMemberNo();
		
		HashMap<String,Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("schedules", groupService.getThisGroupSchedules(gno,mno));
		
		return resultMap;
	}
	
	@RequestMapping("/allgroupschedule")
	public Object getAllGroupSchedule (
			HttpSession session) throws Exception {
		
		Member loginUser = (Member) session.getAttribute("loginUser");
		
		int mno = loginUser.getMemberNo();
		
		HashMap<String,Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("schedules", groupService.getAllGroupSchedules(mno));
		
		return resultMap;
	}
	
	@RequestMapping("/newSchedule")
	public Object getAllGroups ( 
			HttpSession session,
			int gno) throws Exception {
		
		Member loginUser = (Member) session.getAttribute("loginUser");
		
		int mno = loginUser.getMemberNo();
		
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("status","success");
		System.out.println(mno);
		
		return resultMap;
	}
}
