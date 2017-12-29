package cn.com.dhcc.test.client;  
  
import java.io.File;  
import java.io.FileInputStream;  
import java.io.IOException;  
import java.io.InputStream;  
import java.security.KeyStore;  
  
import javax.net.ssl.KeyManager;  
import javax.net.ssl.KeyManagerFactory;  
import javax.net.ssl.TrustManager;  
import javax.net.ssl.TrustManagerFactory;  
  
import org.apache.cxf.configuration.jsse.TLSClientParameters;  
import org.apache.cxf.endpoint.Client;  
import org.apache.cxf.frontend.ClientProxy;  
import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;  
import org.apache.cxf.transport.http.HTTPConduit;  
  
//import com.server.HelloWorld;  
  
public class ClientUtils {  
  
  /*  private static HelloWorld helloWorld;  
  
    public static HelloWorld getInstance(){  
  
        if(null != helloWorld){  
            return helloWorld;  
        }  
  
        try{  
            String addr = "https://localhost:8443/cxf-demo/service/HelloWorld";  
            JaxWsProxyFactoryBean factoryBean = new JaxWsProxyFactoryBean();  
            factoryBean.setAddress(addr);  
            factoryBean.setServiceClass(HelloWorld.class);  
            helloWorld = (HelloWorld) factoryBean.create();  
              Client proxy = ClientProxy.getClient(helloWorld);  
              HTTPConduit conduit = (HTTPConduit) proxy.getConduit();  
              TLSClientParameters tlsParams = conduit.getTlsClientParameters();  
              if (tlsParams == null) {  
               tlsParams = new TLSClientParameters();  
              }  
              tlsParams.setDisableCNCheck(true);  
              //设置keystore  
              tlsParams.setKeyManagers(ClientUtils.getKeyManagers());  
              // 设置信任证书  
              tlsParams.setTrustManagers(ClientUtils.getTrustManagers());  
              conduit.setTlsClientParameters(tlsParams);  
        }catch(Exception e){  
            e.printStackTrace();  
        }  
  
        return helloWorld; 
    }  
   */
    public static KeyManager[] getKeyManagers() {  
          InputStream is = null;  
          try {  
           // 获取默认的 X509算法  
           String alg = KeyManagerFactory.getDefaultAlgorithm();  
           // 创建密钥管理工厂  
           KeyManagerFactory factory = KeyManagerFactory.getInstance(alg);  
           File certFile = new File("/home/liang/Documents/works/servers/tomcat/cer/xm_xiaomi-id.p12");  
           if (!certFile.exists() || !certFile.isFile()) {  
            return null;  
           }  
           is = new FileInputStream(certFile);  
           // 构建以证书相应格式的证书仓库  
           KeyStore ks = KeyStore.getInstance("pkcs12");  
           // 加载证书  
           ks.load(is, "changeit".toCharArray());  
           factory.init(ks, "changeit".toCharArray());  
           KeyManager[] keyms = factory.getKeyManagers();  
           return keyms;  
          } catch (Exception e) {  
           e.printStackTrace();  
          } finally {  
           if (is != null) {  
            try {  
             is.close();  
            } catch (IOException e) {  
             e.printStackTrace();  
            }  
           }  
  
          }  
          return null;  
        }  
  
    public static TrustManager[] getTrustManagers() {  
          // 读取证书仓库输入流  
          InputStream is = null;  
          try {  
           // 信任仓库的默认算法X509  
           String alg = TrustManagerFactory.getDefaultAlgorithm();  
           // 获取信任仓库工厂  
           TrustManagerFactory factory = TrustManagerFactory.getInstance(alg);  
           // 读取信任仓库  
           is = new FileInputStream(new File("/home/liang/Documents/works/servers/tomcat/cer/temip-id.p12"));  
           // 密钥类型  
           KeyStore ks = KeyStore.getInstance("pkcs12");  
           // 加载密钥  
           ks.load(is, "changeit".toCharArray());  
           factory.init(ks);  
           TrustManager[] tms = factory.getTrustManagers();  
           return tms;  
          } catch (Exception e) {  
           e.printStackTrace();  
  
          } finally {  
           if (is != null) {  
            try {  
             is.close();  
            } catch (IOException e) {  
             e.printStackTrace();  
            }  
           }  
          }  
          return null;  
        }  
}  