define('game/player', function() {
	
	function Player(id, img, x, y, w, h) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.h = h;
		this.w = w;
		this.sprite = img;
	}

	Player.prototype = {
		draw : function() {
			
		}
	}
	return Player;
});
