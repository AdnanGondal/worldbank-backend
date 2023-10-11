const sessionsRepo = require("../repository/sessions.repository");
const { v4: uuidv4 } = require("uuid");

const createSession = async (userId) => {
	const sessionID = uuidv4();
	await sessionsRepo.saveSession(sessionID, userId);
	return sessionID;
};

const verifySession = async (cookie) => {
	const sessionFound = await sessionsRepo.getSession(cookie.sessionId || "");
	// console.log(sessionFound.rows.length > 0 ? true : false);
	return sessionFound.rows.length > 0 ? true : false;
};

module.exports = {
	createSession,
	verifySession,
};
