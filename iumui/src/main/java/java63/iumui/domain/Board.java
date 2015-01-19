package java63.iumui.domain;

import java.io.Serializable;
import java.util.Date;

public class Board implements Serializable{
  private static final long serialVersionUID = 1L;
  
  protected int no;
  protected int categoryNo;
  protected String category;
  protected int writerNo;
  protected String writer;
  protected String title;
  protected String content;
  protected String targetNumber;
  protected Date startDate;
  protected Date endDate;
  protected Date regDate;
  protected int clickCount;
  protected int goodCount;
  protected int reqCount;
  protected String selectLocal;
  
  @Override
  public String toString() {
    return "Board [no=" + no + ", categoryNo=" + categoryNo + ", category="
        + category + ", writerNo=" + writerNo + ", writer=" + writer
        + ", title=" + title + ", content=" + content + ", targetNumber="
        + targetNumber + ", startDate=" + startDate + ", endDate=" + endDate
        + ", regDate=" + regDate + ", clickCount=" + clickCount
        + ", goodCount=" + goodCount + ", reqCount=" + reqCount
        + ", selectLocal=" + selectLocal + "]";
  }

  public Date getRegDate() {
    return regDate;
  }

  public void setRegDate(Date regDate) {
    this.regDate = regDate;
  }

  public int getReqCount() {
    return reqCount;
  }

  public void setReqCount(int reqCount) {
    this.reqCount = reqCount;
  }

  public int getGoodCount() {
    return goodCount;
  }

  public void setGoodCount(int goodCount) {
    this.goodCount = goodCount;
  }

  public int getWriterNo() {
    return writerNo;
  }

  public void setWriterNo(int writerNo) {
    this.writerNo = writerNo;
  }

  public int getCategoryNo() {
    return categoryNo;
  }

  public void setCategoryNo(int categoryNo) {
    this.categoryNo = categoryNo;
  }

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getWriter() {
    return writer;
  }

  public void setWriter(String writer) {
    this.writer = writer;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getTargetNumber() {
    return targetNumber;
  }

  public void setTargetNumber(String targetNumber) {
    this.targetNumber = targetNumber;
  }

  public Date getStartDate() {
    return startDate;
  }

  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }

  public Date getEndDate() {
    return endDate;
  }

  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }

  public int getClickCount() {
    return clickCount;
  }

  public void setClickCount(int clickCount) {
    this.clickCount = clickCount;
  }

  public String getSelectLocal() {
    return selectLocal;
  }

  public void setSelectLocal(String selectLocal) {
    this.selectLocal = selectLocal;
  }

}
