const sessionsService = require("../services/sessions.services");

const createUserSession = async function (req, res, next) {
	const { username, password } = await req.body;
	await sessionsService.createSession(username, password);
	res.status(201).json({ message: "User Registered" });
};

const userVerify = async function (req, res, next) {};

module.exports = {
	createUserSession,
};
