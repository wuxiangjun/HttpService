//*****
loadXML = function(xmlFile)
{
    var xmlDoc;
    if(window.ActiveXObject)
    {
        xmlDoc    = new ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async    = false;
        xmlDoc.load(xmlFile);
    }
    else if (document.implementation&&document.implementation.createDocument)
    {
        xmlDoc    = document.implementation.createDocument('', '', null);
        xmlDoc.load(xmlFile);
    }
    else
    {
        return null;
    }
    
    return xmlDoc;
}

/*************************************************************************************************************/

//标签页（下面无按钮的），参数n从0计数
function topWithoutUnderBtn(n){
	//var topDiv = document.getElementById('tabBox').getElementsByTagName('span');
	var topDiv =$("#tabBox").find("span").not($(".tab_line"));
	for(var i=0;i<topDiv.length;i++){
		$(topDiv[i]).attr("class","normal");
		$(topDiv[2*n]).attr("class","hover");
	}

	for(i=0;i<mainTable.tBodies.length;i++){
		mainTable.tBodies[i].style.display="none";
		mainTable.tBodies[n].style.display="block";	
	}
	
//	alert($("#commTabType"));
	$("#state").val(n);
	
//	alert($("#commTabType").value);
}

//标签页（下面有按钮的），参数n从0计数
function topWithUnderBtn(n){ 
	/**var topDiv = document.getElementById('tabBox').getElementsByTagName('span');
	for(var i=0;i<topDiv.length;i++){
		topDiv[i].className = "normal";
		topDiv[3*n].className = "hover";
	}**/
	var topDiv =$("#tabBox").find("span").not($(".tab_line"));
	for(var i=0;i<topDiv.length;i++){
		$(topDiv[i]).attr("class","normal");
		$(topDiv[2*n]).attr("class","hover");
	}
	for(i=0;i<mainTable.tBodies.length;i++){
		mainTable.tBodies[i].style.display="none";
		mainTable.tBodies[n].style.display="block";	
	}
	document.getElementById('ts_tabmenu').style.display="block";
	var underDiv = document.getElementById('ts_tabmenu').getElementsByTagName('ul');
	for(var i=0;i<underDiv.length;i++){
		underDiv[i].style.display = "none";
		underDiv[n].style.display = "block";
		$(underDiv[i]).find("li").each(function (){
			  $(this).children().css({'background':'url(../images/tab/tabs.png) no-repeat left top','margin-left': '-5px'});
			  $(this).children().children().css({'background':'url(../images/tab/tabs.png) no-repeat right top','color':'#666666'});
			});
	}
}

//标签页中点击下方按钮，变换mainTable里的内容。参数n从0计数
function underBtn(n,m){
		if(null!=m&&typeof(m)!='undefined'){
		var smb=$(m).parent().parent();
		var ss=smb.find("li");
		for(var i=0;i<ss.length;i++){
			$(ss[i]).children().css({'background':'url(../images/tab/tabs.png) no-repeat left top','margin-left': '-5px'});
			$(ss[i]).children().children().css({'background':'url(../images/tab/tabs.png) no-repeat right top','color':'#666666'});
		}
		$(m).css({'position':'relative','z-index': '5','background':'url(../images/tab/tabs.png) no-repeat left bottom','color': '#fff'});
		$(m).children().css({'position':'relative','z-index': '5','background':'url(../images/tab/tabs.png) no-repeat right bottom','color': '#fff'});
		}
	
	for(i=0;i<mainTable.tBodies.length;i++){
		mainTable.tBodies[i].style.display="none";
		mainTable.tBodies[n].style.display="block";	
	}
}
//标签页中，有的标签不需要有下方div的，让其隐藏
function hiddenDiv(id){
	document.getElementById(id).style.display = "none";
}
// ���ȶ�xml��������ж�
checkXMLDocObj    = function(xmlFile)
{
    var xmlDoc    = loadXML(xmlFile);
    if(xmlDoc==null)
    {
        alert('����������֧��xml�ļ���ȡ,���Ǳ�ҳ���ֹ��Ĳ���,�Ƽ�ʹ��IE5.0���Ͽ��Խ��������!');
        window.location.href='/index.html';
    }
    
    return xmlDoc;
}

// Ȼ��ʼ��ȡ��Ҫ��Login/Weapon/W�ĵ�һ���ڵ������ֵ
//var xmlDoc    = checkXMLDocObj('/EBS/XML/Login.xml');
//var v    = xmlDoc.getElementsByTagName('Login/Weapon/W')[0].childNodes.getAttribute('Text')


initializeSelect    = function(oid, xPath)
{
    var xmlDoc    = checkXMLDocObj('resource.xml');
    
    var n;
    var l;
    var e    = $(oid);
    if(e!=null)
    {
    		alert(xmlDoc.getElementsByTagName(xPath).length);
        n    = xmlDoc.getElementsByTagName(xPath)[0].childNodes;
        
        l    = n.length;
        for(var i=0; i<l; i++)
        {
            //var option    = document.createElement('option');
           // option.value    = n[i].getAttribute('Value');
            //option.innerHTML    = n[i].getAttribute('Text');
            //e.appendChild(option);
            alert(n[i].getAttribute('desc'));
        }
    }
}

//��ȡһ��menu�˵���*****
function Menu(){
	this.descList = new Array();
	this.idList = new Array();
	this.xmlDoc = null;
	this.getMenu = function(){
		this.xmlDoc = checkXMLDocObj('resource.xml');
		var menus = this.xmlDoc.getElementsByTagName('root/menu');
		for(var i=0; i<menus.length; i++){
			var menu = menus[i];
			var desc = menu.getAttribute('desc');
			var id = menu.getAttribute('id');
			//alert(name+":" + desc);
			this.descList.push(desc);
			this.idList.push(id);
		}
	};
	
	this.getSubMenu=function(id){
		var nodeList = new Array();
		if(this.xmlDoc==null){
			this.xmlDoc = checkXMLDocObj('resource.xml');
		}
		var menus = this.xmlDoc.getElementsByTagName('root/menu');
		for(var i=0; i<this.idList.length; i++){
			if(id == this.idList[i]){
				var menuNode = menus[i].childNodes;
				for(var j=0; j<menuNode.length;j++){
					nodeList.push(menuNode[j].getAttribute('desc'));
				}
			}
		}
		alert(nodeList);
		return nodeList;
	};
}

//һ�������˵���ת����****
function getSubMenu(id){
	var menu=parent.document.getElementById("left_box");
	if(id=="JSYJ"){
		menu.cols="0,0,*";
	}
	else{
		menu.cols="220,5,*";
	}
	parent.document.getElementById("leftFrame").src="left/left_"+id+".html";
	parent.document.getElementById("mainFrame").src="view/default_"+id+".html";
}
//���id ���ÿ�ܿ��
function setFrameWidth(id){
	var frameSet=parent.document.getElementById("left_box");
	if(id == "JSYJ"){
		frameSet.cols="0,0,*";
	}else{
		frameSet.cols="220,5,*";		
	}
}

//����Ԥ�� Ӧ������ ��ť ��ת����****
function getAppView(id){
	var menu=parent.document.getElementById("left_box");
	if(menu == null){
		menu = parent.parent.document.getElementById("left_box");
		menu.cols="190,5,*";
		parent.parent.document.getElementById("leftFrame").src="left/left_"+id+".html";
		parent.parent.document.getElementById("mainFrame").src="view/default_"+id+".html";
	}else{
		menu.cols="190,5,*";
		parent.document.getElementById("leftFrame").src="left/left_"+id+".html";
		parent.document.getElementById("mainFrame").src="view/default_"+id+".html";
	}
}
function getAppView_(id){
	var menu=parent.document.getElementById("left_box");
	if(menu == null){
		menu = parent.parent.document.getElementById("left_box");
		menu.cols="190,5,*";
	}
	window.open("left/left_"+id+".html","leftFrame");
	window.open("default_"+id+".html","maiFrame");
	
}

//����Ԥ������FrameSet�Ľṹ��������߿�
function setSingleFrame(){
	var menu=parent.document.getElementById("left_box");
	
	menu.cols="0,0,*";
}
//����Ԥ�� Ӧ������ ��߿��ڰ�ť ��ת����****
function getButtonView(pageName,args){
	var src = "view/"+pageName+".html";

	if(args != null && typeof(args) != "undefined" && args != ""){
		src += "?"+args;
	}
	parent.document.getElementById("mainFrame").src=src;
}


 //HTML��ȡURL���ݵĲ���sArgName��ʾҪ��ȡ�ĸ������ֵ
 function GetArgsFromHref(sArgName){
 //var sHref = "Untitled-2.html?id=2"//������ݣ�ʵ���������window.location.href�õ�URL
  var sHref = window.location.href;
	var args = sHref.split("?");
	var retval = "";
	if(args[0] == sHref) /*����Ϊ��*/
	{
		return retval; /*�������κδ���*/
	}
	var str = args[1];
	args = str.split("&");
	for(var i = 0; i < args.length; i++ )
	{	
		var arg = args[i].split("=");
		if(arg.length <= 1) continue;
		if(sArgName == arg[0])
			retval = arg[1];
	}
 	return retval;
}

//��껮��ͼ�?div����ʾ������
var oDiv;
function showDiv(id){
	var obj= document.getElementById(id);
	if(obj==null || obj== 'undify'){
		obj= parent.document.getElementById(id);
	}
	obj.style.visibility = "visible";
}
function hiddenDiv(id,delay){
	if(delay==null || delay== 'undify')
		delay=0;
	oDiv = setTimeout(function(){doHidden(id)},delay);
	
}
function doHidden(id){
	var obj= document.getElementById(id);
	if(obj==null || obj== 'undify'){
		obj= parent.document.getElementById(id);
	}
	obj.style.visibility = "hidden";
}
function stopHidden(id){
	if(oDiv!= 0){
		clearTimeout(oDiv);
		oDiv = null;
	}
	document.getElementById(id).style.visibility = "visible";
}
//��˸Ԫ��
var yingxiangheliu;
function flash(id){
	if(!yingxiangheliu){
		yingxiangheliu=setInterval(function(){doFlash(id);},300);
	}
}
function doFlash(id){
	if (!document.getElementById(id).style.visibility){
		document.getElementById(id).style.visibility = "visible";
	}
	if (document.getElementById(id).style.visibility == "visible"){
		document.getElementById(id).style.visibility = "hidden";
	}else{
		document.getElementById(id).style.visibility = "visible";
	}
}
//ֹͣ��˸Ԫ��
function stopFlash(id)
{
	clearTimeout(yingxiangheliu);
	yingxiangheliu=null;
	document.getElementById(id).style.visibility = "hidden";
}

function swapShow(id){
	var element = document.getElementById(id);

	if(element == null) return;
	
	var state = element.style.visibility;

	if(state == "hidden")
		element.style.visibility = "visible";
	else
		element.style.visibility = "hidden";
}
//�����ѡ��Ԫ����ʾ�ı��༭��
function showInput(tdObj,showObjId){
	if(tdObj==null || showObjId==null)
		return;
	var value = tdObj.innerHTML;
	var left = tdObj.offsetLeft;
	var top  = tdObj.offsetTop;
	var e = tdObj;
	while(e=e.offsetParent){
		left += e.offsetLeft;
		top  += e.offsetTop;
	}
	var showObj = document.getElementById(showObjId);
	showObj.style.left= left+2;
	showObj.style.top = top+2;
	showObj.value = value;
	showObj.style.visibility="visible";
}

//�������ʱ���������ҳ�棬���������Ϣ��д����������
//������׼ʱ��������׼ҳ�棬������׼��Ϣ��д����������
function showdialog(winDig,statusID){
	var src = winDig;
	var someValue = window.showModalDialog(src,"","dialogWidth=300px;dialogHeight=100px;status=no;help=no;scrollbars=no;edge=raised;");
	if( someValue != null || someValue != undefined){
		document.getElementById(statusID).innerHTML = someValue.status;
	}
}

//���¼�����ҳ����ô�ҳ��ʱ���ص�ǰλ�ã������෴,
//ÿ���˵����¼�����ҳ��ͬʱ����ʾ����Ҫ���д����ã��������
function show(){
	/*
	var entryType = GetArgsFromHref("entryType");
	var obj = document.getElementById("nav");
	if(entryType == 2 && typeof(obj) != "undefined" && obj != null){
		obj.style.display = "block";
	}*/
	
	var obj = document.getElementById("nav");
	var frame = parent.document.getElementById("leftFrame");
	if(frame == null){
		frame = parent.parent.document.getElementById("leftFrame");
	}
	var leftSrc = frame.src;
	if(leftSrc.indexOf("left_JSYJ") != -1){
		obj.style.display = "none";
	}
	
}

/**获取行政区树*/
//base 有无站点  type 站点类型    isc  是否单选  0 单选 1 复选     树形结构单选时 传入的stcd默认值 
function getregionTree(base,type,isc,stcd){
	type=encodeURI(encodeURI(type));
	var url=_ctx+"/pub/getregiontree/getregion.do";
	url=url+"?type="+type+"&base="+base+"&isc="+isc+"&stcd="+stcd;
    window.showModalDialog(url,window,'dialogWidth=500px;dialogHeight=300px;status=no;help=no;scrollbars=no;');

}
/**获取流域树*/
//base 有无站点  type 站点类型    isc  是否单选  0 单选 1 复选     树形结构单选时 传入的stcd默认值
function getriverTree(base,type,isc,stcd){
	type=encodeURI(encodeURI(type));
	var url=_ctx+"/pub/gettree/riverlist.do";
	url=url+"?type="+type+"&base="+base+"&isc="+isc+"&stcd="+stcd;
    window.showModalDialog(url,window,'dialogWidth=500px;dialogHeight=300px;status=no;help=no;scrollbars=no;');

}

/**保持标签页状态*/
function tabstate(type){
	if(type!=null&&type!=""&&typeof(type)!=undefined&&type!='null'){
		topWithoutUnderBtn(type);
	}
		
}

/**as调用跳出窗口通用方法*/
function showDialog(toUrl){
	//河流控制断面 type参数，不同类型跳转不同的页面
	/* var rbtype= $("#rbtp").val();
	 var enrbtype=encodeURI(encodeURI(rbtype));
	 if(rbtype!=null&&rbtype!=""&&typeof(rbtype)!=undefined&&rbtype!='null'){
	   toUrl=toUrl+'&rbtp='+enrbtype
     }*/
	 window.showModalDialog(toUrl,window,'dialogWidth=700px;dialogHeight=620px;center:yes;resizable:no;status:no;help:no;scrollbars:no;');
	}
/**当获取焦点时触发*/
var s="";
var objs;
var tablename;
var tablecolid;
var tablecolname;
function startjudge1(obj){
	objs=obj;
	var oldval=$(obj).attr("value");
	if($("#type").val()==1||$("#type").val()==6){
		tablename=$(obj).attr("tablename");
		tablecolid=$(obj).attr("tablecolid");
		tablecolname=$(obj).attr("tablecolname");
	}
	if($("#type").val()==2){
		tablename=$(obj).attr("tablename2");
		tablecolid=$(obj).attr("tablecolid2");
		tablecolname=$(obj).attr("tablecolname2");	
	}
	if($("#type").val()==3){
		return false;
	}
	var condition =$(obj).attr("condition");
	var order=$(obj).attr("orders");
	
	s= setInterval(function(){
	   var oldvaln=$(obj).attr("value");
	   if(oldval!=oldvaln){
		 oldval=oldvaln;
		
	       autoComple1(oldvaln,tablename,tablecolid,tablecolname,condition,obj,order);
		 
	  }
	   
  },1000); 
	 
}
	  
/**当失去焦点时触发*/
 function stopjudge1(){
	  
  clearInterval(s);
  cha();
  
 }
	  
/**鼠标划过**/
 function A (obj){
	  $(obj).css({"backgroundColor":"#bbdefe","font-weight":"bold"});
	  
 }
/**鼠标离开*/
 function B (obj){
	  
	 $(obj).css({"backgroundColor":"#E3F0F9","font-weight":""});
	  
 }
/***自动补全方法*/
function autoComple1(oldval,tablename,tablecolid,tablecolname,condition,obj,order){
 var val=$(obj).attr("value");
 var reg=/[\u4e00-\u9fa5]/g ;
 var flag= reg.test(val);
 var left=$(obj).offset().left;
 var top=$(obj).offset().top;
 var h=$(obj).height();
 var wid=$(obj).width();
 var orders="'"+order+"'";
 var mt=top+h;
 $(".bdsug1").css({"display":"block","margin-top":top-20,"margin-left":"480px","z-index": "999","width": wid+7,"overflow":"auto","position": "absolute"});
 /**正则判断汉字还是其他**/
     $.ajax({
		   type: "POST",
		   url:_ctx+"/common/autocomplete/list.do",
		   data:{
			    val:val,
	 		 	flag:flag,
	 		 	tablename:tablename,
	 		 	tablecolid:tablecolid,
	 		 	tablecolname:tablecolname,
	 		 	conditions:condition,
	 		 	timestamp:new Date().getTime()
		   },
		   success: function(msg){
		      var content='<ul class='+order+'>';
			   if(msg.length>0){
			       for(var i=0;i<msg.length;i++){
					  var val=msg[i].VAL;
					  var vals="'"+val+"'";
						content+="<li class='' val="+vals+" onclick=pay1("+vals+","+orders+"); onmouseover=A(this); onmouseout=B(this);  >"+val+"</li>";
					}
			    
			    content+='</ul>'
			     var jcontent = $(content);
			    $(".bdsug1").empty();
				$(".bdsug1").append(jcontent);
				if($("#type").val()==2){//如果能查出来取水口 ，就不是黑户
					document.getElementById("latitude").setAttribute("readOnly",true);
					document.getElementById("latitude").style.backgroundColor="#dcdcdc";
					document.getElementById("longitude").setAttribute("readOnly",true);
					document.getElementById("longitude").style.backgroundColor="#dcdcdc";
					document.getElementById("int_nm").setAttribute("readOnly",true);
					document.getElementById("int_nm").style.backgroundColor="#dcdcdc";
					document.getElementById("mp_addr").setAttribute("readOnly",true);
					document.getElementById("mp_addr").style.backgroundColor="#dcdcdc";
					$("#blackMan").val(0);
					}
			  }else{
				 if($("#type").val()==2){//如果查不出来取水口，就说明是黑户，就可以自己填写
						document.getElementById("latitude").setAttribute("readOnly",false);
						document.getElementById("latitude").style.backgroundColor="#ffffff";
						document.getElementById("longitude").setAttribute("readOnly",false);
						document.getElementById("longitude").style.backgroundColor="#ffffff";
						document.getElementById("int_nm").setAttribute("readOnly",false);
						document.getElementById("int_nm").style.backgroundColor="#ffffff";
						document.getElementById("mp_addr").setAttribute("readOnly",false);
						document.getElementById("mp_addr").style.backgroundColor="#ffffff";
						$("#blackMan").val(1);
				 }
				 $(".bdsug1").css({"display":"none"});
			  }
     	}
		   });
  	   
}

/***点击赋值*/
function pay1(val,orders){
	
	$("#"+orders).val(val);
	$(".bdsug1").css({"display":"none"});
	cha();
}

	var vals=0;
	function keychang1(up,orders) {
		    var $list=$("."+orders);
		    var hover = $list.children('.hoverme');
		    index = hover.index();
		   
		    if (up == "up") {
		        if (index == 0) {
		        	//需要循环滚动解开注释 从第一个到最后一个
		            //hover.removeClass('hoverme');
		            //$list.children('li:last').addClass('hoverme');
		        } else if(index==-1){
		        	 upscroll1(index);
		        	 $list.children('li:first').addClass('hoverme');
		        }else {
		        	upscroll1(index);
		            hover.removeClass('hoverme').prev().addClass('hoverme');
		        }
		    } else if(up=="down") {
		        if (index == ($list.children('li').length - 1)) {
		        	//需要循环滚动解开注释 从第最后一个到第一个
		            //hover.removeClass('hoverme');
		            //$list.children('li:first').addClass('hoverme');
		        }  else if(index==-1){
		        	 downscroll1(index);
		        	 $list.children('li:first').addClass('hoverme');
		        }else {
		        	downscroll1(index);
		            hover.removeClass('hoverme').next().addClass('hoverme');
		        }
		    }
		  
		};
		
		/*up键滚动*/
		
		function upscroll1(index){
		 	 if(index!=-1){
		 		    var num=index/4;
		 		    var s=$("#bdsug1id");
		 		    if(vals!=0&&index!=0){
	 		 		    if(index%4==0){
	 		 		    	 vals=vals-100;
	 		 		    	s.scrollTop1(vals);
	 		 		    }
		 		    }
	 		    }
			
		}
		
		/*down键滚动*/
		
		function downscroll1(index){
			 if(index!=-1){
		 		    var num=(index+1)/4;
		 		    var s=$("#bdsug1id");
		 		    if((index+1)%4==0){
		 		    	 vals=num*100;
		 		    	s.scrollTop1(vals);
		 		    }
	 		    }
			
		}
		
		function getvalue1(orders){
			var selectval = $("."+orders).children('.hoverme').attr("val");
			if(selectval){
				$("#"+orders).val(selectval);
			}
			stopjudge1(); 
			$(".bdsug1").css({"display":"none"});
			startjudge1(objs);
		}
		
		
	 function keydownf1(obj,event){
		 
	    	 
	    	 var order=$(obj).attr("orders");
	    	
	    	 
	    	 if (window.event) {   
		  			var key = window.event.keyCode;  
		  		
		  		} else { 
		  				
		  			var key = event.which;   
		  		 }         
		  		if (key == 38)//向上  
		  		{
		  		  keychang1("up",order);
		  		
		  		}	
		  		if (key == 40)//向下 
		  		{
		  		  keychang1("down",order);
		  		
		  		}
			    if (key == 13) {
			    	
			      getvalue1(order);
			      
			      return false;
			    }
	     }
