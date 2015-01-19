package java63.iumui.domain;

import java.io.Serializable;
import java.util.Date;

public class UserGroups implements Serializable{
  private static final long serialVersionUID = 1L;
  
  protected String gname;
  protected String gintro;
  protected Date expire;
  protected int state;
  protected int gno;
  protected int mno;
  protected int userState;
  protected String formColor;
  
	public String getGname() {
		return gname;
	}
	public void setGname(String gname) {
		this.gname = gname;
	}
	public String getGintro() {
		return gintro;
	}
	public void setGintro(String gintro) {
		this.gintro = gintro;
	}
	public Date getExpire() {
		return expire;
	}
	public void setExpire(Date expire) {
		this.expire = expire;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getGno() {
		return gno;
	}
	public void setGno(int gno) {
		this.gno = gno;
	}
	public int getMno() {
		return mno;
	}
	public void setMno(int mno) {
		this.mno = mno;
	}
	public int getUserState() {
		return userState;
	}
	public void setUserState(int userState) {
		this.userState = userState;
	}
	public String getFormColor() {
		return formColor;
	}
	public void setFormColor(String formColor) {
		this.formColor = formColor;
	}
	@Override
	public String toString() {
		return "UserGroups [gname=" + gname + ", gintro=" + gintro + ", expire="
				+ expire + ", state=" + state + ", gno=" + gno + ", mno=" + mno
				+ ", userState=" + userState + ", formColor=" + formColor + "]";
	}

}
