package java63.iumui.domain;

import java.io.Serializable;


public class GroupMember implements Serializable{
  private static final long serialVersionUID = 1L;
  
  protected int     no;
  protected int     groupNo;
  protected int     memberNo;
  protected int     managerStatus;
  protected String  colorVal;
  
  @Override
  public String toString() {
    return "GroupMember [no=" + no + ", groupNo=" + groupNo + ", memberNo="
        + memberNo + ", managerStatus=" + managerStatus + ", colorVal="
        + colorVal + "]";
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getGroupNo() {
    return groupNo;
  }
  public void setGroupNo(int groupNo) {
    this.groupNo = groupNo;
  }
  public int getMemberNo() {
    return memberNo;
  }
  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }
  public int getManagerStatus() {
    return managerStatus;
  }
  public void setManagerStatus(int managerStatus) {
    this.managerStatus = managerStatus;
  }
  public String getColorVal() {
    return colorVal;
  }
  public void setColorVal(String colorVal) {
    this.colorVal = colorVal;
  }
  
}
