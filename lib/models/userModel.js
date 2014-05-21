function UserModel(){}

UserModel.prototype.getUserdetails = function(req, res) {

	if (! isConnected) return(res.send("No database connection."));

	request.query("SELECT * FROM userTable", function(err, results){
		console.dir(results);
		if (err)
			res.end('Err'+err);
		else {
			res.writeHead(200,{'Content-Type':'application/json'});
			res.end(JSON.stringify(results));
		}
	})	

}
UserModel.prototype.saveUser = function(req, res, user_obj) {

	if (! isConnected) return(res.send("No database connection."));

	
	var queryStr = "INSERT INTO userTable(name, email, phone, place) VALUES ('"+ user_obj.name+"', '"+ user_obj.email+
    	"','"+ user_obj.phone+"','"+ user_obj.place+"')";

	request.query(queryStr, function(err, results){
		if (err)
			res.end(''+err);
		else {
			res.writeHead(200,{'Content-Type':'application/json'});
			res.end("Query successfully executed.");
		}
	})

}
UserModel.prototype.updateUser = function(req, res, user_obj) {

	if (! isConnected) return(res.send("No database connection."));

	
	var queryStr = "UPDATE userTable SET name='"+ user_obj.name+"', email='"+ user_obj.email+"', phone='"+ user_obj.phone+"', place='"+ user_obj.place+"'"+
		" WHERE id="+ user_obj.id +"";

	request.query(queryStr, function(err, results){
		console.dir(results);
		if (err)
			res.end(err);
		else {
			res.writeHead(200,{'Content-Type':'application/json'});
			res.end("Query successfully executed.");
		}
	})

}
UserModel.prototype.deleteUser = function(req, res, userid) {

	if (! isConnected) return(res.send("No database connection."));
	
	var queryStr = "DELETE FROM userTable WHERE id="+ userid+"";
	request.query(queryStr, function(err, result){
		if (err) {
			console.log(err);
			res.end(err);
		} else {
			console.log(result);
			res.end("Query successfully executed.");
		}	
	})	

}	
module.exports = UserModel;

