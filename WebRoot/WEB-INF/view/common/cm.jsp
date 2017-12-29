<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
 String ctx = request.getContextPath();
 pageContext.setAttribute("ctx", ctx);
%>
<script type="text/javascript">
function go(url){
  self.location=url;
}
</script>
<!-- js -->
<script src="${ctx}/js/lib/jquery-1.8.3.js" type="text/javascript"></script>
<script src="${ctx}/js/lib/chromatable.js" type="text/javascript"></script>
<script src="${ctx}/js/lib/jquery.form.js" type="text/javascript"></script><!-- ajax form插件 -->
<script src="${ctx}/js/lib/jquery.validator.js"></script><!-- JS from验证插件 -->
<script src="${ctx}/js/lib/My97DatePicker/WdatePicker.js" type="text/javascript"></script><!-- 日历控件 -->
<script src="${ctx}/js/lib/jQuery.Hz2Py-min-dim.js" type="text/javascript" ></script>
<script src="${ctx}/js/lib/jquery.textselect.js"  type="text/javascript"></script>
<script src="${ctx}/js/si.ajax.js" type="text/javascript"></script>
<script src="${ctx}/js/si.util.js" type="text/javascript"></script>
<script src="${ctx}/js/si.common.js" type="text/javascript"></script>
<script src="${ctx}/js/lib/tooltip.js" type="text/javascript"></script>
<script src="${ctx}/js/resource.js" type="text/javascript"></script>

<!--easyui JS -->
<link rel="stylesheet" type="text/css"
	href="${ctx}/js/jquery-easyui-1.4.1/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="${ctx}/js/jquery-easyui-1.4.1/themes/icon.css">
<script type="text/javascript"
	src="${ctx}/js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>