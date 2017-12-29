/*！
 * 功能：通用业务处理
 * 版本历史：
 * ————————————————————————————————————————————————————————————————————————————————————
 * 2012-12-19 15:08 乔兵创建
 * ————————————————————————————————————————————————————————————————————————————————————
 * 2012-12-19 16:08 乔兵添加appendPagerParaStr方法 
 * ————————————————————————————————————————————————————————————————————————————————————
 */
jQuery.fn.extend({
	/**
     * 给查询表单添加参数的隐藏域，最终将将被加在分页的参数上：调用方式：表单对象.appendPagerParaStr()
     * <jsp:param value="${_urlpara}" name="urlpara"/>
    */ 
	appendPagerParaStr: function (){
		   var urlpara = "<input type=hidden name='_urlpara' id='_urlpara'/>";
		   var $urlpara = $(urlpara);
		   if($("#_urlpara")[0])$("#_urlpara").remove();
		   $urlpara.val(decodeURIComponent(this.formSerialize(),true)).prependTo(this);  
	   }
	
});
jQuery.extend({
	setting:{
		alertPageFeature:"___alertPage"
	},
	 treeNodeToString: function (treeNode){
		 var toString = "";
		 for(var para in treeNode){
			 toString += ", "+para+" = " + treeNode[para]
		 }
		 return toString.substring(1, toString.length);
	 },
	/**
	 * 	添加排序功能
	 * 用法：
		1.在界面加载后添加：例如，
		$(function() {
		    $.injectOrderFeature('searchForm','${param.orderName}','${param.order}')
		});
		2.并在每个要排序的表头td里面添加_orderCloumnName="字段名" 
	 * @param formId
	 * @param orderName
	 * @param order
	 */
	injectOrderFeature: function(formId,orderName,order){
		 //添加隐藏域：排序字段，和排序
		 var searchForm = $("#"+formId) ;
		 var orderNameHiddenInput = "<input type=hidden name='orderName' id='orderName' value='"+orderName+"'/>";
		 var orderHiddenInput = "<input type=hidden name='order' id='order' value='"+order+"'/>";
		 $(orderNameHiddenInput).prependTo(searchForm); 
		 $(orderHiddenInput).prependTo(searchForm);  
		 //给排序字段添加onclick方法和span
		 $("[_orderCloumnName]").each(function(i){
			var $this = $(this);
			$this.css({"text-decoration":"underline","cursor":"pointer"});
			 var oname = $this.attr('_orderCloumnName');
			 if(oname!=''){
				 $this.bind('click',function(){
				    $("#orderName").val(oname);
					if($("#order").val()=='asc'||$("#order").val()==''){
					  $("#order").val("desc");
					}else{
					   $("#order").val("asc");
					};
					searchForm.submit();
				 });
				 var span = "<span id='up_"+oname+"'></span>";
				 $span = $(span);
				 $this.append($span);
			 }
		 });
		    var orderName = $("#orderName").val();
		    orderName = orderName.replace('.','\\.');
			if($("#order").val()=='asc'){
				//$("#up_"+orderName).html("↑");
				$("#up_"+orderName).html("<img src=\""+_ctx+"/images/icons/sortAsc.gif\"  style=\"border:0\"/>");
			}else if($("#order").val()=='desc'){
				//$("#up_"+orderName).html("↓");
				$("#up_"+orderName).html("<img src=\""+_ctx+"/images/icons/sortDesc.gif\"  style=\"border:0\" />");
			};
	},
	/**
	 * 引入jquery.textselect.js
	 * 两种调用方式
	 * 1，数据源为下拉框，下拉框需隐藏
	 * $.injectAutoSelect({
		   id:"idname",//输入框id
		   dataSourceSelectId:"sid",数据源可以是下拉框的。这样下面的dataSource就是下拉框的数据,分别被解析为autotext和code 
		                             并且会将选择的value写入以下拉框id为的隐藏域中
		   mult:false, 多选还是单选 true多选，默认单选
		   autoTextMapping:"value|nt" 同时匹配的option的其他属性(可自定义)例如：<option value="" nt="">
		   
	  });
	 * $.injectAutoSelect({
		   id:"idname",//输入框id
		   dataSource:source,//数据资源 json类型格式如下：[{"autotext":"北京",code:"BJ"},{"autotext":"上海",code:"SH"}] 其中autotext 是用来进行匹配的属性
		   mult:false, 多选还是单选 true多选，默认单选
		   hiddenObjId:"ps" 例如，虽然选择的是文字，但是需要将code提交到后台，需将此部分code拼车字符串放在隐藏域中，以逗号隔开
		   
	  });
	 */
	injectAutoSelect: function(setting){
		injectAutoSelect(setting);
	},
	
	autoInsertRows: function(tab){
		var trsize=$("#"+tab+" tr").size();
		var maxTr = 12;
		if($("#"+tab+" .addbtn_bg").size()==0)maxTr=11;
		if(trsize<maxTr){
			var str = "<tr>";      
			for(var i=0;i<$("#tab tr:eq("+(maxTr-10)+") td").size();i++){
				str+="<td>&nbsp;</td>"
			}
			str+="</tr>";
			for(var j=0;j<maxTr-trsize;j++){
				$("#tab").append(str); 
			}
			$("#main_div").height($("#tab").height()+10);
		}
	},
	/**
	 * 如果页面是在当前界面的子iframe里面需要在iframe上加tooltip标签
	 */
	injectTooltip: function(){
		$("[tooltipid]").hover(
		  function(e){
		    var tooltipDiv = tooltip.showToolTip($(this)[0],e);
			$(tooltipDiv).addClass("tooltip");
		  },
		  function(e){
		    tooltip.hideToolTip($(this)[0]);
		  }
		);
	},
	isAlertPage: function(html){
	  	if(html!=null){
	  		return (html.indexOf(this.setting.alertPageFeature)!=-1);
	  	}
	  	return false;
	}
});
function formSubmit(){
	   $("#searchForm").submit();
}