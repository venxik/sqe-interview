import { loans } from "@prisma/client";
import {
  LoanResponse,
  LoanStatusType,
  RequestLoanInput,
} from "@loan-types/Loan";
import { CreateLoanData } from "@repositories/LoanRepository";

export class LoanMapper {
  static toCreateData(input: RequestLoanInput): CreateLoanData {
    return {
      userId: input.user_id,
      mrp: input.mrp,
      dp: input.dp,
      vehicleYear: input.vehicle_year,
      policeNumber: input.police_number,
      machineNumber: input.machine_number,
    };
  }

  static toResponse(dbLoan: loans): LoanResponse {
    return {
      mrp: dbLoan.mrp,
      dp: dbLoan.dp,
      vehicle_year: dbLoan.vehicle_year,
      police_number: dbLoan.police_number,
      machine_number: dbLoan.machine_number,
      status: dbLoan.status as LoanStatusType,
    };
  }

  static toResponseArray(dbLoans: loans[]): LoanResponse[] {
    return dbLoans.map(this.toResponse);
  }
}
