const bcrypt = require("bcrypt");
const InvalidRequest = require("../errors/InvalidRequest");
const usersRepo = require("../repository/users.repository");
const Unauthroised = require("../errors/Unauthorised");
const sessionsService = require("./sessions.services");

const createUser = async (username, password) => {
	const duplicate = await usersRepo.getDuplicateRegistrations(username);

	if (duplicate.rows.length !== 0) {
		throw new InvalidRequest("User already exists.");
	}

	const salt = await bcrypt.genSalt(8);
	const passwordEncrypted = await bcrypt.hash(password, salt);

	usersRepo.createUser(username, passwordEncrypted);
};

const verifyUser = async (username, password) => {
	const userRecord = await usersRepo.getUserIdAndPassword(username);

	if (userRecord.rows[0]) {
		const userId = userRecord.rows[0].id;
		const storedPassword = userRecord.rows[0].password;

		console.log(userRecord.rows[0]);
		const passwordMatches = await bcrypt.compare(password, storedPassword);

		if (passwordMatches) {
			return sessionsService.createSession(userId);
		}
		return false;
	} else {
		throw new Unauthroised("User not found");
	}
};

module.exports = {
	createUser,
	verifyUser,
};
