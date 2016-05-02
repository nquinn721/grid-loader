'use strict';

var config = require('./requirejs-config');
var grid = requirejs('grid')(config);
var expect = require('chai').expect;


describe('Item Class', function() {
	var item1 = {x : 110, y : 110, w : 10, h : 10, segmentAreaType : '3x3', speed : 10},
		item2 = {x : 420, y : 330, w : 10, h : 10, segmentAreaType : '3x3', speed : 10},
		item3 = {x : 110, y : 115, w : 10, h : 10, segmentAreaType : '3x3', speed : 10};
		item1 = grid.createItem(item1);
		item2 = grid.createItem(item2);
		item3 = grid.createItem(item3);

	it('should update x', function() {
		item1.updateX(item1.item.x + 5);
		expect(item1.item.x).to.be.equal(115);
		expect(item1.item.x).to.not.equal(116);
	});

	it('should leave original segment area when moved on x axis', function() {
		item2.incrementXBySpeed(18);
		expect(item2.leftOriginalSegmentArea()).to.be.equal(true);
		item2.decrementXBySpeed(28);
		expect(item2.leftOriginalSegmentArea()).to.be.equal(false);
		item2.decrementXBySpeed(2);
		expect(item2.leftOriginalSegmentArea()).to.be.equal(true);
	});

	it('should leave original segment area when moved on y axis', function() {
		item3.incrementYBySpeed(19);
		expect(item3.leftOriginalSegmentArea()).to.be.equal(true);
		item3.decrementYBySpeed(28);
		expect(item3.leftOriginalSegmentArea()).to.be.equal(false);
		item3.decrementYBySpeed(3);
		expect(item3.leftOriginalSegmentArea()).to.be.equal(true);
	});
});