define('game/manager', ['game/player', 'game/canvas', 'socketio'], function(Player, canvas, io) {
	io = io.connect();
	console.log($);

	function Manager() {

		this.player;
		this.players = [];
		this.items = [];
	}

	Manager.prototype = {
		events : function() {
			io.on('canvas', this.setupCanvas.bind(this));
			io.on('player', this.setupPlayer.bind(this));
			// io.on('minimap', function(items) {
			// 	minimap = items;
			// });
			io.on('items', this.setItems.bind(this));
			io.on('remove item', this.removeItem.bind(this));
			io.on('add item', this.addItem.bind(this));
			io.on('moved', this.movedItem.bind(this));
			io.on('connected sockets', this.setupConnectedSockets.bind(this));
			io.on('subscribed segments', setupSubscribed.bind(this));
		},
		setupCanvas : function(gridSize, segmentSize) {
			canvas.grid = gridSize;
			canvas.miniMapSizeW = (gridSize.width / segmentSize.width) * 3;
			canvas.miniMapSizeH = (gridSize.height / segmentSize.height) * 3;
			canvas.canvas.width = gridSize.width / miniMapSizeW;
			canvas.canvas.height = gridSize.height / miniMapSizeH;
			canvas.canvas.width = segmentSize.width;
			canvas.canvas.height = segmentSize.height;
		},
		setupPlayer : function(player) {
			this.player = player;
		},
		setupSubscribed : function(segments) {
			canvas.subscribed = segments;
		},
		setupConnectedSockets :  function(sockets) {
			this.connected = sockets;
			showConnected();
		},


		/**
		 * Item Management
		 */
		movedItem : function(item) {
			if(item.id === this.player.id)
				this.player = item;
			this.replaceItem(item);
		},
		replaceItem :function(item) {
			var found;
			for(var i = 0; i < this.items.length; i++)
				if(this.items[i].id === item.id){
					found = true;
					this.items[i] = item;
				}
			if(!found)this.items.push(item);
		},
		addItem : function(item) {
			this.items.push(item);
			// showVisible();
		},
		removeItem : function (item) {
			for(var i = 0; i < this.items.length; i++)
				if(this.items[i].id === item.id)this.items.splice(i,1);
		},
		setItems : function(itemList) {
			this.items = itemList;
		}
		/**
		 * End Item Management
		 */
	}

	return Manager;
});