'use strict';

define('item', function() {
	
	function Item(grid, segmentArea, item, segment) {
		this.grid = grid;
		this.segmentArea = segmentArea;
		this.item = item;
		this.segment = segment;

		// Original Creation
		this.originalX = item.x;
		this.originalY = item.y;
		this.originalRow = segment.row;
		this.originalCol = segment.col;

		// Defaults
		this.speed = 5;
	}

	Item.prototype = {
		leftOriginalSegmentArea : function() {
			var dims = this.grid.getSegmentAreaDimensions(this.segment, this.segmentArea);
			if(	this.item.x <= dims.x || 
				this.item.x >= dims.x + dims.w ||
				this.item.y <= dims.y ||
				this.item.y >= dims.y + dims.h)
				return true;
			return false;
		},
		updateX : function(x) {
			this.item.x = x;
			this.row = this.grid.getSegmentFromCoords(x, this.item.y);
		},
		udpateY : function(y) {
			this.item.y = y;
			this.col = this.grid.getSegmentFromCoords(this.item.x, y);
		},
		incrementXBySpeed : function(times) {
			this.updateX(this.item.x + ((this.item.speed || this.speed) * (times || 1)));
		},
		decrementXBySpeed : function(times) {
			this.updateX(this.item.x - ((this.item.speed || this.speed) * (times || 1)));
		},
		incrementYBySpeed : function(times) {
			this.udpateY(this.item.y + ((this.item.speed || this.speed) * (times || 1)));
		},
		decrementYBySpeed : function(times) {
			this.udpateY(this.item.y - ((this.item.speed || this.speed) * (times || 1)));
		},
		getX : function() {
			return this.item.x;
		},
		getY : function() {
			return this.item.y;
		},
		move : function() {
			this.getSegment().move(this);	
		},
		getSegment : function() {
			var segment = this.checkIfItemIsStillInSegment() ? 
							this.segment : 
							this.grid.getSegmentFromCoords(this.item.x, this.item.y);

			if(segment && segment !== this.segment){
				this.grid.unsubscribeSegmentArea(this.segment, this.segmentArea, this.item.id);
				this.segment.remove(this);
				segment.add(this);
				this.segment = segment;
				this.subscribeToArea();
			}
			return this.segment;
		},
		subscribeToArea : function() {
			this.subscribedSegments = this.grid.subscribeSegmentArea(
				this.segment, 
				this.segmentArea, 
				this.item.id, 
				this.areaSegmentOnChange.bind(this)
			);	
		},
		getSubscribedSegments : function() {
			var segs = [];
			for(var i = 0; i < this.subscribedSegments.length; i++)
				segs.push(this.subscribedSegments[i].client());
			return segs;
		},
		areaSegmentOnChange : function(event, item, segment) {
			if(this.item.areaSegmentOnChange)
				this.item.areaSegmentOnChange.call(this.item, event, item, segment);
		},
		getCurrentSegmentCoords : function() {
			var segment = this.getSegment();
			return [segment.row, segment.col];
		},
		checkIfItemIsStillInSegment : function() {
			if( this.item.x > this.segment.x && 
				this.item.x < this.segment.x + this.segment.w && 
				this.item.y > this.segment.y && 
				this.item.y < this.segment.y + this.segment.h)	
				return true;
		},
		client : function() {
			return {
				x : this.item.x,
				y : this.item.y,
				w : this.item.w,
				h : this.item.h,
				id : this.item.id,
				dir : this.item.dir
			}
		}
	}

	return Item;
});