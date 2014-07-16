window.onload =function() {
   jzk.app.Tosearch();	
   jzk.app.Tobanner();
   jzk.app.Tosort();
   jzk.app.Toscroll();
} 
var jzk = {};  //设置全局对象（命名空间）


jzk.tools = {};   //底层基本功能（分层第一层）
jzk.tools.getByclass = function(parent,classname)
{
    var classLists = parent.getElementsByTagName('*');
    var arr = [];
    for( var i = 0;i<classLists.length;i++)
    {
        if(classLists[i].className == classname)
        {
            arr.push(classLists[i]);
        }
    }
    return arr;
}
jzk.tools.getStyle = function(obj,attr) 
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj,false)[attr];
    }
}


jzk.ui = {};  //组件（功能，分层第二层）
jzk.ui.textchange = function (obj,str) 
{
    obj.onfocus = function () 
    {
    	if(this.value== str)
    	{
          this.value= '';
    	}
    }
    obj.onblur = function () 
    {
    	if(this.value== '')
    	{
          this.value= str;
    	}
    }
}
jzk.ui.fadeIn = function(obj) /*淡入函数，显示当前图片*/
{
    var iCur = jzk.tools.getStyle(obj,'opacity');
    if(iCur==1)
    { 
        return false; 
    }
    var value = 0;
    clearInterval(obj.finishtimer);
    obj.finishtimer = setInterval(function() {
        var ispeed = 5;
        if (value == 100) 
        {
           clearInterval(obj.finishtimer);
        }
        else 
        {
           value = value + ispeed;
           obj.style.opacity = value/100;
           obj.style.filter = 'alpha(opacity='+value+')';
        }    
    }, 30);
}
jzk.ui.fadeOut = function(obj) /*淡出函数，隐藏其它函数*/
{
    var iCur = jzk.tools.getStyle(obj,'opacity');
    if(iCur==0)
    { 
        return false; 
    }
    var value = 100;
    clearInterval(obj.finishtimer);
    obj.finishtimer = setInterval(function() {
        var ispeed = -5;
        if (value == 0) 
        {
           clearInterval(obj.finishtimer);
        }
        else 
        {
           value = value + ispeed;
           obj.style.opacity = value/100;
           obj.style.filter = 'alpha(opacity='+value+')'; 
        }    
    }, 30);
}
jzk.ui.moveLeft = function (obj,oldp,newp)
{
    clearInterval(obj.finishtimer);
    obj.finishtimer = setInterval(function() {
        var ispeed = (newp-oldp)/10;
        ispeed = ispeed >0 ? Math.ceil(ispeed) : Math.floor(ispeed);
        if(newp == oldp)
        {
           clearInterval(obj.finishtimer);
        }
        else
        {
           oldp = oldp + ispeed;
           obj.style.left = oldp +'px';
        }
       
    }, 30);
}


jzk.app = {};  //用于直接具体的应用(分层第三层)
jzk.app.Tosearch = function () 
{
	var text1 = document.getElementById('text1');
	var text2 = document.getElementById('text2');
	jzk.ui.textchange(text1,"请输入搜索关键字");
	jzk.ui.textchange(text2,"请输入搜索关键字");
}
jzk.app.Tobanner = function()
{
    var ad = document.getElementById('ad');
    var lists = ad.getElementsByTagName('li');
    var oprevbg = jzk.tools.getByclass(ad,'prev_bg')[0];
    var onextbg = jzk.tools.getByclass(ad,'next_bg')[0];
    var oprev = jzk.tools.getByclass(ad,'prev1')[0];
    var onext = jzk.tools.getByclass(ad,'next1')[0];


    var iNow = 0;
    var finishtimer = setInterval(pictureNext, 4000);
    
    function pictureNext()/*顺序轮播的函数（从左到右）*/ 
    {
        if (iNow == lists.length - 1)
        {
            iNow = 0;
        }
        else
        {
            iNow ++;
        }  
         
        for(var i = 0; i < lists.length; i++)
        {
            jzk.ui.fadeOut(lists[i]); /*隐藏不是当前的其他图片*/
        } 
         jzk.ui.fadeIn(lists[iNow]);/* 显示当前的图片*/
    }
     function picturePrev() /*从右到左播放图片*/
    {
        if (iNow == 0)
        {
            iNow = lists.length - 1;
        }
        else
        {
            iNow --;
        }  
         
        for(var i = 0; i < lists.length; i++)
        {
            jzk.ui.fadeOut(lists[i]); /*隐藏不是当前的其他图片*/
        } 
         jzk.ui.fadeIn(lists[iNow]);/* 显示当前的图片*/
    }

    oprevbg.onmouseover =oprev.onmouseover = function()
    {
        oprev.style.display = 'block';
        clearInterval(finishtimer);
    }
    onextbg.onmouseover= onext.onmouseover = function()
    {
        onext.style.display = 'block';
        clearInterval(finishtimer);
    }
    oprevbg.onmouseout =oprev.onmouseout = function()
    {
        oprev.style.display = 'none';
        finishtimer = setInterval(pictureNext, 4000);
    }
    onextbg.onmouseout = onext.onmouseout = function()
    {
        onext.style.display = 'none';
        finishtimer = setInterval(pictureNext, 4000);
    }
    oprev.onclick = function()
    {
        picturePrev();
    }
    onext.onclick = function()
    {
        pictureNext(); 
    }
}
jzk.app.Tosort = function()
{
    var wrap = document.getElementById('wrap');
    var sort =jzk.tools.getByclass(wrap,'sort')[0];/* 获取类名为sort的元素*/
    var as = sort.getElementsByTagName('a');
    var uls = sort.getElementsByTagName('ul');
    var h2s = sort.getElementsByTagName('h2');

    for(var i=0;i<as.length;i++)
    {
        as[i].index = i;
        as[i].onclick = function(event)
        {
            
            var This = this;
            for(var i=0;i<uls.length;i++)
            {
               uls[i].style.display = 'none';
            }           
            uls[this.index].style.display = 'block';
            document.onclick = function() 
            {
                uls[This.index].style.display = 'none';/*点击其他地方，ul列表消失*/
            }
            var ev = event||window.event; 
            ev.cancelBubble = true; /*阻止冒泡事件的发生*/
        } 
    }

    for(var i=0;i<uls.length;i++)
    {
        uls[i].index = i; /*添加索引号*/

        Toli(uls[i]);
        function Toli(ul)
        {
            var lis = ul.getElementsByTagName('li');
            for(var i= 0;i<lis.length;i++)
            {
                lis[i].onmouseover = function()
                {
                    this.className ='active';
                }
                lis[i].onmouseout =function()
                {
                    this.className = '';
                }
                lis[i].onclick = function()
                {
                    h2s[this.parentNode.index].innerHTML = this.innerHTML;/*this指li，this.parentNode指父级ul，this.parentNode.index 指的是ul对应的索引号，所以就能得到对应的h2元素*/
                }
            }  
        }
    }
}
jzk.app.Toscroll =function ()
{
    var scroll = document.getElementById('scroll');
    var ul = scroll.getElementsByTagName('ul')[0];
    var lis = ul.getElementsByTagName('li');
    var btnprev = jzk.tools.getByclass(scroll,'prev')[0];
    var btnnext = jzk.tools.getByclass(scroll,'next')[0];

    var iNow =0;
    ul.innerHTML = ul.innerHTML + ul.innerHTML;
    ul.style.width= lis.length * lis[0].offsetWidth +'px'; /*设定整个ul的宽度，使其溢出的隐藏不显示*/
    btnprev.onclick = function()
    {
        if(iNow == lis.length/2)
        {
            iNow=0;
             /*总长度为12，iNow一直自加，所以当iNow等于6时，刚好把全部图片显示完，所以需要循环，令iNow等于0*/
        } 

        jzk.ui.moveLeft(ul,-iNow * lis[0].offsetWidth,-(iNow+1) * lis[0].offsetWidth);/*调用函数moveLeft，此时的ispeed为负值，所以为向左移动*/
        iNow++;
    }
    btnnext.onclick = function()
    {
    	 if(iNow == 0)
        {
            iNow=lis.length/2;
          /*起始时，iNow假设为6，iNow一直自减，当iNow减到0时，图片为起始位置，需要把iNow设为6，重新循环。*/
        }
        jzk.ui.moveLeft(ul,-iNow * lis[0].offsetWidth,-(iNow-1) * lis[0].offsetWidth);/*调用函数moveLeft，此时的ispeed为正值，所以是向右移动*/
        iNow--;   
    }
}