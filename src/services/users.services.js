const bcrypt = require("bcrypt");
const InvalidRequest = require("../errors/InvalidRequest");
const usersRepo = require("../repository/users.repository");
const Unauthroised = require("../errors/Unauthorised");

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
	const storedPassword = await usersRepo.getUserPassword(username);

	if (storedPassword.rows[0]) {
		const passwordMatches = await bcrypt.compare(
			password,
			storedPassword.rows[0].password,
		);
		if (passwordMatches) return true;
		return false;
	} else {
		throw new Unauthroised("User not found");
	}
};

module.exports = {
	createUser,
	verifyUser,
};
