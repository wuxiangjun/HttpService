/*表格样式控制，隔行换色 滑过变色*/	
var oddCol="#f5f6f9";//表格奇数行颜色
var evenCol="#fff";//表格偶数行颜色
var sweepCol="#bbdefe";//表格划过行颜色
var selectCol="#86cef5";//表格选择行颜色
function tb(o){
	var sel=null;//记录之前选择行号
	var t=o.getElementsByTagName("tr");
	for(var i=0;i<t.length;i++){
		t[i].style.backgroundColor=(t[i].sectionRowIndex%2==0)?oddCol:evenCol;
		t[i].onclick=function(){
			if(this.x!="1"){
				if(sel != null && sel != this){//设置之前选择的行号对应行颜色
					sel.style.backgroundColor=(sel.sectionRowIndex%2==0)?oddCol:evenCol;
					sel.x=0;
				}
				sel = this;//记录当前选择行号
				
				this.x="1";
				this.style.backgroundColor=selectCol;
				
			}
			/*else{
				this.x="0";
				this.style.backgroundColor=(this.sectionRowIndex%2==0)?a:b;
			}*/
		}
		t[i].onmouseover=function(){
			if(this.x!="1")this.style.backgroundColor=sweepCol;
		}
		t[i].onmouseout=function(){
			if(this.x!="1")this.style.backgroundColor=(this.sectionRowIndex%2==0)?oddCol:evenCol;
		}
	}
}