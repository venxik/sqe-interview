import { loans, Prisma } from "@prisma/client";
import prisma from "@database/config/database";
import { IRepository, FindOptions } from "./types/IRepository";
import { LoanStatus, LoanStatusType } from "@loan-types/Loan";

export interface CreateLoanData {
  userId: string;
  mrp: number;
  dp: number;
  vehicleYear: number;
  policeNumber: string;
  machineNumber: string;
}

export class LoanRepository implements IRepository<loans> {
  async findOne(options: FindOptions<loans>): Promise<loans | null> {
    return prisma.loans.findFirst({
      where: options.where as Prisma.loansWhereInput,
    });
  }

  async findAll(options?: FindOptions<loans>): Promise<loans[]> {
    return prisma.loans.findMany({
      where: options?.where as Prisma.loansWhereInput,
      take: options?.limit,
      skip: options?.offset,
      orderBy: options?.orderBy as Prisma.loansOrderByWithRelationInput,
    });
  }

  async create(data: Prisma.loansCreateInput): Promise<loans> {
    return prisma.loans.create({
      data,
    });
  }

  async update(id: string, data: Prisma.loansUpdateInput): Promise<loans> {
    return prisma.loans.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.loans.delete({
      where: { id },
    });
  }

  async count(options?: FindOptions<loans>): Promise<number> {
    return prisma.loans.count({
      where: options?.where as Prisma.loansWhereInput,
    });
  }

  async createLoan(data: CreateLoanData): Promise<loans> {
    return prisma.loans.create({
      data: {
        user_id: data.userId,
        mrp: data.mrp,
        dp: data.dp,
        vehicle_year: data.vehicleYear,
        police_number: data.policeNumber,
        machine_number: data.machineNumber,
        status: LoanStatus.SUBMITTED,
      },
    });
  }

  async findAllByUserId(userId: string): Promise<loans[]> {
    return prisma.loans.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    });
  }

  async findByUserIdAndPoliceNumber(
    userId: string,
    policeNumber: string,
  ): Promise<loans | null> {
    return prisma.loans.findFirst({
      where: {
        user_id: userId,
        police_number: policeNumber,
      },
    });
  }

  async updateStatus(id: string, status: LoanStatusType): Promise<loans> {
    return prisma.loans.update({
      where: { id },
      data: { status },
    });
  }
}

export const loanRepository = new LoanRepository();
