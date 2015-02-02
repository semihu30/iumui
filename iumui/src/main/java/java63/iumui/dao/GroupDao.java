package java63.iumui.dao;

import java.util.List;
import java.util.Map;
import java63.iumui.domain.Group;
import java63.iumui.domain.GroupMember;

/*
Product selectOne(int no);
void delete(int no);
List<?> selectList(Map<String,Object> params);
void insert(Product product);
void insertPhoto(Product product);
List<?> selectPhoto(int productNo);
void deletePhoto(int productNo);
*/
public interface GroupDao {
	
  List<?> selectUserGroups(Map<String,Object> params);
  List<?> selectAllGroups(int mno);
  List<?> selectMyGroup(Map<String,Object> params);
  List<?> selectRecommendedGroup(int mno);
  
  List<?> selectUserSchedules(Map<String,Object> params);
  List<?> selectThisGroupSchedules(Map<String,Object> params);
  List<?> selectAllGroupSchedules(int mno);
  
  int totalSize(int mno);
  int selectNextVal();
  
  void updateColor(Map<String,Object> params);
  void insertGroup(Group group);
  void insertGroupMember(GroupMember groupMember);
  
  void deleteGroup(int no);
  void deleteGroupMembers(int no);
  void deleteSchedules(int no);

}
