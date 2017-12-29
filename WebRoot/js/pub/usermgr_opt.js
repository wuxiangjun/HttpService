
//用户操作管理
jQuery.extend({
	execute: function(confirm_msg,url){
		if(window.confirm(confirm_msg)){
			jQuery.jsonGet({
				url:url,
				jsonStatusSuccessCall:function(msg,data){
					   alert(msg);
					   jQuery.refresh();//刷新界面
			    },
			    jsonStatusFailCall:function(msg){
					  alert(msg); 
			    }
			});
		}
	},
	add: function() {
		self.location.href = _ctx+'/pub/usermgr/user_add.do';
	}
});
