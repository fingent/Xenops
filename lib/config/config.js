/*
Configuration files 
*/
module.exports = {
	dbConfig : {
		user: 'sa', // super admin user 
    	password: 'sasa', // super admin password 
    	server: '10.10.2.97', // You can use 'localhost\\instance' to connect to named instance
    	database: 'testdb12'  // db name 
	},
	serverConfig: {
		ip: '127.0.0.1',
		port: 8888 
	},
	appConfig: {
		name: 'rest-api',
		version: '1.0.0'
	},
	socketConfig:{
		prod_transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'],
		dev_transports: ['websocket', 'flashsocket'],
		flash_port: 843
	},
	// Database connection 
	isdbEnabled: false,
	// Socket connection Enable/Disable
	isSocketEnabled: true

}
