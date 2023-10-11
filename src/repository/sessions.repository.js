const db = require("./db");

const saveSession = async function (sessionID, userId) {
	return db.query("INSERT INTO sessions (uuid, user_id) VALUES ($1, $2)", [
		sessionID,
		userId,
	]);
};

const getSession = async function (uuid) {
	return db.query("SELECT uuid, user_id FROM sessions WHERE uuid=$1", [uuid]);
};

const deleteSession = async function (uuid) {
	return db.query("DELETE FROM sessions WHERE uuid=$1", [uuid]);
};

module.exports = {
	saveSession,
	getSession,
};
