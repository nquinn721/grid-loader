requirejs.config({
	shim: {
    'socketio': {
      exports: 'io'
    },
  },
     paths: {
		jquery: 'lib/jquery-2.2.3.min',
		socketio: '/socket.io/socket.io',
		create : 'lib/createjs'
	}
});
requirejs(['game/manager']);