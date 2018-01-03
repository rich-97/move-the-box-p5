window.onload = function() {
	var $wrap = document.getElementById('canvas-wrap');

	$wrap.appendChild(canvas);
}

var square = new Square(SQUARE_SIZE);
var boxes  = [];

boxes.push(new Square(SQUARE_SIZE));

function setup() {
	createCanvas(CANVAS_SIZE[0], CANVAS_SIZE[1]);

	boxes.forEach(function(box) {
		box.moveRandomly();
	});
}

function draw() {
	background(0);
	square.render();
	boxes.forEach(function(box) {
		var pos = dist(square.x, square.y, box.x, box.y);

		box.render();
	});
}

function keyPressed() {
	var coordsBox = { x: 0, y: 0 };
	var boxToMove;

	boxes.forEach(function(box) {
		var pos = dist(square.x, square.y, box.x, box.y);

		if (pos < SQUARE_SIZE * 2) {
			boxToMove = box;
			coordsBox.x = box.x; coordsBox.y = box.y;
		}
	});

	switch(keyCode) {
		case UP_ARROW:
			square.y    -= square.speed;
			coordsBox.y -= SCALE;
			break;
		case DOWN_ARROW:
			square.y    += square.speed;
			coordsBox.y += SCALE;
			break;
		case LEFT_ARROW:
			square.x    -= square.speed;
			coordsBox.x -= SCALE;
			break;
		case RIGHT_ARROW:
			square.x    += square.speed;
			coordsBox.x += SCALE;
			break;
		default:
			return false;
	}

	if (boxToMove) {
		var diffX = square.x - boxToMove.x;
		var diffY = square.y - boxToMove.y;
		var diff  = SQUARE_SIZE - SCALE;

		if (diffX === -diff || diffX === diff) {
			if (diffY === 0) {
				boxToMove.x = coordsBox.x;
			} else {
				if (diffY >= -diff && diffY <= diff) {

					boxToMove.x = coordsBox.x;
				}
			}
		}

		if (diffY === -diff || diffY === diff) {
			if (diffX === 0) {
				boxToMove.y = coordsBox.y;
			} else {
				if (diffX >= -diff && diffX <= diff) {
					boxToMove.y = coordsBox.y;
				}
			}
		}
	}
}
