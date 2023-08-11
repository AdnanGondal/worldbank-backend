const usersService = require("../services/users.services");

const userRegister = async function (req, res, next) {
	const { username, password } = await req.body;
	try {
		await usersService.createUser(username, password);
		res.status(201).json({ message: "User Registered" });
	} catch (error) {
		next(error);
	}
};

const userVerify = async function (req, res, next) {
	const { username, password } = await req.body;
	try {
		validUser = await usersService.verifyUser(username, password);

		if (validUser) {
			res.status(200).json({ message: "loggedIn" }, 200);
		} else {
			res.status(401).json({ message: "Incorrect Password" });
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	userRegister,
	userVerify,
};
