'use strict';

define('segment', function() {

	function Segment(config) {
		this.row = config.row;
		this.col = config.col;
		this.x = config.x;
		this.y = config.y;
		this.w = config.w;
		this.h = config.h;		
		this.items = [];
		this.listeners = [];
		this.subscribers = {};
	}
	
	Segment.prototype = {
		add : function (item) {
			this.items.push(item);
			this.emit('add item', item);
		},
		remove : function(item) {
			this.items.splice(this.items.indexOf(item), 1);
			this.emit('remove item', item);
		},
		move : function(item) {
			this.emit('moved', item);	
		},
		subscribe : function(id, cb) {
			this.subscribers[id] = cb;
		},
		unsubscribe : function(id) {
			delete this.subscribers[id];
		},
		totalItems : function() {
			return this.items.length;
		},
		getItem : function(id) {
			for(var i = 0; i < this.items.length; i++)
				if(this.items[i].id === id)return items[i];
		},
		getItemsClient : function () {
			var clientObjects = [];
			for(var i = 0; i < this.items.length; i++)
				clientObjects.push(this.items[i].client());
			return clientObjects;
		},
		hasItem : function(item) {
			if(typeof item === 'string')
				item = this.getItem(item);
			return this.items.indexOf(item) > -1;
		},
		clientItems : function() {
			var arr = [];
			for(var i = 0; i < this.items.length; i++){
				if(this.items[i].client)
					arr.push(this.items[i].client());
			}
			return arr;
		},
		client : function() {
			return {
				row : this.row,
				col : this.col,
				x : this.x,
				y : this.y,
				w : this.w,
				h : this.h
			}	
		},
		on : function(event, cb) {
			if(typeof event === 'object')
				for(var i = 0; i < event.length; i++)
					this.listeners.push({event : event[i], cb : cb});
			else this.listeners.push({event : event, cb : cb});
		},
		emit : function(event, item) {
			for(var i in this.subscribers)
				if(typeof this.subscribers[i] === 'function')this.subscribers[i](event, item, this);
			// if(typeof event === 'object'){
			// 	for(var i = 0; i < event.length; i++)
			// 		for(var j = 0; j < this.listeners.length; j++)
			// 			if(this.listeners[j].event === event[i])this.listeners[j].cb(this);
			// } else{
			// 	for(var i = 0; i < this.listeners.length; i++)
			// 		if(this.listeners[i].event === event)this.listeners[i].cb(this)
			// }
			
		}
	}

	return Segment;	
});