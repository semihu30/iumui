package java63.iumui.util;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class FileUploadHelper {
  public static Map<String,String> parse(HttpServletRequest request) 
      throws Exception {
    DiskFileItemFactory factory = new DiskFileItemFactory();
    ServletFileUpload upload = new ServletFileUpload(factory);
    List<FileItem> items = upload.parseRequest(request);
    
    HashMap<String,String> paramMap = new HashMap<>();
    String fileuploadRealPath = null;
    File file = null;
    int startNo = (int)(Math.random() * 1000);
    String filename = null;
    ServletContext application = request.getServletContext();
    
    for (FileItem item : items) {
      if (item.isFormField()) {//1) 일반 폼 데이터
        paramMap.put(item.getFieldName(), item.getString("UTF-8"));
      } else {//2) 바이너리 데이터
        fileuploadRealPath = application.getRealPath("/fileupload");
        filename = System.currentTimeMillis() + "_" + (++startNo); 
        file = new File(fileuploadRealPath + "/" + filename);
        item.write(file);
        
        paramMap.put(item.getFieldName(), filename);
      }
    }
    
    return paramMap;
  }
}







