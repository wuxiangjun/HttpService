<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>  
  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  
<html>  
    <body>  
        <form action="forward" method="post">  
            <table align="center">  
                <tr>  
                    <td>类型：</td>  
                    <td> 
                    	<select name="type" >
                    		<option value="1">webservice</option>
                    		<option value="2">http-get</option>
                    		<option value="3">http-post</option>
                    		<option value="4">iframe</option>
                    		<option value="5">ajax</option>
                    	</select>
                    </td>  
                </tr>                    
                <tr>  
                    <td colspan="2">  
                        <input type="submit" value="提交"/>  
                    </td>  
                </tr>  
            </table>  
        </form>  
    </body>  
</html> 