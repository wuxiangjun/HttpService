package cn.com.dhcc.test;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**   
 * @Project: [HttpService] 
 * @Title:   [HttpServiceServlet.java]
 * @Package: [cn.com.dhcc.test] 
 * @Description: []
 * @author:  [UserWxj]
 * @date:    [2017-9-13 上午10:29:18]
 * @version: [V1.0]  
 */
public class HttpServiceServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Constructor of the object.
	 */
	public HttpServiceServlet() {
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
		response.setContentType("text/html;charset=UTF-8");
		/*PrintWriter out = response.getWriter();
		out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
		out.println("<HTML>");
		out.println("<HEAD><meta charset=\"utf-8\"><TITLE>A Servlet</TITLE></HEAD>");
		out.println("<BODY>");
		out.println("<center><h1>集成支撑软件2.X 版本部署说明</h1></center>");
		out.print("<h2>系统配置（<font color=\"red\">说明：在系统启动前请确保以下文件按照生产环境实际情况配置完成</font>）</h2>");
		out.print("<ul>");
		out.print("<li>启动&nbsp;配置：WRIS\\WEB-INF\\WEB.XML</li>");
		out.print("<li>基本&nbsp;配置：WRIS\\WEB-INF\\CLASSES\\APP.PROPERTIES</li>");
		out.print("<li>任务&nbsp;配置：WRIS\\WEB-INF\\CLASSES\\APPLICATIONcONTEXT.XML</li>");
		out.print("<li>TLQ&nbsp;配置：WRIS\\WEB-INF\\CLASSES\\MQ.XML</li>");
		out.print("<li>日志&nbsp;配置：WRIS\\WEB-INF\\CLASSES\\LOG4J.PROPERTIES</li>");
		out.print("<ul>");
		out.print("<ul>");
		out.println("  </BODY>");
		out.println("</HTML>");
		out.flush();
		out.close();		*/
		
		request.getRequestDispatcher("/WEB-INF/view/baidu.html").forward(request, response);
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
		PrintWriter out = response.getWriter();
		out.println("<auditReportReq>" +
				"  <head>" +
				"    <auditReport>" +
				"      <name>河北省“十二五”城镇污水处理及再生利用设施建设规划</name>" +
				"      <sender>" +
				"        <origin>MWR</origin>" +
				"      </sender>" +
				"      <receiver>" +
				"        <destination>BJ</destination>" +
				"      </receiver>" +
				"    </auditReport>" +
				"  </head>" +
				"  <body>" +
				"    <busiCode>OM41</busiCode>" +
				"    <data>{\"OM41\":{\"adCd\":\"130000\",\"adNm\":\"河北省\",\"allcount\":0,\"aptOrgs\":\"\",\"aptcount\":0,\"basCd\":\"C00000000000\",\"basNm\":\"海河流域\",\"briefIntr\":\"\",\"fileRpM\":[{\"id\":{\"fileCd\":\"394a1eaa60d4459287f0b672de179c89\",\"wrplCd\":\"0000002017002\"},\"nt\":\"\",\"ts\":\"2017-02-14 16:30:52\"}],\"igroup\":\"\",\"invEst\":1.542E7,\"nt\":\"\",\"plChar\":\"3\",\"plCharNm\":\"\",\"plScal\":\"\",\"plSys\":\"\",\"plTp\":\"1\",\"plTpNm\":\"\",\"replDt\":\"2017-02-14 00:00:00\",\"replOrgCd\":\"00001332X\",\"replOrgNm\":\"中华人民共和国水利部\",\"status\":2,\"ts\":\"2017-02-14 16:30:52\",\"wrplCd\":\"0000002017002\",\"wrplNm\":\"河北省“十二五”城镇污水处理及再生利用设施建设规划\"},\"fileRpM\":[{\"id\":{\"fileCd\":\"394a1eaa60d4459287f0b672de179c89\",\"wrplCd\":\"0000002017002\"},\"nt\":\"\",\"ts\":\"2017-02-14 16:30:52\"}]}</data>" +
						"    <receiveMs>" +
						"      <receiveM>{\"acceptPer\":\"孙闻\",\"acceptTm\":\"\",\"adCd\":\"110000\",\"bid\":\"0000002017002\",\"id\":\"daa6dc8d8972455eb263503c72b2d0cf\",\"isAccept\":0,\"logId\":\"\",\"message\":\"0\",\"mid\":\"OM41\",\"midNm\":\"\",\"orgNm\":\"\",\"sendAdCd\":\"000000\",\"sendOrgNm\":\"\",\"sendPer\":\"\",\"sendTs\":\"2017-07-04 16:54:19\",\"status\":\"1\",\"year\":\"\"}</receiveM>" +
						"    </receiveMs>" +
						"  </body>" +
						"  <attachments>" +
						"    <attachment>394a1eaa60d4459287f0b672de179c89</attachment>" +
						"  </attachments>" +
						"</auditReportReq>");
		out.flush();
		out.close();
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
