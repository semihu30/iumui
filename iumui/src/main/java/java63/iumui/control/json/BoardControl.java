package java63.iumui.control.json;

import java.util.HashMap;
import java63.iumui.domain.Board;
import java63.iumui.domain.BoardComment;
import java63.iumui.domain.Member;
import java63.iumui.service.BoardService;
import java63.iumui.service.CategoryService;
import java63.iumui.service.LocalService;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("json.boardControl")
@RequestMapping("/json/board")
public class BoardControl {
  static Logger log = Logger.getLogger(BoardControl.class);
  static final int PAGE_DEFAULT_SIZE = 5;
  
  @Autowired BoardService     boardService;
  @Autowired CategoryService     categoryService;
  @Autowired LocalService     localService;
  @Autowired ServletContext servletContext;
  
    
  @RequestMapping("/list_all")
  public Object listAll() throws Exception {
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");    
    
    resultMap.put("mainDisplay", categoryService.getMainDisplay());
    
    return resultMap; 
  }
  
  @RequestMapping("/list")
  public Object list(
      @RequestParam(defaultValue="1") int no,
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize) throws Exception {
    
    if (pageSize <= 0)
      pageSize = PAGE_DEFAULT_SIZE;
    
    int maxPageNo = boardService.getMaxPageNo(no, pageSize);
    
    if (pageNo <= 0) pageNo = 1;
    if (pageNo > maxPageNo) pageNo = maxPageNo;
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");    
    
    resultMap.put("currPageNo", pageNo);
    resultMap.put("maxPageNo", maxPageNo);
    
    resultMap.put("category", categoryService.getCategory());
    resultMap.put("board", boardService.getList(no, pageNo, pageSize));
    
    return resultMap;
  }
  
  @RequestMapping(value="/add", method=RequestMethod.POST)
  public Object add(
      Board board,
      HttpSession session ) throws Exception {  
    board.setWriterNo(((Member)session.getAttribute("loginUser")).getMemberNo());
    boardService.add(board);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
  
  @RequestMapping("/local_big")
  public Object local_big() throws Exception {
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("local_big", localService.getBigList());
    
    return resultMap;
  }
  
  @RequestMapping("/local_small")
  public Object local_small(
      @RequestParam(defaultValue="1") int no) throws Exception {
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("local_small", localService.getSmallList(no));
    
    
    return resultMap;
  }

  @RequestMapping("/view")
  public Object view(int no, Model model) throws Exception {
    Board board = boardService.get(no);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("board", board);
    resultMap.put("boardComments", boardService.getComments(no));
    return resultMap;
  }
  
  
  @RequestMapping(value="/comment_add", method=RequestMethod.POST)
  public Object comment_add(
      BoardComment boardComment,
      HttpSession session ) throws Exception {  
    boardComment.setMemberNo(((Member)session.getAttribute("loginUser")).getMemberNo());
    boardService.addComment(boardComment);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
  
  @RequestMapping("/update")
  public Object update(Board board) throws Exception {
    boardService.update(board);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    return resultMap;
  }
  
  @RequestMapping("/delete")
  public Object delete(int no) throws Exception {
    boardService.delete(no);
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
  
  @RequestMapping("/recommend")
  public Object recommend(int no, 
      HttpSession session) throws Exception {
    boardService.recommend(no, ((Member)session.getAttribute("loginUser")).getMemberNo());
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
  
  @RequestMapping("/request")
  public Object request(int no, 
      HttpSession session) throws Exception {
    boardService.request(no, ((Member)session.getAttribute("loginUser")).getMemberNo());
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
}












