
/*-----ʵ����Ӱ������Ч��------- by �����
-------fctText  ��������
-------fctTop   ������ҳ���оඥλ��
-------fctLeft  ������ҳ���о���λ��
-------fctBold  ��Ӱ���
-------Color    ������ɫ
-------bgColor  ��Ӱ��ɫ
-------FontSize ���ִ�С*/
if(typeof(pyzy)=='undefined'){
	var pyzy={};  //���÷�װ������ƣ�����ű�������Ⱦ
	pyzy.$ = function(fctId) { return document.getElementById(fctId); };
}
pyzy.ColorText=function(fctText,fctTop,fctLeft,fctBold,Color,bgColor,FontSize){
	var varZBT=(fctTop-fctBold/2);
	var varZBL=(fctLeft-fctBold/2);
	var varWriteText="";
	for(var i=1;i<fctBold;i++){
		for(var j=1;j<fctBold;j++){
			varWriteText=varWriteText+'<div style="position:absolute;z-index:98;margin:'+(varZBT+i)+'px '+(varZBL+j)+'px;color:'+bgColor+';font-size:'+FontSize+'px;">'+fctText+'</div>';
		}
	}
	return varWriteText+'<div style="position:absolute;z-index:98;margin:'+fctTop+'px '+fctLeft+'px;color:'+Color+';font-size:'+FontSize+'px;">'+fctText+'</div>';
}
//CloseImgBox
//ͼƬ����չʾ������Ҫ����  by ����� 20091117
pyzy.MinImgsBox = {
    intImgId: 0, //Ĭ��ͼƬID
    arrImgs: [["ͼƬ���", "��ͼ·��", "Сͼ·��"]], //ͼƬ���
    objMaxImgBoxObj: null, //��ͼƬ����
    objMinImgBoxObj: null,  //СͼƬ����
    objMinImgObj: null,     //��ǰ���ڲ��ŵ�Сͼ��IMG��������У��Сͼ�����Ĺ�����λ�õ�
    objPlayRateObj: null,  //���Ž�ȶ���
    /* Init �����
    @ fctArrImgs       ͼƬ��Ϣ������� �μ� arrImgs �ĸ�ʽ*/
    Init: function(fctArrImgs) {
        this.arrImgs = fctArrImgs;  //��ͼƬ��ݴ洢�ڱ�����
        this.objMaxImgBoxObj = pyzy.$("divPyzyImgBoxContent"); //����ͼƬ�����洢�ڱ���
        this.objMinImgBoxObj = pyzy.$("divPyzyMinImgs");   //��СͼƬ�����洢�ڱ���
        this.objPlayRateObj = pyzy.$("divPyzyImgBoxRate"); //�����Ž�ȶ���洢�ڱ���
        var tmpMinImgsBoxHTML = []; //��ʱСͼ�б�洢
        for (var intI = 0; intI < this.arrImgs.length; intI++) {
            tmpMinImgsBoxHTML[tmpMinImgsBoxHTML.length] = "<img id='imgMinItem" + intI + "' onClick='pyzy.MinImgsBox.Show(" + intI + ")' alt='" + this.arrImgs[intI][0] + "' src='" + this.arrImgs[intI][2] + "' />"
        }
        this.objMinImgBoxObj.innerHTML = tmpMinImgsBoxHTML.join(""); //���Сͼ�б?����
        this.Show(0); //Ĭ����ʾ��һ��ͼƬ
    },
    Show: function(fctId) {
        if (this.arrImgs.length == 0) {
            alert("ȱ��ͼƬ���");
            return;
        }
        //�ж�ID������Ϊ��ȷ���
        fctId = (fctId < 0 ? this.arrImgs.length - 1 : (fctId >= this.arrImgs.length ? 0 : fctId));
        //���Ž��
        this.objPlayRateObj.title = "��[" + this.arrImgs.length + "]��ͼƬ����ǰΪ��[" + (fctId+1) + "]��ͼƬ�����Ž��Ϊ" + ((fctId + 1) / this.arrImgs.length * 100) + "%��";
        this.objPlayRateObj.style.width = ((fctId + 1) / this.arrImgs.length * this.objPlayRateObj.parentNode.offsetWidth) + "px";
        //ȡ�õ�ǰ����ͼƬ��Сͼ����
        this.objMinImgObj = pyzy.$("imgMinItem" + fctId)
        //����СͼƬ����������λ�ã�ʹ�õ�ǰͼƬ���������м�
        pyzy.MinImgsScroll.Init(
            this.objMinImgBoxObj,
            (
                (   //��ͨ��СͼƬ�������߾���ó�ͼƬ��������ߵľ��룺��ΪIE�����µ�Ԫ�ر߾�������ڸ������ġ�������������ڴ��壬���������õ���������������ж�
                    this.objMinImgObj.offsetLeft -
                    (navigator.appVersion.indexOf("MSIE") == -1 ? this.objMinImgObj.parentNode.offsetLeft:0)
                ) -  //����ͼƬ�����������Ѿ���������أ�����ȡ�����ǿ���ʹСͼƬʼ�վ�����������ߵģ����Խ�������������һ��Ŀ�� ǡ�ɾͿ���ʹСͼƬ���������м�
                this.objMinImgBoxObj.scrollLeft
                -
                (this.objMinImgBoxObj.offsetWidth / 2)
             )
        );
        //���ͼƬ��Ƶ���ͼƬ����
        this.objMaxImgBoxObj.innerHTML = pyzy.ColorText(this.arrImgs[fctId][0], 0, 0, 4, "#444;bottom:2px;right:10px", "#444;bottom:2px;right:10px", 12) + pyzy.ColorText(this.arrImgs[fctId][0], 2, 2, 4, "#666;bottom:2px;right:10px", "#fff;bottom:2px;right:10px", 12);
        //�õ�ǰ��ͼƬ·�������ͼƬ�����ı���
        this.objMaxImgBoxObj.style.backgroundImage = "url(" + this.arrImgs[fctId][1] + ")";
        //ȡ����ǰ��Ĭ��ͼƬ��ѡ��״̬
        pyzy.$("imgMinItem" + this.intImgId).className = "";
        //������ǰ��Ĭ��ͼƬΪ��ʽΪѡ��״̬
        this.objMinImgObj.className = "Sel";
        this.intImgId = fctId;
    }
};
//���������Ʒ��� by ����� 20091117
pyzy.MinImgsScroll = {
    intAllScrollSeep: 0, //���������ι����ķ��
    intScrollCount: 0,   //�������ȼ�¼ ��¼�����ع����ĳ����벽���Ա� ����ʵ�ֶ�̬����Ч��
    objScroll: null,     //Ҫ�������������Ŀ�����
    boolLeft: true,      //���������ͣ�Ĭ��Ϊ����ˮƽ������
    /* Init �����
    @ (fctBoxObj) Ҫ�������������Ŀ�����,����ָ��
    @ [fctSeep]   �ƶ����� ������������ҹ���[��ָ����Ĭ��ΪĿ�����Ŀ��(����Ǵ�ֱ��Ϊ��߶�)]
    @ [fctTop]    ���������� Ĭ��LeftΪ����ˮƽ������,�˲���ָ������ֵ��Ϊ��ֱ������ */
    Init: function(fctObj, fctSeep, fctTop) {
        this.objScroll = fctObj;
        this.boolLeft = (fctTop == null);
        this.intAllScrollSeep = (fctSeep == null ? (this.boolLeft ? this.objScroll.offsetWidth : this.objScroll.offsetHeight) : fctSeep);
        //�жϹ�������ֵ ���Ϊ��ǰ״̬�ķ����� �򽫹������ȡ��
        this.intSeep = ((this.intAllScrollSeep < 0 && this.intSeep > 0) || (this.intAllScrollSeep > 0 && this.intSeep < 0) ? -1 : 1) * this.intSeep;
        this.intScrollCount = 0; //��ʼ������ִ�н��ͳ��Ϊ0
        this.AutoSeep();
    },
    intSeep: 5, //�Զ�����ʱ�ķ�� Ĭ��Ϊ10����
    AutoSeep: function() {
        if (Math.abs(this.intAllScrollSeep) > Math.abs(this.intScrollCount)) { //�Ƿ��Ѿ���ɹ�������
            this.intScrollCount += this.intSeep;
            if (this.boolLeft) { this.objScroll.scrollLeft += this.intSeep; }
            else { this.objScroll.scrollTop += this.intSeep; }
            window.setTimeout("pyzy.MinImgsScroll.AutoSeep();", 8); //8 ��������ִ�й���,Ҳ���Ը�Ĵ˲�����ƹ���ʱ���ٶ�
        }
    }
};