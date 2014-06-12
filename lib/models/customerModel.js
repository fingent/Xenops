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
