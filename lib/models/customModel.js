// Custom Model
function CustomModel(){}

CustomModel.prototype.index = function(req, res) {
	var data = 'Custom model data';

	res.send(data);
}
module.exports = CustomModel;
