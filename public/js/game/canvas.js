define('game/canvas', function() {
	function Canvas() {
		this.canvas = document.getElementById('space-fighter');
		this.ctx = this.canvas.getContext('2d');
		this.minimapCanvas = document.getElementById('mini-map');
		this.minimapCTX = this.minimapCanvas.getContext('2d');
		this.miniMapSizeW;
		this.miniMapSizeH;
		this.grid;
		this.subscribed;
	}
	return new Canvas;
});