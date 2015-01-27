package java63.iumui.domain;

import java.io.Serializable;
import java.util.Date;


public class GroupBoard implements Serializable{
  private static final long serialVersionUID = 1L;
  
  protected int no;
  protected int groupMemberNo;
  protected int groupNo;
  protected String groupName;
  protected int memberNo;
  protected String userName;
  protected String intro;
  protected String content;
  protected Date regDate;
  
  @Override
  public String toString() {
    return "GroupBoard [no=" + no + ", groupMemberNo=" + groupMemberNo
        + ", groupNo=" + groupNo + ", groupName=" + groupName + ", memberNo="
        + memberNo + ", userName=" + userName + ", intro=" + intro
        + ", content=" + content + ", regDate=" + regDate + "]";
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
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
  public String getIntro() {
    return intro;
  }
  public void setIntro(String intro) {
    this.intro = intro;
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
