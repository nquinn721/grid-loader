'use strict';


define('grid', [
		'segment',
		'item'
	], function(Segment, Item) {
	
	function Grid(config) {
		this.segments = [];
		this.cols = 0;
		this.rows = 0;
		this.config = config;
		
	}

	Grid.prototype = {
		init : function() {
			var row, col;

			for(var i = 0; i < this.config.gridSize.height; i += this.config.segmentSize.height){
				row = i / this.config.segmentSize.height;
				this.segments.push([]);
				for(var j = 0; j  < this.config.gridSize.width; j += this.config.segmentSize.width){
					col = j / this.config.segmentSize.width;
					this.segments[this.rows].push(new Segment({
						row : row,
						col : col,
						x : j, 
						y : i,
						w : this.config.segmentSize.width,
						h : this.config.segmentSize.height
					}));
					this.cols++;
				}
				this.rows++;
			}
		},



		/**
		 * GETTERS
		 */
		getSegmentAreaDimensions : function(segment, segmentArea) {
			var firstSegment;

			// Find first available segment
			for(var i = 0 ; i < segmentArea.length; i++){
				for(var j = 0; j < segmentArea[i].length; j++){
					firstSegment = this.getSegment(segment.row + segmentArea[i][j][0], segment.col + segmentArea[i][j][1])
					if(firstSegment)break;
				}
				if(firstSegment)break;
			}

			var	x = firstSegment.x,
				y = firstSegment.y,
				w = segmentArea[0].length * this.config.segmentSize.width, 
				h = segmentArea.length * this.config.segmentSize.height;
			
			return {
				x : x,
				y : y,
				w : w,
				h : h,
			}
		},
		getAllSegmentsInSegmentArea : function(segment, segmentArea) {
			var col, row, seg, segments = [];
			for(var i = 0; i < segmentArea.length; i++){
				for(var j = 0; j < segmentArea[i].length; j++){
					row = segment.row + segmentArea[i][j][0];
					col = segment.col + segmentArea[i][j][1];
					seg = this.getSegment(row, col);
					if(seg)
						segments.push(seg);
					
				}
			}
			return segments;	
		},
		getSegmentFromCoords : function(x, y) {
			var foundSegment;
			if(typeof x === 'object'){
				y = x.y;
				x = x.x;
			}

			this.iterate('segments', function(segment) {
				if(x >= segment.x && x <= segment.x + segment.w && y >= segment.y && y <= segment.y + segment.h)
					foundSegment = segment;
			});
			return foundSegment;
		},
		getAllSegmentsCoords : function() {
			var segments = [];
			this.iterate(function(segment) {
				segments.push({x : segment.x, y : segment.y, w : segment.w, h : segment.h});
			});
			return segments;
		},
		getSegment : function(row, col) {
			return this.segments[row] ? this.segments[row][col] : undefined;
		},
		/**
		 * END GETTERS
		 */

		subscribeSegmentArea : function(segment, segmentArea, id, cb) {
			var segments = this.getAllSegmentsInSegmentArea(segment, segmentArea);

			for(var i = 0; i < segments.length; i++)
				segments[i].subscribe(id, cb);

			return segments;
		},
		unsubscribeSegmentArea : function(segment, segmentArea, id) {
			var segments = this.getAllSegmentsInSegmentArea(segment, segmentArea);
			
			for(var i = 0; i < segments.length; i++)
				segments[i].unsubscribe(id);

			return segments;
		},

		/**
		 * ITERATORS
		 */
		iterate : function(key, cb) {
			if(typeof key === 'function'){
				cb = key;
				key = false;
			}

			for(var i = 0 ; i < this[key || 'segments'].length; i++)
				for(var j = 0; j < this[key || 'segments'][i].length; j++)
					cb(this[key || 'segments'][i][j]);
			
		},
		/**
		 * END ITERATORS
		 */



		/**
		 * CREATE
		 */
		createItem : function(item) {
			var segment = this.getSegmentFromCoords(item),
				item = new Item(
					this, 
					this.config.segmentAreas[item.segmentAreaType + 'SegmentArea'],
					item,
					segment
				);	
			segment.add(item);
			return item;
		},
		createSegmentArea : function(gridSize) {
			// var dims = gridSize.split('x'),
			// 	rows = parseInt(dims[0]),
			// 	cols = parseInt(dims[0]),
			// 	startRow = 
			// 	area = [];

		// 	for(var i = 0; i < rows; i++){
		// 		area.push([]);
		// 		for(var j = 0; j < cols; j++)
		// 			area[i].push([])
		// 	}

		// 		'3x3SegmentArea' : [
		// 	[[-1,-1],[-1, 0],[-1, 1]],
		// 	[[ 0,-1],[ 0, 0],[ 0, 1]],
		// 	[[ 1,-1],[ 1, 0],[ 1, 1]]
		// ]
			
		}
	}

	return function(config) {
		var grid = new Grid(config);
		grid.init();
		return grid;
	}


});
