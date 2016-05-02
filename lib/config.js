var CONFIG = {
	segmentSize : {
		width : 1200,
		height : 900
	},
	gridSize : {
		width : 50000,
		height : 25000
	},
	segmentAreas : {
		'3x3SegmentArea' : [
			[[-1,-1],[-1, 0],[-1, 1]],
			[[ 0,-1],[ 0, 0],[ 0, 1]],
			[[ 1,-1],[ 1, 0],[ 1, 1]]
		]
		
	}
}


module.exports = CONFIG;