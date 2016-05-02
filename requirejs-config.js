var path = require('path');

global.requirejs = require('requirejs')
global.define = require('amdefine')(module);

requirejs.config({
    nodeRequire: require,
    baseUrl: path.join(__dirname, 'lib')
});

var config = require('./lib/config');
module.exports = config;