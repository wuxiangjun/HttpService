var tooltip = {};
function showPopup(inp,e) {
	var myPop = tooltip.myPop;
	 
    if (!myPop) {
    	myPop = tooltip.myPop=new dhtmlXPopup();
    }
    var msg = getMsg(inp);
    
    
    if(msg!=null && $.trim(msg) != ''){
        if(msg.length>80){
        	myPop.attachHTML("<div style=\"width:500px;white-space:normal;word-break:break-all;\">"+msg+"</div>");
        }else{
        	 myPop.attachHTML(msg);
        }
       
       // if (myPop.isVisible()) {
       //     myPop.hide();
       // } else {
            var x = getAbsoluteLeft(inp);
            var y = getAbsoluteTop(inp);
            var w = inp.offsetWidth;
            var h = inp.offsetHeight;
            myPop.show(x, y, w, h);
       // }
    }
}
function getMsg(obj){
	var msg = obj.getAttribute("rawstr") || obj.getAttribute("title");

	(obj.getAttribute("title") && obj.setAttribute("rawstr", obj.getAttribute("title")));

	(obj.getAttribute("title") && obj.setAttribute("title", ""));

	var tooltipurl = obj.getAttribute("tooltipurl");
	
	// 如果rawstr没有值查看tooltipurl通过异步方式加载内容
	if ((msg == null || msg == '') && tooltipurl != '') {
		$.htmlGet({
			// 设置ajax同步
			async : false,
			url : tooltipurl,
			success : function(html) {
				msg = html;
			}
		});
	}
	var endstr = msg;//$.strJoin(msg,100,'<br/>');
	
	return endstr==null?'':endstr;
}
function hidePopup() {
	var myPop = tooltip.myPop;
    if (myPop)
        myPop.hide();
}
tooltip.showToolTip = function(obj, evt) {
	showPopup(obj);
}
tooltip.hideToolTip = function(obj) {
	hidePopup(obj);
}
