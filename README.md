Xenops Framework
=============================
This framework is simple and including full featured components of REST API, MVC framework, database management, web socket management and view with static, dynamic web pages. It includes socket management system, data driven REST API, static and dynamic views, friendly URL routing, validation, logging, REST API functionality testing module etc. This framework architecture is service handler oriented one and user can easily develop simple to complex level API functionality. Data management module handles data models with validation and sanitization, models retrieves the data from database using correct node modules. It is especially good for building REST API, multi room chat, virtual class room, real time scalable dashboards, multiplayer games and website with static, dynamic view based web pages. It is an extensible framework, user can easily extend the framework and rewrite functionality and change it according to their own needs.   

Framework structure is shown in fig.
![screen](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/structurethis.png)![screen1](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/treestructure.png)

## Installation

	// global install
	$ npm install -g xenops 

Next we can use the commandline utility, type xenops in terminal and press enter, it will show how to use. 

	$ xenops
	Please provide the app name. Usage - xenops [dirname] eg: xenops myapp

If you want to generate an application with Xenops, you should first navigate to the folder using cd command, where we want to create app.  
Create application using Xenops commandline :

	$ xenops appname
	Xenops sample Framework structure created in appname.
	
Install dependencies:

	$ cd appname && npm install

Run application :

	$ npm start 

Open the browser and type url :http://localhost:8888/ shows 
	
	Welcome to Xenops Framework


Framework structure
-------------------
	The structure of the files in an application is very important.It will help us to expand the current application structure by adding more modules and make an good app.
Before doing that one , we should clearly understand the basic structure and how to make simple api function using current app. We will separate core functions of our app into sensible and efficient file structure.    

This framework contains some important modules,

 - Configuration
 - Routing
 - Logging
 - Data management
 - Socket io programming
 - Views management
 - Template management
 - Object Relational Mapping 
 - Client testing

## Configuration

This is the main configuration file (config/config.js) that contains all configurations needed for the entire application to work. DB config, server config, app config, socket config etc. 

## Routing
Restify server based routing configuration implemented.The file routes/routes.js file exports the Router object that handles all the route to application framework.  

## Server
Node Restify server is used for framework development. server.js file  is used to configure server, socket, and handlers.Once everything is configured correctly, you need to call initApp() function that will start application. There is one index file in the root folder and it is entry point of application and db connection, server initialisation start from here.This file will invoke the framework server and start application.

Just need to run node index.js (Development or production mode can set by using NODE_ENV) 
![image](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/node-start.png)         
and you can see that server is started. 
Open the browser and type url :http://localhost:8888/
Gives : Welcome to Xenops Framework

## Data management
This framework has separate directory structure for each file model, controller etc. Router routes the url to one function inside the controller. This framework structure contains controllers, models etc. Controller navigate through the application and handlers (functions) inside controller call the appropriate model and returns the data. Data is taken from models, models retrieves the data from database, for different database we have to use different node database modules. Here we have used the sql server node database module. 
 
## Socket io programming
Socket io connection established through the same port used for api development. We have modularise the code to controller and model.There is no view present in this structured Framework.Here i am trying to explain code features of socket io programming and cool feature technology named web Real Time communication through code samples.
Node uses an event-driven, Non blocking I/O programming model and javascript is event driven language.One of the main feature of node js is event module, and EventEmitter class.Here i am not going to explain full server side code to implement multiple room real time communication. But I beleive that you will get a basic boilerplate for creating a multiple realtime communication. 
 In this socket io module implemented in socket controller, socket io configuration settings for the production and development are given.
![socketio](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/socketcontroller.png)
 In the socket io programming socket has to listen for many events. We have created one custom event class to control socket events.
Socket Event listeners are added in controllers.  	
![socketlisteners](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/socket-listeners.png)
Custom socket event class will handle all events and added in controller.
```
// Event emitter Handler Obj 
var socketEventEmit = require('../events/socketEventEmitter');  
```
![socketemitters](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/socket-emitter.png)

## Views management 
We have already mentioned that this framework is REST API based one and there is no view present in it. But in future we are looking for common framework for web based
and REST API. For this one, we have started static and dynamic html page rendering using current framework.
```
// Custom controller routes
this.server.get('/staticview', this.controllers.custom.staticView); 
this.server.get('/dynamicview', this.controllers.custom.dynamicView); 
```	
Static and dynamic page render handlers.
![views](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/view-handlers.png)

## Template management
EJS is a very popular opensource javascript template library and used in this framework.

### How to use template in Framework

Add one index.ejs file in views folder.

	<h1>Fingent Technology Solutions</h1>
	<% if (data.length) { %>
		<ul>
			<%  data.forEach(function(name) {   %>
				<li><strong><%= name %></strong></li>
			<%  }) %>
		</ul>

	<% } %>

Add new url route to routes.js

	this.server.get('/template', this.controllers.custom.templateView); 

template code for controller

	CustomController.prototype.templateView = function(req, res, next) {
		// Read it asynchronus mode 
		fs.readFile(constant.APP_PATH + '/views/index.ejs', 'UTF-8', function(err, templateStr){
			if (err)
				res.end(''+ err);
			else { 	
				var returnStr = ejs.render(templateStr, {
					data: ['Fingent', 'Xenops', 'Framework']
				});
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(returnStr);
			}
		});
	
		return next();
	};

Open the browser and type -> http://localhost:8888/template shows
![template](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/template.png)
## Object Realational Mapping(ORM)
This is node js object relational mapping module named orm node module. The key feature of ORM is the mapping it uses to bind an object to its data in the database.
ORM has the benefit of allowing you to more easily support more database engines.
Currenly it support following DBMS

 - MySQL & MariaDB 
 - PostgreSQL
 - Amazon Redshift
 - SQLite
 - MongoDB (beta)

It has so many features 

 - Create Models, sync, drop, bulk create, get, find, remove, count, aggregated functions
 - Create Model associations, find, check, create and remove
 - Define custom validations (several builtin validations, check instance properties before saving)

### Usage example 

Add new url to routes.js

	this.server.get('/getcustomers', this.controllers.custom.getAllCustomers); 

A Model is an abstraction over one or more database tables. Models support associations. The name of the model is assumed to match the table name.
Create model file customerModel.js and add code.

	// Define customer model  
	module.exports = function(db){

		var Customer = db.define('customer', {
			name : String,
			email: String
		}, {
			methods: {
				getName: function(){
					return this.name;
				},
				getEmail: function(){
					return this.email;
				}
			}
		});

		return Customer;
	};

customer is the table name and name, email are fields.

Drop this bits of code in /controllers/customController.js

	CustomController.prototype.getAllCustomers = function(req, res, next){

		res.writeHead(200, {'Content-Type': 'application/json'});

		// ORM database connected 
		if (ormDb) {

			var customerModel = require('../models/customerModel')(ormDb);
			// To get all customers, {} for first customer {id: 1}  
			customerModel.find({}, function(err, customers){

				if (err) {
					console.log('DB Error ='+ err);
					res.end(JSON.stringify(err));
					return ; 
				}
				// Print Collection of customer object 
				res.end(JSON.stringify(customers));
			})	

		} else {

			res.end('No database connection.');
		}

		return next();
	};

Open the browser and type -> http://localhost:8888/getcustomers

	[{"name":"John Luka","email":"luka@gmail.com","id":1},{"name":"Maria","email":"maria@gmail.com","id":2}]

results is the mysql table customer total records displayed as json.  	

## Data handling in CRUD operations
Here we have already implemented a CRUD operation api functionalities using the current api framework.It includes user controller, model, routes etc.   

## Logging
In the current framework we are using winston log module.We can easily log the the info, error, warn and debug using this logger module.
![alt tag](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/logger.png)

this file is stored in utils/logger.js file.In the application we can use like,
``` 
// Log information
logger.info('Application server started. ');
```
Two log files are created inside log folder for debug and exception log.

## Client testing
This module is very important one and it can be used for  REST API functional testing. Here is one html and  js  file, html file is used for socket io connection testing and js file one is used for testing
![client](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/client.png)  
How to use this one ?  
```
var client = require('./testClient/client');
// call client 
client.clientConnect();
client.getUsers();
```
Will output the results in console.

## Create a REST api simple function using our framework

We present here a demo of single api function development using our own framework. Let’s begin.

### Create your own custom controller
create  /controllers/customController.js file and update the file with above code and save it. 
![screen](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/customController1.png)

### Create custom model
![model](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/customModel.png)

Drop this bits of code in models/customModel.js.
 
### Add custom controller to server.js
![handler](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/servicehandlers.png)
![servicehandler](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/handler.png)

Update the server.js with code shown in above. Initialise service handlers with new custom controller object. Currently we are storing our action objects in service handlers object.
 
### Add Url Routing
Edit routes\routes.js and update it.
![router](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/routes.png)

Now everything is completed and the new REST API function developed using our own new structured framework. It is very simple. 

## Run the server steps

Go to application folder ->  cd appfolder 
Start node server by typing - > node index.js  
Open the browser and type -> http://localhost:8888/custom
![localhost](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/localhost.png)

It is working fine. The above mentioned example is simple one. For database related method, you can check userModel.js file

![database](https://raw.githubusercontent.com/fingent/xenops/master/lib/doc/codescreens/model.png)

Here we are using the sql server database and mssql node module included here and it is seperated from ORM module.

Based on the code you can get an idea of how to use different database engines inside our framework.
  
## Moving forward
 In the future we want our framework to include cool features like
 - Test framework addition
 - Secure api development 
 
