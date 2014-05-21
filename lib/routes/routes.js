/*
	Initialise all the webservice api url routings.
*/

function Router(server, controllers) {

	this.server = server;
	this.controllers =  controllers;  
}
// Here list all api urls 
Router.prototype.configUrls = function() {
	this.server.get('/', this.controllers.user.init);
	this.server.get('/getAllusers', this.controllers.user.getAllUserdetails);
	this.server.post('/update', this.controllers.user.updateUser);
	this.server.get('/delete/:id', this.controllers.user.deleteUser);
	this.server.post('/adduser', this.controllers.user.addUser);
	// Custom controller routes
	this.server.get('/custom', this.controllers.custom.index); 
	this.server.get('/staticview', this.controllers.custom.staticView); 
	this.server.get('/dynamicview', this.controllers.custom.dynamicView); 
	// To get static content 
	this.server.get('/index.html', restify.serveStatic({ directory: './public', default:'index.html'}));
	//this.server.get('/index.jpg', restify.serveStatic({ directory: './public', default:'index.html'}));
}
module.exports = Router;