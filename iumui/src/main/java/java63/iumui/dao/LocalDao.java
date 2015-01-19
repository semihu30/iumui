package java63.iumui.dao;

import java.util.List;

public interface LocalDao {
  
  List<?> selectBigList();
  List<?> selectSmallList(int bigNo);
}
