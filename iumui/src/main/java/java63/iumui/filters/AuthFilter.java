package java63.iumui.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class AuthFilter implements Filter {

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {}

  @Override
  public void doFilter(
      ServletRequest req, 
      ServletResponse resp,
      FilterChain nextFilter) throws IOException, ServletException {
    HttpServletRequest request = (HttpServletRequest)req;
    HttpServletResponse response = (HttpServletResponse)resp;

    if (!request.getServletPath().startsWith("/auth") &&
        request.getSession().getAttribute("loginUser") == null) {
      
      request.getSession().setAttribute("requestUrl", 
          request.getRequestURL() + "?" + request.getQueryString());
      
      response.sendRedirect(
          request.getServletContext().getContextPath() // => /iumui
          + "/auth/login.do");
      return;
      
    } else {
      nextFilter.doFilter(request, response);
    }
    
  }

  @Override
  public void destroy() {}

 

}










