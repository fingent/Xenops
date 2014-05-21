/**
 * Module dependencies.
 */
var config = require('./config/config');
var routes = require('./routes/routes');
var socketio = require("socket.io");
var os = require('os');
// Include dependancy modules 
sqlcon = require('mssql');
restify= require('restify');
// Logger
logger = require('./utils/logger');
// Global validator
restifyValidator = require('restify-validator');
// Global checking variable  
isConnected = false; 
// Service handlers for each module
var userservice = require('./controllers/userController');
var socketHandler = require('./controllers/socketController');
var customHandler = require('./controllers/customController');
// Router obj for router configuration
var routerObj;
// app Client obj to test the url routes   
var client = require('./testClient/client');
// Service handlers include all service object reference   
var servicehandlers;

// initialise REST API server 
var server = restify.createServer(config.appConfig);
var io = socketio.listen(server);
// Socket object
var socketObj = new socketHandler();

console.log('Creating server .......');///--- Globals

/*
  Create all service handler objects here .  
*/
function createHandlerObjects(){
	servicehandlers = {
		user:  new userservice(),
		custom: new customHandler()
	};
}
/*
	Configure socket obj and add listeners
*/
function configureSocket(){
	
	socketObj.configure(io);
	socketObj.initListeners(io);
}

/*
	Configure server to use different functionalities.
*/
function configureServer(){
	server.use(restify.acceptParser(server.acceptable));
	server.use(restify.gzipResponse());
	server.use(restify.bodyParser());
	server.use(restify.fullResponse());
	server.use(restify.queryParser());
	server.use(restifyValidator);
}
/*
	Starting point of server 
 	Server creation and socket connection done. 
 */
function initApp(){
	configureServer();
	createHandlerObjects();
	// Socket connection enable checking 
	if (config.isSocketEnabled) {
		configureSocket();
	}
	// Connect to database if db configuration enabled 
	if (config.isdbEnabled) {
		sqlcon.connect(config.dbConfig, function(err){
			if (err) {
				console.log('Db connection error occured\n'+ err);
			} else {
				isConnected = true;
				request = new sqlcon.Request();
				console.log('Connection established.');
			}
		});
	}	
	// Pass server and handlers to router to configure urls. 
	routerObj = new routes(server, servicehandlers);
	routerObj.configUrls(); 
	// Socket. io and restify server running on same port
	server.listen(config.serverConfig.port, function(){
		console.log('Application %s listen on port %s', server.name, server.url);
		console.log('Socket.io server listening at %s', server.url);
	});
	// Log the information
	logger.info('Application server started. ');
	
}
module.exports.initApp = initApp;




