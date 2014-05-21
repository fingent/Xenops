// Client.js file for testing the service 

// Create Json client to test the server 
var client = restify.createJsonClient({
  url: 'http://localhost:8888',
  version: '*'
});
// Checking server side connection 
// Connect to server 
var checkConnection = function(){
	client.get('/', function(err, req, res, obj) {
    	console.log('%j', obj);
	});
}
// get userdetails
var getUserData = function(){
  client.get('/getAllusers', function(err, req, res, obj) {
      console.log('%j', obj);
  });
}
// delete user
var deleteUserDetails = function (){
  client.get('/delete/5', function(err, req, res, obj) {
      console.log('%d -> %j', res.statusCode, res.headers);
      console.log("Error"+err);
      console.log('%j', obj);
  });
}
// add user
var addUserdetails = function (){
	client.post('/adduser', {name: 'Roshan', email:'roshanraj@gmail.com', phone:'8700567878', place:'Manikyam' }, function(err, req, res, obj) {
  		console.log('%d -> %j', res.statusCode, res.headers);
   		console.log('%j', obj);
	});
}	
// update user
var updateuserDetails = function(){
  client.post('/update', {id: 3, name: 'Vasu', email:'vasu@gmail.com', phone:'1700567878', place:'Manikavu' }, function(err, req, res, obj) {
      console.log('%d -> %j', res.statusCode, res.headers);
      console.log(err);
      console.log('%j', obj);
  });
} 
// Exports the functions perform CRUD operations  
module.exports.clientConnect = checkConnection;
module.exports.addUser       = addUserdetails;
module.exports.updateUser    = updateuserDetails;
module.exports.deleteUser    = deleteUserDetails;
module.exports.getUsers      = getUserData;