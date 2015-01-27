package java63.iumui.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class LogFilter implements Filter {
  FilterConfig filterConfig;
  
  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
    this.filterConfig = filterConfig;
  }

  @Override
  public void doFilter(ServletRequest request, ServletResponse response,
      FilterChain nextFilter) throws IOException, ServletException {
    
    //다음 필터를 실행하기 전에 해야할 일
    HttpServletRequest httpRequest = (HttpServletRequest)request;
    System.out.println(httpRequest.getRemoteAddr());
    
    //다음 필터 실행하기
    //단, 더이상 다음 필터가 없으면 톰캣 서버는 해당 서블릿을 실행한다.
    nextFilter.doFilter(request, response);
    
    
    //다음 필터를 실행한 후에 해야할 일
    System.out.println("로그필터 나가기");
    
  }

  @Override
  public void destroy() {}

}








