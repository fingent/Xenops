// New controller 

// Custom model initialisation
var custom = require('../models/CustomModel')
var customModel = new custom();
var fs = require('fs');
var constant = require('../utils/const');

function CustomController(){}

CustomController.prototype.index = function(req, res, next){

	customModel.index(req, res);
	return next();
};
// View handler method
CustomController.prototype.staticView = function(req, res, next) {
	// View is a static html file 
	var filepath ;
	filepath = constant.APP_PATH + '/views/index.html';
	// Check for file exist 
	console.log('Requested page');
	fs.exists(filepath, function(fileExist){
		if (! fileExist) {
    		filepath = constant.APP_PATH + '/views/404.html';
    	}
    	console.log('Page got');
    	// Read the file conetnt and display the content.
		fs.readFile(filepath, 'UTF-8', function(err, data){
			console.log('read data');
			if (err)
				res.end(''+ err);
			else { 	
				res.writeHead(200, {'Content-Type':'text/html'});
				res.end(data.toString());
			}
		});
	});
	
	return next();
};
CustomController.prototype.dynamicView = function(req, res, next) {
	var htmlText = '<html><head></head><body><h2>This is the dynamic content you can add anything you want.</h2></body></html>'
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(htmlText);

	return next();
};
// EJS Template engine view 
CustomController.prototype.templateView = function(req, res, next) {
	// You can read it synchronously
	//var templateStr = fs.readFileSync(constant.APP_PATH + '/views/index.ejs', 'utf8');
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

module.exports = CustomController;