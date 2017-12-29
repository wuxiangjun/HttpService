package cn.com.dhcc.test;

import javax.jws.WebService;

/**   
 * @Project: [HttpService] 
 * @Title:   [IHelloWebService.java]
 * @Package: [cn.com.dhcc.test] 
 * @Description: []
 * @author:  [UserWxj]
 * @date:    [2017-9-13 下午2:32:37]
 * @version: [V1.0]  
 */
@WebService
public interface IHelloWebService {
	public String HelloWord(String name);
}
