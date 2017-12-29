//将状态和一些公共信息放在window的top对象里面，其他界面同样可以使用，例如left.jsp
try{
window.top.is_dxp_user = false;
	 window.top.is_gtp_user = false;
	 window.top.dxplogin_success = false;
	 window.top.gtplogin_success = false;
	 window.top.dxp_timer = null;//dxp定时刷新任务
	 window.top.gtp_timer = null;//gtp定时刷新任务
	 //刷新时请求任务，下次加载后重建
	var gtpLoginPara = gtpLoginPara || '';
	var dxpLoginPara = dxpLoginPara || '';
	var timer_gap = tong_session_heartbeat_gap || 1000*60*30;//10min
	
	 window.top.onunload = function(){
		 if(window.top.dxp_timer!=null){
			 window.clearInterval(window.top.dxp_timer);//
			 window.top.dxp_timer = null;
		 }
		 if(window.top.gtp_timer!=null){
			 window.top.gtp_timer = null;
			 window.clearInterval(window.top.gtp_timer);//
		 }
	 }
if(dxpLoginPara!=''){
	 window.top.is_dxp_user = true;
	 tongLoginDxp(dxpLoginPara); 
	 createSessionJob('dxp');
}else{
	gtpLogin();
}

function gtpLogin(){ 
	if(gtpLoginPara!=''){
	 window.top.is_gtp_user = true;
	 tongLoginGtp(gtpLoginPara); 
	 createSessionJob('gtp');
    }
}
 //DXP，GTP登录，使用jsonp方式
 function tongLoginDxp(para){
     $.jsonp({
    	 url:dxp_login_url,
    	 data:"token="+para,
    	 async:false,
    	 success:function(data,s,xrh){
    	 	if(1 == data.status){
    	 		window.top.dxplogin_success = true;
    	 		if(!window.top.gtplogin_success){
    	 			gtpLogin();
    	 		}
    	 		tonglog("login dxp success! [para:"+para+"]");
    	 	}else{
    	 		tonglog("login dxp fail,para:["+para+"] [status:"+data.status+",msg:"+data.msg);
    	 		if(!window.top.gtplogin_success){
    	 			gtpLogin();
    	 		}
    	 	}
         },
         error:function(a,b,c){
        	 tonglog("login dxp error,para:["+para+"] ,ajax error:"+[a,b,c]);
         }
     });
 } ;
 function tongLoginGtp(para){
     $.jsonp({
    	 url:gtp_login_url,
    	 data:"token="+para,
    	 async:false,
    	 success:function(data,s,xrh){
    	 	if(1 == data.status){
    	 		
    	 		window.top.gtplogin_success = true;
    	 		tonglog("login gtp success! [para:"+para+"]");
    	 	}else{
    	 		tonglog("login gtp fail,para:["+para+"] [status:"+data.status+",msg:"+data.msg);
    	 	}
         },
         error:function(a,b,c){
        	 tonglog("login "+type+" error,para:["+para+"] ,ajax error:"+[a,b,c]);
         }
     });
 } ;
 
 //记录每次登录日志，方便出错时的问题查找
 function tonglog(msg){
	 $.jsonPost({
		    url:_ctx+"/pub/tonglog.do",
		    data:"msg="+msg,
		    async:true,
			jsonStatusSuccessCall:function(){},
		    jsonStatusFailCall:function(){},
		    error:function(){},
		    complete:function(){}
	});
 };
 //定时请求dxp或者gtp的某个界面，以防止seesion过期
 function createSessionJob(type){
	 if(type=='dxp'){
		 url_to_request = dxp_checksession_url;
		 window.top.dxp_timer =  setInterval('job_request("dxp")',timer_gap);
	 }else{
		 url_to_request = gtp_checksession_url;
		 window.top.gtp_timer = setInterval('job_request("gtp")',timer_gap);
	 }
 }
 function job_request(type){
	 if(type=='dxp'){
		 $('#job'+type)[0].src=dxp_checksession_url;
	 }else{
		 $('#job'+type)[0].src=gtp_checksession_url;
	 }
 };
}catch(e){alert(e)}
 