const ErrorHandling = require('./ErrorHandling.js');

module.exports = (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || 'Internal server error...',
  };

  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err?.path}`;
    const error = new ErrorHandling(message, 404);
  }
  if (process.env.NDOE_ENV === 'DEVELOPMENT') {
    res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack,
    });
  }
  if (process.env.NDOE_ENV === 'PRODUCTION') {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
};
