// mouse over: ready pose
var isHovering = false;
$('.ryu').mouseenter(function() {
	isHovering = true;
	pose.strike('ready');
})
.mouseleave(function() {
	isHovering = false;
	pose.strike('still');
})

// click: throw hadouken
.mousedown(function() {
	pose.strike('throwing');
	playHadouken();
	animateHadouken();
})
.mouseup(function() {
	pose.strike('ready');
});

// hold x: cool pose
$(document).keydown(function(event) {
	if (event.which !== 88) return;
	pose.strike('cool');
})
.keyup(function(event) {
	if (event.which !== 88) return;
	pose.strike(isHovering ? 'ready' : 'still', true);
});



// DOM / view helpers

var pose = (function() {
	// cache ryu pose divs
	var poseDivs = {
		still: $('.ryu-still')
	};

	return {
		current: 'still',
		strike: function(newPose, overrideCool) {
			// true must be passed as 2nd argument to override cool pose
			if (this.current === 'cool' && !overrideCool) return;

			// cache div
			poseDivs[newPose] = poseDivs[newPose] || $('.ryu-' + newPose);

			// hide current pose and show new
			poseDivs[this.current].hide();
			poseDivs[newPose].show();
			this.current = newPose;
		}
	};
})();


var playHadouken = (function() {
	var audioEl = $('#hadouken-sound')[0];
	audioEl.volume = 0.5;

	return function() {
		audioEl.play();
	};
})();


var animateHadouken = (function() {
	var $hadouken = $('.hadouken');

	return function() {
		$hadouken.finish().show().animate(
			{'left': '1020px'},
			500,
			function() {
				$hadouken.hide();
				$hadouken.css('left', '520px');
			}
		);
	};
})();