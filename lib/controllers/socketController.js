var config = require('../config/config');
var constants = require('../utils/const'); 

// Event emitter Handler Obj 
var socketEventEmit = require('../events/socketEventEmitter'); 

function SocketController(){}
SocketController.prototype.configure = function(io){
	// Configure for production and development mode 
	
  // Production configuration
  io.configure('production', function(){

    io.enable('browser client minification');  // send minified client
    io.enable('browser client etag');          // apply etag caching logic based on version number
    io.enable('browser client gzip');          // gzip the file

    io.set('transports', config.socketConfig.prod_transports);  // enable all transports (optional if you want flashsocket)
    io.set('flash policy port', config.socketConfig.flash_port);
    io.set('log level', constants.LOG_WARN_LEVEL); // warn level
  });	
  // Development configuration  
  io.configure('development', function(){

    io.set('transports', config.socketConfig.dev_transports);
    io.set('flash policy port', config.socketConfig.flash_port);
    io.set('log level', constants.LOG_DEBUG_LEVEL);
  });

};
SocketController.prototype.initListeners = function(io){
  // Add Socket listeners here 
  io.sockets.on('connection', function(socket){
    console.log('A new user connected!');

    // onConnection event invoked  
    socketEventEmit.emitMethod('onConnect', {'socket':socket, 'io': io});
    //  Added socket event listeners
    socket.on('toserver', function(data){ socketEventEmit.emitMethod('toserver', {'socket':socket, 'data':data, 'io': io}); });
    socket.on('addRoom', function(data){ socketEventEmit.emitMethod('addRoom', {'socket':socket, 'data':data, 'io': io}); });
    socket.on('joinRoom', function(data){ socketEventEmit.emitMethod('joinRoom', {'socket':socket, 'data':data, 'io': io}); });
    socket.on('removeRoom', function(data){ socketEventEmit.emitMethod('removeRoom', {'socket':socket, 'data':data, 'io': io}); });
    socket.on('leaveRoom', function(data){ socketEventEmit.emitMethod('leaveRoom', {'socket':socket, 'data':data, 'io': io}); });
    socket.on('send', function(data){ socketEventEmit.emitMethod('send', {'socket':socket, 'data':data, 'io': io}); });
    socket.on('disconnect', function(data){ socketEventEmit.emitMethod('disconnect', {'socket':socket, 'data':data, 'io': io}); });

  });    	

};
module.exports = SocketController;