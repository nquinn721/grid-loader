'use strict';
var config = require('./requirejs-config');
var grid = requirejs('grid')(config);
var expect = require('chai').expect;

describe('Grid System', function() {
	var item1 = {x : 110, y : 110, w : 10, h : 10, segmentAreaType : '3x3'},
		item2 = {x : 110, y : 50, w : 10, h : 10, segmentAreaType : '3x3'},
		item3 = {x : 110, y : 115, w : 10, h : 10, segmentAreaType : '3x3'};
		item1 = grid.createItem(item1);
		item2 = grid.createItem(item2);
		item3 = grid.createItem(item3);

	it('item1 should start in segment [1,1]', function() {
		expect(item1.segment.row).to.be.equal(1);
		expect(item1.segment.col).to.be.equal(1);
	});

	it('item2 should start in segment [0,1]', function() {
		expect(item2.segment.row).to.be.equal(0);
		expect(item2.segment.col).to.be.equal(1);
	});

	it('segment [1,1] should have two items', function() {
		expect(grid.getSegment(1, 1).totalItems()).to.not.equal(1);
		expect(grid.getSegment(1, 1).totalItems()).to.be.equal(2);
	});

	it('segment [0,1] should have one item', function() {
		expect(grid.getSegment(0, 1).totalItems()).to.be.equal(1);
	});

	it('segment [1,2] should have no items', function() {
		expect(grid.getSegment(1, 2).totalItems()).to.be.equal(0);
	});

	it('should be equal to item1', function() {
		expect(grid.getSegmentFromCoords(110, 110).hasItem(item1)).to.be.equal(true);
	});

});