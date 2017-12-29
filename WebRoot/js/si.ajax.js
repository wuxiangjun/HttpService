/*!
 * 功能：基于jquery的ajax处理封装,包括表单提交等
 * 版本历史：
 * ——————————————————————————————————————————————————————————————————
 * 2012-12-14 15:08 乔兵创建 
 * 2013-03-26 乔兵修改并发问题
 * ——————————————————————————————————————————————————————————————————
 */
jQuery.extend({
	
	settings: {
	    ajax_debug: false
	},
	/**
	 * 调用方式 $.jsonGet(options)
     * checkbox全选，全不选
     * :type,dataType,async，cache,success参数不用写，其他和和调用jquery的ajax方式一样
     * 同时原来的success替换为为jsonStatusSuccessCall和jsonStatusFailCall 
     * 对应于json返回状态为1和0的情况的处理
     * @param   {Object} options 参数对象eg:{jsonStatusSuccessCall:function()...}
     * @returns {Object} 参考jquery ajax返回
    */ 
	jsonGet: function(options){
		options.type= 'GET';
		return jQuery._private._jsonAjax(options);
	},
	/**
	 * 直接获取url的内容
	 * 调用方式 $.urlGet(options)
     * checkbox全选，全不选
     * :type,dataType,async，cache,success参数不用写，其他和和调用jquery的ajax方式一样
     * 同时原来的success替换为为jsonStatusSuccessCall和jsonStatusFailCall 
     * 对应于json返回状态为1和0的情况的处理
     * @param   {Object} options 参数对象eg:{jsonStatusSuccessCall:function()...}
     * @returns {Object} 参考jquery ajax返回
    */ 
	htmlGet: function(options){
		options.type= 'GET';
		return jQuery._private._htmlAjax(options);
	},
	/**
	 * 调用方式 $.jsonPost(options)
     * :除了type,dataType,async，cache,success参数不用写，其他和和调用jquery的ajax方式一样
	 *同时原来的success替换为为jsonStatusSuccessCall和jsonStatusFailCall 
	 *对应于json返回状态为1和0的情况的处理
     * @param   {Object} options 参数对象eg:{jsonStatusSuccessCall:function()...}
     * @returns {Object} 参考jquery ajax返回
    */ 
	jsonPost: function(options){
		options.type= 'POST';
		return jQuery._private._jsonAjax(options);
	},
	/**
	 * jsonp 调用
	 * 调用方式 $.jsonpPost(options)
     * :除了type,dataType,async，cache,success参数不用写，其他和和调用jquery的ajax方式一样
     * @param   {Object} options 参数对象eg:{jsonStatusSuccessCall:function()...}
     * @returns {Object} 参考jquery ajax返回
    */ 
	jsonp: function(options){
		options.remote = true;
		options.jsonpCallback = "jsonpCallBack";
		return jQuery._private._jsonAjax(options);
	},
	/**
	 * 界面刷新
    */ 
	refresh: function(){
	  	  window.location.reload();
	},
	// For internal use only.--------------------------------------------------------
    _private: new function(){
    	this._htmlAjax = function(options){
   		 options.dataType = (options.remote? 'JSONP':'HTML');
   		 options.success  =  options.success;
   		 options.customErrorFn = (options.remote? null:options.error);
   		 options.error  =  (options.remote? options.error:_defaultErrorFunction);
   		return _ajax(options);
   	};
    	this._jsonAjax = function(options){
    		 options.dataType = (options.remote? 'JSONP':'JSON');
    		 options.success  =  (options.remote? options.success:_defaultJsonSucess);
    		 options.customErrorFn = (options.remote? null:options.error);
    		 options.error  =  (options.remote? options.error:_defaultErrorFunction);
    		return _ajax(options);
    	};
    	function _ajax(options){
    		var optionEnd = {
    				jsonStatusSuccessCall: options.jsonStatusSuccessCall || _defaultJsonStatusSuccessCall,
    				jsonStatusFailCall: options.jsonStatusFailCall || _defaultJsonStatusFailCall,
    				customErrorFn: options.customErrorFn,
    				pageRefresh: options.pageRefresh || false,
    				type: options.type || "GET",
        	        cache: false,
        	        data: options.data,
        	        dataType: options.dataType || "JSON",
        	        error: options.error||_defaultErrorFunction,
        	        url: options.url,
        	        async: options.async==undefined?true:options.async,
        	        success: options.success || _defaultSucessFunction,
        	        jsonpCallback:options.jsonpCallback,
        	        beforeSend:options.beforeSend || _defaultBeforeFunction
    		};
    		// jquery 原生ajax处理
    		return jQuery.ajax(optionEnd);
    	};
    }
 });
/*
 *  表单提交 ! 需要jquery.form插件,
 */
jQuery.fn.extend({
	/**
	 * 调用方式 $("fromid").jsonAjaxForm
     * :除了type,dataType参数不用写，其他和和调用jquery的form插件方式一样
	 * 同时原来的success替换为为jsonStatusSuccessCall和jsonStatusFailCall 
	 * 对应于json返回状态为1和0的情况的处理
     * @param   {Object} options 参数对象eg:{jsonStatusSuccessCall:function()...}
     * @returns {Object} 参考jquery form ajax返回
    */ 
	jsonAjaxForm: function(options){
		options = options||{}
		var formObj = $(this);
		var optionEnd = {
				jsonStatusSuccessCall: options.jsonStatusSuccessCall || _defaultJsonStatusSuccessCall,
				jsonStatusFailCall: options.jsonStatusFailCall || _defaultJsonStatusFailCall,
				customErrorFn: options.error || null,
				pageRefresh: options.pageRefresh || false,
				type: "POST",
		        dataType: "JSON",
		        success: _defaultJsonSucess,
		        beforeSend: options.beforeSend || _defaultBeforeFunction,
				target: options.target || null,                               // "#msg", 返回信息显示区
				beforeSubmit: _defaultBeforeFunction, // 提交之前处理函数
				error: _defaultErrorFunction, // 失败处理函数
		        clearForm: options.clearForm || false, // 成功后清空表单
		        resetForm: options.resetForm ||false, // 成功后重置表单
		        timeout: 3000, //
		        formId:formObj.attr("id")
		};
	return $(this).ajaxForm(optionEnd);
	},
	/**
	 * 调用方式 $("fromid").jsonAjaxForm
     * :除了type,dataType参数不用写，其他和和调用jquery的form插件方式一样
	 * 同时原来的success替换为为jsonStatusSuccessCall和jsonStatusFailCall 
	 * 对应于json返回状态为1和0的情况的处理
     * @param   {Object} options 参数对象eg:{jsonStatusSuccessCall:function()...}
     * @returns {Object} 参考jquery form ajax返回
    */ 
	jsonAjaxPagerForm: function(options){
		options = options||{}
		var formObj = $(this);
		//点击按钮的时候需要将当前页设置为1
		var _currentPageHiddenId = formObj.attr("id")+"_hiddenInput_currentPage";
		$("body").click(function(e){
			if(options.searchbtnId==e.target.id){
				if($("#"+_currentPageHiddenId))$("#"+_currentPageHiddenId).val(1);
			}
		});
		var optionEnd = {
				generalDataFn:options.generalDataFn||function(){},
				pagerContaintId:options.pagerContaintId,
				searchbtnId:options.searchbtnId,
				jsonStatusSuccessCall: options.jsonStatusSuccessCall || _defaultJsonStatusSuccessCall,
				jsonStatusFailCall: options.jsonStatusFailCall || _defaultJsonStatusFailCall,
				customErrorFn: options.error || null,
				pageRefresh: options.pageRefresh || false,
				type: "POST",
		        dataType: "JSON",
		        success: _defaultPagerJsonSucess,
		        beforeSend: options.beforeSend || _defaultBeforeFunction,
				target: options.target || null,                               // "#msg", 返回信息显示区
				beforeSubmit: _defaultBeforeFunction, // 提交之前处理函数
				error: _defaultErrorFunction, // 失败处理函数
		        clearForm: options.clearForm || false, // 成功后清空表单
		        resetForm: options.resetForm ||false, // 成功后重置表单
		        timeout: 3000, //
		        formId:formObj.attr("id")
		};
	return $(this).ajaxForm(optionEnd);
	}
});
//--------------------------------default fuunction--------------------------
// 默认表单提交前的处理
function _defaultBeforeFunction(){
	//
};
/**
 * 成功处理：默认的json成功返回状态为1的处理
 * @param   {String} msg 后台传回的成功信息
 * @param   {JsonObject} data 后台传回的json格式的数据
 * @param   {textStatus} 参考jquery相关返回参数
*/ 
function _defaultJsonStatusSuccessCall(msg,data, textStatus){
	alert(msg);
	if(this.pageRefresh){
		jQuery.refresh();
	}
};
/**
 * 失败处理：默认的json成功返回状态为0的处理
 * @param   {String} msg 后台传回的失败信息
 * @param   textStatus 参考jquery相关返回参数
*/ 
function _defaultJsonStatusFailCall(msg, textStatus){
	ajaxDebug([msg, textStatus]);
	alert(msg);
};
/**
 * ajax 返回json的统一处理，通过调用jsonStatusSuccessCall，jsonStatusFailCall来进行相关处理
 * @param   {jsonObject} msg 后台传回的json可是的数据，包括状态，提示信息，数据
 * @param   textStatus 参考jquery相关返回参数
*/ 
function _defaultJsonSucess(res, textStatus,xrh){
	var AJAX_SUCCESS = "1";
	var AJAX_FAIL = "0";
	if(res){
		if(AJAX_SUCCESS == res.status){
			this.jsonStatusSuccessCall(res.msg,res.data, textStatus);
		}else if(AJAX_FAIL == res.status){
			this.jsonStatusFailCall(res.msg, textStatus);
		}else{
		   alert("ajax返回状态错误");
		}
	}
};
/**
 * ajax 返回json的统一分页处理，通过调用generalDataFn来让条用放处理数据
 * @param   {jsonObject} msg 后台传回的json可是的数据，包括状态，提示信息，数据
 * @param   textStatus 参考jquery相关返回参数
*/ 
function _defaultPagerJsonSucess(res, textStatus,xrh){
	var AJAX_SUCCESS = "1";
	var AJAX_FAIL = "0";
	if(res){
		if(AJAX_SUCCESS == res.status){
			var data = res.data;
			var datas = data.datas;
			
			//调用用户的回调函数将数据记载到界面
			this.generalDataFn(datas);
			//调用用户的回调函数将数据记载到界面--结束
			
			//隔行换色
			$(".table_box[tabbg!=off]").each(function(){
				tb($(this)[0]);
			});
			//隔行换色--结束
			
			//加载分页组件 @see si.pager.js
			var formId = this.formId;
			new Pager(formId,data.total,data.pg.pagesize,data.pg.currentPage,this.pagerContaintId,function(){$("#"+formId).submit()}).init();
		    //加载分页组件--结束
			
		}else if(AJAX_FAIL == res.status){
			this.jsonStatusFailCall(res.msg, textStatus);
		}else{
		   alert("ajax返回状态错误");
		}
	}
}
/**
 * //默认ajax调用失败处理
 * @param   {XMLHttpRequest} jquery分装的 XMLHttpRequest 对象
 * @param   textStatus 参考jquery相关返回参数
 * @param  {Object}errorThrown 错误信息
*/ 
function _defaultErrorFunction(XMLHttpRequest, textStatus, errorThrown){
	//无权限处理
	if(XMLHttpRequest.status=='403'){
		_defaultNoPermissonFunction();
		if(this.customErrorFn!=null){
			this.customErrorFn(XMLHttpRequest, textStatus, errorThrown,"没有访问权限！");
		}
		
		return;
	}
	//没有登录或者session过期处理
	if(!_no_session_error_code)var _no_session_error_code=488;
	if(XMLHttpRequest.status==_no_session_error_code){
		_defaultNoSessionFunction();
		return;
	}
	ajaxDebug([this,XMLHttpRequest,textStatus,errorThrown]);
	//执行调用者自定义error
	if(this.customErrorFn!=null){
		this.customErrorFn(XMLHttpRequest, textStatus, errorThrown,"操作失败！");
	}else{
		alert("操作失败！");
	}
};
/**
 * 默认ajax调用成功处理
 * @param   {JsonObject} data 后台传回的json格式的数据
 * @param   textStatus 参考jquery相关返回参数
*/ 
function _defaultSucessFunction(data, textStatus){
	ajaxDebug([textStatus,data]);
	alert("操作成功！");
	if(this.pageRefresh){
		jQuery.refresh();
	}
};
function _defaultNoPermissonFunction(){
	alert("没有访问权限！");
}
function _defaultNoSessionFunction(){
	alert("请登录!");
	if(window.top!=null){
		window.top.location=_login_url;
	}else{
		self.location=_login_url;
	}
}

/**
 * ajaxj调用失败调试信息
 * @param   {Object} 调试信息
*/ 
function ajaxDebug(msg){
	if(jQuery.settings.ajax_debug) alert(msg);
};

