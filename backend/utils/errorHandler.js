//? Error handling middleware function
const errorHandler = (err, req, res, next) => {
  console.error("An error occurred:", err);

  //* Default error status and message
  let statusCode = 500;
  let errorMessage = "Internal Server Error";

  //* Check if the error has a status code and message
  if (err.statusCode && err.message) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  }

  //* Send error response to the client
  res.status(statusCode).json({ error: errorMessage });
};

module.exports = errorHandler;
