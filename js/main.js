window.onload = function() {
	var $wrap = document.getElementById('canvas-wrap');

	$wrap.appendChild(canvas);
}

var player = new Square(SQUARE_SIZE);
var boxes  = [];

for (var i = 0; i < 3; i++) {
	boxes.push(new Square(SQUARE_SIZE));
}

function setup() {
	frameRate(10);
	createCanvas.apply(null, CANVAS_SIZE);

	boxes.forEach(function(box, index) {
		box.inmovable = true;
		box.id = index;
		box.squares = boxes.filter(function(boxFilter, indexFilter) {
			return index !== indexFilter;
		});

		box.moveRandomly();
	});

	player.squares = boxes;
}

function draw() {
	background(0);
	player.render();
	boxes.forEach(function(box) {
		box.render();
	});
}

function keyPressed() {
	player.updatePos(keyCode);
}
