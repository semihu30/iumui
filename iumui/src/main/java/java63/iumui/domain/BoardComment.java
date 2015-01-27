package java63.iumui.domain;

import java.io.Serializable;
import java.util.Date;

public class BoardComment implements Serializable{
  private static final long serialVersionUID = 1L;
  
  protected int no;
  protected int boardNo;
  protected int memberNo;
  protected String userName;
  protected String comment;
  protected Date commentRegDate;
  
  @Override
  public String toString() {
    return "BoardComment [no=" + no + ", boardNo=" + boardNo + ", memberNo="
        + memberNo + ", userName=" + userName + ", comment=" + comment
        + ", commentRegDate=" + commentRegDate + "]";
  }
  public int getMemberNo() {
    return memberNo;
  }
  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }
  public Date getCommentRegDate() {
    return commentRegDate;
  }
  public void setCommentRegDate(Date commentRegDate) {
    this.commentRegDate = commentRegDate;
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getBoardNo() {
    return boardNo;
  }
  public void setBoardNo(int boardNo) {
    this.boardNo = boardNo;
  }
  public String getUserName() {
    return userName;
  }
  public void setUserName(String userName) {
    this.userName = userName;
  }
  public String getComment() {
    return comment;
  }
  public void setComment(String comment) {
    this.comment = comment;
  }
  
}
