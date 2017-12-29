/**
 * 
 * js分页组件
 * @param formId 表单id
 * @param total 记录总数
 * @param pageSize 每页显示大小
 * @param currentPage 当前页码
 * @param divID  分页组件容器
 * @param callBack 点击调用函数
 * @returns {Pager} 分页对象
 */
function Pager(formId,total,pageSize,currentPage,divID, callBack) {
     this.totolCount = total; //总记录数
     this.pageSize = pageSize||10;  //每页记录数
     this.currentPage = currentPage||0; //当前页
     this.pageDivObj = document.getElementById(divID); //分页系统容器
     this.pages = 0; //总页数，计算得到
     this.callBack = callBack; //回调
     this.formId = formId;
     this.inputId = formId+"_pagerNo_input";//输入框
     this.currentPageHiddenId = formId+"_hiddenInput_currentPage";
     this.pagerSizeHiddenId = formId+"_hiddenInput_pageSize";
     this.pagesizeSelectId = formId+"_pagesizeSelectId";
     this.goButtonId = formId+"_goButton";
     var that = this; //当前对象的引用
     
    this.init = function() {
        this.pages = parseInt(this.totolCount / this.pageSize); //获得总共有几页
        this.pages = this.totolCount % this.pageSize == 0? this.pages: this.pages+1;
        
        that.pageDivObj.innerHTML="";
        
        if(this.pages==0)return;//无记录不显示分页		
		//显示分页
		createPagerToolBar();	
		//插入分页用隐藏域--pagesize offset
		injectHiddenArgs(currentPage,pageSize);
		
    };
    function injectHiddenArgs(currentPage,pageSize){
    	that.currentPage = currentPage;
    	var pageSizeHidden = "<input type='hidden' id='"+that.pagerSizeHiddenId+"' name='pg.pagesize' style='width:3em;' value='"+pageSize+"'/> ";
    	var currentPageHidden = "<input type='hidden' id='"+that.currentPageHiddenId+"' name='pg.currentPage' style='width:3em;' value='"+currentPage+"'/> ";
    	if(!getObject(that.pagerSizeHiddenId)){
    		getObject(that.formId).innerHTML=getObject(that.formId).innerHTML+pageSizeHidden;
    	}else{
    		getObject(that.pagerSizeHiddenId).value=pageSize;
    	}
    	if(!getObject(that.currentPageHiddenId)){
    		getObject(that.formId).innerHTML=getObject(that.formId).innerHTML+currentPageHidden;
    	}else{
    		getObject(that.currentPageHiddenId).value=currentPage;
    	}
    };
   
	//创建分页
	function createPagerToolBar(){
	   //其他信息
		var _spanleft = document.createElement("SPAN");
		_spanleft.style.cssText = "margin:5px;align='left'";
		var _spaninfo = document.createElement("SPAN");
		_spaninfo.innerHTML = "共"+that.totolCount+"条记录  第"+that.currentPage+"页/共"+that.pages+"页   每页显示";
		_spanleft.appendChild(_spaninfo);
		
		//选择每页显示框
		var _pagesieze_select = document.createElement("SELECT");
		_pagesieze_select.id = that.pagesizeSelectId;
		_pagesieze_select.style.cssText = "margin:5px;";
		_pagesieze_select.onchange = changePageSize;
		_pagesieze_select.innerHTML = "<option value='10' "+(that.pageSize==10?"selected":"")+">10条</option>" +
									  "<option value='50' "+(that.pageSize==50?"selected":"")+">50条</option>" +
									  "<option value='100' "+(that.pageSize==100?"selected":"")+">100条</option>";
		_spanleft.appendChild(_pagesieze_select);
		
		that.pageDivObj.appendChild(_spanleft);
		
	    //页码输入框
		var _spango = document.createElement("SPAN");
		_spango.innerHTML = "跳转到 <input type='text' id='"+that.inputId+"' style='width:3em;' value='"+that.currentPage+"'/> <a href='javascript:void(0);' id='"+that.goButtonId+"'>GO</a> ";
		that.pageDivObj.appendChild(_spango);
	    getObject(that.goButtonId).onclick = goPage;
		var clickAble = that.currentPage!=1;
		createPage(1,"首页",'margin-left:5px',clickAble);
		createPage(Math.max(1,that.currentPage-1),"上一页","margin-left:5px",clickAble);
		//----------------
		//暂不支持 创建页码 
		//----------------
		clickAble = that.currentPage!=that.pages;
		createPage(Math.min(that.currentPage+1,that.pages),"下一页","margin-left:5px",clickAble);
		createPage(that.pages,"未页",'margin-left:5px',clickAble);
		
	};
	//切换每页显示条数条用
	function changePageSize(){
		_formSubmit(1,this.value);
	};
	function createPage(pageNo,content,css,clickAble) {
	   //return;
	   var _span = document.createElement("SPAN");
	   _span.style.cssText = css;
	   if(clickAble){
		   var _a = document.createElement("A");
		   _a.href = "javascript:void(0)";
		   _a.pageNo = pageNo;
		   _a.onclick = query;
		   _a.innerText = content;
		   _span.appendChild(_a);
	   }else{
		   var _a = document.createElement("A");
		   _a.pageNo = pageNo;
		   _a.innerText = content;
		   _span.appendChild(_a);
	   }
	   that.pageDivObj.appendChild(_span);
	};
	//点击上一页下一页提交调用
	function query(){
		_formSubmit(this.pageNo, that.pageSize);
	};
	function _formSubmit(pageNo,pageSize){
		injectHiddenArgs(pageNo, pageSize);
	    if(that.callBack)var newTotal =  that.callBack(pageNo,pageSize);   //注意此处的this和that 
	}
	function getObject(id){
		return document.getElementById(id);
	};
	//输入跳转
	function goPage(){
		var inputPageValue = document.getElementById(that.inputId).value;
		if(inputPageValue=='')return;
		var reg = /\d+/;
		if(!reg.test(inputPageValue)||inputPageValue<=0){
			alert("请输入大于0的数字!");
			return;
		}
		inputPageValue = Number(inputPageValue);
		
		if(inputPageValue>that.pages)inputPageValue=that.pages;
		
		goQuery(inputPageValue);
	};
	function goQuery(inputPageValue){
      injectHiddenArgs(inputPageValue, that.pageSize);
      if(that.callBack)var newTotal =  that.callBack(inputPageValue, that.pageSize);   //注意此处的this和that 
	};
}