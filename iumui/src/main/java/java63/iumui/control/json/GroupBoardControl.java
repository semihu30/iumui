package java63.iumui.control.json;

import java.util.HashMap;
import java63.iumui.domain.GroupBoard;
import java63.iumui.domain.GroupBoardComment;
import java63.iumui.domain.Member;
import java63.iumui.service.GroupBoardService;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("json.groupBoardControl")
@RequestMapping("/group_board")
public class GroupBoardControl {
	static Logger log = Logger.getLogger(GroupBoardControl.class);

	@Autowired GroupBoardService       groupBoardService;
	@Autowired ServletContext 		 servletContext;

	@RequestMapping("/board_list")
  public Object board_list(
      int no, 
      HttpSession session) throws Exception {
	  Member member = (Member)session.getAttribute("loginUser");
    HashMap<String,Object> resultMap = new HashMap<>();
    System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + member.getMemberNo());
    System.out.println("############################################" + no);
    resultMap.put("status", "success");
    resultMap.put("groupBoards", groupBoardService.getList(no, member.getMemberNo()));
    resultMap.put("loginUser", member);
    
    resultMap.put("groupBoardComments", groupBoardService.getComments(no, member.getMemberNo()));
    return resultMap;
  }

	@RequestMapping(value="/add_board", method=RequestMethod.POST)
  public Object add_board(
      GroupBoard groupBoard,
      HttpSession session) throws Exception {  
   
	  groupBoard.setGroupMemberNo(
	      groupBoardService.getGroupMemberNo(
	      groupBoard.getGroupNo(), 
	      ((Member)session.getAttribute("loginUser")).getMemberNo()));
	  
	  groupBoardService.addGroupBoard(groupBoard);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("no", groupBoard.getNo());
    
    return resultMap;
  }
	
	@RequestMapping(value="/add_comment", method=RequestMethod.POST)
  public Object add_comment(
      GroupBoardComment groupBoardComment,
      HttpSession session) throws Exception {  
   
	  groupBoardComment.setGroupMemberNo(
        groupBoardService.getGroupMemberNo(
            groupBoardComment.getGroupNo(), 
        ((Member)session.getAttribute("loginUser")).getMemberNo()));
    
    groupBoardService.addGroupBoardComment(groupBoardComment);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("no", groupBoardComment.getNo());
    
    return resultMap;
  }
	
	@RequestMapping(value="/update", method=RequestMethod.POST)
  public Object update(
      GroupBoard groupBoard,
      HttpSession session) throws Exception {  
    
    groupBoardService.updateGroupBoard(groupBoard);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("no", groupBoard.getNo());
    
    return resultMap;
  }
	
	@RequestMapping("/delete")
  public Object delete(int no) throws Exception {
	  groupBoardService.delete(no);
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
	
	@RequestMapping("/delete_group_board")
  public Object delete_group_board(int no) throws Exception {
    groupBoardService.deleteGroupBoard(no);
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
}
