function Square(size) {
	this.w = size; this.h = size;
	this.x = 0; this.y = 0;
	this.squares   = [];
	this.inmovable = false;
	this.stopedX   = null;
	this.stopedY   = null;
	this.isStatic  = false;

	this.render = function(x, y) {
		rect(this.x, this.y, this.w, this.h);
	};

	this.moveTo = function(coords) {
		this.x = coords[0]; this.y = coords[1];
	};

	this.moveRandomly = function() {
		var x = random(0, width - SQUARE_SIZE), y = random(0, height - SQUARE_SIZE);

		this.moveTo([ roundRandom(x), roundRandom(y) ]);
	};

	this.updatePos = function(keyCode) {
		var squaresToMove = [];
		var tempCoords    = [ this.x, this.y ];
		var thisCoords    = [ this.x, this.y ];
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
				if (thisCoords[1] > 0) {
					thisCoords[1] -= SCALE;
					this.stopedY = null;
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
				if (thisCoords[1] + SQUARE_SIZE !== CANVAS_SIZE[1]) {
					thisCoords[1] += SCALE;
					this.stopedY = null;
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
				if (thisCoords[0] > 0) {
					thisCoords[0] -= SCALE;
					this.stopedX = null;
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
				if (thisCoords[0] + SQUARE_SIZE !== CANVAS_SIZE[0]) {
					thisCoords[0] += SCALE;
					this.stopedX = null;
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
			this.moveTo(thisCoords);
		}

		squaresToMove.forEach(function(squareToMove) {
			var coordsSq = squareToMove[0];
			var sqToMove = squareToMove[1];
			var diffX    = that.x - sqToMove.x;
			var diffY    = that.y - sqToMove.y;
			var diff     = SQUARE_SIZE - SCALE;

			if (diffX === -diff || diffX === diff) {
				if (diffY === 0 || diffY >= -diff && diffY <= diff) {
					if (sqToMove.isStatic) {
						if (keyCode === RIGHT_ARROW) {
							that.stopedX = 1;
							that.x -= SCALE;
						} else {
							that.stopedX = -1;
							that.x += SCALE;
						}
					} else {
						if (sqToMove.stopedX === null) {
							sqToMove.x = coordsSq.x;

							sqToMove.updatePos(keyCode);

							if (sqToMove.stopedX !== null) {
								that.moveTo(tempCoords);

								that.stopedX = sqToMove.stopedX;
							}
						} else {
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
				}
			}

			if (diffY === -diff || diffY === diff) {
				if (diffX === 0 || diffX >= -diff && diffX <= diff) {
					if (sqToMove.isStatic) {
						if (keyCode === DOWN_ARROW) {
							that.stopedY = 1;
							that.y -= SCALE;
						} else {
							that.stopedY = -1;
							that.y += SCALE;
						}
					} else {
						if (sqToMove.stopedY === null) {
							sqToMove.y = coordsSq.y;

							sqToMove.updatePos(keyCode);

							if (sqToMove.stopedY !== null) {
								that.moveTo(tempCoords);

								that.stopedY = sqToMove.stopedY;
							}
						} else {
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
				}
			}
		});
	}
}