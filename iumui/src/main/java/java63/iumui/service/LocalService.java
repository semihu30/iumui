package java63.iumui.service;

import java.util.List;
import java63.iumui.dao.LocalDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/* Service 컴포넌트의 역할
 * => 비즈니스 로직 수행
 * => 트랜잭션 관리
 */

@Service
public class LocalService {
  @Autowired
  LocalDao localDao;
  
  public List<?> getBigList() {
   
    return localDao.selectBigList();
  }
  
  public List<?> getSmallList(int bigNo) {
    
    return localDao.selectSmallList(bigNo);
  }
  
  public String getMyBigZone(int memberNo) {
    
    return localDao.selectMyBigZone(memberNo);
  }
  
  public String getMySmallZone(int memberNo) {
    
    return localDao.selectMySmallZone(memberNo);
  }
  
  /*
  public int getMaxPageNo(int pageSize) {
    int totalSize = boardDao.totalSize();
    int maxPageNo = totalSize / pageSize;
    if ((totalSize % pageSize) > 0) maxPageNo++;
    
    return maxPageNo;
  }
  */
  /* @Transactional 선언
   * => 메서드 안의 입력/변경/삭제(manipluation) 작업을 하나의 작업을 묶는다.
   * => 모든 작업이 성공했을 때만 서버에 반영한다. 
   */
  
}
















