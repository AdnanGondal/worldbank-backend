const errorLogger = (error, request, response, next) => {
	console.log(`error ${error.message}`);
	next(error);
};

const errorHandler = (error, request, response, next) => {
	response.header("Content-Type", "application/json");

	const status = error.status || 400;
	response.status(status).send({ message: error.message });
};

const invalidPathHandler = (request, response, next) => {
	response.status(400).send({ message: "Invalid Path" });
};

module.exports = {
	errorLogger,
	errorHandler,
	invalidPathHandler,
};
