window.onload = function() {
	var $wrap = document.getElementById('canvas-wrap');

	$wrap.appendChild(canvas);
}

var player, level, boxes = [], blocks = [], boxPoints = [];

function preload() {
	level = {
		"level": "1",
		"player": [ 150, 0 ],
		"boxes": [
				[ 200, 50 ],
				[ 300, 100 ],
				[ 300, 300 ]
		],
		"blocks": [
			[ 50, 0 ],
			[ 50, 50 ],
			[ 50, 100 ],
			[ 50, 150 ],
			[ 50, 200 ],
			[ 50, 250 ],
			[ 50, 300 ],
			[ 100, 0 ],
			[ 100, 50 ],
			[ 100, 100 ],
			[ 100, 150 ],
			[ 100, 200 ],
			[ 100, 250 ],
			[ 100, 300 ],
			[ 200, 250 ],
			[ 200, 300 ],
			[ 200, 200 ],
			[ 250, 200 ],
			[ 300, 200 ],
			[ 350, 200 ],
			[ 400, 0 ],
			[ 400, 50 ],
			[ 400, 100 ],
			[ 400, 150 ],
			[ 400, 200 ],
			[ 400, 250 ],
			[ 400, 300 ],
		],
		"boxPoints": [
			[ 450, 0 ],
			[ 450, 50 ],
			[ 450, 100 ],
		]
	};

	player = new Square(SQUARE_SIZE);

	player.moveTo(level.player);
	level.boxes.forEach(function(box) {
		var newBox = new Square(SQUARE_SIZE);

		newBox.moveTo(box);
		boxes.push(newBox);
	});
	level.blocks.forEach(function(block) {
		var newBlock = new Square(SQUARE_SIZE);
		newBlock.isStatic = true;

		newBlock.moveTo(block);
		blocks.push(newBlock);
	});
	level.boxPoints.forEach(function(boxPoint) {
		var newBoxPoint = new Square(SQUARE_SIZE);

		newBoxPoint.moveTo(boxPoint);
		boxPoints.push(newBoxPoint);
	});
}

function setup() {
	createCanvas.apply(null, CANVAS_SIZE);
	boxes.forEach(function(box, index) {
		box.inmovable = true;
		box.id = index;
		box.squares = boxes.filter(function(boxFilter, indexFilter) {
			return index !== indexFilter;
		});
		box.squares = box.squares.concat(blocks);
	});

	player.squares = boxes.concat(blocks);
}

function draw() {
	frameRate(10);
	background(0);
	fill.apply(null, BLOCK_COLOR);
	blocks.forEach(function(block) {
		block.render();
	});
	fill.apply(null, BOX_POINT_COLOR);
	boxPoints.forEach(function(boxPoint) {
		boxPoint.render();
	});
	fill.apply(null, BOX_COLOR);
	boxes.forEach(function(box) {
		box.render();
	});
	fill.apply(null, PLAYER_COLOR);
	player.render();

	var levelCompleted = true;

	boxPoints.forEach(function(boxPoint, index) {
		var box = boxes.filter(function(box) {
			return box.x === boxPoint.x && box.y === boxPoint.y;
		})[0];

		if (!box) {
			levelCompleted = false;
		}
	});

	if (levelCompleted) {
		console.log('Level completed!');
	}

	if (keyIsPressed) {
		player.updatePos(keyCode);
	}
}
