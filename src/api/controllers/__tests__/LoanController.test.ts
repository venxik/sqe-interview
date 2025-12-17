import request from "supertest";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import LoanController from "../LoanController";
import loanService from "@services/LoanService";
import globalErrorHandler from "@middleware/globalErrorHandler";
import { ErrorBase } from "@errors/ErrorBase";
import { ErrorCodes } from "@constants/ErrorCodes";
import {
  ApproveLoanSuccessResponse,
  LoanStatus,
  UserLoansResponse,
} from "@loan-types/Loan";

jest.mock("@services/LoanService", () => ({
  __esModule: true,
  default: {
    requestLoan: jest.fn(),
    approveLoan: jest.fn(),
  },
}));

describe("LoanController", () => {
  let app: Express.Express;

  beforeAll(() => {
    app = Express();
    app.use(Express.json());
    app.use("/loans", LoanController);
    app.use(globalErrorHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /loans/request", () => {
    const validBody = {
      user_id: "Bruce",
      mrp: 100000000,
      dp: 20000000,
      vehicle_year: 2018,
      police_number: "B 1234 BYE",
      machine_number: "SDR72V25000W201",
    };

    it("should return 201 with loan data on success", async () => {
      const expectedResponse: UserLoansResponse = {
        user_id: "Bruce",
        loans: [
          {
            mrp: 100000000,
            dp: 20000000,
            vehicle_year: 2018,
            police_number: "B 1234 BYE",
            machine_number: "SDR72V25000W201",
            status: LoanStatus.SUBMITTED,
          },
        ],
      };
      (loanService.requestLoan as jest.Mock).mockResolvedValue(
        expectedResponse,
      );

      const response = await request(app)
        .post("/loans/request")
        .send(validBody)
        .expect(StatusCodes.CREATED);

      expect(response.body).toEqual(expectedResponse);
      expect(loanService.requestLoan).toHaveBeenCalledWith(validBody);
    });

    it("should return 400 on validation error", async () => {
      const response = await request(app)
        .post("/loans/request")
        .send({ user_id: "" })
        .expect(StatusCodes.BAD_REQUEST);

      expect(response.body.error).toBe("validation_error");
    });
  });

  describe("POST /loans/approved", () => {
    const validBody = {
      user_id: "Bruce",
      police_number: "B 1234 BYE",
    };

    it("should return 201 with user_id and police_number on success", async () => {
      const expectedResponse: ApproveLoanSuccessResponse = {
        user_id: "Bruce",
        police_number: "B 1234 BYE",
        message: "Loan updated successfully.",
      };
      (loanService.approveLoan as jest.Mock).mockResolvedValue(
        expectedResponse,
      );

      const response = await request(app)
        .post("/loans/approve")
        .send(validBody)
        .expect(StatusCodes.OK);

      expect(response.body).toEqual(expectedResponse);
      expect(loanService.approveLoan).toHaveBeenCalledWith(validBody);
    });

    it("should return 400 on validation error", async () => {
      const response = await request(app)
        .post("/loans/approve")
        .send({ user_id: "" })
        .expect(StatusCodes.BAD_REQUEST);

      expect(response.body.error).toBe("validation_error");
    });

    it("should return 404 on loan not found", async () => {
      const error = new ErrorBase(
        "Loan not found",
        ErrorCodes.LOAN_NOT_FOUND_ERROR_CODE,
        StatusCodes.NOT_FOUND,
      );
      (loanService.approveLoan as jest.Mock).mockRejectedValue(error);

      const response = await request(app)
        .post("/loans/approve")
        .send({ user_id: "Bruce", police_number: "B 1234 BYE" })
        .expect(StatusCodes.NOT_FOUND);

      expect(response.body.error).toBe("loan_not_found");
    });
  });
});
