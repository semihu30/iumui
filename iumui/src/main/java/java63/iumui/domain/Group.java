package java63.iumui.domain;

import java.io.Serializable;
import java.util.Date;

public class Group implements Serializable{
	private static final long serialVersionUID = 1L;

	protected int gno;
	protected String name;
	protected String intro;
	protected Date expire;
	protected int state;
	protected Date dday;
	protected String schedule;
	
	@Override
	public String toString() {
		return "Group [gno=" + gno + ", name=" + name + ", intro=" + intro
				+ ", expire=" + expire + ", state=" + state + ", dday=" + dday
				+ ", schedule=" + schedule + "]";
	}
	
	public int getGno() {
		return gno;
	}
	public void setGno(int gno) {
		this.gno = gno;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIntro() {
		return intro;
	}
	public void setIntro(String intro) {
		this.intro = intro;
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
	public Date getDday() {
		return dday;
	}
	public void setDday(Date dday) {
		this.dday = dday;
	}
	public String getSchedule() {
		return schedule;
	}
	public void setSchedule(String schedule) {
		this.schedule = schedule;
	}


}
