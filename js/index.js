$(function () {
	//获取屏幕高度
	var screenHeight = $("body").height();
	//设置一个计数器，记录当前处于第几块背景
	var scrollTimes = 0;
	//设置一个计时器，记录当前（第一次运行函数或者执行滚动函数）的时间
	var time = new Date();
	//设置页面初始化
	PageScroll();
	$("li").removeClass("on").eq(0).addClass("on");
	//监听窗口大小改变事件，当窗口大小改变时，重新获取屏幕高度，并滚动至当前背景
	$(window).resize(function(){
		screenHeight = $("body").height();
		$("body,html").scrollTop(screenHeight * scrollTimes);
	});
	//监听鼠标滚轮事件，每当鼠标滚轮事件被触发时执行回调函数
	$(document).mousewheel(function(event, driction, x, y){
		//如果当前时间减去time记录的时间大于1秒，则执行背景切换方法
		if(new Date() - time > 1000){
			//重置time
			time = new Date();
			//去除当前选中样式
			$("li").removeClass("on");
			//根据driction的正负来判断滚轮滚动的方向
			if (driction < 0) {
				//driction小于0时向下滚动
				//重置scrollTimes计数器
				if(scrollTimes >= 3){
					scrollTimes = 3;
				}else{
					scrollTimes ++;
				}
				PageScroll(screenHeight, scrollTimes);
				//给当前屏幕小点添加on样式
				$("li").eq(scrollTimes).addClass("on");
			} else {
				//driction大于0时向上滚动
				//重置scrollTimes计数器
				if (scrollTimes <= 0) {
					scrollTimes = 0;
				} else {
					scrollTimes --;
				}
				PageScroll(screenHeight, scrollTimes);
				//给当前屏幕小点添加on样式
				$("li").eq(scrollTimes).addClass("on");
			}
		}
	});
	//给小点绑定点击事件，当点击小点时滚动到对应屏幕
	$(".point>ul li").click(function(){
		//获取当前被点击的小点的索引
		scrollTimes = $(this).index();
		console.log(scrollTimes);
		$("body,html").animate({
			"scrollTop":screenHeight * scrollTimes
		});
		$("li").removeClass("on").eq(scrollTimes).addClass("on");
	});
});
/*页面滚动函数*/
function PageScroll(screenHeight,scrollTimes){
	if(screenHeight && scrollTimes){
		$("body,html").animate({
			"scrollTop":screenHeight * scrollTimes
		}, 1000);
	}else{
		$("body,html").animate({
			"scrollTop":0
		}, 1000);
	}
}
