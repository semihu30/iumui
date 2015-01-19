package java63.iumui.domain;

import java.io.Serializable;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

/*
    mno INTEGER NOT NULL,  회원번호 
    email VARCHAR2(50) NOT NULL,  이메일 
    pwd VARCHAR2(50) NOT NULL,  비밀번호 
    uname VARCHAR2(50) NOT NULL,  이름 
    birth VARCHAR2(50) NOT NULL,  생년월일 
    nick VARCHAR2(50),  별명 
    phone VARCHAR2(50) NOT NULL,  핸드폰 
    sex INTEGER NOT NULL,  성별 
    myphoto VARCHAR(100),  내사진 
    intro VARCHAR(100),  인사말 
    lcode VARCHAR2(50) NOT NULL  지역분류코드 
*/
public class Member implements Serializable{
  private static final long serialVersionUID = 1L;
  
  protected int            memberNo;
  protected String       	 email;
  protected String 				 password;
  protected String			   userName;
  protected String 				 userPhoto;
  protected MultipartFile  userPhotofile;
  protected List<?> 			 userPhotoList;
  protected String 			   birthDate;
  protected String 				 nickName;
  protected String 			   phone;
  protected int 					 sex;
  protected String introWord;
  protected String selectLocal;
  
  
	@Override
	public String toString() {
		return "Member [memberNo=" + memberNo + ", email=" + email + ", password="
				+ password + ", userName=" + userName + ", userPhoto=" + userPhoto
				+ ", userPhotofile=" + userPhotofile + ", userPhotoList="
				+ userPhotoList + ", birthDate=" + birthDate + ", nickName=" + nickName
				+ ", phone=" + phone + ", sex=" + sex + ", selectLocal=" + selectLocal
				+ "]";
	}

	public List<?> getUserPhotoList() {
		return userPhotoList;
	}

	public void setUserPhotoList(List<?> userPhotoList) {
		this.userPhotoList = userPhotoList;
	}

	public String getUserPhoto() {
		return userPhoto;
	}

	public void setUserPhoto(String userPhoto) {
		this.userPhoto = userPhoto;
	}

	public MultipartFile getUserPhotofile() {
		return userPhotofile;
	}

	public void setUserPhotofile(MultipartFile userPhotofile) {
		this.userPhotofile = userPhotofile;
	}

	public int getMemberNo() {
    return memberNo;
  }

  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getBirthDate() {
    return birthDate;
  }

  public void setBirthDate(String birthDate) {
    this.birthDate = birthDate;
  }

  public String getNickName() {
    return nickName;
  }

  public void setNickName(String nickName) {
    this.nickName = nickName;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public int getSex() {
    return sex;
  }

  public void setSex(int sex) {
    this.sex = sex;
  }

  public String getIntroWord() {
    return introWord;
  }

  public void setIntroWord(String introWord) {
    this.introWord = introWord;
  }

  public String getSelectLocal() {
    return selectLocal;
  }

  public void setSelectLocal(String selectLocal) {
    this.selectLocal = selectLocal;
  }
  
}
