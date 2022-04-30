/**
******************************************
******************************************
******************************************
	**	CAUTION: DO NOT CHANGE THIS CONFIG FILE

	**	admin: Pradyumn
	**	date: 30/04/2022
******************************************
******************************************
******************************************
**/

module.exports = {
    "MESSAGE": "message",
    "TIMESTAMP": "timestamp",
    "LOCAL_ID": "id",
    "IS_SENT": "is_sent",
    "MESSAGE_ID": "message_id",
    "USER_ID": "user_id",
    "UNIVERSAL_COUNTER": "universal_counter"
}

/*
***************************************
*	RARE CASE (IF ANY VALUE IS CHANGED **not the key**)
***************************************
*
*	WHENEVER CHANGE HAPPENS FOR ANY VALUE OF A KEY, RUN FOLLING COMMAND
*	db.collectionName.update({},{$rename:{"oldKeyName":"newKeyName"}})
*									or
*	db.collectionName.update({},{$rename:{"oldKeyName":"newKeyName"}},false,true)
***************************************
*/