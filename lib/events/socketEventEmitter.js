// socketEventEmitter class
var Room = require('../utils/room');
var roomMethods = require('../utils/roomUtils');
var roomVars = require('../utils/globalvars');
var uuid = require('node-uuid');


var util = require('util');
var EventEmiter = require('events').EventEmitter;

function SocketEventEmitter(){
	// This method used for emitting events 
	this.emitMethod = function(event, obj){
		this.emit(event, obj);
	};
}
// Inherit the Event emitter 
util.inherits(SocketEventEmitter, EventEmiter);

var socketEventEmitterObj = new SocketEventEmitter();

// Add Listeners for 
socketEventEmitterObj.on('onConnect', function(obj){
	roomVars.clients[obj.socket.id] = null;
	roomVars.roomslist = roomMethods.getRoomsList(roomVars.roomObjRef);
	roomVars.sockets.push(obj.socket);
	// Send message to connected client 
	obj.socket.emit('message', {action:'getAllRooms', value:(roomVars.roomslist), userid:null, roomid:null});
});
socketEventEmitterObj.on('addRoom', function(obj){
	// Generate room id and Room object
	var roomid = uuid.v4();
	var room = new Room(obj.data.room, roomid, obj.socket);
	// Update room of client
	roomVars.clients[obj.socket.id] = {roomid: obj.data.roomid, name:obj.data.username, id:obj.socket.id, room:obj.data.room};
	obj.socket.join(obj.data.room);
	roomVars.roomObjRef[roomid] = room;
	roomVars.roomslist = roomMethods.getRoomsList(roomVars.roomObjRef);
	// Send to all clients connected 
	obj.io.sockets.emit('message', {action:'getAllRooms', value:(roomVars.roomslist), userid:obj.data.userid, room:obj.data.room, roomid:roomid });
});
socketEventEmitterObj.on('joinRoom', function(obj){
	// Check first rooms if not exist update with all clients about rooms
	// if room found client added to room
	roomVars.clients[obj.socket.id] = {roomid: obj.data.roomid, name:obj.data.username, id:obj.socket.id, room:obj.data.room};
	var roomObj = roomVars.roomObjRef[obj.data.roomid];
	var studentObj = roomObj.getStudent(obj.socket.id);

	// Update with client data
	if (studentObj != null) {
		console.log('Student already exist.');
	} else {
		roomObj.addStudent(roomVars.clients[socket.id]);
	}	
	obj.socket.join(obj.data.room);

	var roomObj =  roomVars.roomObjRef[obj.data.roomid];
	// Only to that client emit
	var pdfConfiguredata = roomObj.initData;
	var textData = '<span color="0x00ff00" fontWeight="bold" fontSize="14">'+roomVars.clients[socket.id].name+' joined room</span><br/>';
	pdfConfiguredata.chattext += textData ;
	obj.socket.emit('message', {action:'setGlobalData', value:(roomObj.initData), userid:obj.data.userid, roomid:obj.data.roomid});

	obj.socket.broadcast.to(roomObj.name).emit('message', {action:'chatSend', value:textData, roomid: obj.data.roomid});
});
socketEventEmitterObj.on('removeRoom', function(obj){
	room = roomVars.roomObjRef[(obj.data.roomid)];
	obj.socket.broadcast.to(room.name).emit('message', {action:'roomRemoved', roomid:(obj.data.roomid)});
	if (room) {
		// leave all clients from room
		socketsList = obj.io.sockets.clients(room.name);
		for (var j = 0; j < socketsList.length; j++)
		{
			socketsList[j].leave(room.name);
			roomVars.clients[((socketsList[j]).id)].room = null;
			roomVars.clients[((socketsList[j]).id)].roomid = null;
		}
		delete roomVars.roomObjRef[(obj.data.roomid)];
	}
	// All clients updated with rooms
	roomVars.roomslist = roomMethods.getRoomsList(roomVars.roomObjRef);
	// Send to all clients 
	obj.io.sockets.emit('message', {action:'getAllRooms', value:(roomVars.roomslist), userid:null, room:obj.data.room, roomid:obj.data.roomid });
});
socketEventEmitterObj.on('leaveRoom', function(obj){
	var roomObj =  roomVars.roomObjRef[obj.data.roomid];
	roomObj.removeStudent(obj.socket.id);
	roomVars.socket.leave(roomObj.name);
	roomVars.clients[obj.socket.id].room = null;
	roomVars.clients[obj.socket.id].roomid = null;
	
	// Update client in the room
	var pdfConfiguredata = roomObj.initData;
	var textData = '<span color="0xff0000" fontWeight="bold" fontSize="14">'+roomVars.clients[obj.socket.id].name+' left room</span><br/>';
	pdfConfiguredata.chattext += textData ;
	obj.socket.broadcast.to(roomObj.name).emit('message', {action:'chatSend', value:textData, roomid: obj.data.roomid});

});
socketEventEmitterObj.on('send', function(obj){

	if (obj.data.roomid) {
		var roomObj =  roomVars.roomObjRef[obj.data.roomid];
		// Update global data based on room
		// Only few method updates are provided here.  
		var pdfConfiguredata = roomObj.initData;

		if (obj.data.action == Constant.ZOOM_IN || obj.data.action == Constant.ZOOM_OUT) {	
			pdfConfiguredata.zoomValue = obj.data.value ;
		}
		if (obj.data.action == Constant.CHAT_SEND) {
			pdfConfiguredata.chattext += obj.data.value ;
		}
		if (obj.data.action == Constant.CLEAR_CHAT) {
			pdfConfiguredata.chattext = "";
		}
		if (obj.data.action == Constant.PRIVATE_CHAT) {
			var socketIdvalue = findSocketId(roomVars.clients, (obj.data.value.username));
			if (socketIdvalue) {
				socketsList = obj.io.sockets.clients(roomObj.name);
				for (var j=0; j < socketsList.length; j++)
				{
					if (socketsList[j].id == socketIdvalue)
					{
						var objVal = obj.data.value;
						socketsList[j].emit('message', {action:Constant.PRIVATE_CHAT, value:(objVal.text), userid:obj.data.userid, roomid:obj.data.roomid});
						break;
					}
				}
			}
			else
				obj.socket.broadcast.to(roomObj.name).emit('message', {action:Constant.PRIVATE_CHAT, value:(obj.data.value.text), userid:obj.data.userid, roomid:obj.data.roomid});

			return;
		}
		obj.socket.broadcast.to(roomObj.name).emit('message', data);
	}
	else
		console.log('No room data');
});
socketEventEmitterObj.on('disconnect', function(obj){
	console.log('Socket disconnected');
	var clientObj = roomVars.clients[obj.socket.id];
	if (clientObj) {
		if (clientObj.room) {
			var roomObj =  roomVars.roomObjRef[clientObj.roomid];
			if (roomObj) {
				// Remove disconnected client from room
				roomObj.removeStudent(obj.socket.id);
				var pdfConfiguredata = roomObj.initData;
				var textData = '<span color="0xff0000" fontWeight="bold" fontSize="14">'+clientObj.name+' left room</span><br/>';
				pdfConfiguredata.chattext += textData ;
				// Update the client disconnected information to all clients in the room .
				obj.socket.broadcast.to(roomObj.name).emit('message', {action:'chatSend', value:textData, roomid: clientObj.roomid});
			}
			clientObj.room = null;
			clientObj.roomid = null;
			obj.socket.leave(clientObj.room);
		}
	}
});
socketEventEmitterObj.on('toserver', function(obj){
	console.log(util.inspect(obj));
	obj.socket.emit('listenserver', {'ToClinet':'From server\n'});
});


module.exports = socketEventEmitterObj;