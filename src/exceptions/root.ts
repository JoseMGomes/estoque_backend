export class HttpExceptions extends Error {
  errorCode: ErrorCode;
  statusCode: number;
  errors?: any;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors?: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    if (errors) {
      this.errors = errors;
    }
  }
}

export enum ErrorCode {
  NOT_FOUND = 404,
  ALREADY_EXISTS = 409,
  BAD_REQUEST = 400,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_EXCEPTION = 500,
  UNAUTHORIZED = 401,
}
