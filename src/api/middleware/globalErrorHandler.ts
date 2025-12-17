import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorBase } from "@errors/ErrorBase";
import { ErrorCodes } from "@constants/ErrorCodes";

interface SyntaxErrorWithType extends SyntaxError {
  type?: string;
}

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const syntaxError = err as SyntaxErrorWithType;
  if (syntaxError.type === "entity.parse.failed") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "malformed_json",
      error_description: "Malformed JSON in request body",
    });
  }

  if (err instanceof ErrorBase) {
    return res.status(err.getHttpStatusCode()).json({
      error: getErrorKey(err.getErrorCode()),
      error_description: err.getMessage(),
    });
  }

  // Log unexpected errors for debugging
  console.error("Unexpected error:", err);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "internal_error",
    error_description: "An unexpected error occurred",
  });
};

function getErrorKey(errorCode: number): string {
  switch (errorCode) {
    case ErrorCodes.VALIDATION_ERROR_CODE:
      return "validation_error";
    case ErrorCodes.LOAN_NOT_FOUND_ERROR_CODE:
      return "loan_not_found";
    case ErrorCodes.MALFORMED_JSON_ERROR_CODE:
      return "malformed_json";
    default:
      return "internal_error";
  }
}

export default globalErrorHandler;
