function addLoadEvent(func){
	var oldLoad = window.onload;
	if(typeof oldLoad != "function"){
		window.onload = func;
	}else{
		window.onload = function(){
			oldLoad();
			func();
		};
	}
}
var untilEvent = {
	addEvent:function(element,type,hanlder){
		if(element.addEventListener){
			element.addEventListener(type,hanlder,false);
		}else if(element.attachEvent){
			element.attachEvent("on" + type,hanlder);
		}else{
			element['on'+type] = hanlder;
		}
	},
	removeEvent:function(element,type,hanlder){
		if(element.removeEventListener){
			element.removeEventListener(type,hanlder,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,hanlder);
		}else{
			element["on"+type] = hanlder;
		}
	},
	getEvent:function(event){
		return event?event:window.event;
	},
	getTarget:function(event){
		return event.target||event.srcElement;
	}
};
var index = 0;//表示当前处于第几页
var width = 1224;//每张图片的宽度
var timer;
function bannerClick(){
	var bottom = document.getElementById('bottom');
	untilEvent.addEvent(bottom,'click',callBack);
}
function callBack(event){
	var event = untilEvent.getEvent(event);
	var target = untilEvent.getTarget(event);
	index = target.getAttribute('data-index');//即将跳转到的页面的编号
	operation(index);
}
function operation(nextIndex){
	var list = document.getElementById('list');
	var nextLeft = -nextIndex  * width;
	var curLeft = parseFloat(list.style.left);//现在的left值
	var offsetX = nextLeft - curLeft;//总的偏移值
	var totalTime = 300;//移动的总时间
	var interval = 10;//时间间隔
	var offsetXInterval = offsetX/(totalTime/interval);
	var go = function(){
		if(Math.abs(nextLeft - curLeft) > Math.abs(offsetXInterval)){
			list.style.left = curLeft + offsetXInterval +'px';
			curLeft = parseFloat(list.style.left);
			setTimeout(go,interval);
		}else{
			list.style.left = nextLeft + 'px';
		}
	};
	go();
}
function paly(){
	if(index == 6){
		index = 0;
	}
	operation(index);
	index++;
	timer = setTimeout(paly,6000);
}
function stop(){
	clearTimeout(timer);
}
function stopOrPaly(){
	var warp = document.getElementById('warp');
	warp.onmouseover = stop;
	warp.onmouseout = paly;
}
function changeBannerWidth(){
	var bottom = document.getElementById('bottom');
	var spans = bottom.getElementsByTagName('span');
	for(var i = 0,len = spans.length;i<len;i++){
		spans[i].style.width = 0;
	}
	var interval = 30;
	var offsetXInterval = 204/(6000/30);
	if(parseFloat(spans[index].style.width) - 204 < offsetXInterval){
		spans[index].style.width = parseFloat(spans[index].style.left) + offsetXInterval +'px';
		setTimeout(changeBannerWidth,30);
	}else{
		curSpan.style.width = "204px";
	}
}

// addLoadEvent(changeBannerWidth);
// addLoadEvent(stopOrPaly);
addLoadEvent(bannerClick);
addLoadEvent(paly);