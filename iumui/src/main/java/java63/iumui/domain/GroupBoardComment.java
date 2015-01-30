package java63.iumui.domain;

import java.io.Serializable;
import java.util.Date;

public class GroupBoardComment implements Serializable{
  private static final long serialVersionUID = 1L;
  
  protected int no;
  protected int groupBoardNo;
  protected int groupMemberNo;
  protected int groupNo;
  protected String groupName;
  protected int memberNo;
  protected String userName;
  protected String content;
  protected Date regDate;
   
  @Override
  public String toString() {
    return "GroupBoardComment [no=" + no + ", groupBoardNo=" + groupBoardNo
        + ", groupMemberNo=" + groupMemberNo + ", groupNo=" + groupNo
        + ", groupName=" + groupName + ", memberNo=" + memberNo + ", userName="
        + userName + ", content=" + content + ", regDate=" + regDate + "]";
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getGroupBoardNo() {
    return groupBoardNo;
  }
  public void setGroupBoardNo(int groupBoardNo) {
    this.groupBoardNo = groupBoardNo;
  }
  public int getGroupMemberNo() {
    return groupMemberNo;
  }
  public void setGroupMemberNo(int groupMemberNo) {
    this.groupMemberNo = groupMemberNo;
  }
  public int getGroupNo() {
    return groupNo;
  }
  public void setGroupNo(int groupNo) {
    this.groupNo = groupNo;
  }
  public String getGroupName() {
    return groupName;
  }
  public void setGroupName(String groupName) {
    this.groupName = groupName;
  }
  public int getMemberNo() {
    return memberNo;
  }
  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }
  public String getUserName() {
    return userName;
  }
  public void setUserName(String userName) {
    this.userName = userName;
  }
  public String getContent() {
    return content;
  }
  public void setContent(String content) {
    this.content = content;
  }
  public Date getRegDate() {
    return regDate;
  }
  public void setRegDate(Date regDate) {
    this.regDate = regDate;
  }
  
}
