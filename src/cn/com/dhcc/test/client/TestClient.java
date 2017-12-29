package cn.com.dhcc.test.client;

import java.net.MalformedURLException;
import java.net.URL;

import javax.xml.namespace.QName;

import cn.com.dhcc.test.HelloWebServiceService;

/**   
 * @Project: [HttpService] 
 * @Title:   [TestClient.java]
 * @Package: [cn.com.dhcc.test.client] 
 * @Description: []
 * @author:  [UserWxj]
 * @date:    [2017-9-13 下午2:48:20]
 * @version: [V1.0]  
 */
public class TestClient {
	public static void main(String[] args) {
		//System.setProperty("javax.net.ssl.keyStore","D:/OpenSSL-Win64/bin/root/server/tomcat.keystore");  
       // System.setProperty("javax.net.ssl.keyStorePassword", "123456");  
        
        System.setProperty("javax.net.ssl.trustStore", "D:/OpenSSL-Win64/bin/root/server/tomcat.keystore");  
        System.setProperty("javax.net.ssl.trustStorePassword","123456");
        
		URL url = null;
		try {
			URL baseUrl;
			baseUrl = HelloWebServiceService.class
					.getResource(".");
			url = new URL(baseUrl,
					"http://10.1.132.70:8080/HttpService/HelloWebServicePort?wsdl");
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		HelloWebServiceService p =
				new HelloWebServiceService(url,new QName(
				"http://test.dhcc.com.cn/", "HelloWebServiceService"));  
		
		/*System.setProperty("javax.net.ssl.keyStore","D:\\mykeystore\\test.keystore");  
        System.setProperty("javax.net.ssl.keyStorePassword", "mulepassword");  
        System.setProperty("javax.net.ssl.trustStore", "D:\\mykeystore\\test.keystore");  
        System.setProperty("javax.net.ssl.trustStorePassword","mulepassword");*/      
       
		System.out.println(p.getHelloWebServicePort().helloWord("44444444"));
	}
}
