export const ErrorCodes = {
  MALFORMED_JSON_ERROR_CODE: 88,
  RUNTIME_ERROR_CODE: 99,
  VALIDATION_ERROR_CODE: 100,
  LOAN_NOT_FOUND_ERROR_CODE: 101,
} as const;

export type ErrorCodeType = (typeof ErrorCodes)[keyof typeof ErrorCodes];
