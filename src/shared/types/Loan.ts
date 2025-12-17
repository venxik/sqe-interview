import { z } from "zod";

export const LoanStatus = {
  SUBMITTED: "submitted",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type LoanStatusType = (typeof LoanStatus)[keyof typeof LoanStatus];

export const RequestLoanSchema = z.object({
  user_id: z.string().min(1, "user_id is required"),
  mrp: z.number().positive("mrp must be positive"),
  dp: z.number().positive("dp must be positive"),
  vehicle_year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  police_number: z.string().min(1, "police_number is required"),
  machine_number: z.string().min(1, "machine_number is required"),
});

export type RequestLoanInput = z.infer<typeof RequestLoanSchema>;

export const ApproveLoanSchema = z.object({
  user_id: z.string().min(1, "user_id is required"),
  police_number: z.string().min(1, "police_number is required"),
});

export type ApproveLoanInput = z.infer<typeof ApproveLoanSchema>;

export interface LoanResponse {
  mrp: number;
  dp: number;
  vehicle_year: number;
  police_number: string;
  machine_number: string;
  status: LoanStatusType;
}

export interface UserLoansResponse {
  user_id: string;
  loans: LoanResponse[];
}

export interface ApproveLoanSuccessResponse {
  user_id: string;
  police_number: string;
  message: string;
}

export interface ErrorResponse {
  error: string;
  error_description: string;
}
