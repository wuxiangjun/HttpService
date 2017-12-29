
//权限管理
jQuery.extend({
	execute: function(confirm_msg,url,successFn){
		if(confirm_msg&&!window.confirm(confirm_msg)){
			return;
		}
			jQuery.jsonGet({
				url:url,
				jsonStatusSuccessCall:successFn||function(msg,data){
					   alert(msg);
					   jQuery.refresh();//刷新界面
			    },
			    jsonStatusFailCall:function(msg){
					  alert(msg); 
			    }
			});
	},
	add: function() {
		self.location.href = _ctx+'/pub/sysmgr/role_add.do';
	},
	reloadResource: function(){
		var ids = jQuery.getCheckBoxValueStr('rids',false);
		if($.trim(ids)==''){
			zNodes="";
			loadTree();
			return;
		};
		jQuery.jsonPost({
			url:_ctx+"/pub/sysmgr/get_resource_tree_data.do",
			data:"roleId="+ids,
			jsonStatusSuccessCall:function(msg,data){
				   zNodes = eval(data);
				   loadTree();
		    },
		    jsonStatusFailCall:function(msg){
				  alert(msg); 
		    }
		});
	},
	reloadResourceTree: function(){
		jQuery.jsonPost({
			url:_ctx+"/pub/sysmgr/get_resource_tree_data.do",
			jsonStatusSuccessCall:function(msg,data){
				   zNodes = eval(data);
				   loadTree();
		    },
		    jsonStatusFailCall:function(msg){
				  alert(msg); 
		    }
		});
	}
});
