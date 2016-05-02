var path = require('path');

global.requirejs = require('requirejs')
global.define = require('amdefine')(module);

requirejs.config({
    nodeRequire: require,
    baseUrl: path.join(__dirname, '..', 'lib')
});

module.exports = {
	segmentSize : {
		width : 100,
		height : 100
	},
	gridSize : {
		width : 800,
		height : 400
	},
	segmentAreas : {
		'3x3SegmentArea' : [
			[[-1,-1],[-1, 0],[-1, 1]],
			[[ 0,-1],[ 0, 0],[ 0, 1]],
			[[ 1,-1],[ 1, 0],[ 1, 1]]
		]
		
	}
};