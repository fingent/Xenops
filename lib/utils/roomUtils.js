// general Room related functions
var getAllRooms = function(io){
	// Get '/' character append with room name
	return Object.keys(io.sockets.manager.rooms);
}
// Find socketid using user name  
var findSocketId = function(clients, username){
	var sockId = 0;
	for (var socketid in clients) {
		if (clients[socketid] != null) {
			if (clients[socketid].name == username) {
				sockId = socketid;
				break;
			}
		}

	}

	return sockId;
}
// To get all room objects with all informations
var getRoomsListwithRoomId = function(roomObjRef){
	var roomsObjs = [];
	for (var key in roomObjRef)	{
		var tmpObj = new Object();
		tmpObj.name = roomObjRef[key].name;
		tmpObj.id = roomObjRef[key].roomid;
		roomsObjs.push(tmpObj);
	}

	return roomsObjs;
}
module.exports = {
	getRoomsList: getRoomsListwithRoomId,
	getSocketId: findSocketId,
	getRooms: getAllRooms
}
