import { ErrorCodeType } from '../constants/ErrorCodes';

export class ErrorBase extends Error {
  private errorCode: ErrorCodeType;
  private httpStatusCode: number;

  constructor(message: string, errorCode: ErrorCodeType, httpStatusCode: number) {
    super(message);
    this.errorCode = errorCode;
    this.httpStatusCode = httpStatusCode;
    this.name = 'ErrorBase';
  }

  public getMessage(): string {
    return this.message;
  }

  public getErrorCode(): ErrorCodeType {
    return this.errorCode;
  }

  public getHttpStatusCode(): number {
    return this.httpStatusCode;
  }
}
