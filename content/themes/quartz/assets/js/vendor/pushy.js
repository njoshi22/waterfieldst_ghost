$(function() {
	var pushy = $('.pushy'), //menu css class
		body = $('body'),
		container = $('#main'), //container css class
		push = $('.push'), //css class to add pushy capability
		siteOverlay = $('.site-overlay'), //site overlay
		pushyClass = "pushy-left pushy-open", //menu position & menu open class
		pushyActiveClass = "pushy-active", //css class to toggle site overlay
		menuBtn = $('.menu-btn, .pushy a'), //css classes to toggle the menu
		containerClass = "container-push", //container open class
		pushClass = "push-push"; //css class to add pushy capability

	function togglePushy(){
		body.toggleClass(pushyActiveClass); //toggle site overlay
		pushy.toggleClass(pushyClass);
		container.toggleClass(containerClass);
		push.toggleClass(pushClass); //css class to add pushy capability
	}

	//toggle menu
	menuBtn.click(function() {
		togglePushy();
	});

	//close menu when clicking site overlay
	siteOverlay.click(function(){ 
		togglePushy();
	});

});