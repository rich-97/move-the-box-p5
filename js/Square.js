function Square(size) {
	this.w = size; this.h = size;
	this.x = 0; this.y = 0;
	this.squares = [];
	this.inmovable = false;
	this.stopedX = null;
	this.stopedY = null;

	this.render = function(x, y) {
		rect(this.x, this.y, this.w, this.h);
	};

	this.moveTo = function(x, y) {
		this.x = x; this.y = y;
	};

	this.moveRandomly = function() {
		var x = random(0, width - SQUARE_SIZE), y = random(0, height - SQUARE_SIZE);

		this.moveTo(roundRandom(x), roundRandom(y));
	};

	this.updatePos = function(keyCode) {
		var squaresToMove = [];
		var thisCoords    = { x: this.x, y: this.y };
		var that          = this;

		this.squares.forEach(function(square) {
			var pos = dist(that.x, that.y, square.x, square.y);

			if (pos < SQUARE_SIZE * 2) {
				var arr = [ { x: square.x, y: square.y }, square ];

				squaresToMove.push(arr);
			}
		});

		switch(keyCode) {
			case UP_ARROW:
				if (thisCoords.y > 0) {
					thisCoords.y -= SCALE;
				}

				squaresToMove.forEach(function(squareToMove) {
					if (squareToMove[0].y > 0) {
						squareToMove[0].y -= SCALE;
						squareToMove[1].stopedY = null;
					} else {
						squareToMove[1].stopedY = -1;
					}
				});
				break;
			case DOWN_ARROW:
				if (thisCoords.y + SQUARE_SIZE !== CANVAS_SIZE[1]) {
					thisCoords.y += SCALE;
				}

				squaresToMove.forEach(function(squareToMove) {
					if (squareToMove[0].y + SQUARE_SIZE !== CANVAS_SIZE[1]) {
						squareToMove[0].y += SCALE;
						squareToMove[1].stopedY = null;
					} else {
						squareToMove[1].stopedY = 1;
					}
				});
				break;
			case LEFT_ARROW:
				if (thisCoords.x > 0) {
					thisCoords.x -= SCALE;
				}

				squaresToMove.forEach(function(squareToMove) {
					if (squareToMove[0].x > 0) {
						squareToMove[0].x -= SCALE;
						squareToMove[1].stopedX = null;
					} else {
						squareToMove[1].stopedX = -1;
					}
				});
				break;
			case RIGHT_ARROW:
				if (thisCoords.x + SQUARE_SIZE !== CANVAS_SIZE[0]) {
					thisCoords.x += SCALE;
				}

				squaresToMove.forEach(function(squareToMove) {
					if (squareToMove[0].x + SQUARE_SIZE !== CANVAS_SIZE[0]) {
						squareToMove[0].x += SCALE;
						squareToMove[1].stopedX = null;
					} else {
						squareToMove[1].stopedX = 1;
					}
				});
				break;
			default:
				return false;
		}

		if (!this.inmovable) {
			this.moveTo(thisCoords.x, thisCoords.y);
		}

		squaresToMove.forEach(function(squareToMove) {
			var coordsSq = squareToMove[0];
			var sqToMove = squareToMove[1];
			var diffX    = that.x - sqToMove.x;
			var diffY    = that.y - sqToMove.y;
			var diff     = SQUARE_SIZE - SCALE;

			if (diffX === -diff || diffX === diff) {
				if (diffY === 0 || diffY >= -diff && diffY <= diff) {
					sqToMove.x = coordsSq.x;
					sqToMove.updatePos(keyCode);

					if (sqToMove.stopedX === -1) {
						that.x += SCALE;
						that.stopedX = -1;
					}

					if (sqToMove.stopedX === 1) {
						that.x -= SCALE;
						that.stopedX = 1;
					}
				}
			}

			if (diffY === -diff || diffY === diff) {
				if (diffX === 0 || diffX >= -diff && diffX <= diff) {
					sqToMove.y = coordsSq.y;
					sqToMove.updatePos(keyCode);

					if (sqToMove.stopedY === -1) {
						that.y += SCALE;
						that.stopedY = -1;
					}

					if (sqToMove.stopedY === 1) {
						that.y -= SCALE;
						that.stopedY = 1;
					}
				}
			}
		});
	}
}