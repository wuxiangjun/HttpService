package cn.com.dhcc.test;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.namespace.QName;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

/**   
 * @Project: [HttpService] 
 * @Title:   [HttpServiceServlet.java]
 * @Package: [cn.com.dhcc.test] 
 * @Description: []
 * @author:  [UserWxj]
 * @date:    [2017-9-13 上午10:29:18]
 * @version: [V1.0]  
 */
@SuppressWarnings("deprecation")
public class ForwardServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Constructor of the object.
	 */
	public ForwardServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		
		response.setContentType("text/xml;charset=UTF-8");
		
		
		String type = request.getParameter("type"); 
		
		
		
        if(type!=null && !type.equals(""))  {  
            if(type.equals("1")) {  
            	
            	URL url = null;
        		try {
        			URL baseUrl;
        			baseUrl = HelloWebServiceService.class
        					.getResource(".");
        			url = new URL(baseUrl,
        					"http://192.168.1.128:6080/HttpService/HelloWebServicePort?wsdl");
        		} catch (MalformedURLException e) {
        			e.printStackTrace();
        		}        		
        		HelloWebServiceService p =
        				new HelloWebServiceService(url,new QName(
        				"http://test.dhcc.com.cn/", "HelloWebServiceService"));          		
        		
        		System.out.println(p.getHelloWebServicePort().helloWord("44444444"));
            	
            	request.getSession().setAttribute("strSession", p.getHelloWebServicePort().helloWord("44444444"));  
                request.getRequestDispatcher("/WEB-INF/view/webservice.jsp").forward(request, response);  
            } else if(type.equals("3")){
            	String remoteUrl = "http://192.168.1.128:6080/HttpService/servlet/helloWorld";
            	HttpClient httpClient = new DefaultHttpClient();            	
            	HttpPost post = new HttpPost(remoteUrl);               
            	HttpResponse responseResult = httpClient.execute(post);             	
            	String result="";
            	if (responseResult.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                    result= EntityUtils.toString(responseResult.getEntity(),"utf-8");
                } 
            	request.getSession().setAttribute("strSession", result);  
                request.getRequestDispatcher("/WEB-INF/view/http_get.jsp").forward(request, response);  
            }  else if(type.equals("2")){
            	String remoteUrl = "http://192.168.1.128:6080/HttpService/servlet/helloWorld";
            	HttpClient httpClient = new DefaultHttpClient();            	
            	HttpGet get = new HttpGet(remoteUrl);               
            	HttpResponse responseResult = httpClient.execute(get);             	
            	String result="";
            	if (responseResult.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                    result= EntityUtils.toString(responseResult.getEntity(),"utf-8");
                } 
            	request.getSession().setAttribute("strSession", result);  
            	request.getRequestDispatcher("/WEB-INF/view/http_post.jsp").forward(request, response);  
            }else if(type.equals("4")){
            	request.getRequestDispatcher("/WEB-INF/view/iframe.jsp").forward(request, response);  
            } else {
            	request.getRequestDispatcher("/WEB-INF/view/ajax.jsp").forward(request, response);  
            }            
        }
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
