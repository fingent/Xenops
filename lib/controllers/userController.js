var userModel = require('../models/UserModel')
var userData = new userModel();

function UserController(){ }

UserController.prototype.init = function(req, res, next){
	res.send('Welcome to Xenops Framework');
	return next();
}
// Get user details
UserController.prototype.getAllUserdetails = function(req, res, next){
 	
 	userData.getUserdetails(req, res);
	
	return next();
}
// Add user 
UserController.prototype.addUser = function(req, res, next){

	// Add validation and sanitize 
	if (req.params) {
		var userObj = {};
		// add validation to userdata
		req.assert('name', 'Name must be supplied.').notEmpty();
		req.assert('email', 'Valid Email must be supplied.').notEmpty().isEmail();
		req.assert('phone', 'Phone must be supplied.').notEmpty().isInt();
		req.assert('place', 'Place must be supplied.').notEmpty();

		var errors = req.validationErrors();
		if (errors) {
			//res.send(500 ,'Validation errors: ' + util.inspect(errors));
			res.writeHead(200,{'Content-Type':'application/json'});
			res.end(JSON.stringify(errors));
		} else {
			userObj.name 	= req.params.name;
			userObj.email 	= req.params.email;
			userObj.place 	= req.params.place;
			userObj.phone 	= req.params.phone;
			userData.saveUser(req, res, userObj);
		}

	}

	return next(); 
};
// Delete user
UserController.prototype.deleteUser = function(req, res, next){

	// add Validation for rquest parameters post and get  
	req.assert('id', 'User id should be Integar.').notEmpty().isInt();
	var errors = req.validationErrors();
	if (errors) {
		res.writeHead(200,{'Content-Type':'application/json'});
		res.end(JSON.stringify(errors));
	} else {
		userData.deleteUser(req, res, req.params.id);
	}

	return next();
};
// Update user
UserController.prototype.updateUser = function(req, res, next){

	var userObj = {};
	// Add Validation for rquest parameters post and get  
	req.assert('id', 'User id should be Integar.').notEmpty().isInt();
	req.assert('name', 'Name must be supplied.').notEmpty();
	req.assert('email', 'Valid Email must be supplied.').notEmpty().isEmail();
	req.assert('phone', 'Phone must be supplied.').notEmpty();
	req.assert('place', 'Place must be supplied.').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		//res.send(500 ,'Validation errors: ' + util.inspect(errors));
		res.writeHead(200,{'Content-Type':'application/json'});
		res.end(JSON.stringify(errors));
	} else {

		userObj.id 		= req.params.id;
		userObj.name 	= req.params.name;
		userObj.email 	= req.params.email;
		userObj.place 	= req.params.place;
		userObj.phone 	= req.params.phone;
		userData.updateUser(req, res, userObj);
	}

	return next(); 
};
module.exports = UserController;