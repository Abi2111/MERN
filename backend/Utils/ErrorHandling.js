class ErrorHandling extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.caputreStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandling;
