<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>  
  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  
<html>  
    <body>  
        <%  
        String strSession = (String)request.getSession().getAttribute("strSession");  
          
        %>  
       <p>  
            	·µ»ØÄÚÈÝÎª£º<%=strSession%>  
        </p>  
    </body>  
</html> 