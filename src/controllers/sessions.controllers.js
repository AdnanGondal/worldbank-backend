const sessionsService = require("../services/sessions.services");

const verifyUserSession = async function (req, res, next) {
	const activeSession = await req.cookies;

	if (!activeSession) {
		res.status(400).json({ error: "No cookie provided" });
	}
	const isValidSession = await sessionsService.verifySession(activeSession);

	if (isValidSession === true) {
		res.status(200).json({ loggedIn: true });
	} else {
		res.status(401).json({ loggedIn: false });
	}
};

module.exports = {
	verifyUserSession,
};
