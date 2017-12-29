<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>  
<%@ include file="common/cm.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  
<html> 
<head>
	 <script type="text/javascript"> 
     function testGet(){
		$.ajax({
				type : "GET",
				cache : false,
				dataType : "html",
				url : "https://192.168.1.108:7002/HttpService/servlet/helloWorld",
				data : {					
				},
				success : function(resp) {
					alert(resp);
				},
				error : function() {
					alert("失败");
				}
			});
	  }
	  
	  function testPost(){
		$.ajax({
				type : "POST",
				cache : false,
				dataType : "html",
				url : "https://192.168.1.108:7002/HttpService/servlet/helloWorld",
				data : {					
				},
				success : function(resp) {
					alert(resp);
				},
				error : function() {
					alert("失败");
				}
			});
	  }
      </script>
 </head>
 
    <body>  
        <form action="forward" method="post">  
            <table align="center">  
                <tr>  
                    <td>测试Https ajax </td>  
                    
                </tr>                    
                <tr>  
                    <td colspan="2">  
                        <input type="button" value="Get提交" onclick="testGet();"/>  
                    </td>  
                     <td colspan="2">  
                        <input type="button" value="Post提交" onclick="testPost();"/>  
                    </td>  
                </tr>  
            </table>  
        </form>  
    </body>  
</html> 