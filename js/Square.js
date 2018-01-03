function Square(size) {
	this.w = size; this.h = size;
	this.x = 0; this.y = 0;
	this.speed = SCALE;

	this.render = function(x, y) {
		rect(this.x, this.y, this.w, this.h);
	}

	this.moveTo = function(x, y) {
		this.x = x; this.y = y;
	}

	this.moveRandomly = function() {
		var x = random(0, width), y = random(0, height);

		this.moveTo(roundRandom(x), roundRandom(y));
	}
}