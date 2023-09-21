const sessionsRepo = require("../repository/sessions.repository");
const { v4: uuidv4 } = require("uuid");

const createSession = async (userId) => {
	const sessionID = uuidv4();
	await sessionsRepo.saveSession(sessionID, userId);
	return sessionID;
};

module.exports = {
	createSession,
};
