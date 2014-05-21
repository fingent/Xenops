// define all constants here
var path = require('path');
var Constants = {
	LOG_ERROR_LEVEL: 0,
	LOG_WARN_LEVEL: 1,
	LOG_INFO_LEVEL: 2,
	LOG_DEBUG_LEVEL: 3,
	APP_PATH: path.resolve('.'),
	ZOOM_IN: 'zoomIn',
	ZOOM_OUT: 'zoomOut',
	COLOR_SELECT: 'colorSelect',
	CHAT_SEND: 'chatSend',
	CLEAR_CHAT: 'clearChat',
	THUMB_CLICK:'thumbClick',
	PREV_PAGE_CLICK: 'prevPageClick',
	FIRST_PAGE_CLICK: 'firstPageClick',
	NEXT_PAGE_CLICK: 'nextPageClick',
	LAST_PAGE_CLICK: 'lastPageClick',
	PAN:'pan',
	DRAW_CLICK:'drawClick',
	PAN_POSITION:'panModeposition',
	REMOVE_LINE: 'removeLIne',
	OBJECT_SELECT:'objectSelect',
	DRAW:'draw',
	PUSH_DRAW:'pushDrawObjects',
	PRIVATE_CHAT:'privateChat',
	PUSH_ANNOTATION_DATA:'pushAnnotationData',
	ANNOTATE_MODE: 'annotate',
	UPDATE_ANNOTATE_POS:'updateAnnotatePosition',
	DEFAULT_MODE: 'default'
};
module.exports = Constants;