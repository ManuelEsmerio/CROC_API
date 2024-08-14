export class CustomAPIError extends Error {
    constructor (message, statusCode, info) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = true;
        this.info = info;
        Error.captureStackTrace(this, this.constructor)
    }
}