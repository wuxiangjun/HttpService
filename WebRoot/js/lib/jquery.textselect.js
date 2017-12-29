var m_strTextselectDiv="Textselectshow_Div"
var m_intTextSelectIn=false
var maxRowToshow = 500;//解决下拉框太长，性能问题，超过500行后面的不显示
var ie=(document.getElementById && document.all);

for(var IDx=0,IDy='';document.getElementById(m_strTextselectDiv)!=null;IDx++,IDy=IDx){
 m_strTextselectDiv=(document.getElementById(m_strTextselectDiv + IDy)==null)?m_strTextselectDiv + IDy:m_strTextselectDiv
}
document.write ('<div tabindex=0 id="' + m_strTextselectDiv + '" onclick="checkFocus(event)" style="position: absolute;cursor: default;border: 1px solid #000;background-color: #fff;display: none;"></div>')

window.onload=function(){
	//div失去焦点时关闭div,并设置默认值
    document.getElementsByTagName("html")[0].onclick=function(e){
    	hiddenShowDiv("none");
    	setDefault();
    }
};
function checkFocus(e){
    //document.getElementById(m_strTextselectDiv).style.display="block";
    if ( e && e.stopPropagation )
        e.stopPropagation();
    else
        window.event.cancelBubble = true;
}
//获取对象的坐标
function getPosition(Obj) 
{
 try{
  for (var sumTop=0,sumLeft=0;Obj!=window.document.body;sumTop+=Obj.offsetTop,sumLeft+=Obj.offsetLeft,Obj=Obj.offsetParent);
  return {left:sumLeft,top:sumTop}
 }catch(e){}
}

var mult = false;
//处理Div中的选项/* 某个选项，输入框的ID号 */
function divOnmoveover(selectChildDiv,objText,objTextCode,objinput,hiddenObjId){
	 var objChilddiv=selectChildDiv.parentNode.getElementsByTagName("div")
	 for(var x=0;x<objChilddiv.length;x++){objChilddiv[x].style.cssText='white-space: nowrap'}
	 selectChildDiv.style.cssText='background-color: #46A3FF;color: #ffffff;white-space: nowrap';
	 
	 selectChildDiv.onmousedown=function(){
		 m_intTextSelectIn=false;
		 $("#"+objinput).val(objText);
		 $("#"+hiddenObjId).val(objTextCode);
		 hiddenShowDiv('none');
		 //调用用户自定义 
		 if(typeof currentSetting.callBack==='function'){
			 currentSetting.callBack(objTextCode);
		 }
		
	 }
}

function checkBoxOnmoveover(selectChildCheckBox,objText,objTextCode,objinput,hiddenObjId){
		 m_intTextSelectIn=false;
		 var objChildchecbox =  selectChildCheckBox.parentNode.getElementsByTagName("input")
		 var selectVals = [];
		 var selectCodes = [];
		 for(var i in objChildchecbox){
			
			 if(objChildchecbox[i].checked){
				 selectVals.push(objChildchecbox[i].value);
				 selectCodes.push($(objChildchecbox[i]).attr("code"));
			 }
		 }
		 $("#"+objinput).val(selectVals.join(","));
		 $("#"+hiddenObjId).val(selectCodes.join(","));
}
//当前设置
var currentSetting;
function showSelect(setting){
     mult = setting.mult;
     var inputObj = setting.inputObj;
     var hiddenObjId = setting.hiddenObjId;
     var rs=setting.rsToShow;
	 var ie=(document.getElementById && document.all);
	 var objDiv =document.getElementById(m_strTextselectDiv);
	 setOldDefault(objDiv);//检查前一个选择的输入框的值
	 hiddenShowDiv('none');//隐藏当前div
	 $(objDiv).attr("inputObjId",inputObj.id);
	 $(objDiv).attr("hiddenObjId",hiddenObjId);
	 objDiv.innerHTML=''
	 if(rs.length==0){
	   return;
	 }
	 var maxWidth = 0;
	 var divHeight = (document.body.offsetHeight-getPosition(inputObj).top-inputObj.offsetHeight-4);
	 var onrowSize=14.5;//每行大概的高度
	 var dataToShow = "";
	 for(var x=0;x<rs.length;x++)
	 {
		 if(rs[x].autotext.length>maxWidth){
			 maxWidth = rs[x].autotext.length;
		 }
		 if(mult){
			 dataToShow+="<input type=\"checkbox\" value=\"" + rs[x].autotext + "\" code=\""+rs[x].code+"\"  onclick=\"checkBoxOnmoveover(this,'" + rs[x].autotext + "','" + rs[x].code + "','" + inputObj.id + "','" + hiddenObjId + "')\"/><div name=\"_cselect\" style='width:85%;white-space: nowrap;cursor: default;float:right;display:inline'>"+rs[x].autotext+"</div><br>"; 
		 }else{
			 dataToShow+="<div name=\"_cselect\" value=\"" + rs[x].autotext + "\" code=\""+rs[x].code+"\" onmouseover=\"divOnmoveover(this,'" + rs[x].autotext + "','" + rs[x].code + "','" + inputObj.id + "','" + hiddenObjId + "')\" style='width:100%;white-space: nowrap;cursor: default;'>"+rs[x].autotext+"</div>";
		 }
		 if(x>maxRowToshow)break;
	 }
	 objDiv.innerHTML=dataToShow;
 //调整Div高度，过度显示滚动条,根据当前输入框和窗口底部和顶部的高度来确定下拉框的高度
	 var hight_buttom = inputObj
	 objDiv.style.left=getPosition(inputObj).left+"px";
	 objDiv.style.top=(getPosition(inputObj).top+inputObj.offsetHeight)+"px";
	 objDiv.style.width=(inputObj.offsetWidth-2)+"px";
	 //alert(obj.offsetWidth);
	 
	 objDiv.style.overflowY='';
	 objDiv.style.height='auto';
	 if(x*onrowSize>divHeight)
	 {
	  objDiv.style.height=divHeight+"px";
	 }
	 objDiv.style.overflowY='auto';
	 objDiv.style.overflowX='auto';
	 hiddenShowDiv('block');
	// inputObj.value=objDiv.innerHTML;
	
 //if(ie){HideOverSels(objDiv.id)}
 //objDiv.onmouseover=function(){m_intTextSelectIn=true}
// objDiv.onmouseout=function(){m_intTextSelectIn=false;obj.focus();}
}

function hiddenShowDiv(hs){
	var objDiv =document.getElementById(m_strTextselectDiv);
	objDiv.style.display=hs;
}
// 隐藏被ID为objID的对象（层）遮挡的所有select
function HideOverSels(objID){
  var sels = document.getElementsByTagName('select'); 
  for (var i = 0; i < sels.length; i++) 
  if (Obj1OverObj2(document.getElementById(objID), sels[i]))
   sels[i].style.visibility = 'hidden'; 
   else
   sels[i].style.visibility = 'visible';
}

//判断obj1是否遮挡了obj2
function Obj1OverObj2(obj1, obj2){
	var pos1 = getPosition(obj1) 
	var pos2 = getPosition(obj2) 
	var result = true; 
	var obj1Left = pos1.left - window.document.body.scrollLeft; 
	var obj1Top = pos1.top - window.document.body.scrollTop; 
	var obj1Right = obj1Left + obj1.offsetWidth; 
	var obj1Bottom = obj1Top + obj1.offsetHeight;
	var obj2Left = pos2.left - window.document.body.scrollLeft; 
	var obj2Top = pos2.top - window.document.body.scrollTop; 
	var obj2Right = obj2Left + obj2.offsetWidth; 
	var obj2Bottom = obj2Top + obj2.offsetHeight;
	
	if (obj1Right <= obj2Left || obj1Bottom <= obj2Top || 
	  obj1Left >= obj2Right || obj1Top >= obj2Bottom) 
	  result = false; 
	return result; 
}
var defaultVal = "全部";
var defaultHiddenVal = "";
//调用
function injectAutoSelect(setting){
	if(setting==null)return;
  setting.inputObj = $("#"+setting.id)[0];
  var reLoadAble = setting.reLoadAble||false;//是否下拉框数据可刷新，用来处理级联更新情况
  
  initSource(setting);
  
  $("#"+setting.id).bind("click keyup",function(e){
	  if(reLoadAble){
		  initSource(setting);
	  }
	 checkFocus(e)
	 setting.search = $("#"+setting.id).val();
	 if($("#"+setting.id).val()==defaultVal){
		 $("#"+setting.id).val("");
		 $("#"+setting.hiddenObjId).val(defaultHiddenVal);
	 }
     dimSearch(setting);
  })
}
//设置默认值如果为“”这设为默认值（全部）
function setDefault(){
	if(currentSetting==null)return;
	 var inputObj = currentSetting.inputObj;
	 var hiddenObjId = currentSetting.hiddenObjId;
	 if(inputObj.value==''){
		 inputObj.value=defaultVal;
		 $("#"+hiddenObjId).val(defaultHiddenVal);
	 }
}
//查看上次选择的下拉框矿的值，设置默认值
function setOldDefault(objDiv){
	if(objDiv==null)return;
	var oldinputObjId = $(objDiv).attr("inputObjId");
	var oldhiddenObjId =$(objDiv).attr("hiddenObjId");
	if(oldinputObjId&&oldinputObjId!=null&&oldinputObjId!=currentSetting.inputObj.id){
		 var inputObj = $("#"+oldinputObjId);
		 if(inputObj.val()==''){
			 inputObj.val(defaultVal);
			 $("#"+oldhiddenObjId).val(defaultHiddenVal);
		 }
	}
}

//初始化资源
function initSource(setting){
	 var initCode;
	 if(setting.dataSourceSelectId){
		 var selectObjId = setting.dataSourceSelectId;
		 setting.hiddenObjId = selectObjId;
    	 setting.dataSource = generalSelectSource(setting);
    	 var selected = $("#"+selectObjId+" option:selected");
    	 initCode = selected.val()||"";
    	 if(selected){//如果有默认输入值放入输入框里
    	  setting.inputObj.value=selected.text();
    	  //callback
    	  //调用用户自定义 
 		 if(typeof setting.callBack==='function'){
 			setting.callBack(initCode);
 		 }
    	 }
    	 
    	 if($("#"+selectObjId)&&$("#"+selectObjId).attr("type")!='hidden'){
    		 $("#"+selectObjId).attr("name","_old"+$("#"+selectObjId).attr("name"));
    		 $("#"+selectObjId).attr("id","_old"+selectObjId);
    	 }
	 }
	 var hiddenObjId = setting.hiddenObjId;
	 var inputObj = setting.inputObj;
	 if(!$("#"+hiddenObjId)[0]){
    	 $("<input type=\"hidden\" name=\""+hiddenObjId+"\" value=\""+initCode+"\" id=\""+hiddenObjId+"\">").insertAfter($(inputObj))
     }
	 
	 var source = setting.dataSource;
	if(source==null)return;
	//解析autoTextMapping 0~autoTextMappingLength
	var mapping = [];
	  for(var i in source){
		  mapping[i] = {};
		  for(var j in source[i]){
			  if(j.indexOf("autoTextMapping")!=-1){
				  if(source[i][j]!=null&&source[i][j]!=''){
					  var pyword = toPinyin(source[i][j])
					  var fpyword = getFirstChar(pyword);
					  mapping[i].autotext = source[i].autotext;
					  mapping[i].code = source[i].code;
					  mapping[i][j+"_lraw"] = (source[i][j]).toLowerCase();
					  mapping[i][j+"_pyword"] = (pyword).toLowerCase();
					  mapping[i][j+"_fpyword"] = (fpyword).toLowerCase();
				  }
			  }
		  }
	   }
	  setting.mapping = mapping;
	}
function generalSelectSource(setting){
	
	var selectid =  setting.dataSourceSelectId;
	var reLoadAble = setting.reLoadAble||false;//是否下拉框数据可刷新，用来处理级联更新情况
	  if(reLoadAble&&$("#"+selectid).attr("type")=='hidden'){
		  selectid="_old"+selectid;
	  }
	var autoTextMapping = setting.autoTextMapping;
	var rs = [];
	$("#"+selectid+" option").each(function(){
		var rsData = {};
		rsData.autotext = $(this).text();
		rsData.code = $(this).val();
		//解析autoTextMapping
		if($.trim(autoTextMapping)!=''){
			var autoTextMappingArray = autoTextMapping.split("|");
			for(var i in autoTextMappingArray){
				var autoTextMappingKey = autoTextMappingArray[i];
				if("autotext"==autoTextMappingKey||"code"==autoTextMappingKey){
					alert("autoTextMapping 名称不能为autotext 或者code!");
				}
				var autoIndex = Number(i)+1;
				rsData["autoTextMapping"+autoIndex]=$(this).attr(autoTextMappingKey);
			}
		}
		rsData["autoTextMapping0"]=$(this).text();//下拉框的显示内容有限匹配
		rs.push(rsData);
	});
	//alert(rs);
	return rs;
}
function dimSearch(setting){
   currentSetting = setting;
   var val = setting.inputObj.value;
   var blankShow = setting.blankShow;
   if(blankShow==null)blankShow=true;
   if(!blankShow&&$.trim(val)==''){
	   hiddenShowDiv('none');
	   setOldDefault(document.getElementById(m_strTextselectDiv));
	   return;
   }
   if($.trim(val)=='')
   {
	  val=".";//没有值得时候，匹配全部
   }
   var rsToShow = [];
   var reg = new RegExp(val);
   var mapping = setting.mapping;
   for(var i in mapping){
	   for(var j in mapping[i]){
			  if(j.indexOf("autoTextMapping")!=-1){
				  if(val=="."||reg.test(mapping[i][j])){
					   rsToShow.push({autotext:mapping[i].autotext,code:mapping[i].code});
					   break;//有一个属性匹配上就停止匹配
				   }
			  }
		  }
   }
   setting.rsToShow = rsToShow;
   showSelect(setting);
 }
  function getFirstChar(pyword){
    var supperword = "";
    pyword.replace(/[A-Z]/g, function(word) { supperword += word });
	return supperword;
  }