package java63.iumui.domain;

import java.io.Serializable;
import java.util.Date;

public class BoardRequest implements Serializable{
  private static final long serialVersionUID = 1L;
  
  protected int boardNo;
  protected int memberNo;
  protected String userName;
  protected int statusNo;
  protected String statusContent;
  protected String message;
  protected Date requestDate;
  
  @Override
  public String toString() {
    return "BoardRequest [boardNo=" + boardNo + ", memberNo=" + memberNo
        + ", userName=" + userName + ", statusNo=" + statusNo
        + ", statusContent=" + statusContent + ", requestDate=" + requestDate
        + "]";
  }
  public int getStatusNo() {
    return statusNo;
  }
  public void setStatusNo(int statusNo) {
    this.statusNo = statusNo;
  }
  public String getStatusContent() {
    return statusContent;
  }
  public void setStatusContent(String statusContent) {
    this.statusContent = statusContent;
  }
  public String getUserName() {
    return userName;
  }
  public void setUserName(String userName) {
    this.userName = userName;
  }
  public int getBoardNo() {
    return boardNo;
  }
  public void setBoardNo(int boardNo) {
    this.boardNo = boardNo;
  }
  public int getMemberNo() {
    return memberNo;
  }
  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }
  public Date getRequestDate() {
    return requestDate;
  }
  public void setRequestDate(Date requestDate) {
    this.requestDate = requestDate;
  }
  
}
