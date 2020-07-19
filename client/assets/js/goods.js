(function(){
	var nav_sidebar=$('#sidebar-wrapper'),
		contents_wrap=$('#contents-wrap'),
		review_sidebar=$('#review-sidebar'),
		_win=$(window);
	if(nav_sidebar.hasClass('toggled')){
		nav_sidebar.removeClass('toggled');
		contents_wrap.removeClass('toggled');
	}
	
	if(_win.width()>=1440){
		review_sidebar.addClass('on');
	}
	$(window).on('resize',function(){
		if(_win.width()-Window.NavSideW<1400){
			review_sidebar.removeClass('on');
		}else if(_win.width()-Window.NavSideW>=1400){
			review_sidebar.addClass('on');
		}
	})
	$(".table-body").on('click',function(){
		var contents=$(this).next();
		if(contents.hasClass("open")){
			$(this).next().removeClass("open");
		}else{
			$(this).next().addClass("open");
		}
	})
}())
