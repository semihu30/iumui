package java63.iumui.domain;

import java.io.Serializable;

public class Category implements Serializable{
  private static final long serialVersionUID = 1L;
  
  protected int categoryNo;
  protected String category;
  
  public int getNo() {
    return categoryNo;
  }

  public void setNo(int categoryNo) {
    this.categoryNo = categoryNo;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  @Override
  public String toString() {
    return "Category [no=" + categoryNo + ", category=" + category + "]";
  }
}
