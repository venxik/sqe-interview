import Express, { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import loanService from "@services/LoanService";
import { ErrorBase } from "@errors/ErrorBase";
import { ErrorCodes } from "@constants/ErrorCodes";
import { ApproveLoanSchema, RequestLoanSchema } from "@loan-types/Loan";

const LoanController = Express.Router();

const requestLoanHandler: RequestHandler = async (req, res, next) => {
  try {
    const input = RequestLoanSchema.parse(req.body);
    const result = await loanService.requestLoan(input);
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = new ErrorBase(
        error.errors.map((e) => e.message).join(", "),
        ErrorCodes.VALIDATION_ERROR_CODE,
        StatusCodes.BAD_REQUEST,
      );
      return next(validationError);
    }
    next(error);
  }
};

const approaveLoanHandler: RequestHandler = async (req, res, next) => {
  try {
    const input = ApproveLoanSchema.parse(req.body);
    const result = await loanService.approveLoan(input);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = new ErrorBase(
        error.errors.map((e) => e.message).join(", "),
        ErrorCodes.VALIDATION_ERROR_CODE,
        StatusCodes.BAD_REQUEST,
      );
      return next(validationError);
    }
    next(error);
  }
};

LoanController.post("/request", requestLoanHandler);
LoanController.post("/approve", approaveLoanHandler);

export default LoanController;
