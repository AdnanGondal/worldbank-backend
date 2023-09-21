const db = require("./db");

const saveSession = async function (sessionID, userId) {
	return db.query("INSERT INTO sessions (uuid, user_id) VALUES ($1, $2)", [
		sessionID,
		userId,
	]);
};

// const getCookie = async function (userename) {
// 	return db.query("SELECT password FROM users WHERE username=$1", [userename]);
// };

module.exports = {
	saveSession,
};
