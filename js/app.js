var isHovering = false;
$('.ryu').mouseenter(function() {
	isHovering = true;
	$('.ryu div').hide();
	$('.ryu-ready').show();
})
.mouseleave(function() {
	isHovering = false;
	$('.ryu div').hide();
	$('.ryu-still').show();
})

// click to throw hadouken
.mousedown(function() {
	playHadouken();
	$('.ryu div').hide();
	$('.ryu-throwing').show();
	$('.hadouken').finish().show().animate(
		{'left': '1020px'},
		500,
		function() {
			$(this).hide();
			$(this).css('left', '520px');
		}
	);
})
.mouseup(function() {
	$('.ryu div').hide();
	$('.ryu-ready').show();
});

// hold 'x' to show cool pose
$(document).keydown(function(event) {
	if (event.which !== 88) return;
	$('.ryu div').hide();
	$('.ryu-cool').show();
})
.keyup(function(event) {
	if (event.which !== 88) return;
	$('.ryu-cool').hide();
	$(isHovering ? '.ryu-ready' : '.ryu-still').show();
});

function playHadouken() {
	$('#hadouken-sound')[0].volume = 0.5;
	$('#hadouken-sound')[0].play();
}