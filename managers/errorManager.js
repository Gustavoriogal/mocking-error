// customError.js
class CustomError extends Error {
    constructor(errorType) {
        super();
        const { status, message } = errorType;
        this.status = status;
        this.message = message;
    }
}

module.exports = CustomError;