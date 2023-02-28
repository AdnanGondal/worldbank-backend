const errorLogger = (error, request, response, next) => {
  console.log(`error ${error.message}`);
  next(error);
};

const errorHandler = (error, request, response, next) => {
  response.header('Content-Type', 'application/json');

  const status = error.status || 400;
  response.status(status).send(error.message);
};

const invalidPathHandler = (request, response, next) => {
  response.status(400).send('Invalid Path');
};

module.exports = {
  errorLogger,
  errorHandler,
  invalidPathHandler,
};
