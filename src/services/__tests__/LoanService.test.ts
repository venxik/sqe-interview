import { LoanService } from "../LoanService";
import { loanRepository, CreateLoanData } from "@repositories";
import { LoanStatus } from "@loan-types/Loan";
import { ErrorBase } from "@errors/ErrorBase";
import { ErrorCodes } from "@constants/ErrorCodes";

jest.mock("@repositories", () => ({
  loanRepository: {
    createLoan: jest.fn(),
    findByUserIdAndPoliceNumber: jest.fn(),
    findAllByUserId: jest.fn(),
    updateStatus: jest.fn(),
  },
}));

const createMockLoan = (overrides: Record<string, unknown> = {}) => ({
  id: "loan-123",
  user_id: "Bruce",
  mrp: 100000000,
  dp: 20000000,
  vehicle_year: 2018,
  police_number: "B 1234 BYE",
  machine_number: "SDR72V25000W201",
  status: LoanStatus.SUBMITTED,
  created_at: new Date(),
  updated_at: new Date(),
  ...overrides,
});

describe("LoanService", () => {
  let loanService: LoanService;

  beforeEach(() => {
    loanService = new LoanService();
    jest.clearAllMocks();
  });

  describe("requestLoan", () => {
    const validInput = {
      user_id: "Bruce",
      mrp: 100000000,
      dp: 20000000,
      vehicle_year: 2018,
      police_number: "B 1234 BYE",
      machine_number: "SDR72V25000W201",
    };

    it("should create a loan and return user loans", async () => {
      const mockLoan = createMockLoan();
      (loanRepository.createLoan as jest.Mock).mockResolvedValue(mockLoan);
      (loanRepository.findAllByUserId as jest.Mock).mockResolvedValue([
        mockLoan,
      ]);

      const result = await loanService.requestLoan(validInput);

      expect(loanRepository.createLoan).toHaveBeenCalledWith({
        userId: "Bruce",
        mrp: 100000000,
        dp: 20000000,
        vehicleYear: 2018,
        policeNumber: "B 1234 BYE",
        machineNumber: "SDR72V25000W201",
      });

      expect(result).toEqual({
        user_id: "Bruce",
        loans: [
          {
            mrp: 100000000,
            dp: 20000000,
            vehicle_year: 2018,
            police_number: "B 1234 BYE",
            machine_number: "SDR72V25000W201",
            status: "submitted",
          },
        ],
      });
    });
  });
});
