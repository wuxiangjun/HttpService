//添加套地市，判断是干流，支流，做相应的操作
 function changRv_cd2(){
  var valu = document.getElementsByName("ext_type_river");
  if(valu[0].checked){
	  $("#hidden_zext_river").hide();
	  $("#hidden_gext_river").show();
	  document.getElementById("ext_river").value="";
	  document.getElementById("qz_ext_num").value="0";
	  }
	if(valu[1].checked){
		$("#hidden_zext_river").show();
		$("#hidden_gext_river").hide();
		document.getElementById("qg_ext_num").value="0";
		}
	}
 
 function changRv_cd3(){
	  var valu = document.getElementsByName("lai_type_river");
	  if(valu[0].checked){
		  $("#zlai_river").hide();
		  $("#glai_river").show();
		  
		  }
		if(valu[1].checked){
			$("#zlai_river").show();
			$("#glai_river").hide();
			
			}
		}
 //选择所在支流区间的前一区间来获得自己的位置
 function changExtnum(obj){
	 if(obj.value==0){      //说明选的第一个位置
		 $("#ext_num").val("1");
	  }else{
		$("#ext_num").val(new Number(obj.value)+1);
	   }
	 
 }
 
 //来水位置时的前一个位置
 function changLainum(obj){
	  var valu = document.getElementsByName("laiposition");
	  if(valu[0].checked){//尼尔基以上
	  if(obj.value==1){$("#getwater_po_num").val("0001");
	  }else{
		$("#getwater_po_num").val(new Number(obj.value)+1);
	   }}
	   if(valu[1].checked){//尼尔基以下
	  if(obj.value==1||obj.value==0){$("#getwater_po_num").val("0101");
	  }else{
		$("#getwater_po_num").val(new Number(obj.value)+1);
	   }}
	   if($("#laitype").val()==0){
		$("#getwater_nm").val(obj.options[obj.selectedIndex].innerText+"区间来水");
		$("#getwater_cd").val(obj.value);
	   }
	   }
 //添加水库选择前一个水库
 function changshuinum(obj){
	 if(obj.value==1){$("#shui_po_num").val("0101");
	  }else{
		$("#shui_po_num").val(new Number(obj.value)+1);
	   }
 }
 //添加区间的时候，若在尼尔基以上以下-------（没用）
 function changeExtP(){
	 var flag = document.getElementsByName("position");
	 var reg = document.getElementsByName("ext_type_river");
	// reg.length=1;
	 if(flag[0].checked){$("#b").hide();}//在尼尔基以上只有干流
	 if(flag[1].checked){$("#b").show();}//在尼尔基以下有干流和支流
	 }
 
 function subDuan(){
	 $("#sectionFlow3").show();$("#sectionFlow").show();$("#sectionFlow").val("0");$("#dw").show();
	 //document.getElementById("qdm").setAttribute("colspan",1);
 }
 function ycDuan(){
	 $("#sectionFlow3").hide();$("#sectionFlow").hide();$("#sectionFlow").val("");$("#dw").hide();
	 //document.getElementById("qdm").setAttribute("colspan",3);
 }
 //自动填充支流来水的cd和nm
function getZhiNm(selectPress){
	//alert($("#zlai_type_river").val());
	//alert(selectPress.options[selectPress.selectedIndex].innerText);
	$("#getwater_nm").val(selectPress.options[selectPress.selectedIndex].innerText+"支流来水");
	$("#getwater_cd").val($("#zlai_type_river").val());
}	

//添加工况切换测站类型

	function changeTypegk(){
	var valu = document.getElementById("gktype").value;
	
	if(valu==6){
	document.getElementById("gkcd").value="";
	document.getElementById("gknm").value="";
	document.getElementById("gkint_nm").value="";document.getElementById("gkint_cd").value="";
	document.getElementById("gkint_use_tp").value="";document.getElementById("gkmp_addr").value="";
	document.getElementById("gklife_p").value=0;document.getElementById("gkindu_p").value=0;
	document.getElementById("gkagri_p").value=0;document.getElementById("gkenvi_p").value=0;
	document.getElementById("gkarrival_d").value=0;
	$("#gkhidden_int_cd").hide();
	$("#gkhidden_int_use_tp").hide();
	$("#gkhidden_flag").show();
	document.getElementById("gkint_use_tp").setAttribute("datatype","");
	document.getElementById("gkint_use_tp").setAttribute("min","");
	 document.getElementById("gkint_use_tp").setAttribute("max",""); 
	 document.getElementById("gkint_use_tp").setAttribute("msg","");
	$("#gkhidden_life_p").hide();
	$("#gkhidden_agri_p").hide();
	$("#gkhidden_arrival_d").hide();
	document.getElementById("gkarrival_d").setAttribute("datatype","");
	document.getElementById("gkarrival_d").setAttribute("min","");
	 document.getElementById("gkarrival_d").setAttribute("max",""); 
	 document.getElementById("gkarrival_d").setAttribute("msg","");
	$("#xxxx").show();
	}
	if(valu==2){
	document.getElementById("gkcd").value="";
	 document.getElementById("gknm").value="";
	$("#gkhidden_flag").hide();
	$("#gkhidden_int_cd").show();
	$("#gkhidden_int_use_tp").show();
	 document.getElementById("gkint_use_tp").setAttribute("datatype","require|limit|chinese");
	document.getElementById("gkint_use_tp").setAttribute("min","0");
	 document.getElementById("gkint_use_tp").setAttribute("max","100"); 
	 document.getElementById("gkint_use_tp").setAttribute("msg","请填写取水口用途|取水口地址长度为[0~100]!|取水口用途为汉字！");
	$("#gkhidden_life_p").show();
	$("#gkhidden_agri_p").show();
	$("#gkhidden_arrival_d").show();
	document.getElementById("gkarrival_d").setAttribute("datatype","require|limit|notchinese");
	document.getElementById("gkarrival_d").setAttribute("min","0");
	 document.getElementById("gkarrival_d").setAttribute("max","3"); 
	 document.getElementById("gkarrival_d").setAttribute("msg","请填写天数|天数长度为[0~3]!|到达天数不能为中文！");
	$("#xxxx").hide();
	}
	
	
	}
	function changPonumgk(){
  var valu = document.getElementsByName("gkposition");
  if(valu[0].checked){//尼尔基以上
  if($("#gkq_po_num").val()==1){$("#gkpo_num").val("0001");
  }else{
	$("#gkpo_num").val(new Number($("#gkq_po_num").val())+1);
   }}
   if(valu[1].checked){//尼尔基以上
  if($("#gkq_po_num").val()==1){$("#gkpo_num").val("0101");
  }else{
	$("#gkpo_num").val(new Number($("#gkq_po_num").val())+1);
   }}
   }

 function subDuangk(){
	 $("#gksectionFlow3").show();$("#gksectionFlow").show();$("#gksectionFlow").val("0");$("#gkdw").show();
 }
 function ycDuangk(){
	 $("#gksectionFlow3").hide();$("#gksectionFlow").hide();$("#gksectionFlow").val("");$("#gkdw").hide();
 }
//选择工况所在支流还是干流
 function changRv_cdgk(){
  var valu = document.getElementsByName("gkst_rv_type");
  if(valu[0].checked){$("#gkhidden_rv_cd").hide();document.getElementById("gkrv_cd").value="";}
	if(valu[1].checked){$("#gkhidden_rv_cd").show();}
	}



