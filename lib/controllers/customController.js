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


module.exports = CustomController;