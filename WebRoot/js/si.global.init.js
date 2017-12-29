/**
 * 所有界面通用的初始化操作，包括：1表格隔行换色2表格自动补空行。方法调用来自si.common.js
 * **********注意执行顺序********
 */

$(function() {
	//操作权限
	$("[_auth_show_flag='false']").remove();
	//隔行换色
	//$(".table_box[tabbg!=off]").each(function(){
	//	tb($(this)[0]);
	//});
	//插入空行
	//$.autoInsertRows("tab");
	
//	$.injectTooltip();
});