/*
*  Here we are implementing realtime chat room concept using Virtual Classroom
*  In this class room, teacher  is presenter and students are the viewers and students are from different places. 
*  Here i am presenting a small working model of the application. Each student in class room corresponds to user in chat room. 
*  Online Realtime drawing, public and private chat functionalities are implemented here.
* 
*/
function ClassRoom(name, roomid, owner) {
	this.name = name;
	this.roomid = roomid;
	this.students = [];
	this.teacher = owner;
	this.isActive = true;
	this.initData = {annotationdataList:[], zoomValue:1, color:16711680, chattext:'', activePage:1, mode:'', panPosition:{}, selected:'', drawList:[], drawObj:[]};
}
// Add Student to class room
ClassRoom.prototype.addStudent =  function(student){
	// Check for already exist
	if (this.isActive) {
		this.students.push(student);
	}

};
// Remove student from class room 
ClassRoom.prototype.removeStudent = function(studentId){

	for (var i = 0; i < this.students.length; i++) {

		if (this.students[i].id == studentId) {
			this.students.splice(i,1);
			break;
		}
	}
};
// To get student details 
ClassRoom.prototype.getStudent = function(studentId) {
	var student = null ;
	for (var i = 0; i < this.students.length; i++) {

		if (this.students[i].id == studentId) {
			student = this.students[i];
			break;
		}
	}

	return student;
};

module.exports = ClassRoom;