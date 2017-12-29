/*！
 * 功能：通用工具类
 * 版本历史：
 * ————————————————————————————————————————————————————————————————————————————————————
 * 2012-12-14 15:08 乔兵创建
 * ————————————————————————————————————————————————————————————————————————————————————
 * 2012-12-14 15:08 乔兵添加now方法 
 * ————————————————————————————————————————————————————————————————————————————————————
 * 2012-12-19 15:08 乔兵添加toStringArray，checkBoxInit，radioInit方法 
 * ————————————————————————————————————————————————————————————————————————————————————
 * 2012-12-27 15:08 乔兵添加worldNow方法 
 */
jQuery.extend({
		/**
	    *返回yyyy-mm-dd HH:mm:ss格式  调用方式 $.now() 北京时间
	    * @returns {String} 字符串数组 yyyy-mm-dd HH:mm:ss格式 
	    */
        now: function(){
	        	function _warp0(value){
	        		return value<10?("0"+value):value;
	        	}
                var today = new Date();
                var yyyy=today.getFullYear();
                var mm=_warp0(today.getMonth()+1);
                var dd=_warp0(today.getDate());
                var hh=_warp0(today.getHours());
                var m=_warp0(today.getMinutes());
                var ss=_warp0(today.getSeconds());
                return yyyy+'-'+mm+'-'+dd+' '+hh+':'+m+':'+ss;
        },
        /**
 	    *返回yyyy-mm-dd HH:mm:ss格式  调用方式 $.worldNow() 世界时间
 	    * @returns {String} 字符串数组 yyyy-mm-dd HH:mm:ss格式 
 	    */
         worldNow: function(){
 	        	function _warp0(value){
 	        		return value<10?("0"+value):value;
 	        	}
 	        	 var localNow = new Date();
 				 var utc = localNow.getTime()+ localNow.getTimezoneOffset() * 1000*60; //得到国际标准时间
                 var today = new Date(utc);
                 var yyyy=today.getFullYear();
                 var mm=_warp0(today.getMonth()+1);
                 var dd=_warp0(today.getDate());
                 var hh=_warp0(today.getHours());
                 var m=_warp0(today.getMinutes());
                 var ss=_warp0(today.getSeconds());
                 return yyyy+'-'+mm+'-'+dd+' '+hh+':'+m+':'+ss;
         },
        /**
         * 将数值里面的对象全部转化为字符串数值
         * @param   {Array} arrayObj 数组
         * @returns {Array} 字符串数组
        */  
        toStringArray: function(arrayObj){
        	if(jQuery.isArray(arrayObj)){
        		$(arrayObj).each(function(i){
        			arrayObj[i]=this.toString();
        		});
        	}
        	return arrayObj;
        } ,
        /**
         * 根据后台传入的字符串数组来改变checkbox的选择状态
         * @param   {String} boxname checkbox的name
         * @param   {Array} values 后台传入的数组：eg:[1,2,3,4]' or ['a','b',1,'中']
         * @returns {void}
        */  
        checkBoxInit: function(boxname,values){
        	if(!jQuery.isArray(values))return;
        	var arrayObj = jQuery.toStringArray(values);
        	var $boxs = $(":checkbox[name="+boxname+"]");
        	if($boxs){
        		$boxs.each(function(){
        			var box = $(this);
        			if(jQuery.inArray(box.val(), arrayObj)!=-1){box.attr("checked","checked");}
        		});
        	}
        },
        /**
         * 根据后台传入的字符串来改变radio的选择状态
         * @param   {String} radioname radio的name
         * @param   {String} value 后台传入的值：'1'
         * @returns {void}
        */  
        radioInit: function(radioname,value){
        	if(value=='')return;
        	var $radios = $(":radio[name="+radioname+"]");
        	if($radios){
        		$radios.each(function(){
        			var radio = $(this);
        			if(radio.val()==value){radio.attr("checked","checked");}
        		});
        	}
        },
        /**
         * checkbox全选，全不选
         * @param   {Object} parentCheckBox 全选框对象
         * @param   {Number} childCheckBoxName 子checkbox name
         * @returns {void}
        */  
        checkBoxTriggerAll: function(parentCheckBox,childCheckBoxName){
        	var $parentCheckBox = $(parentCheckBox);
        	var parentCheckBoxStatus = $parentCheckBox.is(":checked");
			$(":checkbox[name="+childCheckBoxName+"]").each(function(){
				 if(parentCheckBoxStatus){
					$(this).attr("checked",true);
				 }else {
					 $(this).attr("checked",false);
				 }
			});
        },
        /**
         * 初始化下拉框的选择
         * @param   {Object} selectid 下拉框id
         * @param   {value} 初始化值
         * @returns {void}
        */ 
        selectInit:function(selectid,value){
        	var $select =$("#"+selectid);
        	$select.find("option[value='"+value+"']").attr("selected", true); 
        },
        /**
         * 获取已经选择的checkbox值并组装才逗号隔开的字符串
         * @param   {String} checkBoxName checkbox 的name
         * @param   {value} 初始化值
         * @returns {void}
        */ 
        getCheckBoxValueStr: function(checkBoxName,excludeDisable){
        	var array = [];
        	excludeDisable=excludeDisable||false;
        	if(excludeDisable){
        		$(":checkbox[name='"+checkBoxName+"']:checked").not(":disabled").each(function(){
            		array.push($(this).val());
            	});
        	}else{
        		$(":checkbox[name='"+checkBoxName+"']:checked").each(function(){
            		array.push($(this).val());
            	});
        	}
        	return array.join(",");
        },
        getFromArray: function(array,indexArr){
        	var newArr = new Array();
        	for(var i=0;i<indexArr.length;i++){
        		newArr.push(array[indexArr[i]]);
        	}
        	return newArr;
        },
        dimSelect: function(targetSelectId,source){
        	
        },
        strJoin: function(str,len,joins){
        	if(str==null||str==''||str.length<=len)return str;
        	var returnStr = "";
			var first = true;
			join(str);
        	function join(strend){
			    var joinstr = (first==true?"":joins);
				first=false;				
        		if(strend.length<=len){returnStr+=joinstr+strend;}else{
        		returnStr+=joinstr+strend.substring(0,len);
        		join(strend.substring(len,strend.length));
				}
        	}
        	return returnStr;
        },
        /**
         * 级联产生下拉框
         * @param fromObj 选择的下拉框对象
         * @param urlToajax 请求的地址
         * @param targetSelectId 构建option的目标select id
         * @param keyName 返回值用来作为option value的名称
         * @param valueName 返回值用来作为option text的名称
         * @param urlKeyName 请求参数名称 默认fromObj的name
         */
        selectCascade: function(fromObj,urlToAjax,targetSelectId,keyName,valueName,urlKeyName){
        	var svalue = $(fromObj).val(); 
        	urlKeyName = urlKeyName||$(fromObj).attr("name");
    		var url = urlToAjax+"?"+urlKeyName+"="+svalue;
    		var okeyValue = new Array();
    		$.jsonGet({
        		url:url,
        		jsonStatusSuccessCall:function(msg,data){
        			$("#"+targetSelectId+" option[value!='']").remove();
        			var arrObj = eval(data);
        			for(var d in arrObj){
        				okeyValue.push([arrObj[d][keyName],arrObj[d][valueName]]);
        				var option = "<option value='"+arrObj[d][keyName]+"'>"+arrObj[d][valueName]+"</option>";
    					$(option).appendTo($("#"+targetSelectId));
        			}
        		}
        	});
        },
        /**
         * 级联产生下拉框
         * @param targetSelectOnlyAttr 构建option的目标select 的唯一属性例如 id
          * @param urlToajax 请求的地址
         * @param keyName 返回值用来作为option value的名称
         * @param valueName 返回值用来作为option text的名称
         * @param urlKeyName 请求参数名称 默认fromObj的name
         * * @param urlKeyName 请求参数名称 默认fromObj的name
         */
        jsonAjaxSelect: function(targetSelectOnlyAttr,urlToAjax,keyName,valueName){
        	var targetSelect = $("["+targetSelectOnlyAttr+"]");
    		var url = urlToAjax;
    		var okeyValue = new Array();
    		$.jsonGet({
        		url:url,
        		jsonStatusSuccessCall:function(msg,data){
        			targetSelect.find("option[value!='']").remove();
        			var arrObj = eval(data);
        			for(var d in arrObj){
        				okeyValue.push([arrObj[d][keyName],arrObj[d][valueName]]);
        				var option = "<option value='"+arrObj[d][keyName]+"'>"+arrObj[d][valueName]+"</option>";
    					$(option).appendTo(targetSelect);
        			}
        		}
        	});
        }
});
