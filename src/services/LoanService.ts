import { loanRepository } from "@repositories";
import {
  ApproveLoanInput,
  ApproveLoanSuccessResponse,
  LoanStatus,
  RequestLoanInput,
  UserLoansResponse,
} from "@loan-types/Loan";
import { LoanMapper } from "@mappers/LoanMapper";
import { ErrorBase, ErrorCodes } from "@shared/index";
import { StatusCodes } from "http-status-codes";

export class LoanService {
  async requestLoan(input: RequestLoanInput): Promise<UserLoansResponse> {
    await loanRepository.createLoan(LoanMapper.toCreateData(input));

    const loans = await loanRepository.findAllByUserId(input.user_id);

    return {
      user_id: input.user_id,
      loans: LoanMapper.toResponseArray(loans),
    };
  }

  async approveLoan(
    input: ApproveLoanInput,
  ): Promise<ApproveLoanSuccessResponse> {
    const loan = await loanRepository.findByUserIdAndPoliceNumber(
      input.user_id,
      input.police_number,
    );

    if (!loan) {
      throw new ErrorBase(
        "Loan not found",
        ErrorCodes.LOAN_NOT_FOUND_ERROR_CODE,
        StatusCodes.NOT_FOUND,
      );
    }

    await loanRepository.updateStatus(loan.id, LoanStatus.APPROVED);

    return {
      user_id: input.user_id,
      police_number: input.police_number,
      message: "Loan updated successfully.",
    };
  }
}

export default new LoanService();
